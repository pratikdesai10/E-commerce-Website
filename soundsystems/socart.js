let carts = document.querySelectorAll('.add-socart')

let products=[
    {
        name : 'boAt Bassheads 242',
        tag : 'so1',
        price :412,
        inCart : 0
    },

    {
        name : 'OnePlus Bullets',
        tag : 'so2',
        price :1999,
        inCart : 0
    },

    {
        name : 'boAt Rockerz 450',
        tag : 'so3',
        price : 1020,
        inCart : 0
    },

    {
        name : 'Sony WH-1000XM3',
        tag : 'so4',
        price :21990,
        inCart : 0
    },

    {
        name : 'Echo Dot (3rd Gen)',
        tag : 'so5',
        price :2499,
        inCart : 0
    },

    {
        name : 'All-new Echo Dot (4th Gen)',
        tag : 'so6',
        price :3499,
        inCart : 0
    },

    {
        name : 'boAt Stone 170',
        tag : 'so7',
        price : 1199,
        inCart : 0
    },

    {
        name : 'Philips in-SPA 5190B/94',
        tag : 'so8',
        price : 7040,
        inCart : 0
    },

    {
        name : 'JBL Cinema SB160 2.1',
        tag : 'so9',
        price : 17999,
        inCart : 0
    },

    {
        name : 'Apple AirPods Pro',
        tag : 'so10',
        price : 20999,
        inCart : 0
    },

    {
        name : 'boAt Airdopes 441',
        tag : 'so11',
        price : 1999,
        inCart : 0
    },

    {
        name : 'Cosmic Byte GS410',
        tag : 'so12',
        price : 1400,
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
    let productNumbers = localStorage.getItem('socartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('socartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('socartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('socartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('soInCart');
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
 
    localStorage.setItem('soInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('sototalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("sototalCost", cartCost + product.price);
    }else{
        localStorage.setItem('sototalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('soInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('sototalCost');
    
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
    localStorage.removeItem('soInCart');
    localStorage.removeItem('sototalCost');
    localStorage.removeItem('socartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();