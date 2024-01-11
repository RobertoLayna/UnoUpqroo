console.log("Hola mundo!")

var num1 = [];
let num2 ={};
const num3 ="dddd";

for(var count = 0; count< 3; count++){
    console.log("Hola: ", count)
}

var count = 0
while (count<3) {
    console.log("Hola 2:", count)
    count ++
}

count = 0
do {
    console.log("Hola 3:"+ count)
    count ++
}while(count<3)

if(num1>num2) {
    console.log("Hola num1 es mayor");
}