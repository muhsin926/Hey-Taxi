import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCategoryId, setFare, setShowModal } from '../../redux/slices/ModalSlice';
import url from "../../api/Api";
import { LocationContext } from '../../context/LocationContext';

const TaxiCategories = () => {
    const { distance } = useContext(LocationContext);
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch()

    const getCategory = useCallback(async () => {
        const response = await axios.get(`${url}/api/passenger/carCategory`);
        setCategory(response.data.cat);
    }, [])

    useEffect(() => {
        getCategory();
    }, [getCategory])

    const clickhandler = (car) => {
        dispatch(setShowModal())
        dispatch(setFare(car.rate))
        dispatch(setCategoryId(car._id))
    }

    return (
        <div>
            <div className="max-h-52 scrollbar-hide overflow-y-auto">
                {
                    category?.map((car) => (
                        <div
                            onClick={() => clickhandler(car)}
                            className="grid grid-cols-12 border border-gray-300 rounded-md my-1 cursor-pointer"
                        >
                            <div className="col-span-4">
                                <img
                                    className="w-full object-cover"
                                    src={car?.image}
                                    alt="car image"
                                />
                            </div>
                            <div className="col-span-8 flex flex-col pt-2 ">
                                <div className="flex  ">
                                    <div className="flex ">
                                        <h1 className="font-medium">{car?.name}</h1>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 35 27"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M24.0104 25.5859C19.5619 25.5859 16.341 25.5859 14.2499 22.7223C12.1588 19.8587 19.5619 17.7109 24.0104 17.7109C28.4588 17.7109 35.8631 19.8587 33.7714 22.7222C31.6798 25.5858 28.4588 25.5859 24.0104 25.5859Z"
                                                fill="black"
                                            />
                                            <circle
                                                cx="24.0107"
                                                cy="8.71094"
                                                r="5.625"
                                                fill="black"
                                            />
                                        </svg>
                                        <h1>{car?.capacity}</h1>
                                        {/* {setFare(car.rate * distance)} */}
                                        <h1 className="ml-5">₹{car?.rate * distance}</h1>
                                    </div>
                                </div>
                                <p className="text-base text-zinc-500">{car?.discription}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default TaxiCategories