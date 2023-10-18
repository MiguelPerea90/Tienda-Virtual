<?php 

	class Roles extends Controllers
	{
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

			for ($i=0; $i < count($arrData); $i++) {

				if($arrData[$i]['status'] == 1)
				{
					$arrData[$i]['status'] = '<span class="badge badge-success">Activo</span>';
				}else{
					$arrData[$i]['status'] = '<span class="badge badge-danger">Inactivo</span>';
				}

				// El for hace el recorrido y coloca el elemento options en cada uno de los elementos.
				$arrData[$i]['options'] = '  
				<div class="text-center">
					<button 
						class="btn btn-secondary btn-sm btnPermisosRol" 
						rl="'.$arrData[$i]['id_rol'].'" 
						title="Permisos"
					>
						<i class="fas fa-key"></i>
					</button>

					<button 
						class="btn btn-primary btn-sm btnEditRol" 
						rl="'.$arrData[$i]['id_rol'].'" 
						title="Editar"
					>
						<i class="fas fa-pencil-alt"></i>
					</button>
					
					<button 
						class="btn btn-danger btn-sm btnDelRol" 
						rl="'.$arrData[$i]['id_rol'].'" 
						title="Eliminar"
					>
						<i class="far fa-trash-alt"></i>
					</button>
				</div>
				';

			}

			echo json_encode($arrData, JSON_UNESCAPED_UNICODE); // Convierte el arreglo a formato json
			die(); // Finaliza el proceso
		}

		public function getSelectRoles()
		{
			$htmlOptions = "";
			$arrData = $this->model->selectRoles();
			if(count($arrData) > 0 ){
				for ($i=0; $i < count($arrData); $i++) { 
					if($arrData[$i]['status'] == 1 ){
					$htmlOptions .= '<option value="'.$arrData[$i]['id_rol'].'">'.$arrData[$i]['nombre_rol'].'</option>';
					}
				}
			}
			echo $htmlOptions;
			die();		
		}

		public function getRol(int $idrol)
		{
			$intIdrol = intval(strClean($idrol));
			if($intIdrol > 0)
			{
				$arrData = $this->model->selectRol($intIdrol);
				if(empty($arrData))
				{
					$arrResponse = array('status' => false, 'msg' => 'Datos no encontrados.');
				}else{
					$arrResponse = array('status' => true, 'data' => $arrData);
				}
				echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
			}
			die();
		}

		public function setRol() 
		{
			
			$intIdrol = intval($_POST['idRol']);
			$strRol = strClean($_POST['txtNombre']);
			$strDescripcion = strClean($_POST['txtDescripcion']);
			$intStatus = intval($_POST['listStatus']);

			if($intIdrol == 0)
			{
				//Crear
				$request_rol = $this->model->insertRol($strRol, $strDescripcion,$intStatus);
				$option = 1;
			}else{
				//Actualizar
				$request_rol = $this->model->updateRol($intIdrol, $strRol, $strDescripcion, $intStatus);
				$option = 2;
			}

			if ($request_rol === 'exist') {
				$arrResponse = array('status' => false, 'msg' => '¡Atención! El Rol ya existe.');
			} elseif ($request_rol <= 0) {
				$arrResponse = array("status" => false, "msg" => 'No es posible almacenar los datos.');
			} else {
				if ($option === 1) {
					$arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
				} else {
					$arrResponse = array('status' => true, 'msg' => 'Datos Actualizados correctamente.');
				}
			}

			header('Content-Type: application/json');
			echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
			die();
		}

		public function delRol()
		{
			if($_POST){
				$intIdrol = intval($_POST['idrol']);
				$requestDelete = $this->model->deleteRol($intIdrol);
				if($requestDelete == 'ok')
				{
					$arrResponse = array('status' => true, 'msg' => 'Se ha eliminado el Rol');
				}else if($requestDelete == 'exist'){
					$arrResponse = array('status' => false, 'msg' => 'No es posible eliminar un Rol asociado a usuarios.');
				}else{
					$arrResponse = array('status' => false, 'msg' => 'Error al eliminar el Rol.');
				}
				echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
			}
			die();
		}
	}
 ?>