import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function infoController(fastify: FastifyInstance) {
    
    fastify.get('/info', async (request, reply) => {
        
        try{ 

            const getinfo = await prisma.info.findMany({
            });
            reply.send(getinfo);
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar informação!'});
        }
    })

    fastify.get('/info/count', async (request, reply) => {
        
        try{
            
            const countinfo = await prisma.info.count()
            reply.send(countinfo)
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar informações!'});
        
        }
    });

    const infoIdParam = z.object({
        id: z.number()
    });

    const createinfoschema = z.object({
        altura:     z.number().min(0),
        peso:       z.number().min(0),
        idade:      z.number().min(0),
        user_id:    z.string()
    });
    fastify.post('/info/create', async (request, reply) => {   
        
        try{
            const {altura, peso, idade, user_id} = createinfoschema.parse(request.body);
            const createdinfo = await prisma.info.create({
                
                data: {
                    altura, 
                    peso, 
                    idade,
                    user: { connect: { id: user_id } }
                },
            })

            reply.status(201).send({message: 'informação criado com sucesso!'});
            console.log(`informação criado: ${JSON.stringify(createdinfo)}`);
        } catch (error) {
                
            console.error(error);
            
            reply.status(400).send({message: 'Erro ao criar informação!'});
            
        }
    })
    

    fastify.put('/info/update/:id', async (request, reply) => {
        
        const {altura, peso, idade} = createinfoschema.parse(request.body);

        try{
            const {id} = infoIdParam.parse(request.params);
            const updatedinfo = await prisma.info.update({
            
                where: { id: id },
            
                data: {
                    altura, 
                    peso, 
                    idade,
                },

            })

            reply.status(200).send({message: 'informação atualizado com sucesso!'});
            console.log(`informação atualizado: ${JSON.stringify(updatedinfo)}`);

        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao atualizar informação!'});
        
        }

      })
      
      fastify.delete('/info/delete/:id', async (request, reply) => {
        try{
            const {id} = infoIdParam.parse(request.params);
            
            await prisma.info.delete({

                where: { id: Number(id) },
            
            })

            reply.status(200).send({message: 'informação deletado com sucesso!'});
        
        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao deletar informação!'});
        
        }

      })
    

    
};

