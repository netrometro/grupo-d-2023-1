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

// src/info/infoController.ts
var infoController_exports = {};
__export(infoController_exports, {
  default: () => infoController
});
module.exports = __toCommonJS(infoController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/info/infoController.ts
var import_zod = require("zod");
async function infoController(fastify) {
  fastify.get("/info", async (request, reply) => {
    try {
      const getinfo = await prisma.info.findMany({});
      reply.send(getinfo);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar informa\xE7\xE3o!" });
    }
  });
  fastify.get("/info/count", async (request, reply) => {
    try {
      const countinfo = await prisma.info.count();
      reply.send(countinfo);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar informa\xE7\xF5es!" });
    }
  });
  const infoIdParam = import_zod.z.object({
    id: import_zod.z.number()
  });
  const createinfoschema = import_zod.z.object({
    altura: import_zod.z.number().min(0),
    peso: import_zod.z.number().min(0),
    idade: import_zod.z.number().min(0),
    user_id: import_zod.z.string()
  });
  fastify.post("/info/create", async (request, reply) => {
    try {
      const { altura, peso, idade, user_id } = createinfoschema.parse(request.body);
      const createdinfo = await prisma.info.create({
        data: {
          altura,
          peso,
          idade,
          user: { connect: { id: user_id } }
        }
      });
      reply.status(201).send({ message: "informa\xE7\xE3o criado com sucesso!" });
      console.log(`informa\xE7\xE3o criado: ${JSON.stringify(createdinfo)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao criar informa\xE7\xE3o!" });
    }
  });
  fastify.put("/info/update/:id", async (request, reply) => {
    const { altura, peso, idade } = createinfoschema.parse(request.body);
    try {
      const { id } = infoIdParam.parse(request.params);
      const updatedinfo = await prisma.info.update({
        where: { id },
        data: {
          altura,
          peso,
          idade
        }
      });
      reply.status(200).send({ message: "informa\xE7\xE3o atualizado com sucesso!" });
      console.log(`informa\xE7\xE3o atualizado: ${JSON.stringify(updatedinfo)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao atualizar informa\xE7\xE3o!" });
    }
  });
  fastify.delete("/info/delete/:id", async (request, reply) => {
    try {
      const { id } = infoIdParam.parse(request.params);
      await prisma.info.delete({
        where: { id: Number(id) }
      });
      reply.status(200).send({ message: "informa\xE7\xE3o deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao deletar informa\xE7\xE3o!" });
    }
  });
}
