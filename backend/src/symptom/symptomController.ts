import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function symptomController(fastify: FastifyInstance) {
    
    fastify.get('/symptoms', async (request, reply) => {
        
        try{ 

            const getSymptom = await prisma.symptom.findMany({
            });
            reply.status(200).send(getSymptom);
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar sintoma!'});
        }
    })

    fastify.get('/symptoms/count', async (request, reply) => {
        
        try{
            
            const countSymptom = await prisma.symptom.count()
            reply.send(countSymptom)
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar sintomas!'});
        
        }
    });

    const symptomIdParam = z.object({
        id: z.number()
    });

    const createSymptomSchema = z.object({
        name: z.string(),
        description: z.string(),
        medication: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        user_id: z.string()
    });
    fastify.post('/symptoms/create', async (request, reply) => {   
        
        try{
            const {name, description, medication, startDate, endDate, user_id} = createSymptomSchema.parse(request.body);
            const createdSymptom = await prisma.symptom.create({
                
                data: {
                    name,
                    description,
                    medication,
                    startDate,
                    endDate,
                    user: { connect: { id: user_id } }
                },
            })

            reply.status(201).send({message: 'sintoma criado com sucesso!'});
            console.log(`sintoma criado: ${JSON.stringify(createdSymptom)}`);
        } catch (error) {
                
            console.error(error);
            
            reply.status(400).send({message: 'Erro ao criar sintoma!'});
            
        }
    })
    

    fastify.put('/symptoms/update/:id', async (request, reply) => {
        
        const {name, description, medication, startDate, endDate} = createSymptomSchema.parse(request.body);

        try{
            const {id} = symptomIdParam.parse(request.params);
            const updatedSymptom = await prisma.symptom.update({
            
                where: { id: id },
            
                data: {
                    name,
                    description,
                    medication,
                    startDate,
                    endDate,
                },

            })

            reply.status(200).send({message: 'sintoma atualizado com sucesso!'});
            console.log(`sintoma atualizado: ${JSON.stringify(updatedSymptom)}`);

        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao atualizar sintoma!'});
        
        }

      })
      
      fastify.delete('/symptoms/delete/:id', async (request, reply) => {
        try{
            const {id} = symptomIdParam.parse(request.params);
            
            await prisma.symptom.delete({

                where: { id: Number(id) },
            
            })

            reply.status(200).send({message: 'sintoma deletado com sucesso!'});
        
        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao deletar sintoma!'});
        
        }

      })
    

    
};

