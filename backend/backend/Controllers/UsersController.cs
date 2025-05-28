using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims; 

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

        // return Ok(new { Token = token });
        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        });

        return Ok(new { message = "Zalogowano" });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var id))
        {
            return Unauthorized("Nieprawidłowy token użytkownika.");
        }

        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound("Użytkownik nie istnieje.");
        }

        return Ok(new { isAdmin = user.IsAdmin, email = user.Email });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt");
        return Ok(new { message = "Wylogowano pomyślnie" });
    }
}
}