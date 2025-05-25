namespace backend.Dtos;

public class MeterDataDto
{
    public int Id { get; set; }
    public int Year { get; set; }
    public double Price { get; set; }
    public int Quarter { get; set; }
    public bool IsSecondaryMarket { get; set; }
    public bool IsRealistic { get; set; }

    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
}
