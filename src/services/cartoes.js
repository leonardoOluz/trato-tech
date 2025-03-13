const { default: instance } = require("common/config/api");

const cartoesService = {
  buscarPorIdUsuario: async (idUsuario) => {
    const response = await instance.get("/cartoes.json");
    return response.data.cartoes.find((cartao) => cartao.idUsuario === idUsuario);
  }
}

export default cartoesService