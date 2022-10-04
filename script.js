"use strict";

const balanceEl = document.querySelector(".balance-amount");
const inEl = document.querySelector(".historyIn");
const outEl = document.querySelector(".historyOut");
const interestEl = document.querySelector(".interest");
const welcomeUserEl = document.querySelector(".welcome--user");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const loginBtnEl = document.getElementById("login--btn");
const introEl = document.querySelector(".intro");
const operationsEl = document.querySelector(".operations");
const historyEl = document.querySelector(".history");
const transferBtnEl = document.querySelector(".transfer-btn");
const transferUserEl = document.querySelector(".transfer-user");
const transferMoneyEl = document.querySelector(".transfer-money");
const terminateUserEl = document.querySelector(".terminate-user");
const terminatePinEl = document.querySelector(".terminate-pin");
const terminateBtnEl = document.querySelector(".terminate-btn");
const requestLoanEl = document.querySelector(".request__loan");
const requestAmountEl = document.querySelector(".request__amount");

const accounts = [
  {
    fullName: "Abhijith Alakkadan",
    userName: "a",
    pin: 1,
    movements: [100, -20, 2500, -500, 600, -650, -30, 200, 500, -1000],
    movementsDate: [
      "2022-09-02T11:27:57.879Z",
      "2022-09-04T11:27:57.879Z",
      "2022-09-18T11:27:57.879Z",
      "2022-09-25T11:27:57.879Z",
      "2022-09-28T11:27:57.879Z",
      "2022-09-29T11:27:57.879Z",
      "2022-09-30T11:27:57.879Z",
      "2022-10-01T11:27:57.879Z",
      "2022-10-02T11:27:57.879Z",
      "2022-10-04T11:27:57.879Z",
    ],
    locale: "en-GB",
    currency: "EUR",
    interest: 0.4,
  },
  {
    fullName: "Adarsh Koroth Veetil",
    userName: "adarsh",
    pin: 22222,
    movements: [500, 600, -650, 200, 3500, -250, -320, -400, 300],
    movementsDate: [
      "2022-09-04T11:27:57.879Z",
      "2022-09-18T11:27:57.879Z",
      "2022-09-25T11:27:57.879Z",
      "2022-09-28T11:27:57.879Z",
      "2022-09-29T11:27:57.879Z",
      "2022-09-30T11:27:57.879Z",
      "2022-09-01T11:27:57.879Z",
      "2022-10-02T11:27:57.879Z",
      "2022-10-04T11:27:57.879Z",
    ],
    locale: "de-LU",
    currency: "JPY",
    interest: 0.9,
  },
  {
    fullName: "Vyshnav Periya Parambath",
    userName: "vyshnav",
    pin: 33333,
    movements: [3500, -400, 300, -250, -320, 250, 340, 980, -750, -450, -200],
    movementsDate: [
      "2022-09-02T11:27:57.879Z",
      "2022-09-04T11:27:57.879Z",
      "2022-09-18T11:27:57.879Z",
      "2022-09-22T11:27:57.879Z",
      "2022-09-25T11:27:57.879Z",
      "2022-09-28T11:27:57.879Z",
      "2022-09-29T11:27:57.879Z",
      "2022-09-30T11:27:57.879Z",
      "2022-09-01T11:27:57.879Z",
      "2022-10-02T11:27:57.879Z",
      "2022-10-04T11:27:57.879Z",
    ],
    locale: "en-GB",
    currency: "EUR",
    interest: 1.8,
  },
  {
    fullName: "Nived Naadan",
    userName: "nived",
    pin: 44444,
    movements: [
      5000, -250, -300, 520, 5820, -2000, -350, 2540, -950, -320, -400,
    ],
    movementsDate: [
      "2022-09-02T11:27:57.879Z",
      "2022-09-04T11:27:57.879Z",
      "2022-09-08T11:27:57.879Z",
      "2022-09-20T11:27:57.879Z",
      "2022-09-25T11:27:57.879Z",
      "2022-09-28T11:27:57.879Z",
      "2022-09-29T11:27:57.879Z",
      "2022-09-30T11:27:57.879Z",
      "2022-09-01T11:27:57.879Z",
      "2022-10-02T11:27:57.879Z",
      "2022-10-04T11:27:57.879Z",
    ],
    locale: "en-GB",
    currency: "EUR",
    interest: 0.8,
  },
];

let currentUser;

const dateDiff = (day1, day2) =>
  Math.ceil(Math.abs(day1 - day2) / (24 * 60 * 60 * 1000));

const formatDate = function (isoSting, locale) {
  const transDate = new Date(isoSting);

  const days = dateDiff(new Date(), transDate);
  if (days == 1) return "Today";
  else if (days == 2) return "Yesterday";
  else if (days <= 7) return `${days} days ago`;
  else
    return Intl.DateTimeFormat(locale, {
      weekday: "short",
      month: "2-digit",
      year: "2-digit",
    }).format(transDate);
  console.log(days, transDate);
};

