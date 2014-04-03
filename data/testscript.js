$(document).ready(function(){
	//This list is the original set of channels that wont be picked up by the mutation observer
	var defaultList = $("#directory-list").children(".streams-grid")
										.children(".js-streams")
										.children("div[id*='ember']");
	
	//Filter the original set of channels
	defaultList.each(function(index){
		filterChannel($(this));
	})

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
});

/*
	Finds the channel's title information
	Hide's the channel if associated with blacklist.
*/
function filterChannel(channel){
	for(var i = 0; i < tempList.length ; i++){
		if(channel.find(".boxart").attr('title') === tempList[i]){
			channel.hide();
		}
	}
}

var tempList = [];
tempList.push('League of Legends');











