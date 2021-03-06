import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { tipos } from './graphql/tipos.js'
import { resolvers } from './graphql/resolvers.js';
import { conectarBD } from './db/db.js';
import { validarToken } from './util/tokenUtil.js';

/** Permite usar variables de entorno, se definen en el archivo .env */
dotenv.config();

const getUserData = (token) => {
    const verificacion = validarToken(token.split(' ')[1]);
    if (verificacion.data) {
        return verificacion.data;
    } else {
        return null;
    }
};

const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers,
    context: ({ req, res }) => {
        const token = req.headers?.authorization ?? null;
        if (token) {
            const userData = getUserData(token);
            if (userData) {
                return { userData };
            }
        }
        return null;
    },
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
    await conectarBD();
    await server.start();

    server.applyMiddleware({ app });

    console.log('Servidor Listo');
})