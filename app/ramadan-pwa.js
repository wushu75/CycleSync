// ===== CYCLESYNC PWA — RAMADAN MODE =====
// Uses localStorage (no chrome.storage) — offline, local-first
// Compatible with existing PWA storage pattern (getData/setData on cyclesync_pwa key)

// ===== HIJRI CALENDAR (Kuwaiti algorithm) =====
var HijriCalendar = (function() {

  function gregorianToHijri(date) {
    var d = new Date(date);
    var gYear = d.getFullYear();
    var gMonth = d.getMonth() + 1;
    var gDay = d.getDate();

    // Julian Day Number
    var a = Math.floor((14 - gMonth) / 12);
    var y = gYear + 4800 - a;
    var m = gMonth + 12 * a - 3;
    var jdn = gDay + Math.floor((153 * m + 2) / 5) + 365 * y +
              Math.floor(y / 4) - Math.floor(y / 100) +
              Math.floor(y / 400) - 32045;

    // JDN to Hijri
    var l = jdn - 1948440 + 10632;
    var n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    var j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
            Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
        Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    var hMonth = Math.floor((24 * l) / 709);
    var hDay = l - Math.floor((709 * hMonth) / 24);
    var hYear = 30 * n + j - 30;

    var MONTH_NAMES_EN = [
      'Muharram','Safar','Rabi\' al-Awwal','Rabi\' al-Thani',
      'Jumada al-Awwal','Jumada al-Thani','Rajab','Sha\'ban',
      'Ramadan','Shawwal','Dhu al-Qi\'dah','Dhu al-Hijjah'
    ];
    var MONTH_NAMES_AR = [
      'محرم','صفر','ربيع الأول','ربيع الثاني',
      'جمادى الأولى','جمادى الثانية','رجب','شعبان',
      'رمضان','شوال','ذو القعدة','ذو الحجة'
    ];

    return {
      year: hYear,
      month: hMonth,
      day: hDay,
      monthName: MONTH_NAMES_EN[hMonth - 1] || '',
      monthNameAr: MONTH_NAMES_AR[hMonth - 1] || ''
    };
  }

  function isRamadan(date) {
    var h = gregorianToHijri(date);
    return h.month === 9;
  }

  function getLaylahInfo(date) {
    var h = gregorianToHijri(date);
    if (h.month !== 9) return { isLast10: false, isOddNight: false, nightNumber: null };
    var isLast10 = h.day >= 21;
    var isOddNight = isLast10 && (h.day % 2 === 1);
    return {
      isLast10: isLast10,
      isOddNight: isOddNight,
      nightNumber: isLast10 ? h.day : null
    };
  }

  return {
    gregorianToHijri: gregorianToHijri,
    isRamadan: isRamadan,
    getLaylahInfo: getLaylahInfo
  };
})();


// ===== RAMADAN DATA MANAGER (localStorage) =====
var RamadanManager = (function() {
  var STORAGE_KEY = 'cyclesync_ramadan';

  var DEFAULT_DATA = {
    enabled: false,
    fastingToday: false,
    lastFastDate: null,
    prayerReminders: false,
    suhoorTime: '05:00',
    iftarTime: '18:00',
    fastLog: {}   // { 'YYYY-MM-DD': { fasted: bool, notes: '' } }
  };

  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULT_DATA);
      return Object.assign({}, DEFAULT_DATA, JSON.parse(raw));
    } catch(e) {
      return Object.assign({}, DEFAULT_DATA);
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch(e) {
      return false;
    }
  }

  function isEnabled() {
    return loadData().enabled === true;
  }

  function toggleEnabled(val) {
    var d = loadData();
    d.enabled = val;
    saveData(d);
    return d;
  }

  function logFast(date, fasted, notes) {
    var dateKey = (date instanceof Date)
      ? date.toISOString().split('T')[0]
      : date;
    var d = loadData();
    if (!d.fastLog) d.fastLog = {};
    d.fastLog[dateKey] = { fasted: fasted, notes: notes || '' };
    if (fasted) d.lastFastDate = dateKey;
    saveData(d);
    return d;
  }

  return {
    loadData: loadData,
    saveData: saveData,
    isEnabled: isEnabled,
    toggleEnabled: toggleEnabled,
    logFast: logFast
  };
})();


