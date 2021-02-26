
/* Prevent default's task of the navbar's submit button */
const searchSubmitButton = document.getElementById("search-submit")
searchSubmitButton.addEventListener('click', function(event) {
    event.preventDefault();
})

/* function to keep cart numbers in index.html page */
function onLoadCameraCartNumber() {
    let cameraNumbers = localStorage.getItem('cameraInCartNumbers');
    if(cameraNumbers) {
        document.getElementById("cart-number").textContent = cameraNumbers;
    }
};
onLoadCameraCartNumber();

/* Create Cart if doesn't already exist in localstorage, cart is an object with the camera in cart details*/        
if (localStorage.getItem("cart")) {
}
else {
    let cartSet = {};
    localStorage.setItem("cart", JSON.stringify(cartSet));
};

/* Get Cart from localstorage */
let cameraList = JSON.parse(localStorage.getItem("cart"));

/* Create HTML objects in the cart division */
function cartInnerHtml (){
    let cameraListDisplay = "";
    Object.values(cameraList).map(camera => {
        let cameraNumber = localStorage.getItem(camera._id)
        cameraListDisplay += `
            <tr>
                <td class="w-25"><a href="product.html?id=${camera._id}"><img class="img-fluid" src=${camera.imageUrl}></img></a><span class="d-md-none">${camera.name}</span></td>
                <td class="d-none d-md-table-cell align-middle">${camera.name}</td>
                <td class="d-none d-md-table-cell align-middle">${camera.price/100}€</td>
                <td class="align-middle">
                <a role="button" id="${camera._id + "less"}" class="btn"><i class="fas fa-chevron-circle-left text-secondary"></i></a><span id="${camera._id}">${cameraNumber}</span><a role="button" class="btn" id="${camera._id + "more"}"><i class="fas fa-chevron-circle-right text-secondary"></i></a>
                <a role="button" id="${camera._id + "del"}" class="btn"><i class="fas fa-trash-alt ml-auto"></i></i></a>
                </td>
                <td class="align-middle" id="${camera._id + "total"}">${cameraNumber * camera.price/100}€</td>
            </tr>
        `
    });
    document.getElementById("cameraList").innerHTML = cameraListDisplay;
}
cartInnerHtml();

/* Calculate and set the total amount of the cart */
function generateTotal() {
    let amounts = [];
    let totalAmount = 0;
    Object.values(cameraList).map(camera => {
        let cameraNumber = localStorage.getItem(camera._id);
        let cameraPrice = camera.price;
        totalAmountByCamera = cameraNumber * cameraPrice / 100;
        amounts.push(totalAmountByCamera);
    });
    for (let i in amounts) {
        totalAmount += amounts[i]  
    }
    document.getElementById("total-cart").innerHTML = totalAmount + " €";
    document.getElementById("TVA").innerHTML = Math.round((totalAmount - (totalAmount / (1+0.2)))) + " €" ;
}
generateTotal();

/* Select each Camera in the cameralist(cart) */
Object.values(cameraList).map(camera => { 
    /* decrease the number of cameras with "less" button */
    let lessButtonsCart = document.getElementById(camera._id + "less");
    lessButtonsCart.addEventListener('click', function() {
        let actualCameraNumber = JSON.parse(localStorage.getItem(camera._id));
        if(actualCameraNumber > 1) {
            actualCameraNumber -= 1;
            localStorage.setItem(camera._id, JSON.stringify(actualCameraNumber));
            document.getElementById(camera._id).innerHTML = JSON.parse(localStorage.getItem(camera._id));
            document.getElementById(camera._id + "total").innerHTML = JSON.parse(localStorage.getItem(camera._id)) * camera.price /100 +"€";
            let actualCameraInCartNumber = localStorage.getItem("cameraInCartNumbers");
            localStorage.setItem("cameraInCartNumbers", actualCameraInCartNumber -= 1);
            onLoadCameraCartNumber();
            generateTotal();
        }       
    })
    /* increase the number of cameras with "more" button */
    let moreButtonsCart = document.getElementById(camera._id + "more");
    moreButtonsCart.addEventListener('click', function() {
        let actualCameraNumber = JSON.parse(localStorage.getItem(camera._id));
        actualCameraNumber += 1;
        localStorage.setItem(camera._id, JSON.stringify(actualCameraNumber));
        document.getElementById(camera._id).innerHTML = JSON.parse(localStorage.getItem(camera._id));
        document.getElementById(camera._id + "total").innerHTML = JSON.parse(localStorage.getItem(camera._id)) * camera.price /100 +"€";
        let actualCameraInCartNumber = JSON.parse(localStorage.getItem("cameraInCartNumbers"));
        localStorage.setItem("cameraInCartNumbers", JSON.stringify(actualCameraInCartNumber += 1));
        onLoadCameraCartNumber();
        generateTotal();         
    })
    /* delete a camera of the cart and reload the total number of cameras in cart */
    let deleteButton = document.getElementById(camera._id + "del");
    deleteButton.addEventListener('click', function() {
        actualCameraList = JSON.parse(localStorage.getItem("cart"));
        delete actualCameraList[camera.name];
        localStorage.setItem("cart", JSON.stringify(actualCameraList));
        let actualCameraInCartNumber = JSON.parse(localStorage.getItem("cameraInCartNumbers"));
        let actualInCart = JSON.parse(localStorage.getItem(camera._id));
        localStorage.setItem("cameraInCartNumbers", JSON.stringify(actualCameraInCartNumber -= actualInCart));
        localStorage.removeItem(camera._id);
        onLoadCameraCartNumber();
        generateTotal();
        location.reload();
    })
});

