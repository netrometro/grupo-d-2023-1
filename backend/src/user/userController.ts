import { prisma } from '../lib/prisma'
import fastify, { FastifyInstance } from 'fastify';
import { z } from 'zod';

const server = fastify({ logger: true });

export default async function userController(fastify:FastifyInstance) {
    fastify.get('/user', async (request, reply) => {
        
        try{ 

            const getUser = await prisma.user.findMany({
            });
            reply.send(getUser);
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar usuário!'});
        }
    })

    fastify.get('/user/count', async (request, reply) => {
        
        try{
            
            const countUser = await prisma.user.count()
            reply.send(countUser)
        
        } catch (error) {
            
            console.error(error);
            reply.status(400).send({message: 'Erro ao buscar usuários!'});
        
        }
    });

    const userIdParam = z.object({
        id: z.number()
    });

    const createUserSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        id: z.number(),
    });

    fastify.post('/users/create', async (request, reply) => {   
        
        try{
            const {name, email, password, id} = createUserSchema.parse(request.body);
            const createdUser = await prisma.user.create({
                
                data: {
                    name,
                    email,
                    password,
                    id,
                },
            })

            reply.status(201).send({message: 'Usuário registrado com sucesso!'});
            console.log(`Usuário registrado: ${JSON.stringify(createdUser)}`);
        } catch (error) {
                
            console.error(error);
            
            reply.status(400).send({message: 'Erro ao registrar usuário!'});
            
        }
    })

    fastify.put('/users/update/:id', async (request, reply) => {
        
        const {name, email, password, id} = createUserSchema.parse(request.body);

        try{
            const {id} = userIdParam.parse(request.params);
            const updatedUser = await prisma.user.update({
            
                where: { id: id },
            
                data: {
                    name,
                    email,
                    password,
                    id,
                },

            })

            reply.status(200).send({message: 'Usuário atualizado com sucesso!'});
            console.log(`Usuário atualizado: ${JSON.stringify(updatedUser)}`);

        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao atualizar usuário!'});
        
        }

      })

      fastify.delete('/users/delete/:id', async (request, reply) => {
        try{
            const {id} = userIdParam.parse(request.params);
            
            await prisma.user.delete({

                where: { id: Number(id) },
            
            })

            reply.status(200).send({message: 'Usuário deletado com sucesso!'});
        
        } catch (error) {

            console.error(error);
            reply.status(400).send({message: 'Erro ao deletar usuário!'});
        
        }

      })

}
