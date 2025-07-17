let cart=JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
}

function updateQuantity(index,value){
    const qty=parseInt(value);
    if(qty>=1){
        cart[index].quantity=qty;
        saveCart();
    }
}

function clearCart(){
    if(confirm("Are you sure you want to clear the cart?")){
        cart=[];
        saveCart();
    }
}

function renderCart(){
    const container=document.getElementById('cart-items');
    const totalBox=document.getElementById('cart-total');
    container.innerHTML=' ';

    if(cart.length===0){
        container.innerHTML="<p>Your cart is empty.</p>"
        totalBox.innerHTML='';
        return;
    }

    let total=0;

    cart.forEach((item,index)=>{
        if(!item.quantity) item.quantity=1;
        if(!item.price) item.price=100;
        
        const subtotal=item.quantity*item.price;
        total += subtotal;
        
        const div=document.createElement('div');
        div.className='cart-item';
        div.innerHTML=`
        <div>,<strong>${item.title}</strong><br><small>${item.description}</small></div>
        <div>
            Qty: <input type="number" min="1" value="${item.quantity}"
            onchange="updateQuantity(${index}, this.value)">
        </div>
        <div>Price: ₹${item.price} <br>Subtotal: ₹${subtotal}</div>
        <div><button class`
    })
}
