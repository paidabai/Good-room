import React from 'react';

function Search(props) {
    const dianji = () => {
        console.log(1)
    }
    return (
        <div>
            search
            <button onClick={dianji}>dianji</button>
        </div>
    );
}

export default Search;