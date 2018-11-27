import React, { Component } from 'react';
import '../css/DaysOfWeekChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, Hint, ChartLabel, VerticalBarSeries, YAxis} from 'react-vis';

class DaysOfWeekChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render () {
    //console.log(this.props.additionStats)
    return (
      <div className='chart'>
        <XYPlot
          margin={{left: 50,bottom: 100}}
          xType="ordinal"
          height={300}
          width= {500}
          onMouseLeave={() => this.setState({value: null})}
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
           onNearestXY={(datapoint) => this.setState({
             value: {
               Day: datapoint.x,
               Avg_Commits: datapoint.y,
             }
           })}
          />
          {this.state.value && <Hint value={this.state.value}/>}
        </XYPlot>
      </div>
    )
  }
}

export default DaysOfWeekChart;
