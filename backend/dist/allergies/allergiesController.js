"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/allergies/allergiesController.ts
var allergiesController_exports = {};
__export(allergiesController_exports, {
  default: () => allergyController
});
module.exports = __toCommonJS(allergiesController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/allergies/allergiesController.ts
async function allergyController(fastify) {
  fastify.get("/allergies", async (request, reply) => {
    try {
      const getAllergies = await prisma.alergy.findMany();
      reply.send(getAllergies);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar alergias!" });
    }
  });
  fastify.get("/allergies/count", async (request, reply) => {
    try {
      const countAllergies = await prisma.alergy.count();
      reply.send(countAllergies);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar contagem de alergias!" });
    }
  });
  fastify.post("/allergies/create", async (request, reply) => {
    try {
      const { name, treatment, description, user_id } = request.body;
      const createdAllergy = await prisma.alergy.create({
        data: {
          name,
          treatment,
          description,
          user: { connect: { id: user_id } }
        }
      });
      reply.status(201).send({ message: "Alergia criada com sucesso!" });
      console.log(`Alergia criada: ${JSON.stringify(createdAllergy)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao criar alergia!" });
    }
  });
  fastify.put("/allergies/update/:id", async (request, reply) => {
    const { id } = request.params;
    const { name, treatment, description } = request.body;
    try {
      const updatedAllergy = await prisma.alergy.update({
        where: { id: Number(id) },
        data: {
          name,
          treatment,
          description
        }
      });
      reply.status(200).send({ message: "Alergia atualizada com sucesso!" });
      console.log(`Alergia atualizada: ${JSON.stringify(updatedAllergy)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao atualizar alergia!" });
    }
  });
  fastify.delete("/allergies/delete/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      await prisma.alergy.delete({
        where: { id: Number(id) }
      });
      reply.status(200).send({ message: "Alergia deletada com sucesso!" });
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao deletar alergia!" });
    }
  });
}
