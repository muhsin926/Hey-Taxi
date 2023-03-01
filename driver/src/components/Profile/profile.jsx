import axios from "axios";
import React, { useState } from "react";
import { blankProfile } from "../../assets";
import url from "../../api/Api";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const schema = yup.object().shape({
    name: yup.string().required().min(3, "atleast minimum 3 charecter"),
    email: yup
        .string()
        .required("Required Field")
        .test("is-email", "Invalid email", (value) => {
            if (value) {
                return value.includes("@")
                    ? yup.string().email().isValidSync(value)
                    : true;
            }
        }),
    mob: yup.string().matches(MOBILE_REGEX, "Phone number is not valid"),
});

const Profile = () => {
    const [driver, setDriver] = useState({});
    const [edit, setEdit] = useState(false);
    const [dp, setDp] = useState('');

    const getDriver = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${url}/api/driver/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setDriver(data.driver);
    };

    useState(() => {
        getDriver();
    }, [edit]);

    const fileUpload = async (e) => {
        const file = e.target.files[0]
        console.log(file);
        const data = new FormData()
        data.append('file', file)
        data.append("upload_preset", 'fpcyvcwq')
        await axios.post(`https://api.cloudinary.com/v1_1/dqthrkxov/image/upload`,data).then(async (res) => {
            setDp(res.data.secure_url)
        }).catch((err) => toast.error(err.message))
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitForm = async (values) => {
        const token = localStorage.getItem("token")
        const { data } = await axios.patch(`${url}/api/driver/profile`, { values, dp: dp }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        data.status ? toast.success("Updated") : toast.success(data?.err)
        setEdit(false)
    }

    return (
        <section>

            <div className="relative h-40 rounded-tl-[4rem] bg-gradient-to-r from-violet-200 to-fuchsia-200 ">
                <div className="w-28 rounded-full bg-white h-28 left-12 top-32 absolute ">
                    <img
                        src={blankProfile}
                        className="w-36 h-28 rounded-full"
                        alt="Profile photo"

                    />
                </div>
            </div>
            <div className="ml-44 mt-4 flex justify-between ">
                <div>
                    <div className="flex gap-3  items-center">
                        <h1 className="text-lg font-medium">{driver?.name}</h1>
                        {!edit && <h1 className="">{driver?.mobile}</h1>}
                    </div>
                    {edit ? (
                        <h1>Update your photo and personal details</h1>
                    ) : (
                        <>
                            <h1 className="">{driver?.email}</h1>
                        </>
                    )}
                </div>
                <div>
                    {!edit ? (
                        <button
                            onClick={() => setEdit(true)}
                            className="bg-gradient-to-b hover:bg-gradient-to-t from-gray-400 rounded-md to-black text-white py-1 px-5"
                        >
                            <FontAwesomeIcon className="text-base" icon={faPen} /> Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setEdit(false)}
                                className="mr-3 border-2 border-gray-300 rounded-md py-1 px-3 hover:bg-gray-300 "
                            >
                                Cancel
                            </button>
    
                        </>
                    )}
                </div>
            </div>
            {edit &&
                <form onSubmit={handleSubmit(submitForm)}>
                    <div>
                        <div className="flex flex-wrap justify-center" >
                            <div className="flex jusify-center  flex-col items-center mt-16 ml-16 gap-10">
                                <div>
                                    <label htmlFor="name">Name : </label>
                                    <input
                                        defaultValue={driver?.name}
                                        type="text"
                                        {...register("name")}
                                        name="name"
                                        id="name"
                                        className=" py-3 pl-3 border border-gray-300 hover:shadow-lg rounded-lg"
                                    />
                                </div>
                                <p className=" text-red-600">{errors.name?.message}</p>
                            </div>
                            <div className="flex jusify-center flex-col items-center mt-16 ml-16 gap-10">
                                <div>
                                    <label htmlFor="email">Email : </label>
                                    <input
                                        type="text"
                                        defaultValue={driver?.email}
                                        {...register("email")}
                                        name="email"
                                        id="email"
                                        className=" py-3 pl-3 border border-gray-300 hover:shadow-lg rounded-lg"
                                    />
                                </div>
                                <p className=" text-red-600">{errors.email?.message}</p>
                            </div>

                            <div className="flex jusify-center flex-col items-center mt-8 gap-10">
                                <div>
                                    <label htmlFor="mob">Mobile : </label>
                                    <input
                                        type="number"
                                        defaultValue={driver?.mobile}
                                        {...register("mob")}
                                        name="mob"
                                        id="mob"
                                        className=" py-3 pl-3 border border-gray-300 hover:shadow-lg rounded-lg"
                                    />
                                </div>
                                <p className=" text-red-600">{errors.mob?.message}</p>
                            </div>
                            <div className="flex justify-center items-center mt-6 ml-16 gap-2   ">
                                <label htmlFor="profile">

                                    <img
                                        src={dp ? dp : blankProfile}
                                        className="w-12 h-12 rounded-full object-cover"
                                        alt="Profile photo"
                                    />

                                </label>
                                <label htmlFor="profile">{driver.profile ? "Update your profile photo" : 'Add profile photo'}</label>
                            </div>
                            <input type="file" className="hidden" onChange={e => fileUpload(e)} name="profile" id='profile' />
                            <button
                                type="submit"
                                className="w-3/6 bg-gradient-to-b hover:bg-gradient-to-t from-gray-500 rounded-md to-black text-white py-1 px-5"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            }
        </section>
    )
}

export default Profile