import { Point, Polygon } from "geojson";
import { ParsedCSVHeaders, StringCSVHeaders } from "../types/csv.types";

export function mutateGeojsonValues(values: ParsedCSVHeaders[]): StringCSVHeaders[] {
    return values.map((value) => ({...mutateGeojsonValue(value)}));
}

function mutateGeojsonValue(value: ParsedCSVHeaders): StringCSVHeaders {
    return {
        id: value.id,
        name: value.name,
        bounds: value.bounds != null ? convertBounds(value.bounds) : null,
        geom: convertGeom(value.geom),
        address: value.address,
        siteid: value.siteid,
    }
}

function convertBounds(bounds: Polygon): string {
    const coordinates = bounds.coordinates[0];
    const coordinates_pairs = coordinates.map(coordinate => coordinate.join(" "));
    return `POLYGON (( ${coordinates_pairs.join(",")} ))`;
}

function convertGeom(geom: Point): string {
    return `POINT ( ${geom.coordinates.join(" ")} )`
}