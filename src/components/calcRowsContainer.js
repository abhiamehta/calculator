import React from "react";
import CalculatorRow from "./calculatorRow";

export default class Calculator extends React.Component {  
  render() {
    const { handleChange, calculatorRows } = this.props;
    return (
      <div>
        {this.calculatorRows.forEach(calcRow => {
          return <CalculatorRow rowValue={this.calcRow} handleChange={this.handleChange}/>;
        })}
      </div>
    );
  }
}
