function GameAssistant() {
	this.DECK_SIZE = 81;
	this.deck = [];
	this.board_cards = [];
	this.board_colors = [];
	this.cards_on_table = 0;
	this.selected = [];
	this.selected_i = [];
	this.game_over = false;
	this.sets_found = 0;
	this.cardElements = [];
	this.timerid = 0;
	this.timing_data = [];
	this.tstart = 0;
}

GameAssistant.prototype.display = function() {
    for(i = 0; i < 18; i++) {
        if(this.board_cards[i] == null) {
            this.cardElements[i].src = "images/cards/blank.gif";
            this.cardElements[i].style.borderColor = "white";
        }
        else {
            this.cardElements[i].src = "images/cards/" + this.board_cards[i] + ".gif";
            this.cardElements[i].style.borderColor = this.board_colors[i];
        }
    }
	document.getElementById("setsfound").innerHTML = "sets found: " + this.sets_found + "</b>";
}

GameAssistant.prototype.rand = function(n) {
    return ( Math.floor ( Math.random ( ) * n + 1 ) );
}

GameAssistant.prototype.reshuffle = function() {
    for(i = 0; i < 18; i++) {
        if(this.board[i] != null)
            this.deck.push(this.board[i].num);
    }
    this.deck = this.shuffle(this.deck);
    this.deal12();
}

GameAssistant.prototype.more_cards = function() {
	if(this.cards_on_table == 18) {
		this.reshuffle();
		this.display();
		return;
	}    
	c = 0;
	for(i = 0; i < 18; i++) {
		if(this.board_cards[i] == null) {
			this.board_cards[i] = this.getTopCard();
			c++;
		}
		if(c == 3) {
			this.display();
		}
	}
}

GameAssistant.prototype.is_set = function(test) {
	if(test[0] == null || test[1] == null || test[2] == null)
		return false;
	for(a = 0; a < 4; a++) {
		sum = 0;
		for(c = 0; c < 3; c++) {
			if(a == 0) {
				sum += ((test[c]-1) % 3);
			} else if(a == 1) {
				sum += (parseInt((test[c]-1)/3) % 3);
			} else if(a == 2) {
				sum += (parseInt((test[c]-1)/9) % 3);
			} else {
				sum += (parseInt((test[c]-1)/27) % 3);
			}
		}            
		if(sum != 0 && sum != 3 && sum != 6) {
			return false;
		}
	}
	return test[0] != test[1];
}

GameAssistant.prototype.check_for_sets = function() {
	for(i = 0; i < 18; i++) {
		if(this.board_cards[i] == null) continue;
		for(j = i; j < 18; j++) {
			if(this.board_cards[j] == null) continue;
			for(k = j; k < 18; k++) {
				if(this.board_cards[k] == null) continue;
				if(this.is_set([this.board_cards[i], this.board_cards[j], this.board_cards[k]]))
					return;
			}
		}
	}
	if(this.deck.length > 0) {
		if(!this.game_over) {
			this.more_cards();
			this.check_for_sets();
		}
		this.display();
	} else {
		this.game_over = true;
	}
}

GameAssistant.prototype.getTopCard = function() {
	if(this.deck.length == 0) return null;
	this.cards_on_table++;
	return this.deck.pop();
}

GameAssistant.prototype.deal12 = function() {
    this.cards_on_table = 0;
    for(i = 0; i < 18; i++) {
        this.board_cards[i] = null;
        this.board_colors[i] = "black";
    }
	for(i = 0; i < 12; i++) {
		this.board_cards[i] = this.getTopCard();
	}
}

GameAssistant.prototype.shuffle = function(cards) {
	for (i = cards.length-1; i > 0; i--) {
		n = this.rand(i);
		x = cards[i];
		cards[i] = cards[n-1];
		cards[n-1] = x;
    } 
    return cards;
}

GameAssistant.prototype.select = function(event, id) {
	if(this.board_cards[id] == null)
		return;
	for(i = 0; i < this.selected_i.length; i++) {
		if(id == this.selected_i[i]) {
			for(j = i; j < this.selected_i.length - 1; j++) {
				this.selected_i[j] = this.selected_i[j+1];
				this.selected[j] = this.selected[j+1];
			}
			this.board_colors[id] = "black";
			this.selected_i.pop();
			this.selected.pop();
			this.display();
			return;
		}
	}
	// Select
	this.selected_i.push(id);
	this.board_colors[id] = "yellow";
	this.selected.push(this.board_cards[id]);
	if(this.selected.length == 3) {
		if(this.is_set(this.selected)) {
			this.timing_data_add(this.selected);
            this.sets_found++;
			for(i = 0; i < 3; i++) {
				this.board_cards[this.selected_i[i]] = null;
			}
			this.cards_on_table -= 3;
			if(this.cards_on_table < 12)
				this.more_cards(); 
			this.check_for_sets();
		}
		for(i = 0; i < 3; i++)
			this.board_colors[this.selected_i[i]] = "black";
		this.selected = [];
		this.selected_i = [];
	}
	this.display();
}

GameAssistant.prototype.pad = function(i) {
	if(i < 10) return "0" + i;
	else return i;
}
 
GameAssistant.prototype.start_timer = function() {
	var self = this;
    this.timerid = setInterval(function() { self.timer(); }, 100);
}
 
GameAssistant.prototype.stop_timer = function() {
    clearInterval(this.timerid);
}

GameAssistant.prototype.timer = function() {
	alert("########################### TIMER ###############################");
	if (!this.tstart) {
		this.tstart = new Date();
		//ajax_init();
	}
	this.tdate = new Date();
	tdiff = this.tdate.getTime() - this.tstart.getTime();
    this.tdate.setTime(tdiff);
    this.controller.get('timer').innerHTML =
		"<b>" + 
		this.pad(this.tdate.getMinutes()) + ":" +
		this.pad(this.tdate.getSeconds()) + "." +
		parseInt(this.tdate.getMilliseconds()/100) +
		"</b>";
    if(this.game_over) {
        this.stop_timer();
        //document.form.time.value = tdiff;
        //ajax_check_hs(tdiff);
	}
}
 
GameAssistant.prototype.numerical = function(a,b) {
	return a - b;
}
 
GameAssistant.prototype.timing_data_add = function(selected) {
	this.tdate = (new Date()).getTime() - this.tstart.getTime();
	this.timing_data.push({'s' : selected.sort(this.numerical), 't' : this.tdate});
}

GameAssistant.prototype.setup = function() {
	for (i = 0; i < 18; i++) {
		this.cardElements[i] = this.controller.get('card_image' + i);
		this.controller.listen(this.cardElements[i], Mojo.Event.tap, this.select.bindAsEventListener(this, i));
	}
	for(i = 1; i <= this.DECK_SIZE; i++) {
		this.deck[i-1] = i;
	}
	this.deck = this.shuffle(this.deck);
	this.deal12();
	this.check_for_sets();
	this.display();
	this.start_timer();
};

GameAssistant.prototype.activate = function(event) {
};

GameAssistant.prototype.deactivate = function(event) {
};

GameAssistant.prototype.cleanup = function(event) {
	this.stop_timer();
};
