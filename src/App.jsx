import { useState, useEffect, useRef } from 'react'
import {
  MapPin, Clock, Facebook, ChevronDown, ArrowRight,
  Beef, Leaf, FlameKindling, Star, Wheat, Flame,
  UtensilsCrossed, Sandwich, ChefHat, GlassWater, Trophy,
  Sparkles, Menu as MenuIcon, X, ExternalLink,
  Pizza, Salad, Layers,
  Heart, Briefcase, GraduationCap, Cake, Users, Music2, Truck,
} from 'lucide-react'
import './App.css'

/* ─────────────────────────────────── DATA ─────────────────────────────────── */

const menuCategories = [
  {
    id: 'tacos',
    label: 'Tacos',
    Icon: UtensilsCrossed,
    image: '/tacos2.jpg',
    items: [
      { name: 'Carne Asada', desc: 'Street: Onion / Cilantro · Cali: Cheese / Lettuce / Pico / Crema', price: '$3.15 – $3.70', tag: null },
      { name: 'Chicken', desc: 'Street: Onion / Cilantro · Cali: Cheese / Lettuce / Pico / Crema', price: '$3.15 – $3.70', tag: null },
      { name: 'Chorizo', desc: 'Street: Onion / Cilantro · Cali: Cheese / Lettuce / Pico / Crema', price: '$3.15 – $3.70', tag: null },
      { name: 'Adobo', desc: 'Street: Onion / Cilantro · Cali: Cheese / Lettuce / Pico / Crema', price: '$3.15 – $3.70', tag: null },
      { name: 'Birria', desc: 'Street: Onion / Cilantro · Cali: Cheese / Lettuce / Pico / Crema', price: '$3.15 – $3.70', tag: 'Best Seller' },
      { name: 'Barbacoa', desc: 'Street: Onion / Cilantro · Cali: Cheese / Lettuce / Pico / Crema', price: '$3.15 – $3.70', tag: null },
      { name: 'Lengua', desc: 'Cali style: Cheese / Lettuce / Pico / Crema', price: '$3.70', tag: null },
      { name: 'Shrimp', desc: 'Cali style: Cheese / Lettuce / Pico / Crema', price: '$3.70', tag: null },
      { name: 'Surf N Turf Tacos', desc: 'Shrimp / Steak / Chorizo / Cheese / Grilled Onions / Cilantro / Cabbage / Guac / Baja Sauce', price: '$14.18', tag: 'Especial' },
      { name: 'Queso Shrimp Tacos', desc: 'Shrimp / Cheese / Pico / Baja Sauce', price: '$13.65', tag: 'Especial' },
      { name: 'Baja Style', desc: 'Cabbage / Pico / Baja Sauce', price: '$3.76+', tag: null },
      { name: 'Mulita', desc: 'Crisp Corn Tortilla / Protein / Cheese / Onion / Cilantro / Guac', price: '$3.76+', tag: null },
      { name: 'Tacodilla', desc: 'Flour Tortilla / Protein / Cheese / Onion / Cilantro / Baja Sauce', price: '$4.26+', tag: null },
    ],
  },
  {
    id: 'birria',
    label: 'Birria',
    Icon: Flame,
    image: '/birria.jpg',
    items: [
      { name: 'Quesobirrias', desc: 'Guajillo crisp tortilla / Cheese / Protein / Cilantro / Consomé', price: '$13.65', tag: 'Must Try' },
      { name: 'Quesorrito', desc: 'Guajillo crisp burrito / Rice / Beans / Cheese / Onion / Cilantro / Consomé', price: '$13.65', tag: null },
      { name: 'Birria Quesadilla', desc: 'Crisp flour tortillas / Onion / Cilantro / Mozzarella / Grilled Onion / Crema / Guac / Consomé', price: '$14.18', tag: null },
    ],
  },
  {
    id: 'pizza',
    label: 'Pizza',
    Icon: Pizza,
    image: '/platos/Pizza.jpg',
    items: [
      { name: 'Asada Pizza', desc: 'Steak / Tomato Sauce / Mozzarella / Pico / Guac / Crema', price: '$13.65', tag: null },
      { name: 'Meat Lovers', desc: 'Steak / Shrimp / Chorizo / Adobo Pork / Tomato Sauce / Mozzarella / Baja Sauce', price: '$14.70', tag: 'Signature' },
      { name: 'Shrimp Oregano', desc: 'Shrimp / Tomato Sauce / Pico / Baja Sauce / Mozzarella / Oregano', price: '$13.65', tag: null },
      { name: 'Tenn-Mex', desc: 'Pepperoni / Chorizo / Bacon Bits / Tomato Sauce / Mozzarella / Hot Honey', price: '$13.65', tag: 'Local Fav' },
    ],
  },
  {
    id: 'quesadillas',
    label: 'Quesadillas',
    Icon: ChefHat,
    image: '/quesadilla.jpg',
    items: [
      { name: 'Street Quesadilla', desc: 'Protein / Cheese / Onion / Cilantro / Lettuce / Pico / Guac / Crema', price: '$11.55', tag: null },
      { name: 'Only Cheese', desc: 'Just the good stuff — add Protein +$5', price: '$6.30', tag: null },
      { name: 'Monster Quesadilla', desc: 'Steak / Shrimp / Chicken / Chorizo / Cheese / Rice / Beans / Baja Sauce', price: '$14.70', tag: 'Fan Fav' },
      { name: 'Jalisco Style', desc: 'Steak / Chicken / Chorizo upgrade', price: '+$2', tag: null },
    ],
  },
  {
    id: 'burritos',
    label: 'Burritos',
    Icon: Sandwich,
    image: '/burrito.jpg',
    items: [
      { name: 'Cali Burrito', desc: 'Protein / Rice / Beans / Cheese / Lettuce / Pico / Guac / Crema', price: '$10.50', tag: null },
      { name: 'OG California', desc: 'Rice / Beans / Steak / Fries / Pico / Guac / Crema', price: '$12.60', tag: 'Signature' },
      { name: 'Surf N Turf Burrito', desc: 'Rice / Steak / Chorizo / Cheese / Onion / Cilantro / Pico / Guac / Crema / Baja Sauce', price: '$13.65', tag: null },
      { name: 'Baja Burrito', desc: 'Shrimp / Cheese / Rice / Cabbage / Pico / Crema', price: '$12.60', tag: null },
      { name: 'Jalisco Style', desc: 'Steak / Chicken / Chorizo upgrade', price: '+$2', tag: null },
    ],
  },
  {
    id: 'bowls',
    label: 'Bowls',
    Icon: Salad,
    image: '/bowl.jpg',
    items: [
      { name: 'The Basic Bowl', desc: 'Protein / Rice / Queso', price: '$10.50', tag: null },
      { name: 'Cali Bowl', desc: 'Protein / Rice / Queso / Pico / Guac', price: '$12.60', tag: null },
      { name: 'Taco Salad Bowl', desc: 'Fried Bowl / Protein / Rice / Beans / Cheese / Lettuce / Pico / Avocado Sauce / Crema', price: '$12.60', tag: 'Fan Fav' },
      { name: 'Baja Bowl', desc: 'Fried Bowl / Rice / Shrimp / Fried Onion / Cheese / Avocado Slices / Baja Sauce', price: '$12.60', tag: null },
    ],
  },
  {
    id: 'fries',
    label: 'Fries',
    Icon: Layers,
    image: '/fries.jpg',
    items: [
      { name: 'Carne Asada Fries', desc: 'Fries / Steak / Cheese / Pico / Crema / Guac', price: '$12.60', tag: null },
      { name: 'Surf N Turf Fries', desc: 'Fries / Steak / Shrimp / Chorizo / Cheese / Onion / Cilantro / Crema / Baja Sauce / Avocado Slices', price: '$13.65', tag: 'Signature' },
      { name: 'Garlic Parm Fries', desc: 'Fries / Chicken / Shrimp / Bacon Bits / Queso / Garlic Aioli / Parmesan', price: '$13.65', tag: null },
      { name: 'Dirty Chicken Fries', desc: 'Fries / Chicken / Queso / Baja Sauce / Crema / Bacon Bits / Jalapeños', price: '$12.60', tag: null },
      { name: 'Jalisco Style', desc: 'Steak / Chicken / Chorizo upgrade', price: '+$2', tag: null },
    ],
  },
  {
    id: 'tortas',
    label: 'Tortas',
    Icon: Beef,
    image: '/torta.jpg',
    items: [
      { name: 'Cali Cheese Steak', desc: 'Telera Bread / Beans / Steak / Cheese / Fried Onion / Guac', price: '$12.00', tag: null },
      { name: 'Street Torta', desc: 'Telera Bread / Protein / Beans / Pico / Cheese / Guac / Lettuce / Crema', price: '$12.60', tag: null },
      { name: 'Jalisco Style', desc: 'Steak / Chicken / Chorizo upgrade', price: '+$2', tag: null },
    ],
  },
  {
    id: 'nachos',
    label: 'Nachos',
    Icon: Sparkles,
    image: '/nachos.jpg',
    items: [
      { name: 'Cali Nachos', desc: 'Protein / Rice / Beans / Queso / Pico / Crema', price: '$12.60', tag: null },
      { name: 'Jalisco Style', desc: 'Steak / Chicken / Chorizo upgrade', price: '+$2', tag: null },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    Icon: Star,
    image: '/sides.jpg',
    items: [
      { name: 'Rice', desc: 'Mexican-style seasoned rice', price: '$3.15', tag: null },
      { name: 'Beans', desc: 'Slow-simmered seasoned beans', price: '$3.15', tag: null },
      { name: 'Fried Onions', desc: 'Crispy golden fried onions', price: '$2.00', tag: null },
      { name: 'Cheesy Rice', desc: 'Rice smothered in melted cheese', price: '$3.15', tag: null },
      { name: 'Fries', desc: 'Classic crispy fries', price: '$3.15', tag: null },
      { name: 'Dirty Fries', desc: 'Fries / Queso / Bacon / Baja Sauce / Crema', price: '$6.30', tag: 'Fan Fav' },
    ],
  },
]

const qualities = [
  { Icon: Beef,          title: 'Carnes Premium',      desc: 'USDA Choice cuts, hand-trimmed and marinated overnight. Our birria braises for 12+ hours every single day.' },
  { Icon: Leaf,          title: 'Hierbas Frescas',     desc: 'Cilantro, epazote and every herb sourced fresh daily. No dried shortcuts — ever.' },
  { Icon: FlameKindling, title: 'Salsas Artesanales',  desc: 'Fire-roasted and made from scratch every morning. No jarred sauces allowed on this truck.' },
  { Icon: Star,          title: 'Quesos Importados',   desc: 'Oaxacan quesillo, cotija, panela — authentic Mexican creameries for the real flavor of Jalisco.' },
  { Icon: Wheat,         title: 'Tortillas de Maíz',   desc: 'Hand-pressed masa tortillas made to order with non-GMO corn. You will taste the difference.' },
  { Icon: Flame,         title: 'Chiles Auténticos',   desc: 'Guajillo, ancho, árbol, morita — real Mexican chiles toasted and ground in-house daily.' },
]

const hours = [
  { day: 'Lunes',     time: '11:00 AM – 9:00 PM' },
  { day: 'Martes',    time: '11:00 AM – 9:00 PM' },
  { day: 'Miércoles', time: '11:00 AM – 9:00 PM' },
  { day: 'Jueves',    time: '11:00 AM – 9:00 PM' },
  { day: 'Viernes',   time: '11:00 AM – 10:00 PM' },
  { day: 'Sábado',    time: '10:00 AM – 10:00 PM' },
  { day: 'Domingo',   time: '10:00 AM – 8:00 PM' },
]

/* Photo strip — auto-scroll banner between Stats and Menu */
const stripPhotos = [
  '/platos/490404078_1017092037066806_1858708385693310366_n.jpg',
  '/platos/497998569_1040384711404205_3973922453911310144_n.jpg',
  '/platos/510519843_1065706928871983_3766593058615681921_n.jpg',
  '/platos/540840675_1121227129986629_7759649515608580244_n.jpg',
  '/platos/541429098_1121227086653300_7102855027501619045_n.jpg',
  '/platos/tacos.jpg',
  '/platos/tacos3.jpg',
  '/platos/556288547_1142934761149199_4934172113736430976_n.jpg',
  '/platos/558847577_1148012900641385_3455552489018663095_n.jpg',
  '/platos/fish%20tacos.jpg',
  '/platos/625977225_1237897761652898_5481449914208638856_n.jpg',
  '/platos/634424328_1251884686920872_365800804817259266_n.jpg',
  '/platos/634831525_1251884750254199_5372945971880681796_n.jpg',
  '/platos/636851891_1251884626920878_8684798062009883049_n.jpg',
  '/platos/637151210_1251884693587538_3798225634366397060_n.jpg',
  '/platos/638541360_1251884630254211_8865505946667913032_n.jpg',
  '/platos%202/481706382_992139792895364_4246540366116021235_n.jpg',
  '/platos%202/485766901_999754718800538_4577626954209206564_n.jpg',
  '/platos%202/486379358_1002338201875523_4160361520267368231_n.jpg',
  '/nachos.jpg',
]

/* Gallery — masonry grid of real food photos */
const galleryPhotos = [
  '/platos/tacos2.jpg',
  '/platos/tacos3.jpg',
  '/platos/Pizza.jpg',
  '/platos/tacos.jpg',
  '/platos/fish%20tacos.jpg',
  '/platos/burrito.jpg',
  '/platos/3%20platos.jpg',
  '/platos/postre.jpg',
  '/platos/pizza2.jpg',
  '/platos/Tacos%20or%20burritos.jpg',
  '/platos/postre2.jpg',
  '/platos/cinnamon%20rolls.jpg',
  '/platos/desayuno.jpg',
  '/platos/552910526_1138203494955659_6539149764488120952_n.jpg',
  '/platos/561794658_1156754203100588_3253889954766667126_n.jpg',
  '/platos/591163762_1190394266403248_4965598962446868990_n.jpg',
  '/platos%202/481706382_992139792895364_4246540366116021235_n.jpg',
  '/platos%202/485766901_999754718800538_4577626954209206564_n.jpg',
  '/platos%202/486379358_1002338201875523_4160361520267368231_n.jpg',
  '/nachos.jpg',
]

/* ─── Pizza Mondays ─── */
const pizzas = [
  {
    name: 'Meat Lovers',
    desc: 'Tomato Sauce · Mozzarella · Cheddar · Steak · Chorizo · Adobo Pork · Shrimp · Baja Sauce',
    image: '/pizza/Meat%20lovers%20pizza%20tomatoe%20sauce%20%E2%80%A2%20mozzarella%20%E2%80%A2%20cheddar%20%E2%80%A2%20steak%20%E2%80%A2%20chorizo%20%E2%80%A2%20adobo%20pork%20%E2%80%A2%20shrimp%20%E2%80%A2%20baja%20sauce.jpg',
    tag: 'Signature',
    featured: true,
  },
  {
    name: 'Carne Asada',
    desc: null,
    image: '/pizza/carne%20asada%20pizza.jpg',
    tag: null,
  },
  {
    name: 'Shrimp Oregano',
    desc: null,
    image: '/pizza/Shrimp%20oregano%20pizza.jpg',
    tag: null,
  },
  {
    name: null,
    desc: null,
    image: '/pizza/484374182_996585365784140_8967855717503481455_n.jpg',
    tag: null,
  },
  {
    name: null,
    desc: null,
    image: '/pizza/484853615_997480455694631_2703351910269601908_n.jpg',
    tag: null,
  },
  {
    name: null,
    desc: null,
    image: '/pizza/637468476_1248705243905483_3211869144838996399_n.jpg',
    tag: 'Fan Fav',
  },
  {
    name: null,
    desc: null,
    image: '/pizza/482085225_991087016333975_2755275291232579309_n%20(1).jpg',
    tag: null,
  },
]

/* ─────────────────────────────── COMPONENTS ───────────────────────────────── */

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#menu',      label: 'Menú' },
    { href: '#pizzas',    label: '🍕 $10 Pizza Mondays' },
    { href: '#catering',  label: 'Catering' },
    { href: '#resenas',   label: 'Reseñas' },
    { href: '#galeria',   label: 'Galería' },
    { href: '#nosotros',  label: 'Nosotros' },
    { href: '#ubicacion', label: 'Ubicación' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0D2020]/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img src="/favicon-32x32.png" alt="Logo" className="w-9 h-9 rounded-lg" />
          <div className="leading-none">
            <p className="font-['Playfair_Display'] text-white font-black text-lg tracking-wide">Tacos Mi Jalisco</p>
            <p className="text-[#3DBFBF] text-[10px] font-['Poppins'] font-semibold tracking-[0.2em] uppercase">Cali-Style Mexican Eats</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-[#3DBFBF] font-['Poppins'] text-sm font-medium transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a
            href="https://tacosmijalisco.cloveronline.com/menu/all"
            target="_blank" rel="noopener noreferrer"
            className="bg-[#3DBFBF] hover:bg-[#2EAEAE] text-white font-['Poppins'] font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#3DBFBF]/40 hover:-translate-y-0.5"
          >
            Ordenar Ahora
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#0D2020]/98 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 hover:text-[#3DBFBF] font-['Poppins'] text-sm font-medium py-2 border-b border-white/5">
              {l.label}
            </a>
          ))}
          <a href="https://tacosmijalisco.cloveronline.com/menu/all" target="_blank" rel="noopener noreferrer" className="bg-[#3DBFBF] text-white font-['Poppins'] font-semibold text-sm px-5 py-3 rounded-lg text-center">
            Ordenar Ahora
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Banner background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/banner.jpg)' }} />
      {/* Cinematic gradient — dark left for text legibility, photo bleeds on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050F0F]/95 via-[#0D2020]/75 to-[#0D2020]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050F0F] via-transparent to-[#050F0F]/40" />

      {/* Single food photo — desktop only, raw and editorial */}
      <div className="hidden lg:block absolute right-14 xl:right-32 top-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="w-72 h-96 xl:w-80 xl:h-[440px] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)] border border-white/10">
            <img src="/platos/tacos2.jpg" alt="Tacos" className="w-full h-full object-cover scale-105" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 -left-5 w-44 h-44 rounded-xl overflow-hidden shadow-2xl border border-white/10 rotate-3">
            <img src="/platos/burrito.jpg" alt="Burrito" className="w-full h-full object-cover" loading="eager" />
          </div>
          <div className="absolute -top-4 -right-4 w-36 h-36 rounded-xl overflow-hidden shadow-2xl border border-white/10 -rotate-2">
            <img src="/platos/Pizza.jpg" alt="Pizza" className="w-full h-full object-cover" loading="eager" />
          </div>
        </div>
      </div>

      {/* Content — bottom anchored for cinematic feel */}
      <div className="relative z-10 px-6 pt-36 pb-20 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <img src="/android-chrome-192x192.png" alt="Logo"
              className="w-14 h-14 rounded-xl border border-white/15 shadow-xl" />
            <div>
              <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em]">Portland, Tennessee</p>
              <p className="font-['Poppins'] text-white/40 text-xs tracking-wider">Est. 2009 · Cali-Style Mexican Eats</p>
            </div>
          </div>

          <h1 className="font-['Playfair_Display'] font-black text-white leading-[0.88] mb-8">
            <span className="block" style={{ fontSize: 'clamp(68px, 11vw, 140px)' }}>Tacos</span>
            <span className="block text-[#3DBFBF] italic" style={{ fontSize: 'clamp(40px, 7vw, 90px)' }}>Mi Jalisco</span>
          </h1>

          <p className="font-['Poppins'] text-white/55 text-base sm:text-lg max-w-lg leading-relaxed mb-10 pl-5 border-l-[3px] border-[#3DBFBF]/60">
            Carnes premium, salsas hechas desde cero cada mañana,
            tortillas prensadas a mano. La cocina real de Jalisco
            en el corazón de Tennessee.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://tacosmijalisco.cloveronline.com/menu/all"
              target="_blank" rel="noopener noreferrer"
              className="group bg-[#3DBFBF] hover:bg-[#2EAEAE] text-white font-['Poppins'] font-bold text-sm px-7 py-3.5 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#3DBFBF]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Ordenar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a href="#menu"
              className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-['Poppins'] font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              Ver Menú
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="bg-[#050F0F] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
          {[
            { num: '100%', text: 'Ingredientes frescos traídos cada mañana' },
            { num: '12h+', text: 'Birria braseada lento, todos los días' },
            { num: '2009', text: 'Sirviendo Portland, Tennessee' },
            { num: '110+', text: 'Reseñas de 5 estrellas en Google' },
          ].map((s, i) => (
            <div key={i} className="py-8 px-6 md:px-10 first:pl-0 last:pr-0">
              <p className="font-['Playfair_Display'] font-black text-[#3DBFBF] text-4xl md:text-5xl leading-none mb-2">{s.num}</p>
              <p className="font-['Poppins'] text-white/35 text-xs leading-snug">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Auto-scrolling photo strip */
function PhotoStrip() {
  const doubled = [...stripPhotos, ...stripPhotos]
  return (
    <div className="bg-[#071414] py-5 overflow-hidden">
      <div className="flex gap-3 animate-strip" style={{ width: 'max-content' }}>
        {doubled.map((src, i) => (
          <div key={i} className="w-28 h-24 md:w-36 md:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
            <img src={src} alt="" className="w-full h-full object-cover opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-500" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Menu() {
  const [active, setActive] = useState('tacos')
  const cat = menuCategories.find((c) => c.id === active)

  return (
    <section id="menu" className="bg-[#F0FAFA] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header — editorial split layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Lo Mejor de Jalisco</p>
            <h2 className="font-['Playfair_Display'] font-black text-[#0D2020] leading-none" style={{ fontSize: 'clamp(42px, 6vw, 72px)' }}>
              Nuestro<br /><span className="text-[#3DBFBF] italic">Menú</span>
            </h2>
          </div>
          <p className="font-['Poppins'] text-[#0D2020]/50 text-sm leading-relaxed max-w-xs">
            Ingredientes premium cada mañana.<br />Sin atajos. Sin conservadores.
          </p>
        </div>

        {/* Category tabs — horizontally scrollable on mobile */}
        <div className="overflow-x-auto pb-3 -mx-4 px-4 mb-8">
          <div className="flex gap-2 w-max mx-auto md:flex-wrap md:w-auto md:justify-center">
            {menuCategories.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={`font-['Poppins'] font-semibold text-sm px-4 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  active === c.id
                    ? 'bg-[#3DBFBF] text-white shadow-lg shadow-[#3DBFBF]/30 scale-105'
                    : 'bg-white text-[#0D2020]/70 hover:bg-[#3DBFBF]/10 hover:text-[#3DBFBF] border border-[#0D2020]/10'
                }`}
              >
                <c.Icon className="w-4 h-4" strokeWidth={2} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category banner image */}
        {cat.image && (
          <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden mb-10 shadow-2xl">
            <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D2020]/85 via-[#0D2020]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2020]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-[#3DBFBF] flex items-center justify-center">
                  <cat.Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-['Playfair_Display'] text-white font-black text-3xl md:text-4xl">{cat.label}</h3>
              </div>
              <p className="font-['Poppins'] text-white/55 text-sm ml-[52px]">{cat.items.length} opciones disponibles</p>
            </div>
          </div>
        )}

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cat.items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#0D2020]/5 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3DBFBF] to-[#7DEDEC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              {item.tag && (
                <span className="inline-block bg-[#3DBFBF]/15 text-[#2AADAD] text-[10px] font-['Poppins'] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>
              )}
              <h3 className="font-['Playfair_Display'] font-bold text-[#0D2020] text-lg leading-snug mb-2">{item.name}</h3>
              <p className="font-['Poppins'] text-[#0D2020]/55 text-sm leading-relaxed">{item.desc}</p>
              <div className="mt-4 pt-4 border-t border-[#0D2020]/8 flex items-center justify-between">
                <span className="font-['Playfair_Display'] font-black text-[#3DBFBF] text-xl">{item.price}</span>
                <a href="https://tacosmijalisco.cloveronline.com/menu/all" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-['Poppins'] font-semibold text-[#3DBFBF] hover:text-[#2EAEAE] transition-colors">
                  Ordenar <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PizzaMondays() {
  return (
    <section id="pizzas" className="bg-[#060F0F] py-24 px-4 overflow-hidden relative">
      {/* Background accent glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#F5C542]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3DBFBF]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F5C542]/10 border border-[#F5C542]/25 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse" />
              <p className="font-['Poppins'] text-[#F5C542] text-[11px] font-bold uppercase tracking-[0.3em]">Every Monday</p>
            </div>
            <div className="flex items-end gap-5 flex-wrap">
              <h2 className="font-['Playfair_Display'] font-black text-white leading-none" style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>
                Pizza<br /><span className="text-[#3DBFBF] italic">Mondays</span>
              </h2>
              <div className="mb-2 md:mb-4 flex flex-col items-start">
                <div className="bg-[#F5C542] rounded-2xl px-5 py-2 shadow-2xl shadow-[#F5C542]/30 rotate-[-2deg]">
                  <span className="font-['Playfair_Display'] font-black text-[#060F0F] leading-none" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>$10</span>
                </div>
                <p className="font-['Poppins'] text-[#F5C542]/70 text-[10px] font-bold uppercase tracking-widest mt-1.5 ml-1">Every Monday</p>
              </div>
            </div>
            <p className="font-['Poppins'] text-white/40 text-sm mt-4 max-w-sm">
              Todas las pizzas. Cada lunes. <span className="text-[#F5C542] font-semibold">$10</span>.
            </p>
          </div>
          <a
            href="https://tacosmijalisco.cloveronline.com/menu/all"
            target="_blank" rel="noopener noreferrer"
            className="self-start md:self-end inline-flex items-center gap-2 bg-[#F5C542] hover:bg-[#f0bb30] text-[#060F0F] font-['Poppins'] font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#F5C542]/30 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Ordenar ahora <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {/* Featured card — Meat Lovers 2×2 */}
          <div className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}>
            <img
              src={pizzas[0].image}
              alt={pizzas[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.closest('div').style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3DBFBF]/0 to-[#3DBFBF]/0 group-hover:to-[#3DBFBF]/15 transition-all duration-500" />
            {/* Ring glow on hover */}
            <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-[#F5C542]/60 transition-all duration-300" />
            <div className="absolute top-4 left-4">
              <span className="bg-[#F5C542] text-[#060F0F] text-[10px] font-['Poppins'] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">Signature</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <h3 className="font-['Playfair_Display'] font-black text-white text-2xl md:text-4xl mb-1 md:mb-2 leading-tight">Meat Lovers</h3>
              <p className="font-['Poppins'] text-white/55 text-xs md:text-sm leading-relaxed max-w-sm">
                Steak · Chorizo · Adobo Pork · Shrimp<br className="hidden md:block" />
                Mozzarella · Cheddar · Baja Sauce
              </p>
              <div className="flex items-center gap-2 mt-3 md:mt-4">
                <span className="font-['Playfair_Display'] font-black text-[#F5C542] text-2xl md:text-3xl">$10</span>
                <span className="font-['Poppins'] text-white/30 text-xs">· every monday</span>
              </div>
            </div>
          </div>

          {/* Small cards */}
          {pizzas.slice(1).map((pizza, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { e.target.closest('div').style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-[#F5C542]/50 transition-all duration-300" />
              {pizza.tag && (
                <div className="absolute top-3 left-3">
                  <span className="bg-[#3DBFBF] text-white text-[9px] font-['Poppins'] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow">{pizza.tag}</span>
                </div>
              )}
              {/* Ingredient reveal on hover — only if name or desc exists */}
              {(pizza.name || pizza.desc) && (
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  {pizza.desc && <p className="font-['Poppins'] text-white/85 text-[11px] text-center leading-relaxed">{pizza.desc}</p>}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 group-hover:opacity-0 transition-opacity duration-200">
                {pizza.name && <h3 className="font-['Playfair_Display'] font-bold text-white text-base leading-tight">{pizza.name}</h3>}
                <span className="font-['Playfair_Display'] font-black text-[#F5C542] text-sm">$10</span>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="col-span-2 rounded-2xl border border-[#F5C542]/20 bg-[#F5C542]/5 flex flex-col md:flex-row items-center justify-between gap-4 p-6 md:p-8">
            <div>
              <p className="font-['Poppins'] text-[#F5C542] text-xs font-bold uppercase tracking-widest mb-2">$10 every monday</p>
              <p className="font-['Playfair_Display'] text-white font-black text-xl md:text-2xl leading-snug">
                El lunes es el mejor<br />
                <span className="text-[#F5C542]">día de la semana.</span>
              </p>
            </div>
            <a
              href="https://tacosmijalisco.cloveronline.com/menu/all"
              target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F5C542] hover:bg-[#f0bb30] text-[#060F0F] font-['Poppins'] font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#F5C542]/30"
            >
              Ordenar Pizza <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

function Quality() {
  return (
    <section id="calidad" className="bg-[#0D2020] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header — left-aligned, raw */}
        <div className="mb-16 max-w-2xl">
          <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em] mb-4">Nuestra Filosofía</p>
          <h2 className="font-['Playfair_Display'] font-black text-white leading-[0.9]" style={{ fontSize: 'clamp(40px, 6vw, 68px)' }}>
            Sin atajos.<br />
            <span className="text-[#3DBFBF] italic">Nunca.</span>
          </h2>
          <div className="w-12 h-px bg-[#3DBFBF]/60 mt-6" />
        </div>
        {/* Feature cards large (first 2) + 4 smaller below */}
        {(() => {
          const [q0, q1] = qualities
          const Icon0 = q0.Icon
          const Icon1 = q1.Icon
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#3DBFBF]/50 rounded-2xl p-9 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#3DBFBF]/15 flex items-center justify-center mb-6">
                  <Icon0 className="w-7 h-7 text-[#3DBFBF]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-white text-2xl mb-3">{q0.title}</h3>
                <p className="font-['Poppins'] text-white/50 text-sm leading-relaxed">{q0.desc}</p>
              </div>
              <div className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#3DBFBF]/50 rounded-2xl p-9 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#3DBFBF]/15 flex items-center justify-center mb-6">
                  <Icon1 className="w-7 h-7 text-[#3DBFBF]" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-white text-2xl mb-3">{q1.title}</h3>
                <p className="font-['Poppins'] text-white/50 text-sm leading-relaxed">{q1.desc}</p>
              </div>
            </div>
          )
        })()}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualities.slice(2).map((q, i) => (
            <div key={i} className="group bg-white/3 hover:bg-white/7 border border-white/8 hover:border-[#3DBFBF]/35 rounded-2xl p-6 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#3DBFBF]/12 flex items-center justify-center mb-4">
                <q.Icon className="w-5 h-5 text-[#3DBFBF]" strokeWidth={1.5} />
              </div>
              <h3 className="font-['Playfair_Display'] font-bold text-white text-lg mb-2">{q.title}</h3>
              <p className="font-['Poppins'] text-white/45 text-xs leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Food Gallery ─── */
function Reviews() {
  const ref = useRef(null)

  useEffect(() => {
    const SCRIPT_SRC = 'https://widget.tagembed.com/embed.min.js'
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      // Script already in DOM — wait for it or call directly
      if (window.tagembed) {
        window.tagembed()
      } else {
        existing.addEventListener('load', () => window.tagembed && window.tagembed())
      }
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.type = 'text/javascript'
    script.async = true
    script.onload = () => { if (window.tagembed) window.tagembed() }
    document.body.appendChild(script)
  }, [])

  return (
    <section id="resenas" className="bg-[#0D2020] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em] mb-4">Lo que dicen nuestros clientes</p>
            <h2 className="font-['Playfair_Display'] font-black text-white leading-none" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
              Reseñas<br /><span className="text-[#3DBFBF] italic">Reales</span>
            </h2>
          </div>
          <p className="font-['Poppins'] text-white/35 text-xs max-w-xs">
            La opinión honesta de quienes ya nos visitaron habla por sí sola.
          </p>
        </div>

        {/* Widget wrapper */}
        <div
          ref={ref}
          className="rounded-3xl overflow-hidden border border-white/8 shadow-2xl"
          style={{ background: 'transparent' }}
        >
          {/* Inject CSS to override widget styles to match brand */}
          <style>{`
            .tagembed-widget,
            .tagembed-widget *,
            [data-widget-id="318063"],
            [data-widget-id="318063"] * {
              --widget-bg: transparent !important;
              --card-bg: rgba(255,255,255,0.04) !important;
            }
            .tagembed-container { background: transparent !important; }
          `}</style>
          <div
            className="tagembed-widget"
            style={{ width: '100%', height: '100%', overflow: 'auto' }}
            data-widget-id="318063"
            data-website="1"
          />
        </div>
      </div>
    </section>
  )
}

function GalleryImage({ src }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error) return null

  return (
    <div className="break-inside-avoid mb-3 group relative overflow-hidden rounded-xl cursor-pointer bg-white/5">
      {!loaded && (
        <div className="w-full aspect-[4/3] rounded-xl bg-white/5 animate-pulse" />
      )}
      <img
        src={src}
        alt=""
        className={`w-full block rounded-xl object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

function FoodGallery() {
  return (
    <section id="galeria" className="bg-[#071414] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Fotos Reales</p>
            <h2 className="font-['Playfair_Display'] font-black text-white leading-none" style={{ fontSize: 'clamp(38px, 5.5vw, 64px)' }}>
              Así se ve<br /><span className="text-[#3DBFBF] italic">la pasión</span>
            </h2>
          </div>
          <a href="https://www.facebook.com/TacosMiJaliscoTruck" target="_blank" rel="noopener noreferrer"
            className="self-start md:self-end flex items-center gap-2 text-white/40 hover:text-[#3DBFBF] font-['Poppins'] text-xs font-semibold uppercase tracking-wider transition-colors duration-200">
            <Facebook className="w-3.5 h-3.5" /> Ver más en Facebook
          </a>
        </div>

        {/* Masonry grid using CSS columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-gap:12px]">
          {galleryPhotos.map((src, i) => (
            <GalleryImage key={i} src={src} />
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="nosotros" className="bg-[#F0FAFA] py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <div className="relative order-2 lg:order-1 pb-8 pr-0 lg:pr-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img src="/platos/platos.jpg" alt="Platos de Tacos Mi Jalisco" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2020]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-['Poppins'] text-[#3DBFBF] text-xs font-bold uppercase tracking-widest mb-2">Portland, Tennessee</p>
              <p className="font-['Playfair_Display'] text-white font-black text-2xl leading-snug">
                "El sabor de Jalisco,<br />en el corazón de Tennessee."
              </p>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-6 -right-2 lg:-right-6 bg-[#3DBFBF] rounded-2xl p-5 shadow-2xl shadow-[#3DBFBF]/50 text-center">
            <img src="/favicon-32x32.png" alt="logo" className="w-8 h-8 mx-auto" />
            <p className="font-['Poppins'] text-white text-xs font-semibold mt-1">Est.<br />2009</p>
          </div>

          {/* Flag strip */}
          <div className="absolute -bottom-1 left-8 right-8 h-1.5 rounded-full bg-gradient-to-r from-[#006847] via-white to-[#3DBFBF]" />
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em] mb-4">Nuestra Historia</p>
          <h2 className="font-['Playfair_Display'] font-black text-[#0D2020] leading-[0.9]" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            Jalisco en cada <span className="text-[#3DBFBF] italic">mordida</span>
          </h2>
          <div className="w-10 h-px bg-[#3DBFBF]/60 mt-5" />

          <p className="font-['Poppins'] text-[#0D2020]/65 text-base leading-relaxed mt-7">
            Tacos Mi Jalisco Truck nació de una pasión profunda por la cocina tradicional del estado de Jalisco,
            México — tierra del tequila, el mariachi y los tacos más sabrosos del mundo.
          </p>
          <p className="font-['Poppins'] text-[#0D2020]/65 text-base leading-relaxed mt-4">
            Trajimos esas recetas auténticas a{' '}
            <span className="font-semibold text-[#0D2020]">Portland, Tennessee</span>, con un compromiso
            inquebrantable: usar solo los mejores ingredientes disponibles. Nuestras carnes se marinan por horas,
            nuestras salsas se hacen desde cero cada mañana y nuestras tortillas se prensan a mano.
          </p>
          <p className="font-['Poppins'] text-[#0D2020]/65 text-base leading-relaxed mt-4">
            No es solo comida — es una{' '}
            <span className="font-semibold text-[#3DBFBF]">experiencia gastronómica</span> que te transporta
            directo a las calles de Guadalajara.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {['Recetas Tradicionales', 'Carnes Premium', 'Salsas Artesanales', 'Est. 2009'].map((t, i) => (
              <span key={i} className="bg-[#3DBFBF]/10 text-[#2AADAD] font-['Poppins'] text-xs font-semibold px-4 py-2 rounded-full border border-[#3DBFBF]/20">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Location() {
  const todayIndex = new Date().getDay()
  const adjustedIndex = (todayIndex + 6) % 7
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section id="ubicacion" className="bg-[#0D2020] py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(61,191,191,0.08)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em] mb-3">Encuéntranos</p>
            <h2 className="font-['Playfair_Display'] font-black text-white leading-none" style={{ fontSize: 'clamp(38px, 5.5vw, 68px)' }}>
              Ubicación &<br /><span className="text-[#3DBFBF] italic">Horarios</span>
            </h2>
          </div>
          <p className="font-['Poppins'] text-white/35 text-xs">461 N Broadway · Portland, TN</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-80 lg:h-auto min-h-[300px] relative">
            {!mapLoaded && (
              <div className="absolute inset-0 bg-[#0D2020] flex flex-col items-center justify-center gap-3 z-10">
                <svg className="w-8 h-8 text-[#3DBFBF] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="font-['Poppins'] text-[#3DBFBF] text-sm font-semibold tracking-wide">Cargando mapa...</p>
              </div>
            )}
            <iframe
              title="Tacos Mi Jalisco Truck Location"
              src="https://maps.google.com/maps?q=461+N+Broadway,+Portland,+TN&output=embed"
              width="100%" height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
            />
          </div>

          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#3DBFBF] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-['Poppins'] text-[#3DBFBF] text-xs font-bold uppercase tracking-wider mb-1">Dirección</p>
                  <p className="font-['Playfair_Display'] text-white font-bold text-lg">461 N Broadway</p>
                  <p className="font-['Poppins'] text-white/60 text-sm">Portland, TN · United States, Tennessee</p>
                  <a href="https://maps.google.com/?q=461+N+Broadway,+Portland,+TN" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-['Poppins'] font-semibold text-[#3DBFBF] hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#27AE60] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <p className="font-['Poppins'] text-[#3DBFBF] text-xs font-bold uppercase tracking-wider">Horario de Atención</p>
              </div>
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className={`flex justify-between items-center py-2 border-b border-white/5 last:border-0 ${i === adjustedIndex ? 'text-[#3DBFBF]' : 'text-white/70'}`}>
                    <span className={`font-['Poppins'] text-sm font-medium ${i === adjustedIndex ? 'font-bold' : ''}`}>
                      {h.day}
                      {i === adjustedIndex && (
                        <span className="ml-2 bg-[#27AE60] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Hoy</span>
                      )}
                    </span>
                    <span className="font-['Poppins'] text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <a href="https://www.facebook.com/TacosMiJaliscoTruck" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#1877F2]/20 border border-[#1877F2]/40 hover:bg-[#1877F2]/30 rounded-2xl p-5 transition-all duration-200 group">
              <div className="bg-[#1877F2] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Facebook className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="font-['Poppins'] text-white font-semibold text-sm">Síguenos en Facebook</p>
                <p className="font-['Poppins'] text-white/50 text-xs mt-0.5">@TacosMiJaliscoTruck — Especiales & Novedades</p>
              </div>
              <span className="ml-auto text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Catering() {
  const events = [
    { Icon: Music2,       label: 'Quinceañeras' },
    { Icon: Heart,        label: 'Bodas' },
    { Icon: Briefcase,    label: 'Eventos Corporativos' },
    { Icon: GraduationCap, label: 'Graduaciones' },
    { Icon: Cake,         label: 'Cumpleaños' },
    { Icon: Users,        label: 'Eventos Privados' },
  ]

  return (
    <section id="catering" className="relative bg-[#050F0F] overflow-hidden">

      {/* ── HERO STRIP ── */}
      <div className="relative h-[60vh] min-h-[420px] max-h-[640px]">
        <img
          src="/foodtruck%20originall.jpg"
          alt="Tacos Mi Jalisco Catering"
          className="w-full h-full object-cover"
        />
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#050F0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050F0F]/80 via-transparent to-transparent" />

        {/* Floating headline over image */}
        <div className="absolute inset-0 flex items-center px-4">
          <div className="max-w-7xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 bg-[#3DBFBF]/15 border border-[#3DBFBF]/30 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DBFBF] animate-pulse" />
              <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.35em]">Catering &amp; Eventos</p>
            </div>
            <h2 className="font-['Playfair_Display'] font-black text-white leading-[0.88]" style={{ fontSize: 'clamp(52px, 9vw, 110px)' }}>
              We Come<br />
              <span className="text-[#3DBFBF] italic">To You.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-4 pt-0 pb-28">
        <div className="max-w-7xl mx-auto">

          {/* Split row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">

            {/* Left — proposition */}
            <div>
              <p className="font-['Playfair_Display'] text-white/90 font-bold text-xl md:text-2xl leading-snug mb-6">
                Tacos Mi Jalisco lleva el sabor de Jalisco directo a tu evento.
                Auténtico, fresco, sin rodeos.
              </p>
              <p className="font-['Poppins'] text-white/40 text-sm leading-relaxed mb-8">
                Desde quinceañeras hasta eventos corporativos — traemos el truck, el equipo y el menú completo.
                Tú solo disfruta. Nosotros cocinamos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.facebook.com/TacosMiJaliscoTruck"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#3DBFBF] hover:bg-[#2EAEAE] text-white font-['Poppins'] font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-[#3DBFBF]/30 hover:-translate-y-0.5"
                >
                  Contáctanos <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-[#3DBFBF]/50 text-white/60 hover:text-[#3DBFBF] font-['Poppins'] font-medium text-sm px-7 py-3.5 rounded-xl transition-all duration-200"
                >
                  Llamar ahora
                </a>
              </div>
            </div>

            {/* Right — trust stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '15+', label: 'Años de experiencia' },
                { val: '100%', label: 'Ingredientes frescos' },
                { val: '∞', label: 'Tacos por evento' },
                { val: '1', label: 'Llamada para reservar' },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-1">
                  <span className="font-['Playfair_Display'] font-black text-[#3DBFBF]" style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>{val}</span>
                  <span className="font-['Poppins'] text-white/45 text-xs leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event types */}
          <div>
            <p className="font-['Poppins'] text-white/25 text-[10px] font-bold uppercase tracking-[0.4em] mb-5">Perfectos para</p>
            <div className="flex flex-wrap gap-3">
              {events.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 bg-white/4 hover:bg-[#3DBFBF]/10 border border-white/8 hover:border-[#3DBFBF]/30 rounded-full px-5 py-2.5 transition-all duration-200 cursor-default">
                  <Icon className="w-4 h-4 text-[#3DBFBF]" strokeWidth={1.75} />
                  <span className="font-['Poppins'] text-white/70 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="relative bg-[#050F0F] py-28 px-4 overflow-hidden">
      {/* Full-bleed food photo — raw, dark */}
      <div className="absolute inset-0">
        <img src="/platos/638541360_1251884630254211_8865505946667913032_n.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050F0F] via-[#050F0F]/80 to-[#050F0F]/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="font-['Poppins'] text-[#3DBFBF] text-[11px] font-bold uppercase tracking-[0.4em] mb-6">Portland, Tennessee</p>
          <h2 className="font-['Playfair_Display'] font-black text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            ¿Listo para el mejor<br /><span className="text-[#3DBFBF] italic">taco de tu vida?</span>
          </h2>
          <p className="font-['Poppins'] text-white/45 text-base leading-relaxed mb-10 max-w-md">
            461 N Broadway, Portland TN. Te prometemos que no te vas a arrepentir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://tacosmijalisco.cloveronline.com/menu/all" target="_blank" rel="noopener noreferrer"
              className="bg-[#3DBFBF] hover:bg-[#2EAEAE] text-white font-['Poppins'] font-bold text-sm px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#3DBFBF]/30 hover:-translate-y-0.5">
              Ordenar Ahora
            </a>
            <a href="#menu"
              className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-['Poppins'] font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-200">
              Ver el Menú Completo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#071414] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/favicon-32x32.png" alt="logo" className="w-9 h-9 rounded-lg" />
              <div>
                <p className="font-['Playfair_Display'] text-white font-black text-lg">Tacos Mi Jalisco</p>
                <p className="text-[#3DBFBF] text-[10px] font-['Poppins'] font-semibold tracking-[0.2em] uppercase">Cali-Style Mexican Eats</p>
              </div>
            </div>
            <p className="font-['Poppins'] text-white/40 text-sm leading-relaxed">
              Auténtica cocina jaliscience con los mejores ingredientes, directo a tu plato en Portland, Tennessee.
            </p>
          </div>

          <div>
            <p className="font-['Poppins'] text-white font-semibold text-sm uppercase tracking-widest mb-4">Menú Rápido</p>
            <div className="space-y-2">
              <a href="https://tacosmijalisco.cloveronline.com/menu/all" target="_blank" rel="noopener noreferrer"
                className="block font-['Poppins'] text-[#3DBFBF] hover:text-white text-sm font-semibold transition-colors duration-200">
                → Ordenar Online
              </a>
              {[
                { href: '#menu',      label: 'Menú' },
                { href: '#resenas',   label: 'Reseñas' },
                { href: '#galeria',   label: 'Galería' },
                { href: '#calidad',   label: 'Calidad' },
                { href: '#nosotros',  label: 'Nuestra Historia' },
                { href: '#ubicacion', label: 'Ubicación' },
              ].map((l, i) => (
                <a key={i} href={l.href} className="block font-['Poppins'] text-white/40 hover:text-[#3DBFBF] text-sm transition-colors duration-200">{l.label}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-['Poppins'] text-white font-semibold text-sm uppercase tracking-widest mb-4">Contacto</p>
            <div className="space-y-3">
              <p className="font-['Poppins'] text-white/40 text-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> 461 N Broadway, Portland, TN
              </p>
              <a href="https://www.facebook.com/TacosMiJaliscoTruck" target="_blank" rel="noopener noreferrer"
                className="block font-['Poppins'] text-white/40 hover:text-[#3DBFBF] text-sm transition-colors">
                Facebook: @TacosMiJaliscoTruck
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Poppins'] text-white/25 text-xs">
            © {new Date().getFullYear()} Tacos Mi Jalisco Truck · Portland, TN · Todos los derechos reservados
          </p>
          <div className="flex gap-1 items-center">
            <span className="w-4 h-3 rounded-sm bg-[#006847] inline-block" />
            <span className="w-4 h-3 rounded-sm bg-white inline-block" />
            <span className="w-4 h-3 rounded-sm bg-[#3DBFBF] inline-block" />
            <span className="font-['Poppins'] text-white/25 text-xs ml-2">Hecho con ❤️ en México 🇲🇽</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SecretMenuItem() {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const proteins = ['Carne Asada', 'Chicken', 'Chorizo', 'Shrimp', 'Adobo Pork']
  const served = ['Rice', 'Lettuce', 'Pico', 'Guac', 'Queso', 'Sautéed Onions', 'Crema', 'Naan']

  return (
    <section className="bg-[#080808] py-28 px-4 overflow-hidden relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px',
      }} />

      {/* Red glow top-left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-red-900/20 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">

        {/* Top label — classified stamp */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-red-600/40" />
            <div className={`border-2 border-red-600 px-5 py-1.5 rotate-[-1.5deg] transition-all duration-700 ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <p className="font-['Poppins'] text-red-500 text-xs font-black uppercase tracking-[0.5em]">⚠ Classified</p>
            </div>
            <div className="h-px w-16 bg-red-600/40" />
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <div className={`relative transition-all duration-1000 delay-200 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Scanline effect */}
            <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden pointer-events-none"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }} />

            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl shadow-black/80">
              <img
                src="/secret%20menu%20item.jpg"
                alt="Secret Menu Item"
                className="w-full h-full object-cover"
              />
              {/* Red tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply" />
            </div>

            {/* Corner classification marks */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-600/60 rounded-tl" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-600/60 rounded-tr" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-600/60 rounded-bl" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-600/60 rounded-br" />

            {/* Ask badge */}
            <div className="absolute -bottom-5 -right-5 bg-red-600 rounded-2xl px-5 py-4 shadow-2xl shadow-red-900/60 rotate-[3deg]">
              <p className="font-['Poppins'] text-white text-[10px] font-black uppercase tracking-widest leading-tight">Ask for it<br />by name</p>
            </div>
          </div>

          {/* Text side */}
          <div className={`transition-all duration-1000 delay-400 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>

            {/* Title */}
            <div className="mb-8">
              <p className="font-['Poppins'] text-red-500/70 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
                Not on the menu. But it's real.
              </p>
              <h2 className="font-['Playfair_Display'] font-black text-white leading-[0.9]" style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
                Taco Truck<br />
                <span className="text-red-500 italic">Special.</span>
              </h2>
              <div className="w-10 h-0.5 bg-red-600/50 mt-6" />
            </div>

            {/* Choose protein */}
            <div className="mb-8">
              <p className="font-['Poppins'] text-white/30 text-[10px] font-bold uppercase tracking-[0.35em] mb-3">Choose your protein</p>
              <div className="flex flex-wrap gap-2">
                {proteins.map((p) => (
                  <span key={p} className="font-['Poppins'] text-sm font-semibold text-white/80 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Served with */}
            <div className="mb-10">
              <p className="font-['Poppins'] text-white/30 text-[10px] font-bold uppercase tracking-[0.35em] mb-3">Served with</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {served.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-500/70 flex-shrink-0" />
                    <span className="font-['Poppins'] text-white/65 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://tacosmijalisco.cloveronline.com/menu/all"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-['Poppins'] font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-red-900/50 hover:-translate-y-0.5"
            >
              Order the Special <ArrowRight className="w-4 h-4" />
            </a>

            <p className="font-['Poppins'] text-white/20 text-xs mt-4">
              Not listed online — ask in person or mention it when ordering.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── MAIN APP ──────────────────────────────────── */

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-[#0D2020]">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Stats />
      <PhotoStrip />
      <Menu />
      <PizzaMondays />
      <Quality />
      <Reviews />
      <FoodGallery />
      <Catering />
      <About />
      <Location />
      <SecretMenuItem />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default App
