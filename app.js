$(function(){
    console.log('arranca jeje');
    //hide para esconder el html con id de task-result
    $('#task-result').hide();
    obtenertareas();
    let edit = false;
    //KEYUP PARA RECIBIR LO QUE ESTA INGRESANDO
    $('#search').keyup(function(){
       if($('#search').val()) {
             //VAL PARA ENVIAR ESE VALOR A SEARCH Y MANDARLO X PANTALLA A LA CONSOLA
            let search = $('#search').val(); 
            //console.log(search);
            //CREO UN AJAX PARA HACER UN OBJETO CON ESAS CARACTERISTICAS RECIBIDAS DE BUSCADORTAREAS
            $.ajax({
                url: 'buscadortareas.php',
                type: 'POST',
                data: { search },
                //CREO UNA FUNCUION QUE ME VA A DEVOLVER UNA ETIQUETA CON VALORES DEL OBJETO
                success: function(response){
                    //CREO UN JSON PARA HACER UN OBJETO DE TAREAS
                        let tareas = JSON.parse(response);
                        let template = '';
                        // TEMPLATE ES LA VARIABLE QUE VOY A MOSTRAR Y TAREA ES LA TAREA QUE HAY 1 X 1 DEL OBJETO TAREAS
                        tareas.forEach(tarea => {
                            template +=  `<li>${tarea.nombre}</li>`
                        });
                
                //LO QUE HAGO ACA ES LLAMAR AL HTML CON ID DE CONTAINER Y ASIGNARLE MI ETIQUETA TEMPLATE QUE CREE ARRIBA
                $('#container').html(template);
                //ACA MUESTRO O DEJO DE OCULAR EL HTML CON ID TASK-RESULT
                $('#task-result').show();
                 }
            }) 
       }else{
           //ACA LO QUE HAGO ES OCULTAR EL HTML 
        $('#task-result').hide();
       }
    });
    //PREGUNTO SI SE APRETO EL FORMULARIO CON ID DE TASK-FORM
    $('#task-form').submit(function(e){
       //CREO UNA VARIABLE DATOS QUE ES UN OBJETO
        const datos = {
            name: $('#nombre').val(),
            description: $('#descripcion').val(),
            id: $('#taskID').val()
        };
        //SI EDIT ES FALSO, LE DAMOS LA DIRECCION DE AGREGAR TAREA, SI ES VERDADERO A EDITARTAREA2.PHP
        let url = edit === false ? 'agregartarea.php' : 'editartarea2.php'; 




        //ENVIO POR POST A AGREGARTAREA.PHP, LE PASO LOS DATOS Y GENERO UNA FUNCION COMO 3ER PARAMETRO QUE LLAMA A UNA FUNCION
        $.post(url, datos, function (response){
            console.log(response);
            obtenertareas();
            //VACIO O DEJO DE CERO EL FORMULARIO CON ID TASK-FORM, LO QUE HACIA EN JSP CON CODIGO ACA LO HAGO CON UNA FUNCION MAS FACIL
            $('#task-form').trigger('reset');
        });
        //SIRVE PARA QUE LA PAG SE ACTUALIZE EN EL MOMENTO DE QUE HAYA ALGUN CAMBIO ASI NO HACE FALTA ACTUALIZARLA CON F5
        e.preventDefault();
    })

//ACA MAS DE LO MISMO !
    function obtenertareas(){
        $.ajax({
            url:'listartareas.php',
            type: 'GET',
            success: function(response){
                let tareas = JSON.parse(response);
                let template = '';
                tareas.forEach(tarea=>{
                    template +=  `
                            <tr taskID="${tarea.id}">
                                <td>${tarea.id}</td>
                                <td>
                                    <a href="#" class="task-edit">${tarea.name}</a>
                                </td>
                                <td>${tarea.description}</td>
                                <td>
                                    <button class="task-delete btn btn-primary btn-block text-center">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>`
                });
                $('#tasks').html(template);
            }
        });
    }
    
    //CUANDO SE APRETE EL BOTON TASK-DELETE
    $(document).on('click','.task-delete', function(){
        if(confirm("Estas seguro de eliminar esta tarea?")){
            //ENTRO AL ELEMENTO PADRE DE DONDE ESTAMOS, OSEA AL TD Y DESPUES AL TR
        let element = $(this)[0].parentElement.parentElement;
        //SELECCIONAMOS EL VALOR DEL ATRIBUTO taskID QUE ESTA EN EL TR Y QUE TIENE COMO VALOR LA ID
        let id = $(element).attr('taskID');
        //LE ENVIAMOS ESA ID DEL BOTON AL BACK END OSEA A ELIMINARTAREA.PHP
        $.post('eliminartarea.php', {id}, function(response){
            //Y ACTUALIZAMOS LAS TAREAS PARA QUE DESAPAREZCA LA ELIMINADA
            obtenertareas();
        });
        }
    });

    $(document).on('click', '.task-edit', function(){
        let element = $(this)[0].parentElement.parentElement;
        //SELECCIONAMOS EL VALOR DEL ATRIBUTO taskID QUE ESTA EN EL TR Y QUE TIENE COMO VALOR LA ID
        let id = $(element).attr('taskID');
        $.post('editartarea.php', {id}, function(response){
           const tarea = JSON.parse(response);
           $('#nombre').val(tarea.name);
           $('#descripcion').val(tarea.description);
           $('#taskID').val(tarea.id);
           edit = true; 
        });
    })

});