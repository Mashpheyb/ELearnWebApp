import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { postJson } from '../common/api';
import { AdminLayout } from './AdminLayout';
import './login.css';
import { storeTokenData, getUserData } from '../common/auth'


export class AddTeacher extends Component {
    static displayName = AddTeacher.name;


    constructor(props) {
        super(props);
        this.state = {
            registerData: {
                role: 2,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                identificationNo: ''
            },
            isLoading: false,
            redirect: null
        };

        this.handleInputs = this.handleInputs.bind(this);
        this.submitRegistrationForm = this.submitRegistrationForm.bind(this);
    }

    componentDidMount() {
        var userData = getUserData();
        if (userData == null)
            this.redirect('/admin/login');
    }

    handleInputs(event) {
        const { name, value, type, checked } = event.target;

        this.setState((prevstate) => {
            var changedData = prevstate.registerData;
            type == "checkbox" ?
                changedData[name] = checked : changedData[name] = value;

            return { registerData: changedData };
        });
    }

    redirect(url) {
        this.setState(() => {
            return { redirect: url };
        });
    }


    async submitRegistrationForm(event) {
        event.preventDefault();
        var baseurl = window.location.origin;
        var registerData = this.state.registerData;
        var apiUrl = baseurl + '/user/register';
        var response = await postJson(apiUrl, false, registerData);

        if (response && response.success && response.data) {
            this.redirect('/admin/teachers');
        }
        else {
            if (response.message) {
                alert(response.message);
            }
        }
    }

    render() {

        let registerData = this.state.registerData;

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
                                        <Form onSubmit={this.submitRegistrationForm}>
                                            <FormGroup>
                                                <Label for="firstName">First Name</Label>
                                                <Input type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={registerData.firstName}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="lastName">Last Name</Label>
                                                <Input type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={registerData.lastName}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="identificationNo">Id</Label>
                                                <Input type="text" name="identificationNo" id="identificationNo" placeholder="Enter Id" value={registerData.identificationNo}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" id="email" placeholder="Enter email" value={registerData.email}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input type="password" name="password" id="password" placeholder="Enter Password" value={registerData.password}
                                                    onChange={this.handleInputs} />
                                            </FormGroup>
                                            <Button color="primary">Add Teacher</Button>
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
