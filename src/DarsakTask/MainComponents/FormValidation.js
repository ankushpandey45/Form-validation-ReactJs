import "./FormValidation.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidenavbar from "../../CommonCompo/Sidenavbar";
import PersonInfoPage from "../Components/PersonInfoPage";
import CompanyInfoPage from "../Components/CompanyInfoPage";
import ContactInfoPage from "../Components/ContactInfoPage";
import Navbar from "../../CommonCompo/Navbar";

const FormValidation = () => {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="main">
          <div className="sideNavbar_div">
            <Sidenavbar />
          </div>
          <div>
            <Routes>
              {/* <Route path="/" element={<Sidenavbar />} /> */}
              <Route path="/person" element={<PersonInfoPage />} />
              <Route path="/employee" element={<CompanyInfoPage />} />
              <Route path="/info" element={<ContactInfoPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default FormValidation;
