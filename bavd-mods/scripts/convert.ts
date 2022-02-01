// A script for converting Broadcasting A/V Data MODS files into CSV for data refinment in OpenRefine.

// USAGE: 
// `npm run convert -- INPUTFOLDER`
// or, using a command line typescript intepreter like ts-node:
// `convert.ts INPUTFOLDER`

import * as fs from 'fs'
import * as path from 'path'
import ModsProcessor from '../src/ModsProcessor'

const dataDir = path.resolve(process.argv[2])
const modsFiles = fs.readdirSync(dataDir)
const p = new ModsProcessor
for (const filename of modsFiles) {
    const mods = fs.readFileSync(path.join(dataDir, filename)).toString()
    p.addRow(mods)
}

const outputDir = path.resolve(__dirname, './output')
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}
const output = path.resolve(outputDir, './mods.csv')
if (fs.existsSync(output)) {
    fs.unlinkSync(output)
}
p.toCsv(output)