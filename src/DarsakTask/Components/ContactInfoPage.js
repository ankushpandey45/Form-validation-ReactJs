import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UserInfoPage = () => {
  const [DropDown, setDropDown] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    id: "",
    userId: "",
    number: "",
    Email: "",
    password: "",
    gst: "",
  });

  const [inputVal, setInputVal] = useState([]);
  const [editData, setEditData] = useState(null);
  const [getUserId, setGetUserId] = useState("");
  const [gstError, setGstError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [btnChng, setBtnChng] = useState("Submit");

  useEffect(() => {
    const nameData = localStorage.getItem("personInfoData");
    if (nameData) {
      setDropDown(JSON.parse(nameData));
    }
  }, []);

  useEffect(() => {
    const employeeData = localStorage.getItem("contactinfo");
    if (employeeData) {
      setInputVal(JSON.parse(employeeData));
    }
  }, []);

  const functionForOnchange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setContactInfo((prev) => ({ ...prev, [name]: numericValue }));
    } else if (name === "gst") {
      setContactInfo((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setContactInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateGst = (gst) => {
    const gstFormat =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstFormat.test(gst);
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordPattern.test(password);
  };

  const handleBtn = (e) => {
    e.preventDefault();

    if (!validateGst(contactInfo.gst)) {
      setGstError("Invalid GST number format.");
      return;
    } else {
      setGstError("");
    }

    if (!validatePasswordStrength(contactInfo.password)) {
      setPasswordError("Please Input Strong Password.");
      return;
    } else {
      setPasswordError("");
    }

    if (editData !== null) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const upData = inputVal.map((item, id) =>
            id === editData ? { ...contactInfo, userId: getUserId } : item
          );
          setInputVal(upData);
          setEditData(null);
          setBtnChng("Submit");
          localStorage.setItem("contactinfo", JSON.strigngify(upData));
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      const Data = [
        ...inputVal,
        {
          ...contactInfo,

          userId: getUserId,

          id: Math.floor(Math.random() * 999),
        },
      ];
      setInputVal(Data);
      localStorage.setItem("contactinfo", JSON.stringify(Data));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    setContactInfo({ number: "", Email: "", password: "", gst: "" });
  };

  const handleEditBtn = (id) => {
    setEditData(id);
    setContactInfo(inputVal[id]);
    setBtnChng("Edit");
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
        const deleteData = inputVal.filter((_, i) => i !== id);
        setInputVal(deleteData);
        localStorage.setItem("contactinfo", JSON.stringify(deleteData));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="contact_main_div">
        <div className="contactinfo_div">
          <div className="contact_second_div">
            <form onSubmit={handleBtn}>
              <label htmlFor="employee">Contact Info:</label>
              <select
                required
                onChange={(event) => setGetUserId(event.target.value)}
              >
                <option value="">Select Name</option>
                {DropDown.map(({ firstname, id }) => (
                  <option key={id} value={id}>
                    {firstname}
                  </option>
                ))}
              </select>
              <label>Contact Number</label>
              <input
                type="text"
                onChange={functionForOnchange}
                value={contactInfo.number}
                name="number"
                pattern="\d*"
                maxLength={10}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="Email"
                onChange={functionForOnchange}
                value={contactInfo.Email}
                minLength={3}
                maxLength={20}
                required
              />

              <label>Password</label>
              <input
                type="password"
                onChange={functionForOnchange}
                value={contactInfo.password}
                name="password"
                minLength={2}
                maxLength={8}
                required
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              <label>GST Number</label>
              <input
                type="text"
                onChange={functionForOnchange}
                value={contactInfo.gst}
                name="gst"
                pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                maxLength={15}
                required
              />
              {gstError && <p style={{ color: "red" }}>{gstError}</p>}
              <button className="subBtn" type="submit">
                {btnChng}
              </button>
            </form>
          </div>
        </div>
        <div className="contactTableContainer">
          <table className="dataTable">
            <thead>
              <tr>
                <th>S.No</th>

                <th>Contact Number</th>
                <th>Email</th>
                <th>GST</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inputVal.map((item, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>

                  <td>{item.number}</td>
                  <td>{item.Email}</td>
                  <td>{item.gst}</td>
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
    </div>
  );
};

export default UserInfoPage;
