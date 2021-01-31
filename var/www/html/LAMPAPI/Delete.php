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
        $sql = "DELETE FROM contact WHERE ('ID' = '" . $data["ID"] . "' AND 'user_ID' = '" . $data["user_ID"] . "');";
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
			$message = '{"message":"Deleted"}';
		}
		else
		{
			$message = '{"message":"not Deleted"}';
		}

		sendResultInfoAsJson($message);
	}
?>