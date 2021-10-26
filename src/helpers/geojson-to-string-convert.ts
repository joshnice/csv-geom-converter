import { MultiPolygon, Point, Polygon } from "geojson";
import { ParsedCSVHeaders, StringCSVHeaders } from "../types/csv.types";

interface LocationJSONData {
    type: string,
    properties: {
        featureId: number,
        Venue: string,
        deleted: number,
        layerid: number,
        geomtype: number,
        level_id: number,
    },
    geometry: MultiPolygon,
}

export function mutateGeojsonValues(values: ParsedCSVHeaders[]): StringCSVHeaders[] {
    const data = require("../../assets/area.json");
    const areaValues: LocationJSONData[] = data.features; 
    return values.map((value) => ({...mutateGeojsonValue(value, areaValues)}));
}

function mutateGeojsonValue(value: ParsedCSVHeaders, areaValues: LocationJSONData[]): StringCSVHeaders {
    return {
        name: value.name,
        bounds: value.bounds != null ? convertBounds(areaValues, value.name) : null,
        geom: convertGeom(value.geom),
        address: value.address,
        siteid: value.siteid,
    }
}

function convertBounds(areaValues: LocationJSONData[], venueName: string): string | null {
    const venue = areaValues.find(val => val.properties.Venue === venueName);

    if (venue == null) {
        return null;
    }

    const coordinates_pairs = venue.geometry.coordinates[0][0].map(coordinate => coordinate.join(" "));
    return `SRID= 4326; POLYGON (( ${coordinates_pairs.join(",")} ))`;
}

function convertGeom(geom: Point): string {
    return `POINT ( ${geom.coordinates.join(" ")} )`
}