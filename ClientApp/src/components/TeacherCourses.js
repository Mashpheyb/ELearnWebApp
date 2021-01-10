import React, { Component } from 'react';
import { TeacherLayout } from './TeacherLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class TeacherCourses extends Component {
    static displayName = TeacherCourses.name;

    constructor(props) {
        super(props);
        this.state = { courses: [], loading: true };
    }

    componentDidMount() {
        this.populateCourses();
    }

    static renderCoursesTable(courses) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>Action Currently Unavailable</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {

        let courses = this.state.courses.map(function (item) {
            var url = "/teacher/courses/lessons/" + item.id.toString();

            return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td><Button outline color="primary" tag={Link} to={url}>Lessons</Button>{' '}</td>
            </tr>)
            
        })


        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : courses;

        return (
            <TeacherLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">My Courses</h1>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents}
                        </tbody>
                    </table>
                </div>
            </TeacherLayout>
        );
    }

    async populateCourses() {

        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/course/get';
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data && Array.isArray(response.data)) {
            this.setState({ courses: response.data, loading: false });

        }
        else {
            this.setState({ courses: [], loading: false });
        }
    }
}
