export class AstroUnit
{
    // conversion factors courtesy of
    // http://www.angelfire.com/az/deaflab/measure.html

    private constructor(astroUnits : number) { this.astroUnits = astroUnits }

    private astroUnits : number

    public static FromAstroUnits(astroUnits : number) : AstroUnit
    {
        return new AstroUnit(astroUnits)
    }

    public static FromKilometers(kilometers : number) : AstroUnit
    {
        const conversionFactor = 149597916.5870972
        return new AstroUnit(kilometers / conversionFactor)
    }

    public static FromLightYears(lightyears : number) : AstroUnit
    {
        const conversionFactor = 0.00001581285
        return new AstroUnit(lightyears / conversionFactor)
    }

    public static FromFeet(feet : number) : AstroUnit
    {
        const conversionFactor = 490806812949.79395
        return new AstroUnit(feet / conversionFactor)
    }

    public static FromMeters(meters : number) : AstroUnit
    {
        const conversionFactor = 149597916587.0972
        return new AstroUnit(meters / conversionFactor)
    }

    public static FromMiles(miles : number) : AstroUnit
    {
        const conversionFactor = 92955835.7859
        return new AstroUnit(miles / conversionFactor)
    }

    public Value() { return this.astroUnits }
}