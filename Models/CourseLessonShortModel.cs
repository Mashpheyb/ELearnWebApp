using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Models
{
    public class CourseLessonShortModel
    {
        public int Id { get; set; }

        public int CourseId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Exercise { get; set; }

        public string CreationDate { get; set; }
    }
}
