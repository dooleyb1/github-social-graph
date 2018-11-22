import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import '../css/GraphSelectButtons.css';

class GraphSelectButtons extends Component {
  constructor (props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
    this.props.onClick(rSelected)
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Commit Graph</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Active Days</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Addition vs Deletion</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>Top Contributors</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default GraphSelectButtons;
