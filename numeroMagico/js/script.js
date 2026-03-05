const formulario = document.getElementById('teclado');
const valorNumero = document.getElementById('input-numero');
const reiniciarBtn = document.getElementById('reiniciar-juego-btn');
const indicadorCantidadIntentos = document.getElementById('indicador-numero-intentos');
const indicadorPista = document.getElementById('indicador-de-pista');
const contenedorEstado = document.getElementById('contenedor-estado-juego');
const indicadorEstadoJuego = document.getElementById('indicador-estado-juego');
const contenedorIntentos = document.getElementById('lista');
const botonIngresar = document.querySelector('#boton-ingresar');

//función para generar el numero
function generarRandom(tamaño){
    return Math.floor(Math.random()*tamaño)+1;
}

//variables globales para el funcionamiento
let contador =10;
let num=generarRandom(100);
let imagen;

//boton para reiniciar el juego
reiniciarBtn.addEventListener("click", ()=>{
    contador =10;
    indicadorCantidadIntentos.innerText='10';
    num=generarRandom(100);    
    if(contenedorEstado.classList.contains('activo')){
        contenedorEstado.classList.remove('activo');
        indicadorEstadoJuego.innerText='';
    }
    if (imagen) {
        imagen.remove();
        imagen = null; 
    }
    indicadorPista.innerText='';
    valorNumero.value='';
    contenedorIntentos.innerHTML='';
    botonIngresar.disabled=false;

    
});


//función para invocar el metodo de juego
formulario.addEventListener("submit", (e)=>{
    //importante
    e.preventDefault();
    if(parseInt(valorNumero.value)<0 || parseInt(valorNumero.value)>100){
        alert('debe ingresar un número entre 1-100 en la casilla');
    }else{
        if(valorNumero.value.trim()!==''){
            juego();
        }else{
            alert('debe ingresar un número en la casilla');
        } 
    }
   
});

//añadimos un elemento a la lista, el cual es el historial de juego
function crearLi(valorIngresado, textoIntento, textoPista){
    const nuevoElemento = document.createElement('li');
    nuevoElemento.innerText = textoIntento + valorIngresado + ' y su pista: '+textoPista;
    contenedorIntentos.appendChild(nuevoElemento);
}

//reglas del juego
function juego(){
    
    //ojo con el parseo, los inputs regresan texto
    let valorIngresado = parseInt( valorNumero.value);
    let pista='';

    contador--;
    indicadorCantidadIntentos.innerText=contador;
    //jugamos si aún tenemos "vidas"
    if(contador>0){

        if(valorIngresado === num){
            indicadorEstadoJuego.innerText='NICEEEEE, felicidades bro.';
            contenedorEstado.classList.add('activo');
            botonIngresar.disabled = true;
            pista='Lo conseguiste.'
        }else{
            if(valorIngresado<num){
                pista= 'El número es mayor que: ';
            }
            if(valorIngresado>num){
                pista= 'El número es menor que: ';
            }
            indicadorPista.innerText=pista;
        }
        crearLi(valorIngresado,'su intento fue: ', pista);
    }

    //si se acabaron los intentos y no acertó
    if(contador===0 && valorIngresado!==num){
        indicadorEstadoJuego.innerText='Muy buen intento, era el '+num;
        contenedorEstado.classList.toggle('activo');
        botonIngresar.disabled = true;
    }

    //limpiamos el input (opcional, pero para comidad del usuario se pone)
    valorNumero.value='';

}

