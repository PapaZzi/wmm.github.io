function check() 
{
	var username  =document.getElementById("user").value;
	var password = document.getElementById("pass").value;

	if(username==1 &&  password ==1)
	{
		alert("Welcome,"+ username+"!");
		return true;
	}else{
		alert("Your username or password is invalid");
		return false;
	}
}

function up() 
{
alert("You have signed up successfully! Welcome to Discover.com!");
}