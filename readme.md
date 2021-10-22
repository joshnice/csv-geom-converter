# Basic CLI Application

## Build and Run Using 
npm start

## Build Manually Using
npx tsc

## Run Manually Using
./build/cli.js

## Post CSV Upload
Once the CSV values have been added to the database the SRID may need to be updated
Use the function below to change the SRID for a whole column


`SELECT UpdateGeometrySRID('table name','column name', SRID);`

Example of UpdateGeometrySRID

`SELECT UpdateGeometrySRID('roads','geom',4326);`

