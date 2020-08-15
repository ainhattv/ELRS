using System.Threading.Tasks;
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
    }
}