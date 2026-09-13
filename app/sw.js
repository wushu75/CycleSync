const CACHE_NAME = 'cyclesync-v3';

const ASSETS = [
  '/CycleSync/app/',
  '/CycleSync/app/index.html',
  '/CycleSync/app/app.js',
  '/CycleSync/app/manifest.json',
  '/CycleSync/app/icon128.png',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'
];

// ===== NOTIFICATION MESSAGES — ALL 13 LANGUAGES =====
const NOTIF_MSGS = {
  en: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Your period is expected in {days} days. Time to prepare.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Your period may start today. Take care of yourself.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Your fertile window starts tomorrow. Stay aware.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'Don't forget to log your symptoms today.' }
  },
  ru: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Ожидаются месячные через {days} дн. Время подготовиться.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Сегодня могут начаться месячные. Заботьтесь о себе.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Завтра начинается фертильное окно.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'Не забудьте записать симптомы сегодня.' }
  },
  es: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Tu menstruación se espera en {days} días. Prepárate.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Tu menstruación puede comenzar hoy. Cuídate.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Tu ventana fértil comienza mañana.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'No olvides registrar tus síntomas hoy.' }
  },
  pt: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Sua menstruação é esperada em {days} dias. Prepare-se.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Sua menstruação pode começar hoje. Cuide-se.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Sua janela fértil começa amanhã.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'Não esqueça de registrar seus sintomas hoje.' }
  },
  fr: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Vos règles sont prévues dans {days} jours. Préparez-vous.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Vos règles peuvent commencer aujourd'hui. Prenez soin de vous.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Votre fenêtre fertile commence demain.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'N'oubliez pas de noter vos symptômes aujourd'hui.' }
  },
  de: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Ihre Periode wird in {days} Tagen erwartet. Zeit zur Vorbereitung.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Ihre Periode könnte heute beginnen. Passen Sie auf sich auf.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Ihr fruchtbares Fenster beginnt morgen.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'Vergessen Sie nicht, heute Ihre Symptome zu notieren.' }
  },
  hi: {
    periodSoon:  { title: 'CycleSync 🌸', body: '{days} दिनों में माहवारी आने की संभावना है। तैयार रहें।' },
    periodToday: { title: 'CycleSync 🩸', body: 'आज माहवारी शुरू हो सकती है। अपना ख्याल रखें।' },
    ovulation:   { title: 'CycleSync 🌿', body: 'कल से आपकी फर्टाइल विंडो शुरू होती है।' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'आज के लक्षण लॉग करना न भूलें।' }
  },
  id: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Haid Anda diperkirakan {days} hari lagi. Bersiaplah.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Haid Anda mungkin dimulai hari ini. Jaga diri Anda.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'Jendela subur Anda dimulai besok.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'Jangan lupa mencatat gejala Anda hari ini.' }
  },
  bn: {
    periodSoon:  { title: 'CycleSync 🌸', body: '{days} দিনের মধ্যে মাসিক হওয়ার সম্ভাবনা। প্রস্তুত থাকুন।' },
    periodToday: { title: 'CycleSync 🩸', body: 'আজ মাসিক শুরু হতে পারে। নিজের যত্ন নিন।' },
    ovulation:   { title: 'CycleSync 🌿', body: 'আগামীকাল থেকে আপনার ফার্টাইল উইন্ডো শুরু।' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'আজ লক্ষণ লগ করতে ভুলবেন না।' }
  },
  ja: {
    periodSoon:  { title: 'CycleSync 🌸', body: '{days}日後に生理が来る予定です。準備しましょう。' },
    periodToday: { title: 'CycleSync 🩸', body: '今日から生理が始まるかもしれません。お体に気をつけて。' },
    ovulation:   { title: 'CycleSync 🌿', body: '明日から妊娠可能期間が始まります。' },
    dailyLog:    { title: 'CycleSync 🌸', body: '今日の症状を記録するのをお忘れなく。' }
  },
  ko: {
    periodSoon:  { title: 'CycleSync 🌸', body: '{days}일 후 생리 예정입니다. 준비하세요.' },
    periodToday: { title: 'CycleSync 🩸', body: '오늘 생리가 시작될 수 있어요. 몸 잘 챙기세요.' },
    ovulation:   { title: 'CycleSync 🌿', body: '내일부터 가임기가 시작됩니다.' },
    dailyLog:    { title: 'CycleSync 🌸', body: '오늘 증상 기록하는 것 잊지 마세요.' }
  },
  it: {
    periodSoon:  { title: 'CycleSync 🌸', body: 'Il tuo ciclo è previsto tra {days} giorni. Preparati.' },
    periodToday: { title: 'CycleSync 🩸', body: 'Il tuo ciclo potrebbe iniziare oggi. Prenditi cura di te.' },
    ovulation:   { title: 'CycleSync 🌿', body: 'La tua finestra fertile inizia domani.' },
    dailyLog:    { title: 'CycleSync 🌸', body: 'Non dimenticare di registrare i tuoi sintomi oggi.' }
  },
  zh: {
    periodSoon:  { title: 'CycleSync 🌸', body: '您的月经预计在{days}天后到来。提前做好准备。' },
    periodToday: { title: 'CycleSync 🩸', body: '您的月经今天可能开始。好好照顾自己。' },
    ovulation:   { title: 'CycleSync 🌿', body: '您的排卵窗口明天开始。' },
    dailyLog:    { title: 'CycleSync 🌸', body: '不要忘记记录今天的症状。' }
  }
};

