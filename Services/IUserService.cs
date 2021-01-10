using ELearnWeb.Domain;
using ELearnWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public interface IUserService
    {
        int AddUser(RegisterModel registration);

        int UpdateUserPassword(int userId, byte[] passwordHash, byte[] passwordSalt);

        User GetUserByEmail(string email);
        User GetUserById(int id);

        Response CheckNewUserValidity(RegisterModel registration);
    }
}
