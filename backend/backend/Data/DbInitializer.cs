namespace backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services;
using System.Runtime.InteropServices.Marshalling;

public class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        context.Database.Migrate();

        // J// if (context.Users.Any())eśli baza danych już zawiera dane, nie dodawaj ponownie
        if (context.Cities.Any())
            return;

       SeedRoles(context);
       SeedUsers(context);
        SeedCities(context);
        SeedDataFromFiles(context);
        
        context.SaveChanges();
    }

    private static void SeedRoles(AppDbContext context)
    {
        var roles = new[]
        {
            new Role { Name = "Admin" },
            new Role { Name = "User" }
        };
        
        context.Roles.AddRange(roles);
        context.SaveChanges(); // Zapisz role, aby uzyskać ID
    }

    private static void SeedUsers(AppDbContext context)
    {
        var adminRole = context.Roles.First(r => r.Name == "Admin");
        var userRole = context.Roles.First(r => r.Name == "User");
        
        var users = new[]
        {
            new User 
            { 
                Email = "admin@example.com", 
                Password = "admin123", // W produkcji powinno być zahashowane
                RoleId = adminRole.Id 
            },
            new User 
            { 
                Email = "user@example.com", 
                Password = "user123", // W produkcji powinno być zahashowane
                RoleId = userRole.Id 
            }
        };
        
        context.Users.AddRange(users);
    }

    private static void SeedCities(AppDbContext context)
    {
        var dataService = new GeneringDataService();
        var citiesToLoad = dataService.LoadPopulationData();
        var cities = new List<City>();
        foreach (var item in citiesToLoad)
        {
            String nazwa = item.Nazwa;
            String[] nazwa1 = nazwa.Split(" ");
            
            string cityName = nazwa1[2];
            cityName = cityName
                .Replace("ą", "a")
                .Replace("ć", "c")
                .Replace("ę", "e")
                .Replace("ł", "l")
                .Replace("ń", "n")
                .Replace("ó", "o")
                .Replace("ś", "s")
                .Replace("ź", "z")
                .Replace("ż", "z")
                .Replace("Ą", "A")
                .Replace("Ć", "C")
                .Replace("Ę", "E")
                .Replace("Ł", "L")
                .Replace("Ń", "N")
                .Replace("Ó", "O")
                .Replace("Ś", "S")
                .Replace("Ź", "Z")
                .Replace("Ż", "Z");

            var city = new City() { Name = cityName };
            
            cities.Add(city);}
        context.Cities.AddRange(cities);
        context.SaveChanges(); // Zapisz miasta, aby uzyskać ID
    }

    private static void SeedDataFromFiles(AppDbContext context)
    {
        var dataService = new GeneringDataService();
        
        // Załaduj typy stóp procentowych
        SeedInterestRateTypes(context);
        
        // Załaduj dane populacji
        LoadPopulationData(context, dataService);
        
        // Załaduj dane o cenach mieszkań
        LoadFlatPricesData(context, dataService);
        
        // Załaduj stopy procentowe
        LoadInterestRatesData(context, dataService);
    }

    private static void SeedInterestRateTypes(AppDbContext context)
    {
        // Sprawdź czy typy już istnieją
        if (context.TypeOfInterestRates.Any())
            return;
            
        var types = new[]
        {
            new TypeOfInterestRate { Name = "REF" },
            new TypeOfInterestRate { Name = "LOM" },
            new TypeOfInterestRate { Name = "RED" }
        };
        
        context.TypeOfInterestRates.AddRange(types);
        context.SaveChanges(); // Zapisz typy, aby uzyskać ID
    }

    private static void LoadPopulationData(AppDbContext context, GeneringDataService dataService)
    {
        var populationData = dataService.LoadPopulationData();
        var cities = context.Cities.ToList();
        
        foreach (var row in populationData)
        {
            String nazwa = row.Nazwa;
            String[] nazwa1 = nazwa.Split(" ");
            
            string cityName = nazwa1[2];
            cityName = cityName
                .Replace("ą", "a")
                .Replace("ć", "c")
                .Replace("ę", "e")
                .Replace("ł", "l")
                .Replace("ń", "n")
                .Replace("ó", "o")
                .Replace("ś", "s")
                .Replace("ź", "z")
                .Replace("ż", "z")
                .Replace("Ą", "A")
                .Replace("Ć", "C")
                .Replace("Ę", "E")
                .Replace("Ł", "L")
                .Replace("Ń", "N")
                .Replace("Ó", "O")
                .Replace("Ś", "S")
                .Replace("Ź", "Z")
                .Replace("Ż", "Z");
            
            var city = cities.FirstOrDefault(c => c.Name.Equals(cityName, StringComparison.OrdinalIgnoreCase));
           
            if (city == null) continue;
            
            // Dodaj dane populacji dla każdego roku
            var years = new Dictionary<int, string>
            {
                { 2015, row.Year2015 },
                { 2016, row.Year2016 },
                { 2017, row.Year2017 },
                { 2018, row.Year2018 },
                { 2019, row.Year2019 },
                { 2020, row.Year2020 },
                { 2021, row.Year2021 },
                { 2022, row.Year2022 },
                { 2023, row.Year2023 },
                { 2024, row.Year2024 }
            };
            
            foreach (var year in years)
            {
                if (int.TryParse(year.Value?.Replace(" ", ""), out int population))
                {
                    context.Populations.Add(new Population
                    {
                        CityId = city.Id,
                        Year = year.Key,
                        Number = population
                    });
                
                }
            }
        }
    }

    private static void LoadFlatPricesData(AppDbContext context, GeneringDataService dataService)
    {
        var flatPrices = dataService.GetFlatPrices();
        var cities = context.Cities.ToList();
        
        foreach (var price in flatPrices)
        {
            if (!int.TryParse(price.Year, out int year)) continue;
            var cityPrices = new Dictionary<string, string>
            {
                { "Bialystok", price.Bialystok },
                { "Bydgoszcz", price.Bydgoszcz },
                { "Gdansk", price.Gdansk },
                { "Gdynia", price.Gdynia },
                { "Katowice", price.Katowice },
                { "Kielce", price.Kielce },
                { "Krakow", price.Krakow },
                { "Lublin", price.Lublin },
                { "Lodz", price.Lodz },
                { "Olsztyn", price.Olsztyn },
                { "Opole", price.Opole },
                { "Poznan", price.Poznan },
                { "Rzeszow", price.Rzeszow },
                { "Szczecin", price.Szczecin },
                { "Warszawa", price.Warszawa },
                { "Wroclaw", price.Wroclaw }
            };
            foreach (var cityPrice in cityPrices)
            {
                var city = cities.FirstOrDefault(c => c.Name.Equals(cityPrice.Key, StringComparison.OrdinalIgnoreCase));
                if (city == null || !double.TryParse(cityPrice.Value?.Replace(",", "."), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out double priceValue)) 
                    continue;
                
                // Parse Roman numeral quarters (I, II, III, IV) to integer (1, 2, 3, 4)
                int quarter = price.Kwartal switch
                {
                    "I" => 1,
                    "II" => 2,
                    "III" => 3,
                    "IV" => 4,
                    _ => 0
                };
                
                if (quarter > 0)
                {
                    Console.WriteLine($"Adding MeterData: City={city.Name}({city.Id}), Year={year}, Quarter={quarter}, Price={priceValue}, IsRealistic={price.IsRealistic}, IsSecondaryMarket={price.IsSecondaryMarket}");
                    context.MeterData.Add(new MeterData
                    {
                        CityId = city.Id,
                        Year = year,
                        Quarter = quarter,
                        Price = priceValue,
                        IsRealistic = price.IsRealistic,
                        IsSecondaryMarket = price.IsSecondaryMarket
                    });
                }
                else
                {
                    Console.WriteLine($"Warning: Unable to parse quarter '{price.Kwartal}' for year {year}");
                }
            }
        }
    }

    private static void LoadInterestRatesData(AppDbContext context, GeneringDataService dataService)
    {
        var interestRates = dataService.GetInterestRates();
        var types = context.TypeOfInterestRates.ToList();
        
        foreach (var rate in interestRates)
        {
            var refType = types.First(t => t.Name == "REF");
            var lomType = types.First(t => t.Name == "LOM");
            var redType = types.First(t => t.Name == "RED");
            
            // Konwersja DateTime na UTC
            var utcDate = rate.ObowiazujeOd.Kind == DateTimeKind.Unspecified 
                ? DateTime.SpecifyKind(rate.ObowiazujeOd, DateTimeKind.Utc)
                : rate.ObowiazujeOd.ToUniversalTime();
            
            context.InterestRates.AddRange(new[]
            {
                new InterestRate 
                { 
                    TypeOfInterestRateId = refType.Id, 
                    Rate = (int)(rate.Ref * 100), // Konwersja na całkowitą wartość procentową
                    Date = utcDate 
                },
                new InterestRate 
                { 
                    TypeOfInterestRateId = lomType.Id, 
                    Rate = (int)(rate.Lom * 100), 
                    Date = utcDate 
                },
                new InterestRate 
                { 
                    TypeOfInterestRateId = redType.Id, 
                    Rate = (int)(rate.Red * 100), 
                    Date = utcDate 
                }
            });
        }
    }
}