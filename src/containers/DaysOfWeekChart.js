import React, { Component } from 'react';
import '../css/DaysOfWeekChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, ChartLabel, VerticalBarSeries, YAxis} from 'react-vis';

class DaysOfWeekChart extends Component {

  render () {
    //console.log(this.props.additionStats)
    return (
      <div className='chart'>
        <XYPlot
          margin={{left: 50,bottom: 100}}
          xType="ordinal"
          height={300}
          width= {500}
        >
        <XAxis/>
        <YAxis/>
        <VerticalBarSeries
         colorType='literal'
         data={this.props.graphData}
        />
        <ChartLabel
          text="Average Commits"
          className="alt-y-label"
          includeMargin={true}
          xPercent={0.02}
          yPercent={0.05}
          style={{
            transform: 'rotate(-90)',
            textAnchor: 'end',
            marginLeft: '-150'
          }}
          />
        </XYPlot>
      </div>
    )
  }
}

export default DaysOfWeekChart;
