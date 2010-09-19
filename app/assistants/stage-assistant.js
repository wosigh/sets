var prefs =	new preferenceCookie();

function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	Mojo.Controller.stageController.pushScene("lobby");
};
