export const deliveryoption=[{
  Id:'1',
  deliveryDays:7,
  priceCents:'free'
},
{
  Id:'2',
  deliveryDays:3,
  priceCents:'free'
},
{
  Id:'3',
  deliveryDays:1,
  priceCents:'free'
}];

export function getDeliveryOption(optionId){
  let deliveryOption;

  deliveryoption.forEach((delivery)=>{
  
    if(delivery.Id===optionId){
    
      deliveryOption=delivery;
    }
  });
  return deliveryOption||deliveryoption[0];
}