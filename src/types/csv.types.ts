import { Point, Polygon } from "geojson";

export interface RawCSVHeaders {
    id: string;
    name: string;
    bounds: string;
    geom: string;
    address: string;
    siteid: string;
}

export interface ParsedCSVHeaders {
    id: string;
    name: string;
    bounds: Polygon;
    geom: Point;
    address: string;
    siteid: string;
}