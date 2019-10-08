import React from "react";
import { OPERATION_TYPES } from "../constants/operationTypes.constant";
import { throttle } from "throttle-debounce";

export default class CalculatorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currRow: null};
    this.valueThrottledUpdate = throttle(1000, this.handleValueChange);
  }
  render() {
    const { currentState } = this.props;
    return (
      <div className="row-container">
        <select
          id={"select" + currentState.id}
          onChange={this.handleValueChange.bind(this)}
        >
          <option value={OPERATION_TYPES.ADD}>+</option>
          <option value={OPERATION_TYPES.SUBSTRACT}>-</option>
        </select>
        <input
          id={currentState.id}
          onChange={this.valueThrottledUpdate.bind(this)}
        ></input>
        <button onClick={this.disableRow.bind(this)}>Disable</button>
        <button onClick={this.deleteRow.bind(this)}>Delete</button>
      </div>
    );
  }
  handleValueChange = e => {
    const { currentState, handleValueChange } = this.props;
    const txtVal = document.getElementById(currentState.id).value;
    const currSelectId = "select" + currentState.id;
    const operatorVal = document.getElementById(currSelectId).value;
    currentState.value = parseInt(txtVal);
    currentState.operationType = operatorVal;
    handleValueChange(currentState);
  };
  deleteRow = () => {
    const { deleteRow } = this.props;
    deleteRow();
    debugger;
  };
  disableRow = () => {
    debugger;
  };
}
