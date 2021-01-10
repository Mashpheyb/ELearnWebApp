using ELearnWeb.Common.Enums;
using ELearnWeb.Domain;
using ELearnWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public class StudentService : IStudentService
    {
        private readonly EDbContext dbContext;

        public StudentService(EDbContext eDbContext)
        {
            dbContext = eDbContext;
        }

        public IList<UserModel> GetStudents()
        {
            var students = dbContext.Users.Where(u => u.Role == (int)UserRoles.Student).Select(
                    u => new UserModel
                    {
                        Id = u.Id,
                        FullName = u.FirstName + " " + u.LastName,
                        Email = u.Email,
                        Identification = u.IdentificationNo
                    }

                ).ToList();

            return students;
        }
    }
}
