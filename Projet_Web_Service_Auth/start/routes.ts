/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/account', 'AuthController.register') // sign up
Route.post('/api/token', 'AuthController.login') // log in
Route.get('/api/account/:uid', 'AuthController.me').middleware(['auth']) // get user
Route.put('/api/account/:uid', 'AuthController.update').middleware(['auth']) // update user
//Route.post('/api/refresh-token/:refreshToken/token', ) // refresh session
//Route.get('/api/validate/:accessToken', ) // validate token

Route.resource('tasks', 'TaskController').apiOnly()
