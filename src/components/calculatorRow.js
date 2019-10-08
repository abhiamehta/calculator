import React from "react";
import { OPERATION_TYPES } from "../constants/operationTypes.constant";
import { debounce } from "lodash";

export default class CalculatorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currRow: props.currentState };
    this.valueDebouncedUpdate = debounce(this.handleValueChange, 1000);
  }
  render() {
    return (
      <div>
        <select
          style={{ padding: 1 }}
          id={"select" + this.state.currRow.id}
          onChange={this.handleValueChange.bind(this)}
          disabled={this.state.currRow.isDisabled}
        >
          <option value={OPERATION_TYPES.ADD}>+</option>
          <option value={OPERATION_TYPES.SUBSTRACT}>-</option>
        </select>
        <input
          id={this.state.currRow.id}
          onChange={this.valueDebouncedUpdate.bind(this)}
          disabled={this.state.currRow.isDisabled}
        ></input>
        <button onClick={this.disableRow.bind(this)}>
          {this.state.currRow.isDisabled ? "Enable" : "Disable"}
        </button>
        <button onClick={this.deleteRow.bind(this)}>Delete</button>
      </div>
    );
  }
  handleValueChange = e => {
    debugger;
    const { currentState, handleValueChange } = this.props;
    const txtVal = document.getElementById(this.state.currRow.id).value;
    const currSelectId = "select" + this.state.currRow.id;
    const operatorVal = document.getElementById(currSelectId).value;
    currentState.value = parseInt(txtVal);
    currentState.operationType = operatorVal;
    this.setState(() => ({
      currRow: currentState
    }));
    handleValueChange(currentState);
  };
  deleteRow = () => {
    const { deleteRow } = this.props;
    deleteRow(this.state.currRow);
  };
  disableRow = () => {
    let currState = this.state.currRow;
    currState.isDisabled = !currState.isDisabled;
    this.setState({ currRow: currState });
  };
}
