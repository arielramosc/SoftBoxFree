import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
   query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }

`;

const GET_USUARIO = gql`
  query Usuario($id: String!) {
    Usuario(_id: $id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };