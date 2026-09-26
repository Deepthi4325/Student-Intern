export type LanguageCode = 'en' | 'hi' | 'es';

export interface Translations {
  // Navigation
  prep: string;
  explore: string;
  opportunities: string;
  dashboard: string;
  prephub: string;
  mypath: string;
  planlyPlanner: string;
  community: string;
  myCourses: string;
  assignments: string;
  certificates: string;
  myProgress: string;
  hackathons: string;
  internships: string;
  jobs: string;

  // Header & Controls
  searchPlaceholder: string;
  smartIntern: string;
  streak: string;
  xpEarned: string;
  profile: string;
  profileAndGoals: string;
  notifications: string;
  logout: string;
  account: string;
  accountAndSecurity: string;
  theme: string;
  themeAndDisplay: string;
  troubleshooting: string;

  // Dashboard
  welcomeBack: string;
  continueLearning: string;
  coursesInProgress: string;
  lessonsCompleted: string;
  improvementRate: string;
  explorePopularTopics: string;
  problemOfTheDay: string;
  solveProblem: string;
  studyCalendar: string;
  interviewExperiences: string;
  placementMilestone: string;

  // Courses & Topics
  allCourses: string;
  development: string;
  design: string;
  dataScience: string;
  resumeCourse: string;
  modules: string;
  completed: string;
  markComplete: string;

  // Certificates & LinkedIn
  verifiedCertifications: string;
  addToLinkedIn: string;
  shareOnLinkedIn: string;
  downloadPdf: string;
  viewCertificate: string;
  credentialId: string;
  issuedBy: string;

  // Auth / Login
  loginTitle: string;
  loginSubtitle: string;
  continueWithGoogle: string;
  continueWithEmail: string;
  continueWithPhone: string;
  orDivider: string;
  emailLabel: string;
  passwordLabel: string;
  phoneLabel: string;
  sendOtp: string;
  enterOtp: string;
  verifyAndContinue: string;
  exploreAsGuest: string;
  signIn: string;
  getStarted: string;
  applyNow: string;
  applied: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    prep: 'Prep',
    explore: 'Explore',
    opportunities: 'Opportunities',
    dashboard: 'Dashboard',
    prephub: 'Prephub',
    mypath: 'Planly Planner',
    planlyPlanner: 'Planly Study Planner',
    community: 'Community',
    myCourses: 'My Courses',
    assignments: 'Assignments',
    certificates: 'Certificates',
    myProgress: 'My Progress',
    hackathons: 'Hackathons',
    internships: 'Internships',
    jobs: 'Jobs',

    searchPlaceholder: 'Search topics, sheets, problems (e.g. Sliding Window, Redis)...',
    smartIntern: 'Smart Intern',
    streak: 'Streak',
    xpEarned: 'XP',
    profile: 'Profile & Level',
    profileAndGoals: 'Profile & Goals',
    notifications: 'Notifications',
    logout: 'Log Out',
    account: 'Account & Plan',
    accountAndSecurity: 'Account & Security',
    theme: 'Theme',
    themeAndDisplay: 'Theme & Display',
    troubleshooting: 'Troubleshooting',

    welcomeBack: 'Welcome back',
    continueLearning: 'Continue Learning',
    coursesInProgress: 'Courses in Progress',
    lessonsCompleted: 'Lessons Completed',
    improvementRate: 'Improvement Rate',
    explorePopularTopics: 'Explore Popular Topics',
    problemOfTheDay: 'Problem of the Day',
    solveProblem: 'Solve Problem',
    studyCalendar: 'Study Calendar',
    interviewExperiences: 'Interview Experiences & Debriefs',
    placementMilestone: 'Placement Readiness Milestone',

    allCourses: 'All Courses',
    development: 'Development',
    design: 'Design',
    dataScience: 'Data Science',
    resumeCourse: 'Resume Curriculum',
    modules: 'Modules',
    completed: 'Completed',
    markComplete: 'Mark Complete & Review',

    verifiedCertifications: 'Verified Certifications',
    addToLinkedIn: 'Add to LinkedIn Profile',
    shareOnLinkedIn: 'Share on LinkedIn',
    downloadPdf: 'Download PDF',
    viewCertificate: 'View Certificate',
    credentialId: 'Credential ID',
    issuedBy: 'Issued by',

