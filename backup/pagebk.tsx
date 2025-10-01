'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css'

type LoginData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginData>({ mode: 'onChange' });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      // Aquí se hace petición real al backend con fetch() una vez terminada las pruebas
      if (data.username === 'admin' && data.password === '123456') {
        sessionStorage.setItem('token', 'fake-jwt');
        /* Swal.fire('Éxito', 'Inicio de sesión correcto', 'success'); */
        Swal.fire({
          icon:"success",
          title:"Exito",
          text:"Inicio de sesión correcto, Bienvenido",
          showConfirmButton:false,
          timer:1500
        });
        router.push('/customer-register-form');
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    } catch (err: any) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row vh-100">
        {/* Sección de publicidad */}
        <div className="col-8 col-lg-8 d-none d-lg-flex p-0">
          <div className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.containerImg}`}>
            <div className={styles.overlay}></div>
            <p className={`text-white position-relative ${styles.loginBannerText}`}>
              Bienvenido a Coppel
            </p>
          </div>
        </div>

        {/* Sección de login */}
        <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center bg-white">
          <div className={`w-100  mx-3 shadow-lg ${styles.cardLogin}`}>
            <h2 className="text-center mb-4">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Usuario */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario</label>
                <input
                  id="username"
                  className={`form-control shadow-sm ${errors.username ? 'is-invalid' : watch('username') ? 'is-valid' : ''}`}
                  {...register('username', { required: 'El usuario es obligatorio' })}
                />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label ">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  className={`form-control shadow-sm ${errors.password ? 'is-invalid' : watch('password') ? 'is-valid' : ''}`}
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                  })}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>

              {/* Botón */}
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-coppel m-3">
                  Iniciar Sesión
                </button>
                <div className="d-flex align-items-center text-muted my-3">
                  <hr className="flex-grow-1 mx-4 my-0" />
                  <p className="mb-0">O</p>
                  <hr className="flex-grow-1 mx-4" />
                </div>
                <button className="btn btn-outline-primary btn-coppel m-3">
                  Continuar  con Google
                </button>
                <button className="btn btn-outline-primary btn-coppel m-3">
                  Continuasr con Facebook
                </button>
                <button className="btn btn-outline-primary btn-coppel m-3">
                  Continuasr con Apple
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


