import React, { Component } from 'react';
import '../css/AdditionDeletionGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, ChartLabel, DiscreteColorLegend, VerticalRectSeries, YAxis} from 'react-vis';

class AdditionDeletionGraph extends Component {
  render () {
    //console.log(this.props.additionStats)
    var d3 = require("d3-format");
    
    return (
      <div className='chart'>
        <XYPlot
          margin={{left: 50,bottom: 100}}
          xType="time"
          height={300}
          width= {500}
          stackBy="y"
        >
        <DiscreteColorLegend
          style={{position: 'absolute', right: '50px', top: '10px'}}
          orientation="vertical"
          items={[
            {
              title: 'Additions',
              color: '#12939A'
            },
            {
              title: 'Deletions',
              color: '#79C7E3'
            }
          ]}
          />
        <XAxis tickLabelAngle={-90}/>
        <YAxis tickFormat={tick => d3.format('.2s')(tick)}/>
        <ChartLabel
          text="Lines"
          className="alt-y-label"
          includeMargin={true}
          xPercent={0.014}
          yPercent={0.15}
          style={{
            transform: 'rotate(-90)',
            textAnchor: 'end',
          }}
          />
        <VerticalRectSeries data={this.props.additionStats} />
        <VerticalRectSeries data={this.props.deletionStats} />
        </XYPlot>
      </div>
    )
  }
}

export default AdditionDeletionGraph;
