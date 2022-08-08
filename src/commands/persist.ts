import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import Airtable, { FieldSet } from 'airtable'

class Persistor {
  private at: Airtable
  private _base: Airtable.Base | undefined

  constructor() {
    const airtableKey = process.env.AIRTABLE_API_KEY
    if (!airtableKey) {
      console.error(
        "Please add AIRTABLE_API_KEY to your environment or .env file!"
      )
      process.exit()
    }
    this.at = new Airtable({ apiKey: airtableKey })
  }

  get base() {
    if (this._base) return this._base
    const baseId = process.env.AIRTABLE_BASE_ID
    if (!baseId) {
      console.error(
        "Please add AIRTABLE_BASE_ID to your environment or .env file!"
      )
      process.exit()
    }
    this._base = this.at.base(baseId)
    return this._base
  }

  get cfps(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "CPF Pages")
  }

  get snacs(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "SNAC Records")
  }

  get bavd(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "BAVD CPF Authorities")
  }

  get naebPrograms(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "NAEB Programs")
  }

  get naebItems(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "NAEB Items")
  }

  get naebFolders(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "NAEB Folders")
  }

  get kuomPrograms(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "KUOM Programs")
  }

  get nfcbPrograms(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "NFCB Programs")
  }

  get whaPrograms(): Promise<{[key: string]: any}> {
    return this.getTable(this.base as Airtable.Base, "WHA Programs")
  }

  private _clone(obj: {[key: string]: any}) {
    let copy: {[key: string]: any}
    let i

    if (typeof obj !== "object" || !obj) {
      return obj
    }

    if (Object.prototype.toString.apply(obj) === "[object Array]") {
      copy = []
      const len = obj.length
      for (i = 0; i < len; i++) {
        copy[i] = this._clone(obj[i])
      }
      return copy
    }

    copy = {}
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        copy[i] = this._clone(obj[i])
      }
    }
    return copy
  }

  getTable(base: Airtable.Base, table: string): Promise<{[key: string]: any}> {
    return new Promise((resolve, reject) => {
      // FIX TYPING: Record<FieldSet> isn't enough.
      // Should be an opportunity to define shape of data (so this generic method may need to be split)
      const things: {[key: string]: any} = {}
      base(table)
        .select()
        .eachPage(
          async (records, nextPage) => {
            for (const r of records) {
              things[r.id] = r
            }
            nextPage()
          },
          error => {
            if (error) {
              console.log(`error while fetching from ${table}: ${error}`)
              reject(error)
            } else {
              resolve(things)
            }
          }
        )
    })
  }

  // FIX TYPING
  writeJson(o: any, filename: string) {
    const outdir = path.join(__dirname, "../../static/data/")
    if (!fs.existsSync(outdir)) {
      fs.mkdirSync(outdir)
    }
    const fullPath = path.resolve(outdir, filename)
    fs.writeFileSync(fullPath, JSON.stringify(o, null, 2) + "\n")
    console.log(`wrote ${fullPath}`)
  }

  async persistEntities() {
    try {
      const cfps = await this.cfps
      const snacs = await this.snacs
      const bavd = await this.bavd
      const references = {
        naebPrograms: await this.naebPrograms,
        naebItems: await this.naebItems,
        naebFolders: await this.naebFolders,
        kuomPrograms: await this.kuomPrograms,      
        nfcbPrograms: await this.nfcbPrograms,
        whaPrograms: await this.whaPrograms
      }

      const collections = ["NAEB", "NFCB", "WHA", "KUOM"]
      const URLTypes = ["", "Program", "Item", "Folder"]
      interface EF {
        collection: string,
        type: string,
        series: string,
        title: string
        URL: string
      }

      // Get images if present.
      if (!fs.existsSync(path.join(__dirname, "../../static/data/wikipedia.csv"))) {
        console.log("Wikipedia data is missing. Images may not be linked!")
      }
      const images = fs.readdirSync(path.join(__dirname, "../images/wikipedia"))

      const data = Object.keys(cfps).map((key: string) => {
        const record: Airtable.Record<FieldSet> = cfps[key]
        const fields = this._clone(record.fields)
        // Perform expansions and other operations
        for (const field in fields) {
          const id = record.get(field)?.toString()
          if (id) {
            switch (field) {
              case "snacLink":
                fields["snac"] = snacs[id].FieldSet
                break
              case "bavdCPF":
                const inCollections: string[] = []
                const URLs: EF[] = []
                for (const c of collections) {
                  const coll = bavd[id].get(`${c} CPF Authorities`)
                  if (coll) {
                    inCollections.push(c)
                  }
                  for (const ut of URLTypes) {
                    const fieldName = `${c} ${ut} Display URLs`.replace(/\s+/g, ' ')
                    const displayURLs = bavd[id].get(fieldName)
                    if (displayURLs) {
                      const lookup = `${c.toLowerCase()}${ut === '' ? 'Programs' : `${ut}s`}` as keyof typeof references
                      for (const du of displayURLs.split(', ')) {
                        const ref = references[lookup]
                        for (const entryId in ref) {
                          const entry = ref[entryId]
                          const url = entry.get('URL')
                          const entryFields: EF = {
                            collection: c,
                            type: ut,
                            series: entry.fields.series ? Array.isArray(entry.fields.series) ? entry.fields.series[0] : entry.fields.series : "None",
                            title: entry.fields.title,
                            URL: entry.fields.URL || ""
                          }
                          if (url === du) {
                            URLs.push(entryFields)
                          }
                        }
                      }
                    }
                  }
                }
                // Group fields by series
                // const groupedURLs: {[key: string]: {[key: string]: EF[]}[]} = {}
                // Object.keys(URLs).map((u) => {
                //   groupedURLs[u] =  URLs[u].reduce((acc: {[key: string]: Partial<EF>[]}, x: EF) => {
                //     (acc[x.series] = acc[x.series] || []).push({'title': x.title, 'URL': x.URL})
                //     return acc;
                //   }, {})
                // })
                
                fields["collections"] = inCollections
                fields["references"] = URLs
                break
              default:
                // noop 
            }
          }
          // Add images if present
          for (const i of images) {
            const cfpid = record.get("cpfPageID")?.toString()
            if (path.parse(i).name === cfpid) {
              fields["image"] = `../../src/images/wikipedia/${i}`
            }
          }
        }
        return fields
      })
      this.writeJson(data, "entities.json")
    } catch (e: any) {
      throw new Error(e)
    }
  }
  
}

const persistor = new Persistor()
switch (process.argv[2]) {
  case "entities":
  case "cfps":
  default:
    persistor.persistEntities()
}