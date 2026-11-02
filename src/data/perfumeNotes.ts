import { PerfumeNote } from '../types/perfume';

export const INGREDIENT_DIRECTORY: PerfumeNote[] = [
  // Цитрусовые и свежие
  { name: 'Калабрийский бергамот', category: 'citrus', icon: '🍋' },
  { name: 'Горький апельсин', category: 'citrus', icon: '🍊' },
  { name: 'Юдзу', category: 'citrus', icon: '🍋' },
  { name: 'Мандарин', category: 'citrus', icon: '🍊' },
  { name: 'Розовый грейпфрут', category: 'citrus', icon: '🍊' },
  
  // Пряные
  { name: 'Кардамон из Гватемалы', category: 'spicy', icon: '✨' },
  { name: 'Черный перец', category: 'spicy', icon: '🌶️' },
  { name: 'Шафран', category: 'spicy', icon: '🏵️' },
  { name: 'Розовый перец', category: 'spicy', icon: '🌸' },
  { name: 'Корица', category: 'spicy', icon: '🪵' },
  { name: 'Мускатный орех', category: 'spicy', icon: '🌰' },

  // Цветочные и лавандовые
  { name: 'Прованская горная лаванда', category: 'floral', icon: '🪻' },
  { name: 'Французская лаванда', category: 'floral', icon: '🪻' },
  { name: 'Дамасская роза', category: 'floral', icon: '🌹' },
  { name: 'Майская роза из Грасса', category: 'floral', icon: '🌸' },
  { name: 'Белый пион', category: 'floral', icon: '🌺' },
  { name: 'Жасмин Самбак', category: 'floral', icon: '🌼' },
  { name: 'Королевский ирис', category: 'floral', icon: '🪻' },
  { name: 'Цветок апельсина (Флердоранж)', category: 'floral', icon: '💮' },
  { name: 'Магнолия', category: 'floral', icon: '🌸' },
  { name: 'Белая сирень', category: 'floral', icon: '🪻' },
  { name: 'Османтус', category: 'floral', icon: '🌸' },
  { name: 'Лепестки фиалки', category: 'floral', icon: '💜' },
  { name: 'Цветок миндаля', category: 'floral', icon: '💮' },

  // Древесные & Пудровые
  { name: 'Майсурский сандал', category: 'woody', icon: '🪵' },
  { name: 'Кашемировое дерево', category: 'musk', icon: '🧣' },
  { name: 'Белый кедр', category: 'woody', icon: '🌲' },
  { name: 'Агаровое дерево (Уд)', category: 'woody', icon: '🪵' },
  { name: 'Гаитянский ветивер', category: 'woody', icon: '🌾' },

  // Восточные & Ванильные
  { name: 'Мадагаскарская бурбонская ваниль', category: 'gourmand', icon: '🍦' },
  { name: 'Шелковый белый мускус', category: 'musk', icon: '☁️' },
  { name: 'Золотистый бензоин', category: 'oriental', icon: '🍯' },
  { name: 'Серая амбра (Ambergris)', category: 'oriental', icon: '💎' },
  { name: 'Бобы тонка', category: 'gourmand', icon: '🫘' },
];

export const BRANDS_DIRECTORY = [
  { id: 'aura_florale', name: 'AURA FLORALE Paris', country: 'Франция, Грасс', founded: 2019, specialty: 'Горная лаванда и майская роза' },
  { id: 'maison_soie', name: 'Maison Soie & Pétales', country: 'Франция, Париж', founded: 2016, specialty: 'Шелковые цветочные концентраты' },
  { id: 'atelier_lilas', name: 'Atelier Lilas & Pivoine', country: 'Италия, Тоскана', founded: 2020, specialty: 'Пудровые флористические эликсиры' },
  { id: 'hortus_botanique', name: 'Hortus Botanicus Grasse', country: 'Франция, Лазурный берег', founded: 2017, specialty: 'Ботанические экстракты ручного сбора' },
];

export const FAMILIES_INFO = [
  {
    id: 'floral',
    name: 'Цветочные & Розовые',
    sub: 'Rose & Peony',
    description: 'Нежнейшие лепестки майской розы, белого пиона, магнолии и шелкового жасмина.',
    accent: '#F472B6',
    keyNotes: ['Майская роза', 'Белый пион', 'Жасмин', 'Магнолия'],
  },
  {
    id: 'fresh',
    name: 'Лавандовые & Чистые',
    sub: 'Lavender & Herb',
    description: 'Горная прованская лаванда, прохладный утренний ветерок, цветки фиалки и цитрусовая роса.',
    accent: '#8B5CF6',
    keyNotes: ['Французская лаванда', 'Бергамот', 'Цветок фиалки', 'Белый мускус'],
  },
  {
    id: 'gourmand',
    name: 'Пудровые & Ванильные',
    sub: 'Powder & Vanilla',
    description: 'Воздушная бурбонская ваниль, пудровый флорентийский ирис, миндальное молочко и кашемир.',
    accent: '#EC4899',
    keyNotes: ['Бурбонская ваниль', 'Ирис', 'Миндаль', 'Кашемир'],
  },
  {
    id: 'oriental',
    name: 'Бежево-Амбровые',
    sub: 'Warm & Velvet',
    description: 'Шелковистое прикосновение белой амбры, цветов апельсина, теплого бензоина и сандала.',
    accent: '#D97706',
    keyNotes: ['Белая амбра', 'Флердоранж', 'Сандал', 'Бензоин'],
  },
  {
    id: 'woody',
    name: 'Сандал & Белый Кедр',
    sub: 'Creamy Woody',
    description: 'Сливочный майсурский сандал, белый кедр, тончайшая замша цвета пудры.',
    accent: '#A855F7',
    keyNotes: ['Белый сандал', 'Кедр', 'Светлая замша', 'Ветивер'],
  },
];
