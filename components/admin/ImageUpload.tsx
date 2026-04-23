'use client'

import { useRef, useState } from 'react'
import { Upload, X, Link as LinkIcon } from 'lucide-react'

interface Props {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) { setError('Fichier invalide — images uniquement.'); return }
    setUploading(true)
    setError('')

    // Compress via canvas
    const bitmap = await createImageBitmap(file)
    const MAX = 900
    const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height))
    const w = Math.round(bitmap.width  * scale)
    const h = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
    const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/jpeg', 0.82))

    // Base64 encode
    const buffer = await blob.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
    const base64 = btoa(binary)
    const filename = `${Date.now()}.jpg`

    // Show local preview immediately while uploading
    const localPreview = `data:image/jpeg;base64,${base64}`
    onChange(localPreview)

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64, filename, mimeType: 'image/jpeg' }),
    })
    setUploading(false)

    if (res.ok) {
      const { url } = await res.json()
      onChange(url) // Replace data URL with real URL
    } else {
      // Keep local preview but warn — will need re-upload
      setError('Upload GitHub échoué. La photo ne sera pas sauvegardée. Réessayez.')
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex rounded-lg overflow-hidden border border-neutral-700 w-fit">
        <button type="button" onClick={() => setMode('upload')}
          className={`px-4 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 ${mode === 'upload' ? 'bg-gold-800 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>
          <Upload size={12} /> Uploader
        </button>
        <button type="button" onClick={() => setMode('url')}
          className={`px-4 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 ${mode === 'url' ? 'bg-gold-800 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}>
          <LinkIcon size={12} /> URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-neutral-700 hover:border-gold-600 rounded-xl p-6 text-center cursor-pointer transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <svg className="animate-spin w-6 h-6 text-gold-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <p className="text-neutral-400 text-xs">Upload en cours…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} className="text-neutral-600" />
              <p className="text-neutral-400 text-sm">Cliquez ou déposez une image</p>
              <p className="text-neutral-600 text-xs">JPG, PNG, WEBP — max 10 MB</p>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-neutral-800 border border-neutral-700 focus:border-gold-600 rounded-lg px-4 py-2.5 text-white outline-none transition-colors text-sm"
        />
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {/* Preview */}
      {value && (
        <div className="relative w-full h-52 rounded-xl overflow-hidden bg-neutral-800 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
            <X size={13} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 py-2 px-3">
            <p className="text-white text-xs truncate">{value.split('/').pop()}</p>
          </div>
        </div>
      )}
    </div>
  )
}
