import React, { Component } from 'react';
import '../css/TopContributorsChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart} from 'react-vis';
import ReactTooltip from 'react-tooltip';

class TopContributorsChart extends Component {

  constructor (props) {
    super(props);

    this.state = {
      value: false,
      username: '',
      contributions: '',
      avatar: '',
      html: ''
    };

    this.getData = this.getData.bind(this)
  }

  getData(theta) {
    for(var author in this.props.top5){
      if(this.props.top5[author].contributions === theta){
        this.setState({
          username: this.props.top5[author].username,
          contributions: this.props.top5[author].contributions,
          avatar: this.props.top5[author].avatar,
          html: this.props.top5[author].html_url,
        })
      }
    }
  }

  render () {
    if(!this.props.topContributorData){
      return(<div></div>)
    } else{
      //console.log(this.props.topContributorData)
      return (
        <div data-tip data-for='contributorsTip' className='chart'>
          {this.state.value  &&
            <ReactTooltip id='contributorsTip' type='error'>
              <div className="inner-tooltip">
                <img className="org-icon" src={this.state.avatar} alt="user icon"/>
                <div className="horizontal-line"></div>
                <p><span style={{color: '#4DD0E1'}}>Username:</span> {this.state.username}</p>
                <p><span style={{color: '#4DD0E1'}}>Contributions:</span> {this.state.contributions}</p>
              </div>
            </ReactTooltip>
          }
          <RadialChart
            innerRadius={100}
            radius={140}
            getAngle={d => d.theta}
            data={this.props.topContributorData}
            onValueMouseOver={v => {
              this.getData(v.theta)
              this.setState({value: true})
            }}
            onSeriesMouseOut={v => this.setState({value: false})}
            width={300}
            height={300}
            padAngle={0.04}
          >
          </RadialChart>
        </div>
      )
    }
  }
}

export default TopContributorsChart;
