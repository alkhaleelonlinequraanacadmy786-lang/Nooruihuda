/**
 * Noor Al-Huda Online Quran Academy
 * Main Application JavaScript
 */

// --- Global State & Data Store ---
const state = {
  currency: 'USD',
  currencies: {
    USD: { symbol: '$', rate: 1, label: 'USD ($)' },
    GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
    EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
    CAD: { symbol: 'CA$', rate: 1.36, label: 'CAD ($)' },
    AUD: { symbol: 'AU$', rate: 1.52, label: 'AUD ($)' },
  },
  plans: {
    starter: { basePrice: 48, classes: 8, days: '2 Days / Week' },
    standard: { basePrice: 68, classes: 12, days: '3 Days / Week' },
    intensive: { basePrice: 105, classes: 20, days: '5 Days / Week' },
  },
  isPlayingAudio: false,
  audioInstance: null
};

// Course Syllabus Catalog
const coursesData = {
  qaida: {
    id: 'qaida',
    title: 'Noorani Qaida & Arabic Pronunciation',
    arabicTitle: 'القاعدة النورانية وأساسيات التجويد',
    category: 'kids',
    level: 'Beginner (No prior knowledge required)',
    ageGroup: 'Kids (4+) & Adult Beginners',
    duration: '2 to 3 Months (Approx. 24–36 sessions)',
    overview: 'The essential stepping stone for anyone who wants to read the Holy Quran from scratch. This course focuses on letter recognition, pristine articulation from the throat and mouth (Makharij), joining characters, and basic vowel marks.',
    modules: [
      { week: 'Weeks 1–2', topic: 'The Arabic Alphabet & Makharij (Accurate Pronunciation of each letter from its origin)' },
      { week: 'Weeks 3–4', topic: 'Compound Letters (Murakkabat) and Letter Shapes (Beginning, Middle, End)' },
      { week: 'Weeks 5–6', topic: 'Harakat (Short Vowels: Fatha, Kasra, Damma) & Practical Word Reading' },
      { week: 'Weeks 7–8', topic: 'Tanween (Double Vowels) and Letters of Madd (Long Vowels: Alif, Waw, Yaa)' },
      { week: 'Weeks 9–10', topic: 'Sukoon (Jazm) and Rules of Qalqalah (Echoing Sound)' },
      { week: 'Weeks 11–12', topic: 'Tashdeed (Shaddah), Nun Sakinah introduction & Graduation assessment' }
    ],
    features: [
      'Interactive digital color-coded Noorani Qaida provided',
      'Child-friendly pacing with engaging phonics exercises',
      'Individual mouth articulation guidance via high-definition camera',
      'Weekly voice recording review and parental report card'
    ]
  },
  tajweed: {
    id: 'tajweed',
    title: 'Quran Reading with Applied Tajweed',
    arabicTitle: 'تلاوة القرآن الكريم بأحكام التجويد',
    category: 'tajweed',
    level: 'Elementary to Advanced',
    ageGroup: 'All Ages (Kids, Youth & Adults)',
    duration: 'Ongoing / Modular (3 to 6 Months per Juz level)',
    overview: 'Transform your recitation into a melodious, fluent, and reverent reading of the Holy Quran strictly following the classical rules of Hafs ‘an ‘Asim.',
    modules: [
      { week: 'Module 1', topic: 'Makharij al-Huruf (Refinement of heavy and light letters, Isti’la & Istifal)' },
      { week: 'Module 2', topic: 'Rules of Nun Sakinah and Tanween (Izhar, Idgham, Iqlab, and Ikhfa)' },
      { week: 'Module 3', topic: 'Rules of Meem Sakinah and Rules of Raa & Laam of the Divine Name (Allah)' },
      { week: 'Module 4', topic: 'Ahkam al-Madd (Mandatory, Permissible, and Connected Lengthening 2, 4, 6 counts)' },
      { week: 'Module 5', topic: 'Waqf & Ibtida (Stopping, Pausing, and Resuming Signs in the Uthmani Script)' },
      { week: 'Module 6', topic: 'Practical fluent recitation of selected Surahs with melodic application' }
    ],
    features: [
      'Color-coded Tajweed Mushaf provided in PDF',
      'Correction of hidden mistakes (Lahn Khafi) & obvious mistakes (Lahn Jali)',
      'Confidence building in solo recitation',
      'Preparation for advanced Sanad/Ijazah tracks'
    ]
  },
  hifz: {
    id: 'hifz',
    title: 'Hifz-ul-Quran (Memorization Track)',
    arabicTitle: 'برنامج تحفيظ القرآن الكريم كاملاً وجزئياً',
    category: 'memorization',
    level: 'Intermediate to Advanced',
    ageGroup: 'Kids (7+), Teens & Dedicated Adults',
    duration: '1 to 3 Years (Flexible options: Full Quran or Selected Surahs)',
    overview: 'A disciplined, time-tested Quran memorization journey designed to engrave the words of Allah into the student’s heart using the tripartite Sabaq, Sabqi, and Manzil methodology under certified Hafiz instructors.',
    modules: [
      { week: 'Track Option A', topic: 'Juz 30 (Juz ‘Amma) & Juz 29 Foundation (3 to 6 Months)' },
      { week: 'Track Option B', topic: 'Selected Essential Surahs (Surah Al-Kahf, Yaseen, Al-Mulk, Al-Waqi’ah, Ar-Rahman)' },
      { week: 'Track Option C', topic: 'Full 30 Ajza’ Hifz Intensive (Daily Sabaq with cumulative Sabqi revision)' },
      { week: 'Daily Structure', topic: '1. New Lesson (Sabaq) -> 2. Recent Memorization (Sabqi) -> 3. Past Retention (Manzil)' }
    ],
    features: [
      'Dedicated Hafiz/Hafiza mentor with 1-on-1 focus',
      'Personalized memory retention techniques & spaced repetition',
      'Monthly oral evaluation with Senior Academy Dean',
      'Formal Ijazah / Completion Certificate upon culmination'
    ]
  },
  duas: {
    id: 'duas',
    title: 'Daily Duas & Islamic Etiquette for Kids',
    arabicTitle: 'الأدعية اليومية والآداب الإسلامية للأطفال',
    category: 'kids',
    level: 'Beginner',
    ageGroup: 'Children Ages 5 to 14',
    duration: '3 to 6 Months',
    overview: 'Nurture a deep love for Allah, the Prophet ﷺ, and Islamic values. Children learn practical everyday supplications, the step-by-step method of Salah, and inspiring stories from the Seerah of the Prophet ﷺ.',
    modules: [
      { week: 'Module 1', topic: 'Purity & Salah (Wudu step-by-step, Adhan, actions of Salah, and prayer Duas)' },
      { week: 'Module 2', topic: 'Everyday Masnoon Duas (Waking up, eating, sleeping, entering home, traveling, sneezes)' },
      { week: 'Module 3', topic: '40 Short Hadiths on Kindness, Honesty, Respecting Parents, and Compassion' },
      { week: 'Module 4', topic: 'Stories of the Prophets (Adam, Ibrahim, Musa, Isa, and Muhammad ﷺ)' },
      { week: 'Module 5', topic: 'Basic Islamic Beliefs (Tawheed, Angels, Revealed Books, Destiny, Hereafter)' }
    ],
    features: [
      'Fun illustrated digital workbooks & flashcards',
      'Gamified quizzes and monthly certificate of achievement',
      'Focus on real-world character and polite speech (Akhlaq)',
      'Combined naturally with 15 minutes of Quran practice'
    ]
  },
  tafseer: {
    id: 'tafseer',
    title: 'Tafseer & Quranic Arabic Basics',
    arabicTitle: 'تفسير القرآن وفهم المفردات القرآنية',
    category: 'adults',
    level: 'Intermediate',
    ageGroup: 'Teens, Sisters & Adult Learners',
    duration: '6 to 12 Months',
    overview: 'Move beyond reading the script to understanding the profound meanings, emotional depths, and historical contexts of the Quranic message. Learn core Arabic root words and classical grammar fundamentals.',
    modules: [
      { week: 'Module 1', topic: 'High-frequency Quranic vocabulary (The 300 words that make up 70% of Quranic text)' },
      { week: 'Module 2', topic: 'Basic Arabic word patterns (Past, Present verbs, Roots, and Plurals)' },
      { week: 'Module 3', topic: 'Tafseer of Surah Al-Fatiha and Short Surahs (Juz 30) with Tadabbur reflections' },
      { week: 'Module 4', topic: 'Tafseer of Surah Yusuf & Surah Al-Kahf: Literary nuances and life lessons' },
      { week: 'Module 5', topic: 'The Science of the Quran (Asbab an-Nuzul - Occasions of Revelation)' }
    ],
    features: [
      'Comprehensive study notes with modern English commentary',
      'Weekly contemplation (Tadabbur) assignments',
      'Interactive Q&A discussion with Alim/Alimah faculty',
      'Special dedicated sister-only study batches available'
    ]
  }
};

