import React, { Component } from 'react';
import '../css/RepoGraph.css';
import LoadingSpinner from './LoadingSpinner.js';
const octokit = require('@octokit/rest')();

class RepoGraph extends Component {

  constructor (props) {
    super(props);

    this.state = {
      loading: false,
      commitData: '',
      commitsFetched: 0
    };

    this.paginate = this.paginate.bind(this);
  }

  // When RepoPage mounts, fetch commit data and display loading screen
  componentDidMount() {

      this.setState({loading: true})

      // Fetch all of the commit data
      this.paginate(octokit.repos.getCommits, this.props.repoData.owner.login, this.props.repoData.name)
      .then(data => {
        this.setState({
          loading: false,
          commitData: data
        })
      })
  }

  // Method for fetching multiple pages of commits
  paginate = async (method, owner, repo) => {
    let response = await method({ per_page: 100, owner: owner, repo: repo })
    let { data } = response
    var currentCommitsFetched = this.state.commitsFetched

    while (octokit.hasNextPage(response)) {
      response = await octokit.getNextPage(response)
      data = data.concat(response.data)
      currentCommitsFetched += 100
      this.setState({commitsFetched: currentCommitsFetched})
    }
    return data
  }

  render () {
    return (
      <div className="repo-graph-container">
        <div className="repo-graph-loading-spinner">
          {this.state.loading && <LoadingSpinner commitsFetched={this.state.commitsFetched}/>}
        </div>
      </div>
    )
  }
}

export default RepoGraph;