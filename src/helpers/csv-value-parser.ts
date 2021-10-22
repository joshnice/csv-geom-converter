import { Polygon } from "geojson";
import { ParsedCSVHeaders, StringCSVHeaders } from "../types/csv.types";

export function parseCSVValues(values: StringCSVHeaders[]): ParsedCSVHeaders[] {
    return values.map((value) => ({...parseCSVValue(value)}));
}

function parseCSVValue(value: StringCSVHeaders): ParsedCSVHeaders{
    return {
        name: value.name,
        bounds: parseBounds(value.bounds),
        geom: JSON.parse(value.geom),
        address: value.address,
        siteid: value.siteid,
    }
}

function parseBounds(bounds: string | null): null | Polygon {
    if (bounds === "" || bounds == null) {
        return null;
    }
    return JSON.parse(bounds);
}
