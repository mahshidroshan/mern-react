import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
var site = "https://mern-app-ndot.onrender.com";

export default function Edit() {
 const [form, setForm] = useState({
   company: "",
   headquarters: "",
   stock: "",
   market: "",
   employees: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${site}/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedCompany = {
     company: form.company,
     headquarters: form.headquarters,
     stock: form.stock,
     market: form.market,
     employees: form.employees,

   };
 
   // This will send a post request to update the data in the database.
   await fetch(`${site}/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedCompany),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
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
       
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}