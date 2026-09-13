// ============================================================
// CYCLESYNC PWA — app.js
// Cycle engine, i18n, storage, UI
// ============================================================

// ===== STORAGE =====
function getData() {
  try { return JSON.parse(localStorage.getItem('cyclesync_pwa') || 'null'); } catch { return null; }
}
function setData(d) {
  localStorage.setItem('cyclesync_pwa', JSON.stringify(d));
}
function getLang() { return localStorage.getItem('cyclesync_lang') || 'en'; }
function setLang(l) { localStorage.setItem('cyclesync_lang', l); }

// ===== TRANSLATIONS =====
const T = {
  en: {
    welcomeTitle: 'Welcome to CycleSync', welcomeDesc: "Let's set up your cycle so we can give you accurate predictions.",
    startBtn: 'Get started', step2Title: 'When did your last period start?',
    step2Desc: 'Choose the first day of your most recent period.',
    step3Title: 'How long is your cycle?', step3Desc: 'Days from the start of one period to the next. Most people are 21–35 days.',
    step3bTitle: 'How long does your period last?', step3bDesc: 'Most periods last 3–7 days.',
    nextBtn: 'Next →', saveBtn: 'Save →',
    navHome: 'Home', navCalendar: 'Calendar', navSymptoms: 'Symptoms', navSettings: 'Settings',
    quickLog: 'Quick Log', flow: 'Flow', mood: 'Mood', pain: 'Pain', energy: 'Energy',
    todaysTips: "Today's Tips", nextPeriod: 'Next Period', ovulation: 'Ovulation', days: 'days',
    periodStarted: '🩸 Period started', periodLogged: '✓ Logged today',
    logSymptoms: 'Log Symptoms', date: 'Date', notes: 'Notes', saveSymptoms: 'Log Symptoms',
    settings: 'Settings', theme: 'Theme', supportDesc: "CycleSync is free and always will be. If it's been helpful, a small coffee goes a long way ☕",
    period: 'Period', fertile: 'Fertile', day: 'Day',
    flowNone: 'None', flowLight: 'Light', flowMedium: 'Medium', flowHeavy: 'Heavy',
    moodGreat: '😀 Great', moodGood: '🙂 Good', moodOkay: '😐 Okay', moodLow: '😔 Low', moodBad: '😩 Bad',
    energyHigh: '⚡⚡⚡ High', energyMedium: '⚡⚡ Medium', energyLow: '⚡ Low', energyNone: '✖️ None',
    headache: 'Headache', cramps: 'Cramps', backPain: 'Back Pain', bloating: 'Bloating',
    breastTenderness: 'Breast Tenderness', acne: 'Acne', insomnia: 'Insomnia', cravings: 'Cravings',
    phaseMenstrual: 'Menstrual', phaseFollicular: 'Follicular', phaseOvulation: 'Ovulation', phaseLuteal: 'Luteal',
    tipsM: ['Rest and take it easy when needed', 'Stay hydrated and warm', 'Iron-rich foods help replace lost iron'],
    tipsF: ['Energy levels rising — great for new projects', 'Focus on creative work', 'Social activities are energising'],
    tipsO: ['Peak energy — great for physical activities', 'Communication skills enhanced', 'Good time for important meetings'],
    tipsL: ['Focus on detail-oriented tasks', 'Self-care is important', 'Be mindful of mood changes'],
    savedToast: 'Symptoms logged!', periodToast: 'Period logged for today 🩸',
    notifTitle: '🔔 Never miss your period',
    notifDesc: 'Get a reminder 3 days before your next period. Private — everything stays on your device.',
    notifEnable: 'Enable reminders',
    notifLater: 'Maybe later',
    notifEnabled: '✅ Reminders on',
    notifDisabled: 'Enable reminders',
    notifSettingsTitle: 'Reminders',
    notifPeriod: 'Period approaching',
    notifOvulation: 'Ovulation reminder',
    notifDaily: 'Daily log reminder',
    notifTime: 'Reminder time',
    notifSaved: 'Reminder settings saved ✅',
    notifDenied: 'Notifications blocked. Enable in browser settings.',
    notifPermission: 'Allow notifications to get reminders'
  },
  ru: {
    welcomeTitle: 'Добро пожаловать в CycleSync', welcomeDesc: 'Давайте настроим ваш цикл для точных предсказаний.',
    startBtn: 'Начать', step2Title: 'Когда начались последние месячные?',
    step2Desc: 'Выберите первый день последних месячных.',
    step3Title: 'Какова длина вашего цикла?', step3Desc: 'Дни от начала одних месячных до следующих. Обычно 21–35 дней.',
    step3bTitle: 'Сколько длятся ваши месячные?', step3bDesc: 'Обычно 3–7 дней.',
    nextBtn: 'Далее →', saveBtn: 'Сохранить →',
    navHome: 'Главная', navCalendar: 'Календарь', navSymptoms: 'Симптомы', navSettings: 'Настройки',
    quickLog: 'Быстрая запись', flow: 'Выделения', mood: 'Настроение', pain: 'Боль', energy: 'Энергия',
    todaysTips: 'Советы на сегодня', nextPeriod: 'Следующие месячные', ovulation: 'Овуляция', days: 'дней',
    periodStarted: '🩸 Месячные начались', periodLogged: '✓ Записано сегодня',
    logSymptoms: 'Записать симптомы', date: 'Дата', notes: 'Заметки', saveSymptoms: 'Сохранить симптомы',
    settings: 'Настройки', theme: 'Тема', supportDesc: 'CycleSync бесплатен и таким останется. Если приложение помогает вам, угостите нас кофе ☕',
    period: 'Месячные', fertile: 'Фертильное', day: 'День',
    flowNone: 'Нет', flowLight: 'Слабые', flowMedium: 'Средние', flowHeavy: 'Обильные',
    moodGreat: '😀 Отлично', moodGood: '🙂 Хорошо', moodOkay: '😐 Нормально', moodLow: '😔 Плохо', moodBad: '😩 Ужасно',
    energyHigh: '⚡⚡⚡ Высокая', energyMedium: '⚡⚡ Средняя', energyLow: '⚡ Низкая', energyNone: '✖️ Нет',
    headache: 'Головная боль', cramps: 'Спазмы', backPain: 'Боль в спине', bloating: 'Вздутие',
    breastTenderness: 'Чувствительность груди', acne: 'Акне', insomnia: 'Бессонница', cravings: 'Тяга к еде',
    phaseMenstrual: 'Менструальная', phaseFollicular: 'Фолликулярная', phaseOvulation: 'Овуляция', phaseLuteal: 'Лютеиновая',
    tipsM: ['Отдыхайте при необходимости', 'Пейте больше воды, держитесь в тепле', 'Продукты богатые железом помогут восстановлению'],
    tipsF: ['Уровень энергии растёт — время для новых проектов', 'Сосредоточьтесь на творческой работе', 'Отличное время для общения'],
    tipsO: ['Пиковый уровень энергии', 'Коммуникативные навыки обострены', 'Хорошее время для важных встреч'],
    tipsL: ['Сосредоточьтесь на детальных задачах', 'Уход за собой важен', 'Следите за настроением'],
    savedToast: 'Симптомы записаны!', periodToast: 'Месячные записаны 🩸',
    notifTitle: '🔔 Не пропустите месячные',
    notifDesc: 'Получите напоминание за 3 дня до месячных. Приватно — всё хранится на вашем устройстве.',
    notifEnable: 'Включить напоминания',
    notifLater: 'Позже',
    notifEnabled: '✅ Напоминания включены',
    notifDisabled: 'Включить напоминания',
    notifSettingsTitle: 'Напоминания',
    notifPeriod: 'Приближение месячных',
    notifOvulation: 'Напоминание об овуляции',
    notifDaily: 'Ежедневное напоминание',
    notifTime: 'Время напоминания',
    notifSaved: 'Настройки сохранены ✅',
    notifDenied: 'Уведомления заблокированы. Включите в настройках браузера.',
    notifPermission: 'Разрешите уведомления для напоминаний'
  },
  es: {
    welcomeTitle: 'Bienvenida a CycleSync', welcomeDesc: 'Configuremos tu ciclo para darte predicciones precisas.',
    startBtn: 'Comenzar', step2Title: '¿Cuándo empezó tu última menstruación?',
    step2Desc: 'Elige el primer día de tu menstruación más reciente.',
    step3Title: '¿Cuánto dura tu ciclo?', step3Desc: 'La mayoría: 21–35 días.',
    step3bTitle: '¿Cuánto dura tu menstruación?', step3bDesc: 'La mayoría dura entre 3 y 7 días.',
    nextBtn: 'Siguiente →', saveBtn: 'Guardar →',
    navHome: 'Inicio', navCalendar: 'Calendario', navSymptoms: 'Síntomas', navSettings: 'Ajustes',
    quickLog: 'Registro rápido', flow: 'Flujo', mood: 'Ánimo', pain: 'Dolor', energy: 'Energía',
    todaysTips: 'Consejos de hoy', nextPeriod: 'Próxima menstruación', ovulation: 'Ovulación', days: 'días',
    periodStarted: '🩸 Menstruación iniciada', periodLogged: '✓ Registrado hoy',
    logSymptoms: 'Registrar síntomas', date: 'Fecha', notes: 'Notas', saveSymptoms: 'Guardar síntomas',
    settings: 'Ajustes', theme: 'Tema', supportDesc: 'CycleSync es gratuito y siempre lo será. Si te ha sido útil, un café ayuda mucho ☕',
    period: 'Menstruación', fertile: 'Fértil', day: 'Día',
    flowNone: 'Ninguno', flowLight: 'Ligero', flowMedium: 'Moderado', flowHeavy: 'Abundante',
    moodGreat: '😀 Excelente', moodGood: '🙂 Bien', moodOkay: '😐 Regular', moodLow: '😔 Mal', moodBad: '😩 Pésimo',
    energyHigh: '⚡⚡⚡ Alta', energyMedium: '⚡⚡ Media', energyLow: '⚡ Baja', energyNone: '✖️ Sin energía',
    headache: 'Dolor de cabeza', cramps: 'Cólicos', backPain: 'Dolor de espalda', bloating: 'Hinchazón',
    breastTenderness: 'Sensibilidad pecho', acne: 'Acné', insomnia: 'Insomnio', cravings: 'Antojos',
    phaseMenstrual: 'Menstrual', phaseFollicular: 'Folicular', phaseOvulation: 'Ovulación', phaseLuteal: 'Lútea',
    tipsM: ['Descansa cuando lo necesites', 'Mantente hidratada y abrigada', 'Alimentos ricos en hierro te ayudarán'],
    tipsF: ['Tu energía sube — ideal para nuevos proyectos', 'Enfócate en trabajo creativo', 'Gran momento para socializar'],
    tipsO: ['Pico de energía — ideal para actividad física', 'Habilidades comunicativas mejoradas', 'Buen momento para reuniones importantes'],
    tipsL: ['Enfócate en tareas detalladas', 'El autocuidado es importante', 'Sé consciente de los cambios de humor'],
    savedToast: '¡Síntomas guardados!', periodToast: 'Menstruación registrada 🩸',
    notifTitle: '🔔 No te pierdas tu período',
    notifDesc: 'Recibe un aviso 3 días antes. Privado — todo queda en tu dispositivo.',
    notifEnable: 'Activar recordatorios',
    notifLater: 'Quizás luego',
    notifEnabled: '✅ Recordatorios activados',
    notifDisabled: 'Activar recordatorios',
    notifSettingsTitle: 'Recordatorios',
    notifPeriod: 'Período próximo',
    notifOvulation: 'Recordatorio ovulación',
    notifDaily: 'Recordatorio diario',
    notifTime: 'Hora del recordatorio',
    notifSaved: 'Configuración guardada ✅',
    notifDenied: 'Notificaciones bloqueadas. Actívalas en configuración del navegador.',
    notifPermission: 'Permite notificaciones para recibir recordatorios'
  },
  pt: {
    welcomeTitle: 'Bem-vinda ao CycleSync', welcomeDesc: 'Vamos configurar seu ciclo para previsões precisas.',
    startBtn: 'Começar', step2Title: 'Quando começou sua última menstruação?',
    step2Desc: 'Escolha o primeiro dia da sua menstruação mais recente.',
    step3Title: 'Qual é a duração do seu ciclo?', step3Desc: 'A maioria: 21–35 dias.',
    step3bTitle: 'Quanto tempo dura sua menstruação?', step3bDesc: 'A maioria dura entre 3 e 7 dias.',
    nextBtn: 'Próximo →', saveBtn: 'Salvar →',
    navHome: 'Início', navCalendar: 'Calendário', navSymptoms: 'Sintomas', navSettings: 'Configurações',
    quickLog: 'Registro rápido', flow: 'Fluxo', mood: 'Humor', pain: 'Dor', energy: 'Energia',
    todaysTips: 'Dicas de hoje', nextPeriod: 'Próxima menstruação', ovulation: 'Ovulação', days: 'dias',
    periodStarted: '🩸 Menstruação iniciada', periodLogged: '✓ Registrado hoje',
    logSymptoms: 'Registrar sintomas', date: 'Data', notes: 'Notas', saveSymptoms: 'Salvar sintomas',
    settings: 'Configurações', theme: 'Tema', supportDesc: 'CycleSync é gratuito e sempre será. Se foi útil, um café ajuda muito ☕',
    period: 'Menstruação', fertile: 'Fértil', day: 'Dia',
    flowNone: 'Nenhum', flowLight: 'Leve', flowMedium: 'Moderado', flowHeavy: 'Intenso',
    moodGreat: '😀 Ótimo', moodGood: '🙂 Bem', moodOkay: '😐 Regular', moodLow: '😔 Mal', moodBad: '😩 Péssimo',
    energyHigh: '⚡⚡⚡ Alta', energyMedium: '⚡⚡ Média', energyLow: '⚡ Baixa', energyNone: '✖️ Sem energia',
    headache: 'Dor de cabeça', cramps: 'Cólicas', backPain: 'Dor nas costas', bloating: 'Inchaço',
    breastTenderness: 'Sensibilidade nos seios', acne: 'Acne', insomnia: 'Insônia', cravings: 'Desejos',
    phaseMenstrual: 'Menstrual', phaseFollicular: 'Folicular', phaseOvulation: 'Ovulação', phaseLuteal: 'Lútea',
    tipsM: ['Descanse quando necessário', 'Mantenha-se hidratada e aquecida', 'Alimentos ricos em ferro ajudam'],
    tipsF: ['Energia aumentando — ótimo para novos projetos', 'Foque em trabalho criativo', 'Ótimo para atividades sociais'],
    tipsO: ['Pico de energia — ótimo para atividade física', 'Habilidades de comunicação aprimoradas', 'Bom momento para reuniões importantes'],
    tipsL: ['Foque em tarefas detalhadas', 'O autocuidado é importante', 'Esteja atenta às mudanças de humor'],
    savedToast: 'Sintomas salvos!', periodToast: 'Menstruação registrada 🩸'

    notifTitle: '🔔 Nunca perca sua menstruação',
    notifDesc: 'Receba um aviso 3 dias antes. Privado — tudo fica no seu dispositivo.',
    notifEnable: 'Ativar lembretes',
    notifLater: 'Talvez depois',
    notifEnabled: '✅ Lembretes ativados',
    notifDisabled: 'Ativar lembretes',
    notifSettingsTitle: 'Lembretes',
    notifPeriod: 'Menstruação próxima',
    notifOvulation: 'Lembrete ovulação',
    notifDaily: 'Lembrete diário',
    notifTime: 'Horário do lembrete',
    notifSaved: 'Configurações salvas ✅',
    notifDenied: 'Notificações bloqueadas. Ative nas configurações do navegador.',
    notifPermission: 'Permita notificações para receber lembretes'
  },
  fr: {
    welcomeTitle: 'Bienvenue sur CycleSync', welcomeDesc: 'Configurons votre cycle pour des prédictions précises.',
    startBtn: 'Commencer', step2Title: 'Quand ont commencé vos dernières règles?',
    step2Desc: 'Choisissez le premier jour de vos règles les plus récentes.',
    step3Title: 'Quelle est la durée de votre cycle?', step3Desc: 'La plupart: 21–35 jours.',
    step3bTitle: 'Combien de temps durent vos règles?', step3bDesc: 'La plupart durent 3 à 7 jours.',
    nextBtn: 'Suivant →', saveBtn: 'Enregistrer →',
    navHome: 'Accueil', navCalendar: 'Calendrier', navSymptoms: 'Symptômes', navSettings: 'Paramètres',
    quickLog: 'Saisie rapide', flow: 'Flux', mood: 'Humeur', pain: 'Douleur', energy: 'Énergie',
    todaysTips: 'Conseils du jour', nextPeriod: 'Prochaines règles', ovulation: 'Ovulation', days: 'jours',
    periodStarted: '🩸 Règles commencées', periodLogged: '✓ Enregistré aujourd\'hui',
    logSymptoms: 'Enregistrer les symptômes', date: 'Date', notes: 'Notes', saveSymptoms: 'Enregistrer',
    settings: 'Paramètres', theme: 'Thème', supportDesc: 'CycleSync est gratuit et le restera. Un café aide beaucoup ☕',
    period: 'Règles', fertile: 'Fertile', day: 'Jour',
    flowNone: 'Aucun', flowLight: 'Léger', flowMedium: 'Modéré', flowHeavy: 'Abondant',
    moodGreat: '😀 Excellent', moodGood: '🙂 Bien', moodOkay: '😐 Correct', moodLow: '😔 Mal', moodBad: '😩 Terrible',
    energyHigh: '⚡⚡⚡ Haute', energyMedium: '⚡⚡ Moyenne', energyLow: '⚡ Basse', energyNone: '✖️ Aucune',
    headache: 'Maux de tête', cramps: 'Crampes', backPain: 'Douleur dorsale', bloating: 'Ballonnements',
    breastTenderness: 'Sensibilité des seins', acne: 'Acné', insomnia: 'Insomnie', cravings: 'Envies',
    phaseMenstrual: 'Menstruelle', phaseFollicular: 'Folliculaire', phaseOvulation: 'Ovulation', phaseLuteal: 'Lutéale',
    tipsM: ['Reposez-vous quand nécessaire', 'Restez hydratée et au chaud', 'Les aliments riches en fer aident'],
    tipsF: ["L'énergie monte — idéal pour de nouveaux projets", 'Concentrez-vous sur le travail créatif', 'Idéal pour les activités sociales'],
    tipsO: ["Pic d'énergie — idéal pour l'activité physique", 'Compétences de communication améliorées', 'Bon moment pour les réunions importantes'],
    tipsL: ['Concentrez-vous sur les tâches détaillées', "L'autosoins est important", "Soyez attentive aux changements d'humeur"],
    savedToast: 'Symptômes enregistrés!', periodToast: 'Règles enregistrées 🩸'
  },
  de: {
    welcomeTitle: 'Willkommen bei CycleSync', welcomeDesc: 'Richten wir Ihren Zyklus für genaue Vorhersagen ein.',
    startBtn: 'Loslegen', step2Title: 'Wann hat Ihre letzte Periode begonnen?',
    step2Desc: 'Wählen Sie den ersten Tag Ihrer letzten Periode.',
    step3Title: 'Wie lang ist Ihr Zyklus?', step3Desc: 'Die meisten: 21–35 Tage.',
    step3bTitle: 'Wie lange dauert Ihre Periode?', step3bDesc: 'Die meisten dauern 3 bis 7 Tage.',
    nextBtn: 'Weiter →', saveBtn: 'Speichern →',
    navHome: 'Übersicht', navCalendar: 'Kalender', navSymptoms: 'Symptome', navSettings: 'Einstellungen',
    quickLog: 'Schnelleintrag', flow: 'Fluss', mood: 'Stimmung', pain: 'Schmerz', energy: 'Energie',
    todaysTips: 'Tipps für heute', nextPeriod: 'Nächste Periode', ovulation: 'Eisprung', days: 'Tage',
    periodStarted: '🩸 Periode begonnen', periodLogged: '✓ Heute erfasst',
    logSymptoms: 'Symptome erfassen', date: 'Datum', notes: 'Notizen', saveSymptoms: 'Symptome speichern',
    settings: 'Einstellungen', theme: 'Design', supportDesc: 'CycleSync ist kostenlos und bleibt es. Ein Kaffee hilft sehr ☕',
    period: 'Periode', fertile: 'Fruchtbar', day: 'Tag',
    flowNone: 'Keiner', flowLight: 'Leicht', flowMedium: 'Mittel', flowHeavy: 'Stark',
    moodGreat: '😀 Ausgezeichnet', moodGood: '🙂 Gut', moodOkay: '😐 In Ordnung', moodLow: '😔 Schlecht', moodBad: '😩 Schrecklich',
    energyHigh: '⚡⚡⚡ Hoch', energyMedium: '⚡⚡ Mittel', energyLow: '⚡ Niedrig', energyNone: '✖️ Keine',
    headache: 'Kopfschmerzen', cramps: 'Krämpfe', backPain: 'Rückenschmerzen', bloating: 'Blähungen',
    breastTenderness: 'Brustempfindlichkeit', acne: 'Akne', insomnia: 'Schlaflosigkeit', cravings: 'Heißhunger',
    phaseMenstrual: 'Menstruation', phaseFollicular: 'Follikelphase', phaseOvulation: 'Eisprung', phaseLuteal: 'Lutealphase',
    tipsM: ['Ruhen Sie sich aus wenn nötig', 'Bleiben Sie hydratisiert und warm', 'Eisenreiche Lebensmittel helfen'],
    tipsF: ['Energie steigt — gut für neue Projekte', 'Fokus auf kreative Arbeit', 'Ideal für soziale Aktivitäten'],
    tipsO: ['Energie-Höhepunkt — gut für Sport', 'Kommunikationsfähigkeiten verbessert', 'Gut für wichtige Meetings'],
    tipsL: ['Fokus auf detailorientierte Aufgaben', 'Selbstfürsorge ist wichtig', 'Achten Sie auf Stimmungsveränderungen'],
    savedToast: 'Symptome gespeichert!', periodToast: 'Periode erfasst 🩸'
  },
  hi: {
    welcomeTitle: 'CycleSync में आपका स्वागत है', welcomeDesc: 'आपके चक्र को सटीक भविष्यवाणियों के लिए सेट करते हैं।',
    startBtn: 'शुरू करें', step2Title: 'आपका आखिरी मासिक धर्म कब शुरू हुआ?',
    step2Desc: 'अपने सबसे हाल के मासिक धर्म का पहला दिन चुनें।',
    step3Title: 'आपका चक्र कितने दिनों का है?', step3Desc: 'अधिकांश: 21-35 दिन।',
    step3bTitle: 'आपका मासिक धर्म कितने दिन चलता है?', step3bDesc: 'अधिकांश 3-7 दिन।',
    nextBtn: 'अगला →', saveBtn: 'सहेजें →',
    navHome: 'होम', navCalendar: 'कैलेंडर', navSymptoms: 'लक्षण', navSettings: 'सेटिंग्स',
    quickLog: 'त्वरित लॉग', flow: 'प्रवाह', mood: 'मूड', pain: 'दर्द', energy: 'ऊर्जा',
    todaysTips: 'आज की सलाह', nextPeriod: 'अगला मासिक धर्म', ovulation: 'ओव्यूलेशन', days: 'दिन',
    periodStarted: '🩸 माहवारी शुरू हुई', periodLogged: '✓ आज दर्ज किया',
    logSymptoms: 'लक्षण दर्ज करें', date: 'तारीख', notes: 'नोट्स', saveSymptoms: 'लक्षण सहेजें',
    settings: 'सेटिंग्स', theme: 'थीम', supportDesc: 'CycleSync मुफ़्त है। एक कॉफी बहुत मदद करती है ☕',
    period: 'माहवारी', fertile: 'उपजाऊ', day: 'दिन',
    flowNone: 'कोई नहीं', flowLight: 'हल्का', flowMedium: 'मध्यम', flowHeavy: 'भारी',
    moodGreat: '😀 बहुत अच्छा', moodGood: '🙂 अच्छा', moodOkay: '😐 ठीक', moodLow: '😔 बुरा', moodBad: '😩 बहुत बुरा',
    energyHigh: '⚡⚡⚡ उच्च', energyMedium: '⚡⚡ मध्यम', energyLow: '⚡ कम', energyNone: '✖️ कोई नहीं',
    headache: 'सिरदर्द', cramps: 'ऐंठन', backPain: 'पीठ दर्द', bloating: 'पेट फूलना',
    breastTenderness: 'स्तन कोमलता', acne: 'मुहांसे', insomnia: 'अनिद्रा', cravings: 'तृष्णा',
    phaseMenstrual: 'मासिक धर्म', phaseFollicular: 'फॉलिकुलर', phaseOvulation: 'ओव्यूलेशन', phaseLuteal: 'ल्यूटियल',
    tipsM: ['जरूरत पड़ने पर आराम करें', 'हाइड्रेटेड और गर्म रहें', 'आयरन युक्त खाद्य पदार्थ मदद करते हैं'],
    tipsF: ['ऊर्जा बढ़ रही है — नए प्रोजेक्ट के लिए अच्छा समय', 'रचनात्मक काम पर ध्यान दें', 'सामाजिक गतिविधियों के लिए अच्छा समय'],
    tipsO: ['चरम ऊर्जा — शारीरिक गतिविधियों के लिए अच्छा', 'संचार कौशल बेहतर है', 'महत्वपूर्ण बैठकों के लिए अच्छा समय'],
    tipsL: ['विस्तृत कार्यों पर ध्यान दें', 'स्व-देखभाल महत्वपूर्ण है', 'मूड में बदलाव का ध्यान रखें'],
    savedToast: 'लक्षण दर्ज किए!', periodToast: 'माहवारी दर्ज की 🩸'
  },
  id: {
    welcomeTitle: 'Selamat datang di CycleSync', welcomeDesc: 'Mari atur siklus Anda untuk prediksi yang akurat.',
    startBtn: 'Mulai', step2Title: 'Kapan haid terakhir Anda dimulai?',
    step2Desc: 'Pilih hari pertama haid Anda yang paling baru.',
    step3Title: 'Berapa lama siklus Anda?', step3Desc: 'Kebanyakan: 21–35 hari.',
    step3bTitle: 'Berapa lama haid Anda berlangsung?', step3bDesc: 'Kebanyakan berlangsung 3–7 hari.',
    nextBtn: 'Berikutnya →', saveBtn: 'Simpan →',
    navHome: 'Beranda', navCalendar: 'Kalender', navSymptoms: 'Gejala', navSettings: 'Pengaturan',
    quickLog: 'Catatan cepat', flow: 'Aliran', mood: 'Suasana', pain: 'Nyeri', energy: 'Energi',
    todaysTips: 'Tips hari ini', nextPeriod: 'Haid berikutnya', ovulation: 'Ovulasi', days: 'hari',
    periodStarted: '🩸 Haid dimulai', periodLogged: '✓ Dicatat hari ini',
    logSymptoms: 'Catat gejala', date: 'Tanggal', notes: 'Catatan', saveSymptoms: 'Simpan gejala',
    settings: 'Pengaturan', theme: 'Tema', supportDesc: 'CycleSync gratis dan akan selalu gratis. Secangkir kopi sangat berarti ☕',
    period: 'Haid', fertile: 'Subur', day: 'Hari',
    flowNone: 'Tidak ada', flowLight: 'Ringan', flowMedium: 'Sedang', flowHeavy: 'Deras',
    moodGreat: '😀 Sangat baik', moodGood: '🙂 Baik', moodOkay: '😐 Biasa', moodLow: '😔 Buruk', moodBad: '😩 Sangat buruk',
    energyHigh: '⚡⚡⚡ Tinggi', energyMedium: '⚡⚡ Sedang', energyLow: '⚡ Rendah', energyNone: '✖️ Tidak ada',
    headache: 'Sakit kepala', cramps: 'Kram', backPain: 'Sakit punggung', bloating: 'Kembung',
    breastTenderness: 'Payudara sensitif', acne: 'Jerawat', insomnia: 'Insomnia', cravings: 'Mengidam',
    phaseMenstrual: 'Menstruasi', phaseFollicular: 'Folikular', phaseOvulation: 'Ovulasi', phaseLuteal: 'Luteal',
    tipsM: ['Istirahat saat dibutuhkan', 'Tetap terhidrasi dan hangat', 'Makanan kaya zat besi membantu'],
    tipsF: ['Energi meningkat — bagus untuk proyek baru', 'Fokus pada pekerjaan kreatif', 'Waktu yang baik untuk bersosialisasi'],
    tipsO: ['Energi puncak — bagus untuk aktivitas fisik', 'Kemampuan komunikasi meningkat', 'Waktu yang baik untuk rapat penting'],
    tipsL: ['Fokus pada tugas yang detail', 'Perawatan diri itu penting', 'Perhatikan perubahan suasana hati'],
    savedToast: 'Gejala disimpan!', periodToast: 'Haid dicatat 🩸'
  },
  bn: {
    welcomeTitle: 'CycleSync-এ স্বাগতম', welcomeDesc: 'সঠিক পূর্বাভাসের জন্য আপনার চক্র সেট করি।',
    startBtn: 'শুরু করুন', step2Title: 'আপনার শেষ মাসিক কখন শুরু হয়েছিল?',
    step2Desc: 'আপনার সাম্প্রতিক মাসিকের প্রথম দিন বেছে নিন।',
    step3Title: 'আপনার চক্র কত দিনের?', step3Desc: 'বেশিরভাগ: ২১-৩৫ দিন।',
    step3bTitle: 'আপনার মাসিক কত দিন স্থায়ী হয়?', step3bDesc: 'বেশিরভাগ ৩-৭ দিন।',
    nextBtn: 'পরবর্তী →', saveBtn: 'সংরক্ষণ করুন →',
    navHome: 'হোম', navCalendar: 'ক্যালেন্ডার', navSymptoms: 'উপসর্গ', navSettings: 'সেটিংস',
    quickLog: 'দ্রুত লগ', flow: 'প্রবাহ', mood: 'মেজাজ', pain: 'ব্যথা', energy: 'শক্তি',
    todaysTips: 'আজকের পরামর্শ', nextPeriod: 'পরবর্তী মাসিক', ovulation: 'ডিম্বস্ফোটন', days: 'দিন',
    periodStarted: '🩸 মাসিক শুরু হয়েছে', periodLogged: '✓ আজ দর্ज করা হয়েছে',
    logSymptoms: 'উপসর্গ লিখুন', date: 'তারিখ', notes: 'নোট', saveSymptoms: 'উপসর্গ সংরক্ষণ করুন',
    settings: 'সেটিংস', theme: 'থিম', supportDesc: 'CycleSync বিনামূল্যে। একটি কফি অনেক সাহায্য করে ☕',
    period: 'মাসিক', fertile: 'উর্বর', day: 'দিন',
    flowNone: 'কোনটি নয়', flowLight: 'হালকা', flowMedium: 'মাঝারি', flowHeavy: 'ভারী',
    moodGreat: '😀 অসাধারণ', moodGood: '🙂 ভালো', moodOkay: '😐 ঠিকঠাক', moodLow: '😔 খারাপ', moodBad: '😩 খুব খারাপ',
    energyHigh: '⚡⚡⚡ উচ্চ', energyMedium: '⚡⚡ মাঝারি', energyLow: '⚡ কম', energyNone: '✖️ কোনটি নয়',
    headache: 'মাথাব্যথা', cramps: 'খিঁচুনি', backPain: 'পিঠে ব্যথা', bloating: 'পেট ফোলা',
    breastTenderness: 'স্তন সংবেদনশীলতা', acne: 'ব্রণ', insomnia: 'অনিদ্রা', cravings: 'তৃষ্ণা',
    phaseMenstrual: 'মাসিক', phaseFollicular: 'ফলিকুলার', phaseOvulation: 'ডিম্বস্ফোটন', phaseLuteal: 'লুটেল',
    tipsM: ['প্রয়োজনে বিশ্রাম নিন', 'হাইড্রেটেড এবং উষ্ণ থাকুন', 'আয়রনযুক্ত খাবার সাহায্য করে'],
    tipsF: ['শক্তি বাড়ছে — নতুন প্রকল্পের জন্য ভালো', 'সৃজনশীল কাজে মনোযোগ দিন', 'সামাজিক কার্যকলাপের জন্য ভালো সময়'],
    tipsO: ['সর্বোচ্চ শক্তি — শারীরিক কার্যকলাপের জন্য ভালো', 'যোগাযোগ দক্ষতা উন্নত', 'গুরুত্বপূর্ণ মিটিংয়ের জন্য ভালো সময়'],
    tipsL: ['বিস্তারিত কাজে মনোযোগ দিন', 'স্বাস্থ্যসেবা গুরুত্বপূর্ণ', 'মেজাজের পরিবর্তনে সচেতন থাকুন'],
    savedToast: 'উপসর্গ সংরক্ষিত!', periodToast: 'মাসিক দর্ज করা হয়েছে 🩸'
  },
  ja: {
    welcomeTitle: 'CycleSyncへようこそ', welcomeDesc: '正確な予測のためにサイクルを設定しましょう。',
    startBtn: '始める', step2Title: '最後の生理はいつ始まりましたか？',
    step2Desc: '最近の生理の初日を選択してください。',
    step3Title: 'サイクルの長さは？', step3Desc: '多くの人は21〜35日です。',
    step3bTitle: '生理は何日間続きますか？', step3bDesc: 'ほとんどは3〜7日間です。',
    nextBtn: '次へ →', saveBtn: '保存 →',
    navHome: 'ホーム', navCalendar: 'カレンダー', navSymptoms: '症状', navSettings: '設定',
    quickLog: 'クイックログ', flow: '経血量', mood: '気分', pain: '痛み', energy: 'エネルギー',
    todaysTips: '今日のヒント', nextPeriod: '次の生理', ovulation: '排卵', days: '日',
    periodStarted: '🩸 生理が始まった', periodLogged: '✓ 今日記録済み',
    logSymptoms: '症状を記録', date: '日付', notes: 'メモ', saveSymptoms: '症状を保存',
    settings: '設定', theme: 'テーマ', supportDesc: 'CycleSyncは無料です。コーヒー一杯のサポートをお願いします ☕',
    period: '生理', fertile: '妊娠可能', day: '日',
    flowNone: 'なし', flowLight: '少ない', flowMedium: '普通', flowHeavy: '多い',
    moodGreat: '😀 最高', moodGood: '🙂 良い', moodOkay: '😐 普通', moodLow: '😔 悪い', moodBad: '😩 とても悪い',
    energyHigh: '⚡⚡⚡ 高い', energyMedium: '⚡⚡ 普通', energyLow: '⚡ 低い', energyNone: '✖️ なし',
    headache: '頭痛', cramps: '生理痛', backPain: '腰痛', bloating: 'お腹の張り',
    breastTenderness: '胸の張り', acne: 'ニキビ', insomnia: '不眠', cravings: '食欲増加',
    phaseMenstrual: '月経期', phaseFollicular: '卵胞期', phaseOvulation: '排卵期', phaseLuteal: '黄体期',
    tipsM: ['必要なときは休んでください', '水分補給と保温を心がけて', '鉄分の多い食品が助けになります'],
    tipsF: ['エネルギーが上昇中 — 新しいプロジェクトに最適', 'クリエイティブな作業に集中して', '社交活動に最適な時期'],
    tipsO: ['エネルギーのピーク — 運動に最適', 'コミュニケーション能力が向上', '重要な会議に最適な時期'],
    tipsL: ['詳細作業に集中して', 'セルフケアが大切', '気分の変化に注意して'],
    savedToast: '症状を記録しました！', periodToast: '生理を記録しました 🩸'
  },
  ko: {
    welcomeTitle: 'CycleSync에 오신 것을 환영합니다', welcomeDesc: '정확한 예측을 위해 사이클을 설정해 드릴게요.',
    startBtn: '시작하기', step2Title: '마지막 생리는 언제 시작되었나요?',
    step2Desc: '가장 최근 생리의 첫째 날을 선택하세요.',
    step3Title: '사이클 길이는 얼마나 되나요?', step3Desc: '대부분 21-35일입니다.',
    step3bTitle: '생리는 며칠 동안 지속되나요?', step3bDesc: '대부분 3-7일 지속됩니다.',
    nextBtn: '다음 →', saveBtn: '저장 →',
    navHome: '홈', navCalendar: '달력', navSymptoms: '증상', navSettings: '설정',
    quickLog: '빠른 기록', flow: '혈량', mood: '기분', pain: '통증', energy: '에너지',
    todaysTips: '오늘의 팁', nextPeriod: '다음 생리', ovulation: '배란', days: '일',
    periodStarted: '🩸 생리 시작', periodLogged: '✓ 오늘 기록됨',
    logSymptoms: '증상 기록', date: '날짜', notes: '메모', saveSymptoms: '증상 저장',
    settings: '설정', theme: '테마', supportDesc: 'CycleSync는 무료입니다. 커피 한 잔 후원해 주세요 ☕',
    period: '생리', fertile: '가임기', day: '일',
    flowNone: '없음', flowLight: '적음', flowMedium: '보통', flowHeavy: '많음',
    moodGreat: '😀 최고', moodGood: '🙂 좋음', moodOkay: '😐 보통', moodLow: '😔 나쁨', moodBad: '😩 매우 나쁨',
    energyHigh: '⚡⚡⚡ 높음', energyMedium: '⚡⚡ 보통', energyLow: '⚡ 낮음', energyNone: '✖️ 없음',
    headache: '두통', cramps: '생리통', backPain: '허리 통증', bloating: '복부 팽만',
    breastTenderness: '유방 압통', acne: '여드름', insomnia: '불면증', cravings: '식욕 증가',
    phaseMenstrual: '월경기', phaseFollicular: '난포기', phaseOvulation: '배란기', phaseLuteal: '황체기',
    tipsM: ['필요할 때 쉬세요', '수분 보충과 보온에 신경 쓰세요', '철분이 풍부한 음식이 도움이 됩니다'],
    tipsF: ['에너지 상승 중 — 새 프로젝트에 최적', '창의적인 작업에 집중하세요', '사교 활동에 좋은 시기'],
    tipsO: ['에너지 최고점 — 운동에 최적', '소통 능력이 향상됩니다', '중요한 미팅에 좋은 시기'],
    tipsL: ['세부 작업에 집중하세요', '자기 관리가 중요합니다', '기분 변화에 주의하세요'],
    savedToast: '증상이 기록되었습니다!', periodToast: '생리가 기록되었습니다 🩸'
  },
  zh: {
    welcomeTitle: '欢迎使用 CycleSync', welcomeDesc: '让我们设置您的周期，以便给您准确的预测。',
    startBtn: '开始', step2Title: '您上次月经是什么时候开始的？',
    step2Desc: '请选择您最近一次月经的第一天。',
    step3Title: '您的周期多长？', step3Desc: '大多数人是21-35天。',
    step3bTitle: '您的月经持续多少天？', step3bDesc: '大多数持续3-7天。',
    nextBtn: '下一步 →', saveBtn: '保存 →',
    navHome: '首页', navCalendar: '日历', navSymptoms: '症状', navSettings: '设置',
    quickLog: '快速记录', flow: '经量', mood: '心情', pain: '疼痛', energy: '精力',
    todaysTips: '今日建议', nextPeriod: '下次月经', ovulation: '排卵', days: '天',
    periodStarted: '🩸 月经已开始', periodLogged: '✓ 今日已记录',
    logSymptoms: '记录症状', date: '日期', notes: '备注', saveSymptoms: '保存症状',
    settings: '设置', theme: '主题', supportDesc: 'CycleSync 永久免费。如果它对您有帮助，请支持我们 ☕',
    period: '月经', fertile: '排卵窗口', day: '天',
    flowNone: '无', flowLight: '少量', flowMedium: '中等', flowHeavy: '量多',
    moodGreat: '😀 非常好', moodGood: '🙂 好', moodOkay: '😐 一般', moodLow: '😔 不好', moodBad: '😩 很差',
    energyHigh: '⚡⚡⚡ 充沛', energyMedium: '⚡⚡ 一般', energyLow: '⚡ 不足', energyNone: '✖️ 无',
    headache: '头痛', cramps: '痛经', backPain: '腰痛', bloating: '腹胀',
    breastTenderness: '乳房胀痛', acne: '痤疮', insomnia: '失眠', cravings: '食欲增加',
    phaseMenstrual: '月经期', phaseFollicular: '卵泡期', phaseOvulation: '排卵期', phaseLuteal: '黄体期',
    tipsM: ['需要时请好好休息', '保持水分充足，注意保暖', '富含铁质的食物有助于补充流失的铁'],
    tipsF: ['能量正在上升 — 适合开始新项目', '专注于创意工作', '非常适合社交活动'],
    tipsO: ['能量达到顶峰 — 适合体育活动', '沟通能力增强', '适合重要会议或演示'],
    tipsL: ['专注于细节工作', '自我护理很重要', '注意情绪变化'],
    savedToast: '症状已记录！', periodToast: '月经已记录 🩸'
  },
  it: {
    welcomeTitle: 'Benvenuta su CycleSync', welcomeDesc: 'Configuriamo il tuo ciclo per previsioni accurate.',
    startBtn: 'Inizia', step2Title: 'Quando è iniziato il tuo ultimo ciclo?',
    step2Desc: 'Scegli il primo giorno del tuo ciclo più recente.',
    step3Title: 'Quanto dura il tuo ciclo?', step3Desc: 'La maggior parte: 21-35 giorni.',
    step3bTitle: 'Quanto dura il tuo ciclo mestruale?', step3bDesc: 'La maggior parte dura 3-7 giorni.',
    nextBtn: 'Avanti →', saveBtn: 'Salva →',
    navHome: 'Home', navCalendar: 'Calendario', navSymptoms: 'Sintomi', navSettings: 'Impostazioni',
    quickLog: 'Registrazione rapida', flow: 'Flusso', mood: 'Umore', pain: 'Dolore', energy: 'Energia',
    todaysTips: 'Consigli di oggi', nextPeriod: 'Prossimo ciclo', ovulation: 'Ovulazione', days: 'giorni',
    periodStarted: '🩸 Ciclo iniziato', periodLogged: '✓ Registrato oggi',
    logSymptoms: 'Registra sintomi', date: 'Data', notes: 'Note', saveSymptoms: 'Salva sintomi',
    settings: 'Impostazioni', theme: 'Tema', supportDesc: 'CycleSync è gratuito e lo sarà sempre. Un caffè aiuta molto ☕',
    period: 'Ciclo', fertile: 'Fertile', day: 'Giorno',
    flowNone: 'Nessuno', flowLight: 'Leggero', flowMedium: 'Moderato', flowHeavy: 'Abbondante',
    moodGreat: '😀 Eccellente', moodGood: '🙂 Bene', moodOkay: '😐 Così così', moodLow: '😔 Male', moodBad: '😩 Pessimo',
    energyHigh: '⚡⚡⚡ Alta', energyMedium: '⚡⚡ Media', energyLow: '⚡ Bassa', energyNone: '✖️ Nessuna',
    headache: 'Mal di testa', cramps: 'Crampi', backPain: 'Mal di schiena', bloating: 'Gonfiore',
    breastTenderness: 'Sensibilità al seno', acne: 'Acne', insomnia: 'Insonnia', cravings: 'Voglie',
    phaseMenstrual: 'Mestruale', phaseFollicular: 'Follicolare', phaseOvulation: 'Ovulazione', phaseLuteal: 'Luteale',
    tipsM: ['Riposati quando necessario', 'Mantieniti idratata e al caldo', 'Gli alimenti ricchi di ferro aiutano'],
    tipsF: ["L'energia aumenta — ottimo per nuovi progetti", 'Concentrati sul lavoro creativo', 'Ottimo per le attività sociali'],
    tipsO: ["Picco di energia — ottimo per l'attività fisica", 'Capacità comunicative migliorate', 'Buon momento per riunioni importanti'],
    tipsL: ['Concentrati sui compiti dettagliati', "L'autocura è importante", "Sii consapevole dei cambiamenti d'umore"],
    savedToast: 'Sintomi salvati!', periodToast: 'Ciclo registrato 🩸'
  }
};

