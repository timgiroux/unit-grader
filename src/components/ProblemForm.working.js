import React, { Component } from 'react';
import FormHeader from './FormHeader.js';
import './ProblemForm.css';

// TODO the individual strings should be constants
const unitOptions = [ 'Kelvin',
                      'Celsuis',
                      'Fahrenheit',
                      'Rankine',
                      'liters',
                      'tablespoons',
                      'cubic-inches',
                      'cups',
                      'cubic-feet',
                      'gallons',
                      ];

const isNumeric = n => !isNaN(n);

class ProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { inputNum: '',
                   inputUnit: unitOptions[0],
                   targetUnit: unitOptions[0],
                   studentResponse: '',
                   output: '',
                 };

    // TODO a better way to do this?
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleTargetUnitChange = this.handleTargetUnitChange.bind(this);
    this.handleStudentResponseChange = this.handleStudentResponseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNumChange(event) {
    this.setState({inputNum: event.target.value});
  }
  handleUnitChange(event) {
    this.setState({inputUnit: event.target.value});
  }
  handleTargetUnitChange(event) {
    this.setState({targetUnit: event.target.value});
  }
  handleStudentResponseChange(event) {
    this.setState({studentResponse: event.target.value});
  }

  // TODO move these things to src/helper/units.js
  isTemperature(inputUnit, targetUnit) {
      // the first four are temperature
      // the rest are volume

      // TODO have a separate array for temp only
      var temp = unitOptions.slice(0, 4);
      return ( temp.includes(inputUnit) &&
            temp.includes(targetUnit) );
  }

  isVolume(inputUnit, targetUnit) {
      var volume = unitOptions.slice(4);
      return ( volume.includes(inputUnit) &&
          volume.includes(targetUnit) );
  }

  isValidUnits(inputUnit, targetUnit) {
      // the first four are temperature
      // the rest are volume
      if(this.isTemperature(inputUnit, targetUnit)) {
        return true;
      }

      if(this.isVolume(inputUnit, targetUnit)) {
        return true;
      }

      return false;
    }

  isValidNums(inputNum, targetResponse) {
      return ((isNumeric(inputNum)) &&
             (isNumeric(targetResponse)));
    }

  unitConvert(inputNum, inputUnit, targetUnit) {
      if(this.isTemperature(inputUnit, targetUnit)) {
        return this.tempConvert(inputNum,
                                inputUnit,
                                targetUnit);
      }
      else if(this.isVolume(inputUnit, targetUnit)) {
        return this.volumeConvert(inputNum,
                                  inputUnit,
                                  targetUnit);
      }
      else {
        throw 'Invalid Units!';
      }
    }
  tempConvert(inputNum, inputUnit, targetUnit) {
      // convert to base unit
      // convert to target unit
      return 3;
    }
  volumeConvert(inputNum, inputUnit, targetUnit) {
      // convert to base unit
      // convert to target unit
      return 5;
    }

  handleSubmit(event) {
    event.preventDefault();
    
    if (!(this.isValidNums(this.state.inputNum,
                           this.state.studentResponse))) {
      alert("invalid numbers");
      return;
    }

    if (!(this.isValidUnits(this.state.inputUnit,
                            this.state.targetUnit))) {
      alert("invalid units");
      return;
    }

    var correctResponse = this.unitConvert(this.state.inputNum,
                                    this.state.inputUnit,
                                    this.state.targetUnit);

    alert(correctResponse);

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <table className="problemForm">
          <FormHeader/>
          <tr>
          <td>
          <input type="text"
                 value={this.state.inputNum}
                 onChange={this.handleNumChange}
                 placeholder="Input Numerical Value"/>
          </td>

          <td>
          <select value={this.state.inputUnit}
                  onChange={this.handleUnitChange}>
            {unitOptions.map((unitOption) => (
              <option value={`${unitOption}`}
                      key=  {`${unitOption}`}>
                {unitOption}
              </option>
              ))
            }
          </select>
          </td>

          <td>
          <select value={this.state.targetUnit}
                  onChange={this.handleTargetUnitChange}>
            {unitOptions.map((unitOption) => (
              <option value={`${unitOption}`}
                      key=  {`${unitOption}`}>
                {unitOption}
              </option>
              ))
            }
          </select>
          </td>

          <td>
          <input type="text"
                 value={this.state.studentResponse}
                 onChange={this.handleStudentResponseChange} />
          </td>

          </tr>
          </table>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ProblemForm;

