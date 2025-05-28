using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[Route("api/interest-rates")]
[ApiController]
[Authorize]
public class InterestRatesController : ControllerBase
{
    private readonly InterestRatesService _interestRatesService;
    
    public InterestRatesController(InterestRatesService service)
    {
        _interestRatesService = service;
    }
    
    [HttpGet("")] //wszsytkie oprocentowania
    public ActionResult<List<InterestRateDto>> GetAllInterestRates()
    {
        var interestRates = _interestRatesService.GetAllInterestRates();
        return Ok(interestRates);
    }

    [HttpGet("{id}")] //wybrane
    public ActionResult<InterestRateDto> GetInterestRatesById(int id)
    {
        var interestRates = _interestRatesService.GetInterestRatesById(id);
        if (interestRates == null)
            return NotFound();
        
        return Ok(interestRates);
    }
    [HttpGet("combined")]
    public ActionResult<List<InterestRateDto>> GetCombinedFilters(
        [FromQuery] int? id = null,
        [FromQuery] int? yearRange = null,
        [FromQuery] int? yearRange_2 = null)
    {
        var interestRates = _interestRatesService.GetInterestRatesByCombinedFilters(id, yearRange, yearRange_2);
        return Ok(interestRates);
    }


    [HttpGet("by-year/{year}")] //w danym roku, srednia z kwartałów
    public ActionResult<List<InterestRateDto>> GetInterestRatesByYear(int year)
    {
        var interestRates = _interestRatesService.GetInterestRatesByYear(year);
        return Ok(interestRates);
    }

    [HttpGet("by-years/{year1}/{year2}")] //od danego roku do danego roku
    public ActionResult<List<InterestRateDto>> GetInterestRatesByYears(int year1, int year2)
    {
        if (year1 > year2)
            return BadRequest("Pierwszy rok musi być mniejszy lub równy drugiemu.");
        var interestRates = _interestRatesService.GetInterestRatesByYears(year1, year2);
        return Ok(interestRates);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("")] //dodanie oprocentowania
    public async Task<ActionResult<InterestRateDto>> AddInterestRate([FromBody] CreateIRWithTOIRIdDto dto)
    {    
        try
        {
            var result = await _interestRatesService.AddInterestRate(dto.Date, dto.Rate, dto.TypeOfInterestRateId);
            return CreatedAtAction(nameof(GetInterestRatesById), new { id = result.Id }, result);
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

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")] //aktualizacja oprocentowania
    public async Task<ActionResult<InterestRateDto>> UpdateInterestRate(int id, [FromBody] int rate)
    {
        var result = await _interestRatesService.UpdateInterestRate(id, rate);
        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")] //usunięcie oprocentowania
    public async Task<IActionResult> DeleteInterestRate(int id)
    {
        var success = await _interestRatesService.DeleteInterestRate(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}