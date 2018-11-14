import React, { Component } from 'react';
import '../css/App.css';
import Form from './Form.js';
import RepoPage from './RepoPage.js'
import { accessToken } from '../access-token.js';
const octokit = require('@octokit/rest')();

class App extends Component {

  constructor (props) {
    super(props);

    octokit.authenticate({
      type: 'token',
      token: accessToken
    })

    this.state = {
      orgRepoString: '',
      submitted: false,
      organisation: '',
      repo: '',
      isValid: true,
      repoData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleChange(event) {
    this.setState({orgRepoString: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    var fields = this.state.orgRepoString.split('/')

    // Extract organisation and repo
    this.setState({
      organisation: fields[0],
      repo: fields[1]
    })

    // Get repo information for organisation
    octokit.repos.get({owner: fields[0], repo: fields[1]}, (error, result) => {
      // If error occurs, display error message
      if(error){
        this.setState({isValid: false});
        return
      } else {
        this.setState({
          isValid: true,
          repoData: result.data,
          submitted: true
        });
        console.log(result)
      }
    });
  }

  handleReturn(event) {

    // Reset state variables
    this.setState({
      isValid: true,
      orgRepoString: '',
      submitted: false,
      organisation: '',
      repo: ''
    });
  }

  render() {
    return (
      <div className="app">
        <img src={ require('../images/gh2.png') } className="app-logo" alt="logo" />
        <div className="app-container">
          {!this.state.submitted && <Form onChangeValue={this.handleChange} onSubmit={this.handleSubmit} isValid={this.state.isValid}/>}
          {this.state.submitted && this.state.isValid && <RepoPage onReturn={this.handleReturn} repoData={this.state.repoData}/>}
        </div>
      </div>
    );
  }
}

export default App;