// Sample Tutor Showcase Data
const tutorsData = {
  bilal: {
    id: 'bilal',
    name: 'Ustadh Bilal Ahmed',
    arabicTitle: 'أستاذ بلال أحمد',
    badge: 'Ijazah Certified',
    gender: 'Male',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    role: 'Senior Tajweed & Qira’at Instructor',
    qualification: 'Al-Azhar University Graduate, Faculty of Islamic Sciences (Cairo)',
    experience: '12+ Years Teaching Experience',
    specialties: ['Tajweed Precision', 'Makharij Correction', 'Adult Beginners', 'Ten Qira’at'],
    languages: ['English (Fluent)', 'Arabic (Native)', 'Urdu (Conversational)'],
    studentsTaught: '420+ Global Students',
    rating: '5.0 / 5.0 (184 Reviews)',
    bio: 'Ustadh Bilal holds an authentic Sanad and Ijazah connected back to the Prophet ﷺ in the Hafs ‘an ‘Asim and Shu’bah recitations. Known for his patience, warm encouragement, and systematic correction of subtle pronunciation mistakes.'
  },
  amina: {
    id: 'amina',
    name: 'Ustadha Amina Tariq',
    arabicTitle: 'أستاذة أمينة طارق',
    badge: 'Kids & Sisters Specialist',
    gender: 'Female',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    role: 'Noorani Qaida & Child Learning Lead',
    qualification: 'Master’s in Islamic Studies (Wifaq-ul-Madaris), Certified Early Childhood Educator',
    experience: '8+ Years Online Tutoring',
    specialties: ['Noorani Qaida for Kids', 'Phonics & Makharij', 'Female Student Classes', 'Masnoon Duas'],
    languages: ['English (Fluent)', 'Urdu (Native)', 'Arabic (Proficient)'],
    studentsTaught: '350+ Children & Sisters',
    rating: '4.98 / 5.0 (210 Reviews)',
    bio: 'Ustadha Amina is beloved by young students for her engaging, warm, and gamified teaching approach. She specializes in instilling confidence in shy learners and helping young kids master the Arabic alphabet with delight.'
  },
  yusuf: {
    id: 'yusuf',
    name: 'Qari Yusuf Mahmood',
    arabicTitle: 'القارئ يوسف محمود',
    badge: 'Head of Hifz Dept',
    gender: 'Male',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    role: 'Dean of Memorization (Hifz-ul-Quran)',
    qualification: 'Hafiz-ul-Quran at Age 11, Gold Medalist in International Recitation (Dubai & Jordan)',
    experience: '14+ Years Hifz Mentorship',
    specialties: ['Full Quran Hifz', 'Retention (Manzil) Coaching', 'Maqamat & Melodic Recitation', 'Youth Mentorship'],
    languages: ['English (Fluent)', 'Arabic (Fluent)', 'Bengali (Fluent)'],
    studentsTaught: '78 Completed Huffaz Mentored',
    rating: '5.0 / 5.0 (145 Reviews)',
    bio: 'Qari Yusuf has guided dozens of students from across the US, UK, and Australia to complete the memorization of the entire Quran. He employs spaced-repetition schedules that ensure long-term retention without burnout.'
  },
  maryam: {
    id: 'maryam',
    name: 'Ustadha Maryam Siddiqui',
    arabicTitle: 'أستاذة مريم الصديقي',
    badge: 'Alimah & Tafseer Scholar',
    gender: 'Female',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    role: 'Tafseer & Quranic Arabic Instructor',
    qualification: 'Dars-e-Nizami Alimiyyah Degree (7-Year Classical Scholarship), BA Arabic Literature',
    experience: '9+ Years Teaching',
    specialties: ['Quranic Arabic Grammar', 'Surah Reflections (Tadabbur)', 'Women’s Halaqas', 'Hadith Sciences'],
    languages: ['English (Fluent)', 'Arabic (Classical & Modern)', 'French (Intermediate)'],
    studentsTaught: '290+ Adult Learners',
    rating: '4.97 / 5.0 (160 Reviews)',
    bio: 'Ustadha Maryam brings classical scholarship into accessible, heart-touching discussions. She helps sisters and teens understand the living application of Quranic wisdom in contemporary everyday life.'
  }
};

