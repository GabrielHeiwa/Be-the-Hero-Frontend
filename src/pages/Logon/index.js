import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import hereosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', {id});
            
            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', res.data.name);

            history.push('/profile');

        } catch (Err) {
            alert(`Sorry Id ${id} not found`);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input type="text"
                     placeholder="Sua ID"
                     value={id}
                     onChange={e => setId(e.target.value)}
                      />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro
                        </Link>
                </form>
            </section>

            <img src={hereosImg} alt="hereos" />
        </div>
    );
}