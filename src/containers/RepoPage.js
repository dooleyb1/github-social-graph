import React, { Component } from 'react';
import '../css/RepoPage.css';
import RepoProfile from './RepoProfile.js';
import RepoGraph from './RepoGraph.js';

class RepoPage extends Component {

  render () {
    return (
        <div className="row1">
          <div className="col1">
            {this.props.repoData && <RepoProfile repoData={this.props.repoData} onReturn={this.props.onReturn}/>}
          </div>
          <div className="col2">
            {this.props.repoData && <RepoGraph repoData={this.props.repoData}/>}
          </div>
        </div>
    )
  }
}

export default RepoPage;
