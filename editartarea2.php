<?php 
    include('database.php');

    $n =  $_POST['name'];
    $d =  $_POST['description'];
    $id =  $_POST['id'];

    $query = "UPDATE tareas SET nombre='$n', descripcion = '$d' WHERE id = '$id'";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("ERROR EN CONSULTA");
    }
    echo "tarea actualizada";
?>