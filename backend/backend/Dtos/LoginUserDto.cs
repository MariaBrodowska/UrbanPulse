using System.ComponentModel.DataAnnotations;
using System;

namespace backend.Dtos
{
    public class LoginUserDto{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    }
}