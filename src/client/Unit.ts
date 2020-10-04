export class Unit
{
    // conversion factors courtesy of
    // http://www.angelfire.com/az/deaflab/measure.html

    public static FromAstroUnits(astroUnits : number) : number
    {
        return astroUnits
    }

    public static FromKilometers(kilometers : number) : number
    {
        const conversionFactor = 149597916.5870972
        return kilometers / conversionFactor
    }

    public static FromLightYears(lightyears : number) : number
    {
        const conversionFactor = 0.00001581285
        return lightyears / conversionFactor
    }

    public static FromFeet(feet : number) : number
    {
        const conversionFactor = 490806812949.79395
        return feet / conversionFactor
    }

    public static FromMeters(meters : number) : number
    {
        const conversionFactor = 149597916587.0972
        return meters / conversionFactor
    }

    public static FromMiles(miles : number) : number
    {
        const conversionFactor = 92955835.7859
        return miles / conversionFactor
    }
}
