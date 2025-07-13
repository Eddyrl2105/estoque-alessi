import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { AuthContext } from '../lib/AuthContext.jsx'

export default function AddProduct() {
  const { user } = useContext(AuthContext)
  const [codigoPA, setCodigoPA] = useState('')
  const [descricao, setDescricao] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [lote, setLote] = useState('')
  const [validade, setValidade] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('Usuário não autenticado')
      return
    }
    const { data, error } = await supabase.from('produtos').insert([
      {
        user_id: user.id,
        codigo_pa: codigoPA,
        descricao,
        quantidade: parseInt(quantidade, 10),
        lote,
        validade
      }
    ])

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      navigate('/dashboard')
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Código PA:</label>
          <input value={codigoPA} onChange={e => setCodigoPA(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input value={descricao} onChange={e => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
        </div>
        <div>
          <label>Lote:</label>
          <input value={lote} onChange={e => setLote(e.target.value)} />
        </div>
        <div>
          <label>Validade:</label>
          <input type="date" value={validade} onChange={e => setValidade(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: 10 }}>
          Adicionar
        </button>
      </form>
    </div>
  )
}
