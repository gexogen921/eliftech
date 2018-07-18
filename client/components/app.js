import axios from 'axios';
import React, { Component } from 'react';

import AddForm from './add-form';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
    };
  }

  componentWillMount() {
    axios.get('/api')
      .then((response) => {
        this.setState({
          companies: this.calculateTree(response.data.companies),
        });
      });
  }

  calculateTotal(company, total = 0) {
    total += parseFloat(company.earnings);

    company.companies.forEach((company) => {
      total = this.calculateTotal(company, total);
    });

    return total;
  }

  calculateTree(companies) {
    companies.forEach((company) => {
      company.total = this.calculateTotal(company);

      this.calculateTree(company.companies);
    });

    return companies;
  }

  handleChangeForm(event, company, key) {
    if(key === 'earnings') {
      company[key] = event.target.value.replace(/[^0-9.]/g, '');
    } else {
      company[key] = event.target.value;
    }

    this.calculateTree(this.state.companies);
    this.setState({
      companies: this.state.companies,
    });
  }

  handleClickCancel() {
    axios.get('/api')
      .then((response) => {
        this.setState({
          companies: this.calculateTree(response.data.companies),
        });
      });
  }

  handleClickSave() {
    axios.post('/api', { companies: this.state.companies })
      .then((response) => {
        axios.get('/api')
          .then((response) => {
            this.setState({
              companies: this.calculateTree(response.data.companies),
            });
          });
      });
  }

  handleClickAdd(companies, form) {
    companies.push({
      _id: Date.now().toString(16),
      name: form.name,
      earnings: form.earnings,
      companies: [],
    });

    this.calculateTree(this.state.companies);
    this.setState({
      companies: this.state.companies,
    });
  }

  handleClickDelete(companies, id) {
    companies.forEach((company, index) => {
      if (company._id === id) {
        companies.splice(index, 1);
      }
    });

    this.calculateTree(this.state.companies);
    this.setState({
      companies: this.state.companies,
    });
  }

  renderTree(companies) {
    return companies.map((company, index) => (
      <li key={company._id} className="list-group-item">
        <div className="row mb-3">
          <div className="col-4">
            <input type="text" className="form-control" value={company.name}
                   onChange={e => this.handleChangeForm(e, company, 'name')}/>
          </div>
          <div className="col-4">
            <input type="text" className="form-control" value={company.earnings}
                   onChange={e => this.handleChangeForm(e, company, 'earnings')}/>
          </div>
          <div className="col-4">
            {company.total ?
              <div className="row">
                <div className="col-6">
                  <input type="text" className="form-control" value={company.total} disabled="true"/>
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-block btn-warning"
                          onClick={() => this.handleClickDelete(companies, company._id)}>Remove
                  </button>
                </div>
              </div>
              :
              <button type="button" className="btn btn-block btn-warning"
                      onClick={() => this.handleClickDelete(companies, company._id)}>Remove</button>
            }
          </div>
        </div>

        <AddForm onSubmit={(form) => this.handleClickAdd(company.companies, form)}/>

        {company.companies.length ?
          <div className="row">
            <div className="col-12">
              <ul className="list-group mt-3">{this.renderTree(company.companies)}</ul>
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

        <ul className="list-group mb-4">
          {this.renderTree(this.state.companies)}

          <li className="list-group-item">
            <div className="row">
              <div className="col-12">
                <AddForm onSubmit={(form) => this.handleClickAdd(this.state.companies, form)}/>
              </div>
            </div>
          </li>
        </ul>

        <button type="button" className="btn btn-danger mr-2" onClick={() => this.handleClickCancel()}>Cancel</button>
        <button type="button" className="btn btn-success mr-2" onClick={() => this.handleClickSave()}>Save</button>
      </div>
    );
  }
}
