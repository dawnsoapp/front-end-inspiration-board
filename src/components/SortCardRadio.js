import React from 'react';

const SortCardRadio = ( { onSortSelect }) => {
    
    const handleSortSelect = (event) => {
        onSortSelect(event.target.value)
    }

    return (
    <div>
        <h3>Choose Sort Direction</h3>
        <div>
            <input type="radio" value="Alphabetical" name="cardSortDirection" onClick={handleSortSelect}/> Alphabetical
            <input type="radio" value="Likes" name="cardSortDirection" onClick={handleSortSelect}/> Likes
            <input type="radio" value="ID" name="cardSortDirection" onClick={handleSortSelect}/> ID
        </div>
    </div>
    )
}

export default SortCardRadio