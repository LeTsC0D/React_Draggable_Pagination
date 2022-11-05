import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useState } from "react";
// import { allData } from "./constants";

const tableHead = {
  asset_id: "Campaign Name",
  name: "Campaign Id",
  type_is_crypto: "Type",
  data_quote_star: "Status",
  data_quote_end: "Channel",
  data_orderbook_start: "Actions",
  data_orderbook_end: "Campaign Name",
  data_trade_start: "Campaign Id",
  data_trade_end: "Type",
  data_symbols_count: "Status",
  volume_1hrs_usd: "Channel",
  volume_1day_usd: "Actions",
  volume_1mth_usd: "Type",
  id_icon: "Status",
  data_start: "Channel",
  data_end: "Actions",  
  delete:"Delete"
};

const Table = ({allData,freshdata}) => {
  const countPerPage = 5;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

//   const [assets,setAssets]=useState([])
//   const handleChange=()=>{
//   }

  const searchData = React.useRef(
    throttle(val => {
      const query = val.toLowerCase();
    //   setCurrentPage(2);
      const data = cloneDeep(
        allData
          .filter(item => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
    //   setCurrentPage(p);
    //   const to = countPerPage * p;
    //   const from = to - countPerPage;
    //   console.log(data.length)
      setCollection(data);
    //   updatePage(1)
    }, 400)
  );

  React.useEffect(() => {
    if (!value) {
        console.log("hhjjh")
      updatePage(1);
    } else {
        console.log("ppp")
      searchData.current(value);
    //   updatePage(1);
    }
  }, [value]);

  const updatePage = (p=1) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    // console.log("k"+collection.length)
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
        if(i==16){
            return <button key={i}>delete</button>;
        }else
            return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
     <button onClick={()=>freshdata()}>Fetch Fresh Data</button>
      <div class="search">
        <input
          placeholder="Search Coins"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody >{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
      <button>Save</button>
    </>
  );
};
export default Table;
