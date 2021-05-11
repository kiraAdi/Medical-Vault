<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   <style>
   table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}
   </style>
  </head>
  <body>
    <div class="container-fluid">
    <div style="height:100px;background-color:black">
       <h2 style="text-align:center;color:yellow"><b>Medical<span style="color:GREEN">EHR</span></b></h2>
       <h3 style="text-align:right"><a href="#" onclick="signout()">SignOut</a>></h3>
     </div>
    	<br><br>
    	
      <table style="width:100%;" id="table">
        <tr>
          <th>Record Id</th>
          <th>Patient Id</th>
          <th>Doctor Id</th>
          <th>Gender</th>
          <th>Age</th>	
          <th>Description</th>
          <th>Prescription</th>
          <th>Time of Encounter</th>
          <th>Location</th>
        </tr>
      </table>
    </div>
<script>
var pid ;
var gender;
var age;

$.ajax({
    type : 'GET',
    url: 'http://localhost:3000/api/queries/selectMedicalRecordByPatientId?PatientId='+localStorage.patient_id,
    dataType: 'json',
    async: false,
    
    success: function (response){
    	var string;
    	if(response.length==0)
    		alert("No records found");
    	
    	for(var i=0;i<response.length;i++)
    	{
    		pid=response[i].PatientId;
    	 	patient_details();	
    		
    	 string=`<tr>
    	    <td>${response[i].record_id}</td>
    	    <td>${response[i].PatientId}</td>
    	    <td>${response[i].DoctorId}</td>
    	 	<td>${gender}</td>
    	 	<td>${age}</td>
    	    <td>${response[i].description}</td>
    	    <td>${response[i].prescription}</td>
    	    <td>${response[i].encounter_time}</td>
    	    <td>${response[i].location}</td>
    	  </tr>`
    		 $(string).appendTo('#table');
    	}
    	
    	
    	//alert(localStorage.doctor_id);
    	
    	//document.getElementById('doctor').innerHTML=data[0].DoctorId;
    },
    error: function (request, status, error) {
		alert("Something's fishy");
    }
});


function patient_details(){
	$.ajax({
	    type : 'GET',
	    url: 'http://localhost:3000/api/Patient/'+pid,
	    dataType: 'json',
	    async: false,
	    
	    success: function (response){
	    	
			gender=response.gender;
			age=response.age;
	    	//alert(localStorage.doctor_id);
	    	
	    	//document.getElementById('doctor').innerHTML=data[0].DoctorId;
	    },
	    error: function (request, status, error) {
			alert("Something's fishy");
	    }
	});
}

function signout(){
	localStorage.clear();
	window.location="http://localhost:8080/MedicalEHR/loginA.html";
	return false;
}



</script>
  </body>
</html>
