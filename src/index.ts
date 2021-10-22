#!/usr/bin/env node

import { createReadStream } from "fs";
import { parse } from "fast-csv"; 
import { resolve as pathResolve } from "path";
import { StringCSVHeaders } from "./types/csv.types";
import { parseCSVValues } from "./helpers/csv-value-parser";
import { mutateGeojsonValues } from "./helpers/geojson-to-string-convert";
import { createObjectCsvWriter } from "csv-writer";
import { errorHelperFunction } from "./helpers/error";

const clear = require('clear');

async function main() {
    clearConsole();
    const importedData = await csvImport();
    const parsedImportedData = parseCSVValues(importedData);
    const mutatedGeomValues = mutateGeojsonValues(parsedImportedData);
    await writeCSV(mutatedGeomValues);
}

function csvImport(): Promise<StringCSVHeaders[]> {

    const csvValues: StringCSVHeaders[] = [];

    return new Promise((resolve, reject) => {
        createReadStream(pathResolve(__dirname, '../assets', 'parse.csv'), 'utf8')
        .pipe(parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => csvValues.push(row))
        .on('end', (rowCount: number) => {
            console.log(`Parsed ${rowCount} of CSV rows`);
            resolve(csvValues);
        });
    });
    
}

function writeCSV(csvValues: StringCSVHeaders[]) {
    const csvWriter = createObjectCsvWriter({ 
        path: pathResolve(__dirname, '../assets', 'parsed.csv'),
        header: [
            {id: "name", title: "name"},
            {id: "geom", title: "geom"},
            {id: "bounds", title: "bounds"},
            {id: "address", title: "address"},
            {id: "siteid", title: "siteid"},
        ],
    });

    return new Promise<void>((resolve, reject) => {
        csvWriter.writeRecords(csvValues)
        .then(() => {
            console.log('Export CSV');
            resolve();
        })
        .catch((err) => {
            errorHelperFunction(err, reject);
        })
    });
 };


function clearConsole() {
    clear();
}

export default main;

