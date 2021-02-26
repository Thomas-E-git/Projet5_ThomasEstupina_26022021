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
    for (let i in array) {
        cameraNames[i].innerHTML = array[i].name;
        cameraDescriptions[i].innerHTML = array[i].description;
        cameraPrices[i].innerHTML = array[i].price / 100 + ",00";
        cameraPics[i].src = array[i].imageUrl;
        cameraSelect[i].setAttribute('href', "product.html?id=" + array[i]._id);
    }
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