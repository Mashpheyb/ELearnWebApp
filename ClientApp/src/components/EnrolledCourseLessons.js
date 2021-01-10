import React, { Component } from 'react';
import { StudentLayout } from './StudentLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import FileViewer from 'react-file-viewer';


export class EnrolledCourseLessons extends Component {
    static displayName = EnrolledCourseLessons.name;

    constructor(props) {
        super(props);
        this.state = { lessons: [], loading: true, courseId: props.match.params.id };
    }

    componentDidMount() {
        this.populateLessons(this.props.match.params.id);
    }

    render() {

        let lessons = this.state.lessons.map(function (item) {
            var url = "/students/enrolledcourses/lessons/details/" + item.id.toString();

            return (<tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.creationDate}</td>
                <td><Button outline color="primary" tag={Link} to={url}>Details</Button>{' '}</td>
            </tr>)

        })

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : lessons;

        return (
            <StudentLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">Course Lessons</h1>
                    
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Created On</th>
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

    async populateLessons(courseId) {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/course/lesson/' + courseId;
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data && Array.isArray(response.data)) {
            this.setState({ lessons: response.data, loading: false });

        }
        else {
            this.setState({ lessons: [], loading: false });
        }
    }
}
