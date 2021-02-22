var urlBase = 'http://puffs.live/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin() {
    //Get data from form
    var login = document.getElementById("loginName").value;
    var password = MD5(document.getElementById("loginPassword").value.toString());

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

        if (userId < 1 || login === "" || password === "") {
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
    var firstName = document.getElementById("Firstname").value;
    var lastName = document.getElementById("Lastname").value;
    var email = document.getElementById("Email").value;
    var phoneNumber = document.getElementById("PhoneNumber").value;
    var login = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;
    password = MD5(password.toString());

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

        if(firstName === "" || lastName === "" || phoneNumber === "" || email === "" || login === "" || password === "")
        {
            document.getElementById("registerResult").innerHTML = "First name and last name are required.";
        }
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
                                            '<div class="rounded-circle" onClick = "doUpdate(' + jsonObject.results[contact].ID + ', \'' + jsonObject.results[contact].FirstName + '\', \'' + jsonObject.results[contact].LastName + '\', \'' + jsonObject.results[contact].Email + '\', \'' + jsonObject.results[contact].PhoneNumber + '\', \'' + jsonObject.results[contact].StreetAddress + '\', \'' + jsonObject.results[contact].City + '\', \'' + jsonObject.results[contact].State + '\', ' + jsonObject.results[contact].ZIP_Code +');">✏</div>' +
                                        '</div>' +
                                        '<div class="col-1">' +
                                            '<div class="rounded-circle btn-text delete-button" onClick = "deleteContact(' + jsonObject.results[contact].ID + ',\'' + jsonObject.results[contact].FirstName + '\', \'' + jsonObject.results[contact].LastName + '\'' + ');">x</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
        }
        resultArea.innerHTML = resultAreaMarkup;
    } catch (error) {

    }
}

function goToAdd() {
    window.location.href = "add.html";
}

function deleteContact(id, fName, lName) {


    loadCookie();

    let deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));

    deleteModal.show();

    // Updating text
    document.getElementById("delete-dialogue").innerText = "You are about to delete " + fName + " " + lName + ". This cannot be undone.";

    document.getElementById("deleteBtn").addEventListener("click", function(){

        // Prepping JSON

        // JSON fields are login, password, firstname, lastname, email, phonenumber
        let jsonPayLoad = '{"user_ID" : ' + userId + ', "ID" : "' + id + '"}';
        const url = urlBase + '/Delete.' + extension;
        const xhr = new XMLHttpRequest();

        xhr.open("POST", url, false);
        // What we expect to recieve back
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        // Need to handle error
        try {
            //send request
            xhr.send(jsonPayLoad);
            
            //check if update worked
            const jsonObject = JSON.parse(xhr.responseText);

            //reload the page on delete success
            location.reload();
        }
        catch (err) {

        }
    });

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

//md5 hashing
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
 
    function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
            } else {
                    return (lResult ^ lX8 ^ lY8);
            }
    }
 
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
 
    function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
    };
 
    function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
    };
 
    function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
 
            for (var n = 0; n < string.length; n++) {
 
                    var c = string.charCodeAt(n);
 
                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
 
            }
 
            return utftext;
    };
 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
 
    string = Utf8Encode(string);
 
    x = ConvertToWordArray(string);
 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
    for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
            }
 
        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
        return temp.toLowerCase();
 }