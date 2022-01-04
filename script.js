let order = [];
let clickedOrder = [];
let score = 0;
let mute = false;
let lives = 3

//0 - verde: Dó
//1 - vermelho: Ré
//2 - amarelo: Mi
//3 - azul: Fá

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        playSound(element.classList);
        element.classList.add('selected');
    }, number-250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number-1);
}

let executeSequence = ()=>{
    for (i in order){
        lightColor(order[i], Number(i));
    }
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    let correctOrder = true;
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            tryAgain();
            correctOrder = false;
            break;
        }
    }
    if ((clickedOrder.length == order.length) & (correctOrder)) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    playSound(createColorElement(color).classList);
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;
    lives = 3;

    document.getElementById('live1').src = "images/lives.png";
    document.getElementById('live2').src = "images/lives.png";
    document.getElementById('live3').src = "images/lives.png";


    nextLevel();
}

//Função que executa o audio de cada botão
function playSound(filename){
    var audio = new Audio('sounds/'+filename+'.wav');
    
    if (!mute)
        audio.play();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Remove ou retorna o audio do jogo
let muting = () => {
    mute = !mute;

    if(mute){
        document.getElementById('mute').src = 'images/mute.png';
        document.getElementById('mute').title = 'Retornar som';
    }        
    else{
        document.getElementById('mute').src = 'images/unmute.png';
        document.getElementById('mute').title = 'Remover som';
    } 
}

//funcao para game over
let tryAgain = () => {
    lives--;
    document.getElementById('live'+(lives+1)).src = "images/heartbroken.png";
    if (lives > 0){
        if (lives > 1)
            alert(`Você ainda tem mais ${lives} vidas. Continue tentando!`);  
        else
            alert('Essa é a sua última chance. Concentre-se bem!');  

        clickedOrder = [];
        for(let i in order) {
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor, Number(i) + 1);
        }

    }else{
        gameOver();
    }
}

//inicio do jogo
playGame();