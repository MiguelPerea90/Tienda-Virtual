<?php

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
    
    echo "<br>";
    echo "controlador: " .$controller;
    echo "<br>";
    echo "metodo: " .$method;
    echo "<br>";
    echo "params: " .$params;

?>
