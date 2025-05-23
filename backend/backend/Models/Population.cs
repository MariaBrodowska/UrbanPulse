namespace backend.Models;

public class Population
{
    public int Id { get; set; }
    public int? Number { get; set; }
    public int? Year { get; set; }

    public int CityId { get; set; }
    public City City { get; set; }
}
