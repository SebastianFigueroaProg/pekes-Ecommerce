/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { useFetch } from '../../hooks/useFetch';


export const Carrusel = () => {
    const url = 'https://restserver-pekestech.herokuapp.com/carrusel';
    const {data} = useFetch(url);

    let datos={};
    let arr = [];
    if (data !== null) {
        datos = data.carrusel;        
        for (let i = 0; i < datos.length; i++) {
            arr.push(datos[i].img)
        }            
    }
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(arr[0]);

    const selectNewImage = (index, arr, next=true) => {
        const condition = next ? selectedIndex < arr.length - 1 : selectedIndex > 0;
        const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : arr.length - 1;
        setSelectedImage(arr[nextIndex]);
        setSelectedIndex(nextIndex);        
    };
    
    const previous = () => {
        selectNewImage(selectedIndex, arr, false);
    };
    
    const next = () => {
        selectNewImage(selectedIndex, arr);
    };
    
    useEffect(() => {
        if (selectedImage===undefined) {
            setSelectedImage(arr[0])
        }
    }, [selectedImage,arr]); 

    return (
        <div className='carrusel_main'>
            <img src={selectedImage} alt="carrusel" className='carrusel__img animate__animated animate__fadeIn'/>
            <MdOutlineArrowBackIosNew className='arrow__back pointer' onClick={previous}/>
            <MdOutlineArrowForwardIos className='arrow__forward pointer' onClick={next}/>
        </div>
    )
}
