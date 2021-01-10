using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELearnWeb.Domain
{
    public class EDbContext : DbContext
    {
        public EDbContext(DbContextOptions<EDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("user");

                e.HasKey(e => e.Id);

                e.Property(pr => pr.Id).HasColumnName("id");

                e.Property(pr => pr.FirstName).HasColumnName("fname");

                e.Property(pr => pr.LastName).HasColumnName("lname");

                e.Property(pr => pr.Email).HasColumnName("email");

                e.Property(pr => pr.IdentificationNo).HasColumnName("identificationno");

                e.Property(pr => pr.PasswordHash).HasColumnName("passwordhash");

                e.Property(pr => pr.PasswordSalt).HasColumnName("passwordsalt");

                e.Property(pr => pr.Role).HasColumnName("role");

            });

            modelBuilder.Entity<Course>(e =>
            {
                e.ToTable("courses");

                e.HasKey(e => e.Id);

                e.Property(pr => pr.Id).HasColumnName("id");

                e.Property(pr => pr.Name).HasColumnName("name");

                e.Property(pr => pr.Description).HasColumnName("description");

                e.Property(pr => pr.CreatedBy).HasColumnName("createdby");

                e.Property(pr => pr.AssignedTeacher).HasColumnName("assignedteacher");

            });

            modelBuilder.Entity<CourseStudents>(e =>
            {
                e.ToTable("coursestudents");

                e.HasKey(e => e.Id);

                e.Property(pr => pr.Id).HasColumnName("id");

                e.Property(pr => pr.StudentUserId).HasColumnName("studentuserid");

                e.Property(pr => pr.CourseId).HasColumnName("courseid");
            });

            modelBuilder.Entity<CourseLessons>(e =>
            {
                e.ToTable("courselessons");

                e.HasKey(e => e.Id);

                e.Property(pr => pr.Id).HasColumnName("id");

                e.Property(pr => pr.CourseId).HasColumnName("courseid");

                e.Property(pr => pr.Title).HasColumnName("title");

                e.Property(pr => pr.Description).HasColumnName("description");

                e.Property(pr => pr.Exercise).HasColumnName("exercise");

                e.Property(pr => pr.CreatedOn).HasColumnName("createdon");

                e.Property(pr => pr.CreatedBy).HasColumnName("createdby");

            });

            modelBuilder.Entity<LessonAttachments>(e =>
            {
                e.ToTable("lessonattachments");

                e.HasKey(e => e.Id);

                e.Property(pr => pr.Id).HasColumnName("id");

                e.Property(pr => pr.LessonId).HasColumnName("lessonid");

                e.Property(pr => pr.Url).HasColumnName("url");

                e.Property(pr => pr.FileName).HasColumnName("filename");

                e.Property(pr => pr.Type).HasColumnName("type");
            });


        }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseStudents> CourseStudents { get; set; }
        public DbSet<CourseLessons> CourseLessons { get; set; }
        public DbSet<LessonAttachments> LessonAttachments { get; set; }

    }
}