// ===== INSTALL =====
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset).catch(err => console.log('Cache miss:', asset, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE =====
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH =====
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) {
        fetch(e.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, response));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200) return response;
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, responseClone));
        return response;
      }).catch(() => {
        return caches.match('/CycleSync/app/index.html');
      });
    })
  );
});

// ===== MESSAGES FROM APP =====
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  // Schedule notifications from app
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATIONS') {
    scheduleNotifications(e.data.payload);
  }
  // Cancel all notifications
  if (e.data && e.data.type === 'CANCEL_NOTIFICATIONS') {
    cancelAllNotifications();
  }
});

// ===== NOTIFICATION SCHEDULING =====
var scheduledTimers = [];

function cancelAllNotifications() {
  scheduledTimers.forEach(function(t) { clearTimeout(t); });
  scheduledTimers = [];
}

function scheduleNotifications(payload) {
  cancelAllNotifications();
  if (!payload || !payload.enabled) return;

  var lang = payload.lang || 'en';
  var msgs = NOTIF_MSGS[lang] || NOTIF_MSGS['en'];
  var now = new Date();

  // Period approaching — 3 days before
  if (payload.nextPeriod && payload.notifPeriod) {
    var periodDate = new Date(payload.nextPeriod);
    var threeDaysBefore = new Date(periodDate);
    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
    threeDaysBefore.setHours(payload.notifHour || 9, 0, 0, 0);

    var msUntilPeriodWarning = threeDaysBefore - now;
    if (msUntilPeriodWarning > 0) {
      var t1 = setTimeout(function() {
        var body = msgs.periodSoon.body.replace('{days}', '3');
        self.registration.showNotification(msgs.periodSoon.title, {
          body: body,
          icon: '/CycleSync/app/icon128.png',
          badge: '/CycleSync/app/icon128.png',
          tag: 'period-soon',
          data: { url: '/CycleSync/app/' }
        });
      }, msUntilPeriodWarning);
      scheduledTimers.push(t1);
    }

    // Period day itself
    var periodDay = new Date(periodDate);
    periodDay.setHours(payload.notifHour || 9, 0, 0, 0);
    var msUntilPeriod = periodDay - now;
    if (msUntilPeriod > 0) {
      var t2 = setTimeout(function() {
        self.registration.showNotification(msgs.periodToday.title, {
          body: msgs.periodToday.body,
          icon: '/CycleSync/app/icon128.png',
          badge: '/CycleSync/app/icon128.png',
          tag: 'period-today',
          data: { url: '/CycleSync/app/' }
        });
      }, msUntilPeriod);
      scheduledTimers.push(t2);
    }
  }

  // Ovulation — day before
  if (payload.nextOvulation && payload.notifOvulation) {
    var ovulDate = new Date(payload.nextOvulation);
    var dayBeforeOvul = new Date(ovulDate);
    dayBeforeOvul.setDate(dayBeforeOvul.getDate() - 1);
    dayBeforeOvul.setHours(payload.notifHour || 9, 0, 0, 0);
    var msUntilOvul = dayBeforeOvul - now;
    if (msUntilOvul > 0) {
      var t3 = setTimeout(function() {
        self.registration.showNotification(msgs.ovulation.title, {
          body: msgs.ovulation.body,
          icon: '/CycleSync/app/icon128.png',
          badge: '/CycleSync/app/icon128.png',
          tag: 'ovulation',
          data: { url: '/CycleSync/app/' }
        });
      }, msUntilOvul);
      scheduledTimers.push(t3);
    }
  }

  // Daily log reminder — repeating
  if (payload.notifDaily) {
    scheduleDailyReminder(msgs, payload.notifHour || 20, payload.notifMin || 0);
  }
}

function scheduleDailyReminder(msgs, hour, min) {
  var now = new Date();
  var next = new Date();
  next.setHours(hour, min, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  var ms = next - now;
  var t = setTimeout(function() {
    self.registration.showNotification(msgs.dailyLog.title, {
      body: msgs.dailyLog.body,
      icon: '/CycleSync/app/icon128.png',
      badge: '/CycleSync/app/icon128.png',
      tag: 'daily-log',
      data: { url: '/CycleSync/app/' }
    });
    // Reschedule for next day
    scheduleDailyReminder(msgs, hour, min);
  }, ms);
  scheduledTimers.push(t);
}

// ===== NOTIFICATION CLICK =====
self.addEventListener('notificationclick', e => {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || '/CycleSync/app/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('/CycleSync/app') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
