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
        $sql = sprintf("UPDATE contact SET FirstName = '%s', LastName = '%s', Email = '%s', PhoneNumber = '%s', StreetAddress = '%s', City = '%s', State = '%s', ZIP_Code = '%s' WHERE (ID = %d AND user_ID = %d);", 
		htmlspecialchars($data["FirstName"]), htmlspecialchars($data["LastName"]), htmlspecialchars($data["Email"]), htmlspecialchars($data["PhoneNumber"]), htmlspecialchars($data["StreetAddress"]), htmlspecialchars($data["City"]), htmlspecialchars($data["State"]), 
		htmlspecialchars($data["ZIP_Code"]),$data["contact_ID"], $data["user_ID"]);
		$result = $conn->query($sql);
		
		returnMessage($result);
		
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

	function returnMessage( $var)
	{
		$message;
		if ($var === true)
		{
			$message = '{"message":"Updated"}';
		}
		else
		{
			$message = '{"message":"not Updated"}';
		}

		sendResultInfoAsJson($message);
	}
?>