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
    $sql = buildQuery();
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
        returnRows($result);
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

function buildQuery() {
    $sql = "SELECT * FROM contact WHERE ";
    switch($data["searchField"]) {
        case "First Name":
            $sql = $sql + "FirstName LIKE '%" + $data["search_criteria"] + "%';";
            break;
        case "Last Name":
            $sql = $sql + "LastName LIKE '%" + $data["search_criteria"] + "%';";
            break;
        case "Phone":
            $sql = $sql + "PhoneNumber LIKE '%" + $data["search_criteria"] + "%';";
            break;
        case "Email":
            $sql = $sql + "Email LIKE '%" + $data["search_criteria"] + "%';";
            break;
        case "Address":
            $sql = $sql + "StreetAddress LIKE '%" + $data["search_criteria"] + "%';";
            break;
    }
    return $sql;
}

function returnWithError( $err )
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}
	
function returnRows($result)
{
    $retValue = '{';
	while($row = $result->fetch_assoc()) {
        $retValue = $retValue + sprintf('%d:{"FirstName":"%s","LastName":%s,"PhoneNumber":"%s", "Email":"%s", "Address":"%s %s, %s %s"},',
         $row["ID"], $row["FirstName"], $row["LastName"], $row["PhoneNumber"], $row["Email"], $row["StreetAddress"], $row["City"], $row["State"], $row["ZIP_Code"]);
    }
    $retValue += '}';
	sendResultInfoAsJson( $retValue );
}

?>