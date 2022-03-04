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
    const outdir = path.join(__dirname, "../../public/data/")
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
      const data = Object.keys(cfps).map((key: string) => cfps[key].fields)
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