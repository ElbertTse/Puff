var urlBase = 'http://puffs.live/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
    //Get data from form
    var login = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;

    document.getElementById("loginResult").innerHTML = "";

    //Send data to php script
    var jsonPayLoad = '{"login" : "' + login + '", "password" : "' + password + '"}';
    var url = urlBase + '/Login.'+extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    //What am I expecting to get back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        //sent
        xhr.send(jsonPayLoad);
        
        //Prepare the response
        var jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if(userId < 1)
        {
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
    catch (err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doRegister()
{
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
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        // Send request
        xhr.send(jsonPayLoad);
        
        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);

        // Redirect
        window.location.href = "index.html"; // Send back to login screen.
    }
    catch(err)
    {
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
    const url = urlBase + '/add.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        // Send request
        xhr.send(jsonPayLoad);
        
        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);


        // Redirect
        window.location.href = "home.html"; // Send back to home screen.
    }
    catch(err)
    {
        document.getElementById("addResult").innerHTML = err.message;
    }
}

function deleteContact() {
    const contactID = document.getElementById("contactID").value;

    loadCookie();

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"user_ID" : ' + userId + ', "ID" : "' + contactID + '"}';
    const url = urlBase + '/Delete.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        // Send request
        xhr.send(jsonPayLoad);
        
        // Need to check if registering worked.
        const jsonObject = JSON.parse(xhr.responseText);

    }
    catch(err)
    {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

//json array to get data
function doSearch()
{
    loadCookie();
    const dropDown = document.getElementsByClassName("selectSearchbar")[0];
    const index = dropDown.selectedIndex;
    const tag = dropDown.options[index].text
    const term = document.getElementById("searchBox").value;

    let jsonPayLoad = '{"user_ID": ' + userId + '"search_field" : "' + tag + '", "search_criteria" : "' + term + '"}';

    const fNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const lNames = ['k', 'l', 'm', 'n', 'o', 'p', 'g', 'h', 'i', 'j'];
    const email = ['a@mail.com', 'b@mail.com', 'c@mail.com', 'd@mail.com', 'e@mail.com', 'f@mail.com', 'g@mail.com', 'h@mail.com', 'i@mail.com', 'j@mail.com'];
    const number = ['407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234', '407-555-1234'];
    const streetAddress = ['123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St', '123 Street St'];
    const city = ['afa', 'afioaef', 'afa', 'afioaef', 'afa', 'afioaef', 'afa', 'afioaef', 'afa', 'afioaef'];
    const zip = ['123', '456', '789', '101', '110', '111', '123', '456', '789', '101'];
    const state = ['FL', 'AL', 'GA', 'MO', 'NY', 'FL', 'AL', 'GA', 'MO', 'NY'];
    
    let resultArea = document.getElementsByClassName("search-results")[0];

    // Build search result cards
    // this is a temporary loop, will loop through json responses
    // believe me, this could of been way worse
    for(let i = 0; i < 10; i++)
    {
       resultArea.innerHTML += '<div class="search-result" id=' + i + '>' + 
                                    '<div class="row">' + 
                                        ' <div class="col-8 container-fluid card">' + 
                                            '<h1 class="card-title me-auto contact-name" id="contact-name">' + 
                                               fNames[i] + ' ' + lNames[i] +
                                            '</h1>' + 
                                            '<div class="row">' + 
                                                '<div class="col-6 text-start" id="email">' + email[i] + '</div>' + 
                                                '<div class="col-6 text-end" id="phone-number">' + number[i] + '</div>' + 
                                            '</div>' + 
                                            '<div class="row">' + 
                                                '<p class="me-auto" id="address">' + streetAddress[i] + '</p>' + 
                                            '</div>' + 
                                        '</div>' + 
                                        '<div class="col-4 container-fluid button-area">' + 
                                            '<span class="align-top">' +
                                                '<button class="contact-button btn btn-info" id="updateBtn" onClick = "doUpdate(' + i + ', \'' + fNames[i] + '\', \'' + lNames[i] + '\', \'' + email[i] + '\', \'' + number[i] + '\', \'' + streetAddress[i] + '\', \'' + city[i] + '\', \'' + state[i] + '\', ' + zip[i] +');">✏</button>' + //ID should be i
                                            '</span>' + 
                                            '<span class="align-bottom">' + 
                                                '<button class="contact-button btn btn-danger" onClick = "doDelete(' + i + ');">✖</button>' +
                                            ' </span>' + 
                                        '</div>' + 
                                    '</div>' +
                                '</div>';
    }
}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";

    deleteCookie();
}

function setCookie(propertyName, propertyValue) {
    var d = new Date();
    d.setTime(d.getTime + 1000*60*20);
    var expires = "expires="+d.toUTCString();
    document.cookie = propertyName + "=" + propertyValue + ";" + expires + ";path=/";
}

function getCookie(propertyName) {
    var name = propertyName + "=";
    var propertyArray = document.cookie.split(";");
    for(var i = 0; i< propertyArray.length; i++) {
        var property = propertyArray[i];
        while(property.charAt(0) == ' ') {
            property = property.substring(1);
        }
        if(property.indexOf(name) == 0) {
            return property.substring(name.length, property.length);
        }
    }
    return "";
}

function loadCookie() {
    var user_ID = getCookie("userID");
    if(user_ID != "") {
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

function goToAdd()
{
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

        //needs testing
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

function doDelete(id)
{
    alert("PLACEHOLDER: delete called for id: " + id);
}


// Allows for clicking enter to login
let fileName = location.href.split("/").slice(-1);
if(fileName == "index.html")
{   
    document.getElementById("login-div").addEventListener("keydown", function(e)
    {
        if(e.key == "Enter")
        {
            const loginName = document.getElementById("loginName").value;
            const password = document.getElementById("loginPassword").value;

            if(loginName != "" && password != "")
                doLogin();
        }
    });
}

if(userId > 0)
    document.getElementById("loggedInAs").innerHTML += firstName + " " + lastName;
