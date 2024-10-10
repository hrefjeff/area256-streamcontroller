window.onload = init;

function init(){
	
	var xhr = new XMLHttpRequest(); //AJAX data request sent to server(in this case server being local json file)
	var streamJSON = '../sc/streamcontrol.json'; //specifies path for streamcontrol output json
	var scObj; //variable to hold data extracted from parsed json
	var startup = true; //flag for if looping functions are on their first pass or not
	var animated = false; //flag for if scoreboard animation has run or not
	var cBust = 0; //variable to hold cache busting value
	var game; //variable to hold game value from streamcontrol dropdown
	var p1Wrap = $('#p1Wrapper'); //variables to shortcut copypasting text resize functions
	var p2Wrap = $('#p2Wrapper');
	var gameHold;
	
	xhr.overrideMimeType('application/json'); //explicitly declares that json should always be processed as a json filetype
	
	function pollJSON() {
		xhr.open('GET',streamJSON+'?v='+cBust,true); //string query-style cache busting, forces non-cached new version of json to be opened each time
		xhr.send();
		cBust++;		
	}
	
	pollJSON();
	setInterval(function(){pollJSON();},500); //runs polling function twice per second
	
	xhr.onreadystatechange = parseJSON; //runs parseJSON function every time XMLHttpRequest ready state changes
	
	function parseJSON() {
		if(xhr.readyState === 4){ //loads data from json into scObj variable each time that XMLHttpRequest ready state reports back as '4'(successful)
			scObj = JSON.parse(xhr.responseText);
			if(animated == true){
				scoreboard(); //runs scoreboard function each time readyState reports back as 4 as long as it has already run once and changed animated value to false
			}
		}
	}
	
	function scoreboard(){
		
		if(startup == true){
			game = scObj['game'];
			gameHold = game; //sets 'game' value into placeholder div
			getData(); //runs function that sets data polled from json into html objects
		}
		else{
			getData(); //if startup is not set to true, only the getData function is run each time scoreboard function runs
		}
	}
	
	setTimeout(scoreboard,300);
	
	function getData(){
		
		var p1Name = scObj['WeeklyBracket']; //creates local variables to store data parsed from json
		
		if(startup == true){
			location.href = 'p1Name';
		
		}
		else{
			game = scObj['game']; //if this is after the first time that getData function has run, changes the value of the local game variable to current json output
			location.href = 'p1Name';

			if(gameHold != game){ //checks to see if current json value for 'game' has changed from what is stored in gameHold html object
				 //then execute function
					gameHold = game; //updates gameHold html object with new game dropdown value
				};
			}
		}
	}