import React, { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

export default function Scanner() {
  const scannerRef = useRef(null)

  useEffect(() => {
    const html5QrcodeScanner = new Html5Qrcode('reader')

    html5QrcodeScanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          alert(`Código lido: ${decodedText}`)
          html5QrcodeScanner.stop()
        },
        (errorMessage) => {
          // Você pode logar erros aqui se quiser
        }
      )
      .catch((err) => {
        console.error('Erro ao iniciar scanner', err)
      })

    return () => {
      html5QrcodeScanner.stop().catch(() => {})
    }
  }, [])

  return (
    <div>
      <h2>Scanner de Código de Barras</h2>
      <div id="reader" ref={scannerRef} style={{ width: '300px', height: '300px' }}></div>
    </div>
  )
}
