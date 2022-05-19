let carts = document.querySelectorAll('.add-tabcart')

let products=[
    {
        name : 'Lenovo Tab M8 (2nd Gen) HD',
        tag : 'tab1',
        price : 10999,
        inCart : 0
    },

    {
        name : 'Samsung Galaxy Tab S5E',
        tag : 'tab2',
        price : 42798,
        inCart : 0
    },

    {
        name : 'iPad (7th Gen)',
        tag : 'tab3',
        price : 27200,
        inCart : 0
    },

    {
        name : 'Honor Pad 5',
        tag : 'tab4',
        price : 95000,
        inCart : 0
    },

    {
        name : 'Samsung Note 20 Ultra',
        tag : 'tab5',
        price : 94000,
        inCart : 0
    },

    {
        name : 'Samsung Galaxy Tab S6 Lite',
        tag : 'tab6',
        price : 31999,
        inCart : 0
    },

    {
        name : 'Huawei Mate 40 pro',
        tag : 'tab7',
        price : 95000,
        inCart : 0
    },

    {
        name : 'Apple iPad Pro 2020',
        tag : 'tab8',
        price : 71900,
        inCart : 0
    },

    {
        name : 'One Plus Nord',
        tag : 'tab9',
        price : 29500,
        inCart : 0
    },

    {
        name : 'Samsung Galaxy Tab S7+',
        tag : 'tab10',
        price : 79999,
        inCart : 0
    },

    {
        name : 'ROG Phone 3',
        tag : 'tab11',
        price : 49500,
        inCart : 0
    },

    {
        name : 'One Plus 8T',
        tag : 'tab12',
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
    let productNumbers = localStorage.getItem('tabcartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('tabcartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('tabcartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('tabcartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('tabInCart');
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
 
    localStorage.setItem('tabInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('tabtotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("tabtotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('tabtotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('tabInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('tabtotalCost');
    
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
             <div class="product">
             <img src="../assets/${item.tag}.jpg"></img>
             <span><b>${item.name}</b></span>
             </div>   
             <div class="price">&#8377;${item.price}</div>
             <div class="quantity">
                 <span>${item.inCart}</span>
             </div>
            <div class="total">
            <b>&#8377;${item.inCart * item.price}</b>
            </div>
            `;
        });
     

    productContainer.innerHTML +=`
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                <u><b>Tablet's Total Cost</b></u>
            </h4>
            <h4 class="basketTotal">
            &#8377;${cartCost}
            </h4>
        </div>
            
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
    localStorage.removeItem('tabInCart');
    localStorage.removeItem('tabtotalCost');
    localStorage.removeItem('tabcartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();