    loginTitle: 'Sign in to Smart Intern',
    loginSubtitle: 'Choose your preferred sign-in method to access your personalized adaptive curriculum.',
    continueWithGoogle: 'Continue with Google',
    continueWithEmail: 'Continue with Gmail / Email',
    continueWithPhone: 'Continue with Phone Number (OTP)',
    orDivider: 'or sign in with credentials',
    emailLabel: 'Gmail or College Email Address',
    passwordLabel: 'Password',
    phoneLabel: '10-Digit Mobile Number',
    sendOtp: 'Send Verification OTP',
    enterOtp: 'Enter 6-Digit OTP',
    verifyAndContinue: 'Verify & Sign In',
    exploreAsGuest: 'Explore as Guest / Demo Student',
    signIn: 'Sign In',
    getStarted: 'Get Started Free',
    applyNow: 'Apply Now',
    applied: 'Applied',
  },
  hi: {
    prep: 'तैयारी (Prep)',
    explore: 'अन्वेषण (Explore)',
    opportunities: 'अवसर (Opportunities)',
    dashboard: 'डैशबोर्ड (Dashboard)',
    prephub: 'प्रेपहब (Prephub)',
    mypath: 'प्लानली प्लानर (Planly)',
    planlyPlanner: 'प्लानली अध्ययन योजनाकार',
    community: 'समुदाय (Community)',
    myCourses: 'मेरे पाठ्यक्रम',
    assignments: 'असाइनमेंट',
    certificates: 'प्रमाणपत्र (Certificates)',
    myProgress: 'मेरी प्रगति (Progress)',
    hackathons: 'हैकाथॉन (Hackathons)',
    internships: 'इंटर्नशिप (Internships)',
    jobs: 'नौकरियां (Jobs)',

    searchPlaceholder: 'विषय, शीट या प्रश्न खोजें (जैसे स्लाइडिंग विंडो, रेडिस)...',
    smartIntern: 'स्मार्ट इंटर्न (Smart Intern)',
    streak: 'दिन स्ट्रीक',
    xpEarned: 'एक्सपी अंक',
    profile: 'प्रोफ़ाइल और स्तर',
    profileAndGoals: 'प्रोफ़ाइल और लक्ष्य',
    notifications: 'सूचनाएं',
    logout: 'लॉग आउट',
    account: 'खाता और योजना',
    accountAndSecurity: 'खाता और सुरक्षा',
    theme: 'थीम',
    themeAndDisplay: 'थीम और प्रदर्शन',
    troubleshooting: 'समस्या निवारण',

    welcomeBack: 'वापसी पर स्वागत है',
    continueLearning: 'पढ़ाई जारी रखें',
    coursesInProgress: 'प्रगति में पाठ्यक्रम',
    lessonsCompleted: 'पूरे किए गए पाठ',
    improvementRate: 'सुधार दर',
    explorePopularTopics: 'लोकप्रिय विषय खोजें',
    problemOfTheDay: 'आज का मुख्य प्रश्न',
    solveProblem: 'प्रश्न हल करें',
    studyCalendar: 'अध्ययन कैलेंडर',
    interviewExperiences: 'साक्षात्कार अनुभव व चर्चा',
    placementMilestone: 'प्लेसमेंट तैयारी मील का पत्थर',

    allCourses: 'सभी पाठ्यक्रम',
    development: 'डेवलपमेंट',
    design: 'डिजाइन',
    dataScience: 'डेटा साइंस',
    resumeCourse: 'पाठ्यक्रम जारी रखें',
    modules: 'मॉड्यूल',
    completed: 'पूर्ण',
    markComplete: 'पूर्ण चिह्नित करें और समीक्षा करें',

    verifiedCertifications: 'सत्यापित प्रमाणपत्र (Certifications)',
    addToLinkedIn: 'LinkedIn प्रोफ़ाइल में जोड़ें',
    shareOnLinkedIn: 'LinkedIn पर शेयर करें',
    downloadPdf: 'पीडीएफ डाउनलोड करें',
    viewCertificate: 'प्रमाणपत्र देखें',
    credentialId: 'क्रेडेंशियल आईडी',
    issuedBy: 'द्वारा जारी',

    loginTitle: 'स्मार्ट इंटर्न में साइन इन करें',
    loginSubtitle: 'अपने व्यक्तिगत पाठ्यक्रम तक पहुँचने के लिए पसंदीदा विधि चुनें।',
    continueWithGoogle: 'Google से जारी रखें',
    continueWithEmail: 'Gmail / ईमेल से जारी रखें',
    continueWithPhone: 'फोन नंबर (OTP) से जारी रखें',
    orDivider: 'या क्रेडेंशियल्स से साइन इन करें',
    emailLabel: 'जीमेल या कॉलेज ईमेल पता',
    passwordLabel: 'पासवर्ड',
    phoneLabel: '10 अंकों का मोबाइल नंबर',
    sendOtp: 'सत्यापन OTP भेजें',
    enterOtp: '6 अंकों का OTP दर्ज करें',
    verifyAndContinue: 'सत्यापित करें और साइन इन करें',
    exploreAsGuest: 'अतिथि / डेमो छात्र के रूप में देखें',
    signIn: 'साइन इन करें',
    getStarted: 'मुफ्त शुरुआत करें',
    applyNow: 'आवेदन करें',
    applied: 'आवेदन किया गया',
  },
  es: {
    prep: 'Preparación',
    explore: 'Explorar',
    opportunities: 'Oportunidades',
    dashboard: 'Panel',
    prephub: 'Prephub',
    mypath: 'Planificador Planly',
    planlyPlanner: 'Planificador de Estudio Planly',
    community: 'Comunidad',
    myCourses: 'Mis Cursos',
    assignments: 'Tareas',
    certificates: 'Certificados',
    myProgress: 'Mi Progreso',
    hackathons: 'Hackathons',
    internships: 'Pasantías',
    jobs: 'Empleos',

    searchPlaceholder: 'Buscar temas, hojas, problemas (ej. Sliding Window, Redis)...',
    smartIntern: 'Smart Intern',
    streak: 'Racha',
    xpEarned: 'XP',
    profile: 'Perfil y Nivel',
    profileAndGoals: 'Perfil y Metas',
    notifications: 'Notificaciones',
    logout: 'Cerrar Sesión',
    account: 'Cuenta y Plan',
    accountAndSecurity: 'Cuenta y Seguridad',
    theme: 'Tema',
    themeAndDisplay: 'Tema y Pantalla',
    troubleshooting: 'Diagnóstico',

    welcomeBack: 'Bienvenido de nuevo',
    continueLearning: 'Continuar Aprendiendo',
    coursesInProgress: 'Cursos en Curso',
    lessonsCompleted: 'Lecciones Completadas',
    improvementRate: 'Tasa de Mejora',
    explorePopularTopics: 'Explorar Temas Populares',
    problemOfTheDay: 'Problema del Día',
    solveProblem: 'Resolver Problema',
    studyCalendar: 'Calendario de Estudio',
    interviewExperiences: 'Experiencias de Entrevistas',
    placementMilestone: 'Hito de Preparación Laboral',

    allCourses: 'Todos los Cursos',
    development: 'Desarrollo',
    design: 'Diseño',
    dataScience: 'Ciencia de Datos',
    resumeCourse: 'Reanudar Currículo',
    modules: 'Módulos',
    completed: 'Completado',
    markComplete: 'Marcar Completado y Revisar',

    verifiedCertifications: 'Certificaciones Verificadas',
    addToLinkedIn: 'Añadir a Perfil de LinkedIn',
    shareOnLinkedIn: 'Compartir en LinkedIn',
    downloadPdf: 'Descargar PDF',
    viewCertificate: 'Ver Certificado',
    credentialId: 'ID de Credencial',
    issuedBy: 'Emitido por',

    loginTitle: 'Iniciar Sesión en Smart Intern',
    loginSubtitle: 'Elige tu método preferido para acceder a tu plan de estudio adaptativo.',
    continueWithGoogle: 'Continuar con Google',
    continueWithEmail: 'Continuar con Gmail / Correo',
    continueWithPhone: 'Continuar con Teléfono (OTP)',
    orDivider: 'o ingresa con credenciales',
    emailLabel: 'Correo Gmail o Universitario',
    passwordLabel: 'Contraseña',
    phoneLabel: 'Número Móvil (10 dígitos)',
    sendOtp: 'Enviar Código OTP',
    enterOtp: 'Ingresar Código de 6 Dígitos',
    verifyAndContinue: 'Verificar e Iniciar Sesión',
    exploreAsGuest: 'Explorar como Invitado / Demo',
    signIn: 'Iniciar Sesión',
    getStarted: 'Empezar Gratis',
    applyNow: 'Postularse',
    applied: 'Postulado',
  },
};
