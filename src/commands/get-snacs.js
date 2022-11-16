const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")
const { parse } = require('json2csv')

const fields = ["SNAC ID", "SNAC ARK", "Related IDs", "CPF Type", "Name Entry", "Subject", "Occupation", "Activities", "BiogHist", "Date (From)", "Date Type (From)", "Date (To)", "Date Type (To)", "Place", "Place Type", "Associated With"]

const getSnacs = async () => {

  const allData = []
  const allDataJSON = []
  
  const ids = fs.readFileSync(path.join(__dirname, 'snacs.csv'))
  for (const id of ids.toString().split("\n")) {
    const snacId = parseInt(id)
    const body = {
      "command": "read",
      "constellationid": snacId,
      // "type": "summary"
    }
    const response = await fetch('https://api.snaccooperative.org/', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json()
    allDataJSON.push(data)

    console.log(snacId)

    // Clean up biogHist

    const BiogHist = []

    for (const bh of data.constellation.biogHists || []) {
      if (!bh.text) {
        console.log('No biogHist text')
        continue
      }
      BiogHist.push(bh.text
        .replace(/<\/?[^p]+?>/g, "")
        .replace(/ xmlns=.*?>/g, ">"))
    }

    const relations = []

    for (const a of data.constellation.relations || []) {
      relations.push(a.content + " && " + a.id)
    }

    const selection = {
      'SNAC ID': snacId,
      'SNAC ARK': data.constellation.ark,
      'Related IDs': (data.constellation.sameAsRelations || []).map(x => x.uri || console.log('no sameAs URI')),
      'CPF Type': data.constellation.entityType.term,
      'Name Entry': data.constellation.nameEntries.map(x => x.original || console.log('no original name entry')),
      'Subject': (data.constellation.subjects || []).map(x => x.term.term || console.log('no subject term')),
      'Occupation': (data.constellation.occupations || []).map(x => x.term.term),
      'Activities': (data.constellation.activities || []).map(x => x.term.term),
      BiogHist,
      'Associated With': relations,
    }

    if (data.constellation.places) {
      for (const p of data.constellation.places) {
        selection['Place'] = selection['Place'] ? selection['Place'] : []
        selection['Place Type'] = selection['Place Type'] ? selection['Place Type'] : []
        if (p.original) {
          selection['Place'].push(p.original)
        } else {
          console.log('no original, looking for geoplace')
          if (p.geoplace) {
            selection['Place'].push(p.geoplace.name)
          } else {
            selection['Place'].push("")
            console.log('no geoplace')
          }
        }

        if (p.type) {
          selection['Place Type'].push(p.type.term)
        } else {
          selection['Place Type'].push("")
          console.log('no place type!')
        }
      }
    }

    if (data.constellation.dates) {
      for (const d of data.constellation.dates) {
        selection['Date (From)'] = selection['Date (From)'] ? selection['Date (From)'] : []
        selection['Date Type (From)'] = selection['Date Type (From)'] ? selection['Date Type (From)'] : []
        selection['Date (To)'] = selection['Date (To)'] ? selection['Date (To)'] : []
        selection['Date Type (To)'] = selection['Date Type (To)'] ? selection['Date Type (To)'] : []
        if (d.fromDate) {
          selection['Date (From)'].push(d.fromDate)
          selection['Date Type (From)'].push(d.fromType ? d.fromType.term : "")
        }
        if (d.toDate) {
          selection['Date (To)'].push(d.toDate)
          selection['Date Type (To)'].push(d.toType ? d.toType.term : "")
        }
      }
    }

    allData.push(selection)

  }

  
  const opts = { fields, flatten: true }
  const csv = parse(allData, opts)
  
  // fs.writeFileSync(path.join(__dirname, 'snacs_ex.json'), JSON.stringify(allDataJSON, null, 2))
  fs.writeFileSync(path.join(__dirname, 'snacs.json'), JSON.stringify(allData, null, 2))
  fs.writeFileSync(path.join(__dirname, 'snac_results.csv'), csv)
}

if (fs.existsSync(path.join(__dirname, 'snacs.json'))) {
  const data = fs.readFileSync(path.join(__dirname, 'snacs.json'))
  const opts = { fields, flatten: true }
  const csv = parse(JSON.parse(data.toString()), opts)
  
  fs.writeFileSync(path.join(__dirname, 'snac_results.csv'), csv)
} else {
  getSnacs()
}
