import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Input, Label, Dropdown, Form } from 'semantic-ui-react';
import PotholeItem from './PotholeItem';

export default class PotholeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      potholes: [], // array of all potholes
      display: [],
      zipFilter: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.potholeFilter = this.potholeFilter.bind(this);
  }

  componentDidMount() {
    axios.get('/potholes')
      .then((potholes) => {
        this.setState({
          potholes: potholes.data,
          display: potholes.data,
        });
      });
  }

  potholeFilter(zip) {
    const { potholes } = this.state;
    const filtered = potholes.filter(pothole => pothole.zip.toString() === zip);
    this.setState({
      display: filtered,
    });
  }

  handleInputChange(event) {
    this.setState({
      zipFilter: event.target.value,
    });
  }

  handleChange(event, { value }) {
    const { display } = this.state;
    if (value === 'percentD') {
      display.sort((a, b) => Math.floor((b.money_donated / b.fill_cost) * 100) - Math.floor((a.money_donated / a.fill_cost) * 100));
      this.setState({
        display,
      });
    } else if (value === 'percentA') {
      display.sort((a, b) => Math.floor((a.money_donated / a.fill_cost) * 100) - Math.floor((b.money_donated / b.fill_cost) * 100));
      this.setState({
        display,
      });
    } else if (value === 'severityD') {
      display.sort((a, b) => b.severity - a.severity);
      this.setState({
        display,
      });
    } else if (value === 'severityA') {
      display.sort((a, b) => a.severity - b.severity);
      this.setState({
        display,
      });
    }
  }

  render() {
    const { display, zipFilter } = this.state;
    const options = [
      {
        key: 1,
        icon: 'sort descending',
        text: 'Percent Funded',
        value: 'percentD'
      },
      {
        key: 2,
        icon: 'sort ascending',
        text: 'Percent Funded',
        value: 'percentA'
      },
      {
        key: 3,
        icon: 'sort descending',
        text: 'Severity',
        value: 'severityD'
      },
      {
        key: 4,
        icon: 'sort ascending',
        text: 'Severity',
        value: 'severityA'
      },
    ];
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form>
              <Label pointing="below">Find Potholes near you</Label>
              <Input
                fluid
                multiple
                action={{
                  icon: 'search',
                  onClick: () => { this.potholeFilter(zipFilter); }
                }}
                onChange={this.handleInputChange}
                placeholder="Zip..."
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form>
              <Label pointing="below">Sort those potholes</Label>
              <Dropdown
                onChange={this.handleChange}
                text="Sort"
                icon="sort"
                floating
                labeled
                selection
                className="icon"
                options={options}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={6}>
          {display.map(pothole => <PotholeItem pothole={pothole} key={pothole.id} />)}
        </Grid.Column>
        <Grid.Column width={6}>
          About us
        </Grid.Column>
      </Grid>
    );
  }
}
