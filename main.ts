let renderDiv = document.getElementById("render")
const FPS = 60;
//const palette = "Ñ@#W$9876543210?!abc;:+=-,._             ";
const palette = "@%#*+=-:.  "
let camera: MediaStream;
let portrait: boolean = window.innerHeight > window.innerWidth;
let rgb = portrait;
let aspect = 16/9;
const mn = 64;
let width = portrait ? mn /2 : Math.floor(mn * aspect);
let height = portrait ? Math.floor(mn /2* aspect) : mn;

console.log("width: ", width);
console.log("height: ", height);


let snap = document.createElement("video");
snap["autoplay"] = true;
//@ts-ignore
//let snap: HTMLVideoElement = document.getElementById("snap");
let canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
//@ts-ignore
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.id = "snapper"
//document.body.appendChild(canvas);

async function setup()
{
    camera = await navigator.mediaDevices.getUserMedia({video: { facingMode: "user" }})
    snap.srcObject = camera;

    interval = setInterval(render, 1000 / FPS)
}
async function render()
{
    //@ts-ignore
    renderDiv?.innerHTML = "";
    


    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(snap, 0, 0, width, height);
    let image = ctx.getImageData(0, 0, width, height);
    let txt = "";
    for (let i = 0; i < height; i++)
    {
        
        for (let j = 0; j < width; j++)
        {
            let r = image.data[j*4 + i*width*4 + 0];
            let g = image.data[j*4 + i*width*4 + 1];
            let b = image.data[j*4 + i*width*4 + 2];

            let value = Math.floor((r * 0.3 + g * 0.59 + b * 0.11))//Math.floor((r+g+b)/3)//
            let ratio = palette.length/255
            let idx = palette.length - Math.floor(value * ratio);
            idx = Math.max(0, Math.min(idx, palette.length-1))
            let c = palette[idx];
            txt += (c === ' ') ? '&nbsp' : rgb ? `<span style="color: rgb(${r}, ${g}, ${b})">${c}</span>` : c;
        }
        txt += '<br>'
    }
    //@ts-ignore
    renderDiv?.innerHTML = txt;
}
let interval;
setTimeout(setup, 10)