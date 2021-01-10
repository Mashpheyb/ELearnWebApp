using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Models
{
    public class CourseLessonModel
    {
        public int CourseId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
        public string Exercise { get; set; }
    }
}
