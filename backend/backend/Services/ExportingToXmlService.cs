using System.Xml.Linq;
using System.Xml.Serialization;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace backend.Services;

public class ExportingToXmlService
{
    private readonly AppDbContext _context;
    
    public ExportingToXmlService(AppDbContext context)
    {
        _context = context;
    }
    
    // Eksportuj wszystkie tabele (poza Users) do jednego pliku XML
    public async Task<string> ExportAllTablesToXml()
    {
        var root = new XElement("Database");
        
        var citiesData = await ExportCitiesToXml();
        root.Add(citiesData);
        var populationsData = await ExportPopulationsToXml();
        root.Add(populationsData);
        var meterData = await ExportMeterDataToXml();
        root.Add(meterData);
        
        var interestRatesData = await ExportInterestRatesToXml();
        root.Add(interestRatesData);
        var document = new XDocument(
            new XDeclaration("1.0", "utf-8", "yes"),
            root
        );
        
        return document.ToString();
    }
    
    // Eksportuj Cities do XML
    public async Task<XElement> ExportCitiesToXml()
    {
        var cities = await _context.Cities.ToListAsync();
        
        var citiesElement = new XElement("Cities");
        
        foreach (var city in cities)
        {
            var cityElement = new XElement("City",
                new XAttribute("Id", city.Id),
                new XElement("Name", city.Name)
            );
            citiesElement.Add(cityElement);
        }
        
        return citiesElement;
    }
    
    // Eksportuj Populations do XML
    public async Task<XElement> ExportPopulationsToXml()
    {
        var populations = await _context.Populations
            .Include(p => p.City)
            .ToListAsync();
        
        var populationsElement = new XElement("Populations");
        
        foreach (var population in populations)
        {
            var populationElement = new XElement("Population",
                new XAttribute("Id", population.Id),
                new XElement("Year", population.Year),
                new XElement("Number", population.Number),
                new XElement("CityName", population.City?.Name ?? "Unknown")
            );
            populationsElement.Add(populationElement);
        }
        
        return populationsElement;
    }
    
    // Eksportuj MeterData do XML
    public async Task<XElement> ExportMeterDataToXml()
    {
        var meterData = await _context.MeterData
            .Include(m => m.City)
            .ToListAsync();
        
        var meterDataElement = new XElement("MeterData");
        
        foreach (var meter in meterData)
        {
            var meterElement = new XElement("Meter",
                new XAttribute("Id", meter.Id),
                new XElement("Year", meter.Year),
                new XElement("Quarter", meter.Quarter),
                new XElement("Price", meter.Price.ToString("F2")),
                new XElement("IsRealistic", meter.IsRealistic),
                new XElement("IsSecondaryMarket", meter.IsSecondaryMarket),
                new XElement("CityName", meter.City?.Name ?? "Unknown")
            );
            meterDataElement.Add(meterElement);
        }
        
        return meterDataElement;
    }
    
