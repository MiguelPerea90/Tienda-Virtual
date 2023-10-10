var tableRoles;

document.addEventListener('DOMContentLoaded', function(){

    //Inicialización de DataTable para mostrar Roles
	tableRoles = $('#tableRoles').DataTable( {
		"aProcessing":true,
		"aServerSide":true,
        "language": {
        	"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Roles/getRoles",
            "dataSrc":""
        },
        "columns":[
            {"data":"id_rol"},
            {"data":"nombre_rol"},
            {"data":"descripcion"},
            {"data":"status"},
            // {"data":"options"},
        ],
        "responsive":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"desc"]]  
    });

});

$('#tableRoles').DataTable();

function openModal() {
    $('#modalFormRol').modal('show');
}
