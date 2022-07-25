/*

Since the Wikipedia abstract and image are not stored in Airtable at this time this
program can be used to fetch this data for people/corporate bodies in people.json
and store it in wikipedia.json.

*/

const fs = require("fs")
const util = require("util")
const path = require("path")
const cheerio = require('cheerio')
const urlfetch = require("node-fetch")
const streamPipeline = util.promisify(require("stream").pipeline)

async function main() {
  if (! fs.existsSync('./static/data/entities.json')) {
    console.log(`No entities.json file to read, run persist`)
    return
  }

  const entities = JSON.parse(fs.readFileSync('./static/data/entities.json', 'utf8'))
  if (! entities) {
    console.log(`entities.json is empty please run persist first`)
    return
  }

  const wikipedia = await scrapeWikipedia(entities)
  let csv = "cpfPageID, url, imageUrl, abstract\n" 
  for (w of wikipedia) {
    csv += `${w.cpfPageID}, ${w.url}, ${w.imageUrl}, ${w.abstract}\n`
  }

  const outdir = path.join(__dirname, "../../static/data/")
  const fullPath = path.resolve(outdir, "wikipedia.csv")
  fs.writeFileSync(fullPath, csv)
  console.log(`wrote ${fullPath}`)
}

async function scrapeWikipedia(entities) {

  let data = []

  // use existing data if possible
  if (fs.existsSync('./static/data/wikipedia.json')) {
    data = JSON.parse(fs.readFileSync('./static/data/wikipedia.json', 'utf8'))
  }

  for (const [i, entity] of entities.entries()) {
    if (entity.wikipediaURL) {

      // if the person id is already in the wikipedia data we can skip it
      if (data.find(p => p.personId == entity.cpfPageID)) {
        console.log(`already have wikipedia info for ${entity.cpfPageID}`)
        continue
      }

      const w = {
        cpfPageID: entity.cpfPageID,
        url: entity.wikipediaURL, 
        image: "",
        imageUrl: "",
        abstract: ""
      }

      console.log(`scraping ${entity.wikipediaURL}`)
      const response = await urlfetch(entity.wikipediaURL)
      if (response.status != 200) {
        console.log(`got ${response.status}`)
        continue
      }

      const html = await response.text()
      const $ = cheerio.load(html)

      // get the image

      let imageUrl = null
      let el = $('.infobox-image a.image img').first()
      if (el.length == 0) {
        el = $('div.thumb img.thumbimage').first()
      }
      if (el.length != 0) {
        imageUrl = 'https:' + el.attr('src') || ""
        // adjust the url to get a larger size image if possible
        const ext = path.extname(imageUrl)
        const filename = `${entity.cpfPageID}${ext}`
        const imgPath = `./static/images/wikipedia/${filename}`
        if (! fs.existsSync(imgPath)) {
          console.log(`downloading ${imageUrl} to ${imgPath}`)
          const resp = await urlfetch(imageUrl)
          await streamPipeline(resp.body, fs.createWriteStream(imgPath))
        }
        w.image = filename
        w.imageUrl = imageUrl
      }

      // get the abstract

      const abstract = $('.mw-parser-output p')
        .filter((i, el) => el.attribs.class === undefined)
        .slice(0, 2)               // get the first two paragraphs
        .text()
        .replace(/\[\d+\]/g, ' ')  // remove footnotes
        .replace(/\n/g, ' ')       // remove newlines
        .replace(/ +/g, ' ')       // remove any resulting extra spaces

      if (abstract != '') w.abstract = abstract

      data.push(w)

      // requesting too quickly can cause Wikipedia to return 429 messages
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

  }

  return data
}

if (require.main === module) {
  main()
}