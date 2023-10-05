<?php
    class Mysql extends Conexion 
    {
        private $conexion;
        private $strQuery;
        private $arrValues;

        function __construct() 
        {
            $this->conexion = (new Conexion())->connect();
        }

        // Inserta un registro
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

        // Busca un registro
        public function select(string $query) 
        {
            $this->strQuery = $query;
            $result = $this->conexion->prepare($this->strQuery);
            $result->execute();
            $data = $result->fetch(PDO::FETCH_ASSOC);
            return $data;
        }

        // Devuelve todos los registros
        public function selectAll(string $query)
        {
            $this->strQuery = $query;
            $result = $this->conexion->prepare($this->strQuery);
            $result->execute();
            $data = $result->fetchall(PDO::FETCH_ASSOC);
            return $data;
        }

        // Actualiza registros
        public function update(string $query, array $arrValues)
        {
            $this->strQuery = $query;
            $this->arrValues = $arrValues;
            $update = $this->conexion->prepare($this->strQuery);
            $resExecute = $update->execute($this->arrValues);
            return $resExecute;
        }

        // Elimina un registro
        public function delete(string $query)
        {
            $this->strQuery = $query;
            $result = $this->conexion->prepare($this->strQuery);
            $delete = $result->execute();
            return $delete;
        }
    }
?>