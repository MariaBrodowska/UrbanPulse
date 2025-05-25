using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[Route("api/flat-prices")]
[ApiController]
[Authorize]
public class MeterDataController : ControllerBase
{
    private readonly MeterDataService _MeterDataService;
    
    public MeterDataController(MeterDataService service)
    {
        _MeterDataService = service;
    }
    
    [HttpGet("")] //wszystkie
    public ActionResult<List<MeterDataDto>> GetAllMeterData()
    {
        var meterData = _MeterDataService.GetAllMeterData();
        return Ok(meterData);
    }

    [HttpGet("{id}")] //po id
    public ActionResult<MeterDataDto> GetMeterDataById(int id)
    {
        var meterData = _MeterDataService.GetMeterDataById(id);
        if (meterData == null)
            return NotFound();
        
        return Ok(meterData);
    }

    [HttpGet("by-year/{year}")] //w konkretnym roku
    public ActionResult<List<MeterDataDto>> GetMeterDatasByYear(int year)
    {
        var meterData = _MeterDataService.GetMeterDatasByYear(year);
        return Ok(meterData);
    }

    [HttpGet("by-market/{isSecondaryMarket}")] //rynek wtórny lub pierwotny
    public ActionResult<List<MeterDataDto>> GetMeterDataByMarket(bool isSecondaryMarket)
    {
        var meterData = _MeterDataService.GetMeterDataByMarket(isSecondaryMarket);
        return Ok(meterData);
    }

    [HttpGet("by-sales/{isRealistic}")] //ceny oferowane lub sprzedane w danym miescie
    public ActionResult<List<MeterDataDto>> GetMeterDataBySales(bool isRealistic)
    {
        var meterData = _MeterDataService.GetMeterDataBySales(isRealistic);
        return Ok(meterData);
    }

    [HttpGet("by-city/{cityName}")] //wedlug miasta
    public ActionResult<List<MeterDataDto>> GetMeterDataByCityName(string cityName)
    {
        var meterData = _MeterDataService.GetMeterDataByCityName(cityName);
        return Ok(meterData);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("with-city")] //dodanie danych o cenach z miastem
    public async Task<ActionResult<MeterDataDto>> AddMeterDataWithCity([FromBody] CreateMeterDataDto dto)
    {
        try
        {
            var result = await _MeterDataService.AddMeterDataWithCity(dto.CityName, dto.Year, dto.Price, dto.Quarter, dto.IsSecondaryMarket, dto.IsRealistic);
            return CreatedAtAction(nameof(GetMeterDataById), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("")] //dodanie danych o cenach z id miasta
    public async Task<ActionResult<MeterDataDto>> AddMeterData([FromBody] CreateMeterDataWithCityIdDto dto)
    {
        try
        {
            var result = await _MeterDataService.AddMeterData(dto.CityId, dto.Year, dto.Price, dto.Quarter, dto.IsSecondaryMarket, dto.IsRealistic);
            return CreatedAtAction(nameof(GetMeterDataById), new { id = result.Id }, result);
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
    [HttpPut("{id}")] //aktualizacja danych o cenach
    public async Task<ActionResult<MeterDataDto>> UpdateMeterData(int id, [FromBody] double price)
    {
        var result = await _MeterDataService.UpdateMeterData(id, price);
        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")] //usunięcie danych o cenach
    public async Task<IActionResult> DeleteMeterData(int id)
    {
        var success = await _MeterDataService.DeleteMeterData(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}