let game = {
    lockMode:false,
    firstCard:null,
    secondCard:null,

    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0];
        if(card.flipped || this.lockMode){
            return false
        }
        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else{
            this.secondCard = card;
            this.secondCard.flipped = false;
            this.lockMode = true;
            return true;
        }
    },
    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        count ++;
        document.getElementById("moves").innerHTML = "Movimentos: " + count
        return this.firstCard.icon === this.secondCard.icon;
       
    },

    clearCards: function(){
        this.lockMode = false;
        this.firstCard = null;
        this.secondCard = null;
       
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        let flipedCards = document.querySelectorAll(".flip");
        return flipedCards.length == 20;

    },

    techCards :[
        "angular",
        "bootstrap",
        "css",
        "firebaseimg",
        "html",
        "js",
        "mongodb",
        "node",
        "react",
        "vue"
    ],

    cards:null,

    createCards: function(){
        this.cards = [];
        
         this.techCards.forEach((tech) => {
             this.cards.push(this.createPair(tech))
         })
         this.cards = this.cards.flatMap(pair => pair);
         this.shuffleCards();
         return this.cards
         
         
     },

    createPair: function(tech){
        return [{
            id:this.createID(tech),
            icon:tech,
            flipped:false,
        },
        {
            id:this.createID(tech),
            icon:tech,
            flipped:false,
        }]
    },

    createID: function(tech){
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards:function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        while(currentIndex != 0 ){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -- ;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex],this.cards[randomIndex]]
        }
    },
}