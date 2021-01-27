import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css';

// Icons

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


// Components
import TableHead from "./components/tableHead"
import Navbar from "./components/navbar"


function App() {
  const [data, setData] = useState([])

  const [edit, setEdit] = useState(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")


  useEffect(() => {
    Axios.get('http://localhost:4000/get').then((respone) => {
      setData(respone.data)
    });
  }, [])

  const deleteWorker = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`)
  }

  const Save = (id) => {
    Axios.put(`http://localhost:4000/update/${id}`, {
        firstname:firstName,
        lastname:lastName,
        email:email,
        contact:contact
    })
}


  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-12 ">
          <Navbar />
          <table className="table table-striped">
            <TableHead />
            <tbody>
              {
                data.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td></td>
                      <td>{value.id}</td>
                      <td>{edit === value.id ? <input type="text" className="form-control"  name="firstname" placeholder={value.firstname} onChange={(e) => setFirstName(e.target.value)}/>
                        : `${value.firstname}`}</td>
                      <td>{edit === value.id ? <input type="text" className="form-control"  name="lastname" placeholder={value.lastname} onChange={(e) => setLastName(e.target.value)}/>
                        : `${value.lastname}`}</td>
                      <td>{edit === value.id ? <input type="text" className="form-control"  name="email" placeholder={value.email} onChange={(e) => setEmail(e.target.value)}/>
                        : `${value.email}`}</td>
                      <td>{edit === value.id ? <input type="text" className="form-control"  name="contact" placeholder={value.contact} onChange={(e) => setContact(e.target.value)} />
                        : `${value.contact}`}</td>
                      <td>{edit === value.id ? <button type="button" class="btn btn-primary" onClick={Save(value.id)}>Save</button>
                        : <FontAwesomeIcon icon={faEdit} onClick={() => { setEdit(value.id) }} />} </td>
                      <td>{edit === value.id ? <button type="button" class="btn btn-primary" onClick={() => setEdit(!edit)}>Cancel</button>
                        : <FontAwesomeIcon icon={faTrash} onClick={() => { deleteWorker(value.id) }} />}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
