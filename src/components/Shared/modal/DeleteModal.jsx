// import React, { useState } from 'react'
// import API from '../../../services/API';
// import { toast } from 'react-toastify';

// const DeleteModal = () => {
//     const [data, setData] = useState([]);
//     // //delete function
//     const handleDelete = async (id) => {
//         try {
//             // let answer = window.prompt('Are you Sure Want To Delete This Donar', "Sure");
//             // if (!answer) return;
//             const { data } = await API.delete(`/admin/delete-donar/${id}`);
//             toast.success(data?.message);
//             setTimeout(function () {
//                 window.location.reload();
//             }, 2000);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return (
//         <>
//             {/* Modal */}
//             <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you Sure Want To Delete This Donar ?</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         </div>
//                         <div className="modal-body">
//                             <input style={{backgroundColor: '#21313c', border: 'none', color: "white", outline: "none"}} type="text" name="sure" id="sure" value="sure" readOnly />
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
//                             <button onClick={handleDelete(data._id)} type="button" className="btn btn-danger">Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default DeleteModal
