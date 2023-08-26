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

// src/symptom/symptomController.ts
var symptomController_exports = {};
__export(symptomController_exports, {
  default: () => symptomController
});
module.exports = __toCommonJS(symptomController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/symptom/symptomController.ts
var import_zod = require("zod");
async function symptomController(fastify) {
  fastify.get("/symptoms", async (request, reply) => {
    try {
      const getSymptom = await prisma.symptom.findMany({});
      reply.send(getSymptom);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: "Erro ao buscar sintoma!" });
    }
  });
  fastify.get("/symptoms/count", async (request, reply) => {
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
  fastify.post("/symptoms/create", async (request, reply) => {
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
  fastify.put("/symptoms/update/:id", async (request, reply) => {
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
  fastify.delete("/symptoms/delete/:id", async (request, reply) => {
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
