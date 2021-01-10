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
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(ILogger<UserController> logger,
                              IUserService userService,
                              IConfiguration configuration)
        {
            _logger = logger;
            _userService = userService;
            _configuration = configuration;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public Response Register([FromBody] RegisterModel model)
        {
            var response = new Response();

            if (!ModelState.IsValid)
            {
                response.Message = "Inalid Input Parameter";
            }

            try
            {
                var userValidation = _userService.CheckNewUserValidity(model);

                if (userValidation.Success)
                {
                    var newUserId = _userService.AddUser(model);

                    if (newUserId > 0)
                    {
                        byte[] passwordHash, passwordSalt;
                        CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);
                        _userService.UpdateUserPassword(newUserId, passwordHash, passwordSalt);
                    }

                    return response.CreateSuccessRespone(new { UserId = newUserId }, "User registered successfully");
                }
                else
                {
                    response.Message = userValidation.Message;
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in api/user/register - {0}", ex.Message));
            }

            return response;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public Response Login([FromBody] LoginModel model)
        {
            var response = new Response();

            if (!ModelState.IsValid)
            {
                response.Message = "Inalid Input Parameter";
            }

            try
            {
                var existingUser = _userService.GetUserByEmail(model.Email);

                if (existingUser != null)
                {
                    if (VerifyPassword(model.Password, existingUser.PasswordHash, existingUser.PasswordSalt))
                    {
                        var token = GenereateJsonWebToken(existingUser);

                        if (!string.IsNullOrEmpty(token))
                        {
                            var data = new
                            {
                                token = token,
                                userdata = new
                                {
                                    firstName = existingUser.FirstName,
                                    lastName = existingUser.LastName,
                                    userId = existingUser.Id,
                                    email = existingUser.Email,
                                    role = existingUser.Role
                                }
                            };

                            return response.CreateSuccessRespone(data, "Login Successful");
                        }
                        else
                        {
                            response.Message = "Failed to generate token";
                        }
                    }
                    else
                    {
                        response.Message = "Wrong Credentials";
                    }
                }
                else
                {
                    response.Message = "No user found with this email";
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in api/user/login - {0}", ex.Message));
            }

            return response;
        }


        [Route("status")]
        [Authorize]
        [HttpGet]
        public Response GetLoggedInStatus()
        {
            var response = new Response();
            bool isLoggedIn = false;
            try
            {

                if (User != null && User.Identity != null)
                {
                    var userId = Convert.ToInt32(User.Identity.GetId());

                    if (userId > 0)
                    {
                        var user = _userService.GetUserById(userId);

                        if (user != null)
                        {
                            isLoggedIn = true;
                        }
                    }
                    else
                    {
                        isLoggedIn = false;
                    }

                    var data = new
                    {
                        isLoggedIn = isLoggedIn
                    };

                    return response.CreateSuccessRespone(data, "Logged in status found");
                }
                else
                {
                    response.Message = "Logged in User Not Found";
                }




            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

        #region Private Methods

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private string GenereateJsonWebToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Email),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: credentials
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // Create hash using password salt.
                for (int i = 0; i < computedHash.Length; i++)
                { // Loop through the byte array
                    if (computedHash[i] != passwordHash[i]) return false; // if mismatch
                }
            }
            return true; //if no mismatches.
        }

        #endregion
    }
}
