<?php 

	class Roles extends Controllers{
		public function __construct()
		{
			parent::__construct();
		}

		public function roles()
		{
			$data['page_id'] = 3;
			$data['page_tag'] = "Roles Usuario";
			$data['page_title'] = "Roles Usuario <small> Tienda Virtual</small>"; 
			$data['page_name'] = "rol_usuario";
			$this->views->getView($this,"roles",$data);
		}

		public function getRoles() 
		{
			$arrData = $this->model->selectRoles();
			echo json_encode($arrData, JSON_UNESCAPED_UNICODE); // Convierte el arreglo a formato json
			die(); // Finaliza el proceso
		}

	}
 ?>