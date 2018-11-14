import React, { Component } from 'react';
import '../css/RepoPage.css';
import RepoProfile from './RepoProfile.js';
import RepoGraph from './RepoGraph.js';

class RepoPage extends Component {

  render () {
    return (
        <div className="repo-page-container">
          {this.props.repoData && <RepoProfile repoData={this.props.repoData} onReturn={this.props.onReturn}/>}
          {this.props.repoData && <RepoGraph repoData={this.props.repoData}/>}
        </div>
    )
  }
}

export default RepoPage;
