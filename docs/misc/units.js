export class AstroUnit {
    // conversion factors courtesy of
    // http://www.angelfire.com/az/deaflab/measure.html
    constructor(astroUnits) { this.astroUnits = astroUnits; }
    static FromAstroUnits(astroUnits) {
        return new AstroUnit(astroUnits);
    }
    static FromKilometers(kilometers) {
        const conversionFactor = 149597916.5870972;
        return new AstroUnit(kilometers / conversionFactor);
    }
    static FromLightYears(lightyears) {
        const conversionFactor = 0.00001581285;
        return new AstroUnit(lightyears / conversionFactor);
    }
    static FromFeet(feet) {
        const conversionFactor = 490806812949.79395;
        return new AstroUnit(feet / conversionFactor);
    }
    static FromMeters(meters) {
        const conversionFactor = 149597916587.0972;
        return new AstroUnit(meters / conversionFactor);
    }
    static FromMiles(miles) {
        const conversionFactor = 92955835.7859;
        return new AstroUnit(miles / conversionFactor);
    }
    Value() { return this.astroUnits; }
}
