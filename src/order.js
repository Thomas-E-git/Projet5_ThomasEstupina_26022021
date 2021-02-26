var stringUrl = window.location.href;
var url = new URL(stringUrl);
var orderId = url.searchParams.get("id");
var firstName = url.searchParams.get("name");
var totalAmount = url.searchParams.get("total");

document.getElementById("first-name").innerHTML = firstName;
document.getElementById("order-id").innerHTML = orderId;
document.getElementById("total").innerHTML = totalAmount;