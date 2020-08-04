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
  Route.get("/me", "UserController.me").middleware("auth:jwt");

  Route.post("/usuario", "UserController.create");
  Route.put("/usuario", "UserController.update").middleware("auth:jwt");
  Route.post("/login", "UserController.login");
  Route.post("/validate", "UserController.validate").middleware("auth:jwt");

  Route.post("/produto", "ProdutoController.store").middleware("auth:jwt");
  Route.get("/produto", "ProdutoController.index");
  Route.get("/produto/:id", "ProdutoController.show");

  Route.post("produto/:slug/images", "ImageController.store").middleware(
    "auth:jwt"
  );

  Route.get("/transacao", "TransacaoController.index").middleware("auth:jwt");
  Route.post("/transacao", "TransacaoController.store").middleware("auth:jwt");

  Route.get("/images/:path", "ImageController.show");
}).prefix("/api/v1");
