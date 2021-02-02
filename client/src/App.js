import React, { useState, useEffect, useMemo } from 'react'
import Axios from 'axios'
import './App.css';

// Icons

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


// Components
import TableHead from "./components/tableHead"
import Navbar from "./components/navbar"
import Modal from "./components/modal"
import Search from './components/search'
import Pagination from './components/pagination'

function App() {
  const [data, setData] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [id, setId] = useState()

  // Pagination

  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // Search

  const [search, setSearch] = useState()
  const [sorting, setSorting] = useState({ field: "", order: "" });


  useEffect(() => {
    Axios.get('http://localhost:4000/get').then((response) => {
      setData(response.data)
    });
  }, [])

  const deleteWorker = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`)
  }

  const setVisible = (id) => {
    setId(id);
    setModalShow(true)
  }

  const memoData = useMemo(() => {
    let computedData = data;

    if (search) {
      computedData = computedData.filter(
        comment =>
          comment.firstname.toLowerCase().includes(search.toLowerCase()) ||
          comment.lastname.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase()) ||
          comment.contact.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedData.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) =>
          reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [data, currentPage, search, sorting]);


  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-12 ">
          <Navbar />
          <div className="row m-2">
            <Pagination 
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)} />
            <div className="col-md-3">
              <Search onSearch={(value) => {
                setSearch(value);
              setCurrentPage(1);
              }
            } />
            </div>
          </div>
          <table className="table table-striped">
            <TableHead />
            <tbody>
              {
                memoData.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td>{value.id}</td>
                      <td>{value.firstname}</td>
                      <td>{value.lastname}</td>
                      <td>{value.email}</td>
                      <td>{value.contact}</td>
                      <td><FontAwesomeIcon icon={faEdit} onClick={() => { setVisible(value.id) }} /></td>
                      <td><FontAwesomeIcon icon={faTrash} onClick={() => { deleteWorker(value.id) }} /></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {
            modalShow ? <Modal id={id} show={modalShow} remove={() => setModalShow(false)} /> : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