function AddTransactions(curUsr) {
  const transactionUlEl = document.querySelector(".transactions");
  transactionUlEl.innerHTML = "";
  curUsr.movements.forEach(function (element, index, arr) {
    console.log("for loop running", index, curUsr.userName);
    const type = element > 0 ? "deposit" : "withdraw";
    const transactionList = `<li class="transaction">
   <div class="transaction--info">
    <span class="type">
       ${index + 1}.&nbsp;
       <span class="reason ${type}">
        ${type[0].toUpperCase() + type.slice(1)}
       </span>
    </span>
    
     <span class="transaction--date" style="padding-left : 1.5rem;font-size:1rem">
     ${formatDate(curUsr.movementsDate[index], curUsr.locale)}</span>
    </div>
    <span class="amount"> &dollar;&nbsp;${Math.abs(element)}</span>
  </li>`;

    transactionUlEl.insertAdjacentHTML("afterbegin", transactionList);
  });
}

const sumArray = function (arr) {
  const balanceAmount = arr.reduce((acc, ele) => acc + ele, 0);
  return balanceAmount;
};

const addBalances = function (curUsr) {
  const movements = curUsr.movements;
  const deposit = movements.filter((ele) => ele > 0);
  const withdraw = movements.filter((ele) => ele < 0);

  curUsr.balance = sumArray(movements);
  balanceEl.textContent = curUsr.balance;
  inEl.textContent = sumArray(deposit);
  outEl.textContent = sumArray(withdraw);
  interestEl.textContent = curUsr.interest;
};

const changeUi = function () {
  AddTransactions(currentUser);
  addBalances(currentUser);
};

loginBtnEl.addEventListener("click", function (e) {
  introEl.classList.add("invisible");
  operationsEl.classList.add("invisible");
  historyEl.classList.add("invisible");
  e.preventDefault();

  const userName = usernameEl.value;
  const password = Number(passwordEl.value);

  currentUser = accounts.find(function (ele, i, arr) {
    return ele.userName === userName && ele.pin === password;
  });
  console.log("inside login ", currentUser);

  if (currentUser) {
    welcomeUserEl.textContent = currentUser.fullName.split(" ")[0];
    changeUi();
    introEl.classList.remove("invisible");
    operationsEl.classList.remove("invisible");
    historyEl.classList.remove("invisible");
  }
  usernameEl.value = "";
  passwordEl.value = "";
  usernameEl.blur();
  passwordEl.blur();
});

transferBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  const transferUser = transferUserEl.value.trim().toLowerCase();
  const transferMoney = Number(transferMoneyEl.value);
  const foundUser = accounts.find((ele) => transferUser === ele.userName);
  if (
    foundUser &&
    currentUser.userName !== transferUser &&
    transferMoney > 0 &&
    transferMoney <= currentUser.balance
  ) {
    const transDate = new Date();
    currentUser.movements.push(-transferMoney);
    currentUser.movementsDate.push(transDate.toISOString());
    foundUser.movements.push(transferMoney);
    foundUser.movementsDate.push(transDate.toISOString());
    changeUi();
  }
  transferUserEl.value = "";
  transferMoneyEl.value = "";
  transferUserEl.blur();
  transferMoneyEl.blur();
});

terminateBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  const terninateUser = terminateUserEl.value.trim().toLowerCase();
  const terminatePin = Number(terminatePinEl.value);
  const deleteUserIndex = accounts.findIndex(function (ele) {
    return ele.userName === terninateUser && ele.pin === terminatePin;
  });
  console.log(deleteUserIndex);
  if (
    deleteUserIndex >= 0 &&
    accounts[deleteUserIndex].userName === currentUser.userName
  ) {
    accounts.splice(deleteUserIndex, 1);
    loginBtnEl.click();
  }
  console.log(accounts);
});

requestLoanEl.addEventListener("click", function (e) {
  e.preventDefault();
  const requestAmount = +requestAmountEl.value;
  // console.log(typeof +requestAmountEl.value);
  if (
    requestAmount > 0 &&
    requestAmount <= currentUser.balance * (1 + currentUser.interest)
  ) {
    const transDate = new Date();
    currentUser.movements.push(requestAmount);
    currentUser.movementsDate.push(transDate.toISOString());
    changeUi();
  }
});

// let day = new Date();
// const locale = navigator.language;
// const options = { year: "2-digit", month: "short", day: "2-digit" };
// const time = new Intl.DateTimeFormat(locale, options).format(day);
// console.log(time, locale, day);
// let day1 = Date.now();

// let day2 = new Date();
// console.log(day1);
// console.log(day2.getTime());
// const dayPassed = (d1, d2) => (d1 - d2) / (24 * 60 * 60 * 1000);
// const diff = dayPassed(new Date(2022, 10, 5), new Date(2022, 10, 1));
// console.log(diff);

let day3 = new Date();
console.log(day3.toISOString());
