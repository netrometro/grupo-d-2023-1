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
    
    fastify.post<{ Body: IAllergyBody }>('/allergies/create', async (request, reply) => {
        
        try {
            const { name, treatment, description, user_id } = request.body;
            const createdAllergy = await prisma.alergy.create({
                data: {
                    name,
                    treatment,
                    description,
                    user: { connect: { id: user_id } }
                },
            });

            reply.status(201).send({ message: 'Alergia criada com sucesso!' });
            console.log(`Alergia criada: ${JSON.stringify(createdAllergy)}`);
        } catch (error) {
            console.error(error);
            reply.status(400).send({ message: 'Erro ao criar alergia!' });
        }
    });

    interface IAllergyByIdParam {
        id: number
    }
    
