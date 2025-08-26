import React from "react";

export default function boton({ text, className, onClick }) {
  return (
    <div className="flex justify-center">
      <button
        className={`border-2 rounded-3xl text-sky-600 border-sky-600 font-bold p-1.5 px-8 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition duration-300 my-3  ${className}`}
        onClick={onClick} //agrega la capacidad de ponerle una funcion
      >
        {text}
      </button>
    </div>
  );
}
