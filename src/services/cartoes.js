const { default: instance } = require("common/config/api");

const cartoesService = {
  buscarPorIdUsuario: async (usuarioId) => {
    const response = await instance.get("/cartoes.json");
    return response.data.cartoes.filter((cartao) => cartao.usuarioId === usuarioId);
  }
}

export default cartoesService