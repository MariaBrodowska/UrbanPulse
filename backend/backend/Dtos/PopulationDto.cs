namespace backend.Dtos;

public class PopulationDto
{
    public int Id { get; set; }
    public int Year { get; set; }
    public int Number { get; set; }
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
}