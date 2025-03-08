import instance from "common/config/api";

const categoriasService = {
  buscar: async () => {
    const response = await instance.get("/categorias.json");
    return response.data.categorias;
  },
  buscarUmaCategoria: async (nomeCategoria) => {
    const response = await instance.get("/categorias.json");
    const categoria = await response.data.categorias.find(
      (categoria) => categoria.id === nomeCategoria
    );
    return categoria;
  },
};

export default categoriasService;
