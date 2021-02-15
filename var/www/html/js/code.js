var urlBase = 'http://puffs.live/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin() {
    //Get data from form
    var login = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;

    document.getElementById("loginResult").innerHTML = "";

    //Send data to php script
    var jsonPayLoad = '{"login" : "' + login + '", "password" : "' + password + '"}';
    var url = urlBase + '/Login.' + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    //What am I expecting to get back
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        //sent
        xhr.send(jsonPayLoad);

        //Prepare the response
        var jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
            document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
            return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        setCookie("userID", userId);
        setCookie("firstName", firstName);
        setCookie("lastName", lastName);

        //where to send them to after they are authenticated
        window.location.href = "home.html";
    }
    catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doRegister() {
    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("Email").value;
    const phoneNumber = document.getElementById("PhoneNumber").value;
    const login = document.getElementById("loginName").value;
    const password = document.getElementById("loginPassword").value;

    // This is my guess for the what the register endpoint will be like.

    document.getElementById("registerResult").innerHTML = "";

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"login" : "' + login + '", "password" : "' + password + '", "firstName" : "' + firstName + '",  "lastName" : "' + lastName + '", "email" : "' + email + '", "phonenumber" : "' + phoneNumber + '" }';
    const url = urlBase + '/Register.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        // Send request
        xhr.send(jsonPayLoad);

        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);

        // Redirect
        window.location.href = "index.html"; // Send back to login screen.
    }
    catch (err) {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function addContact() {
    loadCookie();

    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("Email").value;
    const phoneNumber = document.getElementById("PhoneNumber").value;
    const streetAddress = document.getElementById("Street").value;
    const city = document.getElementById("City").value;
    const state = document.getElementById("State").value;
    const zip_code = document.getElementById("ZipCode").value;

    document.getElementById("addResult").innerHTML = "";

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"user_ID" : ' + userId + ', "FirstName" : "' + firstName + '", "LastName" : "' + lastName + '",  "Email" : "' + email + '", "PhoneNumber" : "' + phoneNumber + '", "StreetAddress" : "' + streetAddress + '", "City" : "' + city + '", "State" : "' + state + '", "ZIP_Code" : "' + zip_code + '"}';
    const url = urlBase + '/Create.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        // Send request
        xhr.send(jsonPayLoad);

        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);


        // Redirect
        window.location.href = "home.html"; // Send back to home screen.
    }
    catch (err) {
        document.getElementById("addResult").innerHTML = err.message;
    }
}

function deleteContact(id) {
    const contactID = document.getElementById("contactID").value;

    loadCookie();

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"user_ID" : ' + userId + ', "ID" : "' + id + '"}';
    const url = urlBase + '/Delete.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        // Send request
        xhr.send(jsonPayLoad);

        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);

    }
    catch (err) {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function doSearch() {
    loadCookie();
    const dropDown = document.getElementsByClassName("selectSearchbar")[0];
    const index = dropDown.selectedIndex;
    const tag = dropDown.options[index].text
    const term = document.getElementById("searchBox").value;

    let jsonPayLoad = '{"user_ID": ' + userId + ', "search_field" : "' + tag + '", "search_criteria" : "' + term + '"}';
    const url = urlBase + '/Search.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try {
        xhr.send(jsonPayLoad);
        const jsonObject = JSON.parse(xhr.responseText);

        console.log(jsonObject);
        let resultArea = document.getElementsByClassName("search-results")[0];
        // Build search result cards
        // this is a temporary loop, will loop through json responses
        // believe me, this could of been way worse
        let resultAreaMarkup = '';
        for (contact in jsonObject.results) {
            resultAreaMarkup += '<div class="search-result" id=' + jsonObject.results[contact].ID + '>' +
                                    '<div class="row align-items-center">' +
                                        ' <div class="col-8 container-fluid card">' +
                                            '<h1 class="card-title me-auto contact-name" id="contact-name">' +
                                                jsonObject.results[contact].FirstName + ' ' + jsonObject.results[contact].LastName +
                                            '</h1>' +
                                            '<div class="row">' +
                                                '<div class="col-6 text-start" id="email">' + jsonObject.results[contact].Email + '</div>' +
                                                '<div class="col-6 text-end" id="phone number">' + jsonObject.results[contact].PhoneNumber + '</div>' +
                                            '</div>' +
                                            '<div class="row">' +
                                                '<p class="me-auto" id="address">' + jsonObject.results[contact].StreetAddress + ' ' + jsonObject.results[contact].City + ', ' + jsonObject.results[contact].State + ' ' + jsonObject.results[contact].ZIP_Code + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-1">' +
                                            '<button class="contact-button btn btn-info" onClick = "doUpdate(' + jsonObject.results[contact].ID + ', \'' + jsonObject.results[contact].FirstName + '\', \'' + jsonObject.results[contact].LastName + '\', \'' + jsonObject.results[contact].Email + '\', \'' + jsonObject.results[contact].PhoneNumber + '\', \'' + jsonObject.results[contact].StreetAddress + '\', \'' + jsonObject.results[contact].City + '\', \'' + jsonObject.results[contact].State + '\', ' + jsonObject.results[contact].ZIP_Code +');">✏</button>' +
                                        '</div>' +
                                        '<div class="col-1">' +
                                            '<button class="contact-button btn btn-danger" onClick = "deleteContact(' + jsonObject.results[contact].ID + ');">✖</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
        }
        resultArea.innerHTML = resultAreaMarkup;
    } catch (error) {

    }
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";

    deleteCookie();
}

