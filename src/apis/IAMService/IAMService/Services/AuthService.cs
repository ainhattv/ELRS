using System;
using System.Threading.Tasks;
using IAMService.Entities;
using IAMService.Helpers.Providers;
using IAMService.Interfaces;
using IAMService.Models;
using IAMService.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IAMService.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<AppSettings> appSettings,
            ILogger<AuthService> logger
        )
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(UserManager<ApplicationUser>));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(SignInManager<ApplicationUser>));
            _appSettings = appSettings ?? throw new ArgumentNullException(nameof(IOptions<AppSettings>));
            _logger = logger ?? throw new ArgumentNullException(nameof(Logger<AuthService>));
        }

        public async Task<(IdentityResult, AuthenticateResponse)> RegisterAsync(UserModel userModel)
        {
            var user = new ApplicationUser { UserName = userModel.UserName, Email = userModel.UserName };
            var result = await _userManager.CreateAsync(user, userModel.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");
            }

            var token = JwtTokenProvider.GenerateToken(_appSettings.Value.Secret, user.Id);

            var authResponse = new AuthenticateResponse(user, token);

            return (result, authResponse);
        }

        public async Task<(SignInResult, AuthenticateResponse)> SignInAsync(UserModel userModel)
        {
            var user = await _userManager.FindByEmailAsync(userModel.UserName);

            if (user == null)
            {
                throw new ApplicationException($"User {userModel.UserName} is invalid");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, userModel.Password, false);

            if (result.Succeeded)
            {
                _logger.LogInformation($"User {userModel.UserName} has loged in");
            }
            else
            {
                return (result, null);
            }

            var token = JwtTokenProvider.GenerateToken(_appSettings.Value.Secret, user.Id);

            var authResponse = new AuthenticateResponse(user, token);

            return (result, authResponse);
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult> ChangePasswordAsync(UserChangePasswordModel userModel)
        {
            var user = await _userManager.FindByEmailAsync(userModel.UserName);

            if (user == null)
            {
                throw new ApplicationException($"User {userModel.UserName} is invalid");
            }

            var result = await _userManager.ChangePasswordAsync(user, userModel.Password, userModel.NewPassword);

            return result;
        }
    }
}
