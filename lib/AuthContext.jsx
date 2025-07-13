import React, { createContext, useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const login = async (username, password) => {
    // aqui você precisa implementar a autenticação customizada
    // pois supabase normalmente usa email, mas seu app é só username+senha
    // você pode usar uma tabela 'users' no Supabase para validar manualmente
    // exemplo básico:
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('senha_hash', password) // atenção: senha deve ser hash mesmo na prática!
      .single()

    if (error || !data) {
      return { error: 'Usuário ou senha inválidos' }
    }

    setUser(data)
    return { user: data }
  }

  const logout = async () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
