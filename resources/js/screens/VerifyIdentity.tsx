import { useState } from 'react';
import { Screen } from '../data/mock';
import { Shield, Upload, CheckCircle, Lock, AlertTriangle } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

type Status = 'idle' | 'uploading' | 'reviewing' | 'approved';

export default function VerifyIdentity({ navigate }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const handleSubmit = () => {
    setStatus('uploading');
    setTimeout(() => { setStatus('reviewing'); }, 1200);
    setTimeout(() => { setStatus('approved'); }, 3000);
  };

  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-lg mx-auto">
      <h2 className="font-heading font-bold text-2xl text-[#111827] mb-1">Verificación de Identidad</h2>
      <p className="text-[#6b7280] text-sm mb-6">Proceso obligatorio para publicar propiedades. Tu información está protegida.</p>

      {status === 'approved' ? (
        <Approved navigate={navigate}/>
      ) : status === 'reviewing' ? (
        <Reviewing/>
      ) : (
        <>
          {/* Security header */}
          <div className="bg-[#1E3A8A] rounded-2xl p-5 mb-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-white"/>
            </div>
            <div>
              <p className="font-heading font-semibold text-white text-sm">Proceso Seguro y Confidencial</p>
              <p className="text-white/70 text-xs mt-1 leading-relaxed">
                Tu cédula se valida una sola vez. Los datos se almacenan cifrados conforme a la <span className="text-[#F59E0B]">Ley 1581 de 2012</span>.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-6">
            <UploadBox
              label="Cara frontal de la Cédula"
              hint="Muestra tu foto, nombre completo y número de cédula"
              uploaded={frontUploaded}
              onUpload={() => setFrontUploaded(true)}
            />
            <UploadBox
              label="Cara posterior de la Cédula"
              hint="Muestra la huella y código de barras"
              uploaded={backUploaded}
              onUpload={() => setBackUploaded(true)}
            />
          </div>

          {/* Legal note */}
          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2">
              <Lock size={14} className="text-[#6b7280] mt-0.5 flex-shrink-0"/>
              <div className="text-xs text-[#6b7280] leading-relaxed space-y-1">
                <p>Los documentos se procesan mediante un sistema automatizado de verificación biométrica.</p>
                <p>No se comparten con terceros sin tu consentimiento expreso (Ley 1581/2012, Ley 527/1999).</p>
                <p>La verificación tarda máximo 24 horas hábiles.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!frontUploaded || !backUploaded}
            className="w-full bg-[#059669] hover:bg-[#047857] disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Shield size={16}/> Enviar documentos para verificación
          </button>

          {(!frontUploaded || !backUploaded) && (
            <p className="text-xs text-center text-[#9ca3af] mt-2">Sube ambas caras de la cédula para continuar</p>
          )}
        </>
      )}
    </div>
  );
}

function UploadBox({ label, hint, uploaded, onUpload }: { label: string; hint: string; uploaded: boolean; onUpload: () => void }) {
  return (
    <div
      onClick={() => !uploaded && onUpload()}
      className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
        uploaded
          ? 'border-[#059669] bg-[#f0fdf4]'
          : 'border-dashed border-[#d1d5db] hover:border-[#1E3A8A] hover:bg-[#f0f4ff] bg-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${uploaded ? 'bg-[#d1fae5]' : 'bg-[#f3f4f6]'}`}>
          {uploaded ? <CheckCircle size={24} className="text-[#059669]"/> : <Upload size={24} className="text-[#9ca3af]"/>}
        </div>
        <div>
          <p className="font-semibold text-sm text-[#111827]">{label}</p>
          <p className="text-xs text-[#6b7280] mt-0.5">{hint}</p>
          {uploaded && <p className="text-xs text-[#059669] font-semibold mt-1">✓ Documento cargado</p>}
        </div>
      </div>
    </div>
  );
}

function Reviewing() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-[#fef3c7] rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse">
        <Shield size={36} className="text-[#F59E0B]"/>
      </div>
      <h3 className="font-heading font-bold text-xl text-[#111827] mb-2">En revisión</h3>
      <p className="text-[#6b7280] text-sm max-w-xs mx-auto leading-relaxed">
        Estamos verificando tu identidad. Recibirás una notificación en tu correo en las próximas horas.
      </p>
      <div className="flex justify-center gap-1 mt-6">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s`}}/>
        ))}
      </div>
    </div>
  );
}

function Approved({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle size={40} className="text-[#059669]"/>
      </div>
      <span className="badge-verified text-sm px-4 py-1.5 mb-4 inline-flex">
        <CheckCircle size={14}/> Identidad verificada
      </span>
      <h3 className="font-heading font-bold text-xl text-[#111827] mb-2 mt-3">¡Verificación exitosa!</h3>
      <p className="text-[#6b7280] text-sm max-w-xs mx-auto leading-relaxed mb-8">
        Tu identidad ha sido confirmada. Ahora puedes publicar propiedades y firmar contratos digitales.
      </p>
      <button
        onClick={() => navigate('publish-success')}
        className="bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
      >
        Publicar mi propiedad
      </button>
    </div>
  );
}
