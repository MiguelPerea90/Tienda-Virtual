var tableUsuarios;

document.addEventListener('DOMContentLoaded', function(){

    //Inicialización de DataTable para mostrar Roles
    tableUsuarios = $('#tableUsuarios').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": " "+base_url+"/Usuarios/getUsuarios",
            "dataSrc": ""
        },
         "columns":[
            {"data":"id_persona"},
            {"data":"nombres"},
            {"data":"apellidos"},
            {"data":"email_user"},
            {"data":"telefono"},
            {"data":"nombre_rol"},
            {"data":"status"},
            {"data":"options"}
        ],
        "responsive":true,
        "bDestroy": true,
        "iDisplayLength": 5,
        "order":[[0,"desc"]] 
    });

    var formUsuario = document.querySelector("#formUsuario");
    formUsuario.onsubmit = function(e) {
        e.preventDefault();
        var strIdentificacion = document.querySelector('#txtIdentificacion').value;
        var strNombre = document.querySelector('#txtNombre').value;
        var strApellido = document.querySelector('#txtApellido').value;
        var strEmail = document.querySelector('#txtEmail').value;
        var intTelefono = document.querySelector('#txtTelefono').value;
        var intTipousuario = document.querySelector('#listRolid').value;
        var strPassword = document.querySelector('#txtPassword').value;

        if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || intTipousuario == '')
        {
            swal("Atención", "Todos los campos son obligatorios." , "error");
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'/Usuarios/setUsuario'; 
        var formData = new FormData(formUsuario);
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    $('#modalFormUsuario').modal("hide");
                    formUsuario.reset();
                    swal("Usuarios", objData.msg ,"success");
                    tableUsuarios.ajax.reload(); // Refresca la tabla

                }else{
                    swal("Error", objData.msg , "error");
                }
            }
        }
    }
}, false);

window.addEventListener('load', function() {
    fntRolesUsuario();
    // fntViewUsuario();
    // fntEditUsuario();
    // fntDelUsuario();
}, false);

function fntRolesUsuario(){
    var ajaxUrl = base_url+'/Roles/getSelectRoles';
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            document.querySelector('#listRolid').innerHTML = request.responseText;
            document.querySelector('#listRolid').value = 1;
            $('#listRolid').selectpicker('render');
        }
    }
    
}

// function fntViewUsuario(){
//     document.addEventListener('click', function(e) {
//         var targetElement = e.target;

//         // Si el elemento clicado es el icono, o cualquier otro hijo del botón, subimos al elemento padre hasta encontrar el botón
//         while (!targetElement.classList.contains('btnViewUsuario') && targetElement.parentElement) {
//             targetElement = targetElement.parentElement;
//         }

//         // Verifica si el elemento final tiene la clase 'btnViewUsuario'
//         if (targetElement.classList.contains('btnViewUsuario')) {
            
//             var idpersona = targetElement.getAttribute('us');
//             var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//             var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
//             request.open("GET", ajaxUrl, true);
//             request.send();

//             request.onreadystatechange = function(){
//                 if(request.readyState == 4 && request.status == 200){
//                     var objData = JSON.parse(request.responseText);
        
//                     if(objData.status)
//                     {
//                        var estadoUsuario = objData.data.status == 1 ? 
//                         '<span class="badge badge-success">Activo</span>' : 
//                         '<span class="badge badge-danger">Inactivo</span>';
        
//                         document.querySelector("#celIdentificacion").innerHTML = objData.data.identificacion;
//                         document.querySelector("#celNombre").innerHTML = objData.data.nombres;
//                         document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
//                         document.querySelector("#celTelefono").innerHTML = objData.data.telefono;
//                         document.querySelector("#celEmail").innerHTML = objData.data.email_user;
//                         document.querySelector("#celTipoUsuario").innerHTML = objData.data.nombre_rol;
//                         document.querySelector("#celEstado").innerHTML = estadoUsuario;
//                         document.querySelector("#celFechaRegistro").innerHTML = objData.data.fechaRegistro; 
//                         $('#modalViewUser').modal('show');
//                     }else{
//                         swal("Error", objData.msg , "error");
//                     }
//                 }
//             }
//         }
//     });
// }

function fntViewUsuario(idpersona){
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var objData = JSON.parse(request.responseText);
    
            if(objData.status) {
                var estadoUsuario = objData.data.status == 1 ? 
                    '<span class="badge badge-success">Activo</span>' : 
                    '<span class="badge badge-danger">Inactivo</span>';
    
                document.querySelector("#celIdentificacion").innerHTML = objData.data.identificacion;
                document.querySelector("#celNombre").innerHTML = objData.data.nombres;
                document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
                document.querySelector("#celTelefono").innerHTML = objData.data.telefono;
                document.querySelector("#celEmail").innerHTML = objData.data.email_user;
                document.querySelector("#celTipoUsuario").innerHTML = objData.data.nombre_rol;
                document.querySelector("#celEstado").innerHTML = estadoUsuario;
                document.querySelector("#celFechaRegistro").innerHTML = objData.data.fechaRegistro; 
                $('#modalViewUser').modal('show');
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }
}

// function fntEditUsuario(){
//     document.addEventListener('click', function(e) {
//         var targetElement = e.target;

//         // Si el elemento clicado es el icono, o cualquier otro hijo del botón, subimos al elemento padre hasta encontrar el botón
//         while (!targetElement.classList.contains('btnEditUsuario') && targetElement.parentElement) {
//             targetElement = targetElement.parentElement;
//         }

