let carts = document.querySelectorAll('.add-tvmcart')

let products=[
    {
        name : 'Mi TV 4A PRO',
        tag : 'tvm1',
        price : 13999,
        inCart : 0
    },

    {
        name : 'Mi TV 4X',
        tag : 'tvm2',
        price : 45000,
        inCart : 0
    },

    {
        name : 'OnePlus Y Series 108 cm',
        tag : 'tvm3',
        price : 24500,
        inCart : 0
    },

    {
        name : 'OnePlus Y Series 80 cm',
        tag : 'tvm4',
        price : 14999,
        inCart : 0
    },

    {
        name : 'Vu 164 cm (65 inches)',
        tag : 'tvm5',
        price : 64000,
        inCart : 0
    },

    {
        name : 'AKAI 108 cm (43 Inches)',
        tag : 'tvm6',
        price : 23000,
        inCart : 0
    },

    {
        name : 'HP 18.5 inch (46.9 cm)',
        tag : 'tvm7',
        price : 5172,
        inCart : 0
    },

    {
        name : 'Samsung 21.5 inch (54.6 cm)',
        tag : 'tvm8',
        price : 8399,
        inCart : 0
    },

    {
        name : 'Dell 21.5-inch (54.6 cm)',
        tag : 'tvm9',
        price : 29500,
        inCart : 0
    },

    {
        name : 'Dell 23.8 inch (60.47 cm) LED Backlit Computer Monitor',
        tag : 'tvm10',
        price : 7200,
        inCart : 0
    },

    {
        name : 'Zebronics 31.5 inch (80 cm)',
        tag : 'tvm11',
        price : 16000,
        inCart : 0
    },

    {
        name : 'LG 22 inch (55cm) IPS Monitor',
        tag : 'tvm12',
        price : 8000,
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
    let productNumbers = localStorage.getItem('tvmcartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('tvmcartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('tvmcartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('tvmcartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('tvmInCart');
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
 
    localStorage.setItem('tvmInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('tvmtotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("tvmtotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('tvmtotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('tvmInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('tvmtotalCost');
    
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
    localStorage.removeItem('tvmInCart');
    localStorage.removeItem('tvmtotalCost');
    localStorage.removeItem('tvmcartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();