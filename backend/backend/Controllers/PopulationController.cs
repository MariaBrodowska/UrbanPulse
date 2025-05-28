using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Dtos;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PopulationController : ControllerBase
{
    private readonly PopulationService _populationService;
    
    public PopulationController(PopulationService service)
    {
        _populationService = service;
    }
    
    [HttpGet("")]
    public ActionResult<List<PopulationDto>> GetAllPopulations()
    {
        var populations = _populationService.GetAllPopulations();
        return Ok(populations);
    }

    [HttpGet("{id}")]
    public ActionResult<PopulationDto> GetPopulationById(int id)
    {
        var population = _populationService.GetPopulationById(id);
        if (population == null)
            return NotFound();
        
        return Ok(population);
    }

    [HttpGet("by-year/{year}")]
    public ActionResult<List<PopulationDto>> GetPopulationsByYear(int year)
    {
        var populations = _populationService.GetPopulationsByYear(year);
        return Ok(populations);
    }

    [HttpGet("by-city/{cityName}")]
    public ActionResult<List<PopulationDto>> GetPopulationsByCity(string cityName)
    {
        var populations = _populationService.GetPopulationsByCity(cityName);
        return Ok(populations);
    }

    [HttpGet("combined")]
    public ActionResult<List<PopulationDto>> GetPopulationsByCombinedFilters(
        [FromQuery] int? id = null, 
        [FromQuery] int? year = null, 
        [FromQuery] string? city = null)
    {
        var populations = _populationService.GetPopulationsByCombinedFilters(id, year, city);
        return Ok(populations);
    }

    [HttpPost("with-city")]
    public async Task<ActionResult<PopulationDto>> AddPopulationWithCity([FromBody] CreatePopulationDto dto)
    {
        try
        {
            var result = await _populationService.AddPopulationWithCity(dto.CityName, dto.Year, dto.Number);
            return CreatedAtAction(nameof(GetPopulationById), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
        
    }

    [HttpPost("")]
    public async Task<ActionResult<PopulationDto>> AddPopulation([FromBody] CreatePopulationWithCityIdDto dto)
    {
        try
        {
            var result = await _populationService.AddPopulation(dto.CityId, dto.Year, dto.Number);
            return CreatedAtAction(nameof(GetPopulationById), new { id = result.Id }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PopulationDto>> UpdatePopulation(int id, [FromBody] int number)
    {
        var result = await _populationService.UpdatePopulation(id, number);
        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePopulation(int id)
    {
        var success = await _populationService.DeletePopulation(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}