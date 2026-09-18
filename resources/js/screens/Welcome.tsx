import { Screen } from '../data/mock';
import { Shield, CheckCircle, Lock } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

export default function Welcome({ navigate }: Props) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Hero image */}
      <div className="relative lg:w-[55%] h-64 lg:h-screen flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop&auto=format"
          alt="Casa típica en Ubaté, Colombia"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/80 to-[#1E3A8A]/40" />

        {/* Logo on image */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#1E3A8A"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="#F59E0B" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <span className="text-white font-heading font-bold text-xl">DignaVivienda</span>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F59E0B] mb-3">Municipio de Ubaté · Colombia</p>
            <h1 className="font-heading font-bold text-3xl lg:text-5xl leading-tight mb-4">
              Tu hogar,<br />con garantía.
            </h1>
            <p className="text-white/80 text-base lg:text-lg max-w-md">
              La plataforma oficial de alquiler con verificación de identidad y contratos digitales seguros.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: <Shield size={14}/>, text: 'Identidad verificada' },
              { icon: <Lock size={14}/>, text: 'Contratos digitales' },
              { icon: <CheckCircle size={14}/>, text: 'Libre de fraudes' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                {b.icon}{b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: CTA panel */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 lg:p-16">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-[#1E3A8A]">DignaVivienda</span>
          </div>

          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-[#111827] mb-2">Bienvenido</h2>
          <p className="text-[#6b7280] text-sm mb-8">
            Conectamos propietarios e inquilinos con seguridad y transparencia en Ubaté.
          </p>

          <div className="space-y-3 mb-8">
            <button
              onClick={() => navigate('login')}
              className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigate('register')}
              className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-[#1c1917] font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm"
            >
              Crear Cuenta Gratis
            </button>
          </div>

          {/* Features */}
          <div className="space-y-4 border-t border-[#f3f4f6] pt-6">
            {[
              { title: 'Verificación de identidad', desc: 'Cédula validada para propietarios e inquilinos' },
              { title: 'Firma digital', desc: 'Contratos legales firmados electrónicamente' },
              { title: 'Sin intermediarios', desc: 'Contacto directo con total transparencia' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#d1fae5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={12} className="text-[#059669]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{f.title}</p>
                  <p className="text-xs text-[#6b7280]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#9ca3af] text-center mt-8">
            Al registrarte aceptas nuestra{' '}
            <span className="text-[#1E3A8A] cursor-pointer hover:underline">Política de Privacidad</span>{' '}
            y{' '}
            <span className="text-[#1E3A8A] cursor-pointer hover:underline">Términos de Servicio</span>
          </p>
        </div>
      </div>
    </div>
  );
}
