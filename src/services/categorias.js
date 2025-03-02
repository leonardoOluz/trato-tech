import instance from "common/config/api";

const categoriasService = { 
  buscar: async () => {
    const response = await instance.get("/categorias.json");
    return response.data.categorias;
  }
};

export default categoriasService;