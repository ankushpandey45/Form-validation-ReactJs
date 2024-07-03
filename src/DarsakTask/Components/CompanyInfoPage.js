import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const EmployeePage = () => {
  const [nameDropDown, setNameDropDown] = useState([]);
  const [companyNames, setCompanyNames] = useState({
    id: "",
    userId: "",
    cName: "",
    Email: "",
    Gst: "",
    adress: "",
    designation: "",
  });
  const [inputVal, setInputVal] = useState([]);
  const [editBtn, setEditBtn] = useState(null);
  const [getId, setGetId] = useState("");
  const [editBtnChng, setEditBtnChng] = useState("Submit");

  useEffect(() => {
    const nameData = localStorage.getItem("personInfoData");
    if (nameData) {
      setNameDropDown(JSON.parse(nameData));
    }
  }, []);

  useEffect(() => {
    const employeeData = localStorage.getItem("companyInfo");
    if (employeeData) {
      setInputVal(JSON.parse(employeeData));
    }
  }, []);

  const functionForOnchange = (e) => {
    const { name, value } = e.target;
    setCompanyNames((prev) => ({ ...prev, [name]: value }));
    console.log("ankush");
  };

  const handleBtn = (e) => {
    e.preventDefault();
    if (editBtn !== null) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const editTable = inputVal.map((item, id) =>
            id === editBtn ? companyNames : item
          );
          setInputVal(editTable);
          setEditBtn(null);
          setEditBtnChng("Submit");
          localStorage.setItem("companyInfo", JSON.stringify(editTable));
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      const updateData = [
        ...inputVal,
        { ...companyNames, id: Math.floor(Math.random() * 999), userId: getId },
      ];
      setInputVal(updateData);
      localStorage.setItem("companyInfo", JSON.stringify(updateData));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000,
      });
      setCompanyNames({
        cName: "",
        Email: "",
        Gst: "",
        adress: "",
        designation: "",
      });

      console.log(updateData);
    }
  };
  const handleEditBtn = (id) => {
    setEditBtn(id);
    setCompanyNames(inputVal[id]);
    setEditBtnChng("Edit");
  };
  const handleDeleteBtn = (id) => {
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
        const deletedData = inputVal.filter((_, i) => i !== id);
        setInputVal(deletedData);
        localStorage.setItem("companyInfo", JSON.stringify(deletedData));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="emp_main_div">
      <div className="emp_div">
        <div className="emp_second_div">
          <form onSubmit={handleBtn}>
            <label for="cars">Choose a Employee:</label>

            <select required onChange={(event) => setGetId(event.target.value)}>
              <option value="">Select Name</option>
              {nameDropDown.map(({ firstname, id }) => (
                <option value={id}>{firstname}</option>
              ))}
            </select>
            <label>Company Name</label>
            <input
              type="text"
              onChange={functionForOnchange}
              value={companyNames.cName}
              name="cName"
              minLength={3}
              maxLength={15}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="Email"
              onChange={functionForOnchange}
              value={companyNames.Email}
              minLength={3}
              maxLength={20}
              required
            />
            <label>GST Number</label>
            <input
              type="number"
              name="Gst"
              onChange={functionForOnchange}
              value={companyNames.Gst}
              minLength={3}
              maxLength={10}
              required
            />
            <label>Adress</label>
            <input
              type="text"
              onChange={functionForOnchange}
              value={companyNames.adress}
              name="adress"
              minLength={3}
              maxLength={20}
              required
            />
            <label>Designation</label>
            <input
              type="text"
              onChange={functionForOnchange}
              value={companyNames.designation}
              name="designation"
              minLength={3}
              maxLength={15}
              required
            />
            <button className="subBtn" type="submit">
              {editBtnChng}
            </button>
          </form>
        </div>
      </div>

      <div className="employeeTableContainer">
        <table className="dataTable">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>GSTNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inputVal.map((item, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{item.cName}</td>
                <td>{item.Email}</td>
                <td>{item.Gst}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="actions_btn"
                    onClick={() => handleEditBtn(id)}
                  >
                    Edit
                  </button>
                  <button
                    className="actions_btn"
                    onClick={() => handleDeleteBtn(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePage;
