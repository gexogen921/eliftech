import React, { Component } from 'react';

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      earnings: '',
    };
  }

  handleChangeForm(event, key) {
    if(key === 'earnings') {
      this.setState({ [key]: event.target.value.replace(/[^0-9.]/g, '') });
    } else {
      this.setState({ [key]: event.target.value });
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      earnings: '',
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <input type="text" className="form-control" value={this.state.name} onChange={e => this.handleChangeForm(e, 'name')}/>
        </div>
        <div className="col-4">
          <input type="text" className="form-control" value={this.state.earnings} onChange={e => this.handleChangeForm(e, 'earnings')}/>
        </div>
        <div className="col-4">
          <button type="button" className="btn btn-block btn-info" onClick={() => this.handleSubmit()}>Add
          </button>
        </div>
      </div>
    );
  }
}
