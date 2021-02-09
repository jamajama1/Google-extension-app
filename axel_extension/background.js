/*  Upon installation of the chrome extension, a key-value mapping 
 *  {first_time: 'true'} is stored in chrome's storage. We grab this stored
 *  object in "popup.js".
 */

chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({first_time: 'true'}, function(){
        console.log('Value is set to ' + true);
    });
    chrome.storage.sync.set({state: 'child'}, function(){
        console.log('State intialized to Child Mode');
    })
    chrome.storage.sync.set({'password':'initialpass'}, function(){
        console.log('Password intialized to: initialpass');
    });
    
    // (Alex) Initialize bad_words to empty array.
    //TODO: use a set, not an array.
    chrome.storage.sync.set({'bad_words': []});

    //(Aaron) Initialize bad_websites to empty array
    chrome.storage.sync.set({'bad_websites': []});


	//(Aaron) Initialize restictionList to empty array
	chrome.storage.sync.set({'restrictionWordList': []});

	//(Aaron) Initialize restictionList to empty array
	chrome.storage.sync.set({'restrictionWebsiteList': []});

	//saves restriction level
	chrome.storage.sync.set({'restrictionLevelSave': ' '},function(){});

	//set default person up
	chrome.storage.sync.set({'currentProfile': 'Default'},function(){});

	//(Aaron) Stores the profiles
	chrome.storage.sync.set({'profileList': []});

	//(Matthew) Initialize point_websites to empty array
	chrome.storage.sync.set({'point_websites': []});

    // (Alex) Initialize mode to child_view.

    chrome.storage.sync.set({'mode': 'child_view'}, function (){
        console.log('Mode initialized to "child_view"');
    });

	//(Matthew) Intialize the total number of points
	chrome.storage.sync.set({'pointTotal': 0},function(){
			console.log('Points Total is Now ' + 0);
		});
	
	//(Matthew) Holds the timer
	chrome.storage.sync.set({'Time':'No Timer'},function(){
			console.log('Time is Now ');
		});

	//(Matthew) Holds how long the websites are unlocked for
	chrome.storage.sync.set({'WebsiteTime': []},function(){
			console.log('Time is Now ');
		});

	
	chrome.storage.sync.set({'activity_log': []});

});
	
	//(Matthew) How many points it costs to unlock a website
	chrome.storage.sync.set({'WebsitePoints': []},function(){
			console.log('Points is now ');
		});

/*(Matthew)
This below function is used to recieve messages from the content script.
Points: 	When the greeting is Points it is used to add points to the users total points
Sub_Points: When the greeting is Sub_Points it is used to subtract points from the users total points.
Timer:		When the greeting is Timer it is used to send the expiration time to the user for unlocked websites
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "Points"){
	var points = 100;
	var storedPoints = 0;
	chrome.storage.sync.get(['pointTotal'], function(result){
          console.log('points grabbed is ' + result.pointTotal);
			storedPoints = result.pointTotal;
			storedPoints = storedPoints + points;
			chrome.storage.sync.set({'pointTotal':storedPoints},function(){
			console.log('Points Total is Now ' + storedPoints);
			});
			chrome.storage.sync.get(['pointTotal'], function(result){
          	console.log('points grabbed is ' + result.pointTotal);
         	});
         });
		}
	if(request.greeting == "Sub_Points"){
		var points = 2000;
		var storedPoints = 0;
	chrome.storage.sync.get(['pointTotal'], function(result){
          console.log('points grabbed is ' + result.pointTotal);
			storedPoints = result.pointTotal;
			storedPoints = storedPoints - points;
			chrome.storage.sync.set({'pointTotal':storedPoints},function(){
			console.log('Points Total is Now ' + storedPoints);
			});
			chrome.storage.sync.get(['pointTotal'], function(result){
          	console.log('points grabbed is ' + result.pointTotal);
         	});
         });
	}
  });

// ---------------------------------------------------------------------
// (Alex) BELOW IS NOT USED
// The function below tests some basic functionality of message passing.
// At first, I thought to implement mode changes and banned word changes
// via message passing.
// But then I realized that everything that doesn't need to be done
// immediately can be implemented via chrome.storage.
// If you want to implement message passing, feel free to use this
// as inspiration.
// An example of a good message passing use case is if we want to
// immediately notify each tab to refresh/update as soon as we change
// something.

/*
chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
		if (request.service == 'get_background_color') {
			sendResponse({color: 'green'})
		}
        }
)
*/