// Language config
const LANGS = [
  {code:'en', flag:'🇬🇧', label:'EN'},
  {code:'ru', flag:'🇷🇺', label:'RU'},
  {code:'es', flag:'🇪🇸', label:'ES'},
  {code:'pt', flag:'🇧🇷', label:'PT'},
  {code:'fr', flag:'🇫🇷', label:'FR'},
  {code:'de', flag:'🇩🇪', label:'DE'},
  {code:'hi', flag:'🇮🇳', label:'HI'},
  {code:'id', flag:'🇮🇩', label:'ID'},
  {code:'bn', flag:'🇧🇩', label:'BN'},
  {code:'ja', flag:'🇯🇵', label:'JA'},
  {code:'ko', flag:'🇰🇷', label:'KO'},
  {code:'it', flag:'🇮🇹', label:'IT'},
  {code:'zh', flag:'', label:'中文(简体)'}
];

// ===== CYCLE ENGINE =====
function addDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getPhaseInfo(userData) {
  var lastPeriod = new Date(userData.lastPeriodStart);
  var cycleLen = userData.cycleLength || 28;
  var periodLen = userData.periodLength || 5;
  var today = new Date();
  today.setHours(0,0,0,0);
  var daysSince = Math.floor((today - lastPeriod) / 86400000);
  var cycleDay = (daysSince % cycleLen) + 1;
  var progress, phase;

  if (cycleDay <= periodLen) {
    phase = 'menstrual'; progress = cycleDay / periodLen;
  } else if (cycleDay < cycleLen - 14) {
    phase = 'follicular'; progress = (cycleDay - periodLen) / ((cycleLen - 14) - periodLen);
  } else if (cycleDay < cycleLen - 11) {
    phase = 'ovulation'; progress = (cycleDay - (cycleLen - 14)) / 3;
  } else {
    phase = 'luteal'; progress = (cycleDay - (cycleLen - 11)) / 11;
  }

  var nextPeriodDate = addDays(lastPeriod, Math.floor(daysSince / cycleLen) * cycleLen + cycleLen);
  var daysUntilPeriod = Math.ceil((nextPeriodDate - today) / 86400000);
  var ovulationDate = addDays(nextPeriodDate, -14);
  var daysUntilOvulation = Math.ceil((ovulationDate - today) / 86400000);

  return { phase, cycleDay, progress: Math.min(1, Math.max(0, progress)), daysUntilPeriod, daysUntilOvulation, nextPeriodDate, ovulationDate };
}

