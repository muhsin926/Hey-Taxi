import axios from "axios";
import React, { useState } from "react";
import { blankProfile } from "../../assets";
import url from "../../api/Api";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const [dp, setDp] = useState('');

    const getUser = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${url}/api/passenger/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
    };

    useState(() => {
        getUser();
    }, [edit]);

    const convert2Base64 = (file) => {
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
        const file = e.target.files[0]
        const profile = await convert2Base64(file)
        setDp(profile)
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitForm = async (values) => {
        setEdit(false)
        const token = localStorage.getItem("token")
        await axios.patch(`${url}/api/passenger/profile`, { values, dp: dp }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setEdit(true)
    }

    return (
        <section>

            <div className="hidden md:block relative h-40 rounded-tl-[4rem] bg-gradient-to-r from-violet-200 to-fuchsia-200 ">
                <div className="w-24 rounded-full bg-white h-28 left-12 top-32 absolute ">
                    <img
                        src={blankProfile}
                        className="w-24 h-24 rounded-full"
                        alt="Profile photo"

                    />
                </div>
            </div>
            <div className="md:ml-44   mt-4 flex justify-between ">
                <div >
                    <div className="flex items-center">
                        <img
                            src={blankProfile}
                            className="md:hidden w-16 h-26 rounded-full"
                            alt="Profile photo"

                        />
                        <h1 className="text-lg font-medium">{user?.name}</h1>
                    </div>
                    {edit ? (
                        <h1>Update your photo and personal details</h1>
                    ) : (
                        <>
                            <h1 className="">{user?.mobile}</h1>
                            <h1 className="">{user?.email}</h1>
                        </>
                    )}
                </div>
                <div className="flex items-start">
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
                        <div className="justify-center grid grid-cols-12" >
                            <div className="flex jusify-center col-span-12 md:col-span-6  flex-col items-center mt-16  gap-10">
                                <div>
                                    <label htmlFor="name">Name : </label>
                                    <input
                                        defaultValue={user?.name}
                                        type="text"
                                        {...register("name")}
                                        name="name"
                                        id="name"
                                        className=" py-3 pl-3 border border-gray-300 hover:shadow-lg rounded-lg"
                                    />
                                </div>
                                <p className=" text-red-600">{errors.name?.message}</p>
                            </div>
                            <div className="col-span-12 md:col-span-6  flex jusify-center flex-col items-center md:mt-16  gap-10">
                                <div>
                                    <label htmlFor="email">Email : </label>
                                    <input
                                        type="text"
                                        defaultValue={user?.email}
                                        {...register("email")}
                                        name="email"
                                        id="email"
                                        className=" py-3 pl-3 border border-gray-300 hover:shadow-lg rounded-lg"
                                    />
                                </div>
                                <p className=" text-red-600">{errors.email?.message}</p>
                            </div>

                            <div className="col-span-12 md:col-span-6 flex jusify-center flex-col items-center md:mt-8 gap-10">
                                <div>
                                    <label htmlFor="mob">Mobile : </label>
                                    <input
                                        type="number"
                                        defaultValue={user?.mobile}
                                        {...register("mob")}
                                        name="mob"
                                        id="mob"
                                        className=" py-3 pl-3 border border-gray-300 hover:shadow-lg rounded-lg"
                                    />
                                </div>
                                <p className=" text-red-600">{errors.mob?.message}</p>
                            </div>
                            <div className="col-span-12 md:col-span-6 flex justify-center items-center md:mt-6  mb-5 gap-2   ">
                                <label htmlFor="profile">

                                    <img
                                        src={dp ? dp : blankProfile}
                                        className="w-12 h-12 rounded-full object-cover"
                                        alt="Profile photo"
                                    />

                                </label>
                                <label htmlFor="profile">{user?.profile ? "Update your profile photo" : 'Add profile photo'}</label>
                            </div>
                            <input type="file" className="hidden" onChange={e => fileUpload(e)} name="profile" id='profile' />
                           <div className="col-span-12 flex justify-center">
                           <button
                                type="submit"
                                className=" w-5/6 bg-gradient-to-b hover:bg-gradient-to-t from-gray-500 rounded-md to-black text-white py-1 px-5"
                            >
                                Save
                            </button>
                           </div>
                        </div>
                    </div>
                </form>
            }
        </section >
    );
};

export default Profile;
