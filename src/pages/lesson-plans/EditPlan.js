import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import upload from "../../images/upload.jpg";
import { PROXY } from "../../configs";

export default function EditPlan() {
  const id = useParams().id;
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [planName, setPlanName] = useState({});
  const [payment, setPayment] = useState({});
  const [category, setCategory] = useState({});

  const handleInputChange = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  React.useEffect(() => {
    axios.get(PROXY + `/lesson-plans/${id}`).then((res) => {
      if (res.data.success) {
        setImage(PROXY + `/images/` + res.data.plan.image);
        setPlanName(res.data.plan.planName);
        setPayment(res.data.plan.payment);
        setCategory(res.data.plan.category);
      }
    });
  }, [id]);

  const onSubmit = (e) => {
    const formdata = new FormData();

    formdata.append("file", file);
    formdata.append("planName", planName);
    formdata.append("payment", payment);
    formdata.append("category", category);

    // console.log(formdata);

    axios.put(PROXY + `/lesson-plans/update/${id}`, formdata).then((res) => {
      if (res.data.success) {
        console.log(res.data.success);
        setFile({});
        setImage({});
        setPlanName({});
        setPayment({});
        setCategory({});
      }
    });
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit Plan</h1>
      <form className="needs-validation" noValidate>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Plan Name</label>
          <input
            type="text"
            className="form-control"
            name="planName"
            value={planName}
            required
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          {/* <label style={{ marginBottom: "5px" }}>Image</label> */}
          <input
            hidden
            id="image-upload"
            type="file"
            className="form-control"
            name="image"
            onChange={handleInputChange} //file = URL.createObjectURL(file)
          />
          <label
            htmlFor="image-upload"
            style={{ marginBottom: "5px", marginTop: "20px" }}
          >
            {image ? (
              <img src={image} height={"100vh"} alt="Plan Img" />
            ) : (
              <img src={upload} height={"100vh"} alt="Plan Img" />
            )}
            <br />
            Upload Image
          </label>
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Payment</label>
          <input
            type="text"
            className="form-control"
            name="payment"
            value={payment}
            required
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>&nbsp; Update
        </button>
      </form>
    </div>
  );
}
