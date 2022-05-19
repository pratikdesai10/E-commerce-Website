let carts = document.querySelectorAll('.add-lapcart')

let products=[
    {
        name : 'HP Envy 13-ba0011TX',
        tag : 'lp1',
        price : 86000,
        inCart : 0
    },

    {
        name : 'HP Pavilion Gaming DK0268TX',
        tag : 'lp2',
        price : 64500,
        inCart : 0
    },

    {
        name : 'Mi Notebook 14 Horizon',
        tag : 'lp3',
        price : 55000,
        inCart : 0
    },

    {
        name : 'HP 15s gr0008au',
        tag : 'lp4',
        price : 37500,
        inCart : 0
    },

    {
        name : 'Mi Notebook 14 Silver',
        tag : 'lp5',
        price :  49999,
        inCart : 0
    },

    {
        name : 'Lenovo ThinkPad E14',
        tag : 'lp6',
        price :  61990,
        inCart : 0
    },

    {
        name : 'Microsoft Surface Laptop 3',
        tag : 'lp7',
        price : 92000,
        inCart : 0
    },

    {
        name : 'Lenovo Ideapad S145',
        tag : 'lp8',
        price : 44990,
        inCart : 0
    },

    {
        name : 'Dell Inspiron 3593',
        tag : 'lp9',
        price :  38600,
        inCart : 0
    },

    {
        name : 'HP Spectre x360',
        tag : 'lp10',
        price : 202233,
        inCart : 0
    },

    {
        name : 'Apple Macbook Air',
        tag : 'lp11',
        price : 88000,
        inCart : 0
    },

    {
        name : 'ASUS ZenBook Pro Duo',
        tag : 'lp12',
        price : 272990,
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
    let productNumbers = localStorage.getItem('lapcartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('lapcartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('lapcartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('lapcartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('lapInCart');
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
 
    localStorage.setItem('lapInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('laptotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("laptotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('laptotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('lapInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('laptotalCost');
    
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
             <div class="product">
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
                Basket total
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
    localStorage.removeItem('lapInCart');
    localStorage.removeItem('laptotalCost');
    localStorage.removeItem('lapcartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();