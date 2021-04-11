const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require ('body-parser')
require('./helpers')
const port = process.env.PORT || 3000;


//Path
const dirPublic = path.join(__dirname, "../public")
const dirViews = path.join(__dirname, "../template/views")
const dirPartials = path.join(__dirname, '../template/partials')

//Static
app.use(express.static(dirPublic))

//BodyParser
app.use(bodyParser.urlencoded({extended : false}))

//hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)

//Paginas
app.get('/', function (req, res){
	res.render('index',{
		titulo: 'Inicio'
	})
})

app.get('/cursos', function (req, res){
	res.render('cursos', {
		titulo: 'curso',
		
	})
})

app.post('/cursos', function(req, res){
	res.render('cursos2', {
		titulo: 'Ver cursos',
		NombreCurso: req.body.NombreCurso,
		Duracion: req.body.Duracion,
		valor: req.boody.valor
	
	})

});

app.get('/registrar', function (req, res){
	res.render('registrar', {
		titulo: 'registrar',
		
	})
})

app.post('/registrar', function (req, res){
	res.render('registrar', {
		titulo: 'registrar',
		Nombre: req.body.NombreCurso,
		Duracion: req.body.Duracion,
		valor: req.body.valor,
		ID: req.body.ID,
		modalidad: req.body.modalidad
	})
})

app.get('/inscribir', function(req, res){
	res.render('inscribir',{
		titulo: 'inscribir'
	})

})
app.post('/inscribir', function(req, res){
	res.render('inscribir',{
		titulo: 'inscribir',
		NombreEst: req.body.nombreEst,
		correo: req.body.correo,
		IDcurso: req.body.IDcurso

	})

})


app.get('/listaINScripciones', function(req, res){
	res.render('listaINScripciones',{
		titulo:'lista de inscripciones'
	})
})

app.post('/listaINScripciones', function(req, res){
	res.render('listaINScripciones',{
		titulo:'lista de inscripciones',
		id_Curso: req.body.id_Curso,
		nombreEstu: req.body.nombreEstu
	})
})











//error 404
app.get('*',function (req,res){
	res.render('error',{
		titulo:'Error 404'

	})
})

app.listen(port, () => {
	console.log('Servidor en el puerto '+ port)
})