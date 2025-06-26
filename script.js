function getInput() {
  const errors = document.querySelectorAll('.error');
  const inputs = document.querySelectorAll("input");
  const values = {};

  inputs.forEach(input => {
      input.addEventListener("input", () => {
        inputs.forEach(input => {
          input.style.border = "1px solid gray"
        })
      errors.forEach(error => {
        error.textContent = "";
        input.style.border = "1px solid gray"
      })
    })

      values[input.id] = input.value;
  });

  return values;
}

function displayDate(event) {
  event.preventDefault();
  const inputs = getInput();

  inputs.day = parseInt(inputs.day);
  inputs.month = parseInt(inputs.month);
  inputs.year = parseInt(inputs.year);
  let outputData;
  if(!validateDate(inputs)) {
    console.log(validateDate(inputs))
    return;
  }
  console.log(validateDate(inputs))

  outputData = calculateAndReturn(inputs);
  const spans = document.querySelectorAll("span");
  spans.forEach(span => {
    if(span.id == "span-year") {
      span.textContent = outputData.yearDiff;
    } else if(span.id == "span-month") {
      span.textContent = outputData.monthDiff;
    } else if(span.id == 'span-day') {
      span.textContent = outputData.dayDiff;
    }
  })

}

function calculateAndReturn(dateValues) {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();

  let {year, month, day} = dateValues;

  let yearDiff = currentYear - year;
  let monthDiff = currentMonth - month;
  let dayDiff = currentDay - day;
  console.log(yearDiff)

  if(monthDiff < 0) {
    monthDiff += 12
  }

  if(dayDiff < 0 && monthDiff !== 2) {
    dayDiff += 31;
  }

  return {yearDiff, monthDiff, dayDiff};
}

function validateDate(dateValues) {

  let input = document.querySelectorAll("input");

  let {year, month, day} = dateValues;
  if(!(year && month && day)) {
      input.forEach(input => {
      input.style.border = '1px solid red';
      input.nextElementSibling.textContent = "This field is requied";
    })
    return false;
  }
  let pastDates = [year, month, day].join("-");

  year = new Date(pastDates).getFullYear();
  month = new Date(pastDates).getMonth() + 1;
  day = new Date(pastDates).getDate()

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDay = new Date().getDate();

  if(year > currentYear) {
    input.forEach(input => {
      input.style.border = '1px solid red';
      document.querySelector(".year-error").textContent = 'must be a valid past'
    })
    return false
  }
  if(12 < month || month < 1) {
      input.forEach(input => {
      input.style.border = '1px solid red';
      document.querySelector(".year-error").textContent = 'must be a valid month'
      return false
    })
  }

  if(month == 1 && currentDay > 28) {
    return false
  }

  return true
}


document.querySelector("form").addEventListener("submit", displayDate);
