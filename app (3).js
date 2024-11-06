// Selectors 

const calendar = document.querySelector('#calendar');
const monthEl = document.querySelector('#monthName');
const previousMonth = document.querySelector('#previousMonth');
const nextMonth = document.querySelector('#nextMonth');
const eventSaver = document.getElementsByClassName("small");

let arrEventSaver = [...eventSaver];

console.log(eventSaver);
console.log(arrEventSaver);



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
    if (currentMonth === 0 ){
        currentMonth = 12;
        currentYear--;


    }
    updateCalendar(--currentMonth, currentYear);
   

});

nextMonth.addEventListener("click", ()=> {
    if (currentMonth === 11 ){
        currentMonth = -1;
        currentYear++;
    }

    updateCalendar(++currentMonth, currentYear);
   
});

calendar.addEventListener('click', addTask);





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
    todayDate.setDate(1);

    // вирахувати роки місяці і дати щоб відобрадались кореуктно

    const theFirstDayWeek = todayDate.getDay();
    const monthName = months[month];
    const monthYear = `${year} - ${monthName}`;
    monthEl.innerText = monthYear;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    console.log(daysInMonth)
    let dayCounter = 1;

    dayElements.forEach(day => {
        const dayNumber = day.querySelector('.day-number');
        dayNumber.innerText = "";
    });

    for (let i = theFirstDayWeek; dayCounter <= daysInMonth; i++) {
        const day = dayElements[i];
        const dayNumber = day.querySelector('.day-number');
        dayNumber.innerText = dayCounter;
        dayCounter++;
    }

}

function addTask(event) {
    console.log("added");

    const taskBox = document.createElement('div');
    
    const form = document.createElement('form');
    form.classList.add('form');

    let inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'title';
    inputName.placeholder = 'Title';

    let inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.name = 'description';
    inputDescription.placeholder = 'description';

    let buttonSubmit = document.createElement('input');
    buttonSubmit.type = 'submit';
    buttonSubmit.value = 'Add';

    form.appendChild(inputName);
    form.appendChild(inputDescription);
    form.appendChild(buttonSubmit);
    taskBox.appendChild(form);

    // arrEventSaver.appendChild(taskBox);
}

// Function calls 
creteCalendarElements();
updateCalendar(currentMonth, currentYear);

