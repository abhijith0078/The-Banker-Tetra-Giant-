"use strict";

const accounts = [
  {
    fullName: "Abhijith Alakkadan",
    userName: "Abhijith",
    pin: 11111,
    movements: [100, -20, 2500, -500, 600, -650, -30, 200, 500, -1000],
    interest: 5.4,
  },
  {
    fullName: "Adarsh Koroth Veetil",
    userName: "Adarsh",
    pin: 22222,
    movements: [500, 600, -650, 200, 3500, -250, -320, -400, 300],
    interest: 4.5,
  },
  {
    fullName: "Vyshnav Periya Parambath",
    userName: "Vyshnav",
    pin: 33333,
    movements: [3500, -400, 300, -250, -320, 250, 340, 980, -750, -450, -200],
    interest: 6.4,
  },
  {
    fullName: "Nived Naadan",
    userName: "Nived",
    pin: 44444,
    movements: [
      5000, -250, -300, 520, 5820, -2000, -350, 2540, -950, -320, -400,
    ],
    interest: 3.8,
  },
];

const currentUser = accounts[2];

function AddTransactions(curUser) {
  const movements = curUser.movements;
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
AddTransactions(currentUser);
