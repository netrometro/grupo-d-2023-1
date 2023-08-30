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

// src/server.ts
var server_exports = {};
__export(server_exports, {
  fastify: () => fastify
});
module.exports = __toCommonJS(server_exports);
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/symptom/symptomController.ts
var import_zod = require("zod");
async function symptomController(fastify2) {
  fastify2.get("/symptoms", async (request, reply) => {
    try {
      const getSymptom = await prisma.symptom.findMany({});
      reply.send(getSymptom);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar sintoma!" });
    }
  });
  fastify2.get("/symptoms/count", async (request, reply) => {
    try {
      const countSymptom = await prisma.symptom.count();
      reply.send(countSymptom);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar sintomas!" });
    }
  });
  const symptomIdParam = import_zod.z.object({
    id: import_zod.z.number()
  });
  const createSymptomSchema = import_zod.z.object({
    name: import_zod.z.string(),
    description: import_zod.z.string(),
    medication: import_zod.z.string(),
    startDate: import_zod.z.string(),
    endDate: import_zod.z.string(),
    user_id: import_zod.z.string()
  });
  fastify2.post("/symptoms/create", async (request, reply) => {
    try {
      const { name, description, medication, startDate, endDate, user_id } = createSymptomSchema.parse(request.body);
      const createdSymptom = await prisma.symptom.create({
        data: {
          name,
          description,
          medication,
          startDate,
          endDate,
          user: { connect: { id: user_id } }
        }
      });
      reply.status(201).send({ message: "sintoma criado com sucesso!" });
      console.log(`sintoma criado: ${JSON.stringify(createdSymptom)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao criar sintoma!" });
    }
  });
  fastify2.put("/symptoms/update/:id", async (request, reply) => {
    const { name, description, medication, startDate, endDate } = createSymptomSchema.parse(request.body);
    try {
      const { id } = symptomIdParam.parse(request.params);
      const updatedSymptom = await prisma.symptom.update({
        where: { id },
        data: {
          name,
          description,
          medication,
          startDate,
          endDate
        }
      });
      reply.status(200).send({ message: "sintoma atualizado com sucesso!" });
      console.log(`sintoma atualizado: ${JSON.stringify(updatedSymptom)}`);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao atualizar sintoma!" });
    }
  });
  fastify2.delete("/symptoms/delete/:id", async (request, reply) => {
    try {
      const { id } = symptomIdParam.parse(request.params);
      await prisma.symptom.delete({
        where: { id: Number(id) }
      });
      reply.status(200).send({ message: "sintoma deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao deletar sintoma!" });
    }
  });
}

// src/allergies/allergiesController.ts
async function allergyController(fastify2) {
  fastify2.get("/allergies", async (request, reply) => {
    try {
      const getAllergies = await prisma.alergy.findMany();
      reply.send(getAllergies);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar alergias!" });
    }
  });
  fastify2.get("/allergies/count", async (request, reply) => {
    try {
      const countAllergies = await prisma.alergy.count();
      reply.send(countAllergies);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar contagem de alergias!" });
    }
  });
  fastify2.post("/allergies/create", async (request, reply) => {
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
  fastify2.put("/allergies/update/:id", async (request, reply) => {
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
  fastify2.delete("/allergies/delete/:id", async (request, reply) => {
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

// src/info/infoController.ts
var import_zod2 = require("zod");
async function infoController(fastify2) {
  fastify2.get("/info", async (request, reply) => {
    try {
      const getinfo = await prisma.info.findMany({});
      reply.send(getinfo);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar informa\xE7\xE3o!" });
    }
  });
  fastify2.get("/info/count", async (request, reply) => {
    try {
      const countinfo = await prisma.info.count();
      reply.send(countinfo);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar informa\xE7\xF5es!" });
    }
  });
  const infoIdParam = import_zod2.z.object({
    id: import_zod2.z.number()
  });
  const createinfoschema = import_zod2.z.object({
    altura: import_zod2.z.number().min(0),
    peso: import_zod2.z.number().min(0),
    idade: import_zod2.z.number().min(0),
    user_id: import_zod2.z.string()
  });
  fastify2.post("/info/create", async (request, reply) => {
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
  fastify2.put("/info/update/:id", async (request, reply) => {
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
  fastify2.delete("/info/delete/:id", async (request, reply) => {
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

// src/server.ts
var fastify = (0, import_fastify.default)({
  logger: true
});
fastify.register(import_cors.default, {
  origin: "*"
});
fastify.register(symptomController, allergyController);
fastify.register(infoController);
var start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 3333
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fastify
});
