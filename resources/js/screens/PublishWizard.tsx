import { useState } from 'react';
import { Screen, BARRIOSUBATE } from '../data/mock';
import { ChevronLeft, ChevronRight, Upload, Camera, Check, CheckCircle, Shield, Lock } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

const STEPS = ['Características', 'Ubicación', 'Fotos', 'Descripción'];

export default function PublishWizard({ navigate }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: 'Apartamento',
    rooms: '2',
    bathrooms: '1',
    area: '',
    price: '',
    address: '',
    barrio: '',
    description: '',
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-2xl mx-auto">
      <button onClick={() => navigate('owner-dashboard')} className="flex items-center gap-1.5 text-[#6b7280] text-sm mb-6 hover:text-[#1E3A8A] transition-colors">
        <ChevronLeft size={16}/> Cancelar
      </button>

      <h2 className="font-heading font-bold text-2xl text-[#111827] mb-1">Publicar Vivienda</h2>
      <p className="text-[#6b7280] text-sm mb-6">Completa los pasos para publicar tu propiedad de forma segura.</p>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'step-done' : i === step ? 'step-active' : 'step-idle'
              }`}>
                {i < step ? <Check size={14}/> : i + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium hidden sm:block ${i === step ? 'text-[#1E3A8A]' : 'text-[#9ca3af]'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-[#059669]' : 'bg-[#e5e7eb]'}`}/>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6">
        {step === 0 && <Step1 form={form} set={set}/>}
        {step === 1 && <Step2 form={form} set={set}/>}
        {step === 2 && <Step3/>}
        {step === 3 && <Step4 form={form} set={set}/>}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => step > 0 ? setStep(s => s - 1) : navigate('owner-dashboard')}
          className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#374151] transition-colors font-medium"
        >
          <ChevronLeft size={16}/> {step > 0 ? 'Anterior' : 'Cancelar'}
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Siguiente <ChevronRight size={16}/>
          </button>
        ) : (
          <button
            onClick={() => navigate('verify-identity')}
            className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Verificar y Publicar <Shield size={16}/>
          </button>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">{children}</label>;
}

function Input({ value, onChange, placeholder, type = 'text', prefix }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; prefix?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-sm font-medium">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-[#e5e7eb] rounded-xl py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-all ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
      />
    </div>
  );
}

function Step1({ form, set }: { form: any; set: any }) {
  const types = ['Apartamento', 'Casa', 'Habitación', 'Local'];
  return (
    <div className="space-y-5">
      <h3 className="font-heading font-semibold text-[#111827]">Paso 1: Características de la propiedad</h3>
      <div>
        <Label>Tipo de propiedad</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {types.map(t => (
            <button key={t} onClick={() => set('type', t)}
              className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${form.type === t ? 'border-[#1E3A8A] bg-[#dbeafe] text-[#1E3A8A]' : 'border-[#e5e7eb] text-[#374151] hover:border-[#1E3A8A]/40'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Habitaciones</Label>
          <select value={form.rooms} onChange={e => set('rooms', e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]">
            {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <Label>Baños</Label>
          <select value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]">
            {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <Label>Área (m²)</Label>
          <Input value={form.area} onChange={v => set('area', v)} placeholder="58"/>
        </div>
      </div>
      <div>
        <Label>Precio mensual (COP)</Label>
        <Input value={form.price} onChange={v => set('price', v)} placeholder="750000" prefix="$"/>
      </div>
    </div>
  );
}

function Step2({ form, set }: { form: any; set: any }) {
  return (
    <div className="space-y-5">
      <h3 className="font-heading font-semibold text-[#111827]">Paso 2: Ubicación</h3>
      <div>
        <Label>Dirección exacta</Label>
        <Input value={form.address} onChange={v => set('address', v)} placeholder="Calle 6 #8-45"/>
      </div>
      <div>
        <Label>Barrio</Label>
        <select value={form.barrio} onChange={e => set('barrio', e.target.value)}
          className="w-full border border-[#e5e7eb] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]">
          <option value="">Selecciona un barrio</option>
          {BARRIOSUBATE.map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      {/* Map placeholder */}
      <div className="h-40 bg-[#f0f4ff] rounded-xl border border-[#dbeafe] flex items-center justify-center flex-col gap-2 text-[#6b7280]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <p className="text-sm text-[#1E3A8A] font-medium">Mapa interactivo</p>
        <p className="text-xs">Haz clic para ajustar la ubicación exacta</p>
      </div>
    </div>
  );
}

function Step3() {
  const [uploaded, setUploaded] = useState<string[]>([
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop&auto=format',
  ]);
  return (
    <div className="space-y-5">
      <h3 className="font-heading font-semibold text-[#111827]">Paso 3: Fotos de la propiedad</h3>
      <p className="text-sm text-[#6b7280]">Agrega al menos 3 fotos de buena calidad para atraer más inquilinos.</p>

      <div className="grid grid-cols-3 gap-3">
        {uploaded.map((url, i) => (
          <div key={i} className="relative h-24 bg-[#f3f4f6] rounded-xl overflow-hidden group">
            <img src={url} alt="" className="w-full h-full object-cover"/>
            <button onClick={() => setUploaded(u => u.filter((_, j) => j !== i))}
              className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              ×
            </button>
          </div>
        ))}
        {uploaded.length < 8 && (
          <button
            onClick={() => setUploaded(u => [...u, `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=150&fit=crop&auto=format&t=${Date.now()}`])}
            className="h-24 bg-[#f0f4ff] border-2 border-dashed border-[#93c5fd] rounded-xl flex flex-col items-center justify-center gap-1 text-[#1E3A8A] hover:bg-[#dbeafe] transition-colors"
          >
            <Upload size={18}/>
            <span className="text-xs font-medium">Agregar</span>
          </button>
        )}
      </div>

      <div className="flex items-start gap-3 bg-[#fef3c7] rounded-xl p-3">
        <span className="text-sm">💡</span>
        <p className="text-xs text-[#92400e]">Las fotos de buena calidad reciben hasta 3× más solicitudes. Usa luz natural y muestra todas las habitaciones.</p>
      </div>
    </div>
  );
}

function Step4({ form, set }: { form: any; set: any }) {
  return (
    <div className="space-y-5">
      <h3 className="font-heading font-semibold text-[#111827]">Paso 4: Descripción y Vista Previa</h3>
      <div>
        <Label>Descripción de la propiedad</Label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Describe las características especiales, servicios incluidos, normas de la propiedad…"
          rows={4}
          className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-all resize-none"
        />
        <p className="text-xs text-[#9ca3af] text-right mt-1">{form.description.length}/500</p>
      </div>
      {/* Preview card */}
      <div className="border border-[#e5e7eb] rounded-xl overflow-hidden">
        <div className="h-32 bg-[#dbeafe]">
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=150&fit=crop&auto=format" alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="p-4">
          <p className="font-heading font-bold text-[#111827] text-sm">Vista previa de tu publicación</p>
          <p className="text-xs text-[#6b7280]">{form.barrio || 'Barrio'} · {form.type}</p>
          <p className="font-bold text-[#1E3A8A] mt-1">${form.price || '—'}<span className="text-xs font-normal text-[#6b7280]">/mes</span></p>
        </div>
      </div>
    </div>
  );
}
