import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export default async function allergyController(fastify: FastifyInstance) {
    
    fastify.get('/allergies', async (request, reply) => {
        
        try { 
            const getAllergies = await prisma.alergy.findMany();
            reply.send(getAllergies);
        } catch (error) {
            console.error(error);
            reply.status(400).send({ message: 'Erro ao buscar alergias!' });
        }
    });

    fastify.get('/allergies/count', async (request, reply) => {
        
        try {
            const countAllergies = await prisma.alergy.count();
            reply.send(countAllergies);
        } catch (error) {
            console.error(error);
            reply.status(400).send({ message: 'Erro ao buscar contagem de alergias!' });
        }
    });

    interface IAllergyBody {
        name: string,
        treatment: string,
        description: string,
        user_id: string
    }
    
