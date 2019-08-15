import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            displayValue: "0",
            firstOperand: null,
            waitingForSecondOperand: false,
            operator: null,
            buttons: ["+", "-", "*", "/", 7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ".", "AC", "="]
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const target = event.target;

        if (target.name === "operator") {
            if (!(this.state.operator === null) && this.state.waitingForSecondOperand === true) { //if user enters two operators in a row, replace old operator
                this.setState({ operator: target.value });
                return;
            }

            const performCalculation = {
                '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

                '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

                '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

                '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

                '=': (firstOperand, secondOperand) => secondOperand
            };

            const inputValue = parseFloat(this.state.displayValue);

            if (this.state.firstOperand === null) {
                this.setState({
                    firstOperand: inputValue,
                    operator: target.value,
                    waitingForSecondOperand: true
                });
            } else if (!(this.state.operator === null)) { //run first operand x display value
                console.log(this.state.firstOperand);
                const result = performCalculation[this.state.operator](this.state.firstOperand, inputValue);

                this.setState({
                    displayValue: result,
                    firstOperand: result,
                    operator: target.value,
                    waitingForSecondOperand: true
                })
            }
            return;
        }
        if (target.name === "decimal") {
            if (this.state.waitingForSecondOperand === true) return;


            if (!this.state.displayValue.includes(".")) {
                this.setState((oldState) => {
                    return { displayValue: oldState.displayValue + "." }
                })
            }
            return;
        }

        if (target.name === "all-clear") {
            this.setState({
                displayValue: "0" ,
                firstOperand: null,
                waitingForSecondOperand: false,
                operator: null
            })
            return;
        }
        if (this.state.waitingForSecondOperand === true) {
            this.setState({
                displayValue: target.value,
                waitingForSecondOperand: false
            });
        } else {
            if (this.state.displayValue === "0") {
                this.setState({ displayValue: target.value });
            } else {
                this.setState((oldState) => {
                    return { displayValue: oldState.displayValue + target.value }
                })
            }
        }
    }

    render() {
        var buttonKeys = this.state.buttons.map((current, index) => {
            if (current === "+" || current === "-" || current === "*" || current === "/") {
                return <button name="operator" className="operator" value={current} onClick={this.handleClick} key={index} >{current}</button>
            } else if (current === ".") {
                return <button name="decimal" className="decimal" value={current} onClick={this.handleClick} key={index} >{current}</button>
            } else if (current === "AC") {
                return <button key={index} name="all-clear" className="all-clear" value="all-clear" onClick={this.handleClick}>{current}</button>
            } else if (current === "=") {
                return <button key={index} className="equal-sign operator" name="operator" value={current} onClick={this.handleClick}>{current}</button>
            } else {
                return <button key={index} onClick={this.handleClick} value={current} >{current}</button>
            }
        })
        return (
            <div className="App">
      <div className="calculator">

  <input type="text" className="calculator-screen" value={this.state.displayValue} disabled />
  
  <div className="calculator-keys">
    {buttonKeys}
  </div>
</div>
    </div>
        );
    }
}
export default App;