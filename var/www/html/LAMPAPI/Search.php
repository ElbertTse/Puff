<?php


$data = getRequestInfo();

$username = "endpoint";
$password = "StrongPassword";
$db = "Puff";

if ($conn->connect_error)
{
    returnWithError($conn->connect_error);
}
else
{
    $sql = "SELECT * FROM contact where user_ID='" . $data["user_ID"] . "' and Password='" . $data["password"] . "';";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
        $row = $result->fetch_assoc();
        $firstName = $row["FirstName"];
        $lastName = $row["LastName"];
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

function buildQuery($data) {
    

}

function returnWithError( $err )
{
	$retValue = '{"rows":{},"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}
	
function returnRows()
{
	$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
	sendResultInfoAsJson( $retValue );
}

?>