const hbs = require ('hbs')
const funciones = require('./funciones')

hbs.registerHelper('listar', ()=>{
	ListaCursos = require ('./cursos.json')
	let texto = "";
	ListaCursos.forEach(c =>{
		texto = texto + "<tr>" + 

		        " <td>" + c.NombreCurso + "</td>" + 
		        " <td> " + c.Duracion + "</td>" +
		        " <td> " + c.valor + "</td>" +
		        " <td> " + c.ID + "</td>"+
		        " <td> " + c.estado + "</td></tr>"
	})

	return texto
}); 

hbs.registerHelper('registrar', (Nombre, Duracion, valor, ID, modalidad)=>{
	

	if (Nombre){
		let c = {
			NombreCurso: Nombre,
			Duracion: Duracion,
			valor: parseInt(valor),
			ID: parseInt(ID),
			modalidad: modalidad

		    }
		

		
		return funciones.nuevoCurso(c)
	}
})

hbs.registerHelper('registrarEST', (NombreEst, correo, IDcurso)=>{
	

	if (NombreEst){
		let estudiante = {
			Nombre: NombreEst,
			correo: correo,
			IDcurso: IDcurso

		    }
		    

		
		return funciones.inscribirEST(estudiante)
	}
})

hbs.registerHelper('listarEstudiantes', (id_Curso)=>{
	try{
		return funciones.listarEst(id_Curso)

	}catch(err){

		return "no se pudo mostrar los estudiantes"
	}
	

	
		    

		

})

hbs.registerHelper('eliminarEst', (nombreEstu)=>{
	console.log( nombreEstu)

	try{
		return funciones.eliminar(nombreEstu)

	}catch(err){

		return "no se pudo eliminar el estudiante"
	}


		

})



