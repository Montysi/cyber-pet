let pet = {
  name: "Fluffy",
  health: 20,
  hunger: 20,
  happiness: 20,
};

const gameOver = () => {
  if (pet.health <= 0) {
    clearInterval(timer);
    console.log(`${this.name} has died!`);
  } else if (pet.hunger <= 0) {
    clearInterval(timer);
    console.log(`${this.name} has starved to death!`);
  } else if (pet.happiness <= 0) {
    clearInterval(timer);
    console.log(`${this.name} ran away...`);
  } else if (pet.hunger <= 0 && pet.happiness <= 0) {
    clearInterval(timer);
    console.log(`${this.name} ran away from home and later starved to death...`)
  } 
};

timer = setInterval(() => {
  pet.health -= 5;
  pet.hunger -= 5;
  pet.happiness -= 5;
  gameOver();
}, 2000);

console.log(timer);

// let threshold = 20; 

// let timer = setInterval(() => {
//   if (pet.hunger > 0) {
//     pet.hunger -= 5;
//   }

//   if (pet.hunger < threshold) {
//     pet.health -= 5;
//   }

//   pet.happiness -= 5;
//   gameOver(); 
// }, 2000);

//dog buttons

tugBtn = document.getElementById("");

tugBtn.addEventListener("click", () => {
    pet.tug()
});

fetchBtn = document.getElementById("");

fetchBtn.addEventListener("click", () => {
    pet.fetch()
});

//cat buttons

napBtn = document.getElementById("");

napBtn.addEventListener("click", () => {
    pet.nap()
});

scratchBtn = document.getElementById("");

scratchBtn.addEventListener("click", () => {
    pet.scratch()
});