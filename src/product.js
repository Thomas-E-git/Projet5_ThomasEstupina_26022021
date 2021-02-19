


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



