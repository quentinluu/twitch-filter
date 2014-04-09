self.on("click", function(node,data){
	var currNode = $(node);
	//set current node to proper div
	while(currNode.attr('class') !== 'thumb js-var-height'){
		currNode = currNode.parent();
	}

	//find game/channel to blacklist/whitelist based on context menu item
	if(data === 'Blacklist Game'){
		var gameName = currNode.find(".boxart").attr('href');
		self.postMessage(gameName);
	}else if(data === 'Blacklist Channel'){
		var channelName = currNode.find(".cap").attr('href');
		self.postMessage(channelName);
	}else if(data === 'Whitelist Channel'){
		var channelName = currNode.find(".cap").attr('href');
		self.postMessage(channelName);		
	}
})