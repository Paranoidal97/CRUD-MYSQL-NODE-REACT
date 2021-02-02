import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Modal = ({id, show, remove}) => {
    const [visible, setVisible] = useState(show)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    
    useEffect(() => {
        Axios.get(`http://localhost:4000/get/${id}`).then((response) => {
          console.log(response.data)  
          setFirstName(response.data[0].firstname)
          setLastName(response.data[0].lastname)
          setEmail(response.data[0].email)
          setContact(response.data[0].contact)
        });
      },[id])

    const Submit = () => {
        Axios.put(`http://localhost:4000/update/${id}`, {
            firstname:firstName,
            lastname:lastName,
            email:email,
            contact:contact
        })
        window.location.reload(false);
    }

    return (
        <div className={visible ? "modal_background" : ""}>
            <div className={visible ? "modal.show modal_container" : "modal"}>
                <div className="col">
                    <label htmlFor="exampleFormControlInput1">First Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="firstname"
                        placeholder={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="col">
                    <label htmlFor="exampleFormControlInput1">Last Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="lastname"
                        placeholder={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="col">
                    <label htmlFor="exampleFormControlInput1">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" name="email"
                        placeholder={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col">
                    <label htmlFor="exampleFormControlInput1">Contact </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="contact"
                        placeholder={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="col mt-auto d-flex justify-content-between py-3">
                    <button type="button" class="btn btn-primary" onClick={Submit}>Submit</button>
                    <button type="button" class="btn btn-primary" onClick={remove}>Cancel</button>

                </div>
            </div>
        </div>
    )
}

export default Modal
