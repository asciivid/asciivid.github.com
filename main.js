var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var renderDiv = document.getElementById("render");
var FPS = 60;
//const palette = "Ñ@#W$9876543210?!abc;:+=-,._             ";
var palette = "@%#*+=-:.  ";
var camera;
var portrait = window.innerHeight > window.innerWidth;
var rgb = portrait;
var aspect = 16 / 9;
var mn = 64;
var width = portrait ? mn / 2 : Math.floor(mn * aspect);
var height = portrait ? Math.floor(mn / 2 * aspect) : mn;
console.log("width: ", width);
console.log("height: ", height);
var snap = document.createElement("video");
snap["autoplay"] = true;
//@ts-ignore
//let snap: HTMLVideoElement = document.getElementById("snap");
var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
//@ts-ignore
var ctx = canvas.getContext("2d");
canvas.id = "snapper";
//document.body.appendChild(canvas);
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })];
                case 1:
                    camera = _a.sent();
                    snap.srcObject = camera;
                    interval = setInterval(render, 1000 / FPS);
                    return [2 /*return*/];
            }
        });
    });
}
function render() {
    return __awaiter(this, void 0, void 0, function () {
        var image, txt, i, j, r, g, b, value, ratio, idx, c;
        return __generator(this, function (_a) {
            //@ts-ignore
            renderDiv === null || renderDiv === void 0 ? void 0 : renderDiv.innerHTML = "";
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(snap, 0, 0, width, height);
            image = ctx.getImageData(0, 0, width, height);
            txt = "";
            for (i = 0; i < height; i++) {
                for (j = 0; j < width; j++) {
                    r = image.data[j * 4 + i * width * 4 + 0];
                    g = image.data[j * 4 + i * width * 4 + 1];
                    b = image.data[j * 4 + i * width * 4 + 2];
                    value = Math.floor((r * 0.3 + g * 0.59 + b * 0.11)) //Math.floor((r+g+b)/3)//
                    ;
                    ratio = palette.length / 255;
                    idx = palette.length - Math.floor(value * ratio);
                    idx = Math.max(0, Math.min(idx, palette.length - 1));
                    c = palette[idx];
                    txt += (c === ' ') ? '&nbsp' : rgb ? "<span style=\"color: rgb(" + r + ", " + g + ", " + b + ")\">" + c + "</span>" : c;
                }
                txt += '<br>';
            }
            //@ts-ignore
            renderDiv === null || renderDiv === void 0 ? void 0 : renderDiv.innerHTML = txt;
            return [2 /*return*/];
        });
    });
}
var interval;
setTimeout(setup, 10);
