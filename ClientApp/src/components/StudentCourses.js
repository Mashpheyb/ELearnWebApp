import React, { Component } from 'react';
import { StudentLayout } from './StudentLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class StudentCourses extends Component {
    static displayName = StudentCourses.name;

    constructor(props) {
        super(props);
        this.state = { courses: [], loading: true };
    }

    componentDidMount() {
        this.populateCourses();
    }

    render() {

        let courses = this.state.courses.map(function (item) {
            var url = "/students/enrolledcourses/lessons/" + item.id.toString();

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
            <StudentLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">My Enrolled Courses</h1>
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
            </StudentLayout>
        );
    }

    async populateCourses() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/course/get?assignedOnly=true';
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data && Array.isArray(response.data)) {
            this.setState({ courses: response.data, loading: false });

        }
        else {
            this.setState({ courses: [], loading: false });
        }
    }
}
