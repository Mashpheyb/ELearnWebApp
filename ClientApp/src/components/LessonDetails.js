import React, { Component } from 'react';
import { TeacherLayout } from './TeacherLayout';
import { getJson } from '../common/api';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import FileViewer from 'react-file-viewer';


export class LessonDetails extends Component {
    static displayName = LessonDetails.name;

    constructor(props) {
        super(props);
        this.state = {
            details: {
                id: 0,
                courseId: 0,
                title: '',
                description: '',
                exercise: '',
                creationDate: '',
                teacherName: '',
                attachments: []
            },
            loading: true,
            lessonId: props.match.params.id
        };
    }

    componentDidMount() {
        this.populateLessonDetails(this.props.match.params.id);
    }

    render() {

        let detailsData = this.state.details;
        let attachmentData = this.state.details.attachments;

        const imgStyle = {
            maxHeight: 450,
            maxWidth: 600
        }

        let attachmenDisplays = attachmentData.map(function (item) {

            let filetype = item.fileName.split('.').pop();

            if (item.type == 'image') {
                return (
                    <Media object src={item.url} style={imgStyle} />
                );
            }
            else {

                return (<FileViewer
                    fileType={filetype}
                    filePath={item.url} />);
                
            }


        })


        let lessonDetails = <div>
            <h1 id="tabelLabel" className="table-header">{detailsData.title}</h1>
            <h6>Created on {detailsData.creationDate}</h6>
            <h6>By {detailsData.teacherName}</h6>
            <div className="lesson-content">

                <p className="lesson-paragraph">{detailsData.description}</p>

                <h5>Attachments:</h5>
                <div className="lesson-attachment">
                    {attachmenDisplays}

                </div>


                <h5>Exercise:</h5>
                <p className="lesson-exercise">{detailsData.exercise}</p>

            </div>
            

            

        </div>;

        
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : lessonDetails;

        return (
            <TeacherLayout>
                <div>
                    {contents}
                </div>
            </TeacherLayout>
        );
    }

    async populateLessonDetails(lessonId) {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/course/lesson/details/' + lessonId;
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data) {
            this.setState({ details: response.data, loading: false });

        }
        else {
            this.setState({ details: {}, loading: false });
        }
    }
}
