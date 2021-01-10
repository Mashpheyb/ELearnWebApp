using ELearnWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public interface ITeacherService
    {
        IList<UserModel> GetTeachers();
    }
}
