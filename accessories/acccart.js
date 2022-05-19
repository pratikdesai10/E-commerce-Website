let carts = document.querySelectorAll('.add-acccart')

let products=[
    {
        name : Mouse',
        tag : 'ac1''Zebronics Gaming ,
        price : 485,
        inCart : 0
    },

    {
        name : 'Docooler F-35 Mouse Wireless',
        tag : 'ac2',
        price : 1789,
        inCart : 0
    },

    {
        name : 'Dell Combo KB216+MS116',
        tag : 'ac3',
        price : 1020,
        inCart : 0
    },

    {
        name : 'Hi-Lite Microphone',
        tag : 'ac4',
        price : 499,
        inCart : 0
    },

    {
        name : 'Belkin Universal Socket',
        tag : 'ac5',
        price : 1299,
        inCart : 0
    },

    {
        name : 'Maono Microphone Kit',
        tag : 'ac6',
        price : 2549,
        inCart : 0
    },

    {
        name : 'Quantum Web Camera',
        tag : 'ac7',
        price : 799,
        inCart : 0
    },

    {
        name : 'Artis UPS',
        tag : 'ac8',
        price : 1899,
        inCart : 0
    },

    {
        name : 'Redgear Wired Gamepad Plug',
        tag : 'ac9',
        price : 1099,
        inCart : 0
    },

    {
        name : 'ZEBRONICS Gaming Keyboard Mouse combo',
        tag : 'ac10',
        price : 1599,
        inCart : 0
    },

    {
        name : 'Redgear Gaming Mousepad',
        tag : 'ac11',
        price : 279,
        inCart : 0
    },

    {
        name : 'AmazonBasics Multi Headphone Splitter',
        tag : 'ac12',
        price : 379,
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
    let productNumbers = localStorage.getItem('acccartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('acccartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){

        localStorage.setItem('acccartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else{
        localStorage.setItem('acccartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
  
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('accInCart');
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
 
    localStorage.setItem('accInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('acctotalCost');
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("acctotalCost", cartCost + product.price);
    }else{
        localStorage.setItem('acctotalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('accInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('acctotalCost');
    
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
                <u><b>Accessories Total Cost</b></u>
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
    localStorage.removeItem('accInCart');
    localStorage.removeItem('acctotalCost');
    localStorage.removeItem('acccartNumbers');
    location.href="../payment.html";
}

onLoadCartNumbers();
displayCart();