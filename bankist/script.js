'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplaybalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${out} €`;

  const interset = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interset} €`;
};
const updateUI = function (acc) {
  displayMovements(acc.movements);
  // Display Balance
  calDisplaybalance(acc);

  // Display Summary
  calDisplaySummary(acc);
};
const createuserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createuserNames(accounts);
// user Login Process
let currenAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form for submitting
  e.preventDefault();
  currenAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currenAccount);

  if (currenAccount?.pin === Number(inputLoginPin.value)) {
    // Displya Ui and message

    labelWelcome.textContent = `Welcome back , ${
      currenAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //  for loosing focus
    inputLoginPin.blur();
    // Display Movement

    updateUI(currenAccount);
  }
});

// tansfer Money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currenAccount.balance >= amount &&
    receiverAcc?.username !== currenAccount.username
  ) {
    currenAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currenAccount);
  }
});
// loan Process

btnLoan.addEventListener('click', function (e) {
  e.preventDefault;
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currenAccount.movements.some(mov => mov >= amount * 1.0)) {
    currenAccount.movements.push(amount);

    updateUI(currenAccount);
  }
});
// close Account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currenAccount.username &&
    Number(inputClosePin.value) === currenAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currenAccount.username
    );
    console.log(index);
    // Delete Account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
// sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currenAccount.movements, !sorted);
  sorted = !sorted;
});
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const euroToUsd = 1.1;
// const movementUsd = movements.map(function(move)
// {
//   return move * euroToUsd;
// });

// const movementUSD = movements.map(move => move * euroToUsd);
// console.log(movementUSD);
// console.log(movements);

// const withdrawal = movements.filter((mov, i) => {
//   console.log(mov, i);
// });
// console.log(withdrawal);

// const total = movements.reduce((acc, mov, i, arr) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// const account = accounts.find(function (acc) {
//   return acc.owner === 'Jessica Davis';
// });
// console.log(account);

// sorting

// const owner = ['kajal', 'Mohit', 'Himanshu', 'Aakash', 'Bhalu'];
// console.log(owner.sort());
// console.log(owner);

// console.log(movements.sort());

// Number  for ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements);
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// console.log(movements);
let time = 11;
const timer = setTimeout(() => {
  const t = setInterval(() => {
    if (time === 1) {
      clearInterval(t);
    }
    time--;
    console.log(time);
  }, 1000);
}, 3000);
