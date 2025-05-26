using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using backend.Services;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportJsonController : ControllerBase
    {
        private readonly ExportToJsonService _jsonService;
        public ExportJsonController(ExportToJsonService jsonService)
        {
            _jsonService = jsonService;
        }
        [HttpGet("")]
        public async Task<string> cos()
        {
            return "CASDZXCSAD";
        }


        [HttpGet("table/{tableName}")]
        public async Task<IActionResult> ExportTable(string tableName)
        {
            try
            {
                var jsonContent = await _jsonService.ExportTableToJson(tableName);
                return Content(jsonContent, "application/json");
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
    
    
      [HttpGet("file")]
        public async Task<IActionResult> getSingleTableToFile([FromQuery] string tableName, [FromQuery] string fileName) {
            try
            {
                fileName = fileName + ".json";

                var xmlContent = await _jsonService.ExportTableToJson(tableName);
                var file = _jsonService.SaveJsonToFile(xmlContent, fileName);
                return file;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error exporting data  {ex.Message}");

            }
        }
    }
}