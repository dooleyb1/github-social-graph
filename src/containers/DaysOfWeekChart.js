import React, { Component } from 'react';
import '../css/DaysOfWeekChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, ChartLabel, VerticalBarSeries, YAxis} from 'react-vis';
import ReactTooltip from 'react-tooltip';

class DaysOfWeekChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      clicked: false
    };
  }

  render () {
    //console.log(this.props.additionStats)
    return (
      <div data-tip data-for='commitTip' className='chart'>
        {this.state.value && this.state.clicked &&
          <ReactTooltip id='commitTip' type='error'>
            <p>Day: {this.state.value.day}</p>
            <p>Average Commits: {this.state.value.commits}</p>
          </ReactTooltip>
        }
        <XYPlot
          margin={{left: 50,bottom: 100}}
          xType="ordinal"
          height={300}
          width= {500}
          onMouseLeave={() => this.setState({
            value: null,
            clicked: false
          })}
          onClick={(event) => this.setState({
            clicked: true
          })}
          onDoubleClick={(event) => this.setState({
            clicked: false
          })}
        >
        <XAxis/>
        <YAxis/>
        <ChartLabel
          text="Average Commits"
          className="alt-y-label"
          includeMargin={true}
          xPercent={0.02}
          yPercent={0.05}
          style={{
            transform: 'rotate(-90)',
            textAnchor: 'end',
          }}
          />
          <VerticalBarSeries
           colorType='literal'
           data={this.props.graphData}
           onNearestX={(datapoint) => this.setState({
             value: {
               day: datapoint.x.toString().substring(0,15),
               commits: datapoint.y,
             }
           })}
          />
        </XYPlot>
      </div>
    )
  }
}

export default DaysOfWeekChart;
