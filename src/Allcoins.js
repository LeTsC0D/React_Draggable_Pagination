import React, { useEffect } from 'react'
import { useState } from 'react';
import Table from './Table';
import axios from 'axios';
export default function Allcoins() {
    const [assets,setAssets]=useState([])

    const handleClick=()=>{
        const url =
        "http://rest.coinapi.io/v1/assets?apikey=A9491BCB-12EB-4C86-9F9E-CA0340831646";
        // console.log("dsf")
        const fetchData = async () => {
            try {
              const response = await axios.get(url);
              // const json = await response.json();
              // setCategories(json);
              setAssets(response.data);
              console.log(response.data);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchData();
    }

    useEffect(()=>{
        const url =
        "http://rest.coinapi.io/v1/assets?apikey=A9491BCB-12EB-4C86-9F9E-CA0340831646";
        // console.log("dsf")
        const fetchData = async () => {
            try {
              const response = await axios.get(url);
              // const json = await response.json();
              // setCategories(json);
              setAssets(response.data);
              console.log(response.data);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchData();
    },[])

  return (
    <>
    <div >
    Allcoins <br />
    <br />
    <Table allData={assets} freshdata={handleClick}/>

    </div>
    </>
  )
}
