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
		foreaech($data as $key => $value) {
			$data[$key] = htmlspecialchars($value);
		}
        $sql = "UPDATE contact SET FirstName = '" . $data["FirstName"] . "', LastName = '" . $data["LastName"] . "', Email = '" . $data["Email"] . "', PhoneNumber = '" . $data["PhoneNumber"] . "', StreetAddress = '" . $data["StreetAddress"] . "', City = '" . $data["City"] . "', State = '" . $data["State"] . "', ZIP_Code = '" . $data["ZIP_Code"] . "' WHERE (ID = " . $data["contact_ID"] . " AND user_ID = " . $data["user_ID"] . ");";
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