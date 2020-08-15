using System.Threading.Tasks;
using IAMService.Models;
using Microsoft.AspNetCore.Identity;

namespace IAMService.Interfaces
{
    public interface IAuthService
    {
        Task<(IdentityResult, AuthenticateResponse)> RegisterAsync(UserModel userModel);
    }
}