import React, { useEffect, useState, useContext } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthContext } from '../lib/AuthContext'

export default function Dashboard() {
  const { user, isMaster } = useContext(AuthContext)
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProdutos = async () => {
    setLoading(true)
    let query = supabase.from('produtos').select('*').order('created_at', { ascending: false })
    if (!isMaster) {
      query = query.eq('user_id', user.id)
    }
    const { data, error } = await query
    if (error) {
      alert('Erro ao buscar produtos: ' + error.message)
    } else {
      setProdutos(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  return (
    <div>
      <h2>Dashboard de Produtos</h2>
      <button onClick={fetchProdutos}>Atualizar</button>
      {loading ? (
        <p>Carregando...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>Código PA</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Lote</th>
              <th>Validade</th>
              <th>Data Criação</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.codigo_pa}</td>
                <td>{p.descricao}</td>
                <td>{p.quantidade}</td>
                <td>{p.lote}</td>
                <td>{p.validade}</td>
                <td>{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
