<?php
    // Página principal del proyecto
    class Home extends Controllers 
    {
        public function __construct()
        {
            parent::__construct();
        }

        public function home() 
        {
            $data['page_id'] = 1;
            $data['page_tag'] = "Home";
            $data['page_title'] = "Página principal";
            $data['page_name'] = "home";
            $data['page_content'] = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi atque reiciendis ea minus, itaque corporis officia quam. Quasi, obcaecati repellendus. Laudantium porro nam, natus ab ut molestias dolores alias fugiat?";
            $this->views->getView($this, "home", $data); 
        }
    }
?>