let resultados = 0;
let display = document.getElementById('display');
let operacion = '';

let Calculadora = {

    init: function () {

        function asignarFuncionesTeclas() {
            const teclas = document.getElementsByClassName('tecla');
            const estiloInicialTeclas123 = 'width: 76.98px; height: 67.91px;';
            const estiloInicialTeclaMas = 'width: 79px; height: 149.56px;';
            const estiloTeclaMasPresionada = 'width: 75px; height: 147.56px';
            const estiloInicialTeclasRestantes = 'width: 77.88px; height: 67.91px;';
            const estiloTeclaPresionada = 'width:73.88px; height: 65px;';

            for (let i = 0; i < teclas.length; i++) {
                if (teclas[i].id == '1' ||
                    teclas[i].id == '2' ||
                    teclas[i].id == '3') {
                    teclas[i].style = estiloInicialTeclas123;
                } else if (teclas[i].id == 'mas') {
                    teclas[i].style = estiloInicialTeclaMas;
                } else {
                    teclas[i].style = estiloInicialTeclasRestantes;
                }
                teclas[i].onmousedown = function (event) {
                    event.target.style = estiloTeclaPresionada;
                };
                teclas[i].onmouseup = function (event) {
                    event.target.style = estiloInicialTeclasRestantes;
                };

                if (!isNaN(teclas[i].id) || teclas[i].id === 'punto' || teclas[i].id === 'sign') {
                    teclas[i].onmouseup = function (event) {
                        event.target.style = estiloInicialTeclasRestantes;
                        mostrarCaracteresEnPantalla(teclas[i].id)
                    };
                }

                if (teclas[i].id === 'menos' ||
                    teclas[i].id === 'por' ||
                    teclas[i].id === 'dividido') {
                    teclas[i].onmouseup = function (event) {
                        realizarOperacionAritmetica(teclas[i].id);
                        event.target.style = estiloInicialTeclasRestantes;
                    }
                } else if (teclas[i].id === 'mas') {
                    teclas[i].onmouseup = function (event) {
                        realizarOperacionAritmetica(teclas[i].id);
                        event.target.style = estiloInicialTeclaMas;
                    }
                }
            }

            let teclaIgual = document.getElementById('igual')
            teclaIgual.onmouseup = function (event) {
                event.target.style = estiloInicialTeclasRestantes;
                mostrarResultados();
            };

            let botonOn = document.getElementById('on');
            botonOn.onmouseup = function (event) {
                event.target.style = estiloInicialTeclasRestantes;
                reiniciarFuncionalidad();
            };

            let teclaMas = document.getElementById('mas');
            teclaMas.onmousedown = function (event) {
                event.target.style = estiloTeclaMasPresionada;
            };
        };

        function mostrarCaracteresEnPantalla(teclaId) {
            if (display.innerHTML.length < 8) {
                if (!isNaN(teclaId)) {
                    if (!(display.innerHTML === '0' && teclaId === '0'))
                        display.innerHTML = display.innerHTML + teclaId;
                    if (!display.innerHTML.includes('0.0'))
                        display.innerHTML = Number(display.innerHTML); //Para quitar el 0 a la izquierda
                } else if (teclaId === 'punto') {
                    if (!display.innerHTML.includes('.'))
                        display.innerHTML = display.innerHTML + '.';
                } else if (teclaId === 'sign') {
                    if (!display.innerHTML.includes('-') && display.innerHTML !== '0')
                        display.innerHTML = '-' + display.innerHTML;
                    else
                        display.innerHTML = display.innerHTML.replace('-', '');
                }
            }
        }

        function realizarOperacionAritmetica(teclaId) { //operacionesAritmeticas(teclaId)
            let digitos = Number(display.innerHTML);
            let operacionAnterior = false;

            if (operacion !== '' && operacion !== 'igual' && operacion !== teclaId) {
                resultados = obtenerNuevoResultados(digitos);
                operacionAnterior = true;
            }
            if (teclaId !== 'igual') operacion = teclaId;

            if (resultados !== 0) {
                display.innerHTML = '';
                if (!operacionAnterior) {
                    resultados = obtenerNuevoResultados(digitos);
                }
            } else {
                resultados = digitos;
                display.innerHTML = '';
            }
        }

        function obtenerNuevoResultados(digitos) {
            let nuevoResultados = 0;
            digitos = Number(digitos);
            if (operacion === 'mas')
                nuevoResultados = resultados + digitos;
            if (operacion === 'menos')
                nuevoResultados = resultados - digitos;
            if (operacion === 'por')
                nuevoResultados = resultados * digitos;
            if (operacion === 'dividido')
                nuevoResultados = resultados / digitos;
            return nuevoResultados;
        }

        function mostrarResultados() { //funcionTeclaIgual
            resultados = obtenerNuevoResultados(display.innerHTML);
            display.innerHTML = !Number.isInteger(resultados) ? resultados.toFixed(2) : resultados;
            resultados = 0;
            operacion = '';
        }


        function reiniciarFuncionalidad() { //funcionBotonOn
            document.getElementById('display').innerHTML = 0;
            resultados = 0;
            operacion = '';
        }
        asignarFuncionesTeclas();
    }
};

Calculadora.init();