import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

const companies = [
  {
    id: '19283783257',
    name: 'com1',
    earnings: 100,
    total: 200,
    children: [
      {
        id: '123',
        name: 'com1-1',
        earnings: 100,
      },
      {
        id: '1234',
        name: 'com1-2',
        earnings: 100,
      },
    ],
  },
  {
    id: '87654323432',
    name: 'com2',
    earnings: 100,
    total: 200,
    children: [
      {
        id: '345',
        name: 'com2-1',
        earnings: 100,
      },
      {
        id: '3456',
        name: 'com2-2',
        earnings: 100,
      },
    ],
  },
  {
    id: '2343534565',
    name: 'com3',
    earnings: 100,
    total: 200,
    children: [
      {
        id: '234',
        name: 'com3-1',
        earnings: 100,
      },
      {
        id: '2345',
        name: 'com3-2',
        earnings: 100,
      },
    ],
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: cloneDeep(companies),
      addForm: {
        id: '',
        name: '',
        earnings: 0,
      }
    };
  }

  getUniqId() {
    return Math.random() * (10000 - 1) + 1;
  }

  handleChangeName(event, item) {
    item.name = event.target.value;
    this.setState({ companies: this.state.companies });
  }

  handleChangeEarnings(event, item) {
    item.earnings = parseFloat(event.target.value);
    this.setState({ companies: this.state.companies });
  }

  handleClickCancel() {
    this.setState({ companies: cloneDeep(companies) });
  }

  handleClickSave() {
    console.log(this.state.companies);
  }

  handleClickParentAdd() {
    this.state.addForm.total = 0;
    this.state.companies.push(this.state.addForm);
    this.setState({ companies: this.state.companies });

    this.setState({
      addForm: {
        id: '',
        name: '',
        earnings: 0
      }
    });
  }

  handleClickAdd(item) {
    if(!item.children)
      item.children = [];

    item.children.push(this.state.addForm);
    this.setState({ companies: this.state.companies });

    this.setState({
      addForm: {
        id: '',
        name: '',
        earnings: 0
      }
    });
  }

  handleChangeAddNameChild(event) {
    this.setState({
      addForm: {
        id: this.state.addForm.id || this.getUniqId(),
        name: event.target.value,
        earnings: this.state.addForm.earnings
      }
    });
  }

  handleChangeAddEarningsChild(event) {
    this.setState({
      addForm: {
        id: this.state.addForm.id || this.getUniqId(),
        name: this.state.addForm.name,
        earnings: event.target.value
      }
    });
  }

  handleDeleteChild(children, item) {
    console.log(item);

    children.map((child, index) => {
      if (child.id === item.id)
        children.splice(index, 1)
    });

    this.setState({ companies: this.state.companies });
  }

  renderTree(children) {
    return children.map((item, index) => (
      <li key={item.id} className="list-group-item">
        <div className="row">
          <div className="col-4">
            <input type="text" className="form-control" value={item.name}
                   onChange={e => this.handleChangeName(e, item)}/>
          </div>
          <div className="col-4">
            <input type="text" className="form-control" value={item.earnings}
                   onChange={e => this.handleChangeEarnings(e, item)}/>
          </div>
          <div className="col-4">
            {item.total || item.total === 0 ?
              <div className="row">
                <div className="col-6">
                  <input type="text" className="form-control" defaultValue={item.total} disabled="true"/>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-block btn-warning" onClick={() => this.handleDeleteChild(children, item)}>Remove</button>
                </div>
              </div>
              :
              <button type="button" className="btn btn-block btn-warning" onClick={() => this.handleDeleteChild(children, item)}>Remove</button>
            }
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <input type="text" className="form-control" defaultValue=""
                   onChange={(event) => this.handleChangeAddNameChild(event)}/>
          </div>
          <div className="col-4">
            <input type="text" className="form-control" defaultValue=""
                   onChange={(event) => this.handleChangeAddEarningsChild(event)}/>
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-block btn-info" onClick={() => this.handleClickAdd(item)}>Add
            </button>
          </div>
        </div>
        {item.children ?
          <div className="row">
            <div className="col-12">
              <ul className="list-group mt-3">{this.renderTree(item.children)}</ul>
            </div>
          </div>
          : null
        }
      </li>
    ));
  }

  render() {
    return (
      <div className="container-fluid mt-4 mb-4">
        <div className="row">
          <div className="col-4 text-center">
            <label>Name</label>
          </div>
          <div className="col-4 text-center">
            <label>Earnings</label>
          </div>
          <div className="col-4 text-center">
            <label>Total</label>
          </div>
        </div>
        <ul className="list-group mb-4">{this.renderTree(this.state.companies)}</ul>
        <div className="row mt-3 mb-3">
          <div className="col-4">
            <input type="text" className="form-control" defaultValue=""
                   onChange={(event) => this.handleChangeAddNameChild(event)}/>
          </div>
          <div className="col-4">
            <input type="text" className="form-control" defaultValue=""
                   onChange={(event) => this.handleChangeAddEarningsChild(event)}/>
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-block btn-info" onClick={() => this.handleClickParentAdd()}>Add
            </button>
          </div>
        </div>
        <button type="button" className="btn btn-danger mr-2" onClick={() => this.handleClickCancel()}>Cancel</button>
        <button type="button" className="btn btn-success mr-2" onClick={() => this.handleClickSave()}>Save</button>
      </div>
    );
  }
}
