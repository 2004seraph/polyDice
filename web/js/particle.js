class Particle {
    constructor(p, x, y) {
        this.parent = p
        this.element = document.createElement("div")
        this.element.classList.add("bgparticle")
        this.element.style.left = x + "px"
        this.element.style.top = y + "px;"
        this.parent.appendChild(this.element)
    }
}

var bgParticles = []

let p = document.getElementById("particleBG")
for (let i = 0; i < 100; i++) {
    bgParticles.push(new Particle(p, Math.floor(Math.random() * window.innerWidth)), Math.floor(Math.random() * window.innerHeight))
}