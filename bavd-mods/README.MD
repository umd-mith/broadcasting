# Broadcasting A/V Data MODS Converter

A TypeScript utility to process a MODS file to extract data for Broadcasting A/V data project and convert it to CSV (can be extended to other formats).

# Usage

```ts
import * as fs from 'fs'
import * as path from 'path'
import ModsProcessor from '../src/ModsProcessor'

// Initialize ModsProcessor
const mp = new ModsProcessor

// Read in a MODS file as string
const testModspath: string = path.resolve(__dirname, '.example.mods.xml')
const testMods: string = fs.readFileSync(testModspath).toString()

// Add record as a row. Add more rows as needed
mp.addRow(testMods)

// Convert to CSV
const output = path.resolve(__dirname, './output.csv')
mp.toCsv(output)
```

