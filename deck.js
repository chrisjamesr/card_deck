class Card {
 constructor(name, suit, value){
    this.name = name
    this.suit = suit
    this.value = value
  }  
}

function makeDeck(){
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  return class Deck{  
    constructor(){
      this.stack = suits.reduce((acc, suit, i, arr)=>{
        let n = 2
        return acc.concat(names.map(name=> new Card(name, suit, n++))) 
      },[])
    }
    shuffle(){
      return compose(shuffleOneToOne, rejoin, reverseOne, trisect)(this.stack)
    }

    show(){
      return this.stack.forEach(card=> console.log(`${card.name} of ${card.suit}`))
    }
  }
}
 
const Deck = new makeDeck()
module.exports = new Deck();