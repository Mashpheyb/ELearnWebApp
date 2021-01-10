import React, { Component } from 'react';
import { Route } from 'react-router';
import { AdminLayout } from './AdminLayout';

export class AdminDashboard extends Component {
    static displayName = AdminDashboard.name;

    render() {
        return (
            <AdminLayout>
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Go to courses to view all existing courses or add new ones</p>
                    <p>Go to Students/Teachers to view existing students/teachers or add new ones</p>
                </div>
            </AdminLayout>
        );
    }
}