// ===== ONBOARDING =====
var cycleVal = 28, periodVal = 5;

function obNext(from, to) {
  document.getElementById('ob' + from).classList.remove('active');
  document.getElementById('ob' + to).classList.add('active');
  if (to === 2) {
    var d = document.getElementById('ob-date');
    if (!d.value) d.value = new Date().toISOString().split('T')[0];
  }
}

function adjustCycle(delta) {
  cycleVal = Math.min(45, Math.max(21, cycleVal + delta));
  document.getElementById('cycle-display').textContent = cycleVal + ' ' + t('days');
}

function adjustPeriod(delta) {
  periodVal = Math.min(10, Math.max(2, periodVal + delta));
  document.getElementById('period-display').textContent = periodVal + ' ' + t('days');
}

function saveOnboarding() {
  var dateVal = document.getElementById('ob-date').value;
  if (!dateVal) { dateVal = new Date().toISOString().split('T')[0]; }
  var data = {
    lastPeriodStart: new Date(dateVal).toISOString(),
    cycleLength: cycleVal,
    periodLength: periodVal,
    symptoms: {},
    onboardingComplete: true,
    dateCreated: new Date().toISOString()
  };
  setData(data);
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('app').classList.add('visible');
  initApp();
}

// ===== LANGUAGE =====
function t(key) {
  var lang = getLang();
  return (T[lang] && T[lang][key]) || T['en'][key] || key;
}

