
import React, { useState, useCallback, useEffect } from 'react';



const PicList = (images)=>{
console.log(images);
    const list   = images.map(item=>{
        return (
            <div>{item.name}</div>
        )
    })
    return(
        <div>
                {list}
        </div>
    )
}

export default PicList;