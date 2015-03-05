// ===== Model =====

function Die() {
  this.value = 0;
}

Die.prototype.roll = function() {
  this.value = Math.floor((Math.random()*6)+1);
}

function Game() {
  this.dice = [];
}

Game.prototype.addDie = function() {
  this.dice.push(new Die());
}

Game.prototype.rollDice = function() {
  for (var i = 0; i < this.dice.length; i++) {
    this.dice[i].roll();
  }
}
// clearDice is by setting the array empty again.
Game.prototype.clearDice = function() {
  this.dice = [];
}

// ===== View =====

function View() {
}

View.prototype.addDie = function() {
  $('.dice').append('<div class="die">0</div>');
}

View.prototype.drawDice = function(dice) {
  $('.die').each(function draw(i, element) {
    $(element).text(dice[i].value);
  });
}

View.prototype.clearDice = function() {
  $('.dice .die').remove();
}

// ===== Controller =====
// Controller calls methods of both model and view.
function Controller(model, view) {
  this.model = model;
  this.view = view;
}

Controller.prototype.addDie = function() {
  this.model.addDie();
  this.view.addDie();
}

Controller.prototype.rollDice = function() {
  this.model.rollDice();
  this.view.drawDice(this.model.dice);
}

Controller.prototype.clearDice = function() {
  this.model.clearDice();
  this.view.clearDice();
}

Controller.prototype.addEventHandlers = function() {
  $('.add').on('click', this.addDie.bind(this));
  $('.roll').on('click', this.rollDice.bind(this));
  $('.clear').on('click', this.clearDice.bind(this));
}
/* This is another way of using event handler.
Controller.prototype.addEventHandlers = function() {
  //_this, self, that
  // 1. var self = this
  // self.addDie()
  // 2. .bind(this)
  var self = this
  $('.add').on('click', function() {
    self.addDie();
  });

  $('.roll').on('click', function() {
    self.rollDice();
  });

  $('.clear').on('click', function() {
    self.clearDice();
  });
}
*/

$(document).ready (function() {
  app = new Controller(new Game(), new View());
  app.addEventHandlers()
});