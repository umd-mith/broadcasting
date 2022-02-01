import { JSDOM } from 'jsdom'
import * as csv from 'fast-csv'
import * as fs from 'fs'

type Data = Row[]

type Row = {
    id: string
    title: string
    cpfAuths: string[]
    dateCreated: string
    abstract?: string
    notes?: string[]
    topicalSubjects?: string[]
    cpfSubjects?: string[]
    geoSubjects?: string[]
    series?: string[]
}

export default class ModsProcessor {
    // A class to process a MODS file to extract data for Broadcasting A/V data project.
    private _data: Data

    public get data(): Data {
        if (this._data) {
            return this._data
        }
        throw 'No data, try adding rows.'
    }

    public async addRow(mods: string) {
        // Get data from a MODS string using Sax

        if (!this._data) {
            this._data = []
        }

        const j: JSDOM = new JSDOM()
        const parser = new j.window.DOMParser()
        const doc = parser.parseFromString(mods, 'text/xml')

        // ID

        const idEl = doc.querySelector('mods > identifier[type=hdl]')

        if (!idEl) {
            throw 'Could not find record identifier'
        }

        const id = idEl.textContent

        // Title
        
        const titleInfo = doc.querySelector('mods > titleInfo')
        
        const title = Array.from(titleInfo.children).map((el: Element) => {
            if (el.tagName === 'subTitle') {
                return ' : ' + el.textContent
            }
            return el.textContent
        }).join('')

        // CPF authorities

        const names = doc.querySelectorAll('mods > name')

        const cpfAuths = Array.from(names).map((name: Element) => {
            const namePart = name.querySelector('namePart').textContent
            const role = "###" + name.querySelector('role > roleTerm[type=text]').textContent
            const valueURI = name.getAttribute('valueURI')
            const uri = valueURI ? `$$$${valueURI}` : ''

            return namePart + role + uri

        })

        // Date created

        const dates = doc.querySelectorAll('mods > originInfo > dateCreated')

        const dateCreated = Array.from(dates).map((date: Element) => {
            const point = date.getAttribute('point')
            const suffix = point ? '###' + point : ''
            return date.textContent + suffix
        }).join(', ')

        // Build data object

        const row: Row = {
            id,
            title,
            cpfAuths,
            dateCreated
        }

        // Process optional fields

        const optionalFields: Partial<Row> = {}

        // Abstract

        const abstractEl = doc.querySelector('mods > abstract')
        if (abstractEl) {
            optionalFields.abstract = abstractEl.textContent
        }

        // Notes

        const noteEls = doc.querySelectorAll('mods > note[type=public]')

        if (noteEls.length > 0) {
            optionalFields.notes = Array.from(noteEls).map((note: Element) => note.textContent)
        }

        // Subjects: topical, CPF, and geographical

        for (const subject of Array.from(doc.querySelectorAll('mods > subject'))) {

            const value = Array.from(subject.children).map((el: Element) => {
                if (el.tagName === 'name') {
                    return el.firstElementChild.textContent
                }
                return el.textContent
            }).join('--')

            switch (subject.firstElementChild.tagName) {
                case 'topic':
                    if (!optionalFields.topicalSubjects) {
                        optionalFields.topicalSubjects = []
                    }
                    optionalFields.topicalSubjects.push(value)
                    break
                case 'name':
                    if (!optionalFields.cpfSubjects) {
                        optionalFields.cpfSubjects = []
                    }
                    optionalFields.cpfSubjects.push(value)
                    break
                case 'geographic':
                    if (!optionalFields.geoSubjects) {
                        optionalFields.geoSubjects = []
                    }
                    optionalFields.geoSubjects.push(value)
                    break
                default:
                    console.log('Could not parse a subject.')
            }

        }

        // Series
        const seriesEl = doc.querySelectorAll('mods > relatedItem[type=series]')
        if (seriesEl.length > 0) {
            optionalFields.series = Array.from(seriesEl).map((s: Element) => s.querySelector('title').textContent)
        }

        // Merge optional raw fields and add to data
        this._data.push(Object.assign(row, optionalFields))
    }

    async toCsv(path: string) {
        // Convert data to Csv

        const writer = fs.createWriteStream(path) 

        const csvStream = csv.format({ headers: true })

        csvStream.pipe(writer).on('end', () => process.exit())

        // Rename keys and supply missing fields if necessary to make sure all rows have the same headers.
        const keyMap = {
            'id': 'Identifier',
            'title': 'Title',
            'cpfAuths': 'CPF authorities',
            'dateCreated': 'Date created',
            'abstract': 'Abstract',
            'notes': 'Notes',
            'topicalSubjects': 'Topical subjects',
            'cpfSubjects': 'CPF subjects',
            'geoSubjects': 'Geographic subjects',
            'series': 'Series'
        }
        for (const row of this.data) {
            const csvRow: any = {}
            for (const _key in keyMap) {
                const key = _key as keyof Row
                const renamed = keyMap[key]
                csvRow[renamed] = row[key]
            }
            csvStream.write(csvRow)
        }
    }

    // Add methods for more formats if needed.
}