var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: "http://www.twitch.tv/directory/all",
	attachTo: "top",
	contentScriptFile: [data.url("jquery-1.11.0.js"),
						data.url("testscript.js")]
});

//SIMPLE STORAGE
var ss = require("sdk/simple-storage");
if(!ss.storage.blacklist){
	ss.storage.blacklist = [];
}
//ss.storage.blacklist.push("test");

