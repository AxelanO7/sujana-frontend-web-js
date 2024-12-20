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
// import DetailIncome from "./pages/order/detail";
// import ReportIncome from "./pages/order/report";
// import DetailReportIncome from "./pages/order/detail_report";

// report
import ListReport from "./pages/report/list";
import DetailReport from "./pages/report/detail";

// user
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
          {/* order */}
          <Route path="/order" element={<Order />} />
          <Route path="/ordering" element={<Ordering />} />
          <Route path="/order/:id" element={<UpdateOrder />} />
          {/* <Route path="/order/detail/:id" element={<DetailIncome />} />
          <Route path="/order/report" element={<ReportIncome />} />
          <Route path="/order/report/detail" element={<DetailReportIncome />} /> */}
          {/* opname */}
          <Route path="/report" element={<ListReport />} />
          <Route path="/detail-report/:start/:end" element={<DetailReport />} />
          {/* user */}
          <Route path="/user" element={<ListUser />} />
          <Route path="/user/add" element={<CreateUser />} />
          <Route path="/user/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
