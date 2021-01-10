import React, { Component } from 'react';
import { AdminLayout } from './AdminLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Courses extends Component {
    static displayName = Courses.name;

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
                        <th>Assigned to</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.assignedTeacher}</td>
                            <td>Action Currently Unavailable</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Courses.renderCoursesTable(this.state.courses);

        return (
            <AdminLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">Courses</h1>
                    <Button outline color="primary" className="add-btn" tag={Link} to="/admin/courses/add">Add Course</Button>{' '}
                    {contents}
                </div>
            </AdminLayout>
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
