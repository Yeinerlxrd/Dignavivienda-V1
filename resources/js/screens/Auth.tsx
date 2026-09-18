import { useState } from 'react';
import { Screen } from '../data/mock';
import { Lock, User, Phone, ChevronLeft, Shield } from '../components/Icons';

interface Props {
  navigate: (s: Screen) => void;
  mode: 'login' | 'register';
  errors?: string[];
}

export default function Auth({ navigate, mode, errors = [] }: Props) {
  const [intent, setIntent] = useState<'rent' | 'publish'>('rent');
  const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('welcome')}
          className="flex items-center gap-1.5 text-[#6b7280] text-sm mb-6 hover:text-[#1E3A8A] transition-colors"
        >
          <ChevronLeft size={16} /> Volver
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] overflow-hidden">
          <div className="bg-[#1E3A8A] px-8 py-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2z" fill="white"/>
                </svg>
              </div>
              <span className="text-white font-heading font-bold">DignaVivienda</span>
            </div>
            <h1 className="text-white font-heading font-bold text-xl mt-2">
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h1>
            <p className="text-white/70 text-sm">
              {mode === 'login' ? 'Ingresa a tu cuenta segura' : 'Únete a la comunidad de alquiler confiable'}
            </p>
          </div>

          <form action={mode === 'login' ? '/login' : '/registro'} method="POST" className="p-8">
            <input type="hidden" name="_token" value={csrf} />

            {errors.length > 0 && (
              <div className="mb-5 bg-[#fee2e2] border border-[#fecaca] rounded-xl p-3 text-sm text-[#991b1b]">
                {errors.map((error, index) => <p key={index}>{error}</p>)}
              </div>
            )}

            {mode === 'register' && (
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Quiero</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIntent('rent')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      intent === 'rent'
                        ? 'border-[#1E3A8A] bg-[#dbeafe] text-[#1E3A8A]'
                        : 'border-[#e5e7eb] text-[#6b7280] hover:border-[#1E3A8A]/40'
                    }`}
                  >
                    <span className="text-xl">🏘️</span>
                    Buscar vivienda
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent('publish')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      intent === 'publish'
                        ? 'border-[#1E3A8A] bg-[#dbeafe] text-[#1E3A8A]'
                        : 'border-[#e5e7eb] text-[#6b7280] hover:border-[#1E3A8A]/40'
                    }`}
                  >
                    <span className="text-xl">🏠</span>
                    Publicar vivienda
                  </button>
                </div>
                <input type="hidden" name="intent" value={intent} />
              </div>
            )}

            <div className="space-y-4">
              {mode === 'register' && (
                <Field name="name" label="Nombre completo" type="text" placeholder="Ej. Ana María López" icon={<User size={16}/>} />
              )}
              <Field name="email" label="Correo electrónico" type="email" placeholder="tucorreo@gmail.com" icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              } />
              {mode === 'register' && (
                <Field name="phone" label="Teléfono" type="tel" placeholder="315 842 7631" icon={<Phone size={16}/>} />
              )}
              <Field name="password" label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" icon={<Lock size={16}/>} />
              {mode === 'register' && (
                <Field name="password_confirmation" label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña" icon={<Lock size={16}/>} />
              )}

              {mode === 'register' && (
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-[#1E3A8A]" />
                  <span className="text-xs text-[#6b7280]">
                    Acepto los <span className="text-[#1E3A8A] underline">Términos y Condiciones</span> y la <span className="text-[#1E3A8A] underline">Política de Privacidad</span> (Ley 1581 de 2012)
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200"
            >
              {mode === 'login' ? 'Ingresar' : 'Crear Cuenta'}
            </button>

            {mode === 'login' && (
              <button type="button" className="w-full mt-3 text-sm text-[#1E3A8A] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            )}

            <div className="mt-6 pt-5 border-t border-[#f3f4f6] text-center text-sm text-[#6b7280]">
              {mode === 'login' ? (
                <>¿No tienes cuenta? <button type="button" className="text-[#1E3A8A] font-semibold hover:underline" onClick={() => navigate('register')}>Regístrate</button></>
              ) : (
                <>¿Ya tienes cuenta? <button type="button" className="text-[#1E3A8A] font-semibold hover:underline" onClick={() => navigate('login')}>Inicia sesión</button></>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-3">
              <Shield size={14} className="text-[#059669] flex-shrink-0" />
              <p className="text-xs text-[#065f46]">Tus datos están protegidos y serán tratados de acuerdo con nuestra política de privacidad.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ name, label, type, placeholder, icon }: { name: string; label: string; type: string; placeholder: string; icon: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-[#374151] mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">{icon}</div>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required
          className="w-full pl-9 pr-4 py-3 border border-[#e5e7eb] rounded-xl text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-all bg-[#fafafa]"
        />
      </div>
    </div>
  );
}
