using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Domain
{
    public class CourseExams
    {
        public int Id { get; set; }

        public int CourseId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public int CreatedBy { get; set; }
    }
}
