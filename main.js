// VARIABLES
let libros = JSON.parse(localStorage.getItem('libros')) || [];
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let librosPopulares = [];

// TODAS LAS FUNCIONES: 
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

// FUNCION PARA MOSTRAR LOS RESULTADOS DE LA BUSQUEDA
function mostrarResultadosBusqueda(resultados) {
    const resultadosBusqueda = document.getElementById('resultadosBusqueda');
    resultadosBusqueda.innerHTML = '';
    resultados.forEach(libro => {
        const p = document.createElement('p');
        p.textContent = `${libro.titulo} - ${libro.autor} (Publicado en ${libro.anio})`;
        resultadosBusqueda.appendChild(p);
    });
}

// FUNCION PARA OBTENER LIBROS POPULARES DESDE LA API DE GOODREADS
function obtenerLibrosPopulares() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            librosPopulares = response.books;
            mostrarLibrosPopulares(librosPopulares);
        }
    });

    xhr.open('GET', 'https://goodreads12.p.rapidapi.com/getAuthorBooks?authorID=1077326');
    xhr.setRequestHeader('x-rapidapi-key', 'd13a2b8949msh2c36d5940f32240p18342cjsneeafeb5b3ff4');
    xhr.setRequestHeader('x-rapidapi-host', 'goodreads12.p.rapidapi.com');

    xhr.send(data);
}

// FUNCION PARA MOSTRAR LOS LIBROS POPULARES
function mostrarLibrosPopulares(libros) {
    const listaPopulares = document.getElementById('librosPopulares');
    listaPopulares.innerHTML = '';
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.title} - ${libro.author.name}`;
        listaPopulares.appendChild(li);
    });
}

// FUNCION PARA OBTENER LIBROS CONOCIDOS DESDE LA API DE GOOGLE BOOKS
function obtenerLibrosConocidos() {
    const query = 'bestsellers';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(response => response.json())
        .then(data => mostrarLibrosConocidos(data.items.slice(0, 9))) // Tomar solo los primeros 9 libros
        .catch(error => console.error('Error al obtener libros conocidos:', error));
}

// FUNCION PARA MOSTRAR LOS LIBROS CONOCIDOS
function mostrarLibrosConocidos(libros) {
    const librosConocidosContainer = document.getElementById('librosConocidos');
    librosConocidosContainer.innerHTML = '';
    libros.forEach(libro => {
        const libroInfo = libro.volumeInfo;
        const libroCard = document.createElement('div');
        libroCard.className = 'libro-card';

        const titulo = document.createElement('h3');
        titulo.textContent = libroInfo.title;
        
        const autor = document.createElement('p');
        autor.textContent = `Autor: ${libroInfo.authors ? libroInfo.authors.join(', ') : 'Desconocido'}`;
        
        const descripcion = document.createElement('p');
        descripcion.textContent = libroInfo.description ? libroInfo.description.substring(0, 100) + '...' : 'Sin descripción';

        const imagen = document.createElement('img');
        imagen.src = libroInfo.imageLinks ? libroInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

        libroCard.appendChild(imagen);
        libroCard.appendChild(titulo);
        libroCard.appendChild(autor);
        libroCard.appendChild(descripcion);
        librosConocidosContainer.appendChild(libroCard);
    });
}

// FUNCION PARA REGISTRAR UN NUEVO USUARIO
function registrarUsuario() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    if (newUsername && newPassword) {
        const usuario = {
            id: Date.now(),
            username: newUsername,
            password: newPassword
        };
        usuarios.push(usuario);
        guardarUsuarios();
        document.getElementById('new-username').value = '';
        document.getElementById('new-password').value = '';
        mostrarLogin();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario registrado con éxito',
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

// FUNCION PARA GUARDAR USUARIOS EN LOCALSTORAGE
function guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// FUNCION PARA INICIAR SESION
function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    if (usuario) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500
        });
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Usuario o contraseña incorrectos!',
        });
    }
}

// FUNCION PARA MOSTRAR EL REGISTRO
function mostrarRegistro() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

// FUNCION PARA MOSTRAR EL LOGIN
function mostrarLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
}

// EVENTOS:
document.getElementById('agregarLibroBtn').addEventListener('click', agregarLibro);
document.getElementById('buscarLibroBtn').addEventListener('click', buscarLibro);
document.getElementById('registerBtn').addEventListener('click', registrarUsuario);
document.getElementById('loginBtn').addEventListener('click', iniciarSesion);
document.getElementById('showRegister').addEventListener('click', mostrarRegistro);
document.getElementById('showLogin').addEventListener('click', mostrarLogin);

// LLAMADAS INICIALES
document.addEventListener('DOMContentLoaded', () => {
    mostrarLibros();
    obtenerLibrosConocidos();
});
