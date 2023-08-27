import Fastify from 'fastify'
import { FastifyInstance } from 'fastify/types/instance';
import fastifyCors from '@fastify/cors';
import symptomController from './symptom/symptomController';
import allergiesController from './allergies/allergiesController';

export const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.register(fastifyCors, {
  origin: '*',
});

fastify.register(symptomController, allergiesController)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3333 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start() 

