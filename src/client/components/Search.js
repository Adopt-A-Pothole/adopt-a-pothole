import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEntry: null,
    };
  }

  render() {
    return (
      <form>
        <input />
      </form>
    );
  }
}
