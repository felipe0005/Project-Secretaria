import Boton from "./Boton";

export default function Login() {
  return (
    <div className="display flex justify-center items-center h-screen">
      <form action="" className="display row justify-center">
        <input type="text" placeholder="usuario" className="" />
        <input type="password" placeholder="contraseña" />
        <Boton text="Iniciar Sesión" />
      </form>
    </div>
  );
}
