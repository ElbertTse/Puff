<?php

    $data = getRequestInfo();

    $username = "endpoint";
    $password = "StrongPassword";
    $db = "Puff";

    $conn = new mysqli("localhost", $username, $password, $db);

    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        $sql = "INSERT INTO contact (FirstName, LastName, Email, PhoneNumber, StreetAddress, City, State, ZIP_Code, user_ID) 
        VALUES ('" . $data["FirstName"] . "', '" . $data["LastName"] . "', '" . $data["Email"] . "', '". $data["PhoneNumber"] . "', '" . $data["StreetAddress"] ."', '" . $data["City"] . "', '" . $data["State"] "', '" . $data["ZIP_Code"] . ", " . $data["user_ID"] . ")";
        if($conn->query($sql) === TRUE) {
            returnMessage("Contact added successfully.");
        } else {
            returnMessage("Failed insert into contact table.");
        }
        $conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnMessage( $msg )
	{
		$retValue = '{"message":"' . $msg . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>