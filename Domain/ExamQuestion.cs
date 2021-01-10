using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Domain
{
    public class ExamQuestion
    {
        public int Id { get; set; }

        public int ExamId { get; set; }

        public int QuestionType { get; set; }

        public string Question { get; set; }

        public string Choices { get; set; }

        public int Marks { get; set; }

        public string Media { get; set; }
    }
}
