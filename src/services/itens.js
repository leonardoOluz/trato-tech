const { default: instance } = require("common/config/api");

const itensService = {
  buscar: async () => {
    const response = await instance.get("/itens.json");
    return response.data.itens;
  }
}

export default itensService;