import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [nome, setNome] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    // Aqui a senha deve ser criptografada antes no mundo real
    const { data, error } = await supabase.from('users').insert([
      {
        nome,
        username,
        senha_hash: password
      }
    ])

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      navigate('/login')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Registrar Usuário</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome:</label>
          <input value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Usuário:</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: 10 }}>
          Registrar
        </button>
      </form>
    </div>
  )
}
