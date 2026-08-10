import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru";

type Dict = Record<string, { uz: string; ru: string }>;

export const dict: Dict = {
  "nav.how": { uz: "Qanday ishlaydi", ru: "Как это работает" },
  "nav.business": { uz: "Restoranlar uchun", ru: "Для ресторанов" },
  "nav.contact": { uz: "Aloqa", ru: "Контакты" },
  "nav.login": { uz: "Kirish", ru: "Войти" },
  "nav.signup": { uz: "Ro'yxatdan o'tish", ru: "Регистрация" },
  "nav.map": { uz: "Xarita", ru: "Карта" },
  "nav.profile": { uz: "Profil", ru: "Профиль" },
  "nav.logout": { uz: "Chiqish", ru: "Выйти" },

  "hero.title": { uz: "VibeCheck — Toshkentning jonli fintech xaritasi.", ru: "VibeCheck — живая финтех-карта Ташкента." },
  "hero.sub": {
    uz: "Restoranlardagi real vaqtdagi band­likni va haqiqiy vibe'ni ko'ring. Hisobni QR orqali bir necha soniyada to'lang — ofitsiantni kutish shart emas.",
    ru: "Смотрите реальную загруженность и настоящий вайб ресторанов. Оплачивайте счёт по QR за секунды — без ожидания официанта.",
  },
  "hero.cta": { uz: "Xaritani ochish", ru: "Открыть карту" },
  "hero.badge": { uz: "Jonli ma'lumot • Toshkent", ru: "Данные в реальном времени • Ташкент" },

  "how.title": { uz: "Mehmonlar uchun qanday ishlaydi", ru: "Как это работает для гостей" },
  "how.1.title": { uz: "Jonli xarita", ru: "Живая карта" },
  "how.1.text": {
    uz: "Muassasalar xaritada rang bilan yonadi: yashil — joy ko'p, sariq — gavjum, qizil — to'la, ayni cho'qqidagi vibe.",
    ru: "Заведения светятся цветом на карте: зелёный — много мест, жёлтый — оживлённо, красный — аншлаг, пик вайба.",
  },
  "how.2.title": { uz: "Jonli hisob", ru: "Живой счёт" },
  "how.2.text": {
    uz: "Stolga o'tiring, stol QR kodini skanerlang va ofitsiant kassaga kiritgan har bir taom hisobingizda real vaqtda paydo bo'lsin.",
    ru: "Садитесь за стол, сканируйте QR-код и видите, как счёт обновляется в реальном времени, пока официант пробивает позиции.",
  },
  "how.3.title": { uz: "Bir zumda to'lov", ru: "Мгновенная оплата" },
  "how.3.text": {
    uz: "Terminalni kutmang. Click yoki Payme orqali bir tegishda to'lang yoki do'stlar bilan bo'lishing.",
    ru: "Не ждите терминал. Оплатите или разделите счёт с друзьями в одно касание через Click или Payme.",
  },

  "b2b.title": { uz: "Restoran egalari uchun ham yaratilgan.", ru: "Создано и для владельцев ресторанов." },
  "b2b.1.title": { uz: "Stol aylanmasi +20%", ru: "Оборот столов +20%" },
  "b2b.1.text": {
    uz: "Bir zumda QR to'lov bilan stol aylanmangizni 20% ga oshiring.",
    ru: "Увеличьте оборот столов на 20% благодаря мгновенной оплате по QR.",
  },
  "b2b.2.title": { uz: "Ichki CRM", ru: "Встроенная CRM" },
  "b2b.2.text": {
    uz: "Mehmonlarni qaytaradigan CRM — Instagram reklamasiga byudjet yoqmasdan.",
    ru: "CRM, которая возвращает гостей — без слива бюджета на рекламу в Instagram.",
  },
  "b2b.cta": { uz: "VibeCheck bilan hamkorlik", ru: "Стать партнёром VibeCheck" },

  "map.title": { uz: "Hozir Toshkentda", ru: "Сейчас в Ташкенте" },
  "map.sub": {
    uz: "Nuqtani bosing va joyning jonli holatini ko'ring.",
    ru: "Нажмите на пин и посмотрите живой статус заведения.",
  },
  "map.occupancy": { uz: "Bandlik", ru: "Загруженность" },
  "map.vibe": { uz: "Vibe", ru: "Вайб" },
  "map.free": { uz: "Bo'sh stollar", ru: "Свободных столов" },
  "map.tables": { uz: "ta qoldi", ru: "осталось" },
  "map.open": { uz: "Batafsil", ru: "Подробнее" },
  "map.filters": { uz: "Oshxona turi", ru: "Тип кухни" },
  "map.all": { uz: "Barchasi", ru: "Все" },

  "footer.about": { uz: "Biz haqimizda", ru: "О нас" },
  "footer.desc": {
    uz: "VibeCheck — Toshkent restoranlari uchun jonli xarita va to'lov platformasi.",
    ru: "VibeCheck — живая карта и платёжная платформа для ресторанов Ташкента.",
  },
  "footer.legal": { uz: "Hujjatlar", ru: "Документы" },
  "footer.privacy": { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности" },
  "footer.terms": { uz: "Foydalanish shartlari", ru: "Условия использования" },
  "footer.social": { uz: "Ijtimoiy tarmoqlar", ru: "Соцсети" },
  "footer.news": { uz: "Yangiliklardan xabardor bo'ling", ru: "Оставайтесь в курсе" },
  "footer.email": { uz: "Email manzilingiz", ru: "Ваш email" },
  "footer.subscribe": { uz: "Obuna", ru: "Подписаться" },
  "footer.subscribed": { uz: "Rahmat! Obuna bo'ldingiz.", ru: "Спасибо! Вы подписаны." },
  "footer.rights": { uz: "Barcha huquqlar himoyalangan.", ru: "Все права защищены." },

  "auth.login.title": { uz: "Xush kelibsiz", ru: "С возвращением" },
  "auth.login.sub": { uz: "Hisobingizga kiring", ru: "Войдите в свой аккаунт" },
  "auth.signup.title": { uz: "Hisob yarating", ru: "Создайте аккаунт" },
  "auth.signup.sub": { uz: "Bir daqiqada boshlaymiz", ru: "Начнём за минуту" },
  "auth.name": { uz: "Ism", ru: "Имя" },
  "auth.contact": { uz: "Email yoki telefon", ru: "Email или телефон" },
  "auth.password": { uz: "Parol", ru: "Пароль" },
  "auth.confirm": { uz: "Parolni tasdiqlang", ru: "Подтвердите пароль" },
  "auth.forgot": { uz: "Parolni unutdingizmi?", ru: "Забыли пароль?" },
  "auth.noAccount": { uz: "Hisobingiz yo'qmi?", ru: "Нет аккаунта?" },
  "auth.hasAccount": { uz: "Hisobingiz bormi?", ru: "Уже есть аккаунт?" },
  "auth.submit.login": { uz: "Kirish", ru: "Войти" },
  "auth.submit.signup": { uz: "Ro'yxatdan o'tish", ru: "Зарегистрироваться" },
  "auth.err.name": { uz: "Ismingizni kiriting", ru: "Введите имя" },
  "auth.err.contact": { uz: "To'g'ri email yoki telefon kiriting", ru: "Введите корректный email или телефон" },
  "auth.err.password": { uz: "Kamida 6 ta belgi", ru: "Минимум 6 символов" },
  "auth.err.match": { uz: "Parollar mos kelmadi", ru: "Пароли не совпадают" },

  "app.nearby": { uz: "Yaqin atrofdagi joylar", ru: "Заведения рядом" },
  "app.detail.scan": { uz: "Men shu yerdaman / QR skanerlash", ru: "Я здесь / Сканировать QR" },
  "app.detail.address": { uz: "Manzil", ru: "Адрес" },
  "app.back": { uz: "Orqaga", ru: "Назад" },
  "scan.title": { uz: "Stol QR kodini skanerlash", ru: "Сканирование QR стола" },
  "scan.hint": { uz: "Kamerani stoldagi QR kodga qarating", ru: "Наведите камеру на QR-код на столе" },
  "scan.simulate": { uz: "Skanerlashni simulyatsiya qilish", ru: "Симулировать сканирование" },
  "scan.scanning": { uz: "Skanerlanmoqda...", ru: "Сканирование..." },
  "table.title": { uz: "Stol sessiyasi", ru: "Сессия стола" },
  "table.number": { uz: "Stol", ru: "Стол" },
  "table.choose": { uz: "Qanday davom etamiz?", ru: "Как продолжим?" },
  "table.order": { uz: "Onlayn buyurtma", ru: "Заказать онлайн" },
  "table.orderDesc": { uz: "Menyudan tanlang va o'zingiz to'lang", ru: "Выберите из меню и оплатите сами" },
  "table.waiter": { uz: "Ofitsiantni chaqirish", ru: "Позвать официанта" },
  "table.waiterDesc": { uz: "Hisobingiz jonli yangilanib boradi", ru: "Ваш счёт будет обновляться вживую" },

  "menu.title": { uz: "Menyu", ru: "Меню" },
  "menu.cat.starters": { uz: "Salatlar va gazaklar", ru: "Закуски" },
  "menu.cat.mains": { uz: "Asosiy taomlar", ru: "Основные блюда" },
  "menu.cat.drinks": { uz: "Ichimliklar", ru: "Напитки" },
  "menu.cat.desserts": { uz: "Shirinliklar", ru: "Десерты" },
  "menu.add": { uz: "Qo'shish", ru: "Добавить" },
  "cart.title": { uz: "Buyurtmangiz", ru: "Ваш заказ" },
  "cart.empty": { uz: "Hozircha bo'sh", ru: "Пока пусто" },
  "cart.total": { uz: "Jami", ru: "Итого" },
  "cart.checkout": { uz: "To'lovga o'tish", ru: "К оплате" },

  "bill.title": { uz: "Jonli hisob", ru: "Живой счёт" },
  "bill.live": { uz: "JONLI", ru: "LIVE" },
  "bill.status.notified": { uz: "Ofitsiant xabardor qilindi", ru: "Официант уведомлён" },
  "bill.status.preparing": { uz: "Buyurtma tayyorlanmoqda", ru: "Заказ готовится" },
  "bill.status.updating": { uz: "Hisob jonli yangilanmoqda", ru: "Счёт обновляется вживую" },
  "bill.status.final": { uz: "Hisob yakunlandi", ru: "Счёт закрыт" },
  "bill.finalize": { uz: "Hisobni yakunlash", ru: "Закрыть счёт" },
  "bill.waiting": { uz: "Taomlar kutilmoqda...", ru: "Ожидаем позиции..." },

  "pay.title": { uz: "To'lov", ru: "Оплата" },
  "pay.summary": { uz: "Buyurtma tafsiloti", ru: "Детали заказа" },
  "pay.method": { uz: "To'lov usuli", ru: "Способ оплаты" },
  "pay.cash": { uz: "Naqd", ru: "Наличные" },
  "pay.card": { uz: "Karta", ru: "Карта" },
  "pay.split": { uz: "Do'stlar bilan bo'lish", ru: "Разделить с друзьями" },
  "pay.splitEqual": { uz: "Teng bo'lish", ru: "Поровну" },
  "pay.splitCustom": { uz: "Alohida summa", ru: "Своя сумма" },
  "pay.people": { uz: "Odamlar soni", ru: "Количество человек" },
  "pay.perPerson": { uz: "Har biriga", ru: "На человека" },
  "pay.yourShare": { uz: "Sizning ulushingiz", ru: "Ваша доля" },
  "pay.full": { uz: "To'liq to'lash", ru: "Оплатить полностью" },
  "pay.pay": { uz: "To'lash", ru: "Оплатить" },
  "pay.done": { uz: "To'lov muvaffaqiyatli!", ru: "Оплата прошла успешно!" },
  "pay.doneSub": { uz: "Chek emailingizga yuborildi. Yoqimli ishtaha!", ru: "Чек отправлен на почту. Приятного аппетита!" },
  "pay.back": { uz: "Xaritaga qaytish", ru: "Вернуться на карту" },

  "profile.title": { uz: "Profil", ru: "Профиль" },
  "profile.edit": { uz: "Tahrirlash", ru: "Редактировать" },
  "profile.save": { uz: "Saqlash", ru: "Сохранить" },
  "profile.history": { uz: "Tashriflar tarixi", ru: "История визитов" },
  "profile.month": { uz: "Shu oyda sarflandi", ru: "Потрачено в этом месяце" },
  "profile.favorite": { uz: "Sevimli joy", ru: "Любимое место" },
  "profile.visits": { uz: "Tashriflar", ru: "Визиты" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");
  const t = useCallback((k: string) => dict[k]?.[lang] ?? k, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function formatUZS(amount: number) {
  return new Intl.NumberFormat("ru-RU").format(amount) + " so'm";
}
