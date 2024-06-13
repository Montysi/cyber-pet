


const gameOver = () => {
    if (pet.health <= 0) {
        clearInterval (timer)
        alert(`${this.name} has died!`)
    } 
    else if (pet.hunger <= 0) {
        clearInterval (timer)
        alert(`${this.name} has starved to death!`)
    }
    else if (pet.happiness <= 0) {
        clearInterval (timer)
        alert(`${this.name} ran away...`)
    }
};


timer = setInterval(() => {
    pet.health -=5
    pet.hunger -=5
    pet.happiness -=5
}, 2000);

console.log(timer)