import React, { useState } from 'react'
import Axios from "axios"

function Navbar() {
    const [visible, setVisible] = useState(false)

    // FORM

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")


    const Submit = () => {
        Axios.post("http://localhost:4000/insert", {
            firstname:firstName,
            lastname:lastName,
            email:email,
            contact:contact
        })
        window.location.reload(false);
    }

    return (
        <div>
            <div className="row m-2">
                <div className="col-md-9">
                    <button type="button" class="btn btn-primary" onClick={() => setVisible(!visible)}>Add new worker</button>
                </div>
                <div className="col-md-3">
                    <div class="input-group">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" />
                        <button type="button" class="btn btn-outline-primary">search</button>
                    </div>
                </div>
            </div>
            {
                visible ?
                    <form >
                        <div className="row">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">First Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" name="firstname" 
                                placeholder="first name" onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Last Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" name="lastname" 
                                placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" name="email" 
                                placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Contact </label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" name="contact" 
                                placeholder="contact" onChange={(e) => setContact(e.target.value)}/>
                            </div>
                            <div className="col mt-auto ">
                                <button type="button" class="btn btn-primary" onClick={Submit}>Submit</button>
                            </div>
                        </div>
                    </form>
                    : null
            }
        </div>
    )
}

export default Navbar
