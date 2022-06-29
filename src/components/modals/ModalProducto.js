import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { ActualizarProducto } from '../../actions/admin';
import { FileUploader } from '../../helpers/botonArchivo';
import { useForm } from '../../hooks/useForm';

export const ModalProducto = ({estado,cambiarEstado,datos}) => {

    const dispatch = useDispatch();

    const [nombreArchivo, setNombreArchivo] = useState('');
    const [values, setValues] = useState();

    const [ formProductValues , handleProductInputChange ] = useForm();
    
    const { nombre , precio, descripcion } = formProductValues;

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(ActualizarProducto(datos.uid, nombre, precio, descripcion));
        e.target.reset();  
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handlerFileChange = ({target}) =>{
        
        const  files = target.files[0];      
        setValues(files)
        const fileUploaded = target.files[0];
        setNombreArchivo(fileUploaded.name);
    }

    const handleFile = () =>{
        const urlUploadImage = `https://restserver-pekestech.herokuapp.com/uploads/productos/${datos.uid}`
        
        const formData = new FormData();
        formData.append('archivo', values);
        
        if (values === undefined) {
            Toast.fire({
                icon: 'error',
                title: 'Cargué una imagen por favor'
            })
        } else{
            fetch(urlUploadImage,{
            method: 'PUT',
            body:formData
            })
            .then( res=> res.json())
            .then( res => 
                (!res.msg)
                    && Toast.fire({
                        icon: 'success',
                        title: 'Imagen cargada Correctamente!'
                    })
                );
            setValues({})
        }
    }

    return (
        <>  
        { estado &&
                <section className='modal-main'>
                    <div className='contenedor animate__animated animate__fadeInDown'>
                        <div className='contenedorSuperior'>
                            <div className='contenedorTexto'>
                                <h2>Actualizar  Producto</h2>
                                <p className='subTitulo'>Cargo el Usuario: <span>{datos.usuario.nombre}</span></p>
                            </div>
                            <div className='contenedorArchivo'>
                            <p>Cargar Imagen Producto</p>
                                <div className='cargarImagen'>
                                    <FileUploader
                                        nombre={nombreArchivo}
                                        change={handlerFileChange}    
                                    />
                                    <button type='submit' className='btnSubmit' onClick={(e)=>handleFile()}>Cargar Imagen</button>
                                </div>
                            </div>
                        </div>
                        <div className='contenedorDatos'>
                            <p>Actualizar Datos Producto</p>
                            <form className='actualizarDatos' onSubmit={handleSubmit}>
                                <div className='contForm'>
                                    <div className='contInput'>
                                        <div>
                                            <label>Nombre Producto</label>
                                            <input type="text"
                                                    name='nombre'
                                                    placeholder={datos.nombre}
                                                    value={nombre}
                                                    onChange={handleProductInputChange}
                                                    
                                            />
                                        </div>
                                        <div>
                                            <label>Precio del Producto</label>
                                            <input type="number" name='precio' value={precio}
                                            placeholder={datos.precio}
                                                    onChange={handleProductInputChange}/>
                                        </div>
                                    </div>
                                    <div className='contArea'>
                                        <label>Descripcion del producto</label>                                
                                        <textarea name="descripcion" cols="30" rows="8"
                                                    value={descripcion} 
                                                    onChange={handleProductInputChange}
                                                    placeholder={datos.descripcion}
                                        ></textarea>
                                    </div>
                                </div>    
                                <div className='contBotones'>
                                    <button type='submit' className='submit' onClick={e=> cambiarEstado(!estado)}>Actualizar</button>
                                    <button onClick={e=> cambiarEstado(!estado)} className='btnCerrar'>Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </section>
        }
        </>
    )
}
