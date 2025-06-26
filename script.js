document.querySelectorAll("input").forEach(input => {
  let inputYear;
  let inputDay;
  let inputMonth;
  input.addEventListener('input', () => {
    if(input.id == 'year' && (input.value < new Date())) {
      inputYear = input.value;
    } else if(input.id == "month") {
      inputMonth = input.value;
    } else {
      if(input.id == "day") {
        inputDay =  input.value;
      }
    }
  })

});

function subtractAge(year, month, age) {
  let dateString = [year, month, age].join('-');

  const birthDate = new Date(dateString);
  const currentDate = new Date();

  let year = currentDate.getFullYear() - birthDate.getFullYear();
  let month = currentDate.getMonth() - birthDate.getMonth();
  let day = currentDate.getDate() - birthDate.getDate();

  return {year, month, day}
}

subtractAge('2003', '02', "03");