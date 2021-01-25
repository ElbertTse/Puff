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
        window.location.href("index.html"); // Send back to login screen.
    }
    catch(err)
    {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}







function doAdd()
{
    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const email = document.getElementById("Email").value;
    const phoneNumber = document.getElementById("PhoneNumber").value;
    var street= document.getElementById("Street").value;
    var city= document.getElementById("City").value;
    var state= document.getElementById("State").value;
    var zipcode= document.getElementById("ZipCode").value;
    const address = street.concat(' ', city, ' ', state, ' ', zipcode);

    
    document.getElementById("addResult").innerHTML = "";

    // Prepping JSON

    // JSON fields are address, firstname, lastname, email, phonenumber
    let jsonPayLoad = '{"firstName" : "' + firstName + '",  "lastName" : "' + lastName + '", "email" : "' + email + '", "phonenumber" : "' + phoneNumber + '", "address" : "' + address + '"}';
    const url = urlBase + '/add.' + extension;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    // What we expect to recieve back
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
		{
			// "OK" When readyState is 4 and status is 200, the response is ready

			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML = "New contact has been added";
			}
		};
		xhr.send(jsonPayload);



        // Redirect
        window.location.href("home.html"); // Send back to logged screen.
    }
    catch(err)
    {
        document.getElementById("addResult").innerHTML = err.message;
    }
}

