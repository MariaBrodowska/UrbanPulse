namespace backend.Models;

public class InterestRate
{
    public int Id { get; set; }
    public int? Rate { get; set; }
    public DateTime? Date { get; set; }

    public int TypeOfInterestRateId { get; set; }
    public TypeOfInterestRate TypeOfInterestRate { get; set; }
}
