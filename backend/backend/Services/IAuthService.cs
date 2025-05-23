using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services
{
public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterUserDto dto);
    Task<string?> LoginAsync(LoginUserDto dto);
}
}