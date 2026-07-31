declare module "@svg-maps/romania" {
  export interface MapLocation {
    name: string;
    id: string;
    path: string;
  }

  export interface SVGMap {
    label: string;
    viewBox: string;
    locations: MapLocation[];
  }

  const RomaniaMap: SVGMap;
  export default RomaniaMap;
}
