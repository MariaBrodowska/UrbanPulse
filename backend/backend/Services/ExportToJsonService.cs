using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace backend.Services;

public class ExportToJsonService
{
    private readonly AppDbContext _context;

    public ExportToJsonService(AppDbContext appDbContext)
    {
        _context = appDbContext;
    }

    public async Task<string> ExportCitiesToJson()
    {
        var cities = await _context.Cities.Select(c => new CityDto
        {
            Id = c.Id,
            Name = c.Name
        }).ToListAsync();

        return JsonConvert.SerializeObject(cities, Newtonsoft.Json.Formatting.Indented);
    }

    public async Task<string> ExportMeterDataToJson()
    {
        var meterData = await _context.MeterData
            .Include(m => m.City)
            .Select(m => new
            {
                Id = m.Id,
                Year = m.Year,
                Quarter = m.Quarter,
                Price = m.Price,
                IsRealistic = m.IsRealistic,
                IsSecondaryMarket = m.IsSecondaryMarket,
                CityId = m.CityId,
                CityName = m.City != null ? m.City.Name : string.Empty
            })
            .ToListAsync();

        return JsonConvert.SerializeObject(meterData, Newtonsoft.Json.Formatting.Indented);
    }

    public async Task<string> ExportPopulationToJson()
    {
        var populations = await _context.Populations
            .Include(p => p.City)
            .Select(p => new
            {
                Id = p.Id,
                Year = p.Year,
                Number = p.Number,
                CityId = p.CityId,
                CityName = p.City != null ? p.City.Name : string.Empty
            })
            .ToListAsync();

        return JsonConvert.SerializeObject(populations, Newtonsoft.Json.Formatting.Indented);
    }

    public async Task<string> ExportInterestRatesToJson()
    {
        var interestRates = await _context.InterestRates
            .Include(ir => ir.TypeOfInterestRate)
            .OrderBy(ir => ir.Date)
            .Select(ir => new
            {
                Id = ir.Id,
                Rate = ir.Rate,
                Date = ir.Date,
                TypeOfInterestRateId = ir.TypeOfInterestRateId,
                TypeName = ir.TypeOfInterestRate != null ? ir.TypeOfInterestRate.Name : string.Empty
            })
            .ToListAsync();

        var ratesByDate = interestRates
            .GroupBy(ir => ir.Date.Date)
            .OrderBy(g => g.Key)
            .Select(g => new
            {
                Date = g.Key,
                Rates = g.Select(r => new
                {
                    Id = r.Id,
                    Rate = r.Rate,
                    TypeOfInterestRateId = r.TypeOfInterestRateId,
                    TypeName = r.TypeName
                }).ToList()
            });

        return JsonConvert.SerializeObject(ratesByDate, Newtonsoft.Json.Formatting.Indented);
    }

    public async Task<string> ExportTableToJson(string tableName)
    {
        var element = tableName.ToLower() switch
        {
            "cities" => await ExportCitiesToJson(),
            "populations" => await ExportPopulationToJson(),
            "meterdata" => await ExportMeterDataToJson(),
            "interestrates" => await ExportInterestRatesToJson(),
            _ => throw new ArgumentException($"Unknown table name: {tableName}")
        };

        return element;
    }
    public FileContentResult SaveJsonToFile(string? jsonContent, string fileName = "database_export.json")
{
    if (string.IsNullOrWhiteSpace(jsonContent))
        throw new Exception("Brak danych do eksportu.");

    byte[] byteArray = Encoding.UTF8.GetBytes(jsonContent);

    return new FileContentResult(byteArray, "application/json")
    {
        FileDownloadName = fileName
    };
}
}