import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';

export default async function symptomController(fastify: FastifyInstance) {
    
    fastify.get('/symptoms', async (request, reply) => {
        
        try{ 

            const getSymptom = await prisma.symptom.findMany({
            });
            reply.send(getSymptom);
        
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

    interface ISymptomBody {
        name: string,
        description: string,
        medication: string,
        startDate: string,
        endDate: string,
        user_id: string
    };
    
    fastify.post<{Body: ISymptomBody}>('/symptoms/create', async (request, reply) => {   
        
        try{
            const {name, description, medication, startDate, endDate, user_id} = request.body;
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
    
    interface ISymptomByIdParam {
        
        id: number
        
    };
    
    fastify.put <{Params: ISymptomByIdParam, Body:ISymptomBody}>('/symptoms/update/:id', async (request, reply) => {
        
        const {id} = request.params;
        
        const {name, description, medication, startDate, endDate} = request.body;

        try{

            const updatedSymptom = await prisma.symptom.update({
            
                where: { id: Number(id) },
            
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
      
      fastify.delete<{Params: ISymptomByIdParam}>('/symptoms/delete/:id', async (request, reply) => {
        try{
            const {id} = request.params;
            
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

