import {cart,deletecartitem,updateDeliveryOption} from '../../data/cart.js'
import {products,getProduct} from '../../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoption,getDeliveryOption} from '../../data/deliveryoptiondate.js'
import { renderPaymentSummary } from './paymentSummary.js';

export function renderSummary(){
let cartsummary='';
cart.forEach((items)=>{

  let productName=items.productName;

  const Matchingproduct=getProduct(productName); 
   
  
  const deliveryId=items.deliveryoptionId;

  const deliveryOption=getDeliveryOption(deliveryId);
  
  const today=dayjs();
  const deliveryDate=today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString =deliveryDate.format('dddd,MMMM,D');



  cartsummary+= `
   <div class="cart-item-container js-cart-item-container-${Matchingproduct.name}">
            <div class="delivery-date">
              Delivery date: 
              ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${Matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${Matchingproduct.name}
                </div>
                <div class="product-price">
                ${Matchingproduct.priceCents}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${items.quatity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete"  data-product-name="${Matchingproduct.name}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(Matchingproduct,items)}
              </div>
            </div>
          </div>
  `
})
document.querySelector('.order-summary').innerHTML=cartsummary;

function deliveryOptionHTML(Matchingproduct,items){
  let html='';
   deliveryoption.forEach((deliveryOption)=>{
   
     const today=dayjs();
    const deliveryDate=today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString =deliveryDate.format('dddd,MMMM,D');

  const isChecked=deliveryOption.Id===items.deliveryoptionId;

    html+=`<div class="delivery-option js-delivery-option" data-product-name="${Matchingproduct.name}"
    data-delivery-option-id="${deliveryOption.Id}">
                  <input type="radio"
                  ${isChecked?'checked':''}
                    class="delivery-option-input"
                    name="${Matchingproduct.name}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                       Free Shipping
                    </div>
                  </div>
                </div>`
   });
   return html;
}




document.querySelectorAll('.js-delete').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productName=link.dataset.productName;
      let product=deletecartitem(productName);
      const container=document.querySelector(`.js-cart-item-container-${productName}`);
      if(product.quatity===0){
      container.remove();
      }
      renderPaymentSummary();
    })
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productName,deliveryOptionId}=element.dataset;
    updateDeliveryOption(productName,deliveryOptionId);
    renderSummary();
    renderPaymentSummary();
  });
});

}

renderSummary();


