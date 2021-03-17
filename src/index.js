/* Set variables for DOM selections */ 
const cameraNames = document.getElementsByClassName('camera-name');
const cameraDescriptions = document.getElementsByClassName('camera-description');
const cameraPrices = document.getElementsByClassName('camera-price');
const cameraPics = document.getElementsByClassName('camera-picture');
const cameraSelect = document.querySelectorAll("#cameraList a");

/* GET request returning details from API + call of fillCameraDetails function  */
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        fillCameraDetails(JSON.parse(this.responseText));
    }
};
request.open('GET', 'http://localhost:3000/api/cameras');
request.send(); 

/* Set fillCameraDetails function to add details in HTML index.html */
function fillCameraDetails(array) {
    let cameraList = "";
    for (let i in array) {
        cameraList += `
        <div class="col-12 col-md-6 col-lg-4 mt-5">
            <div class="card bg-primary text-secondary">
                <img class="camera-picture" src="${array[i].imageUrl}" alt="premier modèle de Caméra vintage">
                <div class="card-body text-center">
                    <h2 class="card-title font-weight-bold mb-3 camera-name text-uppercase" id="camera-name-0">${array[i].name}</h2>
                    <p class="card-text camera-description text-left h6" id="camera-description-0">${array[i].description}</p>
                    <p class="card-text h5 font-weight-bold text-right my-3 text-tertiary" id="camera-price-0"><span class="camera-price"></span>${array[i].price / 100 + ",00"}<span> €</span></p>
                    <a href="${"product.html?id=" + array[i]._id}" class="btn btn-secondary text-primary font-weight-bold my-1 col-sm-10 mx-auto stretched-link">Sélectionner la caméra</a>                    
                </div>
            </div>
        </div>
        `
    };
    document.getElementById("cameraList").innerHTML = cameraList;
}



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