<?php 

	class Permisos extends Controllers{
		public function __construct()
		{
			parent::__construct();
		}

		public function getPermisosRol(int $idrol)
		{
			$rolid = intval($idrol);
            if($rolid > 0)
			{
                $arrModulos = $this->model->selectModulos();
                $arrPermisosRol = $this->model->selectPermisosRol($rolid);
				$arrPermisos = array('r' => 0, 'w' => 0, 'u' => 0, 'd' => 0);
				$arrPermisoRol = array('id_rol' => $rolid );

				if(empty($arrPermisosRol))
				{
					for ($i=0; $i < count($arrModulos) ; $i++) { 

						$arrModulos[$i]['permisos'] = $arrPermisos;
					}
				} else{
					for ($i=0; $i < count($arrModulos); $i++) {

						$arrPermisos = array('r' => $arrPermisosRol[$i]['r'], 
											 'w' => $arrPermisosRol[$i]['w'], 
											 'u' => $arrPermisosRol[$i]['u'], 
											 'd' => $arrPermisosRol[$i]['d'] 
											);
						if($arrModulos[$i]['id_modulo'] == $arrPermisosRol[$i]['modulo_id'])
						{
							$arrModulos[$i]['permisos'] = $arrPermisos;
						}
					}
				}
				$arrPermisoRol['modulos'] = $arrModulos;
				$html = getModal("modalRoles",$arrPermisoRol);
				// dep($arrPermisoRol);
			}
		}

	}
 ?>