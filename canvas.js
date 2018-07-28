import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
})

let objects = [];





// Objects
function Object(x, y, radius, color,reduce) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.reduce = reduce;
}

Object.prototype.update = function() {
    //this.draw();
        if (this.radius >= 25){
            this.radius = 25;
            this.reduce = -this.reduce;
        }else if(this.radius <= 2){
            this.radius = 2;
            this.reduce = -this.reduce;
            this.x = (Math.random()*(canvas.width -this.radius*2)) + this.radius*2;
            this.y = (Math.random()*(canvas.height -this.radius*2)) + this.radius*2;
        }
        this.radius += this.reduce;


}

Object.prototype.draw = function() {
    objects.forEach(object =>{
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
        c.closePath()
    });
}




//let stars = [];
// Implementation

function init() {
    objects = [];

    for (let i = 0; i < 25; i++) {
        var radius =Math.random()*20 + 5;
        var ob = new Object(
                Math.random()*canvas.width + radius,
                Math.random()*canvas.height - radius,
                radius,
                '#FFF6E5',
                Math.random() + 0.5
                );
        objects.push(ob);
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = '#222';
    c.fillRect(0,0,canvas.width,canvas.height)
    c.fill();
    c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    objects.forEach(object => {
            object.update();
            object.draw();
    });

}

init()
animate()
