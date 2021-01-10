import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <Layout>
              <div>
                  <h1>Elearn Web APP</h1>
                  <p>Welcome to E-learnign web app. Here:</p>
                  <ul>
                      <li>Teachers can login and create and evaluate exams for assigned courses</li>
                      <li>Students can login and submit their answers</li>
                  </ul>
              </div>
          </Layout>

      
    );
  }
}