// ===== RAMADAN UI =====
var RamadanUI = (function() {

  // --- Hijri badge on the dashboard hero ---
  function renderHijriBadge() {
    var existing = document.getElementById('hijri-badge');
    var today = new Date();
    var h = HijriCalendar.gregorianToHijri(today);
    var isRam = h.month === 9;

    var text = h.day + ' ' + (isRam ? h.monthNameAr || h.monthName : h.monthName) + ' ' + h.year + ' AH';
    var icon = isRam ? '☽' : '🌙';

    if (!existing) {
      var badge = document.createElement('div');
      badge.id = 'hijri-badge';
      badge.className = 'hijri-badge' + (isRam ? ' hijri-badge--ramadan' : '');
      badge.innerHTML = '<span class="hijri-badge-icon">' + icon + '</span><span class="hijri-badge-text">' + text + '</span>';

      // Insert into hero area, after the ring cards
      var heroCards = document.querySelector('.hero-cards');
      if (heroCards && heroCards.parentNode) {
        heroCards.parentNode.insertBefore(badge, heroCards.nextSibling);
      }
    } else {
      existing.className = 'hijri-badge' + (isRam ? ' hijri-badge--ramadan' : '');
      existing.innerHTML = '<span class="hijri-badge-icon">' + icon + '</span><span class="hijri-badge-text">' + text + '</span>';
    }
  }

  // --- Ramadan screen content ---
  function renderRamadanScreen() {
    var container = document.getElementById('screen-ramadan');
    if (!container) return;

    var today = new Date();
    var h = HijriCalendar.gregorianToHijri(today);
    var isRam = h.month === 9;
    var laylah = HijriCalendar.getLaylahInfo(today);
    var data = RamadanManager.loadData();
    var todayKey = today.toISOString().split('T')[0];
    var todayLog = (data.fastLog && data.fastLog[todayKey]) || null;
    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    var isAr = lang === 'ar';

    var dayLabel = isRam
      ? (isAr ? 'اليوم ' + h.day + ' من رمضان' : 'Day ' + h.day + ' of Ramadan')
      : (isAr ? h.monthNameAr + ' ' + h.day + '، ' + h.year : h.day + ' ' + h.monthName + ' ' + h.year);

    var statusBanner = '';
    if (isRam && laylah.isLast10) {
      var laylahMsg = isAr
        ? (laylah.isOddNight ? '✨ ليلة القدر المحتملة — ليلة ' + laylah.nightNumber : 'العشر الأواخر — ليلة ' + laylah.nightNumber)
        : (laylah.isOddNight ? '✨ Potential Laylat al-Qadr — Night ' + laylah.nightNumber : 'Last 10 Nights — Night ' + laylah.nightNumber);
      statusBanner = '<div class="ramadan-laylah-banner' + (laylah.isOddNight ? ' laylah-odd' : '') + '">' + laylahMsg + '</div>';
    }

    var fastToday = todayLog && todayLog.fasted;
    var fastBtnLabel = isAr
      ? (fastToday ? '✓ تم تسجيل الصيام اليوم' : '🌙 صمت اليوم')
      : (fastToday ? '✓ Fast logged for today' : '🌙 I fasted today');

    container.innerHTML = [
      '<div class="page-header">',
      '  <div class="page-title" id="lbl-ramadan-title">' + (isAr ? 'رمضان' : 'Ramadan Mode') + '</div>',
      '</div>',

      '<div class="ramadan-hero">',
      '  <div class="ramadan-date-pill">' + dayLabel + '</div>',
      statusBanner,
      '</div>',

      '<div class="ramadan-section">',
      '  <div class="ramadan-section-title">' + (isAr ? 'تسجيل الصيام' : 'Fast Tracker') + '</div>',
      '  <button id="ramadan-fast-btn" class="ramadan-fast-btn' + (fastToday ? ' logged' : '') + '" onclick="RamadanUI.toggleFastToday()">',
      '    ' + fastBtnLabel,
      '  </button>',
      '  <div class="ramadan-fast-streak" id="ramadan-streak">' + buildStreakDisplay(data) + '</div>',
      '</div>',

      isRam ? buildPrayerTimesSection(data, isAr) : buildRamadanOffSection(isAr),

      '<div class="ramadan-section">',
      '  <div class="ramadan-section-title">' + (isAr ? 'الإعدادات' : 'Settings') + '</div>',
      '  <div class="ramadan-toggle-row">',
      '    <span>' + (isAr ? 'وضع رمضان' : 'Ramadan Mode') + '</span>',
      '    <label class="notif-toggle">',
      '      <input type="checkbox" id="ramadan-mode-toggle" ' + (data.enabled ? 'checked' : '') + ' onchange="RamadanUI.onToggleMode(this.checked)">',
      '      <span class="notif-slider"></span>',
      '    </label>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildStreakDisplay(data) {
    if (!data.fastLog) return '';
    var today = new Date();
    var streak = 0;
    for (var i = 0; i < 30; i++) {
      var d = new Date(today);
      d.setDate(d.getDate() - i);
      var key = d.toISOString().split('T')[0];
      if (data.fastLog[key] && data.fastLog[key].fasted) {
        streak++;
      } else {
        break;
      }
    }
    if (streak === 0) return '';
    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    var isAr = lang === 'ar';
    return isAr ? '🔥 ' + streak + ' يوم متواصل' : '🔥 ' + streak + ' day streak';
  }

  function buildPrayerTimesSection(data, isAr) {
    return [
      '<div class="ramadan-section">',
      '  <div class="ramadan-section-title">' + (isAr ? 'أوقات السحور والإفطار' : 'Suhoor & Iftar Times') + '</div>',
      '  <div class="ramadan-time-row">',
      '    <label>' + (isAr ? 'السحور' : 'Suhoor') + '</label>',
      '    <input type="time" id="ramadan-suhoor" value="' + (data.suhoorTime || '05:00') + '" onchange="RamadanUI.saveTime(\'suhoor\', this.value)" class="ramadan-time-input">',
      '  </div>',
      '  <div class="ramadan-time-row">',
      '    <label>' + (isAr ? 'الإفطار' : 'Iftar') + '</label>',
      '    <input type="time" id="ramadan-iftar" value="' + (data.iftarTime || '18:00') + '" onchange="RamadanUI.saveTime(\'iftar\', this.value)" class="ramadan-time-input">',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function buildRamadanOffSection(isAr) {
    return [
      '<div class="ramadan-section ramadan-off-msg">',
      '  <div style="text-align:center; padding:20px 0; color:var(--text-light);">',
      '    <div style="font-size:40px; margin-bottom:12px;">☽</div>',
      '    <div style="font-size:15px; font-weight:600; margin-bottom:8px; color:var(--text);">' + (isAr ? 'رمضان لم يبدأ بعد' : 'Ramadan hasn\'t started yet') + '</div>',
      '    <div style="font-size:13px; line-height:1.6;">' + (isAr ? 'سيتم تفعيل هذه الميزة تلقائياً عند بدء رمضان.' : 'This screen will activate automatically when Ramadan begins.') + '</div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  // --- Update the nav Ramadan button indicator ---
  function updateNavIndicator() {
    var btn = document.getElementById('nav-ramadan');
    if (!btn) return;
    var today = new Date();
    var h = HijriCalendar.gregorianToHijri(today);
    if (h.month === 9) {
      btn.classList.add('ramadan-active');
    } else {
      btn.classList.remove('ramadan-active');
    }
  }

  // --- Toggle today's fast ---
  function toggleFastToday() {
    var today = new Date();
    var key = today.toISOString().split('T')[0];
    var data = RamadanManager.loadData();
    var current = data.fastLog && data.fastLog[key] && data.fastLog[key].fasted;
    RamadanManager.logFast(today, !current);
    renderRamadanScreen();
    if (typeof showToast === 'function') {
      var lang = (typeof getLang === 'function') ? getLang() : 'en';
      showToast(lang === 'ar' ? (current ? 'تم حذف الصيام' : 'تم تسجيل الصيام ✓') : (current ? 'Fast removed' : 'Fast logged ✓'));
    }
  }

  function onToggleMode(enabled) {
    RamadanManager.toggleEnabled(enabled);
    updateNavIndicator();
    // Show/hide Ramadan nav button based on setting
    var ramNavBtn = document.getElementById('nav-ramadan');
    if (ramNavBtn) {
      ramNavBtn.style.display = enabled ? '' : 'none';
    }
    if (typeof showToast === 'function') {
      var lang = (typeof getLang === 'function') ? getLang() : 'en';
      showToast(lang === 'ar' ? (enabled ? 'تم تفعيل وضع رمضان' : 'تم إيقاف وضع رمضان') : (enabled ? 'Ramadan Mode enabled' : 'Ramadan Mode disabled'));
    }
  }

  function saveTime(type, value) {
    var data = RamadanManager.loadData();
    if (type === 'suhoor') data.suhoorTime = value;
    if (type === 'iftar') data.iftarTime = value;
    RamadanManager.saveData(data);
  }

  // --- Init: called after app loads ---
  function init() {
    renderHijriBadge();
    updateNavIndicator();

    // Show Ramadan nav button only if mode is enabled
    var ramNavBtn = document.getElementById('nav-ramadan');
    var data = RamadanManager.loadData();
    if (ramNavBtn) {
      ramNavBtn.style.display = data.enabled ? '' : 'none';
    }
  }

  return {
    renderHijriBadge: renderHijriBadge,
    renderRamadanScreen: renderRamadanScreen,
    toggleFastToday: toggleFastToday,
    onToggleMode: onToggleMode,
    saveTime: saveTime,
    init: init,
    updateNavIndicator: updateNavIndicator
  };
})();
