// ==UserScript==
// @name        Dorpen Hernoemen
// @namespace   http://wwww.kc-productions.org
// @namespace	https://github.com/twscripts/Dorpsnaam-Wijzigen
// @version     1.5
// @include	https://*.tribalwars.*/game.php?*screen=overview_villages&mode=combined
// @include	https://*.tribalwars.*/game.php?*screen=overview_villages&mode=prod
// @include	https://*.tribalwars.*/game.php?*screen=overview_villages
// @include     https://*.tribalwars.*/game.php?*screen=main*
// @grant       none
// ==/UserScript==


$(document).ready(function () {
    if(window.location.href.indexOf("screen=overview_villages") > -1) {
		//OVERVIEW SCREEN
		function setName(name){
			sessionStorage.setItem("name", name);
		}
		
		function renameVillages(){
			//Ask for name
		var name = prompt("Geef een naam op voor je dorpen", "Dorpsnaam");
			//Ask if they want numbering or not
		if (confirm("Wenst u een nummering toe te voegen aan de dorpsnamen?")) {
		    var numbering = true;
		} else {
		    var numbering = false;
		}
		if (confirm("Wenst u een willekeurig coordinaat toe te voegen aan de dorpsnamen?")) {
			var temp = 1;
			sessionStorage.setItem("coord", temp);
		} else {
			var temp = -1;
			sessionStorage.setItem("coord", temp);
		}
		//Add space between name and numbering
		setName(name + " ");
		var villages = document.getElementsByClassName("quickedit-vn");
		//Iterate over all villages
		var start = "/game.php?village=";
		var end = "&screen=main";
		var length = villages.length;
		//Iterate over all villages
		var i = 1;
		var j = 0;
		//Alert box, after pressing okay the process will start
		alert("25 Tabladen worden per keer geopend, gelieve te wachten. Tabladen sluiten zichzelf eenmaal de naam gewijzigd is. Druk op OK om het proces te starten.");
		while(i<length+1){
			//Get village ID and create link to it
			var mid = villages[i-1].getAttribute("data-id");
			var bet = start.concat(mid);
			var res = bet.concat(end);
			//Set change on other page to true, so script launches continues after opening the other window(s)
			sessionStorage.setItem("change", 1);
			//Set index for name
			var str = "" + i;
			//Amount of padding needed in index (5 zeros = 00010 or 00001)
			var pad = "00000";
			//Create index
			var index = pad.substring(0, pad.length - str.length) + str;
			//Pass through index to other tab		
			if(numbering){
				//Numbering is active pass through index for village
				sessionStorage.setItem("index", index);
			}
			else{
				//Numbering is inactive pass through minus one
				var neg = -1;
				sessionStorage.setItem("index", neg);
			}
			//Open village in new window
			var newwindow = window.open(res);
			j+=1;
			i+=1;
			//Check if 25 tabs have been opened
			if(j>=25){
				//If 25 are open, pause script and display alert to continue process later on with more than 25 tabs browser may become inresponsive
				j=0;
				alert("Klik op OK om 25 nieuwe dorpen te openen, gelieve wel eerst te wachten op het sluiten van de openstaande tabladen om het blokkeren van de browser te voorkomen!")
				}
			}
		}
		
		//MAIN, opens automatically when overview screen is opened
		var content = document.getElementById('content_value'); 
		var btn = document.createElement("BUTTON");
		//Create button that starts the process
		var t = document.createTextNode("Hernoem Dorpen!");
		btn.onclick = renameVillages; 
		btn.appendChild(t);
		//Append button to bottom of page
		content.appendChild(btn);
    }
    else
    {
    	//SCREEN == MAIN
	//Random number function in range (min - max)
    	function getRandomInt(min, max) 
	    {
    	    return Math.floor(Math.random() * (max - min + 1)) + min;
    	}
    	
    	var content = document.getElementById('content_value'); 
    	var toKeep = content.innerHTML;
    	//Is script active, does name need to be changed?
    	if(sessionStorage.getItem("change") != null)
	{
	    	//Get index
	    	var index = sessionStorage.getItem("index");
	    	//Get name
	    	var name = sessionStorage.getItem("name");
	    	//Check if numbering is active (index == -1 --> inactive)
	    	if(index>0)
		{
	    		var newname = name.concat(index);
	    	}
	    	else
		{
	    		var newname = name;
	    	}
	    	var coord = sessionStorage.getItem("coord");
	    	//Check if coord is active (coord == -1 --> inactive)
	    	if(coord>0)
		{
	    		var left = getRandomInt(100,999);
	    		var right = getRandomInt(100,999);
	    		var co = " (";
	    		co = co.concat(left);
	    		co = co + "|";
	    		co = co.concat(right);
	    		co = co + ")";
	    		//alert(co);
	    		var finalname = newname.concat(co);
	    	}
	    	else
		{
	    		var finalname = newname;
	    	}
	    	var inputs = document.getElementsByTagName('input');
	    	//Find right textbox and change its value to the new name and or number
	    	var i = 0;
	    	while (i<inputs.length)
		{
	    		//If textbox is found, change value and stop loop
	    		if(inputs[i].type == "text")
			{
	    			inputs[i].value=finalname;
	    			i += 1;
	    		}
	    		else if (inputs[i].type =="submit")
			{
	    			var button = inputs[i];
	    			i+=1
	    		}
	    		else
			{
	    			i += 1;
	    		}
	    	}
	    	//Name is changed, set close to active
	    	sessionStorage.setItem("close", 1);
	    	//Remove change active so script doesn't change name again!
	    	sessionStorage.removeItem("change");
	    	//Focus on submit butoon, enter key will submit form!
	    	button.click();
    	}
    	else
	{
    		//If village is already renamed, close current window, process done!
    		if(sessionStorage.getItem("close")==1)
		{
    			sessionStorage.removeItem("close");
    			close();
    		}
    	}
    }
});
