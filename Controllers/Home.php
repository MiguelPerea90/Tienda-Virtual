<?php

    // Página principal del proyecto
    class Home extends Controllers {

        public function __construct()
        {
            parent::__construct();
        }

        public function home($params) 
        {
            $this->views->getView($this, "home"); // 6:29 mins
        }

        public function datos($params) 
        {
            echo "Dato recibido: " .$params;
        }

        public function carrito($params) 
        {
            $carrito = $this->model->getCarrito($params);
            echo $carrito;
        }

    }

?>