// --- Initialization on DOM Loaded ---
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCourseFilters();
  initModals();
  initPricingCurrency();
  initFAQAccordion();
  initAudioPlayer();
  initTrialForm();
  detectUserTimezone();
  initSmoothScroll();
});

// --- 1. Top Navigation & Mobile Menu ---
function initNavbar() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navHeader = document.getElementById('mainHeader');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    const hideDrawer = () => {
      mobileDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    };

    if (closeDrawer) closeDrawer.addEventListener('click', hideDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', hideDrawer));
  }

  // Sticky header elevation shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navHeader.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
      navHeader.classList.remove('bg-white');
    } else {
      navHeader.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
      navHeader.classList.add('bg-white');
    }
  });
}

// --- 2. Course Category Filtering ---
function initCourseFilters() {
  const filterButtons = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-emerald-800', 'text-white', 'shadow-sm');
        b.classList.add('bg-emerald-50', 'text-emerald-900', 'hover:bg-emerald-100');
      });
      btn.classList.add('bg-emerald-800', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-emerald-50', 'text-emerald-900', 'hover:bg-emerald-100');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- 3. Interactive Modals (Syllabus, Tutor Profile, Booking) ---
function initModals() {
  const syllabusModal = document.getElementById('syllabusModal');
  const tutorModal = document.getElementById('tutorModal');
  const bookingModal = document.getElementById('bookingModal');
  const successModal = document.getElementById('successModal');

  // Open Syllabus Modal
  document.querySelectorAll('.btn-view-syllabus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = btn.getAttribute('data-course-id');
      const course = coursesData[courseId];
      if (!course) return;

      document.getElementById('syllabusTitle').innerText = course.title;
      document.getElementById('syllabusArabicTitle').innerText = course.arabicTitle;
      document.getElementById('syllabusLevel').innerText = course.level;
      document.getElementById('syllabusAge').innerText = course.ageGroup;
      document.getElementById('syllabusDuration').innerText = course.duration;
      document.getElementById('syllabusOverview').innerText = course.overview;

      const moduleList = document.getElementById('syllabusModules');
      moduleList.innerHTML = course.modules.map((m, idx) => `
        <div class="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80 flex items-start space-x-3">
          <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-800 text-gold-300 font-bold text-xs shrink-0">${idx + 1}</span>
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-emerald-800">${m.week}</div>
            <div class="text-sm text-slate-700 font-medium">${m.topic}</div>
          </div>
        </div>
      `).join('');

      const featureList = document.getElementById('syllabusFeatures');
      featureList.innerHTML = course.features.map(f => `
        <li class="flex items-center text-sm text-slate-700">
          <svg class="w-4 h-4 mr-2 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          ${f}
        </li>
      `).join('');

      const trialBtn = document.getElementById('syllabusBookBtn');
      trialBtn.onclick = () => {
        closeModal(syllabusModal);
        openBookingModalWith({ courseId: course.id, courseTitle: course.title });
      };

      openModal(syllabusModal);
    });
  });

  // Open Tutor Profile Modal
  document.querySelectorAll('.btn-view-tutor').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tutorId = btn.getAttribute('data-tutor-id');
      const tutor = tutorsData[tutorId];
      if (!tutor) return;

      document.getElementById('tutorModalName').innerText = tutor.name;
      document.getElementById('tutorModalArabic').innerText = tutor.arabicTitle;
      document.getElementById('tutorModalRole').innerText = tutor.role;
      document.getElementById('tutorModalPhoto').src = tutor.photo;
      document.getElementById('tutorModalPhoto').alt = tutor.name;
      document.getElementById('tutorModalBadge').innerText = tutor.badge;
      document.getElementById('tutorModalQual').innerText = tutor.qualification;
      document.getElementById('tutorModalExp').innerText = tutor.experience;
      document.getElementById('tutorModalRating').innerText = tutor.rating;
      document.getElementById('tutorModalStudents').innerText = tutor.studentsTaught;
      document.getElementById('tutorModalBio').innerText = tutor.bio;

      const specContainer = document.getElementById('tutorModalSpecialties');
      specContainer.innerHTML = tutor.specialties.map(s => `
        <span class="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">${s}</span>
      `).join('');

      const langContainer = document.getElementById('tutorModalLanguages');
      langContainer.innerHTML = tutor.languages.map(l => `
        <span class="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">${l}</span>
      `).join('');

      const tutorBookBtn = document.getElementById('tutorModalBookBtn');
      tutorBookBtn.onclick = () => {
        closeModal(tutorModal);
        openBookingModalWith({ tutorName: tutor.name, tutorGender: tutor.gender });
      };

      openModal(tutorModal);
    });
  });

  // Global booking buttons
  document.querySelectorAll('.trigger-booking-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plan = btn.getAttribute('data-plan');
      const course = btn.getAttribute('data-course');
      const tutor = btn.getAttribute('data-tutor');
      openBookingModalWith({ plan, courseTitle: course, tutorName: tutor });
    });
  });

  // Close handlers
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-container');
      if (modal) closeModal(modal);
    });
  });

  // Close when clicking on backdrop
  document.querySelectorAll('.modal-container').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('hidden');
  document.body.style.overflow = '';
}

