import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useForm } from '../../hooks/useForm';
import { borrarProducto, crearProducto } from '../../actions/admin';
import { ModalProducto } from '../modals/ModalProducto';
import Swal from 'sweetalert2';


export const AdminProduct = () => { 
  
  const dispatch = useDispatch();
  const [estadoModal, setEstadoModal] = useState(false);
  const [datosModal, setDatosModal] = useState();
  const [catalogo, setCatalogo] = useState([]);
  const [producto, setProducto] = useState([]);
  const urlCatalogo = 'https://restserver-pekestech.herokuapp.com/categorias?limite=100'; 
  const urlProducto = 'https://restserver-pekestech.herokuapp.com/productos?limite=1000'; 

  useEffect(() => {
    const fetchData = async()=>{
      const result = await fetch(urlCatalogo);
      const res = await result.json();
      setCatalogo(res.categorias);
    }
    fetchData();
  }, []);

  useEffect(() => {

    const fetchProd = async()=>{
      const result = await fetch(urlProducto);
      const res = await result.json();
      setProducto(res.productos);
    }

    fetchProd();

  }, [])
  
  const [ formProductValues , handleProductInputChange ] = useForm({
    nombre:'',
    precio: 0,
    categoria: '',
    descripcion:''
  });

  const { nombre, precio, categoria, descripcion } = formProductValues;

  const handleSubmit = (e)=>{
    e.preventDefault();  
    dispatch(crearProducto(nombre,precio,categoria, descripcion))
    e.target.reset();
  }

  const handleBorrar = (id)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro de borrar el producto?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProducto(id));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'El archivo a sido eliminado.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu archivo no se borro! :)',
          'error'
        )
      }
    })
    
  }
  
  return (
    <div className='contenedor'>
      <section className='contenedor__productos'>
        <article className='contenedorForm'> 
          <form className='formProductos' onSubmit={handleSubmit}>
            <label>Nombre Producto</label>
            <input 
              type="text" 
              placeholder='Nombre'
              name='nombre'
              value={nombre}
              onChange={handleProductInputChange}
            />
            <label>Precio Producto</label>
            <input 
              type="number" 
              placeholder='Precio'
              name='precio'
              value={precio}
              onChange={handleProductInputChange}
            />
            <label>Categoria del Producto</label>
            <select id="" name='categoria' value={categoria} onChange={handleProductInputChange}>
              {
                catalogo.map(e=>(
                  <option key={e.uid} value={e.uid}>{e.nombre}</option>
                ))
              }
            </select>
            <label>Descripcion Producto</label>
            <textarea 
              name="descripcion" 
              id="descripcion" 
              cols="30" 
              rows="15" 
              placeholder='Descripción del producto'
              value={descripcion}
              onChange={handleProductInputChange}
              />
            <button className='btn_submitProduct' type='submit'>Cargar Producto</button>            
          </form>
        </article>
        <article className='listaProductos'>
              <ul className='lista'>
                {
                  producto.map(elem=>(
                    <li key={elem.uid} className='producto'>
                      <img src={elem.img} alt={elem.nombre} className='img_lista' />
                      <div className='contenido'>
                        <p>{`${elem.nombre} - Precio: $ ${elem.precio}`}</p>
                        <p>{`Categoria: ${elem.categoria.nombre}`}</p>
                      </div>
                      <div className='botones'>
                        <button className='btn_edit' onClick={e=>{
                          setEstadoModal(!estadoModal);
                          setDatosModal(elem)
                        }}><BiEditAlt/></button>
                        <button className='btn_delete'
                                onClick={e=>handleBorrar(elem.uid)}
                        ><BsTrash/></button>
                      </div>
                    </li>
                  ))
                }
              </ul>
        </article>
        <ModalProducto
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                datos={datosModal}
        />
      </section>
    </div>
  )
}
