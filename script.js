let jugador1 = '';
let jugador2 = '';
const tablero = document.getElementById('tablero');
const mensaje = document.getElementById('mensaje');
const configuracion = document.getElementById('configuracion');
const marcador = document.getElementById('marcador');
const botonEmpezar = document.getElementById('empezarJuego');
const botonReiniciar = document.getElementById('reiniciarJuego');
let jugadorActual = 'X';
let juegoTerminado = false;
let celdas = ['', '', '', '', '', '', '', '', ''];

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

botonEmpezar.addEventListener('click', () => {
    jugador1 = document.getElementById('jugador1').value || 'Jugador 1';
    jugador2 = document.getElementById('jugador2').value || 'Jugador 2';
    configuracion.style.display = 'none';
    tablero.style.display = 'grid';
    marcador.style.display = 'block';
    botonReiniciar.style.display = 'none'; // Ocultar botón de reinicio
    mensaje.classList.remove('ganador'); // Quitar clase al iniciar un nuevo juego
    actualizarMensaje();
});
tablero.addEventListener('click', (e) => {
    if (juegoTerminado) return;

    const index = e.target.getAttribute('data-index');

    if (!celdas[index]) {
        celdas[index] = jugadorActual;
        e.target.classList.add(jugadorActual.toLowerCase());
        e.target.textContent = jugadorActual;

        if (verificarGanador()) {
            mensaje.textContent = `¡${jugadorActual === 'X' ? jugador1 : jugador2} ha ganado!`;
            mensaje.classList.add('ganador'); // Añadir clase para el parpadeo y estilos
            juegoTerminado = true;
            botonReiniciar.style.display = 'block'; // Mostrar botón de reinicio
        } else if (celdas.every((celda) => celda)) {
            mensaje.textContent = '¡Es un empate!';
            juegoTerminado = true;
            botonReiniciar.style.display = 'block'; // Mostrar botón de reinicio
        } else {
            jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
            actualizarMensaje();
        }
    }
});

botonReiniciar.addEventListener('click', reiniciarJuego);
function actualizarMensaje() {
    mensaje.textContent = `Turno del jugador: ${jugadorActual === 'X' ? jugador1 : jugador2}`;
}

function verificarGanador() {
    const esGanador = combinacionesGanadoras.some((combinacion) => {
        return combinacion.every((index) => {
            return celdas[index] === jugadorActual;
        });
    });

    if (esGanador) {
        mensaje.classList.add('ganador'); // Añadir clase para el parpadeo y estilos
    }

    return esGanador;
}

function reiniciarJuego() {
    jugadorActual = 'X';
    juegoTerminado = false;
    celdas = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.celda').forEach(celda => {
        celda.classList.remove('x', 'o');
        celda.textContent = '';
    });
    mensaje.textContent = `Turno del jugador: ${jugadorActual === 'X' ? jugador1 : jugador2}`;
    mensaje.classList.remove('ganador'); // Quitar clase al reiniciar el juego
    botonReiniciar.style.display = 'none'; // Ocultar botón de reinicio nuevamente
}
