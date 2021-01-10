import React, { Component } from 'react';
import { StudentLayout } from './StudentLayout';
import { getJson, postJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getUserData } from '../common/auth';

export class EnrolStudent extends Component {
    static displayName = EnrolStudent.name;

    constructor(props) {
        super(props);
        this.state = { courses: [], loading: true };
    }

    componentDidMount() {
        this.enrolStudent(this.props.match.params.id);
    }

    render() {

        let courses =
            <div>
                <h1>Enrolment Successful</h1>
                <p>Course enrolment successful. Go to my courses to see all enrolled courses.</p>
            </div>

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : courses

        return (
            <StudentLayout>
                <div>
                    {contents}
                </div>
            </StudentLayout>
        );
    }

    async enrolStudent(courseId) {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


        var baseurl = window.location.origin;
        var apiUrl = baseurl + '/course/student';
        debugger;
        var data = {
            courseId: courseId
        };
        var response = await postJson(apiUrl, true, data);

        if (response && response.success) {
            this.setState(() => {
                return { loading: false };
            });
        }
        else {
            if (response && response.message) {
                alert(response.message);
            }
        }
    }
}
