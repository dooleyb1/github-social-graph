import React, { Component } from 'react';
import '../css/Form.css';

class Form extends Component {

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <div className="form">
        <form className="demo-form" onSubmit={this.props.onSubmit}>
          <label htmlFor="username">GitHub Social Graph</label>
          <div className="panel panel-default">
          </div>
          {!this.props.isValid && <p className="invalid-username">Invalid organisation/repo combination entered.</p>}
          <div className={`form-group`}>
            <input type="text" required className="form-control" name="username"
              placeholder="e.g facebook/react"
              onChange={this.props.onChangeValue}/>
          </div>
          <button type="submit" className="btn btn-primary">Find Me</button>
        </form>
      </div>
    )
  }
}

export default Form;
