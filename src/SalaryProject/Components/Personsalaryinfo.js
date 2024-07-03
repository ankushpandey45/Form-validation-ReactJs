import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Salary.css";
import ModelBox from "./ModelBox";

const Personsalaryinfo = () => {
  const [inputName, setInputName] = useState({
    id: "",
    firstname: "",
    surname: "",
    mob: "",
    gender: "",
    dob: "",
    maritalStatus: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editTable, setEditTable] = useState(null);
  const [btnName, setBtnName] = useState("Submit");
  const [salaryTable, setSalaryTable] = useState(false);
  const [salaryDetails, setSalaryDetails] = useState({
    Month: "",
    Amount: "",
  });

  const [storeSalaryDeatail, setStoreSalaryDeatail] = useState([]);

  useEffect(() => {
    const nameData = localStorage.getItem("SalaryInfo");
    if (nameData) {
      setTableData(JSON.parse(nameData));
    }
  }, []);

  const onChangeFunctionForForm = (e) => {
    const { name, value } = e.target;
    if (name === "mob") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setInputName((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setInputName((prev) => ({ ...prev, [name]: value }));
    }
  };
  const onChangeFuncForModal = (e) => {
    const { name, value } = e.target;
    setSalaryDetails((prev) => ({ ...prev, [name]: value }));
  };
  const openSalaryTable = () => {
    setSalaryTable(true);
    // console.log("onclick>>", salaryTable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTable !== null) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const editedData = tableData?.map((item, index) =>
            index === editTable ? inputName : item
          );
          setTableData(editedData);
          setEditTable(null);
          setBtnName("Submit");
          setInputName({
            id: "",
            firstname: "",
            surname: "",
            mob: "",
            gender: "",
            dob: "",
            CompanyName: "",
            maritalStatus: "",
          });
          localStorage.setItem("SalaryInfo", JSON.stringify(editedData));
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      const updatedData = [
        ...tableData,
        {
          ...inputName,
          ...salaryDetails,
          id: Math.floor(Math.random() * 999),
        },
      ];
      setTableData(updatedData);
      localStorage.setItem("SalaryInfo", JSON.stringify(updatedData));
      // console.log("table>>>>", updatedData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000,
      });
      setInputName({
        id: "",
        firstname: "",
        surname: "",
        mob: "",
        gender: "",
        dob: "",
        CompanyName: "",
        maritalStatus: "",
      });
      setSalaryDetails({
        Month: "",
        Amount: "",
      });
      setStoreSalaryDeatail([]);
    }
  };
  console.log("storeData>>", storeSalaryDeatail);
  const editInformationInTable = (index) => {
    setEditTable(index);
    setInputName(tableData[index]);
    setBtnName("Edit");
  };
  const DeleteInformationInTable = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateddata = tableData.filter((_, i) => i !== index);
        setTableData(updateddata);
        localStorage.setItem("SalaryInfo", JSON.stringify(updateddata));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleSubmitSalary = () => {
    const updateData = [...storeSalaryDeatail, salaryDetails];
    setStoreSalaryDeatail(updateData);
    setSalaryTable(false);
  };

  return (
    <div>
      {/* <Navbar/> */}
      <div className="person_main_div">
        <div className="formContainer">
          <div className="form_div">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                onChange={onChangeFunctionForForm}
                value={inputName.firstname}
                name="firstname"
                minLength={3}
                maxLength={15}
                required
              />
              <label>Surname</label>
              <input
                type="text"
                onChange={onChangeFunctionForForm}
                value={inputName.surname}
                name="surname"
                minLength={3}
                maxLength={15}
                required
              />
              <label>Mob</label>
              <input
                type="text"
                onChange={onChangeFunctionForForm}
                value={inputName.mob}
                name="mob"
                pattern="\d*"
                maxLength={10}
                required
              />
              <label>Gender</label>
              <select
                onChange={onChangeFunctionForForm}
                value={inputName.gender}
                name="gender"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label>DOB</label>
              <input
                type="date"
                onChange={onChangeFunctionForForm}
                value={inputName.dob}
                name="dob"
                required
              />
              <label>Company Name</label>
              <label>Marital Status</label>
              <div style={{ marginTop: "5px" }}>
                <input
                  style={{ margin: "5px" }}
                  type="radio"
                  onChange={onChangeFunctionForForm}
                  value="Married"
                  name="maritalStatus"
                  checked={inputName.maritalStatus === "Married"}
                  required
                />
                <label>Married</label>
                <input
                  style={{ marginLeft: "40px" }}
                  type="radio"
                  onChange={onChangeFunctionForForm}
                  value="UnMarried"
                  name="maritalStatus"
                  checked={inputName.maritalStatus === "UnMarried"}
                  required
                />
                <label style={{ margin: "5px" }}>UnMarried</label>
              </div>
              <input
                className="Salary_div"
                onClick={openSalaryTable}
                placeholder="Get your salary info"
                value={storeSalaryDeatail[0]?.Amount}
                type="text"
              />
              <button className="subBtn" type="submit">
                {btnName}
              </button>
            </form>
          </div>
        </div>
        <div>
          <ModelBox
            salaryTable={salaryTable}
            setSalaryTable={setSalaryTable}
            handleSubmitSalary={handleSubmitSalary}
            onChangeFuncForModal={onChangeFuncForModal}
            salaryDetails={salaryDetails}
          />
        </div>

        <div className="personInfoTableContainer ">
          <table className="dataTable">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Mob</th>
                <th>Gender</th>
                <th>Date_Of_Birth</th>
                <th>MaritalStatus</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((data, index) => (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.firstname}</td>
                    <td>{data.surname}</td>
                    <td>{data.mob}</td>
                    <td>{data.gender}</td>
                    <td>{data.dob}</td>
                    <td>{data.maritalStatus}</td>
                    <td>{data.Amount}</td>
                    <td style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="actions_btn"
                        onClick={() => editInformationInTable(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="actions_btn"
                        onClick={() => DeleteInformationInTable(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Personsalaryinfo;
