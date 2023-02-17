import axios from 'axios';
import React, { useState } from 'react';
import url from '../../api/Api'

const Vehicle = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState();
    const [rate, setRate] = useState()
    const [discription, setDiscription] = useState('')
    const [img, setImage] = useState()

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const fileUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const base64 = await convertBase64(file);
        setImage(base64)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/admin/vehicle`, { name, capacity, discription, img })
            .then((res) => {
                if (res.data.status) {
                    setShowModal(false)
                } else {
                    alert(res.data.err)
                }
            })
            .catch((err) => {
                alert(err)
            })
    }
    return (
        <div>
            <button className='bg-zinc-900 text-white py-1 px-3 rounded hover:bg-zinc-700'
                onClick={() => setShowModal(true)}>Vehicle Category Management</button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex text-black flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <form onSubmit={submitHandler}>
                                    <div className="flex items-start justify-between  rounded-t">
                                        <h3 className="text-xl font-base ml-6 mt-6">
                                            Add Categories
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex flex-col">
                                        <input type="text"
                                            placeholder='category name'
                                            className='border border-grey-light w-full p-3 rounded mb-4'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input
                                            value={capacity}
                                            onChange={e => setCapacity(e.target.value)}
                                            className='border border-grey-light w-full p-3 rounded mb-4' type="number" placeholder='capacity' />
                                        <input
                                            value={rate}
                                            onChange={e => setRate(e.target.value)}
                                            className='border border-grey-light w-full p-3 rounded mb-4' type="number" placeholder='rate per KM' />
                                        <input
                                            value={discription}
                                            onChange={e => setDiscription(e.target.value)}
                                            className='border border-grey-light w-full p-3 rounded mb-4' type="text " placeholder='discription' />
                                        <input
                                            onChange={fileUpload}
                                            className='border border-grey-light w-full p-3 rounded mb-4' type="file" />
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 hover:bg-gray-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

export default Vehicle