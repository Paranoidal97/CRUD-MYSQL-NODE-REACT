import React, { useState } from 'react'

const Search = ({onSearch}) => {
    const [search, setSearch] = useState('');

    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value);
    }

    return (
        <div class="input-group">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" onChange={(e) => onInputChange(e.target.value)}/>
        </div>
    )
}

export default Search;