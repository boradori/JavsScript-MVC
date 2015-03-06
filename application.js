// ===== Model =====

function Die() { // Make a Die function as an object
  this.value = 0; // First, set the value of a Die as 0.
}

Die.prototype.roll = function() { // roll is an attribute of Die function using prototype.
  this.value = Math.floor((Math.random()*6)+1); // Math.floor() returns the largest integer less than or equal to a given number.
} // Math.random() gives decimal number between 0 and 1. I multiplied it by 6 to get 6 random values between 0 and 5.
// In order to make it from 1 to 6, I had to add 1. Line 8 provides a random number between 1 and 6.

function Game() { // This is a Game object
  this.dice = []; // Make an empty array to contain Die objects.
}

Game.prototype.addDie = function() { // addDie function pushes Die objects into dice array.
  this.dice.push(new Die());
}

Game.prototype.rollDice = function() { // rollDice function iterates through dice array to roll all Die objects within the array.
  for (var i = 0; i < this.dice.length; i++) {
    this.dice[i].roll(); // roll is a method of Die function.
  }
}
// clearDice clears dice array by setting it an empty array again.
Game.prototype.clearDice = function() {
  this.dice = [];
}

// ===== View =====

function View() { // Make a View function as an Object
}

View.prototype.addDie = function() { // addDie function appends class die (with a string of 0) to class dice.
  $('.dice').append('<div class="die">0</div>');
}

View.prototype.drawDice = function(dice) {
  $('.die').each(function draw(i, element) { // Iterates through die classes with function draw
    $(element).text(dice[i].value); // with the index of i, this line sets text content for all elements as the value of Die inside of dice array.
  });
}

View.prototype.clearDice = function() {
  $('.dice .die').remove(); // Removes dice class and die class from the view.
}

// ===== Controller =====

function Controller(model, view) { // Controller function contains 2 parameters, model and view.
  this.model = model; // This is equivalent to Game object.
  this.view = view; // This is equivalent to View object.
}

Controller.prototype.addDie = function() { // addDie in Controller is simply calling addDie function of Game(model) and View.
  this.model.addDie(); // adds Die in the background.
  this.view.addDie(); // adds Die in the front.
}

Controller.prototype.rollDice = function() { // rollDice in Controller is calling rollDice function of Game and drawDice of View.
  this.model.rollDice(); // rolls dice in the background meaning this line changes the value of dice in the background.
  this.view.drawDice(this.model.dice); // rolls dice in the front by using value data from the background.
} // The parameter this.model.dice is dice parameter on line 39.

Controller.prototype.clearDice = function() { //clearDice in Controller is simply calling clearDice function of Game(model) and View.
  this.model.clearDice(); // clears dice array in the background.
  this.view.clearDice(); // clears dice in the front.
}

Controller.prototype.addEventHandlers = function() { // Event Handler is essential to run the functions using HTML.
  $('.add').on('click', this.addDie.bind(this)); // on click event runs addDie function by clicking add button.
  $('.roll').on('click', this.rollDice.bind(this)); // on click event runs rollDice function by clicking roll button.
  $('.clear').on('click', this.clearDice.bind(this)); // on click event runs clearDice function by clicking clear button.
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
  app = new Controller(new Game(), new View()); // Instantiate Controller object
  app.addEventHandlers() // runs event handlers.
});

// There is a problem in this code. It gives value of 0 when adding a new Die.