function openBookingModalWith({ plan, courseId, courseTitle, tutorName, tutorGender } = {}) {
  const bookingModal = document.getElementById('bookingModal');
  if (!bookingModal) return;

  // Auto-fill form inputs if present
  if (courseId || courseTitle) {
    const courseSelect = document.getElementById('modalCourseSelect');
    if (courseSelect) {
      if (courseId) {
        courseSelect.value = courseId;
      } else {
        for (let i = 0; i < courseSelect.options.length; i++) {
          if (courseSelect.options[i].text.includes(courseTitle)) {
            courseSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  if (tutorGender) {
    const genderSelect = document.getElementById('modalTutorGender');
    if (genderSelect) {
      if (tutorGender.toLowerCase() === 'female') genderSelect.value = 'female';
      else if (tutorGender.toLowerCase() === 'male') genderSelect.value = 'male';
    }
  }

  if (plan) {
    const notesField = document.getElementById('modalNotes');
    if (notesField && !notesField.value.includes('Plan')) {
      notesField.value = `Interested in ${plan} Plan. ` + notesField.value;
    }
  }

  if (tutorName) {
    const notesField = document.getElementById('modalNotes');
    if (notesField && !notesField.value.includes(tutorName)) {
      notesField.value = `Preferred tutor: ${tutorName}. ` + notesField.value;
    }
  }

  openModal(bookingModal);
}

// --- 4. Pricing & Interactive Currency Switcher ---
function initPricingCurrency() {
  const currencySelector = document.getElementById('currencySelector');
  if (!currencySelector) return;

  currencySelector.addEventListener('change', (e) => {
    state.currency = e.target.value;
    updatePricingCards();
  });

  updatePricingCards();
}

function updatePricingCards() {
  const cur = state.currencies[state.currency] || state.currencies.USD;

  // Update Starter Plan
  const starterPrice = Math.round(state.plans.starter.basePrice * cur.rate);
  const starterEl = document.getElementById('priceStarter');
  const starterSymbolEl = document.getElementById('symbolStarter');
  if (starterEl) starterEl.innerText = starterPrice;
  if (starterSymbolEl) starterSymbolEl.innerText = cur.symbol;

  // Update Standard Plan
  const standardPrice = Math.round(state.plans.standard.basePrice * cur.rate);
  const standardEl = document.getElementById('priceStandard');
  const standardSymbolEl = document.getElementById('symbolStandard');
  if (standardEl) standardEl.innerText = standardPrice;
  if (standardSymbolEl) standardSymbolEl.innerText = cur.symbol;

  // Update Intensive Plan
  const intensivePrice = Math.round(state.plans.intensive.basePrice * cur.rate);
  const intensiveEl = document.getElementById('priceIntensive');
  const intensiveSymbolEl = document.getElementById('symbolIntensive');
  if (intensiveEl) intensiveEl.innerText = intensivePrice;
  if (intensiveSymbolEl) intensiveSymbolEl.innerText = cur.symbol;
}

// --- 5. FAQ Accordion & Category Filter ---
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqFilterBtns = document.querySelectorAll('.faq-filter-btn');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other accordions
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      // Toggle clicked
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  if (faqFilterBtns.length > 0) {
    faqFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        faqFilterBtns.forEach(b => {
          b.classList.remove('bg-emerald-800', 'text-white');
          b.classList.add('bg-white', 'text-slate-700');
        });
        btn.classList.add('bg-emerald-800', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-700');

        const category = btn.getAttribute('data-faq-cat');
        faqItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

// --- 6. Interactive Quran Recitation Audio Demo ---
function initAudioPlayer() {
  const playBtn = document.getElementById('heroPlayAudioBtn');
  const playIcon = document.getElementById('audioPlayIcon');
  const pauseIcon = document.getElementById('audioPauseIcon');
  const audioVisualizer = document.getElementById('audioWaveVisualizer');
  const audioProgressBar = document.getElementById('audioProgressBar');
  const audioDurationText = document.getElementById('audioDurationText');
  const tajweedTooltip = document.getElementById('tajweedRuleTip');

  // Public authentic recitation audio (Surah Al-Fatiha by Mishary Alafasy)
  // Audio url hosted on Quran CDN or reliable public audio stream
  const audioSrc = 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3';
  let audio = new Audio();
  audio.src = audioSrc;
  audio.preload = 'metadata';

  state.audioInstance = audio;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          state.isPlayingAudio = true;
          updateAudioUI(true);
        }).catch(err => {
          // If browser restricts cross-origin or autoplay, fallback to simulated melodic recitation tone
          console.warn('Audio play restricted, running demo visualizer mode:', err);
          simulateAudioPlayback();
        });
      } else {
        audio.pause();
        state.isPlayingAudio = false;
        updateAudioUI(false);
      }
    });
  }

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      if (audioProgressBar) audioProgressBar.style.width = `${pct}%`;

      const curM = Math.floor(audio.currentTime / 60);
      const curS = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
      const durM = Math.floor(audio.duration / 60);
      const durS = Math.floor(audio.duration % 60).toString().padStart(2, '0');
      if (audioDurationText) audioDurationText.innerText = `${curM}:${curS} / ${durM}:${durS}`;

      // Show dynamic Tajweed coaching tip depending on ayah timestamp
      if (audio.currentTime > 2 && audio.currentTime < 8) {
        if (tajweedTooltip) tajweedTooltip.innerHTML = '<strong>Tajweed Highlight:</strong> Precise <em>Ghunnah</em> (nasal sound) and soft throat articulation on <em>الرَّحْمَٰنِ</em>.';
      } else if (audio.currentTime >= 8 && audio.currentTime < 18) {
        if (tajweedTooltip) tajweedTooltip.innerHTML = '<strong>Tajweed Highlight:</strong> Clear <em>Ikhfa</em> and <em>Madd</em> (elongation 4-6 counts) on <em>الضَّالِّينَ</em>.';
      } else {
        if (tajweedTooltip) tajweedTooltip.innerHTML = '<strong>Tajweed Highlight:</strong> Soft Qalqalah on <em>الدِّينِ</em> and balanced vowel lengths.';
      }
    }
  });

  audio.addEventListener('ended', () => {
    state.isPlayingAudio = false;
    updateAudioUI(false);
    if (audioProgressBar) audioProgressBar.style.width = '0%';
  });

  function updateAudioUI(isPlaying) {
    if (playIcon) playIcon.classList.toggle('hidden', isPlaying);
    if (pauseIcon) pauseIcon.classList.toggle('hidden', !isPlaying);
    if (audioVisualizer) audioVisualizer.classList.toggle('opacity-100', isPlaying);
    if (audioVisualizer) audioVisualizer.classList.toggle('opacity-40', !isPlaying);
  }

  // Simulated fallback in case network blocks external MP3
  let simInterval = null;
  function simulateAudioPlayback() {
    state.isPlayingAudio = !state.isPlayingAudio;
    updateAudioUI(state.isPlayingAudio);

    if (state.isPlayingAudio) {
      let progress = 0;
      simInterval = setInterval(() => {
        progress += 2;
        if (audioProgressBar) audioProgressBar.style.width = `${progress}%`;
        if (audioDurationText) audioDurationText.innerText = `0:${Math.floor(progress * 0.4).toString().padStart(2, '0')} / 0:42`;
        if (progress >= 100) {
          clearInterval(simInterval);
          state.isPlayingAudio = false;
          updateAudioUI(false);
          if (audioProgressBar) audioProgressBar.style.width = '0%';
        }
      }, 500);
    } else {
      if (simInterval) clearInterval(simInterval);
    }
  }
}

