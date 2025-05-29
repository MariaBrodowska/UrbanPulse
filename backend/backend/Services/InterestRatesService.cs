using backend.Data;
using backend.Models;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Services;

public class InterestRatesService
{
    private readonly AppDbContext _context;
    
    public InterestRatesService(AppDbContext context)
    {
        _context = context;
    }
    
    public List<InterestRateDto> GetAllInterestRates()
    {
        return _context.InterestRates
            .Include(i => i.TypeOfInterestRate)
            .Select(i => new InterestRateDto
            {
                Id = i.Id,
                Date = i.Date,
                Rate = i.Rate,
                TypeOfInterestRateId = i.TypeOfInterestRateId,
                TypeOfInterestRateName = i.TypeOfInterestRate != null ? i.TypeOfInterestRate.Name : string.Empty
            })
            .ToList();
    }

    public InterestRateDto? GetInterestRatesById(int id)
    {
        return _context.InterestRates
            .Include(i => i.TypeOfInterestRate)
            .Where(i => i.Id == id)
            .Select(i => new InterestRateDto
            {
                Id = i.Id,
                Date = i.Date,
                Rate = i.Rate,
                TypeOfInterestRateId = i.TypeOfInterestRateId,
                TypeOfInterestRateName = i.TypeOfInterestRate != null ? i.TypeOfInterestRate.Name : string.Empty
            })
            .FirstOrDefault();
    }

    public List<InterestRateDto> GetInterestRatesByYear(int year) //zwraca srednia z kwartalow w danym roku
    {
    var ratesForYear = _context.InterestRates
        .Where(r => r.Date.Year == year)
        .ToList();
        
    if (!ratesForYear.Any())
    {
        return new List<InterestRateDto>();
    }
    var averageRate = (int)Math.Round(ratesForYear.Average(r => r.Rate));
        return new List<InterestRateDto>
    {
        new InterestRateDto
        {
            Id = 0,
            Date = new DateTime(year, 1, 1),
            Rate = averageRate,
            TypeOfInterestRateId = 0,
            TypeOfInterestRateName = "Średnia wszystkich stóp procentowych"
        }
    };
    }

    public List<InterestRateDto> GetInterestRatesByYears(int year1, int year2) //zwraca od danego roku do danego roku
    {
        return _context.InterestRates
            .Include(i => i.TypeOfInterestRate)
            .Where(i => i.Date.Year >= year1 && i.Date.Year <= year2)
            .Select(i => new InterestRateDto
            {
                Id = i.Id,
                Date = i.Date,
                Rate = i.Rate,
                TypeOfInterestRateId = i.TypeOfInterestRateId,
                TypeOfInterestRateName = i.TypeOfInterestRate != null ? i.TypeOfInterestRate.Name : string.Empty
            })
            .ToList();
    }

    public async Task<InterestRateDto> AddInterestRate(DateTime date, int rate, string TypeOfInterestRateName)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try{
            var typeOfInterestRate = await _context.TypeOfInterestRates.FindAsync(TypeOfInterestRateName);
            if (typeOfInterestRate == null)
            {
                throw new ArgumentException($"Type of interest rate with Name {TypeOfInterestRateName} not found.");
            }
            var existingInterestRate = await _context.InterestRates
                .FirstOrDefaultAsync(i => i.Date == date && i.TypeOfInterestRateId == typeOfInterestRate.Id);
            if (existingInterestRate != null)
            {
                throw new InvalidOperationException($"Interest rate for type {typeOfInterestRate.Name} on {date.ToShortDateString()} already exists.");
            }
            var interestRate = new InterestRate
            {
                Date = date,
                Rate = rate,
                TypeOfInterestRateId = typeOfInterestRate.Id
            };
            _context.InterestRates.Add(interestRate);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return new InterestRateDto
            {
                Id = interestRate.Id,
                Date = interestRate.Date,
                Rate = interestRate.Rate,
                TypeOfInterestRateId = interestRate.TypeOfInterestRateId,
                TypeOfInterestRateName = typeOfInterestRate.Name
            };
        }
        catch{
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<InterestRateDto?> UpdateInterestRate(int id, DateTime date, int rate, int typeOfInterestRateId)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try{
            var interestRate = await _context.InterestRates
                .Include(i => i.TypeOfInterestRate)
                .FirstOrDefaultAsync(i => i.Id == id);
            if (interestRate == null)
            {
                return null;
            }

            // Check if the new TypeOfInterestRate exists
            var typeOfInterestRate = await _context.TypeOfInterestRates.FindAsync(typeOfInterestRateId);
            if (typeOfInterestRate == null)
            {
                throw new ArgumentException($"Type of interest rate with ID {typeOfInterestRateId} not found.");
            }

            // Check for duplicate entries (same date and type, but different id)
            var existingInterestRate = await _context.InterestRates
                .FirstOrDefaultAsync(i => i.Date == date && i.TypeOfInterestRateId == typeOfInterestRateId && i.Id != id);
            if (existingInterestRate != null)
            {
                throw new InvalidOperationException($"Interest rate for type {typeOfInterestRate.Name} on {date.ToShortDateString()} already exists.");
            }

            interestRate.Date = date;
            interestRate.Rate = rate;
            interestRate.TypeOfInterestRateId = typeOfInterestRateId;
            
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            
            // Reload the entity to get the updated TypeOfInterestRate
            await _context.Entry(interestRate).Reference(i => i.TypeOfInterestRate).LoadAsync();
            
            return new InterestRateDto
            {
                Id = interestRate.Id,
                Date = interestRate.Date,
                Rate = interestRate.Rate,
                TypeOfInterestRateId = interestRate.TypeOfInterestRateId,
                TypeOfInterestRateName = interestRate.TypeOfInterestRate?.Name ?? string.Empty
            };
        }
        catch{
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<bool> DeleteInterestRate(int id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try{
            var interestRates = await _context.InterestRates.FindAsync(id);
            if (interestRates == null)
            {
                return false;
            }
            _context.InterestRates.Remove(interestRates);
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

    public List<InterestRateDto> GetInterestRatesByCombinedFilters(int? id, int? yearRange, int? yearRange_2)
    {
        var query = _context.InterestRates
            .Include(i => i.TypeOfInterestRate)
            .AsQueryable();

        // Filter by ID if provided
        if (id.HasValue)
        {
            query = query.Where(i => i.Id == id.Value);
        }

        // Filter by year range if provided
        if (yearRange.HasValue && yearRange_2.HasValue)
        {
            int startYear = Math.Min(yearRange.Value, yearRange_2.Value);
            int endYear = Math.Max(yearRange.Value, yearRange_2.Value);
            query = query.Where(i => i.Date.Year >= startYear && i.Date.Year <= endYear);
        }
        else if (yearRange.HasValue)
        {
            query = query.Where(i => i.Date.Year == yearRange.Value);
        }

        return query
            .Select(i => new InterestRateDto
            {
                Id = i.Id,
                Date = i.Date,
                Rate = i.Rate,
                TypeOfInterestRateId = i.TypeOfInterestRateId,
                TypeOfInterestRateName = i.TypeOfInterestRate != null ? i.TypeOfInterestRate.Name : string.Empty
            })
            .ToList();
    }
}