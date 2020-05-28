/* eslint-disable no-undef */
"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("/users", "UserController.create");
  Route.post("/login", "UserController.login");
  Route.get("/me", "UserController.me").middleware("auth:jwt");
  Route.post("/produtos", "ProdutoController.store").middleware("auth:jwt");
  Route.post("produtos/:id/images", "ImageController.store").middleware(
    "auth:jwt"
  );
  Route.get("images/:path", "ImageController.show");
}).prefix("/api/v1");
