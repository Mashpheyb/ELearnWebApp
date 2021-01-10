import React, { Component } from 'react';
import { AdminLayout } from './AdminLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Teachers extends Component {
    static displayName = Teachers.name;

    constructor(props) {
        super(props);
        this.state = { teachers: [], loading: true };
    }

    componentDidMount() {
        this.populateTeachers();
    }

    static renderTeachersTable(teachers) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher =>
                        <tr key={teacher.id}>
                            <td>{teacher.identification}</td>
                            <td>{teacher.fullName}</td>
                            <td>{teacher.email}</td>
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
            : Teachers.renderTeachersTable(this.state.teachers);

        return (
            <AdminLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">Teachers</h1>
                    <Button outline color="primary" className="add-btn" tag={Link} to="/admin/teachers/add">Add Teacher</Button>{' '}
                    {contents}
                </div>
            </AdminLayout>
        );
    }

    async populateTeachers() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/teacher/get';
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data && Array.isArray(response.data)) {
            this.setState({ teachers: response.data, loading: false });

        }
        else {
            this.setState({ teachers: [], loading: false });
        }
    }
}
