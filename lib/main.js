//DELETE AFTER DEVELOPMENT
if (require("sdk/system").staticArgs.disableStrict) {
  require("sdk/preferences/service").set("javascript.options.strict", false);
}

var data = require("sdk/self").data;

//PAGE MOD
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	include: "http://www.twitch.tv/directory/all",
	attachTo: "top",
	contentScriptFile: [data.url("jquery-1.11.0.js"),
						data.url("filter.js")],
	contentScriptWhen: 'ready', //ensures script will filter before user sees channel list
	onAttach: function(worker){
		worker.port.emit("init", list);
	}
});

//WIDGET
var widget = require("sdk/widget")
widget.Widget({
  id: "mozilla-icon",
  label: "twitch-filter",
  contentURL: "http://www.mozilla.org/favicon.ico"
});

//CONTEXT MENU
var cm = require("sdk/context-menu")
var item1 = cm.Item({
	label: 'Blacklist Game',
	data: 'Blacklist Game',
	contentScriptFile: [data.url("jquery-1.11.0.js"),
						data.url("blacklist.js")],
	onMessage: function(gameName){
		addToBlacklist('games', gameName);
	},
})
var item2 = cm.Item({
	label: 'Blacklist Channel',
	data: 'Blacklist Channel',
	contentScriptFile: [data.url("jquery-1.11.0.js"),
						data.url("blacklist.js")],
	onMessage: function(channelName){
		addToBlacklist('channels', channelName);
	}
});		
var item3 = cm.Item({
	label: 'Whitelist Channel',
	data: 'Whitelist Channel',
	contentScriptFile: [data.url("jquery-1.11.0.js"),
						data.url("blacklist.js")],
	onMessage: function(channelName){
		addToBlacklist('whitelist', channelName);
	}
});					
cm.Menu({
	label: 'Twitch Filter',
	context: cm.SelectorContext(".stream", ".item"),
	items: [item1, item2, item3]
});

//SIMPLE STORAGE
var ss = require("sdk/simple-storage");
//ss.storage.blacklist = null;
if(!ss.storage.blacklist){
	ss.storage.blacklist = {
		'channels': [], //set of channels to be blacklisted
		'games': [], //set of games to be blacklisted
		'whitelist': [] //set of channels to be whitelisted
	};
}
var list = ss.storage.blacklist;

/*
	addToBlacklist()
	Check if blacklist item already exists and pushes to list if it doesnt. 
	Applies for whitelists too

	listType: type of listitem to check either:
		-Channels
		-Game Name
		-Whitelisted Channels
	listItem: the string to be compared
*/
function addToBlacklist(listType, listItem){
	if(listItem !== null){
		if(list[listType].indexOf(listItem) === -1){
			list[listType].push(listItem);
			console.log(listItem + " added to " + listType + " array");
		}
	}
}


