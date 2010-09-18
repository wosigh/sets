function LobbyAssistant() {
}

LobbyAssistant.prototype.setup = function() {
	
	this.controller.setupWidget(
		"buttonNewGame",
        this.attributes = {},
        this.model = {
			label : "New Game",
			disabled: false
		}
	);
	
	this.controller.setupWidget(
		"buttonScoreboard",
        this.attributes = {},
        this.model = {
			label : "Scoreboard",
			disabled: false
		}
	);
	
};

LobbyAssistant.prototype.activate = function(event) {
};

LobbyAssistant.prototype.deactivate = function(event) {
};

LobbyAssistant.prototype.cleanup = function(event) {
};
