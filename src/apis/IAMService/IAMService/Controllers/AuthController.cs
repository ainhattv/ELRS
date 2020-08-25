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
            IAuthService authService,
            ILogger<AuthController> logger
            )
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(IAuthService));
            _logger = logger ?? throw new ArgumentNullException(nameof(Logger<AuthController>));
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(UserModel userModel)
        {
            var (identityResult, authResult) = await _authService.RegisterAsync(userModel);

            if (identityResult.Succeeded)
            {
                return Ok(authResult);
            }

            return BadRequest(identityResult.Errors);
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignInAsync(UserModel userModel)
        {
            _logger.LogInformation($"User {userModel.UserName} request to login");

            var (signInResult, authResponse) = await _authService.SignInAsync(userModel);

            if (signInResult.Succeeded)
            {
                return Ok(authResponse);
            }

            return BadRequest(signInResult);
        }

        [HttpPost("signOut")]
        [Authorize]
        public async Task<IActionResult> SignOutAsync()
        {
            await _authService.SignOutAsync();
            return Ok();
        }

        [HttpPost("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePasswordAsync(UserChangePasswordModel userModel)
        {
            var identityResult = await _authService.ChangePasswordAsync(userModel);

            if (identityResult.Succeeded)
            {
                return Ok();
            }

            return BadRequest(identityResult);
        }
    }
}