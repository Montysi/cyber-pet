console.log("hello world");

// Get the progress bar elements
const healthValue = document.getElementById("health-value");
const hungerValue = document.getElementById("hunger-value");
const thirstValue = document.getElementById("thirst-value");
const happinessValue = document.getElementById("happiness-value");

const healthProgress = document.querySelector(".health-progress");
const hungerProgress = document.querySelector(".hunger-progress");
const thirstProgress = document.querySelector(".thirst-progress");
const happinessProgress = document.querySelector(".happiness-progress");

// Update get everytime Animal method runs.
const updateStats = (animal) => {
  healthValue.textContent = animal.health;
  hungerValue.textContent = animal.hunger;
  thirstValue.textContent = animal.thirst;
  happinessValue.textContent = animal.happiness;

  healthProgress.style.width = `${animal.health}%`;
  healthProgress.textContent = `${animal.health}`;

  hungerProgress.style.width = `${animal.hunger}%`;
  hungerProgress.textContent = `${animal.hunger}`;

  thirstProgress.style.width = `${animal.thirst}%`;
  thirstProgress.textContent = `${animal.thirst}`;

  happinessProgress.style.width = `${animal.happiness}%`;
  happinessProgress.textContent = `${animal.happiness}`;
};

class Animal {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.hunger = 100;
    this.thirst = 100;
    this.happiness = 100;

    this.startHungerThirstDecay();
    this.startHappinessDecay();
    this.startHealthDecay();
    updateStats(this);
  }

  giveDrink() {
    this.health += 5;
    this.thirst += 20;
    this.happiness += 5;
    console.log(
      `${this.name} drank some water. ${this.name}'s health is ${this.health}`
    );
    updateStats(this);
    return this;
  }

  feed() {
    this.health += 5;
    this.hunger += 20;
    this.happiness += 5;
    console.log(
      `${this.name} ate some food. ${this.name}'s health is ${this.health}`
    );
    updateStats(this);
    return this;
  }

  stats() {
    return console.table({
      name: this.name,
      health: this.health,
      hunger: this.hunger,
      thirst: this.thirst,
      happiness: this.happiness,
    });
  }

  startHungerThirstDecay() {
    this.hungerThirstDecayInterval = setInterval(() => {
      this.decreaseHungerThirst();
    }, 5000);
  }

  decreaseHungerThirst() {
    if (this.hunger > 0) {
      this.hunger -= 5;
    }
    if (this.thirst > 0) {
      this.thirst -= 8; // animals can live longer without food than water, thirst decreases faster to reflect this
    }
    updateStats(this);
  }

  startHappinessDecay() {
    this.happinessDecayInterval = setInterval(() => {
      this.decreaseHappiness();
    }, 5000);
  }

  decreaseHappiness() {
    if (this.happiness > 0) {
      this.happiness -= 5;
    }
    updateStats(this);
  }

  startHealthDecay() {
    this.healthDecayInterval = setInterval(() => {
      this.decreaseHealth();
    }, 5000);
  }

  decreaseHealth() {
    if (this.hunger <= 50) {
      this.health -= 5;
    }
    if (this.thirst <= 50) {
      this.health -= 5;
    }
    updateStats(this);
  }
}

// Dog subclass
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  playFetch() {
    this.health += 10;
    this.hunger -= 10;
    this.happiness += 20;
    console.log(
      `${this.name} and you played a game of fetch! ${this.name} seems happier!`
    );
    updateStats(this);
    return this;
  }

  goForWalk() {
    this.health += 10;
    this.hunger -= 10;
    this.happiness += 10;
    console.log(`${this.name} enjoyed their walk and seems happier!`);
    updateStats(this);
    return this;
  }
}

// Cat subclass
class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  haveNap() {
    this.health += 15;
    this.hunger -= 5;
    this.thirst -= 5;
    this.happiness += 5;
    console.log(`${this.name} had a quick cat-nap and seems refreshed!`);
    updateStats(this);
    return this;
  }

  scratchPost() {
    this.health += 10;
    this.hunger -= 10;
    this.thirst -= 10;
    this.happiness += 20;
    console.log(
      `${this.name} had a good scratch on their scratching post and seems content!`
    );
    updateStats(this);
    return this;
  }
}

const showButtons = (pet) => {
  // Need to add links for buttons

  if (pet instanceof Dog) {
    dynamicBtn1.querySelector(".dynamic-label-1").textContent = "Walk";
    dynamicBtn2.querySelector(".dynamic-label-2").textContent = "Fetch";
    dynamicBtn1.onclick = () => {
      pet.goForWalk();
      updateStats(pet);
    };
    dynamicBtn2.onclick = () => {
      pet.playFetch();
      updateStats(pet);
    };
  } else if (pet instanceof Cat) {
    dynamicBtn1.querySelector(".dynamic-label-1").textContent = "Nap";
    dynamicBtn2.querySelector(".dynamic-label-2").textContent = "Scratch";
    dynamicBtn1.onclick = () => {
      pet.haveNap();
      updateStats(pet);
    };
    dynamicBtn2.onclick = () => {
      pet.scratchPost();
      updateStats(pet);
    };
  }
};

// Need Buttons for Feed and Give Drink

feedBtn.addEventListener("click", () => {
  pet.feed();
  updateStats(pet);
});

giveDrinkBtn.addEventListener("click", () => {
  pet.giveDrink();
  updateStats(pet);
});

// Create a pet instance for testing
const pet = new Cat("Whiskers");
updateStats(pet);
showButtons(pet); // Show buttons based on animal type

const gameOver = () => {
  if (pet.health <= 0) {
    clearInterval(timer);
    console.log(`${pet.name} has died!`);
  } else if (pet.hunger <= 0) {
    clearInterval(timer);
    console.log(`${pet.name} has starved to death!`);
  } else if (pet.happiness <= 0) {
    clearInterval(timer);
    console.log(`${pet.name} ran away...`);
  } else if (pet.hunger <= 0 && pet.happiness <= 0) {
    clearInterval(timer);
    console.log(`${pet.name} ran away from home and later starved to death...`);
  }
};
