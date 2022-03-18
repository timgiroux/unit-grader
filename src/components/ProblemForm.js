import React, { Component } from 'react';
import './ProblemForm.css';
import FormHeader from './FormHeader.js';
import UnitOutput from './UnitOutput.js';
import { unitOptions,
         unitFuncs,
       } from '../helper/units.js';

const INVALID   = "invalid";
const CORRECT   = "correct";
const INCORRECT = "incorrect";

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
    this.setState({inputNum: event.target.value,
                   output: ''});
  }
  handleUnitChange(event) {
    this.setState({inputUnit: event.target.value,
                   output: ''});
  }
  handleTargetUnitChange(event) {
    this.setState({targetUnit: event.target.value,
                   output: ''});
  }
  handleStudentResponseChange(event) {
    this.setState({studentResponse: event.target.value,
                   output: ''});
  }

  /*
    Here is where we do evaluation
      using helper functions
    To determine how to alter the state
  */
  handleSubmit(event) {
    event.preventDefault();
    
    if(!(unitFuncs.isValidNums(this.state.inputNum,
                           this.state.studentResponse))) {
      this.setState({output: INVALID});
      return;
    }

    if(!(unitFuncs.isValidUnits(this.state.inputUnit,
                            this.state.targetUnit))) {
      this.setState({output: INVALID});
      return;
    }

    var correctResponse = unitFuncs.unitConvert(this.state.inputNum,
                                                this.state.inputUnit,
                                                this.state.targetUnit);

    // round string -> float
    // two decimal places
    var studentResponse;
    studentResponse = Number(parseFloat(this.state.studentResponse).toFixed(2));
    studentResponse = Math.round((studentResponse + Number.EPSILON) * 100) / 100;

    // round float -> float
    // two decimal places
    correctResponse = Number(correctResponse);
    correctResponse = Math.round((correctResponse + Number.EPSILON) * 100) / 100;

    console.log(correctResponse);

    if( Math.abs(studentResponse - correctResponse) < 0.001 ) {
      this.setState({output: CORRECT});
    }
    else {
      this.setState({output: INCORRECT});
    }

    return;
  }

  render() {
    // use HTML table for form styling
    return (
      <form onSubmit={this.handleSubmit}>
        <table className="problemForm">
          <FormHeader/>
          <tbody>
            <tr>
              <td>
                <input type="text"
                       value={this.state.inputNum}
                       onChange={this.handleNumChange} />
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

              <td>
                <UnitOutput msg={this.state.output}/>
              </td>

            </tr>
          </tbody>
        </table>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ProblemForm;

