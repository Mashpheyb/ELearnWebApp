import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { postJson, getJson, postFormData } from '../common/api';
import { TeacherLayout } from './TeacherLayout';
import './login.css';
import { storeTokenData, getUserData } from '../common/auth'


export class AddLesson extends Component {
    static displayName = AddLesson.name;


    constructor(props) {
        super(props);
        this.state = {
            lessonData: {
                courseId: props.match.params.id,
                title: '',
                description: '',
                exercise: ''
            },
            isLoading: false,
            redirect: null,
            selectedFile: null
        };

        this.handleInputs = this.handleInputs.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.saveLesson = this.saveLesson.bind(this);
    }

    componentDidMount() {
        var userData = getUserData();
        if (userData == null)
            this.redirect('/teacher/login');
    }

    handleInputs(event) {
        const { name, value, type, checked } = event.target;

        this.setState((prevstate) => {
            var changedData = prevstate.lessonData;
            type == "checkbox" ?
                changedData[name] = checked : changedData[name] = value;

            return { lessonData: changedData };
        });
    }

    handleFileChange(event) {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    }; 

    redirect(url) {
        this.setState(() => {
            return { redirect: url };
        });
    }


    async saveLesson(event) {
        event.preventDefault();
        var baseurl = window.location.origin;
        var lessonData = this.state.lessonData;

        var formData = new FormData();
        formData.append("courseLessonObj", JSON.stringify(lessonData));
        var files = [];
        files.push(this.state.selectedFile);
        debugger;
        formData.append("file", this.state.selectedFile); 

        var apiUrl = baseurl + '/course/lesson';
        var response = await postFormData(apiUrl, true, formData);

        if (response && response.success) {
            this.redirect('/teacher/courses/lessons/' + this.state.lessonData.courseId);
        }
        else {
            if (response.message) {
                alert(response.message);
            }
        }
    }

    render() {

        let lessonData = this.state.lessonData;

        let fileName = this.state.selectedFile ? this.state.selectedFile.name : 'No file selected';

        if (this.state.redirect != null)
            return <Redirect to={this.state.redirect} />
        else
            return (
                <TeacherLayout>
                    <Container>
                        <div className="login">

                            <Row>
                                <Col sm="12" md={{ size: 8, offset: 3 }}>
                                    <div>
                                        <h1>Add Lesson</h1>
                                        <Form onSubmit={this.saveLesson} encType="multipart/form-data">
                                            <FormGroup>
                                                <Label for="title">Title</Label>
                                                <Input type="text" name="title" id="title" placeholder="Enter Lesson Title" value={lessonData.title}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="description">Description</Label>
                                                <Input type="textarea" name="description" id="description" placeholder="Enter Description" value={lessonData.description}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exercise">Exercise</Label>
                                                <Input type="textarea" name="exercise" id="exercise" placeholder="Enter Description" value={lessonData.exercise}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="file">Attachment</Label>
                                                <Input type="file" name="file" id="lesson-attachment"
                                                    onChange={this.handleFileChange} />
                                            </FormGroup>
                                            
                                            <Button color="primary">Save Lesson</Button>
                                        </Form>
                                    </div>

                                </Col>
                            </Row>


                        </div>
                    </Container>
                </TeacherLayout>



            );
    }
}
