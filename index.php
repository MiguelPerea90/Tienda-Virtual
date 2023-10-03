<?php

    require_once("Config/Config.php");

    $url = !empty($_GET['url']) ? htmlspecialchars($_GET['url'], ENT_QUOTES, 'UTF-8') : 'home/home';
    $arrUrl = explode("/", $url);
    $controller = $arrUrl[0];
    $method = $arrUrl[0];
    $params = "";
    
    if(!empty($arrUrl[1])) {
        if($arrUrl[1] != "") {
            $method = $arrUrl[1];
        }
    }

    if(!empty($arrUrl[1])) {
        if($arrUrl[1] != "") {
            for ($i=2; $i < count($arrUrl); $i++) { 
                $params .= $arrUrl[$i].',';
            }
            $params = trim($params,',');
        }
    }

    spl_autoload_register(function($class) {

        if(file_exists(LIBS.'Core/'.$class.".php")) {
            require_once(LIBS.'Core/'.$class.".php");
        }
    });

    // Load
    // Con este codigo nos comunicamos a los controladores
    $controllerFile = "Controllers/".$controller.".php";
    if(file_exists($controllerFile)) {

        require_once($controllerFile);
        $controller = new $controller();

        if(method_exists($controller, $method)) {
            $controller->{$method}($params);
        } else {
            echo "No existe el metodo";
        }

    } else {
        echo "No existe el controlador";
    }
    
    
    // echo "<br>";
    // echo "controlador: " .$controller;
    // echo "<br>";
    // echo "metodo: " .$method;
    // echo "<br>";
    // echo "params: " .$params;

?>
