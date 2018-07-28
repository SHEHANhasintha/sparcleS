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

// Event Listeners
/*addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})*/



let objects = [];
let sparcles = [];

function rendomVel(){
    var vel = Math.floor(Math.random()) === 0 ? -Math.random()*2 : Math.random()*2;
    return vel;
}

//sparcles
function Sparcles(x,y,radius,color,velx,vely,dy =1){
    this.x = x;
    this.y = y;
    this.raidus = radius;
    this.color = color;
    this.velx = velx;
    this.vely = vely;
    this.dy = dy;
}

Sparcles.prototype.update = function(){
    this.vely += this.dy;
    this.x += this.velx;
    this.y += this.vely;

    if (this.x + this.radius > canvas.width){
        this.x = canvas.width;
        this.velx = -this.velx;
    }else if(this.x - this.radius < 0){
        this.x = 0;
        this.velx = -this.velx;
    }

    if (this.y + this.radius > canvas.width){
        this.y = canvas.height;
        this.vely = -this.vely;
    }else if(this.y - this.radius < 0){
        this.y = 0;
        this.vely = -this.vely;
    }

}






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
            for (var i=0;i<10;i++){
                var spark = new Sparcles(
                        this.x,
                        this.y,
                        '#aaa',
                        rendomVel(),
                        rendomVel()
                    )
                sparcles.push(spark)
            }
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

Sparcles.prototype.draw = function() {
    sparcles.forEach(object =>{
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

    for (let i = 0; i < 5; i++) {
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
    sparcles.forEach(object => {
            object.update();
            object.draw();
    });
}

init()
animate()
