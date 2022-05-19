let carts = document.querySelectorAll('.add-compcart')

let products=[
    {
        name : 'ASUS Vivo AiO V222FAK',
        tag : 'pc1',
        price : 58250,
        inCart : 0
    },

    {
        name : 'Lenovo IdeaCentre AIO',
        tag : 'pc2',
        price : 34000,
        inCart : 0
    },

    {
        name : 'CHIST Gaming Desktop',
        tag : 'pc3',
        price : 28500,
        inCart : 0
    },

    {
        name : 'Asus Vivo AiO V222GAK',
        tag : 'pc4',
        price : 31550,
        inCart : 0
    },

    {
        name : 'Gandiva Desktop Computer',
        tag : 'pc5',
        price : 20000,
        inCart : 0
    },

    {
        name : 'MSI 23.8" PRO 24X 10M-046US',
        tag : 'pc6',
        price : 38000,
        inCart : 0
    },

    {
        name : 'Asus Vivo V222FAK-BA041T',
        tag : 'pc7',
        price : 36000,
        inCart : 0
    },

    {
        name : 'ASUS 15.6 V161GA',
        tag : 'pc8',
        price : 44000,
        inCart : 0
    },

    {
        name : 'HP All-in-One PC 20-c406il',
        tag : 'pc9',
        price : 24000,
        inCart : 0
    },

    {
        name : 'CHIST Gaming Desktop',
        tag : 'pc10',
        price : 34000,
        inCart : 0
    },

    {
        name : 'HP AIO',
        tag : 'pc11',
        price : 49000,
        inCart : 0
    },

    {
        name : 'Lenovo IdeaCentre A540-24ICB',
        tag : 'pc12',
        price : 62000,
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
    let productNumbers = localStorage.getItem('compcartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('compcartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('compcartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('compcartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('compInCart');
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
 
    localStorage.setItem('compInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('comptotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("comptotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('comptotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('compInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('comptotalCost');
    
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
                <u><b>Computer's Total Cost</b></u>
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
    localStorage.removeItem('compInCart');
    localStorage.removeItem('comptotalCost');
    localStorage.removeItem('compcartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();