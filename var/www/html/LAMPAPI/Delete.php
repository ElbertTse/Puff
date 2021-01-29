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
        $sql = "DELETE FROM contact WHERE (ID = '" . $data["ID"] . "', 'user_ID' = 'userID');";
		$result = $conn->query($sql);
		
		if ($result === TRUE)
		{
			
            returnWithInfo(TRUE);
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
	
	function returnWithInfo( $result )
	{
		$retValue = 'Succsefully deleted';
		sendResultInfoAsJson( $retValue );
	}
?>