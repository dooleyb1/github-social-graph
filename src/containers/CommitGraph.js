import React, { Component } from 'react';
import '../css/CommitGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, ChartLabel, XAxis, YAxis} from 'react-vis';
import ReactTooltip from 'react-tooltip';

class CommitGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      clicked: false
    };
  }

  render () {

      if(!this.props.graphData){
        return(<div></div>)
      } else{
        return (
          <div data-tip data-for='commitTip' className='chart'>
            {this.state.value && this.state.clicked &&
              <ReactTooltip id='commitTip' type='error'>
                <p>Date: {this.state.value.date}</p>
                <p>Commits: {this.state.value.commits}</p>
              </ReactTooltip>
            }
            <XYPlot
              margin={{left: 50,bottom: 100}}
              xType="time"
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
            <XAxis tickLabelAngle={-90}/>
            <YAxis/>
            <ChartLabel
              text="Commits"
              className="alt-y-label"
              includeMargin={true}
              xPercent={0.02}
              yPercent={0.1}
              style={{
                transform: 'rotate(-90)',
                textAnchor: 'end',
              }}
              />
            <LineSeries
              onNearestXY={(datapoint, event) => this.setState({
                value: {
                  date: datapoint.x.toString().substring(0,15),
                  commits: datapoint.y,
                }
              })}
              data={this.props.graphData}
            />
            </XYPlot>
          </div>
        )
      }
  }
}

export default CommitGraph;
