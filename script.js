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

class Animal {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.hunger = 100;
    this.thirst = 100;
    this.happiness = 100;
    this.isGameRunning = true;

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
    this.updateStats();
  }

  feed() {
    this.health += 5;
    this.hunger += 20;
    this.happiness += 5;
    console.log(
      `${this.name} ate some food. ${this.name}'s health is ${this.health}`
    );
    this.updateStats();
  }

  updateStats() {
    healthValue.textContent = this.health;
    hungerValue.textContent = this.hunger;
    thirstValue.textContent = this.thirst;
    happinessValue.textContent = this.happiness;

    healthProgress.style.width = `${this.health}%`;
    hungerProgress.style.width = `${this.hunger}%`;
    thirstProgress.style.width = `${this.thirst}%`;
    happinessProgress.style.width = `${this.happiness}%`;
  }

  startHungerThirstDecay() {
    this.hungerThirstDecayInterval = setInterval(() => {
      if (this.isGameRunning) {
        this.hunger -= 5;
        this.thirst -= 8;

        if (this.hunger <= 0 || this.thirst <= 0) {
          this.isGameRunning = false;
          console.log(`${this.name} has died of hunger or thirst!`);
          clearInterval(this.hungerThirstDecayInterval);
          clearInterval(this.happinessDecayInterval);
          clearInterval(this.healthDecayInterval);
        }
        this.updateStats();
      }
    }, 2000);
  }

  startHappinessDecay() {
    this.happinessDecayInterval = setInterval(() => {
      if (this.isGameRunning) {
        this.happiness -= 5;

        if (this.happiness <= 0) {
          this.isGameRunning = false;
          console.log(`${this.name} has died of sadness!`);
          clearInterval(this.hungerThirstDecayInterval);
          clearInterval(this.happinessDecayInterval);
          clearInterval(this.healthDecayInterval);
        }
        this.updateStats();
      }
    }, 2000);
  }

  startHealthDecay() {
    this.healthDecayInterval = setInterval(() => {
      if (this.isGameRunning) {
        if (this.hunger <= 50) this.health -= 5;
        if (this.thirst <= 50) this.health -= 5;

        if (this.health <= 0) {
          this.isGameRunning = false;
          console.log(`${this.name} has died of poor health!`);
          clearInterval(this.hungerThirstDecayInterval);
          clearInterval(this.happinessDecayInterval);
          clearInterval(this.healthDecayInterval);
        }
        this.updateStats();
      }
    }, 2000);
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
  }

  goForWalk() {
    this.health += 10;
    this.hunger -= 10;
    this.happiness += 10;
    console.log(`${this.name} enjoyed their walk and seems happier!`);
    updateStats(this);
  }
}

// Cat subclass
class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  haveNap() {
    this.health = Math.min(this.health + 15, 100);
    this.hunger -= 5;
    this.thirst -= 5;
    this.happiness = Math.min(this.happiness + 15, 100);
    console.log(`${this.name} had a nap and is refreshed!`);
    updateStats(this);
  }

  scratchPost() {
    this.health = Math.min(this.health + 15, 100);
    this.hunger -= 10;
    this.thirst -= 10;
    this.happiness = Math.min(this.happiness + 15, 100);
    console.log(
      `${this.name} had a good scratch on their scratching post and seems content!`
    );
    updateStats(this);
  }
}

const showButtons = (pet) => {
  const dynamicBtn1 = document.getElementById("dynamicBtn1");
  const dynamicBtn2 = document.getElementById("dynamicBtn2");

  if (pet instanceof Dog) {
    dynamicBtn1.querySelector(".label").textContent = "Walk";
    dynamicBtn2.querySelector(".label").textContent = "Fetch";
    dynamicBtn1.onclick = () => pet.goForWalk();
    dynamicBtn2.onclick = () => pet.playFetch();
  } else if (pet instanceof Cat) {
    dynamicBtn1.querySelector(".label").textContent = "Nap";
    dynamicBtn2.querySelector(".label").textContent = "Scratch";
    dynamicBtn1.onclick = () => pet.haveNap();
    dynamicBtn2.onclick = () => pet.scratchPost();
  }
};

const gameOver = (pet) => {
  console.log(`Game over for ${pet.name}!`);
  clearInterval(pet.hungerThirstDecayInterval);
  clearInterval(pet.happinessDecayInterval);
  clearInterval(pet.healthDecayInterval);
};

document.getElementById("testDog").addEventListener("click", () => {
  const dog = new Dog("Rex");
  showButtons(dog);

  document.getElementById("feedBtn").onclick = () => dog.feed();
  document.getElementById("giveDrinkBtn").onclick = () => dog.giveDrink();
});

document.getElementById("testCat").addEventListener("click", () => {
  const cat = new Cat("Fluffy");
  showButtons(cat);

  document.getElementById("feedBtn").onclick = () => cat.feed();
  document.getElementById("giveDrinkBtn").onclick = () => cat.giveDrink();
});
