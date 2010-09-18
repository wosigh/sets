function ScoreboardAssistant() {
	this.menuModel = {
		visible: true,
		items: [ { label: "Help", command: 'do-help' } ]
	}
}

ScoreboardAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
};

ScoreboardAssistant.prototype.activate = function(event) {
};

ScoreboardAssistant.prototype.deactivate = function(event) {
};

ScoreboardAssistant.prototype.cleanup = function(event) {
};

ScoreboardAssistant.prototype.handleCommand = function(event) {
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'do-help':
				this.controller.stageController.pushAppSupportInfoScene();
				break;				
		}
	}
}