namespace backend.Models;

public class TypeOfInterestRate
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<InterestRate> InterestRates { get; set; } = new List<InterestRate>();
}
