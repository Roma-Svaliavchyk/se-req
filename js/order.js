import axios from 'axios';
console.log("axios conect");

const getUser = async (userId) => { 
  try {
      
      const response = await axios.get(`https://solar-energy-serv.onrender.com/luser`);
      const user = response.data;
      console.log(response.data);

      // Запис даних користувача в змінні
      const userEmail = user.email;
      const userToken = user.token;

      localStorage.setItem("token", user.token);
      localStorage.setItem("email", user.email);

      console.log('Email:', userEmail);
      console.log('Token:', userToken);
  } catch (error) {
      console.error('Error fetching user:', error);
  }
};

getUser();




console.log(localStorage.getItem("token"));

const form = document.querySelector('.form-acc-js');

form.addEventListener('submit', handleSubmit)

const container = document.querySelector('#js-list-error');

function handleSubmit(event) {
  event.preventDefault(); // Перешкоджаємо дефолтній поведінці форми

  const fullName = document.getElementById('fullName');
  const communication = document.getElementById('communication');
  const description = document.getElementById('description');

  const orderrData = {
        fullName: fullName.value,
        communication: communication.value,
        description: description.value,
  };

  console.log(orderrData);

  axios
  .post("https://solar-energy-serv.onrender.com/order", orderrData,{
    headers: {
      Authorization: "Bearer " +  localStorage.getItem("token")// Ваш токен тут
    }
  })
  .then((response) => {
    try{
        
      container.classList.remove('hiden');
      container.classList.add('list-error-tue');
      container.innerHTML =`<li class="item-error">Замовлення відправлено!</li>
      <li class="item-error">Через деякий час з вами звяжуться наші співробітники.</li>`;

      console.log("Отримана відповідь від сервера:");
      console.log(response.data);

      const itemNew = response.data.map((message) => {
        return `<li class="item-error" >
        ${message}                                         
        </li>`;
      }).join('');

      console.log(itemNew);

      container.innerHTML = itemNew;


    }catch(err){
      console.log(err);
    }
  })
  .catch((error) => {
    container.classList.remove('list-error-tue');    
    container.classList.remove('hiden');

    console.error("Сталася помилка під час виконання запиту:", error);
    
    console.error(error.response.data.message);
    
    let errorMessage = `<li class="item-error">${error.response.data.message}</li>`;

    container.innerHTML = errorMessage;

    console.log(errorMessage);


  });

}


