// ==UserScript==
// @name        Dorpen Hernoemen
// @namespace   kc-productions.org
// @version     1
// @include		https://*.tribalwars.*/game.php?*screen=overview_villages*
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
		var name = prompt("Geef een naam op voor je dorpen", "Dorpsnaam");
		if (confirm("Wenst u een nummering toe te voegen aan de dorpsnamen?")) {
		    var numbering = true;
		} else {
		    var numbering = false;
		}
		
		setName(name + " ");
		var villages = document.getElementsByClassName("quickedit-vn");
		//Iterate over all villages
		var start = "/game.php?village=";
		var end = "&screen=main";
		var length = villages.length;
		//Iterate over all villages
		var i = 1;
		var j = 0;
		alert("25 Tabladen worden geopend, gelieve enkel op enter te drukken. Tabladen sluiten zichzelf eenmaal de naam gewijzigd is. Druk op OK om het proces te starten.")
		while(i<length+1){
			var mid = villages[i-1].getAttribute("data-id");
			var bet = start.concat(mid);
			var res = bet.concat(end);
			//Set change on other page to true
			sessionStorage.setItem("change", 1);
			var str = "" + i;
			//Amount of numbers needed
			var pad = "00000";
			//Create index
			var index = pad.substring(0, pad.length - str.length) + str;
			//Give through index to other tab
			
			if(numbering){
				sessionStorage.setItem("index", index);
			}
			else{
				var neg = -1;
				sessionStorage.setItem("index", neg);
			}
			
			//Open village
			var newwindow = window.open(res);
		//	if(j==0){
		//		var firstwindow = window.open(res);
		//	}
		//	else{
		//		var newwindow = window.open(res);
		//	}
			if(i==length){
				newwindow.focus();
			}
			j+=1;
			i+=1;
			if(j>=25){
				j=0;
				newwindow.focus();
		//		while(!firstwindow.closed){
		//			//Do Nothing
		//			}
				alert("Klik op OK om 25 nieuwe dorpen te openen, gelieve wel eerst de openstaande tabladen af te werken om het blokkeren van de browser te voorkomen!")
			}
			
			}
		}
		
		//MAIN
		var content = document.getElementById('content_value'); 
		var btn = document.createElement("BUTTON");        // Create a <button> element 
		var t = document.createTextNode("Hernoem Dorpen!");       // Create a text node 
		btn.onclick = renameVillages; 
		btn.appendChild(t);
		content.appendChild(btn);
    }
    else{
    	//SCREEN MAIN
    	var content = document.getElementById('content_value'); 
    	var toKeep = content.innerHTML;

    	//Is script active?
    	if(sessionStorage.getItem("change") != null){
    	//Get index
    	var index = sessionStorage.getItem("index");
    	//Get name
    	var name = sessionStorage.getItem("name");
    	if(index>0){
    		var newname = name.concat(index);
    		//var newname = "met nummering"
    	}
    	else{
    		var newname = name;
    		//var newname = "zonder nummering";
    	}
    	var inputs = document.getElementsByTagName('input');

    	//Find right textbox
    	var i = 0;
    	while (i<inputs.length){
    		if(inputs[i].type == "text"){
    			//var tekstvak = inputs[i];
    			//inputs.remove(i);
    			inputs[i].value=newname;
    			i +=1;
    		}
    		else if(inputs[i].type =="submit"){
    			var button = inputs[i];
    			i+=1
    		}
    		else{
    			i += 1;
    		}
    	}
    	sessionStorage.setItem("close", 1);
    	sessionStorage.removeItem("change");
    	button.focus();
    	}
    	else{
    		if(sessionStorage.getItem("close")==1){
    			sessionStorage.removeItem("close");
    			close();
    		}
    	}
    }
});
