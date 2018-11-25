const arr = ((n=52)=> Array.from({length: n}, (value, key) => key) )();

// parameter: array of elements
// action: bisect array
// return: array of two equal length arrays 
const bisect = (arr) => [arr.slice(0,arr.length/2), arr.slice(arr.length/2)]

// parameter: array of elements
// action: divide array in 3
// return: array of three equal length arrays 
const trisect = (arr) =>[
        arr.slice(Math.floor(arr.length/3), Math.floor(arr.length/3)*2),
        arr.slice(0,Math.floor(arr.length/3)), 
        arr.slice(Math.floor(arr.length/3)*2)
    ]

const section = (sectionQuantity) =>[
        arr.slice(arr.length/sectionQuantity, arr.length/sectionQuantity*2),
        arr.slice(0,arr.length/sectionQuantity), 
        arr.slice(arr.length/sectionQuantity*2)
    ]    

// parameter: index, array
// action: split in 2 and combine in 1 to 1 array
// return: reordered array of elements
const shuffleOneToOne = (array) => {
  return array.reduce((acc, ele, i, a) => {
    acc[bisectAtIndex(i, a)] = ele
    return acc
  },[])
}

// parameter: index, array
// action: find distance from midpoint of array and return new index for shuffleOneToOne
// return: new index    
const bisectAtIndex= (index,array) => {
  return index > ((array.length-1)+(array.length%2))-array.length/2 ?   
    index - ((array.length-1+array.length%2)-index) : index+index 
}

// parameter: index
// action: modulo by 2
// return: boolean  
const isEven = (i) => i%2 ? false : true

// parameter: array of arrays
// action: reverses odd indexed arrays
// return: array of arrays
const reverseOne = (array) => {
  return array.map((arrayElement, i, arr) => {
    return i % 2 === 0 ? arrayElement.reverse() : arrayElement
  })
}
// parameter: array of arrays
// action: reverses odd indexed arrays
// return: array of arrays
const reverse = (arr) => arr.reduce((acc, ele, i)=> isEven(i.length) ? ele.reverse() : ele )

// parameters: array of arrays
// action: joins arrays into single array
// return: combined array    
const rejoin = (arr) => arr.reduce((acc,e)=>acc.concat(e))

// parameters: functions
// action: call functions in succession with result of previous call
// return: new function of composed functions
const compose=(...fns)=> (...args)=> fns.reduceRight((acc,fn)=> fn(acc), ...args)

// parameters: array
// action: find divisors for whole number result
// return: array of divisors

const cutBy = (arr) => {
    return arr.filter((ele, i, a)=> a.length % ele===0)
}

// parameters: array of divisors
// action: finds median divisor   
// return: median divisor

const cutAt = (divisorArr) => divisorArr[Math.ceil((divisorArr.length-1)/2)]   

const sectionQuantity = compose(cutAt, cutBy) 
/*
section deck -> 
find whole divisors -> 
find median divisor ->
shuffle each section
*/
// outerArray.map((ele,index) => {
//   return Array.from({length: arr.length/sectionQuantity(arr)},(e,i) => index * arr.length/sectionQuantity(arr) + index)
//     }
// )}
const sectionedArray = (x=sectionQuantity(arr)) => Array.from({length: x}, (ele, index) => { 
  return Array.from(
    {
      length: arr.length/x
    }, (e,i) => index * arr.length/x + i
  )
})

const applyFn = (fn) => {
  return array => {
    return array.reduce((acc, ele)=> fn(acc.concat(ele)))
  }
}

const shuffleAll = applyFn(shuffleOneToOne)
