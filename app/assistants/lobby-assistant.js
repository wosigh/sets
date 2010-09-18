function LobbyAssistant() {
	this.menuModel = {
		visible: true,
		items: [ { label: "Help", command: 'do-help' } ]
	}
}

LobbyAssistant.prototype.setup = function() {
	
	this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
	
	this.elementNewGame = this.controller.get("buttonNewGame");
	this.elementRules = this.controller.get("buttonRules");
	this.elementScoreboard = this.controller.get("buttonScoreboard");
	
	this.controller.setupWidget(
		"buttonNewGame",
        this.attributes = {},
        this.model = {
			label : "New Game",
			disabled: false
		}
	);
	
	this.controller.setupWidget(
		"buttonRules",
        this.attributes = {},
        this.model = {
			label : "Rules",
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
	
	this.pressedNewGame = this.pressedNewGame.bindAsEventListener(this);
	this.pressedRules = this.pressedRules.bindAsEventListener(this);
	this.pressedScoreboard = this.pressedScoreboard.bindAsEventListener(this);
	
	Mojo.Event.listen(this.elementNewGame, Mojo.Event.tap, this.pressedNewGame);
	Mojo.Event.listen(this.elementRules, Mojo.Event.tap, this.pressedRules);
	Mojo.Event.listen(this.elementScoreboard, Mojo.Event.tap, this.pressedScoreboard);
	
};

LobbyAssistant.prototype.pressedNewGame = function(event) {
	Mojo.Controller.stageController.pushScene("game");
};

LobbyAssistant.prototype.pressedRules = function(event) {
	Mojo.Controller.stageController.pushScene("rules");
};

LobbyAssistant.prototype.pressedScoreboard = function(event) {
	Mojo.Controller.stageController.pushScene("scoreboard");
};

LobbyAssistant.prototype.activate = function(event) {
};

LobbyAssistant.prototype.deactivate = function(event) {
};

LobbyAssistant.prototype.cleanup = function(event) {
};

LobbyAssistant.prototype.handleCommand = function(event) {
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'do-help':
				this.controller.stageController.pushAppSupportInfoScene();
				break;				
		}
	}
}