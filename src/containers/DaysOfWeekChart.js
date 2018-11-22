import React, { Component } from 'react';
import '../css/DaysOfWeekChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, VerticalBarSeries, YAxis} from 'react-vis';

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
        </XYPlot>
      </div>
    )
  }
}

export default DaysOfWeekChart;
