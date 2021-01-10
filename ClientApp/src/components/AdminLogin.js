import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { postJson } from '../common/api';
import { Layout } from './Layout';
import './login.css';
import { storeTokenData, getUserData } from '../common/auth'


export class AdminLogin extends Component {
    static displayName = AdminLogin.name;


    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                role: 1,
                email: '',
                password: ''
            },
            isLoading: false,
            redirect: null
        };

        this.handleInputs = this.handleInputs.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
    }

    componentDidMount() {
        var userData = getUserData();
        if (userData != null)
            this.redirect('/admin/dashboard');
    }

    handleInputs(event) {
        const { name, value, type, checked } = event.target;

        this.setState((prevstate) => {
            var changedLoginData = prevstate.loginData;
            type == "checkbox" ?
                changedLoginData[name] = checked : changedLoginData[name] = value;

            return { loginData: changedLoginData };
        });
    }

    redirect(url) {
        this.setState(() => {
            return { redirect: url };
        });
    }


    async submitLoginForm(event) {
        event.preventDefault();
        var baseurl = window.location.origin;
        var loginData = this.state.loginData;
        var apiUrl = baseurl + '/user/login';
        var response = await postJson(apiUrl, false, loginData);

        if (response && response.success && response.data) {
            storeTokenData(response.data);
            this.redirect('/admin/dashboard');
        }
        else {
            if (response.message) {
                alert(response.message);
            }
        }
    }

    render() {

        let loginFormData = this.state.loginData;

        if (this.state.redirect != null)
            return <Redirect to={this.state.redirect} />
        else
            return (
                <Container>
                    <div className="login">

                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <div>
                                    <h1>Login</h1>
                                    <Form onSubmit={this.submitLoginForm}>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="Enter email" value={loginFormData.email}
                                                onChange={this.handleInputs}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="Enter Password" value={loginFormData.password}
                                                onChange={this.handleInputs}/>
                                        </FormGroup>
                                        <Button color="primary">Login</Button>
                                    </Form>
                                </div>
                            
                            </Col>
                        </Row>

                    
                    </div>
                </Container>
            );
    }
}
