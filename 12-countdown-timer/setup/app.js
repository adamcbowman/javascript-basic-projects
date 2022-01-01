const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let deadlineDate = new Date(2021, 11, 31, 20, 00, 00);
//let deadlineDate = new Date();

const year = deadlineDate.getFullYear();
const hours = format(deadlineDate.getHours());
const mins = format(deadlineDate.getMinutes());
const month = months[deadlineDate.getMonth()];
const day = weekdays[deadlineDate.getDay()];
const date = format(deadlineDate.getDate());


giveaway.textContent = `giveaway ends on ${day}, ${month} ${date} ${year} @ ${hours}:${mins} AST`

const futureTime = deadlineDate.getTime();

function getRemainingTime() {
  const time = new Date().getTime();
  const remaining = futureTime - time
  
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMin = 60*1000;
  const oneSec = 1000;

  let days = Math.floor(remaining/oneDay);
  let hours = Math.floor(remaining%oneDay/oneHour);
  let mins = Math.floor(remaining%oneHour/oneMin)
  let secs = Math.floor(remaining%oneMin/oneSec)
  
  //set values array
  const values = [days, hours, mins, secs]
  

  items.forEach( (item, index) => {
    item.innerHTML = format(values[index]);
  });
  if(remaining < 0) {
    clearInterval(countDown);
    deadline.innerHTML = `
    <h4 class='expired'>Sorry, giveaway has expired</h4>
    `
  }
}

function format(item) {
  if(item < 10) {
    return item = `0${item}`
  } else {
    return item;
  }
}

let countDown = setInterval(getRemainingTime, 1000); 
getRemainingTime();