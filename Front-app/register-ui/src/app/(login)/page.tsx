//import Image from "next/image";
//import styles from "./page.module.css";
'use client'

import Swal from 'sweetalert2'

export default function Home() {

  const handleClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Hecho!', 'La acción se completó correctamente.', 'success');
      }
    });
  };


  return (
    <>
      <div className="row">
        <div className="col-3">integracion de bootstrap</div>
        <div className="col-3">calando clases de columnas</div>

        <div className="container">
          <h1 className="text-primary">Hola, Bootstrap con Next.js</h1>
          <button className="btn btn-danger" onClick={handleClick}>
            Click aquí
          </button>
          <button className="btn btn-custom" onClick={handleClick}>
            Click en boton personalizado
          </button>
        </div>
      </div>
    </>
  );
}