function applyLanguage() {
  var lang = getLang();
  var tr = T[lang] || T['en'];
  document.documentElement.lang = lang;

  // Onboarding
  setText('ob-welcome-title', tr.welcomeTitle);
  setText('ob-welcome-desc', tr.welcomeDesc);
  setText('ob-start-btn', tr.startBtn);
  setText('ob-step2-title', tr.step2Title);
  setText('ob-step2-desc', tr.step2Desc);
  setText('ob-next2', tr.nextBtn);
  setText('ob-step3-title', tr.step3Title);
  setText('ob-step3-desc', tr.step3Desc);
  setText('ob-next3', tr.nextBtn);
  setText('ob-step3b-title', tr.step3bTitle);
  setText('ob-step3b-desc', tr.step3bDesc);
  setText('ob-save-btn', tr.saveBtn);

  // Nav
  setText('lbl-nav-home', tr.navHome);
  setText('lbl-nav-calendar', tr.navCalendar);
  setText('lbl-nav-symptoms', tr.navSymptoms);
  setText('lbl-nav-settings', tr.navSettings);

  // Dashboard
  setText('lbl-quick-log', tr.quickLog);
  setText('lbl-flow', tr.flow);
  setText('lbl-mood', tr.mood);
  setText('lbl-pain', tr.pain);
  setText('lbl-energy', tr.energy);
  setText('lbl-todays-tips', tr.todaysTips);
  setText('lbl-next-period', tr.nextPeriod);
  setText('lbl-ovulation', tr.ovulation);
  setText('ring-day-label', tr.day);
  setText('period-btn-text', tr.periodStarted);
  setText('card-countdown-sub', tr.days);
  setText('card-ovulation-sub', tr.days);

  // Calendar
  setText('lbl-period', tr.period);
  setText('lbl-fertile', tr.fertile);
  setText('lbl-ovulation-leg', tr.ovulation);

  // Symptoms
  setText('lbl-log-symptoms', tr.logSymptoms);
  setText('lbl-date', tr.date);
  setText('lbl-flow-s', tr.flow);
  setText('lbl-mood-s', tr.mood);
  setText('lbl-energy-s', tr.energy);
  setText('lbl-symptoms-s', tr.flowNone !== undefined ? 'Symptoms' : 'Symptoms');
  setText('lbl-notes', tr.notes);
  setText('lbl-save-btn', tr.saveSymptoms);

  // Settings
  setText('lbl-settings', tr.settings);
  setText('lbl-support-desc', tr.supportDesc);

  // Update stepper displays
  document.getElementById('cycle-display').textContent = cycleVal + ' ' + tr.days;
  document.getElementById('period-display').textContent = periodVal + ' ' + tr.days;

  // Language flag in topbar
  var langData = LANGS.find(function(l) { return l.code === lang; });
  if (langData) setText('lang-flag', langData.flag + ' ' + langData.label);

  // Rebuild symptom chips
  buildSymptomChips();
}

