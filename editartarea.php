<?php 
    include('database.php');
    $id = $_POST['id'];
    $query = "SELECT * FROM tareas WHERE id = $id ";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("ERROR EN CONSULTA");
    }
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name'=> $row['nombre'],
            'description'=> $row['descripcion'],
            'id' => $row['id']
        );
    }  
    $jsonstring = json_encode($json[0]);
        //Y LO ENVIO 
     echo $jsonstring;       
?>
