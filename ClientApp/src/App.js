import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Dashboard } from './components/Dashboard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Teachers } from './components/Teachers';
import { AddTeacher } from './components/AddTeacher';
import { Students } from './components/Students';
import { AddStudent } from './components/AddStudent';
import { Courses } from './components/Courses';
import { AddCourse } from './components/AddCourse';
import { TeacherLogin } from './components/TeacherLogin';
import { TeacherCourses } from './components/TeacherCourses';
import { CourseLessons } from './components/CourseLessons';
import { AddLesson } from './components/AddLesson';
import { LessonDetails } from './components/LessonDetails';
import { StudentLogin } from './components/StudentLogin';
import { StudentDashboard } from './components/StudentDashboard';
import { AvailableCourses } from './components/AvailableCourses';
import { StudentCourses } from './components/StudentCourses';
import { EnrolledCourseLessons } from './components/EnrolledCourseLessons';
import { EnrolledCourseLessonDetails } from './components/EnrolledCourseLessonDetails';
import { EnrolStudent } from './components/EnrolStudent';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <div>
              <Route exact path='/' component={Home} />
              <Route exact path='/admin/login' component={AdminLogin} />
              <Route exact path='/admin/dashboard' component={AdminDashboard} />
              <Route exact path='/admin/teachers/add' component={AddTeacher} />
              <Route exact path='/admin/teachers' component={Teachers} />
              <Route exact path='/admin/students/add' component={AddStudent} />
              <Route exact path='/admin/students' component={Students} />
              <Route exact path='/admin/courses/add' component={AddCourse} />
              <Route exact path='/admin/courses' component={Courses} />
              <Route exact path='/teacher/login' component={TeacherLogin} />
              <Route exact path='/teacher/courses/lessons/:id' component={CourseLessons} />
              <Route exact path='/teacher/courses/lessons/add/:id' component={AddLesson} />
              <Route exact path='/teacher/courses/lessons/details/:id' component={LessonDetails} />
              <Route exact path='/teacher/courses' component={TeacherCourses} />
              <Route exact path='/students/courses/enrol/:id' component={EnrolStudent} />
              <Route exact path='/students/login' component={StudentLogin} />
              <Route exact path='/students/dashboard' component={StudentDashboard} />
              <Route exact path='/students/courses' component={AvailableCourses} />
              <Route exact path='/students/enrolledcourses' component={StudentCourses} />
              <Route exact path='/students/enrolledcourses/lessons/:id' component={EnrolledCourseLessons} />
              <Route exact path='/students/enrolledcourses/lessons/details/:id' component={EnrolledCourseLessonDetails} />
              
              
          </div>
    );
  }
}