//         // Verifica si el elemento final tiene la clase 'btnViewUsuario'
//         if (targetElement.classList.contains('btnEditUsuario')) {

//             document.querySelector('#titleModal').innerHTML ="Actualizar Usuario";
//             document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
//             document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
//             document.querySelector('#btnText').innerHTML ="Actualizar";
            
//             var idpersona = targetElement.getAttribute('us'); 
//             var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//             var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
//             request.open("GET", ajaxUrl, true);
//             request.send();

//             request.onreadystatechange = function(){

//                 if(request.readyState == 4 && request.status == 200){
//                     var objData = JSON.parse(request.responseText);
        
//                     if(objData.status)
//                     {
//                         document.querySelector("#idUsuario").value = objData.data.id_persona;
//                         document.querySelector("#txtIdentificacion").value = objData.data.identificacion;
//                         document.querySelector("#txtNombre").value = objData.data.nombres;
//                         document.querySelector("#txtApellido").value = objData.data.apellidos;
//                         document.querySelector("#txtTelefono").value = objData.data.telefono;
//                         document.querySelector("#txtEmail").value = objData.data.email_user;
//                         document.querySelector("#listRolid").value =objData.data.id_rol;
//                         $('#listRolid').selectpicker('render'); // Renderiza las options con los nuevos valores

//                         if(objData.data.status == 1){ // Validación para los status
//                             document.querySelector("#listStatus").value = 1;
//                         }else{
//                             document.querySelector("#listStatus").value = 2;
//                         }
//                         $('#listStatus').selectpicker('render'); // Renderiza la nueva opción seteada
//                     }
//                 }
//                 $('#modalFormUsuario').modal('show');
//             }
//         }
//     });
// }

function fntEditUsuario(idpersona) {
    document.querySelector('#titleModal').innerHTML ="Actualizar Usuario";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML ="Actualizar";
            
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = base_url + '/Usuarios/getUsuario/' + idpersona;
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var objData = JSON.parse(request.responseText);
            if(objData.status) {
                document.querySelector("#idUsuario").value = objData.data.id_persona;
                document.querySelector("#txtIdentificacion").value = objData.data.identificacion;
                document.querySelector("#txtNombre").value = objData.data.nombres;
                document.querySelector("#txtApellido").value = objData.data.apellidos;
                document.querySelector("#txtTelefono").value = objData.data.telefono;
                document.querySelector("#txtEmail").value = objData.data.email_user;
                document.querySelector("#listRolid").value = objData.data.id_rol;
                $('#listRolid').selectpicker('render');

                if(objData.data.status == 1) {
                    document.querySelector("#listStatus").value = 1;
                } else {
                    document.querySelector("#listStatus").value = 2;
                }
                $('#listStatus').selectpicker('render');
            }
            $('#modalFormUsuario').modal('show');
        }
    }
}

// function fntDelUsuario() {
//     document.addEventListener('click', function(event) {
//         var targetElement = event.target; // elemento clickeado

//         // Buscar el elemento o ancestro que coincida con .btnDelRol
//         while (targetElement !== null) {
//             if (targetElement.matches('.btnDelUsuario')) {
//                 var idUsuario = targetElement.getAttribute("us");
//                 if (idUsuario) {
//                     swal({
//                         title: "Eliminar Usuario",
//                         text: "¿Realmente quiere eliminar el Usuario?",
//                         type: "warning",
//                         showCancelButton: true,
//                         confirmButtonText: "Si, eliminar!",
//                         cancelButtonText: "No, cancelar!",
//                         closeOnConfirm: false,
//                         closeOnCancel: true
//                     }, function(isConfirm) {
                        
//                         if (isConfirm) 
//                         {
//                             var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//                             var ajaxUrl = base_url + '/Usuarios/delUsuario/';
//                             var strData = "idUsuario=" + idUsuario;
//                             request.open("POST", ajaxUrl, true);
//                             request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//                             request.send(strData);
//                             request.onreadystatechange = function() {
//                                 if (request.readyState == 4 && request.status == 200) {
//                                     var objData = JSON.parse(request.responseText);
//                                     if (objData.status) {
//                                         swal("Eliminar!", objData.msg , "success");
//                                         tableUsuarios.ajax.reload(); // Recarga la tabla
//                                     } else {
//                                         swal("Atención!", objData.msg , "error");
//                                     }
//                                 }
//                             }
//                         }
//                     });
//                 } else {
//                     console.error("Atributo 'us' no encontrado en el botón");
//                 }
//                 return; // Salir del bucle y función después de manejar el evento
//             }
//             targetElement = targetElement.parentElement; // ir al ancestro
//         }
//     });
// }

function fntDelUsuario(idUsuario) {
    swal({
        title: "Eliminar Usuario",
        text: "¿Realmente quiere eliminar el Usuario?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm) {
        if (isConfirm) {
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + '/Usuarios/delUsuario/';
            var strData = "idUsuario=" + idUsuario;
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal("Eliminar!", objData.msg , "success");
                        tableUsuarios.ajax.reload(); // Recarga la tabla
                    } else {
                        swal("Atención!", objData.msg , "error");
                    }
                }
            }
        }
    });
}

function openModal()
{
    document.querySelector('#idUsuario').value ="";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML ="Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
    document.querySelector("#formUsuario").reset();
    $('#modalFormUsuario').modal('show');
}
