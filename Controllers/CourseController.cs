
using ELearnWeb.Models;
using ELearnWeb.Services;
using Firebase.Auth;
using Firebase.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ELearnWeb.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class CourseController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IStudentService _studentService;
        private readonly ICourseService _courseService;
        private IHostingEnvironment _environment;
        string[] imageFileExtensions = new string[] { ".jpg" , ".png" ,"jpeg" };

        public CourseController(ILogger<UserController> logger,
                              IUserService userService,
                              IConfiguration configuration,
                              IStudentService studentService,
                              ICourseService courseService,
                              IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _userService = userService;
            _configuration = configuration;
            _studentService = studentService;
            _courseService = courseService;
            _environment = hostingEnvironment;
        }

        [Route("get")]
        [HttpGet]
        public Response GetCourses(bool assignedOnly = false)
        {
            var response = new Response();

            try
            {
                if (User != null  && User.Identity != null)
                {
                    var userId = Convert.ToInt32(User.Identity.GetId());
                    var courses = _courseService.GetCourses(userId, assignedOnly);
                    return response.CreateSuccessRespone(courses, "Course found");
                }
                
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in course/get - {0}", ex.Message));
            }

            return response;
        }

        [Route("create")]
        [HttpPost]
        public Response CreateCourse([FromBody] CourseModel model)
        {
            var response = new Response();

            try
            {
                _courseService.SaveCourse(model);
                return response.CreateSuccessRespone(null, "Course added successfully");
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in course/post - {0}", ex.Message));
            }

            return response;
        }

        [Route("student")]
        [HttpPost]
        [Authorize]
        public Response AddCourseStudent([FromBody] CourseStudentModel model)
        {
            var response = new Response();
            if (User != null && User.Identity != null)
            {
                var userId = Convert.ToInt32(User.Identity.GetId());
                model.StudentId = userId;

                try
                {
                    _courseService.AddCourseStudent(model);
                    return response.CreateSuccessRespone(null, "You have been enrolled in this course successfully");
                }
                catch (Exception ex)
                {
                    response.Message = "Error Occured";
                    _logger.LogDebug(string.Format("Error in course/post - {0}", ex.Message));
                }
            }
            else
            {
                response.Message = "Unauthorized";
            }

            return response;
        }


        [Route("lesson")]
        [HttpPost]
        [Authorize]
        public async Task<Response> AddCourseLesson(IFormFile file)
        {
            var response = new Response();
            

            try
            {

                if (User != null && User.Identity != null)
                {
                    var userId = Convert.ToInt32(User.Identity.GetId());

                    if (userId > 0)
                    {
                        string wwwPath = _environment.WebRootPath;
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                        List<AttachmentViewModel> uploadedFiles = new List<AttachmentViewModel>();

                        var courseLessonObj = JsonConvert.DeserializeObject<CourseLessonModel>(Request.Form["courseLessonObj"]);

                        if (courseLessonObj != null)
                        {
                            if (!Directory.Exists(path))
                            {
                                Directory.CreateDirectory(path);
                            }

                            if (file != null)
                            {
                                string fileName = Path.GetFileName(file.FileName);
                                string FileExtension = Path.GetExtension(fileName);
                                string fullPath = Path.Combine(path, fileName);


                                using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                                {
                                    file.CopyTo(stream);
                                }

                                try
                                {
                                    var fs = new FileStream(fullPath, FileMode.Open);
                                    var cancellation = new CancellationTokenSource();
                                    var upload = new FirebaseStorage(_configuration["FirebaseBucket"])
                                                                    .Child("assets")
                                                                    .Child($"{file.FileName}")
                                                                    .PutAsync(fs);
                                    var downloadUrl = await upload;
                                    uploadedFiles.Add(new AttachmentViewModel
                                    {
                                        Type = imageFileExtensions.Contains(FileExtension.ToLower()) ? "image" : "other",
                                        FileName = fileName,
                                        Url = downloadUrl
                                    });
                                }
                                catch (Exception ex)
                                {
                                }

                            }

                            _courseService.AddCourseLesson(userId, courseLessonObj, uploadedFiles);
                            return response.CreateSuccessRespone(null, "Lesson added successfully");
                        }
                        else
                        {
                            response.Message = "Invalid input parameter";
                        }
                    }
                    else
                    {
                        response.Message = "Unauthorized access";
                    }
                }
                else
                {
                    response.Message = "Unauthorized access";
                }

            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in course/lesson/post - {0}", ex.Message));
            }

            return response;
        }


        [Route("lesson/{courseId}")]
        [HttpGet]
        public Response GetCourseLessons(int courseId)
        {
            var response = new Response();

            try
            {
                var courseLessons = _courseService.GetCourseLessons(courseId);
                return response.CreateSuccessRespone(courseLessons, "Lesson fetched successfully");
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in course/lesson/post - {0}", ex.Message));
            }

            return response;
        }

        [Route("lesson/details/{lessonId}")]
        [HttpGet]
        public Response GetLessonDetails(int lessonId)
        {
            var response = new Response();

            try
            {
                var courseLessonDetails = _courseService.GetCourseLessonDetails(lessonId);
                return response.CreateSuccessRespone(courseLessonDetails, "Lesson fetched successfully");
            }
            catch (Exception ex)
            {
                response.Message = "Error Occured";
                _logger.LogDebug(string.Format("Error in course/lesson/details - {0}", ex.Message));
            }

            return response;
        }

    }
}
