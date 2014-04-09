//Set blacklist and initialise mutation observer
var blacklist = [];
self.port.on("init", function(list){
	blacklist = list;
	init();
});

function init(){
	//START MUTATION OBSERVER CODE
	//target node to observe on
	var channelList = $("#directory-list").children(".streams-grid")
										.children(".js-streams");
	//Set up the mutation observer to watch out for new channels being loaded in.
	var observer = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			if(mutation.type === 'childList'){
				var nodeList = mutation.addedNodes;
				if(nodeList !== null){
					var $nodes = $(nodeList); //convert nodeList back to jquery
					$nodes.each(function(){
						//check to find proper div, if so send to be filtered
						if($(this).attr('id').indexOf('ember') !== -1){
							filterChannel($(this));
						}
					});
				}
			}
		});
	});
	//channelList is converted from Jquery to DOM node
	observer.observe(channelList[0], {
		attributes: true, 
		childList: true
	});
	//END MUTATION OBSERVER CODE	
console.log("GHDFIUGHFGHJOSGHSKF WHITELISTCHANNELS: " + blacklist['whitelist']);
console.log("GHDFIUGHFGHJOSGHSKF GAMES: " + blacklist['games']);
console.log("GHDFIUGHFGHJOSGHSKF CHANNELS: " + blacklist['channels']);
}

/*
	Finds the channel's title information
	Mark's the channel as 'whitelisted' if associated with a whitelist
	Hide's the channel if associated with blacklist.

	channel: a node containing information on a single channel
*/
function filterChannel(channel){
	//WHITELISTING CHANNELS
	var list = blacklist['whitelist'];
	var whitelist = false;
	if(list.length > 0){
		for(var i = 0; i < list.length ; i++){
			if(channel.find(".cap").attr('href') === list[i]){
				whitelist = true;
			}
		}
	}
	if(!whitelist){ //don't need to blacklist if channel aleady whitelisted
		//BLACKLISTING GAMES
		list = blacklist['games'];
		if(list.length > 0){
			for(var i = 0; i < list.length ; i++){
				if(channel.find(".boxart").attr('href') === list[i]){
					channel.hide();
				}
			}
		}
		//BLACKLISTING CHANNELS
		list = blacklist['channels'];
		if(list.length > 0){
			for(var i = 0; i < list.length ; i++){
				if(channel.find(".cap").attr('href') === list[i]){
					channel.hide();
				}
			}
		}
	}
}