function setText(id, val) {
  var el = document.getElementById(id);
  if (el && val !== undefined) el.textContent = val;
}

function buildLangGrid() {
  var grid = document.getElementById('lang-grid');
  if (!grid) return;
  var currentLang = getLang();
  grid.innerHTML = '';
  LANGS.forEach(function(l) {
    var btn = document.createElement('button');
    btn.className = 'lang-btn' + (l.code === currentLang ? ' active' : '');
    btn.textContent = l.flag + ' ' + l.label;
    btn.onclick = function() {
      setLang(l.code);
      document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyLanguage();
      updateDashboard();
    };
    grid.appendChild(btn);
  });
}

// ===== SCREENS =====
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
  var screen = document.getElementById('screen-' + name);
  var navBtn = document.getElementById('nav-' + name);
  if (screen) screen.classList.add('active');
  if (navBtn) navBtn.classList.add('active');
  if (name === 'calendar') renderCalendar();
  if (name === 'symptoms') { document.getElementById('symptom-date').value = new Date().toISOString().split('T')[0]; }
  if (name === 'settings') buildLangGrid();
  window.scrollTo(0,0);
}

// ===== DASHBOARD =====
function updateDashboard() {
  var data = getData();
  if (!data) return;
  var info = getPhaseInfo(data);
  var tr = T[getLang()] || T['en'];

  // Phase names
  var phaseNames = {
    menstrual: tr.phaseMenstrual,
    follicular: tr.phaseFollicular,
    ovulation: tr.phaseOvulation,
    luteal: tr.phaseLuteal
  };

  setText('ring-phase', phaseNames[info.phase] || info.phase);
  setText('ring-day', info.cycleDay);
  setText('card-countdown', info.daysUntilPeriod);
  setText('card-ovulation', Math.max(0, info.daysUntilOvulation));

  // Ring animation
  var circumference = 553;
  var offset = circumference - (info.progress * circumference);
  var ring = document.getElementById('ring-fill');
  if (ring) {
    setTimeout(function() { ring.style.strokeDashoffset = offset; }, 100);
  }

  // Tips
  var tipsKey = { menstrual: 'tipsM', follicular: 'tipsF', ovulation: 'tipsO', luteal: 'tipsL' }[info.phase] || 'tipsF';
  var tips = tr[tipsKey] || T['en'][tipsKey];
  var container = document.getElementById('tips-container');
  if (container) {
    container.innerHTML = tips.map(function(tip) {
      return '<div class="tip-item"><div class="tip-dot"></div><div class="tip-text">' + tip + '</div></div>';
    }).join('');
  }

  // Period button
  var today = new Date().toISOString().split('T')[0];
  var loggedToday = data.symptoms && data.symptoms[today] && data.symptoms[today].flow && data.symptoms[today].flow !== 'none';
  var btn = document.getElementById('period-start-btn');
  var btnText = document.getElementById('period-btn-text');
  if (btn && btnText) {
    if (loggedToday) {
      btn.classList.add('logged');
      btnText.textContent = tr.periodLogged;
    } else {
      btn.classList.remove('logged');
      btnText.textContent = tr.periodStarted;
    }
  }
}

