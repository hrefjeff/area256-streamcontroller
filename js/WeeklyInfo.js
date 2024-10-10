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
			
			//Not sure why this is needed but it seems to keep things aligned
			TweenMax.set('#leftWrapper',{css:{y: adjust2}}); //sets scoreboard text wrappers to match placement of 2nd webm
			TweenMax.set('#rightWrapper',{css:{y: adjust2}});
						
			getData(); //runs function that sets data polled from json into html objects
			startup = false; //flags that the scoreboard/getData functions have run their first pass
			animated = true; //flags that the scoreboard video animation has run
		}
		else{
			getData(); //if startup is not set to true, only the getData function is run each time scoreboard function runs
		}
	}
	
	setTimeout(scoreboard,300);
	
	function getData(){
		
		var p1Name = scObj['WeeklyName']; //creates local variables to store data parsed from json
		var p2Name = scObj['WeeklyNumber'];
		
		if(startup == true){
			
			TweenMax.set('#p1Wrapper',{css:{x: p1Move}}); //sets name/round wrappers to starting positions for them to animate from
			TweenMax.set('#p2Wrapper',{css:{x: p2Move}});
			
			$('#p1Name').html(p1Name); //changes html object values to values stored in local variables
			$('#p2Name').html(p2Name);

			p1Wrap.each(function(i, p1Wrap){ //function to resize font if text string is too long and causes div to overflow its width/height boundaries
				while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p1Wrap).css('font-size', newFontSize);
				}
			});
			
			p2Wrap.each(function(i, p2Wrap){
				while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
					var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
					$(p2Wrap).css('font-size', newFontSize);
				}
			});
						
			TweenMax.to('#p1Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay}); //animates wrappers traveling back to default css positions while
			TweenMax.to('#p2Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay}); //fading them in, timing/delay based on variables set in scoreboard.html
		}
		else{
			game = scObj['game']; //if this is after the first time that getData function has run, changes the value of the local game variable to current json output
			
			if($('#p1Name').text() != p1Name){ //if either name or team do not match, fades out wrapper and updates them both
				TweenMax.to('#p1Wrapper',.3,{css:{x: p1Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){ //uses onComplete parameter to execute function after TweenMax
					$('#p1Wrapper').css('font-size',nameSize); //restores default font size based on variable set in scoreboard.html
					$('#p1Name').html(p1Name); //updates name and team html objects with current json values

					p1Wrap.each(function(i, p1Wrap){//same resize functions from above
						while(p1Wrap.scrollWidth > p1Wrap.offsetWidth || p1Wrap.scrollHeight > p1Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p1Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p1Wrap).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#p1Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2}); //fades name wrapper back in while moving to original position
				}});
			}
			
			if($('#p2Name').text() != p2Name){
				TweenMax.to('#p2Wrapper',.3,{css:{x: p2Move, opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
					$('#p2Wrapper').css('font-size',nameSize);
					$('#p2Name').html(p2Name);
			
					p2Wrap.each(function(i, p2Wrap){
						while(p2Wrap.scrollWidth > p2Wrap.offsetWidth || p2Wrap.scrollHeight > p2Wrap.offsetHeight){
							var newFontSize = (parseFloat($(p2Wrap).css('font-size').slice(0,-2)) * .95) + 'px';
							$(p2Wrap).css('font-size', newFontSize);
						}
					});
					
					TweenMax.to('#p2Wrapper',.3,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:.2});
				}});
			}
					
			if(gameHold != game){ //checks to see if current json value for 'game' has changed from what is stored in gameHold html object
				 //then execute function
					gameHold = game; //updates gameHold html object with new game dropdown value
				};
			}
		}
	}