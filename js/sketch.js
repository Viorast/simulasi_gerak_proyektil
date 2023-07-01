function setup() {
    angleMode(DEGREES); // Memasukan sudut
    setBoundary();
    createCanvas(size.w, size.h);
    setValue();
}

function update() {
    balls.forEach(ball => ball.update());        

}

function draw() {
    // background('#0D1117');
    background('#c3c9d4');

    GUIS[interface]();
}

function mouseWheel(event) {
    const maxScale = 6; // Skala maksimum
    const minScale = 2 // Skala minimum

    // Scroll mouse
    if (event.deltaY > 0) {
        scale /= 1.1; // down
        if (scale < minScale){
            scale = minScale; //Mengatur skala menjadi Minscale jika melebihi minimum
        }

    }
    else if (event.deltaY < 0){
        scale *= 1.1; // up
        if(scale > maxScale){
            scale = maxScale //Mengatur skala menjadi MaxScale jika melebihi maksimum
        }
    } 
}

let xGrid = 0; // Angle x size
let interface = 'projectile'; // interface
let size; // Screensize
let base = 50; // Skala perbesaran
let scale = 4; // Skala
let boundary; // margin(batas)
// let balls = [new Ball({ isDrag: true, pathColor: '#AB5E9D' }), new Ball()];
let balls = [new Ball(), new Ball()];
let GUIS = {
    projectile() {
        axis();
        balls.forEach(ball => ball.draw());
    }
};


