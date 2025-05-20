
export const sections: { type: BannerTypes, text: { ar: string, en: string } }[] = [
  { type: 'about', text: { ar: 'عن', en: 'About' } },
  { type: 'goals', text: { ar: 'الأهداف', en: 'Goals' } },
  { type: 'our_vision', text: { ar: 'رؤيتنا', en: 'Our Vision' } },
  { type: 'core_values', text: {ar:'قيما', en: 'Our Values'} },
]
export const sectionsTypes = ["about",'goals','our_vision','core_values','our_services']
export const bannsers: { type: BannerTypes, text: { ar: string, en: string } }[] = [
  { type: 'main_banner', text: { ar: 'بانر رئيسي', en: 'Main Banner' } },
  { type: 'about_banner', text: { ar: 'بانر عن', en: 'About Banner' } },
  { type: 'qa_banner', text: { ar: 'بانر الأسئلة الشائعة', en: 'Q&A Banner' } },
  { type: 'contact_banner', text: { ar: 'بانر التواصل', en: 'Contact Banner' } },
  { type: 'our_services', text: { ar: 'بانر خدماتنا', en: 'Our Servieces Banner' } },
  { type: 'privacy_banner', text: { ar: 'بانر الخصوصية', en: 'Privacy Banner' } },
  { type: 'terms_banner', text: { ar: 'بانر الشروط', en: 'Terms Banner' } }
];

export const fullbackImage = "https://shebl9.azmy.aait-d.com/storage/images/Section/onq0yVoIcuRfHEtNip3hOB9fCehq6CRKESSeKTki.png"
export const sectionsData: Section[] = [

  {
    id: 23,
    type: "main_banner",
    title: "حلول قانونية مخصصة لاحتياجاتك الفردية والشركات",
    description: "نضع مصالح عملائنا في المقام الأول ونعمل جاهدين لتحقيق أفضل النتائج الممكنة في كل قضية",
    image: "https://shebl9.azmy.aait-d.com/storage/images/Section/gsdMdk4UTZe0hLSvKdpIPIrriWGEUjr8YXplqERp.jpg",
    icon: "https://shebl9.azmy.aait-d.com/dashboardAssets/images/cover/cover_sm.png",
    is_active: true,
    features: [
      {
        id: 63,
        key: null,
        value: "فريق من المحامين المعتمدين وذوي الكفاءة",
        icon: "https://shebl9.azmy.aait-d.com/storage/images/Feature/6c0HPdihCegwHobAOZJKLfsMfPKIUCXvROAOKAjG.png",
        is_active: true
      },
      {
        id: 64,
        key: null,
        value: "نجاحات قانونية مشهود لها من عملائنا الكرام",
        icon: "https://shebl9.azmy.aait-d.com/storage/images/Feature/UGsIFvNCRSSh84nXFpMnOlHM6q5Y1OIIrSfDr1cT.png",
        is_active: true
      },
      {
        id: 65,
        key: null,
        value: "خبرة طويلة في جميع التخصصات القانونية",
        icon: "https://shebl9.azmy.aait-d.com/storage/images/Feature/mw90GfzI10ZIS6aqfcZIlqLN1oR7pm5K5DOVMAkx.png",
        is_active: true
      }
    ]
  },
  {
    id: 25,
    type: "why_us",
    title: "لماذا نحن",
    description: "لأننا نتميز بالخبرة، المصداقية، والالتزام الكامل بخدمة عملائنا. معنا، ستحصل على الحلول القانونية التي تستحقها بخبرة واحترافية لا تضاهى.",
    image: "https://shebl9.azmy.aait-d.com/storage/images/Section/onq0yVoIcuRfHEtNip3hOB9fCehq6CRKESSeKTki.png",
    icon: "https://shebl9.azmy.aait-d.com/storage/images/Section/FXbfnhkgax5apzG9So6UW8WzliVRO2kPMBBmmigP.png",
    is_active: true,
    features: [
      {
        id: 1,
        icon: "https://shebl9.azmy.aait-d.com/storage/images/WhyUs/v1tVhiQVtQS7dDCTyxnusLWpmCjVcL8NiIf480cn.png",
        key: "فريق من المحامين المعتمين",
        value: "10"
      },
      {
        id: 3,
        icon: "https://shebl9.azmy.aait-d.com/storage/images/WhyUs/FNFvTpn6SlRNO1AC3EIxDpgIPxwC3rELnd1YAtGS.png",
        key: "سنوات من الخبرة",
        value: "6"
      },
      {
        id: 4,
        icon: "https://shebl9.azmy.aait-d.com/storage/images/WhyUs/4qVo3X5YbKxItFtSEaT2OgGXxxBxIlnXVkRrALB0.png",
        key: "عملاء كرام سعيدون بالخدمة",
        value: "90"
      },
      {
        id: 5,
        icon: "https://shebl9.azmy.aait-d.com/storage/images/WhyUs/pjeRtsI9wANgarivqcuI4OibWIE8yUqYslZTHmPv.png",
        key: "نجاحات قانونية مشهود لها من عملائنا الكرام",
        value: "200"
      }
    ]
  },
  {
    id: 14,
    type: "privacy_policy",
    title: "سياسة الخصوصية",
    description: "<p><strong>جمع البيانات</strong></p><p> نقوم بجمع البيانات الشخصية عند استخدامك لخدماتنا، بما في ذلك الاسم، البريد الإلكتروني، ورقم الهاتف لضمان تقديم خدمة قانونية فعالة.</p><p><strong>استخدام البيانات</strong></p><p> نستخدم بياناتك لتحسين الخدمات، توفير الاستشارات القانونية، والتواصل معك بشأن القضايا القانونية الخاصة بك.</p><p><strong>مشاركة البيانات</strong></p><p> لا نشارك بياناتك مع أي طرف ثالث إلا عند الضرورة القانونية أو بموافقتك.</p><p><strong>حماية البيانات</strong></p><p> نلتزم باتخاذ الإجراءات الأمنية المناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح.</p><p><strong>حقوق المستخدم</strong></p><p> يحق لك طلب تعديل أو حذف بياناتك الشخصية في أي وقت من خلال التواصل معنا.</p><p><strong>تعديلات السياسة</strong></p><p> نحتفظ بالحق في تعديل سياسة الخصوصية، وأي تغييرات سيتم نشرها على موقعنا.</p><p><strong>القانون الحاكم</strong></p><p> تخضع هذه السياسة لأنظمة المملكة العربية السعودية، وأي نزاع يخضع لاختصاص المحاكم السعودية.</p>",
    image: "https://shebl9.azmy.aait-d.com/dashboardAssets/images/cover/cover_sm.png",
    icon: "https://shebl9.azmy.aait-d.com/dashboardAssets/images/cover/cover_sm.png",
    is_active: true,
    features: []
  }
];



