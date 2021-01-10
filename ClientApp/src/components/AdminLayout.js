import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../common/auth';
import { getJson } from '../common/api';

export class AdminLayout extends Component {
    static displayName = AdminLayout.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
        this.logoutFromApp = this.logoutFromApp.bind(this);

        this.state = {
            collapsed: true,
            isLoggedIn: true
        };
    }

    componentDidMount() {
        //update logged in status
        this.updateLoggedInStatus();
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    async updateLoggedInStatus() {
        var baseurl = window.location.origin;
        var apiUrl = baseurl + '/user/status';
        var response = await getJson(apiUrl, true);

        if (response && response.success && response.data && response.data.isLoggedIn) {
            this.setState(() => {
                return { isLoggedIn: true };
            });
        }
        else {
            logout();
            this.setState(() => {
                return { isLoggedIn: false };
            });
        }
    }

    logoutFromApp() {
        logout();
        this.setState(() => {
            return { isLoggedIn: false };
        });
    }

    render() {

        if (!this.state.isLoggedIn) {
            return <Redirect to='/admin/login' />
        }
        else
            return (
                <div>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/admin/dashboard">ELearnWeb</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/admin/courses">Courses</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/admin/students">Students</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/admin/teachers">Teachers</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-danger" onClick={this.logoutFromApp}>Logout</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
                <Container>
                    {this.props.children}
                </Container>
                </div>
            );
  }
}
