'use strict';

function ieee754aBinario(numero) {
    var signo, ebinario, dbinario, exponente,mantisa, divisor, multiplicador; // Declaro las variables
    var numeroEntero,entero, numeroDecimal,decimal, numeroTotal, parteEntero, parteDecimal; // Declaro mas variables
    var finalSigno, finalExponente, finalMantisa; //Declaro variables a mostrar en el resultado.

    //Funcion para comprobar el signo
    function Signo (numero){
        signo = (Math.sign(numero)===1) ? 0 : 1; // Obtengo el signo.
        return signo;
    }

    //Almaceno en la variable finalSigno el signo del numero.
    finalSigno = Signo(numero);


    //Funcion que comprueba si el numero es negativo. En caso de ser negativo lo convierte en positivo.
    function Number(numero){
        if(numero<0){
            numero = "" + Math.abs(numero);
        }
        return numero;
    }


    numeroTotal = Number(numero).split("."); //Divido el nº en 2: Nº entero por un lado y Nº decimal por otro lado.
    numeroEntero = numeroTotal[0];
    numeroDecimal = numeroTotal[1];
    


    //Funcion para convertir la parte entera a binario.
    function EnteroToBinario(numeroEntero){
        ebinario = ""; //Inicializo variable
        entero = parseInt(numeroEntero); //Convierto a formato number la cadena con el numero.
        do{   
        divisor = entero % 2; //Saco el resto
        ebinario = divisor + ebinario; //Voy acumulando el resto
        entero  /= 2; //Se divide entre 2
        entero = parseInt(entero); 
        }while (entero>=1); //Compara si al dividirse entre dos es menor que 1. Si es menor para el bucle y devuelve el nº en binario (los restos de las divisiones)
        return ebinario;
    } 

    //Funcion para convertir la parte decimal a binario.
    function DecimalToBinario(numeroDecimal){
        decimal = parseInt(numeroDecimal); //Convierto a formato number la cadena con el numero.
        if (decimal > 0){
            dbinario = ""; //Inicializo variable
            decimal = parseFloat("0." + decimal); //Le pongo al numero como parte entera un 0 y le convierto a float.
            multiplicador = decimal;

            do{
                multiplicador = "" + multiplicador * 2; //Multiplico el nº por 2
                numeroTotal =  multiplicador.split(".") ; //Separo la parte entera de la parte decimal
                multiplicador= "0." + numeroTotal[1] + "";    //Convierto el numero en decimal de nuevo
                multiplicador=parseFloat(multiplicador);

                dbinario = numeroTotal[0] + dbinario;
                if (dbinario.length > 8){
                    break;
                }
            }while (parseInt(numeroTotal[1]) > 0);
            return dbinario;
        }else{
            var vuelta = 0;
            return vuelta;
        }
    }

    //Transformo el numero entero a binario
    parteEntero = EnteroToBinario(numeroEntero); //Le otorgo a la variable numeroEntero el valor de la parte entera en binario.
    parteDecimal = DecimalToBinario(numeroDecimal);//Le otorgo a la variable numeroDecimal el valor de la parte decimal en binario.
    numeroTotal = parteEntero + parteDecimal;

    //Funcion para obtener el exponente del numero.
    function Exponente(numeroTotal){
        exponente = numeroTotal.substr(1).split("1").length-1; //Le quito el 1 bit a la cadena y empiezo a contar desde el primero "1"  
        exponente += 127; //Le sumo a las posiciones recorridas por la coma 127 y reescribo la variable exponente con el nuevo resultado.
        exponente = EnteroToBinario(exponente); //Paso el valor de exponente para que me lo convierta en binario y lo almaceno en exponente reescribiendo el valor.
        return exponente; 
    }

    //Funcion para obtener la mantisa del numero.
    function Mantisa(numeroTotal){
        mantisa = numeroTotal.substr(1); //Quito el 1º bit debido a que pertenece al exponente.
        mantisa = mantisa.padEnd(23,"0");  //Si la mantisa no llega a 23 numeros lo completo con 0.

        return mantisa;
    }
    
    //Almaceno en la variable finalExponente el valor del exponente.
    finalExponente = Exponente(numeroTotal);
    //Almaceno en la variable finalMantisa el valor de la mantisa.
    finalMantisa = Mantisa(numeroTotal);
    
    return finalSigno + finalExponente + finalMantisa;
}


