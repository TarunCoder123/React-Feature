import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import "./Table.css"

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Default limit
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        setTotalPage(Math.ceil(response.data.length / limit));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setCurrentPage(1);
    setTotalPage(Math.ceil(data.length / event.target.value));
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = Number(startIndex) + Number(limit);
  const displayData = data.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <h1>DATA OF THE API</h1>
      {loading ? (
        <Circles 
        height={80} 
        width={80} 
        color="#4fa94d" 
        ariaLabel="loading" 
    />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>data</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/*Pagination */}
      <div className='pagination'>
        {/* for(let index=0;index<Number(totalPage);index++){
        <button key={index+1} onClick={()=>handlePageChange(index+1)}>
            {index+1}
        </button> */}
        {Array.from({ length: Number(totalPage) }).map((_, index) => (
      <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
        {index + 1}
      </button>
       ))}
        <label>
          Limit:
          <select value={limit} onChange={handleLimitChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Table;
