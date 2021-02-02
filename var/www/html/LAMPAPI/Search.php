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
    $sql = buildQuery($data);
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
        returnRows($result, $sql);
    }
    else
    {
        returnWithError( "No Records Found");
    }
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function buildQuery($data) {
    $sql = "SELECT * FROM contact WHERE `user_ID`=" . $data["user_ID"] . " AND ";
    switch($data["search_field"]) {
        case "First Name":
            $sql .= "`FirstName` LIKE '%" . $data["search_criteria"] . "%';";
            break;
        case "Last Name":
            $sql .= "`LastName` LIKE '%" . $data["search_criteria"] . "%';";
            break;
        case "Phone":
            $sql .= "`PhoneNumber` LIKE '%" . $data["search_criteria"] . "%';";
            break;
        case "Email":
            $sql .= "`Email` LIKE '%" . $data["search_criteria"] . "%';";
            break;
        case "Address":
            $sql .= "`StreetAddress` LIKE '%" . $data["search_criteria"] . "%';";
            break;
    }
    return $sql;
}

function returnWithError( $err )
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}
	
function returnRows($result, $sql)
{
    $retValue = '{"sql":"'.$sql.'",';
    $results = 0;
	while($row = $result->fetch_assoc()) {
        $retValue = $retValue . sprintf('"row'. ++$results .'":{"ID":%d,"FirstName":"%s","LastName":"%s","PhoneNumber":"%s", "Email":"%s", "Address":"%s %s, %s %s"},',
         $row["ID"], $row["FirstName"], $row["LastName"], $row["PhoneNumber"], $row["Email"], $row["StreetAddress"], $row["City"], $row["State"], $row["ZIP_Code"]);
    } 
    $retValue = rtrim($retValue, ',') . "}";
	sendResultInfoAsJson( $retValue );
}

function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

?>