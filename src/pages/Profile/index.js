import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

export default function Profile() {
    const [Incidents, setIncidents] = useState([]);
    const ong_name = localStorage.getItem('ong_name');
    const ong_id = localStorage.getItem('ong_id');
    const history = useHistory();

    function handleLogout () {
        localStorage.clear();
        history.push('/');
    }


    function handleDeleteIncident (id) {
        try {
        api.delete(`incidents/${id}`, {
            headers : {
                Authorization : ong_id
            }

        });
        
        setIncidents(Incidents.filter(incidents => incidents.id !== id));

        }catch (err){
            alert("error ao deletar o caso.")
        }
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ong_id
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ong_id]);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vindo {ong_name}</span>

                <Link className="button" to="incidents/new">Cadastrar novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {Incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incidents.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                        <button onClick = {() => handleDeleteIncident(incidents.id)} type="button">
                            <FiTrash2 color="#a8a8b3" size={20}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}