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

fastify.listen({
  host:'0.0.0.0',
  port:process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() =>{
  console.log("HTTP SERVER LISTENING STARTED")
})