// --- 7. Free Trial Form Submissions (Main Section Form & Modal Form) ---
function initTrialForm() {
  const forms = [
    { formId: 'mainTrialForm', isModal: false },
    { formId: 'modalTrialForm', isModal: true }
  ];

  forms.forEach(({ formId, isModal }) => {
    const formEl = document.getElementById(formId);
    if (!formEl) return;

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(formEl);
      const studentName = formData.get('studentName') || 'Valued Learner';
      const studentAge = formData.get('studentAge') || 'Not specified';
      const course = formData.get('course') || 'Noorani Qaida & Tajweed';
      const tutorPreference = formData.get('tutorGender') || 'Any Qualified Tutor';
      const preferredTime = formData.get('preferredTime') || 'Evening';
      const timezone = formData.get('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      const whatsapp = formData.get('whatsapp') || '+1 (555) 000-0000';
      const email = formData.get('email') || 'student@example.com';

      // Generate realistic Booking Reference ID
      const randomRef = 'NHA-' + Math.floor(10000 + Math.random() * 90000);

      // Close modal if submitted from modal
      if (isModal) {
        const bookingModal = document.getElementById('bookingModal');
        closeModal(bookingModal);
      }

      // Populate Success Modal
      document.getElementById('confRefId').innerText = randomRef;
      document.getElementById('confStudentName').innerText = studentName;
      document.getElementById('confCourse').innerText = course;
      document.getElementById('confTutorPref').innerText = tutorPreference.toUpperCase();
      document.getElementById('confTimeSlot').innerText = `${preferredTime} (${timezone})`;
      document.getElementById('confContact').innerText = `${whatsapp} | ${email}`;

      // Open Success Modal
      const successModal = document.getElementById('successModal');
      openModal(successModal);

      // Reset form fields
      formEl.reset();

      // Show toast
      showToast('🎉 Free Trial Booking Received! We will contact you via WhatsApp shortly.');
    });
  });

  // Print / Save confirmation
  const printBtn = document.getElementById('btnPrintConfirmation');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// --- 8. User Timezone Auto-detection & Global Academy Status ---
function detectUserTimezone() {
  try {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const tzDisplayEl = document.getElementById('detectedTimezoneBadge');
    if (tzDisplayEl) {
      tzDisplayEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Your Timezone: <strong>${userTz}</strong> (Classes Available 24/7)`;
    }

    // Auto-select user timezone in dropdowns
    document.querySelectorAll('.timezone-select').forEach(select => {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === userTz || select.options[i].text.includes(userTz)) {
          select.selectedIndex = i;
          break;
        }
      }
    });
  } catch (err) {
    console.warn('Could not auto-detect timezone', err);
  }
}

// --- 9. Smooth Scroll for Navigation ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// --- 10. Toast Notification System ---
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'fixed bottom-6 right-6 z-50 max-w-md bg-emerald-950 text-white px-5 py-4 rounded-2xl shadow-2xl border border-gold-500/50 flex items-center space-x-3 transition-all duration-300 transform translate-y-20 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-gold-500 text-emerald-950 flex items-center justify-center font-bold shrink-0">✓</div>
    <div class="text-sm font-medium leading-snug">${message}</div>
  `;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4500);
}
