import React, { Component } from 'react';
import { TeacherLayout } from './TeacherLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import FileViewer from 'react-file-viewer';


export class CourseLessons extends Component {
    static displayName = CourseLessons.name;

    constructor(props) {
        super(props);
        this.state = { lessons: [], loading: true, courseId: props.match.params.id };
    }

    componentDidMount() {
        this.populateLessons(this.props.match.params.id);
    }

    render() {

        let lessons = this.state.lessons.map(function (item) {
            var url = "/teacher/courses/lessons/details/" + item.id.toString();

            return (<tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.creationDate}</td>
                <td><Button outline color="primary" tag={Link} to={url}>Details</Button>{' '}</td>
            </tr>)

        })

        let addLessonUrl = "/teacher/courses/lessons/add/" + this.state.courseId; 
        const imgStyle = {
            maxHeight: 128,
            maxWidth: 128
        }
        //const type = 'jpeg';
        //const file = 'https://firebasestorage.googleapis.com/v0/b/elearnweb-e19d8.appspot.com/o/assets%2F102737165_2706927662877889_7846452841238617640_o.jpg?alt=media&token=fb5ac0e3-11d7-4f92-ba81-855d8fcdea0d';

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : lessons;

        return (
            <TeacherLayout>
                <div>
                    <h1 id="tabelLabel" className="table-header">Course Lessons</h1>
                    
                    <Button outline color="primary" className="add-btn" tag={Link} to={addLessonUrl}>Add New Lesson</Button>{' '}
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
            </TeacherLayout>
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
