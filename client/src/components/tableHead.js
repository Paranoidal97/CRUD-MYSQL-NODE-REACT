import React, { useState } from 'react'

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th><input type="checkbox" id="checkall" /></th>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
    )
}

export default TableHead
