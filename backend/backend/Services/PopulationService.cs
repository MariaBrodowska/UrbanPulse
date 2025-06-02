using backend.Data;
using backend.Models;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Services;

public class PopulationService
{
    private readonly AppDbContext _context;
    
    public PopulationService(AppDbContext context)
    {
        _context = context;
    }
    
    public List<PopulationDto> GetAllPopulations()
    {
        return _context.Populations
            .Include(p => p.City)
            .Where(p => p.Year >= 2015 && p.Year < 2025) 
            .OrderBy(p => p.Id)
            .Select(p => new PopulationDto
            {
            Id = p.Id,
            Year = p.Year,
            Number = p.Number,
            CityId = p.CityId,
            CityName = p.City != null ? p.City.Name : string.Empty
            })
            .ToList();
    }

    public PopulationDto? GetPopulationById(int id)
    {
        return _context.Populations
            .Include(p => p.City)
            .Where(p => p.Id == id)
            .Select(p => new PopulationDto
            {
                Id = p.Id,
                Year = p.Year,
                Number = p.Number,
                CityId = p.CityId,
                CityName = p.City != null ? p.City.Name : string.Empty
            })
            .FirstOrDefault();
    }

    public List<PopulationDto> GetPopulationsByYear(int year)
    {
         if (year < 2015 || year >= 2025)
        {
            return new List<PopulationDto>();
        }
        
        return _context.Populations
            .Include(p => p.City)
            .Where(p => p.Year == year)
            .Select(p => new PopulationDto
            {
                Id = p.Id,
                Year = p.Year,
                Number = p.Number,
                CityId = p.CityId,
                CityName = p.City != null ? p.City.Name : string.Empty
            })
            .ToList();
    }

    public List<PopulationDto> GetPopulationsByCity(string cityName)
    {
        return _context.Populations
            .Include(p => p.City)
            .Where(p => p.City.Name.ToLower() == cityName.ToLower())
            .Select(p => new PopulationDto
            {
                Id = p.Id,
                Year = p.Year,
                Number = p.Number,
                CityId = p.CityId,
                CityName = p.City != null ? p.City.Name : string.Empty
            })
            .ToList();
    }

        public List<PopulationDto> GetPopulationsByCombinedFilters(int? id = null, int? year = null, string? cityName = null,int? yearFrom = null, int? yearTo = null)
    {
        var query = _context.Populations
            .Include(p => p.City)
            .AsQueryable();

        int fromYear = yearFrom ?? 2015;
        int toYear = yearTo ?? 2024;
        
        query = query.Where(m => m.Year >= fromYear && m.Year <= toYear);

        if (id.HasValue)
        {
            query = query.Where(p => p.Id == id.Value);
        }

        if (year.HasValue)
        {
            query = query.Where(p => p.Year == year.Value);
        }

        if (!string.IsNullOrEmpty(cityName))
        {
            query = query.Where(p => p.City.Name.ToLower() == cityName.ToLower());
        }

        return query.Select(p => new PopulationDto
        {
            Id = p.Id,
            Year = p.Year,
            Number = p.Number,
            CityId = p.CityId,
            CityName = p.City != null ? p.City.Name : string.Empty
        }).ToList();
    }

    public async Task<PopulationDto> AddPopulationWithCity(string cityName, int year, int number)
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

        var existingPopulation = await _context.Populations
            .FirstOrDefaultAsync(p => p.CityId == city.Id && p.Year == year);

        if (existingPopulation != null)
        {
            throw new InvalidOperationException($"Population for {cityName} in {year} already exists.");
        }

        var population = new Population
        {
            CityId = city.Id,
            Year = year,
            Number = number
        };

        _context.Populations.Add(population);
        await _context.SaveChangesAsync();

        return new PopulationDto
        {
            Id = population.Id,
            Year = population.Year,
            Number = population.Number,
            CityId = population.CityId,
            CityName = cityName
        };
    }

    public async Task<PopulationDto> AddPopulation(int cityId, int year, int number)
    {
        var city = await _context.Cities.FindAsync(cityId);
        if (city == null)
        {
            throw new ArgumentException($"City with ID {cityId} not found.");
        }

        var existingPopulation = await _context.Populations
            .FirstOrDefaultAsync(p => p.CityId == cityId && p.Year == year);

        if (existingPopulation != null)
        {
            throw new InvalidOperationException($"Population for city {city.Name} in {year} already exists.");
        }

        var population = new Population
        {
            CityId = cityId,
            Year = year,
            Number = number
        };

        _context.Populations.Add(population);
        await _context.SaveChangesAsync();

        return new PopulationDto
        {
            Id = population.Id,
            Year = population.Year,
            Number = population.Number,
            CityId = population.CityId,
            CityName = city.Name
        };
    }

    public async Task<PopulationDto?> UpdatePopulation(int id, int number, int year, string cityName)
    {
        var population = await _context.Populations
            .Include(p => p.City)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (population == null)
        {
            return null;
        }

        population.Number = number;
        population.Year = year;

        if (!string.IsNullOrEmpty(cityName) && 
            (population.City == null || !population.City.Name.Equals(cityName, StringComparison.OrdinalIgnoreCase)))
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

            population.CityId = city.Id;
        }

        await _context.SaveChangesAsync();

        population = await _context.Populations
            .Include(p => p.City)
            .FirstOrDefaultAsync(p => p.Id == id);

        return new PopulationDto
        {
            Id = population.Id,
            Year = population.Year,
            Number = population.Number,
            CityId = population.CityId,
            CityName = population.City?.Name ?? string.Empty
        };
    }

    public async Task<bool> DeletePopulation(int id)
    {
        var population = await _context.Populations.FindAsync(id);
        if (population == null)
        {
            return false;
        }

        _context.Populations.Remove(population);
        await _context.SaveChangesAsync();
        return true;
    }
}