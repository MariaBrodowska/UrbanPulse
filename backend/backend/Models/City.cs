namespace backend.Models;

public class City
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<MeterData> MeterData { get; set; } = new List<MeterData>();
    public ICollection<Population> Populations { get; set; } = new List<Population>();
}
