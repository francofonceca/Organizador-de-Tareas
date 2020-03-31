<?php
    include('database.php');

    $search = $_POST['search'];
    //PREGUNTO SI SEARCH NO ESTA VACIO CON EL !EMPTY= NO VACIO
    if(!empty($search)) {
        //QUE HAGO ACA, USO EL SEARCH Y CON UN % PARA QUE TRAIGA TODOS LOS QUE COINCIDEN EN ALMENOS UNA PALABRA
        $query= "SELECT * FROM tareas WHERE nombre LIKE '$search%' ";
        $result=mysqli_query($connection,$query);
        //VERIFICO SI DEVOLVIO ALGO
        if(!$result){
            die('ERROR DE CONSULTA'. mysqli_error($connection));
        }
        
        $json= array();
        //RECORRO EL RESULTADO DE LA QERY Y LO GUARDO EN UN JSON
        while($row = mysqli_fetch_array($result)){
                $json[]= array(
                    'nombre' => $row['nombre'],
                    'descripcion' => $row['descripcion'],
                    'id' =>  $row['id']
                );
        }
        //CONVIERTO EL JSON EN UN STRING PARA PODER MOSTRARLO
        $jsonstring = json_encode($json);
        //Y LO MUESTRO JE
        echo $jsonstring;
    }
?>