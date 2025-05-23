using System.Globalization;
using System.Xml.Linq;
using CsvHelper;
using CsvHelper.Configuration;

public class GeneringDataService
{
    private const string PopulationFilePath = "./DataFiles/LiczbaLudnosci.csv";
    private const string InterestRateFilePath = "./DataFiles/foot.xml";
    private static readonly string[] FlatPriceFilePaths = new[]
    {
        "./DataFiles/realisticMeterDataNoSecondaryMarket.csv",
        "./DataFiles/realisticMeterDataSecondaryMarket.csv",
        "./DataFiles/noRealisticMeterDataNoSecondaryMarket.csv",
        "./DataFiles/noRealisticMeterDataSecondaryMarket.csv"
    };

    public List<PopulationRow> LoadPopulationData()
    {
        return LoadCsvFile<PopulationRow>(PopulationFilePath);
    }

    public List<InterestRate> GetInterestRates()
    {
        var result = new List<InterestRate>();
        var document = XDocument.Load(InterestRateFilePath);
        
        foreach (var position in document.Descendants("pozycje"))
        {
            var rate = new InterestRate
            {
                ObowiazujeOd = DateTime.Parse(position.Attribute("obowiazuje_od").Value)
            };
            
            foreach (var pos in position.Elements("pozycja"))
            {
                var id = pos.Attribute("id").Value;
                var oprocentowanie = decimal.Parse(
                    pos.Attribute("oprocentowanie").Value,
                    CultureInfo.InvariantCulture);
                
                switch (id)
                {
                    case "ref": rate.Ref = oprocentowanie; break;
                    case "lom": rate.Lom = oprocentowanie; break;
                    case "red": rate.Red = oprocentowanie; break;
                }
            }
            
            result.Add(rate);
        }

        return result;
    }

    public List<FullPriceForFlat> GetFlatPrices()
    {
        var result = new List<FullPriceForFlat>();
        
        foreach (string path in FlatPriceFilePaths)
        {
            (bool isRealistic, bool isSecondaryMarket) = GetFileCharacteristics(path);
            var records = LoadCsvFile<PriceForFlat>(path);
            
            foreach (var record in records)
            {
                var parts = record.Kwartal.Split(' ');
                var quarter = parts[0];
                var year = parts[1];
                
                result.Add(new FullPriceForFlat
                {
                    Kwartal = quarter,
                    Bialystok = record.Bialystok,
                    Bydgoszcz = record.Bydgoszcz,
                    Gdansk = record.Gdansk,
                    Gdynia = record.Gdynia,
                    Katowice = record.Katowice,
                    Kielce = record.Kielce,
                    Krakow = record.Krakow,
                    Lublin = record.Lublin,
                    Lodz = record.Lodz,
                    Olsztyn = record.Olsztyn,
                    Opole = record.Opole,
                    Poznan = record.Poznan,
                    Rzeszow = record.Rzeszow,
                    Szczecin = record.Szczecin,
                    Warszawa = record.Warszawa,
                    Wroclaw = record.Wroclaw,
                    IsRealistic = isRealistic,
                    IsSecondaryMarket = isSecondaryMarket,
                    Year = year
                });
            }
        }
        
        return result;
    }

    private List<T> LoadCsvFile<T>(string filePath)
    {
        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            Delimiter = ";",
            HasHeaderRecord = true,
            MissingFieldFound = null
        };

        using var reader = new StreamReader(filePath);
        using var csv = new CsvReader(reader, config);
        
        return csv.GetRecords<T>().ToList();
    }

    private (bool isRealistic, bool isSecondaryMarket) GetFileCharacteristics(string path)
    {
        return path switch
        {
            "./DataFiles/realisticMeterDataNoSecondaryMarket.csv" => (true, false),
            "./DataFiles/realisticMeterDataSecondaryMarket.csv" => (true, true),
            "./DataFiles/noRealisticMeterDataNoSecondaryMarket.csv" => (false, false),
            "./DataFiles/noRealisticMeterDataSecondaryMarket.csv" => (false, true),
            _ => (false, false)
        };
    }

    // Model classes
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

    public class PriceForFlat
    {
        public string Kwartal { get; set; }
        public string Bialystok { get; set; }
        public string Bydgoszcz { get; set; }
        public string Gdansk { get; set; }
        public string Gdynia { get; set; }
        public string Katowice { get; set; }
        public string Kielce { get; set; }
        public string Krakow { get; set; }
        public string Lublin { get; set; }
        public string Lodz { get; set; }
        public string Olsztyn { get; set; }
        public string Opole { get; set; }
        public string Poznan { get; set; }
        public string Rzeszow { get; set; }
        public string Szczecin { get; set; }
        public string Warszawa { get; set; }
        public string Wroclaw { get; set; }
    }

    public class FullPriceForFlat : PriceForFlat
    {
        public bool IsSecondaryMarket { get; set; }
        public bool IsRealistic { get; set; }
        public string Year { get; set; }
    }

    public class InterestRate
    {
        public DateTime ObowiazujeOd { get; set; }
        public decimal Ref { get; set; }
        public decimal Lom { get; set; }
        public decimal Red { get; set; }
    }
}
