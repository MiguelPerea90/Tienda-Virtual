var tableRoles;

document.addEventListener('DOMContentLoaded', function() {

    //Inicialización de DataTable para mostrar Roles
    tableRoles = $('#tableRoles').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": base_url + "/Roles/getRoles",
            "dataSrc": ""
        },
        "columns": [
            {"data": "id_rol"},
            {"data": "nombre_rol"},
            {"data": "descripcion"},
            {"data": "status"},
            {"data": "options"}
        ],
        "responsive": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0, "desc"]]
    });

    //NUEVO ROL
    var formRol = document.querySelector("#formRol");
    formRol.onsubmit = function(e) {
        e.preventDefault();

        var intIdRol = document.querySelector('#idRol').value;
        var strNombre = document.querySelector('#txtNombre').value;
        var strDescripcion = document.querySelector('#txtDescripcion').value;
        var intStatus = document.querySelector('#listStatus').value;

        if (strNombre == '' || strDescripcion == '' || intStatus == '') {
            swal("Atención", "Todos los campos son obligatorios.", "error");
            return false; // Detiene el proceso
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url + '/Roles/setRol';
        var formData = new FormData(formRol);
        request.open("POST", ajaxUrl, true);
        request.send(formData);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {

                var objData = JSON.parse(request.responseText);
                if (objData.status) {
                    $('#modalFormRol').modal("hide");
                    formRol.reset();
                    swal("Roles de usuario", objData.msg, "success");
                    tableRoles.ajax.reload(function() {
                        rebindEventHandlers();
                    });
                } else {
                    swal("Error", objData.msg, "error");
                }
            }
        }
    }

    function rebindEventHandlers() {
        fntEditRol();
        // Si tienes otras funciones como fntDelRol o fntPermisos, deberías llamarlas aquí.
        // fntDelRol();
        // fntPermisos();
    }

});


$('#tableRoles').DataTable();

function openModal() {

    document.querySelector('#idRol').value ="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML ="Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Rol";
    document.querySelector("#formRol").reset();
    
    $('#modalFormRol').modal('show');
}

window.addEventListener('load', function() {
    fntEditRol();
    fntDelRol();
    fntPermisos();
}, false);

function fntEditRol(){

    document.addEventListener('click', function(event){

        let targetElement = event.target; // clicked element
        while (targetElement !== null) {
            if (targetElement.classList.contains('btnEditRol')) {

                document.querySelector('#titleModal').innerHTML ="Actualizar Rol";
                document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
                document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
                document.querySelector('#btnText').innerHTML ="Actualizar";

                var idrol = targetElement.getAttribute("rl");
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl  = base_url+'/Roles/getRol/'+idrol;
                request.open("GET",ajaxUrl ,true);
                request.send();

                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){

                        var objData = JSON.parse(request.responseText);
                        
                        if(objData.status)
                        {
                            document.querySelector("#idRol").value = objData.data.id_rol;
                            document.querySelector("#txtNombre").value = objData.data.nombre_rol;
                            document.querySelector("#txtDescripcion").value = objData.data.descripcion;

                            if(objData.data.status == 1)
                            {
                                var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                            }else{
                                var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                            }
                            var htmlSelect = `${optionSelect}
                                            <option value="1">Activo</option>
                                            <option value="2">Inactivo</option>
                                            `;
                            document.querySelector("#listStatus").innerHTML = htmlSelect;

                            $('#modalFormRol').modal('show');
                            return; // Una vez que encontramos el elemento y mostramos el modal, salimos del bucle
                        }else{
                            swal("Error", objData.msg , "error");
                        }
                    }
                }
            }
            targetElement = targetElement.parentElement;
        }
    });    
 
}

function fntDelRol() {
    document.addEventListener('click', function(event) {
        var targetElement = event.target; // elemento clickeado

        // Buscar el elemento o ancestro que coincida con .btnDelRol
        while (targetElement !== null) {
            if (targetElement.matches('.btnDelRol')) {
                var idrol = targetElement.getAttribute("rl");
                if (idrol) {
                    swal({
                        title: "Eliminar Rol",
                        text: "¿Realmente quiere eliminar el Rol?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Si, eliminar!",
                        cancelButtonText: "No, cancelar!",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    }, function(isConfirm) {
                        
                        if (isConfirm) 
                        {
                            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                            var ajaxUrl = base_url + '/Roles/delRol/';
                            var strData = "idrol=" + idrol;
                            request.open("POST", ajaxUrl, true);
                            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            request.send(strData);
                            request.onreadystatechange = function() {
                                if (request.readyState == 4 && request.status == 200) {
                                    var objData = JSON.parse(request.responseText);
                                    if (objData.status) {
                                        swal("Eliminar!", objData.msg , "success");
                                        tableRoles.ajax.reload(); // Recarga la tabla
                                    } else {
                                        swal("Atención!", objData.msg , "error");
                                    }
                                }
                            }
                        }
                    });
                } else {
                    console.error("Atributo 'rl' no encontrado en el botón");
                }
                return; // Salir del bucle y función después de manejar el evento
            }
            targetElement = targetElement.parentElement; // ir al ancestro
        }
    });
}

function fntPermisos() {
    document.addEventListener('click', function(event) {
        var targetElement = event.target; // elemento clickeado

        // Buscar el elemento o ancestro que coincida con .btnPermisosRol
        while (targetElement !== null) {
            if (targetElement.matches('.btnPermisosRol')) {

                var idrol = targetElement.getAttribute("rl");
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/Permisos/getPermisosRol/'+idrol;
                request.open("GET",ajaxUrl,true);
                request.send();

                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        document.querySelector('#contentAjax').innerHTML = request.responseText;
                        $('.modalPermisos').modal('show');
                        document.querySelector('#formPermisos').addEventListener('submit',fntSavePermisos,false);
                    }
                }
                
                return; // Salir del bucle y función después de manejar el evento
            }
            targetElement = targetElement.parentElement; // ir al ancestro
        }
    });
}

function fntSavePermisos(evnet){
    evnet.preventDefault();
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = base_url+'/Permisos/setPermisos'; 
    var formElement = document.querySelector("#formPermisos");
    var formData = new FormData(formElement);
    request.open("POST",ajaxUrl,true);
    request.send(formData);

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var objData = JSON.parse(request.responseText);
            if(objData.status)
            {
                swal("Permisos de usuario", objData.msg ,"success");
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
    
}






            

