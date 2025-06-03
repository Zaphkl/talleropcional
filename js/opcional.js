var listaProyectos = [];
        var listaProgramas = [];

        function irA(pagina) {
            var todasLasPaginas = document.querySelectorAll('.pagina');
            for (var i = 0; i < todasLasPaginas.length; i++) {
                todasLasPaginas[i].classList.remove('mostrar');
            }

            document.getElementById(pagina).classList.add('mostrar');

            if (pagina === 'proyectos') {
                actualizarListaProyectos();
            }

            if (pagina === 'programas') {
                actualizarListaProgramas();
            }
        }

        function crearProyecto(evento) {
            evento.preventDefault();
            var codigoQueEscribio = document.getElementById('codigo').value;
            var tituloQueEscribio = document.getElementById('titulo').value;
            var areaQueEscribio = document.getElementById('area').value;
            var estadoQueEscribio = document.getElementById('estado').value;

            document.getElementById('errorCodigo').textContent = '';
            document.getElementById('errorTitulo').textContent = '';

            var codigoYaExiste = false;
            for (var i = 0; i < listaProyectos.length; i++) {
                if (listaProyectos[i].codigo === codigoQueEscribio) {
                    codigoYaExiste = true;
                    break;
                }
            }

            if (codigoYaExiste) {
                document.getElementById('errorCodigo').textContent = 'Este código ya existe, usa otro';
                return;
            }

            var tituloYaExiste = false;
            for (var i = 0; i < listaProyectos.length; i++) {
                if (listaProyectos[i].titulo === tituloQueEscribio) {
                    tituloYaExiste = true;
                    break;
                }
            }

            if (tituloYaExiste) {
                document.getElementById('errorTitulo').textContent = 'Este título ya existe, usa otro';
                return;
            }

            var nuevoProyecto = {
                codigo: codigoQueEscribio,
                titulo: tituloQueEscribio,
                area: areaQueEscribio,
                estado: estadoQueEscribio
            };

            listaProyectos.push(nuevoProyecto);

            mostrarMensaje('¡Proyecto guardado correctamente!', 'bueno');
            borrarFormularioProyecto();
            actualizarListaProyectos();
        }

        function eliminarProyecto(posicion) {
            var seguro = confirm('¿Estás seguro de eliminar este proyecto?');
            if (seguro) {
                listaProyectos.splice(posicion, 1);
                actualizarListaProyectos();
                mostrarMensaje('Proyecto eliminado', 'bueno');
            }
        }
        function actualizarListaProyectos() {
            var contenedor = document.getElementById('mostrarProyectos');
            var html = '<h3>Lista de Proyectos</h3>';

            if (listaProyectos.length === 0) {
                html += '<p>No hay proyectos todavía. ¡Agrega el primero!</p>';
            } else {
                html += '<table>';
                html += '<tr><th>Código</th><th>Título</th><th>Área</th><th>Estado</th><th>Eliminar</th></tr>';

                for (var i = 0; i < listaProyectos.length; i++) {
                    var proyecto = listaProyectos[i];
                    html += '<tr>';
                    html += '<td>' + proyecto.codigo + '</td>';
                    html += '<td>' + proyecto.titulo + '</td>';
                    html += '<td>' + proyecto.area + '</td>';
                    html += '<td>' + proyecto.estado + '</td>';
                    html += '<td><button class="boton-eliminar" onclick="eliminarProyecto(' + i + ')"></button></td>';
                    html += '</tr>';
                }

                html += '</table>';
            }

            contenedor.innerHTML = html;
        }

        function borrarFormularioProyecto() {
            document.getElementById('codigo').value = '';
            document.getElementById('titulo').value = '';
            document.getElementById('area').value = '';
            document.getElementById('estado').value = '';
            document.getElementById('errorCodigo').textContent = '';
            document.getElementById('errorTitulo').textContent = '';
        }
        function crearPrograma(evento) {
            evento.preventDefault();

            var codigoQueEscribio = document.getElementById('codigoCarrera').value;
            var nombreQueEscribio = document.getElementById('nombreCarrera').value;
            var semestresQueEscribio = document.getElementById('semestres').value;
            var modalidadQueEscribio = document.getElementById('comoEstudia').value;

            document.getElementById('errorCodigoCarrera').textContent = '';
            document.getElementById('errorNombreCarrera').textContent = '';

            var codigoYaExiste = false;
            for (var i = 0; i < listaProgramas.length; i++) {
                if (listaProgramas[i].codigo === codigoQueEscribio) {
                    codigoYaExiste = true;
                    break;
                }
            }

            if (codigoYaExiste) {
                document.getElementById('errorCodigoCarrera').textContent = 'Este código ya existe';
                return;
            }

            var nombreYaExiste = false;
            for (var i = 0; i < listaProgramas.length; i++) {
                if (listaProgramas[i].nombre === nombreQueEscribio) {
                    nombreYaExiste = true;
                    break;
                }
            }

            if (nombreYaExiste) {
                document.getElementById('errorNombreCarrera').textContent = 'Este nombre ya existe';
                return;
            }
            var nuevoPrograma = {
                codigo: codigoQueEscribio,
                nombre: nombreQueEscribio,
                semestres: semestresQueEscribio,
                modalidad: modalidadQueEscribio
            };

            listaProgramas.push(nuevoPrograma);
            mostrarMensaje('¡Programa guardado!', 'bueno');
            borrarFormularioPrograma();
            actualizarListaProgramas();
        }

        function eliminarPrograma(posicion) {
            var seguro = confirm('¿Eliminar este programa?');
            if (seguro) {
                listaProgramas.splice(posicion, 1);
                actualizarListaProgramas();
                mostrarMensaje('Programa eliminado', 'bueno');
            }
        }

        function actualizarListaProgramas() {
            var contenedor = document.getElementById('mostrarProgramas');
            var html = '<h3>Lista de Programas</h3>';

            if (listaProgramas.length === 0) {
                html += '<p>No hay programas aún. ¡Agrega el primero!</p>';
            } else {
                html += '<table>';
                html += '<tr><th>Código</th><th>Nombre</th><th>Duración</th><th>Modalidad</th><th>Eliminar</th></tr>';

                for (var i = 0; i < listaProgramas.length; i++) {
                    var programa = listaProgramas[i];
                    html += '<tr>';
                    html += '<td>' + programa.codigo + '</td>';
                    html += '<td>' + programa.nombre + '</td>';
                    html += '<td>' + programa.semestres + ' semestres</td>';
                    html += '<td>' + programa.modalidad + '</td>';
                    html += '<td><button class="boton-eliminar" onclick="eliminarPrograma(' + i + ')"></button></td>';
                    html += '</tr>';
                }

                html += '</table>';
            }

            contenedor.innerHTML = html;
        }

        function borrarFormularioPrograma() {
            document.getElementById('codigoCarrera').value = '';
            document.getElementById('nombreCarrera').value = '';
            document.getElementById('semestres').value = '';
            document.getElementById('comoEstudia').value = '';
            document.getElementById('errorCodigoCarrera').textContent = '';
            document.getElementById('errorNombreCarrera').textContent = '';
        }

        function mostrarMensaje(texto, tipo) {
            var mensaje = document.createElement('div');
            mensaje.className = 'mensaje ' + tipo;
            mensaje.textContent = texto;

            var caja = document.querySelector('.caja');
            caja.insertBefore(mensaje, caja.firstChild);

            setTimeout(function () {
                mensaje.remove();
            }, 3000);
        }