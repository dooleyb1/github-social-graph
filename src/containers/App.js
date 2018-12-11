import React, { Component } from 'react';
import '../css/App.css';
import Form from './Form.js';
import RepoPage from './RepoPage.js';
import Loader from 'react-loader-spinner';
require('dotenv').config()
//import savedRepoData from '../facebookreact-repodata.json'

const octokit = require('@octokit/rest')();

class App extends Component {

  constructor (props) {
    super(props);

    octokit.authenticate({
      type: 'token',
      token: process.env.REACT_APP_API_KEY
    })

    this.state = {
      orgRepoString: '',
      submitted: false,
      organisation: '',
      repo: '',
      isValid: true,
      repoData: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    document.title = "GitHub Social Graph";
  }

  handleChange(event) {
    this.setState({orgRepoString: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    //Set loading to true
    this.setState({loading: true})

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
        this.setState({
          isValid: false,
          loading: false
        });
        return
      } else {

        this.setState({
          isValid: true,
          repoData: result.data,
          submitted: true,
          loading: false
        });
        //console.log(result)
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
      repo: '',
      loading: false
    });
  }

  render() {
    return (
      <div className="app">
        {!this.state.submitted && <img src={ require('../images/gh2.png') } className="app-logo" alt="logo" />}
        <div className="app-container">
          {!this.state.submitted && !this.state.loading && <Form onChangeValue={this.handleChange} onSubmit={this.handleSubmit} isValid={this.state.isValid}/>}
          {this.state.submitted && this.state.isValid && !this.state.loading && <RepoPage onReturn={this.handleReturn} repoData={this.state.repoData}/>}
          {this.state.loading && <div className="home-screen-loading-spinner"><Loader type="Bars" color="#00BFFF" height="50" width="50"/></div>}
        </div>
      </div>
    );
  }
}

export default App;
