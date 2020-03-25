import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ong_id = localStorage.getItem('ong_id');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ong_id
                }
            });

            history.push('/profile');

        } catch (err) {
            alert("Sorry failed in register the register");
        }
    }

    return (
        <div className="new-incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BE the Hero" />
                    <h1>Cadastrar novo caso.</h1>
                    <p>Descreve o textp detadalhamente para achar um heroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        <p>Voltar para home</p>
                    </Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text"
                        placeholder="Titúlo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}