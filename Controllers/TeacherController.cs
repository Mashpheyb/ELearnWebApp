using ELearnWeb.Domain;
using ELearnWeb.Models;
using ELearnWeb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ELearnWeb.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class TeacherController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly ITeacherService _teacherService;

        public TeacherController(ILogger<UserController> logger,
                              IUserService userService,
                              IConfiguration configuration,
                              ITeacherService teacherService)
        {
            _logger = logger;
            _userService = userService;
            _configuration = configuration;
            _teacherService = teacherService;
        }

        [Route("get")]
        [HttpGet]
        public Response GetTeachers()
        {
            var response = new Response();

            try
            {
                var teachers = _teacherService.GetTeachers();
                return response.CreateSuccessRespone(teachers, "Teachers found");
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in teachers/get - {0}", ex.Message));
            }

            return response;
        }


        
    }
}
