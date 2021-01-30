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
        
        saveCookie();

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

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function addContact() {

    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("Email").value;
    const phoneNumber = document.getElementById("PhoneNumber").value;
    const streetAddress = document.getElementById("Street").value;
    const city = document.getElementById("City").value;
    const state = document.getElementById("State").value;
    const zip_code = document.getElementById("ZipCode").value;

    document.getElementById("registerResult").innerHTML = "";

    // Prepping JSON

    // JSON fields are login, password, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"user_ID" : ' + userID + ', "FirstName" : "' + firstName + '", "LastName" : "' + lastName + '",  "Email" : "' + email + '", "PhoneNumber" : "' + phoneNumber + '", "StreetAddress" : "' + streetAddress + '", "City" : "' + city + '", "State" : "' + state + '", "ZIP_Code" : "' + zip_code + '"}';
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
        window.location.href = "home.html"; // Send back to home screen.
    }
    catch(err)
    {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function doSearch()
{
    const dropDown = document.getElementsByClassName("selectSearchbar")[0];
    const index = dropDown.selectedIndex;
    const tag = dropDown.options[index].text
    const term = document.getElementById("searchBox").value;

    let jsonPayLoad = '{"tag" : "' + tag + '", "term" : "' + term + '"}';

    let resultArea = document.getElementsByClassName("search-results")[0];

    // this is a temporary loop, will loop through json responses
    // believe me, this could of been way worse
    for(let i = 0; i < 10; i++)
       resultArea.innerHTML += '<div class="search-result" id="pass">' + 
       '<div class="row">' + 
          ' <div class="col-8 container-fluid card">' + 
               '<h1 class="card-title me-auto contact-name" id="contact-name">' + 
                  ' Firstname Lastname' + 
               '</h1>' + 
               '<div class="row">' + 
                   '<div class="col-6 text-start" id="email">email</div>' + 
                   '<div class="col-6 text-end" id="phone number">phone number</div>' + 
               '</div>' + 
               '<div class="row">' + 
                   '<p class="me-auto" id="address">address</p>' + 
               '</div>' + 
           '</div>' + 
           '<div class="col-4 container-fluid button-area">' + 
               '<span class="align-top">' +
                   '<button class="contact-button btn btn-info">✏</button>' + 
               '</span>' + 
               '<span class="align-bottom">' + 
                   '<button class="contact-button btn btn-danger">✖</button>' +
              ' </span>' + 
           '</div>' + 
       '</div>' +
   '</div>';
}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";

    // add cookie stuff
}

function goToAdd()
{
    window.location.href = "add.html";
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
