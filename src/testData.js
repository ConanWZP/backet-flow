const date = new Date()

console.log(date.toLocaleTimeString())

console.log(date.toLocaleDateString())

console.log(Math.floor(Date.now()/1000)) // timestamp


console.log(new Date().toLocaleString())




console.log(Math.floor((new Date().getTime() - new Date().getTimezoneOffset()*60*1000)/1000))

console.log(new Date().getTimezoneOffset())