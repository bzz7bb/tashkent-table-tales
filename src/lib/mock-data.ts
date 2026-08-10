import venue1 from "@/assets/venue-1.jpg";
import venue2 from "@/assets/venue-2.jpg";
import dishes from "@/assets/dish-grid.jpg";
import type { Lang } from "@/lib/i18n";

export type Bi = { uz: string; ru: string };
export const tr = (v: Bi, lang: Lang) => v[lang];

export type MenuItem = {
  id: string;
  name: Bi;
  desc: Bi;
  price: number;
  category: "starters" | "mains" | "drinks" | "desserts";
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: "italian" | "sushi" | "cafe" | "bar";
  occupancy: number;
  freeTables: number;
  vibe: Bi;
  address: Bi;
  image: string;
  x: number;
  y: number;
};

export const cuisines: { id: Restaurant["cuisine"]; label: Bi }[] = [
  { id: "italian", label: { uz: "Italyan", ru: "Итальянская" } },
  { id: "sushi", label: { uz: "Sushi", ru: "Суши" } },
  { id: "cafe", label: { uz: "Kafe", ru: "Кафе" } },
  { id: "bar", label: { uz: "Bar", ru: "Бар" } },
];

export const restaurants: Restaurant[] = [
  {
    id: "socials",
    name: "Socials",
    cuisine: "bar",
    occupancy: 85,
    freeTables: 2,
    vibe: { uz: "Jonli musiqa", ru: "Живая музыка" },
    address: { uz: "Amir Temur ko'chasi 107, Toshkent", ru: "ул. Амира Темура 107, Ташкент" },
    image: venue1,
    x: 28,
    y: 34,
  },
  {
    id: "brasserie",
    name: "Brasserie",
    cuisine: "cafe",
    occupancy: 78,
    freeTables: 3,
    vibe: { uz: "Shovqinli kechki ovqat", ru: "Оживлённый ужин" },
    address: { uz: "Mustaqillik shoh ko'chasi 12, Toshkent", ru: "просп. Мустакиллик 12, Ташкент" },
    image: venue2,
    x: 62,
    y: 26,
  },
  {
    id: "sette",
    name: "Sette Pasta",
    cuisine: "italian",
    occupancy: 94,
    freeTables: 0,
    vibe: { uz: "To'la zal, cho'qqi vaqti", ru: "Аншлаг, самый пик" },
    address: { uz: "Shota Rustaveli 45, Toshkent", ru: "ул. Шота Руставели 45, Ташкент" },
    image: dishes,
    x: 46,
    y: 62,
  },
  {
    id: "kaiten",
    name: "Kaiten Sushi",
    cuisine: "sushi",
    occupancy: 41,
    freeTables: 9,
    vibe: { uz: "Tinch va yorug'", ru: "Тихо и светло" },
    address: { uz: "Yunusobod 4-mavze 21, Toshkent", ru: "Юнусабад 4-кв-л 21, Ташкент" },
    image: venue2,
    x: 76,
    y: 58,
  },
  {
    id: "chorsu-coffee",
    name: "Chorsu Coffee",
    cuisine: "cafe",
    occupancy: 62,
    freeTables: 5,
    vibe: { uz: "Ish uchun qulay", ru: "Удобно для работы" },
    address: { uz: "Chorsu 3, Toshkent", ru: "Чорсу 3, Ташкент" },
    image: dishes,
    x: 16,
    y: 70,
  },
];

export const landingPins = ["socials", "brasserie", "sette"];

export function occupancyLevel(o: number): "low" | "mid" | "high" {
  if (o < 55) return "low";
  if (o < 80) return "mid";
  return "high";
}

export const menu: MenuItem[] = [
  {
    id: "m1",
    category: "starters",
    price: 42000,
    name: { uz: "Achichuk salat", ru: "Салат ачичук" },
    desc: { uz: "Yangi pomidor, piyoz va rayhon", ru: "Свежие томаты, лук и базилик" },
  },
  {
    id: "m2",
    category: "starters",
    price: 58000,
    name: { uz: "Burrata", ru: "Буррата" },
    desc: { uz: "Cherri pomidor va zaytun moyi bilan", ru: "С томатами черри и оливковым маслом" },
  },
  {
    id: "m3",
    category: "starters",
    price: 39000,
    name: { uz: "Hummus", ru: "Хумус" },
    desc: { uz: "Issiq non va zaytun bilan", ru: "С тёплой лепёшкой и оливками" },
  },
  {
    id: "m4",
    category: "mains",
    price: 96000,
    name: { uz: "Qozon kabob", ru: "Казан-кебаб" },
    desc: { uz: "Qo'y go'shti, kartoshka va ko'katlar", ru: "Баранина, картофель и зелень" },
  },
  {
    id: "m5",
    category: "mains",
    price: 88000,
    name: { uz: "Tagliatelle funghi", ru: "Тальятелле фунги" },
    desc: { uz: "Qaymoqli qo'ziqorin sousi", ru: "Сливочный грибной соус" },
  },
  {
    id: "m6",
    category: "mains",
    price: 124000,
    name: { uz: "Ribeye steyk", ru: "Стейк рибай" },
    desc: { uz: "Ko'mirda pishirilgan, 300 g", ru: "На углях, 300 г" },
  },
  {
    id: "m7",
    category: "mains",
    price: 74000,
    name: { uz: "Losos teriyaki", ru: "Лосось терияки" },
    desc: { uz: "Guruch va bodring bilan", ru: "С рисом и огурцом" },
  },
  {
    id: "m8",
    category: "drinks",
    price: 22000,
    name: { uz: "Ko'k choy", ru: "Зелёный чай" },
    desc: { uz: "Choynak, 0.8 l", ru: "Чайник, 0.8 л" },
  },
  {
    id: "m9",
    category: "drinks",
    price: 28000,
    name: { uz: "Kapuchino", ru: "Капучино" },
    desc: { uz: "Ikki porsiya espresso", ru: "Двойной эспрессо" },
  },
  {
    id: "m10",
    category: "drinks",
    price: 45000,
    name: { uz: "Limonad", ru: "Лимонад" },
    desc: { uz: "Uy sharbati, 0.5 l", ru: "Домашний, 0.5 л" },
  },
  {
    id: "m11",
    category: "desserts",
    price: 52000,
    name: { uz: "Tiramisu", ru: "Тирамису" },
    desc: { uz: "Klassik retsept", ru: "Классический рецепт" },
  },
  {
    id: "m12",
    category: "desserts",
    price: 46000,
    name: { uz: "Cheesecake", ru: "Чизкейк" },
    desc: { uz: "Malina sousi bilan", ru: "С малиновым соусом" },
  },
];

export const menuCategories: MenuItem["category"][] = ["starters", "mains", "drinks", "desserts"];

export const visitHistory = [
  { id: "v1", restaurant: "Socials", date: "2026-08-08", amount: 312000 },
  { id: "v2", restaurant: "Sette Pasta", date: "2026-08-03", amount: 186000 },
  { id: "v3", restaurant: "Brasserie", date: "2026-07-28", amount: 244000 },
  { id: "v4", restaurant: "Kaiten Sushi", date: "2026-07-19", amount: 158000 },
  { id: "v5", restaurant: "Socials", date: "2026-07-11", amount: 402000 },
];

export const dishImage = dishes;
