import { Route, Routes, BrowserRouter } from "react-router-dom";

import CadastroCliente from "./pages/CadastroCliente";
import Inicio from "./pages/Inicio";

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router