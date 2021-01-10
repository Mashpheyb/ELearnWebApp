import React, { Component } from 'react';
import { Route } from 'react-router';
import { StudentLayout } from './StudentLayout';

export class StudentDashboard extends Component {
    static displayName = StudentDashboard.name;

    render() {
        return (
            <StudentLayout>
                <div>
                    <h1>Student Dashboard</h1>
                    <p>Enrol to any of available courses</p>
                    <p>Get all the lessons and other details of your enrolled courses in 'My Courses'</p>
                </div>
            </StudentLayout>
        );
    }
}
