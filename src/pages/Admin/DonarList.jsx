import moment from 'moment';
import React, { useEffect, useState } from 'react'
import API from '../../services/API';
import Layout from '../../components/Shared/Layout/Layout';
import { toast } from 'react-toastify';
// import DeleteModal from '../../components/Shared/modal/DeleteModal.jsx';

const DonarList = () => {
    const [data, setData] = useState([]);
    //find donar records
    const getDonars = async () => {
        try {
            const { data } = await API.get('/admin/donar-list');
            // console.log(data);
            if (data?.success) {
                setData(data?.donarData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDonars();
    }, []);

    //delete function
    const handleDelete = async (id) => {
        try {
            // let answer = window.prompt('Are you Sure Want To Delete This Donar', "Sure");
            // if (!answer) return;
            const { data } = await API.delete(`/admin/delete-donar/${id}`);
            toast.success(data?.message);
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record) => (
                        <React.Fragment key={record._id}>
                            <tr>
                                <td>{record.name || record.hospitalName}</td>
                                <td>{record.email}</td>
                                <td>{record.phone}</td>
                                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                                <td>
                                    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: "pointer" }} className="btn btn-danger">
                                        {/* onClick={() => handleDelete(record._id)} */}
                                        <span><i className="fa-solid fa-trash me-2"></i>Delete</span>
                                    </button>
                                </td>
                            </tr>
                         {/* Modal  */}
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you Sure Want To Delete This Donar ?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            <input style={{ backgroundColor: '#21313c', border: 'none', color: "white", outline: "none" }} type="text" name="sure" id="sure" value="Sure" readOnly />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                            <button onClick={() => handleDelete(record._id)} type="button" className="btn btn-danger">Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {/* <DeleteModal /> */}
        </Layout>
    )
}

export default DonarList
