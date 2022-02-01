// tslint:disable: no-unused-expression
import { expect } from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import ModsProcessor from '../src/ModsProcessor'
import * as csv from 'fast-csv'

describe('MODS processor', () => {
  it('should parse a MODS file', async () => {
    const testModspath: string = path.resolve(__dirname, './data/2A3FT7SYJCZOA8M.mods.xml')
    const testMods: string = fs.readFileSync(testModspath).toString()
    const p = new ModsProcessor
    p.addRow(testMods)

    expect(p.data[0].id).equal('1711.dl/2A3FT7SYJCZOA8M')
    expect(p.data[0].title).equal('[Number 4 Homer Price-Two Parts] : test')
    expect(p.data[0].cpfAuths.length).equal(3)
    expect(p.data[0].cpfAuths[0]).equal("WHA (Radio station : Madison, Wis.)###Broadcaster$$$http://example.com")
    // expect(p.data[0].dateCreated).equal("1949-10-14")
    expect(p.data[0].dateCreated).equal("1949-10-14###start, 1949-10-14###end")
    expect(p.data[0].abstract).equal("Morseman")
    expect(p.data[0].notes.length).equal(2)
    expect(p.data[0].notes[0]).equal("Wisconsin School of the Air 969. Producer: Carl Schmidt.")
    expect(p.data[0].topicalSubjects.length).equal(3)
    expect(p.data[0].topicalSubjects[1]).equal("Literature--Something else")
    expect(p.data[0].topicalSubjects[2]).equal("Housing--Wisconsin--Madison--1940-1949")
    expect(p.data[0].cpfSubjects[0]).equal("Schurz, Carl, 1829-1906")
    expect(p.data[0].geoSubjects[0]).equal('Madison, Wisconsin')
    expect(p.data[0].series[0]).equal('Book Trails')
  })

  it('should generate csv', async () => {
    const dataDir = path.resolve(__dirname, './data')
    const modsFiles = fs.readdirSync(dataDir)
    const p = new ModsProcessor
    for (const filename of modsFiles) {
      const mods = fs.readFileSync(path.join(dataDir, filename)).toString()
      p.addRow(mods)
    }
    expect(p.data.length).greaterThan(0)

    const outputDir = path.resolve(__dirname, './output')
    if (!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir);
    }

    const output = path.resolve(outputDir, './mods.csv')
    if (fs.existsSync(output)) {
      fs.unlinkSync(output)
    }
    await p.toCsv(output)

    // Read CSV back and test result (NB this is an async test and may appear as passed,
    // but there will be a stack trace in case of error).
    fs.createReadStream(output)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', row => expect(row['Identifier']).exist)
      .on('end', (rowCount: number) => expect(rowCount).equal(2))

  })
})
