import { ParsedCSVHeaders, RawCSVHeaders } from "../types/csv.types";

export function parseCSVValues(values: RawCSVHeaders[]): ParsedCSVHeaders[] {
    return values.map((value) => ({...parseCSVValue(value)}));
}

export function parseCSVValue(value: RawCSVHeaders): ParsedCSVHeaders{
    return {
        id: value.id,
        name: value.name,
        bounds: JSON.parse(value.bounds),
        geom: JSON.parse(value.geom),
        address: value.address,
        siteid: value.siteid,
    }
}
