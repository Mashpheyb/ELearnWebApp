import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { postJson, getJson } from '../common/api';
import { AdminLayout } from './AdminLayout';
import './login.css';
import { storeTokenData, getUserData } from '../common/auth'
import Select from 'react-select'
const $ = window.$;


export class AddCourse extends Component {
    static displayName = AddCourse.name;


    constructor(props) {
        super(props);
        this.state = {
            courseData: {
                name: '',
                description: '',
                assignedTeacher: '',
                selectedOption: {}
            },
            teachers : [],
            isLoading: false,
            redirect: null
        };

        this.handleInputs = this.handleInputs.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.populateTeachers = this.populateTeachers.bind(this);
    }

    componentDidMount() {
        //$('.js-example-basic-multiple').select2({ tags: true });
        this.populateTeachers();
    }

    handleInputs(event) {
        const { name, value, type, checked } = event.target;

        this.setState((prevstate) => {
            var changedData = prevstate.courseData;
            type == "checkbox" ?
                changedData[name] = checked : changedData[name] = value;

            return { courseData: changedData };
        });
    }

    handleSelect(selectedOption) {

        this.setState((prevstate) => {
            var changedCourseData = prevstate.courseData;
            changedCourseData.assignedTeacher = selectedOption.value;
            changedCourseData.selectedOption = selectedOption;

            return { courseData: changedCourseData };
        });
    }

    redirect(url) {
        this.setState(() => {
            return { redirect: url };
        });
    }

    async populateTeachers() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });


        var baseurl = window.location.origin;

        var apiUrl = baseurl + '/teacher/get';
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && Array.isArray(response.data)) {
            this.setState({ teachers: response.data, loading: false });

        }
        else {
            this.setState({ teachers: [], loading: false });
        }
    }


    async saveCourse(event) {
        event.preventDefault();
        var baseurl = window.location.origin;
        var apiUrl = baseurl + '/course/create';
        var data = {
            name: this.state.courseData.name,
            description: this.state.courseData.description,
            assignedTeacher: this.state.courseData.assignedTeacher,
        };
        var response = await postJson(apiUrl, true, data);

        if (response && response.success) {
            this.setState(() => {
                return { redirect: '/Admin/Courses' };
            });
        }
        else {
            if (response && response.message) {
                alert(response.message);
            }
        }
    }

    render() {

        let courseData = this.state.courseData;

        let availableteachers = this.state.teachers.map(function (item) {
            return {
                value: item.id,
                label: item.fullName
            }
        });

        if (this.state.redirect != null)
            return <Redirect to={this.state.redirect} />
        else
            return (
                <AdminLayout>
                    <Container>
                        <div className="login">

                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <div>
                                        <h1>Add Teacher</h1>
                                        <Form onSubmit={this.saveCourse}>
                                            <FormGroup>
                                                <Label for="name">Course Name</Label>
                                                <Input type="text" name="name" id="name" placeholder="Enter Course Name" value={courseData.name}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="description">Description</Label>
                                                <Input type="text" name="description" id="description" placeholder="Enter Description" value={courseData.description}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="teacher">Teacher</Label>
                                                <Select
                                                    value={courseData.selectedOption}
                                                    onChange={this.handleSelect}
                                                    options={availableteachers}
                                                    isSearchable={true}

                                                />
                                            </FormGroup>
                                            <Button color="primary">Save Course</Button>
                                        </Form>
                                    </div>

                                </Col>
                            </Row>


                        </div>
                    </Container>
                </AdminLayout>


                
            );
    }
}
