using ELearnWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public interface ICourseService
    {
        int SaveCourse(CourseModel model);
        int AddCourseStudent(CourseStudentModel model);

        IList<CourseHeaderModel> GetCourses(int userId, bool assignedOnly = false);

        int AddCourseLesson(int userId, CourseLessonModel model, IList<AttachmentViewModel> attachments);

        IList<CourseLessonShortModel> GetCourseLessons(int courseId);


        CourseLessonDetailsModel GetCourseLessonDetails(int lessonId);
    }
}
