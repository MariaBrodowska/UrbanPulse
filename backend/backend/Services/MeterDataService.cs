using backend.Data;
using backend.Models;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Data;

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

    public List<MeterDataDto> GetMeterDataCombined(bool? isSecondaryMarket = null, bool? isRealistic = null, int? id = null, string? cityName = null, int? yearFrom = null, int? yearTo = null)
    {
        var query = _context.MeterData
            .Include(m => m.City)
            .AsQueryable();

        // Filtruj zakres lat - jeśli nie podano parametrów, używaj domyślnego zakresu 2015-2024
        int fromYear = yearFrom ?? 2015;
        int toYear = yearTo ?? 2024;
        
        query = query.Where(m => m.Year >= fromYear && m.Year <= toYear);

        if (isSecondaryMarket.HasValue)
        {
            query = query.Where(m => m.IsSecondaryMarket == isSecondaryMarket.Value);
        }

        if (isRealistic.HasValue)
        {
            query = query.Where(m => m.IsRealistic == isRealistic.Value);
        }

        if (id.HasValue)
        {
            query = query.Where(m => m.Id == id.Value);
        }

        if (!string.IsNullOrEmpty(cityName))
        {
            query = query.Where(m => m.City.Name.ToLower() == cityName.ToLower());
        }

        return query.Select(m => MapToDto(m)).ToList();
    }

    public async Task<MeterDataDto> AddMeterDataWithCity(string cityName, int year, double price, int quarter, bool isSecondaryMarket, bool isRealistic)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        try{
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
            await transaction.CommitAsync();
            return MapToDto(meterData);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<MeterDataDto> AddMeterData(int cityId, int year, double price, int quarter, bool isSecondaryMarket, bool isRealistic)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        try{
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
            await transaction.CommitAsync();
            return MapToDto(meterData);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<MeterDataDto?> UpdateMeterData(int id, double price)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        try{
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
            // await Task.Delay(10000);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return MapToDto(meterData);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<MeterDataDto?> UpdateMeterData(int id, int cityId, string cityName, int year, double price, int quarter, bool isSecondaryMarket, bool isRealistic)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        try
        {
            var meterData = await _context.MeterData
                .Include(m => m.City)
                .FirstOrDefaultAsync(m => m.Id == id);
            
            if (meterData == null)
            {
                return null;
            }

            // Validate input
            if (quarter < 1 || quarter > 4)
            {
                throw new ArgumentException("Quarter must be between 1 and 4.");
            }
            if (price < 0)
            {
                throw new ArgumentException("Price can't be negative.");
            }

            // Handle city update if cityName is provided and different
            City? city = null;
            if (!string.IsNullOrEmpty(cityName) && !cityName.Equals(meterData.City?.Name, StringComparison.OrdinalIgnoreCase))
            {
                city = await _context.Cities
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == cityName.ToLower());
                
                if (city == null)
                {
                    city = new City { Name = cityName };
                    _context.Cities.Add(city);
                    await _context.SaveChangesAsync();
                }
                meterData.CityId = city.Id;
            }
            else if (cityId > 0 && cityId != meterData.CityId)
            {
                city = await _context.Cities.FindAsync(cityId);
                if (city == null)
                {
                    throw new ArgumentException($"City with ID {cityId} not found.");
                }
                meterData.CityId = cityId;
            }

            // Check for duplicate entries (excluding the current record)
            // Only check if we're actually changing city, year, quarter, or market type
            var existingMeterData = await _context.MeterData
                .FirstOrDefaultAsync(m => m.Id != id && 
                                        m.CityId == meterData.CityId && 
                                        m.Year == year && 
                                        m.Quarter == quarter &&
                                        m.IsSecondaryMarket == isSecondaryMarket &&
                                        m.IsRealistic == isRealistic);

            if (existingMeterData != null)
            {
                var cityNameForError = city?.Name ?? meterData.City?.Name ?? "Unknown";
                var marketType = isSecondaryMarket ? "secondary" : "primary";
                var salesType = isRealistic ? "realistic" : "offered";
                throw new InvalidOperationException($"Meter data for {cityNameForError} in {year} Q{quarter} ({marketType} market, {salesType} prices) already exists.");
            }

            // Update all fields
            meterData.Year = year;
            meterData.Price = price;
            meterData.Quarter = quarter;
            meterData.IsSecondaryMarket = isSecondaryMarket;
            meterData.IsRealistic = isRealistic;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            
            // Reload to get updated city information
            var updatedMeterData = await _context.MeterData
                .Include(m => m.City)
                .FirstOrDefaultAsync(m => m.Id == id);
            
            return updatedMeterData != null ? MapToDto(updatedMeterData) : null;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }


    public async Task<bool> DeleteMeterData(int id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        try{
            var meterData = await _context.MeterData.FindAsync(id);
            if (meterData == null)
            {
                return false;
            }
            _context.MeterData.Remove(meterData);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return true;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}