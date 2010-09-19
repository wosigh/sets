function ScoreboardAssistant() {
	this.menuModel = {
		visible: true,
		items: [ { label: "Help", command: 'do-help' } ]
	}
}

ScoreboardAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
	
	this.controller.setupWidget("highscores",
        this.attributes = {
            itemTemplate: "scoreboard/highscore-row",
            swipeToDelete: false,
            renderLimit: 10,
            reorderable: false
        },
        this.model = {
			listTitle: "Scoreboard",
            items: prefs.get().scores
        }
    );
	
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