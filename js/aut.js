import axios from 'axios';
console.log("axios conect");

const form = document.querySelector('.form-acc-js');
const containerError = document.querySelector('#js-list-error');


form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault(); // Перешкоджаємо дефолтній поведінці форми

  const passwordInput = document.getElementById('pasvord');
  const emailInput = document.getElementById('email');

  const userData = {
      password: passwordInput.value,
      email: emailInput.value,
  };

  axios
  .post("https://solar-energy-serv.onrender.com/auth/log", userData)
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
      console.log("error 1")
      console.log(err);
    }
  })
  .catch((error) => {
    
    
    console.error("Сталася помилка під час виконання запиту:", error);

    
    containerError.classList.remove('list-error-tue');    
    containerError.classList.remove('hiden');

    console.log("error.response.data.message")
    console.log(error.response.data.message)

    containerError.innerHTML = `<li class="error-message">${error.response.data.message}</li>`;;
  });

}