function setCookie(propertyName, propertyValue) {
    var d = new Date();
    d.setTime(d.getTime + 1000 * 60 * 20);
    var expires = "expires=" + d.toUTCString();
    document.cookie = propertyName + "=" + propertyValue + "; " + expires + "; path=/";
}

function getCookie(propertyName) {
    var name = propertyName + "=";
    var propertyArray = document.cookie.split(";");
    for (var i = 0; i < propertyArray.length; i++) {
        var property = propertyArray[i];
        while (property.charAt(0) == ' ') {
            property = property.substring(1);
        }
        if (property.indexOf(name) == 0) {
            return property.substring(name.length, property.length);
        }
    }
    return "";
}

function loadCookie() {
    var user_ID = getCookie("userID");
    if (user_ID != "") {
        userId = user_ID;
        firstName = getCookie("firstName");
        lastName = getCookie("lastName");
    } else {
        userId = -1;
        firstName = "";
        lastName = "";
    }

}

function deleteCookie() {
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function goToAdd() {
    window.location.href = "add.html";
}

function doUpdate(contactId, firstName, lastName, email, phone, street, city, state, zipcode)
{
    loadCookie();

    //creates modal defined in home.html
    var updateModal = new bootstrap.Modal(document.getElementById('updateModal'));

    //pre-fill information in text fields before showing modal
    document.getElementById("contactFirstName").value = firstName;
    document.getElementById("contactLastName").value = lastName;
    document.getElementById("contactEmail").value = email; 
    document.getElementById("contactPhone").value = phone;
    document.getElementById("streetAddress").value = street;
    document.getElementById("city").value = city;
    document.getElementById("state").value = state;
    document.getElementById("zip").value = zipcode;

    //show modal
    updateModal.show();

    //for closing modal
    document.getElementById("backBtn").enterKeyHintp;

    document.getElementById("updateBtn").onclick = function(){ //by now the user has filled in the information in the text fields for updating
        
        //sets function variables to what the user inputted (tested, works)
        firstName = document.getElementById("contactFirstName").value;
        lastName = document.getElementById("contactLastName").value;
        email = document.getElementById("contactEmail").value;
        phone = document.getElementById("contactPhone").value;
        street = document.getElementById("streetAddress").value;
        city = document.getElementById("city").value;
        state = document.getElementById("state").value;
        zipcode = document.getElementById("zip").value;

        
        let jsonPayLoad = '{"user_ID" : ' + userId + ', "contact_ID" : ' + contactId + ', "FirstName" : "' + firstName + '", "LastName" : "' + lastName + '",  "Email" : "' + email + '", "PhoneNumber" : "' + phone + '", "StreetAddress" : "' + streetAddress + '", "City" : "' + city + '", "State" : "' + state + '", "ZIP_Code" : "' + zipcode + '"}';
        const url = urlBase + '/Update.' + extension;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        
        try
        {
            //send request
            xhr.send(jsonPayLoad);
            
            //check if update worked
            const jsonObject = JSON.parse(xhr.responseText);

            //reload the page on update success
            location.reload();

        }
        catch(err)
        {
            //shows error at bottom of modal when error is present
            document.getElementById("updateResult").innerHTML = err.message;
        }
    }
}

/// Allows for user to press enter in the password fields to submit instead of clicking the button.
let finalField = document.getElementsByClassName("final-field")[0];
finalField.addEventListener("keyup", function(event){
    if(event.code === "Enter")
        document.getElementsByClassName("submit-button")[0].click();
});

loadCookie();
if (userId > 0)
    document.getElementById("loggedInAs").innerHTML += firstName + " " + lastName;
