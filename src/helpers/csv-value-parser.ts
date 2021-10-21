import { ParsedCSVHeaders, StringCSVHeaders } from "../types/csv.types";

export function parseCSVValues(values: StringCSVHeaders[]): ParsedCSVHeaders[] {
    return values.map((value) => ({...parseCSVValue(value)}));
}

function parseCSVValue(value: StringCSVHeaders): ParsedCSVHeaders{
    return {
        id: value.id,
        name: value.name,
        bounds: JSON.parse(value.bounds),
        geom: JSON.parse(value.geom),
        address: value.address,
        siteid: value.siteid,
    }
}
