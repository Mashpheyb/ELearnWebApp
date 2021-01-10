using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Domain
{
    public class CourseStudents
    {
        public int Id { get; set; }

        public int CourseId { get; set; }
        public int StudentUserId { get; set; }
    }
}