function logPeriodStart() {
  var data = getData();
  if (!data) return;
  var today = new Date().toISOString().split('T')[0];
  if (!data.symptoms) data.symptoms = {};
  data.symptoms[today] = Object.assign(data.symptoms[today] || {}, { flow: 'medium', date: new Date().toISOString() });
  data.lastPeriodStart = new Date().toISOString();
  setData(data);
  updateDashboard();
  showToast(t('periodToast'));
}

// ===== CALENDAR =====
var calYear = new Date().getFullYear();
var calMonth = new Date().getMonth();

function changeMonth(delta) {
  calMonth += delta;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function renderCalendar() {
  var data = getData();
  var grid = document.getElementById('cal-grid');
  var monthLabel = document.getElementById('cal-month-label');
  if (!grid) return;

  var lang = getLang();
  var monthNames = {
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    ru: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    pt: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    hi: ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितम्बर','अक्टूबर','नवम्बर','दिसम्बर'],
    id: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
    ja: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    ko: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    it: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  };

  var weekdays = {
    en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    ru: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    es: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
    pt: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    fr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    de: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    hi: ['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'],
    id: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
    ja: ['日','月','火','水','木','金','土'],
    ko: ['일','월','화','수','목','금','토'],
    it: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab']
  };

  var mNames = monthNames[lang] || monthNames['en'];
  var wDays = weekdays[lang] || weekdays['en'];
  monthLabel.textContent = mNames[calMonth] + ' ' + calYear;

  grid.innerHTML = '';
  wDays.forEach(function(d) {
    var el = document.createElement('div');
    el.className = 'cal-weekday';
    el.textContent = d;
    grid.appendChild(el);
  });

  var firstDay = new Date(calYear, calMonth, 1).getDay();
  var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  var today = new Date();

  // Get cycle info for highlighting
  var periodDays = [], fertileDays = [], ovulationDays = [];
  if (data) {
    var cycleLen = data.cycleLength || 28;
    var periodLen = data.periodLength || 5;
    var lastPeriod = new Date(data.lastPeriodStart);

    for (var offset = -cycleLen; offset < cycleLen * 3; offset += cycleLen) {
      var pStart = addDays(lastPeriod, offset);
      for (var p = 0; p < periodLen; p++) {
        var pd = addDays(pStart, p);
        if (pd.getMonth() === calMonth && pd.getFullYear() === calYear) {
          periodDays.push(pd.getDate());
        }
      }
      var ovDay = addDays(pStart, cycleLen - 14);
      if (ovDay.getMonth() === calMonth && ovDay.getFullYear() === calYear) {
        ovulationDays.push(ovDay.getDate());
      }
      for (var f = -5; f <= 1; f++) {
        var fd = addDays(ovDay, f);
        if (fd.getMonth() === calMonth && fd.getFullYear() === calYear) {
          fertileDays.push(fd.getDate());
        }
      }
    }
  }

  for (var i = 0; i < firstDay; i++) {
    var empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (var day = 1; day <= daysInMonth; day++) {
    var el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = day;
    if (day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()) el.classList.add('today');
    if (ovulationDays.indexOf(day) !== -1) el.classList.add('ovulation');
    else if (periodDays.indexOf(day) !== -1) el.classList.add('period');
    else if (fertileDays.indexOf(day) !== -1) el.classList.add('fertile');
    grid.appendChild(el);
  }
}

// ===== SYMPTOMS =====
var flowSel = 'none', moodSel = 'good', energySel = 'medium', symptomsSel = [];

function buildSymptomChips() {
  var tr = T[getLang()] || T['en'];

  var flowChips = document.getElementById('flow-chips');
  if (flowChips) {
    flowChips.innerHTML = '';
    [['none', tr.flowNone], ['light', tr.flowLight], ['medium', tr.flowMedium], ['heavy', tr.flowHeavy]].forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = 'radio-chip' + (flowSel === item[0] ? ' selected' : '');
      btn.textContent = item[1];
      btn.onclick = function() {
        flowSel = item[0];
        flowChips.querySelectorAll('.radio-chip').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
      };
      flowChips.appendChild(btn);
    });
  }

  var moodChips = document.getElementById('mood-chips');
  if (moodChips) {
    moodChips.innerHTML = '';
    [['great', tr.moodGreat], ['good', tr.moodGood], ['okay', tr.moodOkay], ['low', tr.moodLow], ['bad', tr.moodBad]].forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = 'radio-chip' + (moodSel === item[0] ? ' selected' : '');
      btn.textContent = item[1];
      btn.onclick = function() {
        moodSel = item[0];
        moodChips.querySelectorAll('.radio-chip').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
      };
      moodChips.appendChild(btn);
    });
  }

  var energyChips = document.getElementById('energy-chips');
  if (energyChips) {
    energyChips.innerHTML = '';
    [['high', tr.energyHigh], ['medium', tr.energyMedium], ['low', tr.energyLow], ['none', tr.energyNone]].forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = 'radio-chip' + (energySel === item[0] ? ' selected' : '');
      btn.textContent = item[1];
      btn.onclick = function() {
        energySel = item[0];
        energyChips.querySelectorAll('.radio-chip').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
      };
      energyChips.appendChild(btn);
    });
  }

  var sympChips = document.getElementById('symptom-chips');
  if (sympChips) {
    sympChips.innerHTML = '';
    [['headache', tr.headache], ['cramps', tr.cramps], ['backPain', tr.backPain],
     ['bloating', tr.bloating], ['breastTenderness', tr.breastTenderness],
     ['acne', tr.acne], ['insomnia', tr.insomnia], ['cravings', tr.cravings]].forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = 'check-chip' + (symptomsSel.indexOf(item[0]) !== -1 ? ' selected' : '');
      btn.textContent = item[1];
      btn.onclick = function() {
        var idx = symptomsSel.indexOf(item[0]);
        if (idx === -1) { symptomsSel.push(item[0]); btn.classList.add('selected'); }
        else { symptomsSel.splice(idx, 1); btn.classList.remove('selected'); }
      };
      sympChips.appendChild(btn);
    });
  }
}

