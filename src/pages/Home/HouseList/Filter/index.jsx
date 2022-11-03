import React from 'react';
import FilterTitle from "../FilterTitle";

function Filter(props) {

    const {setHouseList} = props

    return (
        <div>
            <FilterTitle setHouseList={setHouseList}/>
        </div>
    );
}

export default Filter;