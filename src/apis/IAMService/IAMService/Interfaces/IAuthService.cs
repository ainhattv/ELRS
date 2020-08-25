using System.Threading.Tasks;
using IAMService.Models;
using Microsoft.AspNetCore.Identity;

namespace IAMService.Interfaces
{
    public interface IAuthService
    {
        Task<(IdentityResult, AuthenticateResponse)> RegisterAsync(UserModel userModel);
        Task<(SignInResult, AuthenticateResponse)> SignInAsync(UserModel userModel);
        Task<IdentityResult> ChangePasswordAsync(UserChangePasswordModel userModel);
        Task SignOutAsync();
    }
}