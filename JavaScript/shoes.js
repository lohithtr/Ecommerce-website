function filterProducts(){
    const input=document.getElementById("searchInput").ariaValueMax.toLowerCase();
    const cards=document.querySelectorAll(".card");

    cards.forEach(card=>{
        const productName = card.querySelector("h3").textContent.toLowerCase();
        const productDesc = card.querySelector("p").textContent.toLowerCase();

        if(productName.includes(input) || productDesc.includes(input)){
            card.style.display = "block";
        } else{
            card.style.display="none";
        }
    });
}