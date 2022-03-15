import React, { Component } from 'react';

class FormHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Input Numerical Value</th>
          <th>Input Unit of Measure</th>
          <th>Target Unit of Measure</th>
          <th>Student Response</th>
          <th>Output</th>
        </tr>
      </thead>
    );
  }
}

export default FormHeader;

