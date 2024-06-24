// VARIABLES
let libros = JSON.parse(localStorage.getItem('libros')) || [];

// FUNCIONES: 
// FUNCION PARA AGREGAR UN LIBRO
function agregarLibro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const anio = document.getElementById('anio').value;
    if (titulo && autor && anio) {
        const libro = {
            id: Date.now(),
            titulo: titulo,
            autor: autor,
            anio: anio
        };
        libros.push(libro);
        guardarLibros();
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('anio').value = '';
        mostrarLibros();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El libro se ha agregado correctamente',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Tienes que rellenar todas las casillas!',
        });
    }
}

// FUNCION PARA GUARDAR LIBROS EN LOCALSTORAGE
function guardarLibros() {
    localStorage.setItem('libros', JSON.stringify(libros));
}

// FUNCION PARA MOSTRAR LOS LIBROS
function mostrarLibros() {
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} (Publicado en ${libro.anio})`;
        listaLibros.appendChild(li);
    });
}

// FUNCION PARA BUSCAR UN LIBRO
function buscarLibro() {
    const termino = document.getElementById('buscar').value;
    const resultados = libros.filter(libro => libro.titulo.includes(termino) || libro.autor.includes(termino));
    if (resultados.length > 0) {
        mostrarResultadosBusqueda(resultados);
    } else {
        Swal.fire({
            title: 'Que Extraño...',
            text: 'No se ha encontrado el libro que buscabas',
            icon: 'question'
        });
    }
}

// FUNCION PARA MOSTRAR RESULTADOS DE BUSQUEDA
function mostrarResultadosBusqueda(resultados) {
    const resultadosBusqueda = document.getElementById('resultadosBusqueda');
    resultadosBusqueda.innerHTML = '';
    resultados.forEach(libro => {
        const div = document.createElement('div');
        div.textContent = `${libro.titulo} - ${libro.autor} (Publicado en ${libro.anio})`;
        resultadosBusqueda.appendChild(div);
    });
}

// EVENTOS
document.getElementById('agregarLibroBtn').addEventListener('click', agregarLibro);
document.getElementById('buscarLibroBtn').addEventListener('click', buscarLibro);

// MOSTRAR LA LISTA DE LIBROS AL INICIAR LA PAGINA
mostrarLibros();
