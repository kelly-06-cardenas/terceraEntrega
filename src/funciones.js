const fs = require ('fs');

let cursoestudiante = [];
let listaCurso=[];
let ListaEstudiante=[];
let listarEstudiantes=[];

//const listar = ()=> {
	//ListaClientes = require ('./clientes.json')
	//let texto = "";
	//ListaClientes.forEach(cl =>{
		//texto = texto + "<tr>" + 
		        //" <td>" + c.NombreCurso + "</td>" + 
		        //" <td> " + c.Duracion + "</td>" +
		        //" <td> " + c.valor + "</td></tr>" +
		       // " <td> " + c.ID + "</td></tr>"

	//})

	//texto = texto + "</tbody></table>"

	//return texto

//}




//const listarNombre =  ( )=> {

	//ListaEstudiante = require ('./estudiante.json')
	//var texto = "<select name='cedula' class='form-control'>";
	//ListaEstudiante.forEach(est => {
	//	texto +=  `${texto} <option value='${est.cedula}'>${est.nombre}</option>`
	//	        })
	//texto = texto + "</select>"
	//return texto
//}


const nuevoCurso = (curso) => {
	listaCurso = require ('./cursos.json')
	let cursoEst = {
		ID:curso.ID,
		NombreCurso: curso.NombreCurso,
		Duracion: curso.Duracion,
		valor: curso.valor,
		modalidad: curso.modalidad,
		estado: 'disponible'

	}

	let duplicado= listaCurso.find(elemento=> elemento.ID==curso.ID)
	if(duplicado){
		
		return texto = `<div class='alert alert-danger   alert-dismissible fade show' role'alert'> el curso ya existe <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`
	}
	else{

		listaCurso.push(cursoEst)
		guardar()
		return texto = `<div class='alert alert-success   alert-dismissible fade show' role'alert'> el curso fue creado <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`
	


	}

	

	
}

const cargar = () => {
	try{
		ListaEstudiante = require ('./estudiante.json')
	} catch (err){
		ListaEstudiante=[];

	}
}

const cargar2 = () => {
	try{
		cursoestudiante = require ('./cursoestudiante.json')
	} catch (err){
		cursoestudiante=[];

	}
}

const guardar = ()=> {
	let datos = JSON.stringify(listaCurso);
	fs.writeFile('src/cursos.json', datos, (err)=>{
		if (err) throw(err);
		console.log('archivo fue creado con exito ')
	})
}


const inscribirEST = (estudiante) => {

	//cargar();
	//cargar2();
	//console.log("hola"+ListaEstudiante)
	ListaEstudiante= require ('./estudiante.json')
	cursoestudiante= require('./cursoestudiante.json')
	listaCurso = require ('./cursos.json')
	console.log(ListaEstudiante)
    console.log(cursoestudiante)

	if(estudiante){
		let nuevoEstudiante={
			NombreEst: estudiante.Nombre,
			correo: estudiante.correo,
			IDcurso: estudiante.IDcurso
		}
		let idEstudianteCurso={
			NombreEst: estudiante.Nombre,
			IDcurso: estudiante.IDcurso
		}

		let duplicado= ListaEstudiante.find(elemento=> elemento.NombreEst==estudiante.Nombre)
	if(duplicado){
		console.log(duplicado)

		
		texto = `<div class='alert alert-danger   alert-dismissible fade show' role'alert'> el estudiante ya existe <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`
	}
	else{

		ListaEstudiante.push(nuevoEstudiante)
		cursoestudiante.push(idEstudianteCurso)
		let datos = JSON.stringify(ListaEstudiante);
	    fs.writeFile('src/estudiante.json', datos, (err)=>{
		if (err) throw(err);


		
	})
	    let datos2 = JSON.stringify(cursoestudiante);
	    fs.writeFile('src/cursoestudiante.json', datos2, (err)=>{
		if (err) throw(err);
		
	})
	  texto = `<div class='alert alert-success   alert-dismissible fade show' role'alert'> el estudiante ya fue matriculado <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`
	   let estudiante2=cursoestudiante.filter(elemento=>elemento.IDcurso==estudiante.IDcurso)
	   let duplicado2=listaCurso.find(elemento2=>elemento2.ID==estudiante.IDcurso)
	   if(estudiante2.length==duplicado2.cupo){
			duplicado2.estado="cerrado"
			guardar()

	


	} 
	}

	return texto

	}



	

}



  const listarEst = (id_Curso) => {
  	//console.log('funciona '+ id_Curso)

	if(id_Curso){
		ListaEstudiante= require ('./estudiante.json')
		listarEstudiantes= require('./cursoestudiante.json')

		let estudiantes = listarEstudiantes.filter(elemento=>elemento.IDcurso==id_Curso)
		var texto="";
		//console.log(estudiantes)
		estudiantes.forEach(elemento=>{
			let nuevoEstudiante= ListaEstudiante.find(buscar=>buscar.NombreEst==elemento.NombreEst)
			//console.log( nuevoEstudiante+elemento.NombreEst)
			texto=texto+`<tr><td>${nuevoEstudiante.NombreEst}</td><td>${nuevoEstudiante.correo}</td><td><button type="submit" class="btn btn-success" value="${nuevoEstudiante.NombreEst}" name="nombreEstu">Eliminar</button></td></tr>`
			
		})
		return texto 

	}


   }

   const eliminar  = (nombreEstu) => {
  	
  	let texto="";
  	console.log( nombreEstu)

	if(nombreEstu){
		ListaEstudiante= require ('./estudiante.json')
		cursoestudiante= require ('./cursoestudiante.json')

		

		let estudiantes = ListaEstudiante.filter(elemento=>elemento.NombreEst!=nombreEstu)
		let nuevoCursoEstudiante = cursoestudiante.filter(elemento=>elemento.NombreEst!=nombreEstu)
		//console.log( estudiantes)
		if(estudiantes){
			cursoestudiante=nuevoCursoEstudiante
			ListaEstudiante=estudiantes
			let datos = JSON.stringify(cursoestudiante);
	       fs.writeFile('src/cursoestudiante.json', datos, (err)=>{
		   if (err) throw(err);

		   })
			//ListaEstudiante.push(nuevoEstudiante)
		    //cursoestudiante.push(idEstudianteCurso)
		    let datos2 = JSON.stringify(ListaEstudiante);
	       fs.writeFile('src/estudiante.json', datos2, (err)=>{
		   if (err) throw(err);

		   })

		   return texto="el estudiante fue eliminado."


	} else{

		return texto="no se encontro el estudiante."
	}


   }

 }



	



 module.exports = {
 	//listar,
 	//listarNombre,
 	nuevoCurso,
 	inscribirEST,
 	listarEst,
 	eliminar
 	
 }


