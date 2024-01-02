import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Shared/Layout/Layout.jsx';
import Modal from '../components/Shared/modal/Modal.jsx';
import API from '../services/API.jsx';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Spinner from './../components/Shared/Spinner';

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by createdAt
  const [sortOrder, setSortOrder] = useState('desc'); // Default descending order
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page

  const navigate = useNavigate();

  const getBloodRecord = async () => {
    try {
      const { data } = await API.get(
        `/inventory/get-inventory?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`
      );
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (sortByField) => {
    if (sortByField === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortByField);
      setSortOrder('asc');
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset to the first page when searching
    getBloodRecord();
  };

  // Add this function to handle pressing Enter key for searching
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Add this function to handle changing the items per page
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to the first page when changing items per page
  };

  useEffect(() => {
    getBloodRecord();
    // eslint-disable-next-line
  }, [page, sortBy, sortOrder, search, itemsPerPage]);

  return (
    <Layout>
      {
        user?.role === "admin" && navigate('/admin')
      }
      {
        user?.role === "donar" && navigate('/donar-home')
      }

      {
        user?.role === "hospital" && navigate('/hospital-home')
      }
      {
        error && <span>{alert(error)}</span>
      }
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <div className="container">
              <h4 className="ms-4 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-plus text-success py-4"></i>
                &nbsp; Add Inventory
              </h4>
              <div className="search-bar my-3 d-flex justify-content-end">
                <input
                  className='p-2'
                  style={{ outline: "none", borderRadius: "5px", border: "1px solid transparent" }}
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="p-2 ms-2 btn btn-success" onClick={handleSearch}>Search</button>
              </div>
              <div className="items-per-page">
                <span>Page Per Row:</span>
                <select className="ms-2"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value, 10))}
                >
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>  
                </select>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSortChange('bloodGroup')}>
                      Blood Group {sortBy === 'bloodGroup' && (
                        <i className={`fa fa-sort-${sortOrder} ps-3`} />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortChange('inventoryType')}>
                      Inventory Type {sortBy === 'inventoryType' && (
                        <i className={`fa fa-sort-${sortOrder} ps-3`} />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortChange('quantity')}>
                      Quantity {sortBy === 'quantity' && (
                        <i className={`fa fa-sort-${sortOrder} ps-3`} />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortChange('email')}>
                      Donor Email {sortBy === 'email' && (
                        <i className={`fa fa-sort-${sortOrder} ps-3`} />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSortChange('createdAt')}>
                      Time & Date {sortBy === 'createdAt' && (
                        <i className={`fa fa-sort-${sortOrder} ps-3`} />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? ( // Check if data is empty
                    <tr>
                      <td colSpan="5" className="text-center">
                        Data Not Found
                      </td>
                    </tr>
                  ) : (
                    data.slice(0, itemsPerPage).map((record) => ( // Use slice to limit the number of rows displayed
                      <tr key={record._id}>
                        <td>{record.bloodGroup}</td>
                        <td>{record.inventoryType}</td>
                        <td>{record.quantity} (ML)</td>
                        <td>{record.email}</td>
                        <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Modal />
            </div>
            <div className="pagination container d-flex justify-content-between my-3">
              <button className="btn btn-success"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                &larr; Previous
              </button>
              <button className="btn btn-success"
                onClick={() => handlePageChange(page + 1)}
                disabled={data.length < itemsPerPage}
              >
                Next &rarr;
              </button>
            </div>
          </>
        )
      }
    </Layout>
  );
};

export default HomePage;
