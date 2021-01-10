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
    public class StudentController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IStudentService _studentService;

        public StudentController(ILogger<UserController> logger,
                              IUserService userService,
                              IConfiguration configuration,
                              IStudentService studentService)
        {
            _logger = logger;
            _userService = userService;
            _configuration = configuration;
            _studentService = studentService;
        }

        [Route("get")]
        [HttpGet]
        public Response GetStudents()
        {
            var response = new Response();

            try
            {
                var students = _studentService.GetStudents();
                return response.CreateSuccessRespone(students, "Students found");
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in students/get - {0}", ex.Message));
            }

            return response;
        }



    }
}
