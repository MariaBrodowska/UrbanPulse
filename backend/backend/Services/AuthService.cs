using backend.Dtos;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IPasswordHasher<User> passwordHasher, IConfiguration configuration)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _configuration = configuration;
    }

    public async Task<bool> RegisterAsync(RegisterUserDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return false;

        var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
        if (defaultRole == null)
        {
            defaultRole = new Role { Name = "User" };
            _context.Roles.Add(defaultRole);
            await _context.SaveChangesAsync();
        }

        var user = new User
        {
            Email = dto.Email,
            RoleId = defaultRole.Id
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<string?> LoginAsync(LoginUserDto dto)
    {
        var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return null;

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed)
            return null;

        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(User user)
    {
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
    };
        if (user.Role != null && !string.IsNullOrEmpty(user.Role.Name))
    {
        claims.Add(new Claim(ClaimTypes.Role, user.Role.Name));
    }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
}