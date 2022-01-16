let front = "card_front";
let back = "card_back";
const CARD = "card";
const ICON = "icon";
let count = 0;

startGame();

function startGame(){
    initializeCards(game.createCards());
}

function initializeCards(cards){
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    game.cards.forEach((card) =>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContent(card,cardElement);

        cardElement.addEventListener('click',flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card,cardElement){
    createCardFace(front,card,cardElement);
    createCardFace(back,card,cardElement);
}

function createCardFace(face,card,element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face == front){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON)
        iconElement.src = "./images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    
    
    if(game.setCard(this.id)){
        this.classList.add('flip');
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    console.log("GAME OVER")
                    
                    let gameOverLayer = document.getElementById("gameover")
                    gameOverLayer.style.display = 'flex';
            }
        } else{
            setTimeout(()=> {
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id)

            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            game.unflipCards();
        },900)}
    }
    }
    
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameover")
    gameOverLayer.style.display = 'none';
    count = 0;
    document.getElementById("moves").innerHTML = "Movimentos: " + count
}