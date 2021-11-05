class Account {
  constructor(username) {
    this.username = username;
    this.balance = 0;
    this.transactions = [];
  }
  set balance(amount) {
    this._balance = amount;
  }
  get balance() {
    return this._balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date().toLocaleTimeString();
    this.account.balance += this.value;
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  isAllowed() {
    if (this.amount > this.account.balance)
      return false;
    return true;
  }
  get value() {
    return -1 * this.amount;
  }
}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }
  get value() {
    return this.amount;
  }
}

/*
Allow multiple accounts to be created
Each account can have many transactions
Allow withdrawals and deposits into accounts
Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
Allow us to retrieve the current balance of the account at any time
Don't allow withdrawals that exceed the remaining balance of the account
*/

// DRIVER CODE BELOW
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
const t3 = new Withdrawal(71.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
console.log('Transactions:', myAccount.transactions);

const myAccount2 = new Account('Adam');

console.log('Starting Account Balance: ', myAccount2.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t4 = new Withdrawal(1.00, myAccount2);
console.log('Commit result:', t4.commit());
console.log('Account Balance: ', myAccount2.balance);

console.log('Depositing should succeed...');
const t5 = new Deposit(9.99, myAccount2);
console.log('Commit result:', t5.commit());
console.log('Account Balance: ', myAccount2.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t6 = new Withdrawal(9.99, myAccount2);
console.log('Commit result:', t6.commit());

console.log('Ending Account Balance: ', myAccount2.balance);

console.log('Account Transaction History: ', myAccount2.transactions);
