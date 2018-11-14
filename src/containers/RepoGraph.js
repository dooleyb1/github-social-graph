import React, { Component } from 'react';
import '../css/RepoGraph.css';
import { accessToken } from '../access-token.js';
import LoadingSpinner from './LoadingSpinner.js';
import ContributorsCarousel from './ContributorsCarousel.js';
import savedCommitData from '../facebookreact-commit-data.json'
const octokit = require('@octokit/rest')();

class RepoGraph extends Component {

  constructor (props) {
    super(props);

    this.state = {
      loading: false,
      commitData: '',
      contributorData: '',
      fetched: 0,
      fetchString: '',
      accessToken: accessToken
    };

    this.paginate = this.paginate.bind(this);
    this.authenticateGitHub = this.authenticateGitHub.bind(this);
    this.getCommitData = this.getCommitData.bind(this);
    this.getContributorData = this.getContributorData.bind(this);
  }

  // Authenticate with GitHub API
  authenticateGitHub() {

    octokit.authenticate({
      type: 'token',
      token: accessToken
    })
  }

  // When RepoPage mounts, fetch commit data and display loading screen
  componentDidMount() {

      this.setState({loading: true})
      this.getContributorData()
  }

  getCommitData() {

    this.setState({fetchString: 'commits'})

    this.paginate(octokit.repos.getCommits, this.props.repoData.owner.login, this.props.repoData.name)
    .then(data => {
      this.setState({
        loading: false,
        commitData: data
      })
    })
  }

  getContributorData() {

    this.setState({fetchString: 'contributors'})

    this.paginate(octokit.repos.getContributors, this.props.repoData.owner.login, this.props.repoData.name)
    .then(data => {
      //console.log(data)
      this.setState({
        loading: false,
        contributorData: data
      })
    })
  }

  // Method for fetching multiple pages of commits
  paginate = async (method, owner, repo) => {

    this.authenticateGitHub()

    let response = await method({ per_page: 100, owner: owner, repo: repo })
    let { data } = response
    var currentFetched = this.state.fetched

    while (octokit.hasNextPage(response)) {

      this.authenticateGitHub()

      response = await octokit.getNextPage(response)
      data = data.concat(response.data)
      currentFetched += 100
      this.setState({fetched: currentFetched})
    }
    return data
  }

  render () {
    return (
      <div className="repo-graph-container">
        <div className="repo-graph-loading-spinner">
          {this.state.loading && <LoadingSpinner fetched={this.state.fetched} fetchString={this.state.fetchString}/>}
        </div>
        {!this.state.loading && this.state.contributorData && <ContributorsCarousel contributorData={this.state.contributorData}/>}
      </div>
    )
  }
}

export default RepoGraph;
