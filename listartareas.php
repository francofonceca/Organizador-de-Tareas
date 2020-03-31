<?php 
//INCLUYO DATABASE.PHP PARA USAR SUS METODOS O VARIABLES
    include('database.php');
    //HAGO UNA QUERY TODO NORMAL Y EASY
    $query="SELECT * from tareas ";
    $result = mysqli_query($connection, $query);
    //PREGUNTO SI DEVOLVIO ALGO Y SI NO ES ASI MANDO UN ERROR
    if(!$result){
        die('Consulta Fallida'. mysqli_error());
    }
    //CREO UNA VARIABLE JSON Q ES UN ARREGLO
$json = array();
//RECORRO EL RESULT QUE ES LO Q ME DEVOLVIO DE LA CONSULTA
    while($row = mysqli_fetch_array($result)){
        //ACA ENVIO POSICION A POSICION LO Q RECIBI DE LA CONSULTA SQL AL OBJETO JSON
        $json[]= array(
            'name'=> $row['nombre'],
            'description'=> $row['descripcion'],
            'id' => $row['id']
        );
    }
    //LO HAGO STRING
    $jsonstring = json_encode($json);
   //Y LO ENVIO 
    echo $jsonstring;
?>