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

    public async Task<InterestRateDto> AddInterestRate(DateTime date, int rate, int TypeOfInterestRateId)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try{
            var typeOfInterestRate = await _context.TypeOfInterestRates.FindAsync(TypeOfInterestRateId);
            if (typeOfInterestRate == null)
            {
                throw new ArgumentException($"Type of interest rate with ID {TypeOfInterestRateId} not found.");
            }
            var existingInterestRate = await _context.InterestRates
                .FirstOrDefaultAsync(i => i.Date == date && i.TypeOfInterestRateId == TypeOfInterestRateId);
            if (existingInterestRate != null)
            {
                throw new InvalidOperationException($"Interest rate for type {typeOfInterestRate.Name} on {date.ToShortDateString()} already exists.");
            }
            var interestRate = new InterestRate
            {
                Date = date,
                Rate = rate,
                TypeOfInterestRateId = TypeOfInterestRateId
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

    public async Task<InterestRateDto?> UpdateInterestRate(int id, int rate)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try{
            var interestRates = await _context.InterestRates
                .Include(i => i.TypeOfInterestRate)
                .FirstOrDefaultAsync(i => i.Id == id);
            if (interestRates == null)
            {
                return null;
            }
            interestRates.Rate = rate;
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return new InterestRateDto
            {
                Id = interestRates.Id,
                Date = interestRates.Date,
                Rate = interestRates.Rate,
                TypeOfInterestRateId = interestRates.TypeOfInterestRateId,
                TypeOfInterestRateName = interestRates.TypeOfInterestRate?.Name ?? string.Empty
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
}