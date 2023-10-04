<?php
    require_once("Config/Config.php");
    $url = !empty($_GET['url']) ? htmlspecialchars($_GET['url'], ENT_QUOTES, 'UTF-8') : 'home/home';
    $arrUrl = explode("/", $url);
    $controller = $arrUrl[0];
    $method = $arrUrl[0];
    $params = "";
    
    if (!empty($arrUrl[1])) {
        if($arrUrl[1] != "") {
            $method = $arrUrl[1];
        }
    }

    if (!empty($arrUrl[1])) {
        if($arrUrl[1] != "") {
            for ($i=2; $i < count($arrUrl); $i++) { 
                $params .= $arrUrl[$i].',';
            }
            $params = trim($params,',');
        }
    }

    require_once("Libraries/Core/Autoload.php");
    require_once("Libraries/Core/Load.php");

    // 5.Controladores y vistas. video completo
    // Plantilla - Framework lista para cualquier proyecto


    // 7.video 7:42 mins
?>
