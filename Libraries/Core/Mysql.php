<?php
    class Mysql extends Conexion {
        private $conexion;
        private $strQuery;
        private $arrValues;

        function __construct() 
        {
            $this->conexion = (new Conexion())->connect();
        }

        // Insertar un registro
        public function insert(string $query, array $arrValues) 
        {
            $this->strQuery = $query;
            $this->arrValues = $arrValues;
            $insert = $this->conexion->prepare($this->strQuery);

            $restInsert = $insert->execute($this->arrValues);
            if ($restInsert) {
                $restInsert = $this->conexion->lastInsertId();
            } else {
                $restInsert = 0;  
            }
            
            return $restInsert;
        }

        // Buscar un registro
        public function select(string $query) 
        {
            $this->strQuery = $query;
            $result = $this->conexion->prepare($this->strQuery);
            $result->execute();
            $data = $result->fetch(PDO::FETCH_ASSOC);
            return $data;
        }
    }
?>