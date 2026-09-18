export type Screen =
  | 'welcome'
  | 'login'
  | 'register'
  | 'feed'
  | 'property-detail'
  | 'messages'
  | 'favorites'
  | 'notifications'
  | 'publish-wizard'
  | 'verify-identity'
  | 'publish-success'
  | 'owner-dashboard'
  | 'requests'
  | 'profile'
  | 'edit-profile'
  | 'reviews'
  | 'report'
  | 'security-center'
  | 'admin-dashboard'
  | 'settings';

export type UserRole = 'tenant' | 'owner' | 'admin';

export interface Property {
  id: string;
  title: string;
  address: string;
  barrio: string;
  price: number;
  rooms: number;
  bathrooms: number;
  area: number;
  type: 'Apartamento' | 'Casa' | 'Habitación' | 'Local';
  description: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerVerified: boolean;
  ownerPhoto: string;
  status: 'active' | 'inactive' | 'expired';
  visits: number;
  requests: number;
  isFavorite: boolean;
  publishedAt: string;
}

export interface Conversation {
  id: string;
  otherUser: string;
  otherPhoto: string;
  propertyTitle: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: { from: 'me' | 'them'; text: string; time: string }[];
}

export interface Notification {
  id: string;
  type: 'message' | 'request' | 'property' | 'verify';
  text: string;
  time: string;
  read: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Apartamento Moderno en el Centro',
    address: 'Calle 6 #8-45',
    barrio: 'Centro',
    price: 750000,
    rooms: 2,
    bathrooms: 1,
    area: 58,
    type: 'Apartamento',
    description: 'Hermoso apartamento en el corazón de Ubaté. Piso 3, con excelente iluminación natural, cocina integral, closets en todas las habitaciones y parqueadero cubierto. Cerca al parque principal y mercado municipal. Ideal para pareja o familia pequeña.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop&auto=format',
    ],
    ownerId: 'u2',
    ownerName: 'Carlos Méndez',
    ownerVerified: true,
    ownerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    status: 'active',
    visits: 142,
    requests: 8,
    isFavorite: true,
    publishedAt: '2026-09-01',
  },
  {
    id: 'p2',
    title: 'Casa Campestre con Jardín',
    address: 'Carrera 12 #15-20, Urbanización Los Pinos',
    barrio: 'Los Pinos',
    price: 1200000,
    rooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'Casa',
    description: 'Amplia casa campestre con jardín privado y vista a los cerros. Tres habitaciones, dos baños, sala-comedor, cocina independiente y patio trasero. Zona residencial tranquila a 10 min del centro. Perfecta para familia.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=500&fit=crop&auto=format',
    ],
    ownerId: 'u3',
    ownerName: 'Rosa Elena Páez',
    ownerVerified: true,
    ownerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    status: 'active',
    visits: 89,
    requests: 5,
    isFavorite: false,
    publishedAt: '2026-09-05',
  },
  {
    id: 'p3',
    title: 'Habitación Amoblada Cerca al Colegio',
    address: 'Calle 10 #5-12',
    barrio: 'San Miguel',
    price: 320000,
    rooms: 1,
    bathrooms: 1,
    area: 18,
    type: 'Habitación',
    description: 'Habitación amoblada con baño privado, incluye WiFi, agua y luz. Cocina compartida. Muy cerca al Colegio Nuestra Señora del Carmen y a la plaza de mercado. Ideal para estudiantes o trabajadores.',
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=500&fit=crop&auto=format',
    ],
    ownerId: 'u4',
    ownerName: 'Jorge Suárez',
    ownerVerified: false,
    ownerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    status: 'active',
    visits: 67,
    requests: 3,
    isFavorite: false,
    publishedAt: '2026-09-10',
  },
  {
    id: 'p4',
    title: 'Apartamento Estudio – Listo para Entrar',
    address: 'Carrera 8 #9-30',
    barrio: 'La Esperanza',
    price: 480000,
    rooms: 1,
    bathrooms: 1,
    area: 35,
    type: 'Apartamento',
    description: 'Estudio moderno completamente remodelado. Incluye cocina integral, closet empotrado, baño con ducha tipo lluvia. Edificio con portería, vigilancia 24h y zonas comunes. Servicios públicos aparte.',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=500&fit=crop&auto=format',
    ],
    ownerId: 'u2',
    ownerName: 'Carlos Méndez',
    ownerVerified: true,
    ownerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    status: 'active',
    visits: 54,
    requests: 2,
    isFavorite: true,
    publishedAt: '2026-09-12',
  },
  {
    id: 'p5',
    title: 'Casa Colonial Restaurada',
    address: 'Carrera 5 #7-11',
    barrio: 'Centro Histórico',
    price: 950000,
    rooms: 4,
    bathrooms: 2,
    area: 160,
    type: 'Casa',
    description: 'Imponente casa colonial de dos pisos completamente restaurada. Patio central con jardín, cuatro habitaciones amplias, sala, comedor, cocina grande y dos baños. Patrimonio arquitectónico de Ubaté.',
    images: [
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop&auto=format',
    ],
    ownerId: 'u3',
    ownerName: 'Rosa Elena Páez',
    ownerVerified: true,
    ownerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    status: 'inactive',
    visits: 211,
    requests: 14,
    isFavorite: false,
    publishedAt: '2026-08-20',
  },
  {
    id: 'p6',
    title: 'Local Comercial en Zona Rosa',
    address: 'Avenida Principal #22-15',
    barrio: 'Zona Rosa',
    price: 1800000,
    rooms: 0,
    bathrooms: 1,
    area: 80,
    type: 'Local',
    description: 'Local comercial en la principal avenida comercial de Ubaté. Alto flujo peatonal, vitrina amplia, baño, bodega, instalaciones eléctricas trifásicas. Ideal para restaurante, almacén o consultorio.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format',
    ],
    ownerId: 'u5',
    ownerName: 'Empresa Inmobiliaria Andina',
    ownerVerified: true,
    ownerPhoto: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=80&h=80&fit=crop&auto=format',
    status: 'active',
    visits: 33,
    requests: 1,
    isFavorite: false,
    publishedAt: '2026-09-14',
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    otherUser: 'Carlos Méndez',
    otherPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    propertyTitle: 'Apartamento Moderno en el Centro',
    lastMessage: 'Claro, podemos coordinar la visita el sábado a las 10am.',
    lastTime: '10:42 AM',
    unread: 2,
    messages: [
      { from: 'me', text: 'Hola, estoy interesado en el apartamento. ¿Está disponible para visita?', time: 'Ayer 3:15 PM' },
      { from: 'them', text: 'Buenas tardes, sí con gusto. ¿Cuándo le quedaría bien?', time: 'Ayer 4:02 PM' },
      { from: 'me', text: 'Podría ser este sábado en la mañana.', time: 'Ayer 4:10 PM' },
      { from: 'them', text: 'Claro, podemos coordinar la visita el sábado a las 10am.', time: '10:42 AM' },
    ],
  },
  {
    id: 'c2',
    otherUser: 'Rosa Elena Páez',
    otherPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    propertyTitle: 'Casa Campestre con Jardín',
    lastMessage: 'El precio incluye parqueadero y jardín.',
    lastTime: 'Ayer',
    unread: 0,
    messages: [
      { from: 'me', text: '¿El precio incluye servicios?', time: 'Ayer 9:00 AM' },
      { from: 'them', text: 'El precio incluye parqueadero y jardín.', time: 'Ayer 9:30 AM' },
    ],
  },
  {
    id: 'c3',
    otherUser: 'Jorge Suárez',
    otherPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    propertyTitle: 'Habitación Amoblada',
    lastMessage: '¿Cuándo podría ir a verla?',
    lastTime: 'Lun',
    unread: 0,
    messages: [
      { from: 'me', text: '¿Cuándo podría ir a verla?', time: 'Lun 2:00 PM' },
    ],
  },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'message', text: 'Carlos Méndez te envió un mensaje sobre "Apartamento Moderno"', time: 'Hace 10 min', read: false },
  { id: 'n2', type: 'request', text: 'Tienes una nueva solicitud de arriendo para "Apartamento Moderno"', time: 'Hace 1 hora', read: false },
  { id: 'n3', type: 'verify', text: 'Tu identidad ha sido verificada exitosamente ✓', time: 'Hace 2 horas', read: true },
  { id: 'n4', type: 'property', text: 'Nueva propiedad en Centro que coincide con tu búsqueda', time: 'Ayer', read: true },
  { id: 'n5', type: 'request', text: 'Rosa Elena aceptó tu solicitud de visita', time: 'Ayer', read: true },
];

export const BARRIOSUBATE = [
  'Centro', 'Centro Histórico', 'San Miguel', 'Los Pinos', 'La Esperanza',
  'Zona Rosa', 'El Rosario', 'Villa del Norte', 'Bello Horizonte', 'La Granja',
  'Comuneros', 'Girardot', 'San Cristóbal', 'Villa Luz',
];

export const CURRENT_USER = {
  id: 'u1',
  name: 'Sofía Rodríguez',
  email: 'sofia.rodriguez@gmail.com',
  phone: '315 842 7631',
  role: 'tenant' as UserRole,
  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
  verified: true,
  rating: 4.8,
  reviewCount: 12,
  joinedAt: 'Marzo 2025',
};

export function fmtPrice(n: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
}
