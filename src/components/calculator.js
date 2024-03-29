import React from "react";
import CalculatorRow from "./calculatorRow";
import { OPERATION_TYPES } from "../constants/operationTypes.constant";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { calcRows: [], processedValue: 0 };
  }
  render() {
    return (
      <div className="calculator-container">
        <div>
          <button onClick={this.addRow}>Add Row</button>
        </div>
        <div>
          {this.state.calcRows && this.state.calcRows.length > 0
            ? this.state.calcRows.map(calcRow => {
                return (
                  <CalculatorRow
                    key={calcRow.id}
                    currentState={calcRow}
                    handleValueChange={this.updateRowValue.bind(this)}
                    deleteRow={this.deleteRow.bind(this)}
                  />
                );
              })
            : "Please Add A Row for calculation"}
        </div>
        <div>Total : {this.state.processedValue}</div>
      </div>
    );
  }
  addRow = () => {
    let currId = this.state.calcRows.length;
    let row = {
      id: currId++,
      operationType: OPERATION_TYPES.ADD,
      isDisabled: false,
      value: 0
    };
    this.setState(prevState => ({
      calcRows: prevState.calcRows.concat([row])
    }));
  };
  updateRowValue = value => {
    if (value.value) {
      let currVal = this.state.processedValue;
      if (value.operationType === OPERATION_TYPES.ADD) {
        currVal = currVal + value.value;
      } else if (value.operationType === OPERATION_TYPES.SUBSTRACT) {
        currVal = currVal - value.value;
      }
      this.setState({ processedValue: currVal });
    }
  };
  deleteRow = value => {
    let updatedSum = 0;
    let updatedValues = this.state.calcRows.filter(row => {
      return row.id !== value.id;
    });
    if (updatedValues && updatedValues.length > 1) {
      updatedSum = updatedValues.reduce((total, updatedRow) => {
        const tot = total || total.value;
        return tot + updatedRow.value;
      });
    } else {
      updatedSum = updatedValues.length !== 0 ? updatedValues[0].value : 0;
    }
    this.setState({ calcRows: updatedValues });
    this.setState({ processedValue: updatedSum });
  };
}
