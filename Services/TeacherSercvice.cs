using ELearnWeb.Common.Enums;
using ELearnWeb.Domain;
using ELearnWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public class TeacherSercvice : ITeacherService
    {
        private readonly EDbContext dbContext;

        public TeacherSercvice(EDbContext eDbContext)
        {
            dbContext = eDbContext;
        }
        public IList<UserModel> GetTeachers()
        {
            var teachers = dbContext.Users.Where(u => u.Role == (int)UserRoles.Teacher).Select(
                    u => new UserModel
                    {
                        Id = u.Id,
                        FullName = u.FirstName + " " + u.LastName,
                        Email = u.Email,
                        Identification = u.IdentificationNo
                    }

                ).ToList();

            return teachers;
        }
    }
}
