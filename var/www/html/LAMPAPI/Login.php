<?php
    $data = getRequestInfo();

    $username = "endpoint";
    $password = "StrongPassword";
    $db = "Puff";

    $conn = new mysqli("localhost", $username, $password, $db);

    if ($conn->connect_error);
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        $sql = "SELECT ID, FirstName, LastName FROM users where Login='" . $data["login"] . "' and Password='" . $data["password"] . "';";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$id = $row["ID"];
			
            returnWithInfo($firstName, $lastName, $id);
            
            $update_last_login = "UPDATE users SET DateLastLoggedIn = CURRENT_TIMESTAMP WHERE ID =" . $id . ";";
            $result = $conn->query($update_last_login);
		}
		else
		{
			returnWithError( "No Records Found" );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>