import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";

import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";

// order
import Order from "./pages/order/list";
import Ordering from "./pages/order/ordering";
import UpdateOrder from "./pages/order/update";
import DetailIncome from "./pages/order/detail";
import ReportIncome from "./pages/order/report";
import DetailReportIncome from "./pages/order/detail_report";

// opname
import ListReport from "./pages/report/list";
import DetailReport from "./pages/report/detail";

// employee
import ListUser from "./pages/user/list";
import CreateUser from "./pages/user/create";
import UpdateUser from "./pages/user/update";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* income */}
          <Route path="/order" element={<Order />} />
          <Route path="/ordering" element={<Ordering />} />
          <Route path="/order/:id" element={<UpdateOrder />} />
          <Route path="/in/detail/:id" element={<DetailIncome />} />
          <Route path="/in/report" element={<ReportIncome />} />
          <Route path="/in/report/detail" element={<DetailReportIncome />} />
          {/* opname */}
          <Route path="/opname" element={<ListReport />} />
          <Route path="/detail-opname/:start/:end" element={<DetailReport />} />
          {/* employee */}
          <Route path="/employee" element={<ListUser />} />
          <Route path="/employee/add" element={<CreateUser />} />
          <Route path="/employee/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
