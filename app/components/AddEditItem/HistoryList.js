
import React, { useState, useCallback, useEffect } from 'react';
import Htable from './Htable';


const HistoryList = ({historList,handleHistoryDelete})=>{

    return(
        <div>
                <Htable currentItems={historList} handleHistoryDelete={handleHistoryDelete} />
        </div>
    )
}

export default HistoryList;