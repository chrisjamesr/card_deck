class Card {
 constructor(name, suit, value){
    this.name = name
    this.suit = suit
    this.value = value
  }  
}

function makeDeck(){
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const names = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  return class Deck{  
    constructor(){
      this.stack = suits.reduce((acc, suit, i, arr)=>{
        let n = 2
        return acc.concat(names.map(name=> new Card(name, suit, n++))) 
      },[])
    }
      
    cut(x){
     return (/*this.stack = */ 
        !!x ? [...this.stack.slice(x), ...this.stack.slice(0,x)] 
          : this.stack
       )
    }


    }  
  }
}
  
const Deck = new makeDeck()
module.exports = new Deck();

//     SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"]
//     NAMES = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"]
  
//   def initialize()
//     @deck = []

//   end

//   def make_deck
//     SUITS.each do |suit|
//       n = 0
//       NAMES.each do |name|
//         n+=1
//         @deck.push( Card.new(suit: suit, name: name, value: n) )
//       end
//     end
//     @deck
//   end  

//   def shuffle_deck
//     show_deck.shuffle
//   end
// end  # End of Class
  
// class Game

//   def initialize
//     @deck = Deck.new
//     @deck.make_deck
//   end

//   def shuffle_deck

//   end

// end

