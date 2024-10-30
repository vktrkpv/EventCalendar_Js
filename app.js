// Selectors 

const calendar = document.querySelector('#calendar');
const monthEl = document.querySelector('#monthName');
const previousMonth = document.querySelector('#previousMonth');
const nextMonth = document.querySelector('#nextMonth');

// Arrays

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
    "December"
];

const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// Event Listenrs 

previousMonth.addEventListener("click", ()=> {
    updateCalendar(--currentMonth, currentYear);


});

nextMonth.addEventListener("click", ()=> {
    updateCalendar(++currentMonth, currentYear);

});


const today = new Date();
// let currentDay = today.getDate()
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

console.log(today);

// Functions 

function creteCalendarElements () {
    for(let i = 0; i < 35; i++ ){
        // створити діви з елементами назви тижня в середині 
        const day = document.createElement('div');
        day.classList.add('day');
        

        const dayText = document.createElement('p');
        dayText.classList.add('day-text');
        dayText.innerText = days[i % 7 ];


        const dayNumber = document.createElement('p');
        dayNumber.classList.add('day-number');

        const eventName = document.createElement('p');
        eventName.classList.add('small');

        // прикріпити дітей 

        day.appendChild(dayText);
        day.appendChild(dayNumber);
        day.appendChild(eventName);

        // console.log(day);

        calendar.appendChild(day);

    }
}

function updateCalendar (month, year, events) {
    // отримати доступ до ново створених елементів 
    const dayElements = document.querySelectorAll('.day');

    // встановити поточну дату 

    const todayDate = new Date();
    todayDate.setMonth(month);
    todayDate.setFullYear(year);


    // вирахувати роки місяці і дати щоб відобрадались кореуктно

    const theFirstDayWeek = todayDate.getDay();
    const monthName = months[month];
    const monthYear = `${year} - ${monthName}`;
    monthEl.innerText = monthYear;
    const daysInMonth = new Date (year, month + 1, 0).getDate();

    console.log(daysInMonth)
    let dayCounter = 1;



      for (let i = 0; i < dayElements.length; i++ ) {
        const day = dayElements[dayCounter +1];

        const dayNumber = day.querySelector('.day-number');
        if( i >= theFirstDayWeek && dayCounter <= daysInMonth){
            dayNumber.innerText = dayCounter;
            dayCounter++;
        }
        else{
            dayNumber.innerText = "";
         }
      }

}

// Function calls 
creteCalendarElements();
updateCalendar(currentMonth, currentYear);

