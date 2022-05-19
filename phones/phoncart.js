let carts = document.querySelectorAll('.add-phoncart')

let products=[
    {
        name : 'Redmi Note 8 Pro',
        tag : 'sp1',
        price : 9500,
        inCart : 0
    },

    {
        name : 'OnePlus 8 Pro',
        tag : 'sp2',
        price : 49500,
        inCart : 0
    },

    {
        name : 'i Phone 11 Pro Max',
        tag : 'sp3',
        price : 112500,
        inCart : 0
    },

    {
        name : 'i Phone 12 Pro Max',
        tag : 'sp4',
        price : 95000,
        inCart : 0
    },

    {
        name : 'Samsung Note 20 Ultra',
        tag : 'sp5',
        price : 94000,
        inCart : 0
    },

    {
        name : 'Samsung S20 Ultra',
        tag : 'sp6',
        price : 85000,
        inCart : 0
    },

    {
        name : 'Huawei Mate 40 pro',
        tag : 'sp7',
        price : 95000,
        inCart : 0
    },

    {
        name : 'Google Pixel 5xl',
        tag : 'sp8',
        price : 9500,
        inCart : 0
    },

    {
        name : 'One Plus Nord',
        tag : 'sp9',
        price : 29500,
        inCart : 0
    },

    {
        name : 'i Phone 11',
        tag : 'sp10',
        price : 54000,
        inCart : 0
    },

    {
        name : 'ROG Phone 3',
        tag : 'sp11',
        price : 49500,
        inCart : 0
    },

    {
        name : 'One Plus 8T',
        tag : 'sp12',
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
    let productNumbers = localStorage.getItem('phoncartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('phoncartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('phoncartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('phoncartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('phonInCart');
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
 
    localStorage.setItem('phonInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('phontotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("phontotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('phontotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('phonInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('phontotalCost');
    
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
               <u><b>Smartphone's Total Cost</b></u>
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
    localStorage.removeItem('phonInCart');
    localStorage.removeItem('phontotalCost');
    localStorage.removeItem('phoncartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();