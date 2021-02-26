/* Create a variable with the current URL */
var stringUrl = window.location.href;
var url = new URL(stringUrl);

/* Get parameters of the URL as variables */
var orderId = url.searchParams.get("id");
var firstName = url.searchParams.get("name");
var totalAmount = url.searchParams.get("total");

/* Display order informations in HTML */ 
document.getElementById("first-name").innerHTML = firstName;
document.getElementById("order-id").innerHTML = orderId;
document.getElementById("total").innerHTML = totalAmount;