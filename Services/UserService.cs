using ELearnWeb.Common.Enums;
using ELearnWeb.Domain;
using ELearnWeb.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public class UserService : IUserService
    {
        private readonly EDbContext dbContext;
        private readonly IConfiguration _configuration;

        public UserService(EDbContext expManDbContext, IConfiguration configuration)
        {
            dbContext = expManDbContext;
            _configuration = configuration;
        }

        public int AddUser(RegisterModel registration)
        {
            var user = new User
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Email = registration.Email,
                IdentificationNo = registration.IdentificationNo,
                Role = registration.Role
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return user.Id;
        }

        public Response CheckNewUserValidity(RegisterModel registration)
        {
            var response = new Response();

            if (string.IsNullOrWhiteSpace(registration.FirstName))
            {
                response.Message += "First Name is required; ";
            }
            else if (registration.FirstName.Length > 20)
            {
                response.Message = "First name can't be more than 20 characters long; ";
            }

            if (string.IsNullOrWhiteSpace(registration.LastName))
            {
                response.Message += "Last Name is required; ";
            }
            else if (registration.LastName.Length > 20)
            {
                response.Message = "Last name can't be more than 20 characters long; ";
            }

            if (string.IsNullOrWhiteSpace(registration.Email))
            {
                response.Message += "Email is required; ";
            }
            else if (registration.Email.Length > 40)
            {
                response.Message = "Email can't be more than 40 characters long; ";
            }
            else if (UserExistsWithEmail(registration.Email))
            {
                response.Message = "User exists with this email, try to login or register with a different email; ";
            }

            if (string.IsNullOrWhiteSpace(registration.Password))
            {
                response.Message += "Password is required; ";
            }
            else if (registration.Password.Length < 8)
            {
                response.Message += "Password length must be at least 8; ";
            }
            else if (registration.Password.Length > 40)
            {
                response.Message += "Password exceeds max allowed length; ";
            }

            if (string.IsNullOrEmpty(registration.IdentificationNo))
            {
                response.Message += "Id No is required";
            }

            if (!Enum.IsDefined(typeof(UserRoles),registration.Role))
            {
                response.Message += "User role not defined";
            }

            if (string.IsNullOrEmpty(response.Message))
            {
                return response.CreateSuccessRespone(null, "Validation Successful; ");
            }

            return response;
        }

        public User GetUserByEmail(string email)
        {
            return dbContext.Users.Where(u => u.Email.Trim().ToLower() == email.Trim().ToLower()).FirstOrDefault();
        }

        public User GetUserById(int id)
        {
            return dbContext.Users.Where(u => u.Id == id).FirstOrDefault();
        }

        public int UpdateUserPassword(int userId, byte[] passwordHash, byte[] passwordSalt)
        {
            var user = dbContext.Users.Where(u => u.Id == userId).FirstOrDefault();

            if (user != null)
            {
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                dbContext.Users.Update(user);

                return dbContext.SaveChanges();
            }

            return 0;
        }

        public bool UserExistsWithEmail(string email)
        {
            var existingUser = GetUserByEmail(email);
            return existingUser != null;
        }

    }
}
