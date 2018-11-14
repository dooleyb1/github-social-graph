import React, { Component } from 'react';
import '../css/RepoProfile.css';

class RepoProfile extends Component {

  constructor (props) {
    super(props);

    this.state = {
    };
  }

  render () {
    return (
      <div className="repo-profile-container">
        <div className="repo-profile">
          <img className="org-icon" src={this.props.repoData.owner.avatar_url} alt="user icon"/>
          <div className="repo-details-primary">
            <p>{this.props.repoData.name}</p>
            <p><i>{this.props.repoData.description}</i></p>
          </div>
          <div className="horizontal-line"></div>
          <div className="repo-details-secondary">
            <p><span style={{color: '#4DD0E1'}}>Language:</span> {this.props.repoData.language}</p>
            <p><span style={{color: '#4DD0E1'}}>License:</span> {this.props.repoData.license.name}</p>
            <p><span style={{color: '#4DD0E1'}}>Subscribers:</span> {this.props.repoData.subscribers_count} | <span style={{color: '#4DD0E1'}}>Watchers:</span> {this.props.repoData.watchers_count}</p>
            <p><span style={{color: '#4DD0E1'}}>Issues:</span> {this.props.repoData.open_issues_count} | <span style={{color: '#4DD0E1'}}>Forks:</span> {this.props.repoData.forks_count}</p>
          </div>
          <div className="repo-details-links">
            <a className="link" href={this.props.repoData.homepage} rel="noopener noreferrer">Homepage</a><br/><br/>
            <a className="link" href={this.props.repoData.html_url} rel="noopener noreferrer">Repository</a>
          </div>
          <div className="horizontal-line"></div>
          <div className="return-button">
            <button type="submit" className="btn btn-primary" onClick={this.props.onReturn}>Return</button>
          </div>
        </div>
      </div>
    )
  }
}

export default RepoProfile;
