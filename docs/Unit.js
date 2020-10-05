export class Unit {
    // conversion factors courtesy of
    // http://www.angelfire.com/az/deaflab/measure.html
    static FromAstroUnits(astroUnits) {
        return astroUnits;
    }
    static FromKilometers(kilometers) {
        const conversionFactor = 149597916.5870972;
        return kilometers / conversionFactor;
    }
    static FromLightYears(lightyears) {
        const conversionFactor = 0.00001581285;
        return lightyears / conversionFactor;
    }
    static FromFeet(feet) {
        const conversionFactor = 490806812949.79395;
        return feet / conversionFactor;
    }
    static FromMeters(meters) {
        const conversionFactor = 149597916587.0972;
        return meters / conversionFactor;
    }
    static FromMiles(miles) {
        const conversionFactor = 92955835.7859;
        return miles / conversionFactor;
    }
}
