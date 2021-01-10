import React, { Component } from 'react';
import { AdminLayout } from './AdminLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Students extends Component {
    static displayName = Students.name;

    constructor(props) {
        super(props);
        this.state = { students: [], loading: true };
    }

    componentDidMount() {
        this.populateStudents();
    }

    static renderStudentsTable(students) {
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
                    {students.map(student =>
                        <tr key={student.id}>
                            <td>{student.identification}</td>
                            <td>{student.fullName}</td>
                            <td>{student.email}</td>
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
            : Students.renderStudentsTable(this.state.students);

        return (
            <AdminLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">Students</h1>
                    <Button outline color="primary" className="add-btn" tag={Link} to="/admin/students/add">Add Student</Button>{' '}
                    {contents}
                </div>
            </AdminLayout>
        );
    }

    async populateStudents() {

        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/student/get';
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data && Array.isArray(response.data)) {
            this.setState({ students: response.data, loading: false });

        }
        else {
            this.setState({ students: [], loading: false });
        }
    }
}
