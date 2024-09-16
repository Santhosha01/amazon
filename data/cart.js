export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
cart=[
 { productName:"Via-Mazzini",
   quatity:1,
   deliveryoptionId:'1'
 },{ productName:"Clara",
  quatity:2,
  deliveryoptionId:'2'
}
];
}

function savetoStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addItem(productName){
  let matchingItem;
  cart.forEach((pro)=>{
    if(pro.productName===productName){
      matchingItem=pro;
    }  
  })
  if(matchingItem){
    matchingItem.quatity++;
  }
else{
  cart.push({
    productName:productName,
    quatity:1,
    deliveryoptionId:'1'
  })
}
savetoStorage();
}

export function deletecartitem(deleteproductName){
  let newcarts=[];
  let product='';
  cart.forEach((pro)=>{
    if(pro.quatity>=2&&pro.productName===deleteproductName){
      product=pro;
      pro.quatity--;
      newcarts.push(pro);
    } 
    else if(pro.quatity==1&&pro.productName===deleteproductName){
      pro.quatity--;
      product=pro;
    }
    else if(pro.productName!==deleteproductName){
      newcarts.push(pro);
    } 
  })
  cart=newcarts;
  savetoStorage();
  return product;
}


export function updateDeliveryOption(productName,deliveryId){
  let matchingItem;
  cart.forEach((pro)=>{
    if(pro.productName===productName){
      matchingItem=pro;
    }  
  })
  matchingItem.deliveryoptionId=deliveryId;
  savetoStorage();
}