/* Disable order button if cart is empty, also display a message "cart is empty" and an instruction on order button's if the cart is empty */
let cartInfo = JSON.parse(localStorage.getItem("cameraInCartNumbers"))
if (cartInfo == null || cartInfo == 0) {
    document.getElementById("cart-is-empty").innerHTML = `Votre panier est vide <i class="fas fa-sad-tear text-secondary ml-1"></i> `;
    document.getElementById("order-button").disabled = true;
    document.getElementById("order-button").setAttribute("data-toggle", "tooltip");
    document.getElementById("order-button").setAttribute("data-placement", "bottom");
    document.getElementById("order-button").setAttribute("title", "Veuillez sélectionner des produits avant de passer votre commande");
};

/* function to empty the cart on click with an alert */
document.getElementById("empty-cart").addEventListener('click', function() {
    if( confirm( "Êtes-vous sûr de vouloir vider votre panier ? Vous perdrez toute votre sélection actuelle" )) {
        localStorage.clear();
        location.reload();
    }
})

//// order ////

/* Set variables which will contain order informations */
let productPrices = [];
let totalCost = 0;
let orderInformations = {};

/* On click event for the submit button of the form */
document.getElementById("contact-form").addEventListener('submit', function(e) {
    let contactObject = {};
    let productsList = JSON.parse(localStorage.getItem("cart"));
    let productsListId = [];

    /* Return promise with an array of products in cart's ids */
    getIds = () => {
        return new Promise((resolve) => {
            for (i in productsList) {
                productsListId.push(productsList[i]._id);
            };
            resolve(productsListId);
        });
    };

    /* Return promise with an object containing contact informations */
    createContactObject = () => {
        return new Promise((resolve) => {
            contactObject = {
                firstName : document.getElementById("first-name").value,
                lastName : document.getElementById("last-name").value,
                address : document.getElementById("address").value,
                city : document.getElementById("city").value,
                email : document.getElementById("mail").value,
            };
            resolve(contactObject);
        });
    };

    /* Prevent default tasks of submit button, stop the reload */
    e.preventDefault();
    e.stopPropagation();
    
    /* Async function to post all informations we need about the order after promises resolve */
    async function postOrder() {
        var post = new XMLHttpRequest();
        let productsListId = await getIds();
        let contactObject = await createContactObject();
        const orderDetails = {
            "products" : productsListId,
            "contact" : contactObject
        }
        post.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                orderInformations = JSON.parse(this.responseText);
                calculateTotalCost(orderInformations);
                document.location.href="order.html?id=" + orderInformations.orderId + "&name=" + orderInformations.contact.firstName + "&total=" + totalCost;
            }
        };
        post.open('POST', 'http://localhost:3000/api/cameras/order');
        post.setRequestHeader("Content-Type", "application/json");
        post.send(JSON.stringify(orderDetails));
    };
    postOrder();
})

/* Calculate current total amount of the order */
function calculateTotalCost(object) {
    for (let i in object.products) {
        productPrices.push((object.products[i].price / 100) * JSON.parse(localStorage.getItem(object.products[i]._id)));
    }
    for (let i in productPrices) {
        totalCost += productPrices[i];  
    }
}



  

