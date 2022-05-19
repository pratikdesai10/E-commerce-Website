let carts = document.querySelectorAll('.add-gamcart')

let products=[
    {
        name : 'XBOX ONE X 1TB ',
        tag : 'gam1',
        price : 45000,
        inCart : 0
    },

    {
        name : 'Thrustmaster T80 Ferrari 488 GTB Edition',
        tag : 'gam2',
        price : 12000,
        inCart : 0
    },

    {
        name : 'Thrustmaster T-Flight Hotas 4',
        tag : 'gam3',
        price : 8900,
        inCart : 0
    },

    {
        name : 'Xbox Series S',
        tag : 'gam4',
        price : 34000,
        inCart : 0
    },

    {
        name : 'Sony Ps5 Digital Edition',
        tag : 'gam5',
        price :108000,
        inCart : 0
    },

    {
        name : 'Nintendo Switch',
        tag : 'gam6',
        price : 30000,
        inCart : 0
    },

    {
        name : 'Mitashi GameIn Infrazone NX TV Gaming Console',
        tag : 'gam7',
        price : 26000,
        inCart : 0
    },

    {
        name : 'Microsoft Xbox 360 Slim Console, 4 GB',
        tag : 'gam8',
        price : 45000,
        inCart : 0
    },

    {
        name : 'One Plus Nord',
        tag : 'gam9',
        price : 29500,
        inCart : 0
    },

    {
        name : 'i Phone 11',
        tag : 'gam10',
        price : 54000,
        inCart : 0
    },

    {
        name : 'ROG Phone 3',
        tag : 'gam11',
        price : 49500,
        inCart : 0
    },

    {
        name : 'One Plus 8T',
        tag : 'gam12',
        price : 37500,
        inCart : 0
    }

]
for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('gamcartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('gamcartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('gamcartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('gamcartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('gamInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }
 
    localStorage.setItem('gamInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('gamtotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("gamtotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('gamtotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('gamInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('gamtotalCost');
    
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
             <div class="product">
             <ion-icon name="close-circle-sharp"></ion-icon>
             <img src="../assets/${item.tag}.jpg"></img>
             <span>${item.name}</span>
             </div>   
             <div class="price">&#8377;${item.price}</div>
             <div class="quantity">
                 <span>${item.inCart}</span>
             </div>
            <div class="total">
            &#8377;${item.inCart * item.price}
            </div>
            `;
        });
    

    productContainer.innerHTML +=`
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
               <u><b>Tv And Monitor's Total Cost</b></u>
            </h4>
            <h4 class="basketTotal">
            &#8377;${cartCost}
            </h4>
            
    `;

    productContainer.innerHTML +=`
    <div class="basketTotalContainer">
        <h4>
            <button class="confirm" onclick="clearitm()" >Confirm Purchase</button>
        </h4>
    </div>
        
    `;
    

    }
} 

function clearitm(){
    console.log('hello world');
    localStorage.removeItem('gamInCart');
    localStorage.removeItem('gamtotalCost');
    localStorage.removeItem('gamcartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();