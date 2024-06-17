import axios from 'axios';
console.log("axios conect");

const form = document.querySelector('.form-acc-js');

const containerError = document.querySelector('#js-list-error');

form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault(); // Перешкоджаємо дефолтній поведінці форми

  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('pasvord');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('tel');

  const userData = {
      fullName: loginInput.value,
      password: passwordInput.value,
      email: emailInput.value,
      tel: phoneInput.value
  };

  axios
  .post("https://solar-energy-serv.onrender.com/auth/reg", userData)
  .then((response) => {
    try{
      console.log("Отримана відповідь від сервера:");
      console.log(response.data);

      localStorage.setItem("email", emailInput.value)
      localStorage.setItem("token", response.data.token)

      containerError.classList.remove('hiden');
      containerError.classList.add('list-error-tue');
      containerError.innerHTML =`<li class="error-message">Авторизація успішна!</li>`;

    }catch(err){
      console.log(err);
    }
  })
  .catch((error) => {
    console.error("Сталася помилка під час виконання запиту:", error);

    containerError.classList.remove('list-error-tue');    
    containerError.classList.remove('hiden');

    let errorMessages = '';
    if (error.response && error.response.data && Array.isArray(error.response.data)) {
        error.response.data.forEach((errorItem) => {
            errorMessages += `<li class="error-message">${errorItem.msg}</li>`;
        });
    }
    containerError.innerHTML = errorMessages;
  });

  /*
  document.getElementById('login').value = '';
  document.getElementById('pasvord').value = '';
  document.getElementById('email').value = '';
  document.getElementById('tel').value = '';*/
}
