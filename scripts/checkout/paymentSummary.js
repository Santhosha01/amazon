import {cart} from '../../data/cart.js'
import {products,getProduct} from '../../data/products.js'
import {getDeliveryOption} from '../../data/deliveryoptiondate.js'


export function renderPaymentSummary(){
 let cartcount=0;
 let productCents=0;
 let shippingCents=0;
  cart.forEach((element) => {
    const product=getProduct(element.productName);
    // productPrice=product.priceCents*element.quatity;  
    cartcount++;
    const deliveryoption=getDeliveryOption(element.deliveryoptionId);
  });
  const totalcents=(productCents+shippingCents)+((productCents+shippingCents)*0.1);


  const paymentHTML=`
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartcount}):</div>
            <div class="payment-summary-money">Free</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">Free</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Free</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;


  document.querySelector('.payment-summary').innerHTML=paymentHTML;
}