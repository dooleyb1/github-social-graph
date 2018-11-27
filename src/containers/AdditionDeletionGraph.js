import React, { Component } from 'react';
import '../css/AdditionDeletionGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, ChartLabel, DiscreteColorLegend, VerticalRectSeries, YAxis} from 'react-vis';
import ReactTooltip from 'react-tooltip';

class AdditionDeletionGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      date: null,
      additions: null,
      deletions: null,
      align: {horizontal: 'right', vertical: 'top'},
      clicked: false,
    };
  }

  render () {
    //console.log(this.props.additionStats)
    var d3 = require("d3-format");

    return (
      <div data-tip data-for='commitTip' className='chart'>
        {this.state.value && this.state.clicked &&
          <ReactTooltip id='commitTip' type='error'>
            <p>Date: {this.state.date}</p>
            <p>Additions: {this.state.additions}</p>
            <p>Deletions: {this.state.deletions}</p>
          </ReactTooltip>
        }
        <XYPlot
          margin={{left: 50,bottom: 100}}
          xType="time"
          height={300}
          width= {500}
          stackBy="y"
          onMouseLeave={() => this.setState({
            value: null,
            clicked: false,
            date: null,
            deletions: null,
            additions: null
          })}
          onClick={(event) => this.setState({
            clicked: true
          })}
          onDoubleClick={(event) => this.setState({
            clicked: false
          })}
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
        <VerticalRectSeries
          onNearestXY={(datapoint, event) => this.setState({
            date: datapoint.x.toString().substring(0,15),
            additions: datapoint.y,
            value: 1
          })}
          data={this.props.additionStats}
        />
        <VerticalRectSeries
          data={this.props.deletionStats}
          onNearestXY={(datapoint, event) => this.setState({
            deletions: datapoint.y,
            value: 1
          })}
        />
        </XYPlot>
      </div>
    )
  }
}

export default AdditionDeletionGraph;
