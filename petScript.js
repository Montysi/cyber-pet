console.log("hello world")

// for testing, can remove later
const dogBtn = document.getElementById("testDog")
const catBtn = document.getElementById("testCat")



tugBtn = document.getElementById("");
fetchBtn = document.getElementById("");
napBtn = document.getElementById("");
scratchBtn = document.getElementById("");

// eventlistener test
dogBtn.addEventListener("click", () => {
  alert("this is a dog")
})

catBtn.addEventListener("click", () => {
  alert("this is a cat");
});

// pet interaction buttons

feedBtn.addEventListener("click", () => {
  Animal.feed();
});

giveDrinkBtn.addEventListener("click", () => {
  Animal.giveDrink();
});

//dog buttons

goForWalkBtn.addEventListener("click", () => {
  Dog.tug();
});

playFetchBtn.addEventListener("click", () => {
  Dog.playFetch();
});

//cat buttons

haveNapBtn.addEventListener("click", () => {
  Cat.haveNnap();
});

scratchPostBtn.addEventListener("click", () => {
  Cat.scratchPost();
});

const gameOver = () => {
  if (Animal.health <= 0) {
    clearInterval(timer);
    console.log(`${this.name} has died!`);
  } else if (Animal.hunger <= 0) {
    clearInterval(timer);
    console.log(`${this.name} has starved to death!`);
  } else if (Animal.happiness <= 0) {
    clearInterval(timer);
    console.log(`${this.name} ran away...`);
  } else if (Animal.hunger <= 0 && pet.happiness <= 0) {
    clearInterval(timer);
    console.log(
      `${this.name} ran away from home and later starved to death...`
    );
  }
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
  }
  giveDrink() {
    this.health += 5;
    this.thirst += 20;
    this.happiness += 5;
    console.log(
      `${this.name} drank some water. ${this.name}'s health is ${this.health}`
    );
    return this;
  }

  feed() {
    this.health += 5;
    this.hunger += 20;
    this.happiness += 5;
    console.log(
      `${this.name} ate some food. ${this.name}'s health is ${this.health}`
    );
    return this;
  }

  stats() {
    return console.table({
      name: this.name,
      health: this.health,
      hunger: this.hunger,
      this: this.thirst,
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
      this.thirst -= 8; // animals can live longer without food then water, thirst decreases faster to reflect this
    }
  }

  startHappinessDecay() {
    this.happinessDecayInterval = setInterval(() => {
      this.decreaseHappiness();
    }, 5000)
  }

  decreaseHappiness() {
    if(this.happiness > 0) {
      this.happiness -= 5;
    }
  }

  startHealthDecay() {
    this.healthDecayInterval = setInterval(() => {
      this.decreaseHealth();
    }, 5000)
  }

  decreaseHealth() {
    if (this.hunger <= 50) {
      this.health -= 5;
    }
    if (this.thirst <= 50) {
      this.health -= 5;
    }
  };
    
}

//dog subclass
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  playFetch() {
    this.health += 10;
    this.hunger -= 10;
    this.happiness + 20;
    console.log(
      `${this.name} and you played a game of fetch! ${this.name} seems happier!`
    );
    return this;
  }

  goForWalk() {
    this.health += 10;
    this.hunger -= 10;
    this.happiness + 10;
    console.log(`${this.name} enjoyed their walk and seems happier!`);
    return this;
  }
}

// cat subclass
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
    return this;
  }
}
