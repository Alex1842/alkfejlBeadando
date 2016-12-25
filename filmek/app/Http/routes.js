'use strict'

const Route = use('Route')

Route.get('/','HomeController.index')
//Route.get('/notes', 'HomeController.notes')
Route.get('/critics', 'HomeController.critics')
Route.get('/loginSignUp', 'HomeController.loginSignUp')
Route.post('login', 'RegisterOrAuthController.login')
Route.post('register', 'RegisterOrAuthController.doRegister')
Route.get('/logout', 'RegisterOrAuthController.logout')
//Route.get('/createNote','NotesController.create')
Route.post('createNote', 'NotesController.doCreate')
Route.get('/showNote/:id', 'NotesController.show')
Route.get('/editNote/:id', 'NotesController.edit')
Route.get('/deleteNote/:id', 'NotesController.delete')
Route.post('editNote/:id', 'NotesController.doEdit')
Route.post('addCategory', 'CriticsController.addCategory')
Route.get('/createCritic', 'CriticsController.create')
Route.post('createCritic','CriticsController.doCreate')
Route.get('/editCritic/:id', 'CriticsController.edit')
Route.post('editCritic/:id', 'CriticsController.doEdit')
Route.get('/vieWCritic/:id', 'CriticsController.view')
Route.post('viewCritic/:id', 'CriticsController.doView')
Route.post('/editCategory/:id', 'CriticsController.editCategory')
Route.get('deleteCritic/:id','CriticsController.delete')
Route.get('/deleteCategory/:id','CriticsController.deleteCategory')
Route.get('/vieWCritic/:id', 'CriticsController.view')
Route.post('viewCritic/:id', 'CriticsController.doView')
Route.get('/critics', 'CriticsController.search')
Route.group('ajax', function () {
   Route.delete('/critics/:id/delete', 'CriticsController.ajaxDelete').middleware('auth')
   Route.post('/loginSignUp', 'UserController.ajaxLogin')
 }).prefix('/ajax')