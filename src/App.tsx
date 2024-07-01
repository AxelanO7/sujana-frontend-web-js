import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";

import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";

// order
import Order from "./pages/order/list";
import Ordering from "./pages/order/create";
import UpdateIncome from "./pages/order/update";
import DetailIncome from "./pages/order/detail";
import ReportIncome from "./pages/order/report";
import DetailReportIncome from "./pages/order/detail_report";

// opname
import Opname from "./pages/opname/opname";
import DetailReportOpname from "./pages/opname/detail_report";

// employee
import Employee from "./pages/employee/employee";
import CreateEmployee from "./pages/employee/create";
import UpdateEmployee from "./pages/employee/update";

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
          <Route path="/in/:id" element={<UpdateIncome />} />
          <Route path="/in/detail/:id" element={<DetailIncome />} />
          <Route path="/in/report" element={<ReportIncome />} />
          <Route path="/in/report/detail" element={<DetailReportIncome />} />
          {/* opname */}
          <Route path="/opname" element={<Opname />} />
          <Route
            path="/detail-opname/:start/:end"
            element={<DetailReportOpname />}
          />
          {/* employee */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/add" element={<CreateEmployee />} />
          <Route path="/employee/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
