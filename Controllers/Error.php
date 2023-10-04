<?php
    // Página principal del proyecto
    class Errors extends Controllers 
    {
        public function __construct()
        {
            parent::__construct();
        }

        public function notFound() 
        {
            $this->views->getView($this, "Error"); 
        }
    }

    $notFound = new Errors();
    $notFound->notFound();
?>