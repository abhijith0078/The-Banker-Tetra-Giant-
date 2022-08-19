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

const accounts = [
  {
    fullName: "Abhijith Alakkadan",
    userName: "a",
    pin: 1,
    movements: [100, -20, 2500, -500, 600, -650, -30, 200, 500, -1000],
    interest: 5.4,
  },
  {
    fullName: "Adarsh Koroth Veetil",
    userName: "adarsh",
    pin: 22222,
    movements: [500, 600, -650, 200, 3500, -250, -320, -400, 300],
    interest: 4.5,
  },
  {
    fullName: "Vyshnav Periya Parambath",
    userName: "vyshnav",
    pin: 33333,
    movements: [3500, -400, 300, -250, -320, 250, 340, 980, -750, -450, -200],
    interest: 6.4,
  },
  {
    fullName: "Nived Naadan",
    userName: "nived",
    pin: 44444,
    movements: [
      5000, -250, -300, 520, 5820, -2000, -350, 2540, -950, -320, -400,
    ],
    interest: 3.8,
  },
];

let currentUser;

function AddTransactions(curUsr) {
  const movements = curUsr.movements;
  movements.forEach(function (element, index, arr) {
    const type = element > 0 ? "deposit" : "withdraw";
    const transactionList = `<li class="transaction">
   <div class="transaction--info">
    <span class="type">
       ${index + 1}.&nbsp;
       <span class="reason ${type}">
        ${type[0].toUpperCase() + type.slice(1)}
       </span>
    </span>
     <span class="transaction--date"></span>
    </div>
    <span class="amount"> &dollar;&nbsp;${Math.abs(element)}</span>
  </li>`;
    const transactionUlEl = document.querySelector(".transactions");
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

  balanceEl.textContent = sumArray(movements);
  inEl.textContent = sumArray(deposit);
  outEl.textContent = sumArray(withdraw);
  interestEl.textContent = curUsr.interest;
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
  console.log(currentUser);

  if (currentUser) {
    welcomeUserEl.textContent = currentUser.fullName.split(" ")[0];
    AddTransactions(currentUser);
    addBalances(currentUser);
    introEl.classList.remove("invisible");
    operationsEl.classList.remove("invisible");
    historyEl.classList.remove("invisible");
  }
  usernameEl.value = "";
  passwordEl.value = "";
  passwordEl.blur();
});
