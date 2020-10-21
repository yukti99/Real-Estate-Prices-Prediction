// function to get the number of bathrooms selected by the user
function getBathNo() {
    var bathNo = document.getElementsByName("bath_ui");
    for (var i in bathNo) {
        if (bathNo[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}
// function to get the BHK selected by the user
function getBHK() {
    var bhk = document.getElementsByName("bhk_ui");
    for (var i in bhk) {
        if (bhk[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}
// function to predict the price when the predict price button is clicked 
function onClickedPredictPrice() {
    console.log("Price button clicked");
    var sqft = document.getElementById("sqft_area");
    var bhk = getBHK();
    var bathrooms = getBathNo();
    var location = document.getElementById("location_id");
    var Price = document.getElementById("price");
    console.log(sqft.value,bhk,bathrooms,location.value,Price.value)
    var url = "http://127.0.0.1:5000/predict_house_price"; 
    //var url = "/api/predict_house_price"; //if using nginx web server for localhost:80 

    $.post(url, {
        sqft: parseFloat(sqft.value),
        size_bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function (data, status) {
        console.log(data.predicted_price);
        if ((data.predicted_price) < 0){
            Price.innerHTML = "Please enter realistic values...";
        }else{
            Price.innerHTML = "<h2> Rs. " + data.predicted_price.toString() + " Lakh</h2>";
        }            
        console.log(status);
    });


}
// to  convert location names to title case for displaying 
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
} 


// when the page is loaded, all locations should be loaded 
function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_house_locations"; 
    //var url = "/api/get_house_locations"; 
    $.get(url, function (data, status) {
        console.log("got response for get_house_locations request");
        if (data) {
            var all_locations = data.locations;
            var location_id = document.getElementById("location_id");
            console.log(location_id)
            $('#location_id').empty();
            // adding locations one by one in the drop down
            for (var i in all_locations) {
                var opt = new Option(all_locations[i]);
                $('#location_id').append(opt);
            }
        }
    });
}
window.onload = onPageLoad;

