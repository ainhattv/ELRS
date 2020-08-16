using System;
using System.Text;
using System.Threading.Tasks;
using IAMService.Entities;
using IAMService.Interfaces;
using IAMService.Models;
using IAMService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;

namespace IAMService.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            AuthService authService,
            ILogger<AuthController> logger
            )
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(SignInManager<ApplicationUser>));
            _logger = logger ?? throw new ArgumentNullException(nameof(Logger<AuthController>));
        }

        [HttpPost("/register")]
        public async Task<IActionResult> RegisterAsync(UserModel userModel)
        {
            if (ModelState.IsValid)
            {
                var (identityResult, authResult) = await _authService.RegisterAsync(userModel);
                if (identityResult.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");
                    return Ok(authResult);
                }

                return Ok(identityResult.Errors);
            }

            return Ok();
        }

        [HttpPost("/login")]
        public async Task<IActionResult> LoginAsync(UserModel userModel)
        {
            if (ModelState.IsValid)
            {

            }

            return Ok();
        }

        [HttpPost("/logout")]
        [Authorize]
        public async Task<IActionResult> LogoutAsync()
        {

            return Ok();
        }

        [HttpPost("/change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePasswordAsync(UserChangePasswordModel userModel)
        {
            return Ok();
        }
    }
}