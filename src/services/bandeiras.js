import instance from "common/config/api";

const bandeirasService = {
  buscarPorId: async (bandeiraId) => {
    // const query = new URLSearchParams();
    // bandeiraId.forEach(id => query.append("id", id));
    const response = await instance.get("/bandeiras.json");
    return response.data.bandeiras.filter((bandeira) =>
      bandeiraId.includes(bandeira.id)
    );
  },
};

export default bandeirasService;