function saveSymptoms() {
  var data = getData();
  if (!data) return;
  var dateKey = document.getElementById('symptom-date').value || new Date().toISOString().split('T')[0];
  if (!data.symptoms) data.symptoms = {};
  var entry = { flow: flowSel, mood: moodSel, energy: energySel, date: new Date(dateKey).toISOString() };
  symptomsSel.forEach(function(s) { entry[s] = true; });
  var notes = document.getElementById('notes-input').value;
  if (notes) entry.notes = notes;
  data.symptoms[dateKey] = entry;
  setData(data);
  showToast(t('savedToast'));
  showScreen('home');
  updateDashboard();
}

// ===== SETTINGS =====
function setTheme(theme, btn) {
  document.querySelectorAll('.theme-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  localStorage.setItem('cyclesync_theme', theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  var root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--cream', '#1A1025');
    root.style.setProperty('--text', '#F0EAF5');
    root.style.setProperty('--text-light', '#9A8AAA');
    root.style.setProperty('--card', 'rgba(45,31,61,0.95)');
    root.style.setProperty('--border', 'rgba(255,107,139,0.2)');
    document.body.style.background = '#1A1025';
  } else if (theme === 'calm') {
    root.style.setProperty('--rose', '#7B9CFF');
    root.style.setProperty('--rose-light', '#E4ECFF');
    root.style.setProperty('--plum', '#1F2D5A');
    root.style.setProperty('--plum-mid', '#2A3D6E');
  } else {
    root.style.setProperty('--cream', '#FFF8F5');
    root.style.setProperty('--text', '#1A1025');
    root.style.setProperty('--text-light', '#7B6B8A');
    root.style.setProperty('--card', 'rgba(255,255,255,0.95)');
    root.style.setProperty('--border', 'rgba(255,107,139,0.15)');
    root.style.setProperty('--rose', '#FF6B8B');
    root.style.setProperty('--rose-light', '#FFE4EC');
    root.style.setProperty('--plum', '#2D1F3D');
    document.body.style.background = '#FFF8F5';
  }
}

