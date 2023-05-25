import React, { useState } from "react";
import { useNavigate } from "react-router";
 
var site = "https://mern-app-ndot.onrender.com";

export default function Create() {
 const [form, setForm] = useState({
   company: "",
   headquarters: "",
   stock: "",
   market: "",
   employees: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newCompany = { ...form };
 
   await fetch(site + "/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newCompany),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ company: "", headquarters: "", stock: "", market: "" , employees: ""  });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="company">Company</label>
         <input
           type="text"
           className="form-control"
           id="company"
           value={form.company}
           onChange={(e) => updateForm({ company: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="headquarters">Headquarters</label>
         <input
           type="text"
           className="form-control"
           id="headquarters"
           value={form.headquarters}
           onChange={(e) => updateForm({ headquarters: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="stock">Stock Price ($)</label>
         <input
           type="text"
           className="form-control"
           id="stock"
           value={form.stock}
           onChange={(e) => updateForm({ stock: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="market">Market Cap ($B)</label>
         <input
           type="text"
           className="form-control"
           id="market"
           value={form.market}
           onChange={(e) => updateForm({ market: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="employees">Number of Employees</label>
         <input
           type="text"
           className="form-control"
           id="employees"
           value={form.employees}
           onChange={(e) => updateForm({ employees: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create company"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}