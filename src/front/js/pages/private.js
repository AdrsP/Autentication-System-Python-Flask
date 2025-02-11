import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getMessage(); // los condicionales para store.token implican que get message no sera llamado a menos que se tenga un valor aceptable como token
        if (store.token === "" || store.token === undefined) navigate('/'); // con este condicional si no hay token no puede acceder a la pagina
    }, [store.token]) // en el array de useEffect se ingresa store.token para que el use effect se active cada vez que cambie el valor de token en la store

	const handleClick = () =>{           // la funcion handle click elimina el usuario, tecnicamente pues es dificil que la action delete user no elimine el usuario, puesto que para accionarla hay que estar logueado con un token valido pero igual me gustaria ver si puedo validar nuevamente las otras acciones
		actions.deleteUser();			// en unisono con lo demas aplico el logout y redirecciono no se si hacer esto con async await
		actions.logout();
		navigate('/');
	}

	return (
		<div className="text-center mt-5">
			<h1>{store.message}</h1>
			<p> You should not be here if you are not logged in, and the developer should be fired, but if you are logged in the developer should be hired !!
			</p>
			<p>
				You are bored because this app doesn't do anything?
			</p>
            <button className="btn btn-danger" onClick={handleClick}> Delete my User </button>
		</div>
	);
};