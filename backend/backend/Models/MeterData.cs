namespace backend.Models;

public class MeterData
{
    public int Id { get; set; }
    public int Year { get; set; }
    public double Price { get; set; }
    public int Quarter { get; set; }
    public bool IsSecondaryMarket { get; set; }
    public bool IsRealistic { get; set; }

    public int CityId { get; set; }
    public City? City { get; set; }
}
