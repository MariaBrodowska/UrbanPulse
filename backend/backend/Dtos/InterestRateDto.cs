namespace backend.Dtos;

public class InterestRateDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Rate { get; set; }
    public int TypeOfInterestRateId { get; set; }
    public string? TypeOfInterestRateName { get; set; } = string.Empty;
}