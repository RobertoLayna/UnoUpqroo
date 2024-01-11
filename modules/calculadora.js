//Realizar un codigo en el cual se
//defina una funcion que realize una suma recibiendo 2 numeros
//y retorne el resultado (return result)
function suma (a,b){
    var result = a + b;
    return result
}

var resultF=suma(5,6)
function resta(a,b) {
    var result = a - b;
    return result 
}

resultF=resta(resultF,3)
function multiplicacion(a,b) {
    var result = a * b;
    return result 
}

resultF = multiplicacion(resultF,3);
function divi(a,b) {
    var result = a / b;
    return result 
}
console.log(divi(resultF,3))