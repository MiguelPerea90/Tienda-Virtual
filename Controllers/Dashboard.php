<?php 

	class Dashboard extends Controllers{
		public function __construct()
		{
			parent::__construct();
		}

		public function dashboard()
		{
			$data['page_id'] = 2; // No. de pagina o ID
			$data['page_tag'] = "Dashboard - Tienda Virtual"; // En la etiqueta title del html
			$data['page_title'] = "Dashboard - Tienda Virtual"; // En el H1 de la pgina html 
			$data['page_name'] = "dashboard";
			$this->views->getView($this,"dashboard",$data);
		}

	}
 ?>