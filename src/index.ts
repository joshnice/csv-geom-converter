#!/usr/bin/env node

import { createReadStream } from "fs";
import { parse } from "fast-csv"; 
import { resolve as pathResolve } from "path";
const clear = require('clear');

async function main() {
    clearConsole();
    const output = await csvImport();
}

function csvImport() {

    const csvValues: any[] = [];

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

function clearConsole() {
    clear();
}

export default main;

