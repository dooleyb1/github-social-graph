import React, { Component } from 'react';
import '../css/RepoGraph.css';
import { accessToken } from '../access-token.js';
import LoadingSpinner from './LoadingSpinner.js';
import ContributorsCarousel from './ContributorsCarousel.js';
import AdditionDeletionGraph from './AdditionDeletionGraph.js';
import TopContributorsChart from './TopContributorsChart.js';
import GraphSelectButtons from './GraphSelectButtons.js';
import DaysOfWeekChart from './DaysOfWeekChart.js';
import CommitGraph from './CommitGraph.js';
import 'react-notifications/lib/notifications.css';
const octokit = require('@octokit/rest')();

class RepoGraph extends Component {

  constructor (props) {
    super(props);

    this.state = {
      commitsLoading: false,
      contributorLoading: false,
      showCommitGraph: false,
      showDaysOfTheWeek: false,
      showAdditionDeletion: false,
      showTopContributors: false,
      daysOfWeekGraphData: '',
      additionStats: '',
      deletionStats: '',
      topContributorData: '',
      commitData: '',
      commitGraphData: '',
      contributorData: '',
      fetched: 0,
      fetchString: '',
      accessToken: accessToken,
      top5: ''
    };

    this.paginate = this.paginate.bind(this);
    this.getDaysOfWeekStats = this.getDaysOfWeekStats.bind(this);
    this.authenticateGitHub = this.authenticateGitHub.bind(this);
    this.getCommitData = this.getCommitData.bind(this);
    this.getContributorData = this.getContributorData.bind(this);
    this.getTopContributorData = this.getTopContributorData.bind(this);
    this.getAdditionDeletionStats = this.getAdditionDeletionStats.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  // When RepoPage mounts, fetch commit data and display loading screen
  componentDidMount() {

    this.setState({
      commitLoading: true,
      contributorLoading: false,
    })

    this.getDaysOfWeekStats()
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

      console.log(data)

      // Set state to say data is ready
      this.setState({
        commitLoading: false,
        commitData: data,
        showDaysOfTheWeek: true,
        commitGraphData: graphData
      })
      //console.log(data)
    })
  }

  getDaysOfWeekStats() {

    // Get addition/deletion stats from GitHub API
    var fetchEndpoint = 'https://api.github.com/repos/'.concat(this.props.repoData.owner.login, '/',this.props.repoData.name, '/stats/commit_activity')
    fetch(fetchEndpoint)
     .then(response => response.json())
     .then(data => {

       var daysOfWeekStats = [0,0,0,0,0,0,0];
       var daysOfWeekStrings = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
       var daysOfWeekColours = ['#50c1e3', '#ff4200', '#ff8600', '#152a70', '#008a91', '#bd04ad', '#da0404']

       // Process every API response
       for(var entry in data){
         // Loop over every day in API response and add to grand total
         for(var i = 0; i < 7; i++)
          daysOfWeekStats[i] += data[entry].days[i];
       }

       var daysOfWeekGraphData = []

       for(i = 0; i < 7; i++)
         daysOfWeekGraphData.push({
           x: daysOfWeekStrings[i],
           y: daysOfWeekStats[i],
           color: daysOfWeekColours[i]
         })

       //console.log(daysOfWeekGraphData)
       this.setState({
         daysOfWeekGraphData: daysOfWeekGraphData
       })
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
         additionStats: additions,
         deletionStats: deletions
       })
     })
  }

  getTopContributorData() {

    // Get addition/deletion stats from GitHub API
    var fetchEndpoint = 'https://api.github.com/repos/'.concat(this.props.repoData.owner.login, '/',this.props.repoData.name, '/stats/contributors')
    fetch(fetchEndpoint)
     .then(response => response.json())
     .then(data => {
       //console.log(data)

       var contributions = [];

       for(var entry in data){

         // console.log(data[entry].total)
         //console.log(data[entry].author)

         contributions.push({
           username: data[entry].author.login,
           contributions: data[entry].total,
           avatar: data[entry].author.avatar_url,
           html_url: data[entry].author.html_url
         })
       }

       // Get top 5
       var top5 = [];
       var topContributorsChartData = []

       for(var i=contributions.length-1; i>(contributions.length-6); i--){
         top5.push(contributions[i])
         topContributorsChartData.push({theta: contributions[i].contributions})
       }

       console.log(top5)

       // Set state to say data is ready
       this.setState({
         topContributorsLoading: false,
         topContributorData: topContributorsChartData,
         top5: top5
       })
     })
  }


  getContributorData() {

    this.paginate(octokit.repos.getContributors, this.props.repoData.owner.login, this.props.repoData.name)
    .then(data => {

      // Set state to say data is ready
      this.setState({
        contributorLoading: false,
        contributorData: data
      })
    })
  }

  onRadioBtnClick(rSelected) {
    switch(rSelected) {
      // Active Days
      case 1:
          this.setState({
            showCommitGraph: false,
            showDaysOfTheWeek: true,
            showAdditionDeletion: false,
            showTopContributors: false,
          })
          break;
      // Commit Graph
      case 2:
          this.setState({
            showCommitGraph: true,
            showDaysOfTheWeek: false,
            showAdditionDeletion: false,
            showTopContributors: false,
          })
          break;
      // Addition v Deletion
      case 3:
          this.setState({
            showCommitGraph: false,
            showDaysOfTheWeek: false,
            showAdditionDeletion: true,
            showTopContributors: false,
          })
          break;
      // Top Contributors
      case 4:
          this.setState({
            showCommitGraph: false,
            showDaysOfTheWeek: false,
            showAdditionDeletion: false,
            showTopContributors: true,
          })
          break;
      default:
      this.setState({
        showCommitGraph: false,
        showDaysOfTheWeek: true,
        showAdditionDeletion: false,
        showTopContributors: false,
      })
    }
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
        {!this.state.commitLoading && <GraphSelectButtons onClick={this.onRadioBtnClick}/>}
        {this.state.commitLoading && <LoadingSpinner fetched={this.state.fetched} fetchString={this.state.fetchString}/>}
        {!this.state.commitLoading && this.state.showCommitGraph && this.state.commitGraphData && <div className='row80'><CommitGraph graphData={this.state.commitGraphData}/></div>}
        {!this.state.commitLoading && this.state.showDaysOfTheWeek && this.state.daysOfWeekGraphData && <div className='row80'><DaysOfWeekChart graphData={this.state.daysOfWeekGraphData}/></div>}
        {!this.state.commitLoading && this.state.showAdditionDeletion && this.state.deletionStats && this.state.additionStats && <div className='row80'><AdditionDeletionGraph deletionStats={this.state.deletionStats} additionStats={this.state.additionStats}/></div>}
        {!this.state.commitLoading && this.state.showTopContributors && this.state.topContributorData && <div className='row80'><TopContributorsChart topContributorData={this.state.topContributorData} top5={this.state.top5}/></div>}
        {!this.state.commitLoading && !this.state.contributorLoading && this.state.contributorData && <div className='row20'><ContributorsCarousel contributorData={this.state.contributorData}/></div>}
      </div>
    )
  }
}

export default RepoGraph;
