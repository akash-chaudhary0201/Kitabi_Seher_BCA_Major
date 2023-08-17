// Typing Text

let text = document.querySelector(".sec-text")

        let  textlaod = () => {
            setTimeout(() => {
                text.innerHTML = "&nbsp;Timeless Tales"
            }, 0);
            setTimeout(() => {
                text.innerHTML = "&nbsp;Pre-Loved Books"
            }, 4000);
            setTimeout(() => {
                text.innerHTML = "&nbsp;Second-Hand Books"
            }, 8000);
        }
        window.onload = function(){
          textlaod()
          setInterval(textlaod, 12000)
        }


// accordion menu
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    if (item.classList.contains("active")) {

      item.classList.remove("active");
      content.style.display = "none";
    } else {

      accordionItems.forEach((otherItem) => {
        const otherContent = otherItem.querySelector(".accordion-content");
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherContent.style.display = "none";
        }
      });


      item.classList.add("active");
      content.style.display = "block";
    }
  });
});

console.log("Hello Akash");
 

// Books Searching :- 

document.addEventListener('DOMContentLoaded', function () {
  const bookRows = document.querySelectorAll('.books-info .books-info-row-1, .books-info .books-info-row-2');

  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  function filterBooks() {
      const searchTerm = searchInput.value.toLowerCase();
      bookRows.forEach(row => {
          let hasVisibleBooks = false;
          const bookContents = row.querySelectorAll('.books-content');

          bookContents.forEach(bookContent => {
              const titleElement = bookContent.querySelector('.title h2');
              const bookTitle = titleElement.textContent.toLowerCase();
              if (bookTitle.includes(searchTerm)) {
                  bookContent.style.display = 'block';
                  hasVisibleBooks = true;
              } else {
                  bookContent.style.display = 'none';
              }
          });

          row.style.display = hasVisibleBooks ? 'flex' : 'none';
      });
  }

  searchButton.addEventListener('click', filterBooks);

  searchInput.addEventListener('keyup', filterBooks);
});


// Functionong of add to cart button counter :-

let carts = document.querySelectorAll(".add-to-cart-btn")

let products = [
  {
    name: "The last thing he told me", 
    tag: "novelbook1", 
    price: 100, 
    inCart: 0
  }, 
  {
    name: "Educated", 
    tag: "novelbook2", 
    price: 100, 
    inCart: 0
  },
  {
    name: "The Past is Rising", 
    tag: "novelbook3", 
    price: 100, 
    inCart: 0
  },
  {
    name: "The Great Gatsby", 
    tag: "novelbook4", 
    price: 100, 
    inCart: 0
  }, 
  {
    name: "American Gods", 
    tag: "novelbook5", 
    price: 100, 
    inCart: 0
  }, 
  {
    name: "The Sky Pirates", 
    tag: "novelbook6", 
    price: 100, 
    inCart: 0
  }
]

for(let i = 0; i<carts.length; i++){
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i])
    totatCost(products[i])
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem("cartNumbers")

  if(productNumbers){
    document.querySelector(".counter").textContent = productNumbers
  }
}

function cartNumbers(product){

  let productNumbers = localStorage.getItem("cartNumbers")

  productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1)
    document.querySelector(".counter").textContent = productNumbers + 1
  }else{
    localStorage.setItem('cartNumbers', 1)
    document.querySelector(".counter").textContent = 1
  }

  setItems(product)

}

function setItems(product){
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems)

  if(cartItems != null){

    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
        [product.tag]:product
      }
    }
    cartItems[product.tag].inCart += 1
  }else{
    product.inCart = 1
    cartItems = {
      [product.tag]: product
    }
  }
  
  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totatCost(product){
  
  let cartCost = localStorage.getItem("totalCost")

  if(cartCost != null){
    cartCost = parseInt(cartCost)
    localStorage.setItem("totalCost", cartCost + product.price)
  }else{
    localStorage.setItem("totalCost", product.price)
  }   
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems)

  let productsContainer = document.querySelector(".productss")

  let cartCost = localStorage.getItem("totalCost")

  if( cartItems && productsContainer ){
    productsContainer.innerHTML = "";
    Object.values(cartItems).map(item => {
      productsContainer.innerHTML += `<div class="productss">
        <i class="fa-sharp fa-solid fa-circle-xmark"></i>
        
        <span>${item.name}</span>
        </div>
        <div class="price">
          Rs.${item.price}.00
        </div>
        <div class="quantity">
          <i class="fa-solid fa-plus"></i>
          <span>${item.inCart}</span>
          <i class="fa-solid fa-minus"></i>
        </div>
        <div class="total">
          Rs.${item.inCart * item.price}.00
        </div>
        `
    })

    productsContainer.innerHTML += ` <br>
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
          Basket Total
        </h4>
        <h4 class="basketTotal">
          Rs.${cartCost}
        </h4>
      </div>
    `
  }
}

onLoadCartNumbers()
displayCart()


// payment form handelig

document.addEventListener("DOMContentLoaded", function() {
  const buyNowButton = document.querySelector(".buy-btn");
  const headingContent = document.querySelector(".book-tit").textContent;

  buyNowButton.addEventListener("click", function() {

      window.location.href = "paymentform.html?heading=" + encodeURIComponent(headingContent);
  });
});