using System.Threading.Tasks;
using IAMService.Models;
using Microsoft.AspNetCore.Identity;

namespace IAMService.Interfaces
{
    public interface IAuthService
    {
        Task<(IdentityResult, AuthenticateResponse)> RegisterAsync(UserLoginModel userModel);
        Task<(SignInResult, AuthenticateResponse)> SignInAsync(UserLoginModel userModel);
        Task<IdentityResult> ChangePasswordAsync(UserChangePasswordModel userModel);
        Task SignOutAsync();
    }
}