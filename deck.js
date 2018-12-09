class Card {
  constructor(name, suit, value) {
    this.name = name
    this.suit = suit
    this.value = value
  }
}

function makeDeck() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  function shuffleDeck(stackArray) {
    let m = stackArray.length;
    let i, t;    
    while(m) {
        i = Math.floor(Math.random() * m--);        
        t = stackArray[m];
        stackArray[m] = array[i];
        stackArray[i] = t
    }
    return stackArray
  }

  function cutDeck(arr){
    return x => {
      x = x || Math.ceil(arr.length/2);
      return [...arr.slice(x), ...arr.slice(0,x)]
    }
  }

  return function Deck() {
    this.stack = suits.reduce((acc, suit, i, arr)=>{
        let n = 2
        return acc.concat(names.map(name=> new Card(name, suit, n++))) 
      },[])
     
    const shuffle = () => {
      this.stack = shuffleDeck(this.stack)
      return this
    }
    
    const cut = (x) => {
      this.stack = cutDeck(this.stack)(x)  
      return this
    }

    const show = () => {
      return this.stack.forEach(c=> console.log(`${c.name} of ${c.suit}`))
    }
    return {
        show, shuffle, cut
    }
  }
}

const Deck = new makeDeck()
module.exports = new Deck



