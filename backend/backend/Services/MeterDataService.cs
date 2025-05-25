using backend.Data;
using backend.Models;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MeterDataService
{
    private readonly AppDbContext _context;
    
    public MeterDataService(AppDbContext context)
    {
        _context = context;
    }
    
    private static MeterDataDto MapToDto(MeterData meterData)
    {
        return new MeterDataDto
        {
            Id = meterData.Id,
            Year = meterData.Year,
            Price = meterData.Price,
            Quarter = meterData.Quarter,
            IsSecondaryMarket = meterData.IsSecondaryMarket,
            IsRealistic = meterData.IsRealistic,
            CityId = meterData.CityId,
            CityName = meterData.City?.Name ?? string.Empty
        };
    }
    public List<MeterDataDto> GetAllMeterData()
    {
        return _context.MeterData
            .Include(m => m.City)
            .Select(m => MapToDto(m))
            .ToList();
    }
    
    public MeterDataDto? GetMeterDataById(int id)
    {
        return _context.MeterData
            .Include(m => m.City)
            .Where(m => m.Id == id)
            .Select(m => MapToDto(m))
            .FirstOrDefault();
    }
    
    public List<MeterDataDto> GetMeterDatasByYear(int year)
    {
        return _context.MeterData
            .Include(m => m.City)
            .Where(m => m.Year == year)
            .Select(m => MapToDto(m))
            .ToList();
    }
    
    public List<MeterDataDto> GetMeterDataByMarket(bool isSecondaryMarket)
    {
        return _context.MeterData
            .Include(m => m.City)
            .Where(m => m.IsSecondaryMarket == isSecondaryMarket)
            .Select(m => MapToDto(m))
            .ToList();
    }

    public List<MeterDataDto> GetMeterDataBySales(bool isRealistic)
    {
        return _context.MeterData
            .Include(m => m.City)
            .Where(m => m.IsRealistic == isRealistic)
            .Select(m => MapToDto(m))
            .ToList();
    }

    public List<MeterDataDto> GetMeterDataByCityName(string cityName)
    {
        return _context.MeterData
            .Include(m => m.City)
            .Where(m => m.City.Name.ToLower() == cityName.ToLower())
            .Select(m => MapToDto(m))
            .ToList();
    }

    public async Task<MeterDataDto> AddMeterDataWithCity(string cityName, int year, double price, int quarter, bool isSecondaryMarket, bool isRealistic)
    {
        var existingCity = await _context.Cities
            .FirstOrDefaultAsync(c => c.Name.ToLower() == cityName.ToLower());

        City city;
        if (existingCity == null)
        {
            city = new City { Name = cityName };
            _context.Cities.Add(city);
            await _context.SaveChangesAsync(); 
        }
        else
        {
            city = existingCity;
        }

        var existingMeterData = await _context.MeterData
            .FirstOrDefaultAsync(m => m.CityId == city.Id && m.Year == year && m.Quarter == quarter);

        if (existingMeterData != null)
        {
            throw new InvalidOperationException($"Meter data for {cityName} in {year} Q{quarter} already exists.");
        }
         if (quarter < 1 || quarter > 4)
        {
            throw new ArgumentException("Quarter must be between 1 and 4.");
        }
        if (price < 0)
        {
            throw new ArgumentException("Price can't be negative.");
        }

        var meterData = new MeterData
        {
            CityId = city.Id,
            Year = year,
            Price = price,
            Quarter = quarter,
            IsSecondaryMarket = isSecondaryMarket,
            IsRealistic = isRealistic
        };

        _context.MeterData.Add(meterData);
        await _context.SaveChangesAsync();

        return MapToDto(meterData);
    }

    public async Task<MeterDataDto> AddMeterData(int cityId, int year, double price, int quarter, bool isSecondaryMarket, bool isRealistic)
    {
        var city = await _context.Cities.FindAsync(cityId);
        if (city == null)
        {
            throw new ArgumentException($"City with ID {cityId} not found.");
        }

        var existingMeterData = await _context.MeterData
            .FirstOrDefaultAsync(m => m.CityId == cityId && m.Year == year && m.Quarter == quarter);

        if (existingMeterData != null)
        {
            throw new InvalidOperationException($"Meter data for city {city.Name} in {year} Q{quarter} already exists.");
        }
        if (quarter < 1 || quarter > 4)
        {
            throw new ArgumentException("Quarter must be between 1 and 4.");
        }
        if (price < 0)
        {
            throw new ArgumentException("Price can't be negative.");
        }

        var meterData = new MeterData
        {
            CityId = cityId,
            Year = year,
            Price = price,
            Quarter = quarter,
            IsSecondaryMarket = isSecondaryMarket,
            IsRealistic = isRealistic
        };

        _context.MeterData.Add(meterData);
        await _context.SaveChangesAsync();

        return MapToDto(meterData);
    }

    public async Task<MeterDataDto?> UpdateMeterData(int id, double price)
    {
        var meterData = await _context.MeterData
            .Include(m => m.City)
            .FirstOrDefaultAsync(m => m.Id == id);
        if (meterData == null)
        {
            return null;
        }
        if (price < 0)
        {
            throw new ArgumentException("Price can't be negative.");
        }
        meterData.Price = price;
        await _context.SaveChangesAsync();
        return MapToDto(meterData);
    }


    public async Task<bool> DeleteMeterData(int id)
    {
        var meterData = await _context.MeterData.FindAsync(id);
        if (meterData == null)
        {
            return false;
        }
        _context.MeterData.Remove(meterData);
        await _context.SaveChangesAsync();
        return true;
    }
}