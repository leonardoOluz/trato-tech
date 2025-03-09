const { default: instance } = require("common/config/api");

const itensService = {
  buscar: async () => {
    const response = await instance.get("/itens.json");
    return response.data.itens;
  },
  buscarItensDaCategoria: async (nomeCategoria) => {
    const response = await instance.get("/itens.json");
    return response.data.itens.filter((item) => item.categoria === nomeCategoria);
  },
}

export default itensService;