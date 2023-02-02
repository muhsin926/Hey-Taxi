import React, { useRef } from 'react'
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RC } from '../../../assets';
import { Link, useLocation } from 'react-router-dom';
import { docUplod } from '../../../constants';


const DocUploader = () => {
    const fileInput = useRef(null);
    const handleFileButtonClick = () => {
        fileInput.current.click();
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const index = queryParams.get('param');
    return (
        <div className='flex items-center h-screen justify-center '>
            <div className='w-2/5  border border-2 '>
                <div  className='bg-black p-3 '>
                    <Link to={'/requirements'}>
                        <FontAwesomeIcon className='text-white text-2xl' icon={faCircleArrowLeft} />
                    </Link>
                </div>
                  
                <div className='h-96 overflow-scroll overflow-x-hidden  p-5 flex flex-col justify-center items-center  '>
                    <h1 className='text-3xl font-bold mt-44'>{docUplod[index].title}</h1>
                    <p className=''>{docUplod[index].description}</p>
                    <img className='max-w-sm m-12' src={docUplod[index].img} alt="RC image" />
                </div>
                <div className='p-3'>
                    <button onClick={handleFileButtonClick} className='w-full bg-black rounded text-white text-center'> Upload</button>
                    <input type="file" className='hidden' ref={fileInput} />
                </div>
            </div>

        </div>
    )
}

export default DocUploader