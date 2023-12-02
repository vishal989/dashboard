import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

function Main() {
  const [data, setData] = useState([]);
  const [checkData, setCheckData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      )
      .then((res) => setData(res.data));
  }, []);

  const handleClick = (id) => {
    setCheckData((prev)=> [...prev, id])
  } 

//   console.log(checkData)

  const handleDelete = (id) =>{
    console.log('id in handleDetelte', id);
    const dataId = data.findIndex(parseInt(id));
    console.log(typeof(dataId))
    console.log(dataId);    
  }
  
  return (
    <div style={{ minHeight:'100vh', width: '100vw' }}>
      {data.map((value, id) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div key={value.id} style={{padding: '5px', width: '90vw',display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <input type="checkbox" name="" id={id} onChange={() => handleClick(value.id)}/>
            <div>{value.name}</div>
            <div>{value.email}</div>
            <div>{value.role}</div>
            <div style={{display: 'flex', gap:'10px'}}><p>copy</p> <p onClick={() => handleDelete(value.id)}>delete</p></div>
          </div>
        );
      })}
    </div>
  );
}

export default Main;
