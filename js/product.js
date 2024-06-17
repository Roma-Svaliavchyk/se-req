import axios from 'axios';

console.log("axios conect");

console.log(localStorage.getItem("token"));

console.log(localStorage.getItem("email"));

if(localStorage.getItem("email") == "admin@gmail.com"){
  
}

//const axios = require('axios');

const container = document.querySelector("#js-list-products");
const getOrgersQuery = "https://solar-energy-serv.onrender.com/products";
  localStorage.getItem("email") === "admin@gmail.com"
    /* ? "http://localhost:3003/products"
    : "http://localhost:3003/products/" + localStorage.getItem("email");*/

axios
  .get(getOrgersQuery)
  .then((response) => {
    try {
      console.log("Отримана відповідь від сервера:");
      console.log(response.data); 

      const itemNew = response.data
        .map((itemProduct) => {
          return `  <li class="item-products">
          <div class="container-product">
              <img class="products-img" src="../img/product.png" alt="Іконка панелі">
              <div class="products-container-text">
                  <h3 class="products-title">${
                    itemProduct.name
                  }</h3>
                  <p class="products-price">${
                    itemProduct.price
                  }</p>
                  <p class="products-description">${
                    itemProduct.description
                  }</p>
              </div>
          </div>
      </li>`;
        })
        .join("");

      console.log(itemNew);
      console.log("priv");
      container.innerHTML = itemNew;       
      if(itemNew != "")
      {
        
      }
      else{
        const listClear = `<li class="item-order">
        <div class="main-container">
            <div class="title-container">
                <div class="title-grup">
                    <h3 class="title-order text-order" >У вас немаэ товарів!</h3>
                </div>            
            </div>         
        </div>
        </li>`;
       // container.innerHTML = listClear;
      }
    } catch (err) {
      console.log(err);
    }
  })
  .catch((error) => {
    console.error("Сталася помилка під час виконання запиту:", error);
  });
