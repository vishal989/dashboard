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

  const handleClick = (e) => {
    const check = e.target.checked;
    console.log(check, e.target.value);
    if(check){
      setCheckData((prev) => [...prev, e.target.value]);
    }
    else{
      const newArr = checkData.filter((data) => {
        return data !== e.target.value;
      })
      setCheckData(() => newArr)
    }
    
  }
  console.log(checkData)

  const handleDeleteAll = () => {
    const newArr = data.filter((val) => {
      return checkData.includes(val.id) === false
    })

    console.log(111)
    setData(() => newArr)
    setCheckData([])
  }
  console.log(data)
  return (
    <div style={{ minHeight:'100vh', width: '100vw' }}>
      {data.map((value) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div key={value.id} style={{padding: '5px', width: '90vw',display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <input type="checkbox" name="" value={value.id} onChange={(e) => handleClick(e)}/>
            <div>{value.name}</div>
            <div>{value.email}</div>
            <div>{value.role}</div>
            <div style={{display: 'flex', gap:'10px'}}> <button>delete</button></div>
          </div>
        
        );
      })}
      <div>{checkData.length}</div>
      <div>
        <button onClick={handleDeleteAll}>Delete</button>
      </div>
    </div>
  );
}

export default Main;
