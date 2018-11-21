import React, { Component } from 'react';
import '../css/RepoGraph.css';
import { accessToken } from '../access-token.js';
import LoadingSpinner from './LoadingSpinner.js';
import ContributorsCarousel from './ContributorsCarousel.js';
import AdditionDeletionGraph from './AdditionDeletionGraph.js';
import TopContributorsChart from './TopContributorsChart.js';
import CommitGraph from './CommitGraph.js';
//import savedCommitData from '../facebookreact-commit-data.json'
const octokit = require('@octokit/rest')();

class RepoGraph extends Component {

  constructor (props) {
    super(props);

    this.state = {
      contributorLoading: false,
      commitsLoading: false,
      additionDeletionLoading: false,
      topContributorsLoading: false,
      additionStats: '',
      deletionStats: '',
      topContributorData: '',
      commitData: '',
      commitGraphData: '',
      contributorData: '',
      fetched: 0,
      fetchString: '',
      accessToken: accessToken
    };

    this.paginate = this.paginate.bind(this);
    this.authenticateGitHub = this.authenticateGitHub.bind(this);
    this.getCommitData = this.getCommitData.bind(this);
    this.getContributorData = this.getContributorData.bind(this);
    this.getTopContributorData = this.getTopContributorData.bind(this);
    this.getAdditionDeletionStats = this.getAdditionDeletionStats.bind(this);
  }

  // When RepoPage mounts, fetch commit data and display loading screen
  componentDidMount() {

    this.setState({
      contributorLoading: true,
      commitLoading: true,
      additionDeletionLoading: true,
      topContributorsLoading: false,
    })

    this.getTopContributorData()
    this.getContributorData()
    this.getCommitData()
    this.getAdditionDeletionStats()
  }

  // Authenticate with GitHub API
  authenticateGitHub() {

    octokit.authenticate({
      type: 'token',
      token: accessToken
    })
  }

  getCommitData() {

    this.setState({
      fetchString: 'commits'
    })

    this.paginate(octokit.repos.getCommits, this.props.repoData.owner.login, this.props.repoData.name)
    .then(data => {

      var commitCounts = {};

      // Loop over every commit
      for(var commit in data){

        var commitDate = new Date(data[commit].commit.author.date.substring(0,10))

        // If commit count exists for that day, increment
        if(commitCounts[commitDate]){
          commitCounts[commitDate]++;
        } else {
          commitCounts[commitDate] = 1;
        }
      }

      // Get data for commit graph
      var graphData = [];

      // Convert commit stats to key:date, val:count object
      for(var node in commitCounts){
        graphData.push({x: new Date(node), y: commitCounts[node]})
      }

      //console.log(graphData)

      // Set state to say data is ready
      this.setState({
        commitLoading: false,
        commitData: data,
        commitGraphData: graphData
      })
      //console.log(data)
    })
  }

  getAdditionDeletionStats() {

    // Get addition/deletion stats from GitHub API
    var fetchEndpoint = 'https://api.github.com/repos/'.concat(this.props.repoData.owner.login, '/',this.props.repoData.name, '/stats/code_frequency')
    fetch(fetchEndpoint)
     .then(response => response.json())
     .then(data => {

       var additions = [];
       var deletions = [];

       for(var entry in data){

         var date = new Date(data[entry][0] * 1000);
         //console.log(date)
         var date_plus_one_week = new Date(date)
         date_plus_one_week.setDate(date_plus_one_week.getDate() + 7)
         // console.log(date_week)
         // console.log(date)
         // console.log(data[entry][2])
         // console.log(new Date(date))

         additions.push({
           x0: date,
           x: date_plus_one_week,
           y: data[entry][1]
         })

         deletions.push({
           x0: date,
           x: date_plus_one_week,
           y: (data[entry][2] * -1)
         })
       }
       // console.log(additions)
       // console.log(deletions)

       this.setState({
         additionDeletionLoading: false,
         additionStats: additions,
         deletionStats: deletions
       })
     })
  }

  getTopContributorData() {

    this.setState({
      fetchString: 'top contributors'
    })

    // Get addition/deletion stats from GitHub API
    var fetchEndpoint = 'https://api.github.com/repos/'.concat(this.props.repoData.owner.login, '/',this.props.repoData.name, '/stats/contributors')
    fetch(fetchEndpoint)
     .then(response => response.json())
     .then(data => {
       //console.log(data)

       var contributions = [];

       for(var entry in data){

         // console.log(data[entry].total)
         // console.log(data[entry].author.login)

         contributions.push({
           author: data[entry].author.login,
           contributions: data[entry].total
         })
       }

       // Get top 5
       var top5 = [];
       var topContributorsChartData = []
       var totalContributions = 0

       for(var i=contributions.length-1; i>(contributions.length-6); i--){
         top5.push(contributions[i])
         totalContributions += contributions[i].contributions
       }

       for(var i=0; i < top5.length; i++){
         topContributorsChartData.push({theta: (14*(top5[i].contributions/totalContributions))})
       }

       // Set state to say data is ready
       this.setState({
         topContributorsLoading: false,
         topContributorData: topContributorsChartData
       })
     })
  }

  getContributorData() {

    this.setState({
      fetchString: 'contributors'
    })

    this.paginate(octokit.repos.getContributors, this.props.repoData.owner.login, this.props.repoData.name)
    .then(data => {

      // Set state to say data is ready
      this.setState({
        contributorLoading: false,
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
      <div>
        {(this.state.contributorLoading || this.state.commitLoading || this.state.additionDeletionLoading) && <LoadingSpinner fetched={this.state.fetched} fetchString={this.state.fetchString}/>}
        {this.state.commitLoading && this.state.commitGraphData && <div className='row80'><CommitGraph graphData={this.state.commitGraphData}/></div>}
        {this.state.additionDeletionLoading && this.state.deletionStats && this.state.additionStats && <div className='row80'><AdditionDeletionGraph deletionStats={this.state.deletionStats} additionStats={this.state.additionStats}/></div>}
        {!this.state.contributorLoading && <div className='row80'><TopContributorsChart/></div>}
        {!this.state.contributorLoading && this.state.contributorData && <div className='row20'><ContributorsCarousel contributorData={this.state.contributorData}/></div>}
      </div>
    )
  }
}

export default RepoGraph;
