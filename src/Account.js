import React, { Component } from 'react';

const withdraw = (a, b) => a - b; 
const deposit =  (a, b) => a + b;

export default class Account extends Component {
  state = {
    balance: 0,
    message: '',
  }

  handleClick = (action) => (e) => {
    e.preventDefault();
    const amount = +this.refs.amount.value;
    let message = '';
    let balance = this.state.balance;
    if (isNaN(amount) || amount < 0) {
      message = 'Enter a valid number';
    } else {
      const newBalance = action(balance, amount);
      if (newBalance < 0) {
        message = 'You Poor!';
      } else {
        balance = newBalance;
      }
    }

    this.refs.amount.value = '';
    return this.setState({
      balance,
      message,
    })
  }

  render() {
    let balanceClass = 'balance';
    if (this.state.balance === 0) {
      balanceClass += ' zero';
    }

    return (
      <div className="account">
        <h2>{this.props.name}</h2>
        <p>{this.state.message}</p>
        <div className={balanceClass}>${this.state.balance}</div>
        <input type="text" placeholder="enter an amount" ref="amount" />
        <input type="button" value="Deposit" onClick={this.handleClick(deposit)} />
        <input type="button" value="Withdraw" onClick={this.handleClick(withdraw)} />
      </div>
    )
  }
}