    // Eksportuj InterestRates i TypeOfInterestRates do XML
    public async Task<XElement> ExportInterestRatesToXml()
    {
        var interestRates = await _context.InterestRates
            .Include(ir => ir.TypeOfInterestRate)
            .OrderBy(ir => ir.Date)
            .ToListAsync();
            
        var interestRatesElement = new XElement("InterestRates");
        
        // Group by date
        var ratesByDate = interestRates
            .GroupBy(ir => ir.Date.Date)
            .OrderBy(g => g.Key);
            
        foreach (var dateGroup in ratesByDate)
        {
            var dateElement = new XElement("DateGroup", 
            new XAttribute("Date", dateGroup.Key.ToString("yyyy-MM-dd")));
            
            interestRatesElement.Add(dateElement);
            
            foreach (var rate in dateGroup)
            {
            dateElement.Add(new XElement("InterestRate",
                new XAttribute("Id", rate.Id),
                new XElement("Rate", rate.Rate),
                new XElement("TypeName", rate.TypeOfInterestRate?.Name ?? "Unknown")
            ));
            }
        }
        
        foreach (var rate in interestRates)
        {
            var rateElement = new XElement("InterestRate",
                new XAttribute("Id", rate.Id),
                new XElement("Rate", rate.Rate),
                new XElement("Date", rate.Date.ToString("yyyy-MM-dd")),
                new XElement("TypeId", rate.TypeOfInterestRateId),
                new XElement("TypeName", rate.TypeOfInterestRate?.Name ?? "Unknown")
            );
            interestRatesElement.Add(rateElement);
        }
        
        return interestRatesElement;
    }
    
    
   public FileContentResult SaveXmlToFile(string? xmlContent, string fileName = "database_export.xml")
{
    if (string.IsNullOrWhiteSpace(xmlContent))
        throw new Exception("Brak danych do eksportu.");

    byte[] byteArray = Encoding.UTF8.GetBytes(xmlContent);

    return new FileContentResult(byteArray, "application/xml")
    {
        FileDownloadName = fileName
    };
}

    
    // Eksportuj konkretną tabelę do XML
    public async Task<string> ExportTableToXml(string tableName)
    {
        var element = tableName.ToLower() switch
        {
            "cities" => await ExportCitiesToXml(),
            "populations" => await ExportPopulationsToXml(),
            "meterdata" => await ExportMeterDataToXml(),
            "interestrates" => await ExportInterestRatesToXml(),
            
            _ => throw new ArgumentException($"Unknown table name: {tableName}")
        };
        
        var document = new XDocument(
            new XDeclaration("1.0", "utf-8", "yes"),
            element
        );
        
        return document.ToString();
    }
    
    public async Task<string> ExportDataByDateRange(DateTime startDate, DateTime endDate)
    {
        var root = new XElement("DatabaseByDateRange",
            new XAttribute("StartDate", startDate.ToString("yyyy-MM-dd")),
            new XAttribute("EndDate", endDate.ToString("yyyy-MM-dd"))
        );
        
        var populations = await _context.Populations
            .Include(p => p.City)
            .Where(p => p.Year >= startDate.Year && p.Year <= endDate.Year)
            .ToListAsync();
        
        var populationsElement = new XElement("Populations");
        foreach (var population in populations)
        {
            var populationElement = new XElement("Population",
                new XAttribute("Id", population.Id),
                new XElement("Year", population.Year),
                new XElement("Number", population.Number),
                new XElement("CityId", population.CityId),
                new XElement("CityName", population.City?.Name ?? "Unknown")
            );
            populationsElement.Add(populationElement);
        }
        root.Add(populationsElement);
        
        var meterData = await _context.MeterData
            .Include(m => m.City)
            .Where(m => m.Year >= startDate.Year && m.Year <= endDate.Year)
            .ToListAsync();
        
        var meterDataElement = new XElement("MeterData");
        foreach (var meter in meterData)
        {
            var meterElement = new XElement("Meter",
                new XAttribute("Id", meter.Id),
                new XElement("Year", meter.Year),
                new XElement("Quarter", meter.Quarter),
                new XElement("Price", meter.Price.ToString("F2")),
                new XElement("IsRealistic", meter.IsRealistic),
                new XElement("IsSecondaryMarket", meter.IsSecondaryMarket),
                new XElement("CityName", meter.City?.Name ?? "Unknown")
            );
            meterDataElement.Add(meterElement);
        }
        root.Add(meterDataElement);
        
        // InterestRates - filtruj po dacie
        var interestRates = await _context.InterestRates
            .Include(ir => ir.TypeOfInterestRate)
            .Where(ir => ir.Date >= startDate && ir.Date <= endDate)
            .ToListAsync();
        
        var interestRatesElement = new XElement("InterestRates");
        foreach (var rate in interestRates)
        {
            var rateElement = new XElement("InterestRate",
                new XAttribute("Id", rate.Id),
                new XElement("Rate", rate.Rate),
                new XElement("Date", rate.Date.ToString("yyyy-MM-dd")),
                new XElement("TypeName", rate.TypeOfInterestRate?.Name ?? "Unknown")
            );
            interestRatesElement.Add(rateElement);
        }
        root.Add(interestRatesElement);
        
        var document = new XDocument(
            new XDeclaration("1.0", "utf-8", "yes"),
            root
        );
        
        return document.ToString();
    }
}