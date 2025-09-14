import React, {useState, useEffect, use} from 'react';

function Lap({time}){   
    const [timeList, setTimeList] = useState([]);

    useEffect(() => {
        if(!time) setTimeList([]);
        setTimeList(prevTime => [...prevTime, time]);
    }, [time]);
    
    const listTime = timeList.map((time, index) => (
        <li key={index} style={{listStyle: "none"}}>{time}</li>
    ))

    return(

        <div style={{position: "absolute", top: "20px", right: "20px", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", padding: "10px", borderRadius: "5px", maxHeight: "50vh", overflowY: "auto"}}>
            <p>{listTime}</p>
        </div>
    )
}

export default Lap;