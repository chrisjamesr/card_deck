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
  const compose = (...fns) => (...args) => fns.reduceRight( (acc, fn) => fn(acc), ...args)
  const applyMap = fn => {
     return array => array.map(ele => fn(ele))
  } 
  const applyReduce = (fn) => {
    return array => {
      return array.reduce((acc, ele)=> fn(acc.concat(ele)))
    }
  }
  const rejoin = (arr) => arr.reduce((acc,e)=>acc.concat(e))
  
  function bisect(arr){
      return [arr.slice(0,arr.length/2), arr.slice(arr.length/2)]
  }
  // Accepts array of elements and shuffles one to one 
  function shuffleSelection(arr){  
    const shuffleOneToOne = (arr) => {
        return arr.reduce((acc, ele, i, a) => {
        acc[bisectAtIndex(i, a.length)] = ele
        return acc
        }, [])
    }
    const bisectAtIndex = (index, length = 52) => {
        return index > (length - 1 - (index % 2)) / 2 ?
        index - ((length-1+length%2)-index) : index + index
    }
    return shuffleOneToOne(arr)
  }
   
  //accepts array of arrays and reverses even indexed arrays
 
  function reverseSelected(arr){
    const reverseEvenIndexed = (arr) => {
        return arr.map((e, i) => i % 2 === 0 ? e.reverse() : e)
    }  
    return reverseEvenIndexed(arr) 
  }
  
  function shuffleEach(arr){
      return applyMap(shuffleSelection)(arr)
  }
  
  function combineAll(arr){
      return rejoin(arr)
  }
  
  function shuffleHalf(arr){
      return compose(bisect)(arr)
  }  

  const smallDivisor = (divisorArr) => divisorArr.find((e, i, a)=> e * a[i-1] > a[i+1])   
  const largeDivisor = (divisorArr) => divisorArr.find((e, i, a)=> e * a[i+1] > a[i+2])    

  function divideSections(sectionQuantityFunction){
    return function (arr){

      const divisorArray = (arr) => {
        return [...arr.keys()].filter((ele, i, a)=> {
            return a.length % i === 0
        })
      } 
      const sectionArray = (sectionQuantityFunction) => (array) => {
        const sections = sectionQuantityFunction(array)      
        return Array.from({length: sections}, (ele, index) => { 
          return Array.from(
            {
              length: array.length/sections
            }, (e,i) => array[index * array.length/sections + i]
          )
        })
     }     
    return sectionArray(compose(sectionQuantityFunction, divisorArray))(arr)
   }
  }
  
  const smallSections = divideSections(largeDivisor)
  const largeSections = divideSections(smallDivisor)
  
  function cutDeck(arr){
    return x => {
      x = x || Math.ceil(arr.length/2);
      return [...arr.slice(x), ...arr.slice(0,x)]
    }
  }
     
  function shuffleAll(arr){
     return compose(
        shuffleSelection, 
        combineAll,
        reverseSelected, 
        shuffleEach,
        largeSections,
        shuffleSelection,
        combineAll,
        reverseSelected, 
        shuffleEach, 
        smallSections, 
        shuffleSelection
        )(arr)
  }

  return function Deck() {
    this.stack = suits.reduce((acc, suit, i, arr)=>{
        let n = 2
        return acc.concat(names.map(name=> new Card(name, suit, n++))) 
      },[])
     
    const shuffle = () => {
      return this.stack = shuffleAll(this.stack)
    }
    
    const cut = (x) => {
      return this.stack = cutDeck(this.stack)(x)  
    }

    const show = () => {
      return this.stack
    }

    return {
        show, shuffle, cut
    }
  }
}

const Deck = new makeDeck()
