const { default: instance } = require("common/config/api");

const usuariosService = {
  buscarPorId: async (id) => {
    const response = await instance.get("/usuarios.json");
    return response.data.usuarios.find((usuario) => usuario.id === id);
  },
};

export default usuariosService;
