/* eslint-disable no-undef */
"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
const Produto = use("App/Models/Produto");
const Helpers = use("Helpers");

class ImageController {
  async index() {
    await Produto.query()
      .with("images")
      .fetch();
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`));
  }

  async store({ request, params }) {
    const produto = await Produto.findBy("slug", params.id);
    console.log(request);
    const images = request.file("image", {
      types: ["image"],
      size: "5mb"
    });
    await images.moveAll(Helpers.tmpPath("uploads"), file => ({
      name: `${Date.now()}-${file.clientName}`
    }));

    if (!images.movedAll()) {
      return images.errors();
    }

    await Promise.all(
      images
        .movedList()
        .map(image => produto.images().create({ path: image.fileName }))
    );
  }
}

module.exports = ImageController;
