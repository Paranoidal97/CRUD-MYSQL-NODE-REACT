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

  const [edit, setEdit] = useState(false)


  useEffect(() => {
    Axios.get('http://localhost:4000/get').then((respone) => {
      setData(respone.data)
    });
  }, [])

  const deleteWorker = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`)
    window.location.reload(false);
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
                    <tr>
                      <td></td>
                      <td>{edit ? <input type="text" className="form-control" id="exampleFormControlInput1" name="contact" placeholder={value.id} />  : `${value.id}`}</td>
                      <td>{edit ? <input type="text" className="form-control" id="exampleFormControlInput1" name="contact" placeholder={value.firstname}/>  : `${value.firstname}`}</td>
                      <td>{edit ? <input type="text" className="form-control" id="exampleFormControlInput1" name="contact" placeholder={value.lastname}/>  : `${value.lastname}`}</td>
                      <td>{edit ? <input type="text" className="form-control" id="exampleFormControlInput1" name="contact" placeholder={value.email}/>  : `${value.email}`}</td>
                      <td>{edit ? <input type="text" className="form-control" id="exampleFormControlInput1" name="contact" placeholder={value.contact}/> : `${value.contact}`}</td>
                      <td>{edit ? <button type="button" class="btn btn-primary" >Save</button> : <FontAwesomeIcon icon={faEdit} onClick={() => { setEdit(!edit) }} />} </td>
                      <td>{edit ? <button type="button" class="btn btn-primary" onClick={() => setEdit(!edit)}>Cancel</button> : <FontAwesomeIcon icon={faTrash} onClick={() => { deleteWorker(value.id) }} />}</td>
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
