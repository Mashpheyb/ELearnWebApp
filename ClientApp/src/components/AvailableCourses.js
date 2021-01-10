import React, { Component } from 'react';
import { StudentLayout } from './StudentLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class AvailableCourses extends Component {
    static displayName = AvailableCourses.name;

    constructor(props) {
        super(props);
        this.state = { courses: [], loading: true };
        this.enrollStudent = this.enrollStudent.bind(this);
    }

    componentDidMount() {
        this.populateCourses();
    }


    enrollStudent(courseId) {
        debugger;
    }

    render() {

        //let enrolment = this.enrollStudent();

        let courses = this.state.courses.map(function (course) {

            var url = "/students/courses/enrol/" + course.id.toString();

            return (<tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.assignedTeacher}</td>
                <td><Button outline color="primary" tag={Link} to={url}>Enrol</Button>{' '}</td>
            </tr>);
        })


        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : courses;

        return (
            <StudentLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">Available Courses</h1>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Assigned to</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents}
                        </tbody>
                        
                        
                    </table>
                </div>
            </StudentLayout>
        );
    }

    async populateCourses() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


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
