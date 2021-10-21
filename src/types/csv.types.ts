import { Point, Polygon } from "geojson";

export interface StringCSVHeaders {
    id: string;
    name: string;
    bounds: string | null;
    geom: string;
    address: string;
    siteid: string;
}

export interface ParsedCSVHeaders {
    id: string;
    name: string;
    bounds: Polygon | null;
    geom: Point;
    address: string;
    siteid: string;
}