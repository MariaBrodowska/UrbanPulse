namespace backend.Dtos;

public class CreateInterestRateDto
{
    public string TypeOfInterestRateName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public int Rate { get; set; }
}

public class CreateIRWithTOIRIdDto
{
    public int TypeOfInterestRateName { get; set; }
    public DateTime Date { get; set; }
    public int Rate { get; set; }
}

public class UpdateInterestRateDto
{
    public DateTime Date { get; set; }
    public int Rate { get; set; }
    public int TypeOfInterestRateId { get; set; }
    public string TypeOfInterestRateName { get; set; } = string.Empty;
}
