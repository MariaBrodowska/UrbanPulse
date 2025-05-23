using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using backend.Dtos;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IAuthService _userService;

    public UsersController(IAuthService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        var result = await _userService.RegisterAsync(dto);
        if (!result)
            return BadRequest("Użytkownik o podanym adresie e-mail już istnieje.");

        return Ok("Użytkownik zarejestrowany pomyślnie.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto dto)
    {
        var token = await _userService.LoginAsync(dto);
        if (token == null)
            return Unauthorized("Nieprawidłowy adres e-mail lub hasło.");

        return Ok(new { Token = token });
    }
}

}