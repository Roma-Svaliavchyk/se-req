import axios from 'axios';

axios.get('https://solar-energy-serv.onrender.com')
  .then(response => {
    console.log('Отримана відповідь від сервера:');
    console.log(response.data); // Вивести отримані дані у консоль
  })
  .catch(error => {
    console.error('Сталася помилка під час виконання запиту:', error);
  });
