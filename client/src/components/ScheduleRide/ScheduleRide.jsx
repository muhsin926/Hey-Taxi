import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduleDate, setScheduleTime } from '../../redux/slices/scheduleSlice';

const ScheduleRide = () => {
    const dispatch = useDispatch();
    const { scheduleDate, scheduleTime } = useSelector((state) => state.scheduleRide)
    const navigate = useNavigate();

    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const currentTime = new Date(),
        time = currentTime.getHours() + ':' + (currentTime.getMinutes() + 20)
    return (
        <div> <motion.div
            initial={{ x: "-10vw", opacity: 0 }}
            animate={{ x: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
            className="mainCard xs:w-96 mr-10 xs:mr-0 p-10 bg-white  rounded"
        >
            <motion.div
                initial={{ y: "-10vw", opacity: 0 }}
                animate={{ y: 1, opacity: 1 }}
                transition={{ type: "Tween", stiffness: 1, delay: 0.6 }}
                className="flex justify-around  "
            >
            </motion.div>
            <motion.div
                initial={{ y: "-10vw", opacity: 0 }}
                animate={{ y: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.6 }}
                className="flex justify-center align-middle "
            >
                <h1 className="text-3xl font-semibold">When do you want to be picked up?</h1>
            </motion.div>
            <motion.div
                initial={{ y: "-10vw", opacity: 0 }}
                animate={{ y: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.9 }}
                className="mt-10"
            >
                <input
                    type="date"
                    className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4"
                    placeholder=""
                    defaultValue={defaultValue}
                    value={scheduleDate}
                    min={defaultValue}
                    max={maxDate}
                    onChange={e => dispatch(setScheduleDate(e.target.value))}
                />
                <input
                    type="time"
                    className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4"
                    defaultValue={time}
                    value={scheduleTime}
                    onChange={e => dispatch(setScheduleTime(e.target.value))}
                />
            </motion.div>
            <motion.div
                initial={{ y: "-10vw", opacity: 0 }}
                animate={{ y: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, delay: 1 }}
            >
                <button
                    className="text-center py-2 px-3 rounded bg-yellow-400  my-1 font-semibold"
                    onClick={() => navigate('/ride')}
                >confirm</button>
            </motion.div>
        </motion.div></div>
    )
}

export default ScheduleRide