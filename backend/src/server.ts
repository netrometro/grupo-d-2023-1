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
    const port = process.env.PORT || 3000;
    const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

    await fastify.listen(port, host)
    fastify.log.info(`server listening on ${fastify.server.address()}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start() 

