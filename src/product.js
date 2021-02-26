/* Set variables for DOM selections */ 
const selectedCameraName = document.getElementById('camera-name');
const selectedCameraDescription = document.getElementById('camera-description');
const selectedCameraPrice = document.getElementById('camera-price');
const selectedCameraPic = document.getElementById('camera-picture');
const selectedCameraLenses = document.getElementsByClassName('camera-lens');

/* GET request returning a promise with details from API */
getCameraDetails = () => {
    return new Promise((resolve) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        };
        request.open('GET', 'http://localhost:3000/api/cameras/' + id);
        request.send(); 
    })
}

/* Create variable to catch parameters of URL "id" */
let id = "";
id = window.location.search.substring(4);

/* Set fillCameraDetails function to add details in HTML product.html */
window.onload = async function fillCameraDetails() {
    const cameraDetails = await getCameraDetails();
    selectedCameraName.innerHTML = cameraDetails.name;
    selectedCameraDescription.innerHTML = cameraDetails.description;
    selectedCameraPrice.innerHTML = cameraDetails.price / 100 + ",00";
    selectedCameraPic.src = cameraDetails.imageUrl;
    for(let i in cameraDetails.lenses) {
        selectedCameraLenses[i].innerHTML = cameraDetails.lenses[i];
    } 
}

// CART //

/* Listening event onclick button "add to cart" and call cartNumbers function*/ 
let addToCart = document.getElementById("add-cart");
addToCart.addEventListener('click', function() {
    cartNumbers();
});

/* Set function that keep number of cameras in cart, called when the page is visited */
function onLoadCameraCartNumber() {
    let cameraNumbers = localStorage.getItem('cameraInCartNumbers');
    if(cameraNumbers) {
        document.getElementById("cart-number").textContent = cameraNumbers;
    }
};

/* cartNumbers function send to the localstorage the total of cameras in cart*/
function cartNumbers() {
    let cameraNumbers = localStorage.getItem('cameraInCartNumbers');
    cameraNumbers = parseInt(cameraNumbers);  
    if(cameraNumbers) {
        localStorage.setItem('cameraInCartNumbers', cameraNumbers + 1);
        document.getElementById("cart-number").textContent = cameraNumbers + 1;
    } else {
        localStorage.setItem('cameraInCartNumbers', 1);
        document.getElementById("cart-number").textContent = 1;
    }
};

/* Create Cart if doesn't already exist in localstorage, cart is an object with the camera in cart details*/        
if (localStorage.getItem("cart")) {
}
else {
    let cartSet = {};
    localStorage.setItem("cart", JSON.stringify(cartSet));
};

addToCart.addEventListener('click', function() {
    sendToCart();
    alert("Article ajouté au panier");
});

/* Function that send informations about the chosen camera to localstorage */
async function sendToCart() {
    const cameraChosen = await getCameraDetails();

    /* New element in the local storage with id of camera as the key and the total needed as value */
    if (localStorage.getItem(cameraChosen._id)) {
        let cameraIncart = JSON.parse(localStorage.getItem(cameraChosen._id));
        cameraIncart += 1;
        localStorage.setItem(cameraChosen._id, JSON.stringify(cameraIncart));
    } else {
        localStorage.setItem(cameraChosen._id, 1);
    }

    /* Send to the localstorage the new chosen camera added to actual cart  */
    let actualCart = localStorage.getItem("cart");
    actualCart = JSON.parse(actualCart);
    actualCart = {
        ...actualCart,
        [cameraChosen.name]: cameraChosen,
    }
    localStorage.setItem("cart", JSON.stringify(actualCart));
}

onLoadCameraCartNumber();