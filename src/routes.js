import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaPadrao from "components/PaginaPadrao";
import Home from "pages/Home";
import Categoria from "pages/categoria";
import Carrinho from "pages/Carrinho";
import Anuncie from "pages/Anuncie";
import Favoritos from "pages/Favoritos";
import Pagamento from "pages/Pagamento";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Home />} />
          <Route path="/categoria/:nomeCategoria" element={<Categoria />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path="anuncie/:nomeCategoria" element={<Anuncie />} />
          <Route path="anuncie" element={<Anuncie />} />
          <Route path="pagamento" element={<Pagamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
