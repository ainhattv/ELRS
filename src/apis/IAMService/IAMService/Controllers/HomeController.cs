using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IAMService.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [HttpGet("/health-check")]
        public IActionResult HealthCheck()
        {
            return Ok("I'm live!");
        }

        [HttpGet("/auth-check")]
        [Authorize]
        public IActionResult AuthCheck()
        {
            return Ok("I'm live!");
        }
    }
}