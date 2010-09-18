function RulesAssistant() {
	this.menuModel = {
		visible: true,
		items: [ { label: "Help", command: 'do-help' } ]
	}
}

RulesAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
};

RulesAssistant.prototype.activate = function(event) {
};

RulesAssistant.prototype.deactivate = function(event) {
};

RulesAssistant.prototype.cleanup = function(event) {
};

RulesAssistant.prototype.handleCommand = function(event) {
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'do-help':
				this.controller.stageController.pushAppSupportInfoScene();
				break;				
		}
	}
}