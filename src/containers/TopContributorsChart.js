import React, { Component } from 'react';
import '../css/TopContributorsChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart, Hint} from 'react-vis';

class TopContributorsChart extends Component {

  constructor (props) {
    super(props);

    this.state = {
      value: false
    };
  }

  render () {
    return (
      <div className='chart'>
        <RadialChart
          innerRadius={100}
          radius={140}
          getAngle={d => d.theta}
          data={[
            {theta: 2},
            {theta: 6},
            {theta: 2},
            {theta: 3},
            {theta: 1}
          ]}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          width={300}
          height={300}
          padAngle={0.04}
        >
        {this.state.value && <Hint value={this.state.value} />}
        </RadialChart>
      </div>
    )
  }
}

export default TopContributorsChart;