function setSize(size, btn) {
  document.querySelectorAll('.size-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  localStorage.setItem('cyclesync_size', size);
}

// ===== TOAST =====
function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

// ===== PWA INSTALL =====
var deferredPrompt = null;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(function() {
    document.getElementById('install-banner').classList.add('show');
  }, 3000);
});

document.getElementById('install-btn').addEventListener('click', function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function() {
      deferredPrompt = null;
      document.getElementById('install-banner').classList.remove('show');
    });
  }
});

// ===== iOS INSTALL PROMPT =====
function checkiOSInstall() {
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var isStandalone = window.navigator.standalone;
  var dismissed = localStorage.getItem('ios_banner_dismissed');
  if (isIOS && !isStandalone && !dismissed) {
    setTimeout(function() {
      document.getElementById('ios-banner').classList.add('show');
    }, 3000);
  }
}

// Service worker registered in index.html

// ===== NOTIFICATIONS =====
function getNotifSettings() {
  try { return JSON.parse(localStorage.getItem('cyclesync_notif') || 'null'); } catch { return null; }
}
function saveNotifSettings(s) {
  localStorage.setItem('cyclesync_notif', JSON.stringify(s));
}

function requestNotifications() {
  if (!('Notification' in window) || !navigator.serviceWorker) {
    showToast(t('notifDenied'));
    return;
  }
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      var settings = getNotifSettings() || {};
      settings.enabled = true;
      settings.notifPeriod = true;
      settings.notifOvulation = true;
      settings.notifDaily = false;
      settings.notifHour = 9;
      settings.notifMin = 0;
      saveNotifSettings(settings);
      scheduleAllNotifications();
      showToast(t('notifEnabled'));
      updateNotifUI();
      hideNotifPrompt();
    } else {
      showToast(t('notifDenied'));
    }
  });
}

function scheduleAllNotifications() {
  var settings = getNotifSettings();
  if (!settings || !settings.enabled) return;
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;

  var data = getData();
  if (!data) return;

  var phase = calcPhase(data);

  navigator.serviceWorker.controller.postMessage({
    type: 'SCHEDULE_NOTIFICATIONS',
    payload: {
      enabled: true,
      lang: getLang(),
      nextPeriod: data.nextPeriod || null,
      nextOvulation: data.nextOvulation || null,
      notifPeriod: settings.notifPeriod !== false,
      notifOvulation: settings.notifOvulation !== false,
      notifDaily: settings.notifDaily === true,
      notifHour: settings.notifHour || 9,
      notifMin: settings.notifMin || 0
    }
  });
}

function cancelNotifications() {
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;
  navigator.serviceWorker.controller.postMessage({ type: 'CANCEL_NOTIFICATIONS' });
}

function updateNotifUI() {
  var settings = getNotifSettings();
  var enabled = settings && settings.enabled && Notification.permission === 'granted';

  // Update settings button
  var btn = document.getElementById('notif-toggle-btn');
  if (btn) {
    btn.textContent = enabled ? t('notifEnabled') : t('notifDisabled');
    btn.style.background = enabled ? '#4caf50' : 'var(--rose)';
  }

  // Update toggles
  var periodToggle = document.getElementById('notif-period-toggle');
  var ovulToggle = document.getElementById('notif-ovul-toggle');
  var dailyToggle = document.getElementById('notif-daily-toggle');
  var timeInput = document.getElementById('notif-time-input');
  var notifSection = document.getElementById('notif-settings-section');

  if (notifSection) notifSection.style.display = enabled ? 'block' : 'none';
  if (settings) {
    if (periodToggle) periodToggle.checked = settings.notifPeriod !== false;
    if (ovulToggle) ovulToggle.checked = settings.notifOvulation !== false;
    if (dailyToggle) dailyToggle.checked = settings.notifDaily === true;
    if (timeInput) {
      var h = String(settings.notifHour || 9).padStart(2, '0');
      var m = String(settings.notifMin || 0).padStart(2, '0');
      timeInput.value = h + ':' + m;
    }
  }
}

function saveNotifPrefs() {
  var settings = getNotifSettings() || {};
  var periodToggle = document.getElementById('notif-period-toggle');
  var ovulToggle = document.getElementById('notif-ovul-toggle');
  var dailyToggle = document.getElementById('notif-daily-toggle');
  var timeInput = document.getElementById('notif-time-input');

  if (periodToggle) settings.notifPeriod = periodToggle.checked;
  if (ovulToggle) settings.notifOvulation = ovulToggle.checked;
  if (dailyToggle) settings.notifDaily = dailyToggle.checked;
  if (timeInput && timeInput.value) {
    var parts = timeInput.value.split(':');
    settings.notifHour = parseInt(parts[0]) || 9;
    settings.notifMin = parseInt(parts[1]) || 0;
  }
  saveNotifSettings(settings);
  scheduleAllNotifications();
  showToast(t('notifSaved'));
}

function hideNotifPrompt() {
  var prompt = document.getElementById('notif-prompt');
  if (prompt) prompt.style.display = 'none';
  localStorage.setItem('notif_prompt_dismissed', '1');
}

function showNotifPromptIfNeeded() {
  var dismissed = localStorage.getItem('notif_prompt_dismissed');
  var settings = getNotifSettings();
  var alreadyEnabled = settings && settings.enabled && Notification.permission === 'granted';
  if (!dismissed && !alreadyEnabled && 'Notification' in window) {
    setTimeout(function() {
      var prompt = document.getElementById('notif-prompt');
      if (prompt) prompt.style.display = 'block';
    }, 5000);
  }
}

// ===== INIT =====
function initApp() {
  applyLanguage();
  buildLangGrid();
  buildSymptomChips();
  updateDashboard();
  renderCalendar();
  var savedTheme = localStorage.getItem('cyclesync_theme');
  if (savedTheme) applyTheme(savedTheme);
  updateNotifUI();
  scheduleAllNotifications();
  showNotifPromptIfNeeded();
}

window.addEventListener('DOMContentLoaded', function() {
  checkiOSInstall();
  var data = getData();
  if (data && data.onboardingComplete) {
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('app').classList.add('visible');
    initApp();
  } else {
    applyLanguage();
  }
});
