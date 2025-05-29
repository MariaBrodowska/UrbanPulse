namespace backend.Dtos;

public class CreatePopulationDto
{
    public string CityName { get; set; } = string.Empty;
    public int Year { get; set; }
    public int Number { get; set; }
}

public class CreatePopulationWithCityIdDto
{
    public int CityId { get; set; }
    public int Year { get; set; }
    public int Number { get; set; }
}

public class UpdatePopulationDto
{
    public int Number { get; set; }
    public int Year { get; set; }
    public string CityName { get; set; } = string.Empty;
}