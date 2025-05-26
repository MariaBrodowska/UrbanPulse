using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExportController : ControllerBase
{
    private readonly ExportingToXmlService _exportService;
    
    public ExportController(ExportingToXmlService exportService)
    {
        _exportService = exportService;
    }
    
 
    [HttpGet("all")]
    public async Task<IActionResult> ExportAllTables()
    {
        try
        {
            var xmlContent = await _exportService.ExportAllTablesToXml();
            return Content(xmlContent, "application/xml");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error exporting data: {ex.Message}");
        }
    }

 
       
    [HttpGet("file/{fileName}")]
    public async Task<IActionResult> Export(string fileName = "export")
    {
        var xmlContent = await _exportService.ExportAllTablesToXml();
        fileName = fileName + ".xml";
        var file = _exportService.SaveXmlToFile(xmlContent, fileName);
        return file;
    }
    
    
    [HttpGet("table/{tableName}")]
    public async Task<IActionResult> ExportTable(string tableName)
    {
        try
        {
            var xmlContent = await _exportService.ExportTableToXml(tableName);
            return Content(xmlContent, "application/xml");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error exporting table: {ex.Message}");
        }
    }
  
    [HttpGet("daterange")]
    public async Task<IActionResult> ExportByDateRange(
        [FromQuery] DateTime startDate, 
        [FromQuery] DateTime endDate)
    {
        try
        {
            if (startDate > endDate)
            {
                return BadRequest("Start date cannot be greater than end date");
            }
            
            var xmlContent = await _exportService.ExportDataByDateRange(startDate, endDate);
            return Content(xmlContent, "application/xml");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error exporting data by date range: {ex.Message}");
        }
    }

    [HttpGet("singleTableFile")]
    public async Task<IActionResult> getSingleTableToFile([FromQuery] string tableName, [FromQuery] string fileName) {
        try
        {
            fileName = fileName + ".xml";

            var xmlContent = await _exportService.ExportTableToXml(tableName);
            var file = _exportService.SaveXmlToFile(xmlContent, fileName);
            return file;
        }
        catch (Exception ex)
        {
            return BadRequest($"Error exporting data  {ex.Message}");

        }
   }

    [HttpGet("tables")]
    public IActionResult GetAvailableTables()
    {
        var tables = new[]
        {
            "cities",
            "populations", 
            "meterdata",
            "interestrates",
            "roles"
        };
        
        return Ok(new { tables = tables });
    }
}
