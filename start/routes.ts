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

Route.group(()=>{

  Route.group(()=>{
    Route.get('/', "TagsController.show")
  }).prefix('tags')

  Route.group(()=>{
    Route.get('/', "BlogPostsController.show")
    Route.get('/:slug', "BlogPostsController.showById")
    Route.post('/', "BlogPostsController.create")
    Route.put('/:slug', "BlogPostsController.update")
    Route.delete('/:slug', "BlogPostsController.delete")
  }).prefix('posts')

}).prefix('api')