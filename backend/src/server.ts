import Fastify from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import fastifyCors from "@fastify/cors";
import symptomController from "./symptom/symptomController";
import allergiesController from "./allergies/allergiesController";
import infoController from "./info/infoController";

export const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(fastifyCors, {
  origin: "*",
});

fastify.register(symptomController, allergiesController);
fastify.register(infoController);

/**
 * Run the server!
 */

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

fastify.listen({port: port, host:"0.0.0.0",}, function(err, address){
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
