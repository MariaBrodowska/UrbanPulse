using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;

public class GeneringDataService
{
    // Klasa reprezentująca jeden wiersz CSV
    public class PopulationRow
    {
        public string Kod { get; set; }
        public string Nazwa { get; set; }
        public string Year2015 { get; set; }
        public string Year2016 { get; set; }
        public string Year2017 { get; set; }
        public string Year2018 { get; set; }
        public string Year2019 { get; set; }
        public string Year2020 { get; set; }
        public string Year2021 { get; set; }
        public string Year2022 { get; set; }
        public string Year2023 { get; set; }
        public string Year2024 { get; set; }
    }

    public List<PopulationRow> LoadPopulationData()
    {
        string filePath = "./LiczbaLudnosci.csv";
        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            Delimiter = ";",
            HasHeaderRecord = true,
            MissingFieldFound = null
        };

        using var reader = new StreamReader(filePath);
        using var csv = new CsvReader(reader, config);


        var records = csv.GetRecords<PopulationRow>().ToList();
        return records;
    }
}