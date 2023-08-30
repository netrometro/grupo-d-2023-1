"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/user/userController.ts
var userController_exports = {};
__export(userController_exports, {
  default: () => userController
});
module.exports = __toCommonJS(userController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/user/userController.ts
var import_fastify = __toESM(require("fastify"));
var import_zod = require("zod");
var server = (0, import_fastify.default)({ logger: true });
async function userController(fastify2) {
  fastify2.get("/user", async (request, reply) => {
    try {
      const getUser = await prisma.user.findMany({});
      reply.send(getUser);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar usu\xE1rio!" });
    }
  });
  fastify2.get("/user/count", async (request, reply) => {
    try {
      const countUser = await prisma.user.count();
      reply.send(countUser);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar usu\xE1rios!" });
    }
  });
  const userIdParam = import_zod.z.object({
    id: import_zod.z.number()
  });
  const createUserSchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string(),
    password: import_zod.z.string(),
    id: import_zod.z.number()
  });
  fastify2.post("/users/create", async (request, reply) => {
    try {
      const { name, email, password, id } = createUserSchema.parse(request.body);
      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          id
        }
      });
      reply.status(201).send({ message: "Usu\xE1rio registrado com sucesso!" });
      console.log(`Usu\xE1rio registrado: ${JSON.stringify(createdUser)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao registrar usu\xE1rio!" });
    }
  });
  fastify2.put("/users/update/:id", async (request, reply) => {
    const { name, email, password, id } = createUserSchema.parse(request.body);
    try {
      const { id: id2 } = userIdParam.parse(request.params);
      const updatedUser = await prisma.user.update({
        where: { id: id2 },
        data: {
          name,
          email,
          password,
          id: id2
        }
      });
      reply.status(200).send({ message: "Usu\xE1rio atualizado com sucesso!" });
      console.log(`Usu\xE1rio atualizado: ${JSON.stringify(updatedUser)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao atualizar usu\xE1rio!" });
    }
  });
  fastify2.delete("/users/delete/:id", async (request, reply) => {
    try {
      const { id } = userIdParam.parse(request.params);
      await prisma.user.delete({
        where: { id: Number(id) }
      });
      reply.status(200).send({ message: "Usu\xE1rio deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao deletar usu\xE1rio!" });
    }
  });
}
