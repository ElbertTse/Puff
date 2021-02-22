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
        $sql = "INSERT INTO users (FirstName, LastName, Login, Password) VALUES ('" . htmlspecialchars($data["firstName"]) . "', '" . htmlspecialchars($data["lastName"]) . "', '" . htmlspecialchars($data["login"]) . "', '" . htmlspecialchars($data["password"]) . "');";
		$result = $conn->query($sql);
		if ($result === TRUE)
		{
			returnWithInfo();
		}
		else
		{
			returnWithError('Registration failed: ' . $result);
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
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo()
	{
		$retValue = '{"info":"Success"}';
		sendResultInfoAsJson( $retValue );
	}
?>