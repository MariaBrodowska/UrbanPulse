namespace backend.Dtos;

public class CreateMeterDataDto
{
    public string CityName { get; set; } = string.Empty;
    public int Year { get; set; }
    public double Price { get; set; }
    public int Quarter { get; set; }
    public bool IsSecondaryMarket { get; set; }
    public bool IsRealistic { get; set; }
}
public class CreateMeterDataWithCityIdDto
{
    public int CityId { get; set; }
    public int Year { get; set; }
    public double Price { get; set; }
    public int Quarter { get; set; }
    public bool IsSecondaryMarket { get; set; }
    public bool IsRealistic { get; set; }
}

