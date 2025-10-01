'use client';


import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

type FormData = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  fechaNacimiento: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  pais: string;
};

export default function ClienteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>(
    { mode: 'onChange', }
  );

  const router = useRouter();

  // ✅ Validar si existe token al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Acceso denegado', 'Debes iniciar sesión', 'warning');
      router.push('/');
    }
  }, [router]);

/*   const onSubmit: SubmitHandler<FormData> = (data) => {
    Swal.fire({
      title: 'Cliente registrado',
      html: `
        <strong>Nombre:</strong> ${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno || ''}<br/>
        <strong>Fecha de Nacimiento:</strong> ${data.fechaNacimiento}<br/>
        <strong>Correo:</strong> ${data.correo}<br/>
        <strong>Teléfono:</strong> ${data.telefono || '-'}<br/>
        <strong>Dirección:</strong> ${data.direccion || '-'}<br/>
        <strong>Ciudad:</strong> ${data.ciudad || '-'}<br/>
        <strong>País:</strong> ${data.pais}
      `,
      icon: 'success',
    });
    reset();
  }; */
    const onSubmit: SubmitHandler<FormData> = async (data) => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Error', 'No se encontró sesión activa', 'error');
      router.push('/');
      return;
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CUSTOMER_API +"/v1/customers", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || 'Error al registrar cliente');
      }

      Swal.fire('Éxito', 'Cliente registrado correctamente', 'success');
      reset();
    } catch (err: any) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="container-fluid container-form">
      <div className="row wh-100 py-5 justify-content-center">
        {/*   <div className="col-3"></div> */}
        <div className="col-12 col-md-10 col-xl-6">
          <div className="card-form">
            <h2 className="text-center title">
              Registro de Cliente
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre(s)*</label>
                <input
                  id="nombre"
                  className={`form-control ${errors.nombre ? 'is-invalid' : watch('nombre')?.length > 0 ? 'is-valid' : ''
                    }`}
                  {...register('nombre', {
                    required: 'El nombre es obligatorio',
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                      message: 'Solo se permiten letras y espacios'
                    }
                  })}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                {!errors.nombre && watch('nombre')?.length > 0 && (
                  <div className="valid-feedback">Nombre válido</div>
                )}
              </div>

              {/* Apellido Paterno */}
              <div className="mb-3">
                <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno*</label>
                <input
                  id="apellidoPaterno"
                  className={`form-control ${errors.apellidoPaterno ? 'is-invalid' : watch('apellidoPaterno')?.length > 0 ? 'is-valid' : ''
                    }`}
                  {...register('apellidoPaterno', {
                    required: 'El apellido paterno es obligatorio',
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                      message: 'Solo se permiten letras y espacios'
                    }
                  })}
                />
                {errors.apellidoPaterno && <div className="invalid-feedback">{errors.apellidoPaterno.message}</div>}
                {!errors.apellidoPaterno && watch('apellidoPaterno')?.length > 0 && (
                  <div className="valid-feedback">Apellido válido</div>
                )}
              </div>

              {/* Apellido Materno */}
              <div className="mb-3">
                <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno</label>
                <input
                  id="apellidoMaterno"
                  className={`form-control ${errors.apellidoMaterno ? 'is-invalid' : (watch('apellidoMaterno')?.length ?? 0) > 0 ? 'is-valid' : ''
                    }`}
                  {...register('apellidoMaterno', {
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/, // permite campo vacío o solo letras
                      message: 'Solo se permiten letras y espacios'
                    }
                  })}
                />
                {errors.apellidoMaterno && <div className="invalid-feedback">{errors.apellidoMaterno.message}</div>}
                {!errors.apellidoMaterno && ((watch('apellidoMaterno')?.length ?? 0) > 0) && (
                  <div className="valid-feedback">Apellido válido</div>
                )}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento*(debe ser mayor de edad)</label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : watch('fechaNacimiento') ? 'is-valid' : ''
                    }`}
                  {...register('fechaNacimiento', {
                    required: 'La fecha de nacimiento es obligatoria',
                    /* Dejamos comentada la validacion de edad ya que se ara en la base de datos */
                   /*  validate: (value) => {
                      const fechaNacimiento = new Date(value);
                      const hoy = new Date();
                      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
                      const dia = hoy.getDate() - fechaNacimiento.getDate();

                      return (
                        edad > 18 ||
                        (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)))
                      ) || 'Debes ser mayor de edad (18 años)';
                    } */
                  })}
                />
                {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento.message}</div>}
                {!errors.fechaNacimiento && watch('fechaNacimiento') && (
                  <div className="valid-feedback">Fecha válida</div>
                )}
              </div>

              {/* Correo */}
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                <input
                  id="correo"
                  type="email"
                  className={`form-control ${errors.correo ? 'is-invalid' : watch('correo')?.length > 0 ? 'is-valid' : ''
                    }`}
                  {...register('correo', {
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Correo electrónico inválido'
                    }
                  })}
                />
                {errors.correo && <div className="invalid-feedback">{errors.correo.message}</div>}
                {!errors.correo && watch('correo')?.length > 0 && (
                  <div className="valid-feedback">Correo válido</div>
                )}
              </div>

              {/* Teléfono */}
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  className={`form-control ${errors.telefono ? 'is-invalid' : ((watch('telefono')?.length ?? 0) > 0 ? 'is-valid' : '')
                    }`}
                  {...register('telefono', {
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: 'Número de teléfono inválido'
                    }
                  })}
                />
                {errors.telefono && <div className="invalid-feedback">{errors.telefono.message}</div>}
                {!errors.telefono && ((watch('telefono')?.length ?? 0) > 0) && (
                  <div className="valid-feedback">Teléfono válido</div>
                )}
              </div>

              {/* Dirección */}
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <textarea
                  id="direccion"
                  className={`form-control ${errors.direccion ? 'is-invalid' : ((watch('direccion')?.length ?? 0) > 0 ? 'is-valid' : '')
                    }`}
                  {...register('direccion')}
                />
              </div>



              {/* País */}
              <div className="mb-3">
                <label htmlFor="pais" className="form-label">País</label>
                <select
                  id="pais"
                  className={`form-select ${errors.pais ? 'is-invalid' : watch('pais') ? 'is-valid' : ''}`}
                  {...register('pais', {
                    required: 'El país es obligatorio'
                  })}
                >
                  <option value="">Seleccione un país</option>
                  <option value="MX">México</option>
                  <option value="US">Estados Unidos</option>
                  <option value="CA">Canadá</option>
                </select>
                {errors.pais && <div className="invalid-feedback">{errors.pais.message}</div>}
                {!errors.pais && watch('pais') && (
                  <div className="valid-feedback">País seleccionado</div>
                )}
              </div>

              {/* Ciudad */}
              <div className="mb-3">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <input
                  id="ciudad"
                  className={`form-control ${errors.ciudad ? 'is-invalid' : (watch('ciudad')?.length ?? 0) > 0 ? 'is-valid' : ''
                    }`}
                  {...register('ciudad')}
                />
              </div>

              {/* Botones */}
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-outline-primary w-50 me-2" onClick={() => reset()}>
                  Limpiar
                </button>
                <button type="submit" className="btn btn-primary w-50 ms-2">
                  Guardar Cliente
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
