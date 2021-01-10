using ELearnWeb.Common.Enums;
using ELearnWeb.Domain;
using ELearnWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Services
{
    public class CourseService : ICourseService
    {

        private readonly EDbContext dbContext;

        public CourseService(EDbContext eDbContext)
        {
            dbContext = eDbContext;
        }

        public int AddCourseLesson(int userId , CourseLessonModel model, IList<AttachmentViewModel> attachments)
        {
            var lesson = new CourseLessons
            {
                   CourseId = model.CourseId,
                   Title = model.Title,
                   Description = model.Description,
                   Exercise = model.Exercise,
                   CreatedBy = userId,
                   CreatedOn = DateTime.UtcNow.AddHours(6)
            };

            dbContext.CourseLessons.Add(lesson);
            dbContext.SaveChanges();

            if (lesson.Id > 0)
            {
                var lessonAttachments = new List<LessonAttachments>();

                foreach(var item in attachments)
                {
                    lessonAttachments.Add(
                        new LessonAttachments
                        {
                            LessonId = lesson.Id,
                            Type = item.Type,
                            FileName = item.FileName,
                            Url = item.Url
                        }    
                    );
                }

                dbContext.LessonAttachments.AddRange(lessonAttachments);
                dbContext.SaveChanges();
                
            }

            return lesson.Id;
        }

        public int AddCourseStudent(CourseStudentModel model)
        {
            var courseStudents = new CourseStudents
            {
                CourseId = model.CourseId,
                StudentUserId = model.StudentId
            };

            dbContext.CourseStudents.Add(courseStudents);
            return dbContext.SaveChanges();
        }

        public CourseLessonDetailsModel GetCourseLessonDetails(int lessonId)
        {
            var lessonDetails = new CourseLessonDetailsModel();

            var lesson = dbContext.CourseLessons.Where(l => l.Id == lessonId).FirstOrDefault();

            if (lesson != null)
            {
                lessonDetails.Id = lesson.Id;
                lessonDetails.CourseId = lesson.CourseId;
                lessonDetails.Title = lesson.Title;
                lessonDetails.Description = lesson.Description;
                lessonDetails.Exercise = lesson.Exercise;
                lessonDetails.CreationDate = lesson.CreatedOn.ToString("MMMM dd, yyyyy hh:mm tt");
                lessonDetails.TeacherName = dbContext.Users.Where(u => u.Id == lesson.CreatedBy).Select(u => u.FirstName + " " + u.LastName).FirstOrDefault();

                var attachments = dbContext.LessonAttachments.Where(la => la.LessonId == lessonId).Select(la => 
                        new AttachmentViewModel
                        {
                            FileName = la.FileName,
                            Url = la.Url,
                            Type = la.Type
                        }
                
                ).ToList();
                lessonDetails.Attachments = attachments;
            }

            return lessonDetails;
        }

        public IList<CourseLessonShortModel> GetCourseLessons(int courseId)
        {
            return dbContext.CourseLessons.Where(cl => cl.CourseId == courseId).Select(cl => 
                                                    new CourseLessonShortModel { 
                                                       Id = cl.Id,
                                                       CourseId = cl.CourseId,
                                                       Title = cl.Title,
                                                       Description = cl.Description,
                                                       Exercise = cl.Exercise,
                                                       CreationDate = cl.CreatedOn.ToString("MMMM dd, yyyy hh:mm tt")
                                                    }).ToList();
        }

        public IList<CourseHeaderModel> GetCourses(int userId, bool assignedOnly = false)
        {
            var user = dbContext.Users.Where(u => u.Id == userId).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            var courses = dbContext.Courses.AsQueryable();
            var courseHeaders = new List<CourseHeaderModel>();

            if (user.Role == (int)UserRoles.Student)
            {

                if (assignedOnly)
                {
                    courses = (from cs in dbContext.CourseStudents.Where(cs => cs.StudentUserId == userId)
                               join course in courses
                               on cs.CourseId equals course.Id
                               select course);
                }
                else
                {
                    var studentCourses = dbContext.CourseStudents.Where(cs => cs.StudentUserId == userId).Select(cs => cs.CourseId);
                    courses = courses.Where(c => !studentCourses.Contains(c.Id));
                }
                
            }
            else if (user.Role == (int)UserRoles.Teacher)
            {
                courses = dbContext.Courses.Where(c => c.AssignedTeacher == userId);
            }
            else
            {
                courses = dbContext.Courses;
            }

            courseHeaders = (from course in courses
                             join teacher in dbContext.Users
                             on course.AssignedTeacher equals teacher.Id
                             select new CourseHeaderModel
                             {
                                 Id = course.Id,
                                 Name = course.Name,
                                 Description = course.Description,
                                 AssignedTeacher = string.Format("{0} {1}", teacher.FirstName, teacher.LastName)

                             }).ToList();

            return courseHeaders;

        }

        public int SaveCourse(CourseModel model)
        {
            var course = new Course
            {
                Name = model.Name,
                Description = model.Description,
                AssignedTeacher = model.AssignedTeacher,
                CreatedBy = 1
            };

            dbContext.Courses.Add(course);
            return dbContext.SaveChanges();
        }
    }
}
