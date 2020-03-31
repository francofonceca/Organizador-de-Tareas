<?php 
    include('database.php');
    //PREGUNTO SI EXISTE UN VALOR EN NAME
    if(isset($_POST['name'])){
        $nom = $_POST['name'];
        $des = $_POST['descripcion'];
        //HAGO LA QUERY
        $query= "INSERT into tareas(nombre, descripcion) VALUES ('$nom','$des') ";
        $result = mysqli_query($connection,$query);
        //VALIDO SI LA QUERY SE MANDO Y SI NO ES ASI MANDO UN EROR
        if(!$result) {
            die("Consulta falló");
        }
        echo 'Tarea Agregada';
    }
?>