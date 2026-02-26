export const BUSINESS = {
  name: "NOVAMEC Oficina Mecânica",
  shortName: "Novamec",
  tagline:
    "Mecânica e Revisão de Confiança em Contagem-MG. Transparência, qualidade e preço justo.",
  phone: "+5531997313901",
  phoneDisplay: "(31) 99731-3901",
  whatsapp: "5531997313901",
  whatsappDisplay: "(31) 99731-3901",
  whatsappMessage: "Olá! Gostaria de agendar um serviço na Novamec.",
  email: "oficinanovamec@gmail.com",
  address: {
    street: "R. Natal Veronez, 1179",
    complement: "",
    neighborhood: "Três Barras",
    city: "Contagem",
    state: "MG",
    zip: "32041-090",
    full: "R. Natal Veronez, 1179 – Três Barras, Contagem – MG, 32041-090",
  },
  geo: {
    latitude: -19.9132046,
    longitude: -44.0735025,
  },
  hours: [
    { day: "Segunda a Sexta", time: "08:00 – 18:00" },
    { day: "Sábado e Domingo", time: "Fechado" },
  ],
  social: {
    instagram: "https://instagram.com/oficinanovamec",
  },
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.5!2d-44.0735025!3d-19.9132046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU0JzQ3LjUiUyA0NMKwMDQnMjQuNiJX!5e0!3m2!1spt-BR!2sbr!4v1",
    link: "https://maps.google.com/?q=NOVAMEC+Oficina+Mec%C3%A2nica+Contagem",
  },
  url: "https://www.novamec.com.br",
  rating: {
    value: 4.9,
    count: 65,
    source: "Google",
  },
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJAZqMJcaVpgAR-brWzNS19HQ",
  owner: "Vinícius",
} as const;

export const SERVICES = [
  {
    id: "revisao",
    title: "Revisão Automotiva Completa",
    description:
      "Dirija com tranquilidade sabendo que seu carro está 100%. Fazemos uma inspeção detalhada de todos os sistemas para prevenir problemas e garantir sua segurança.",
    icon: "ClipboardCheck",
  },
  {
    id: "mecanica-geral",
    title: "Mecânica Geral",
    description:
      "Seu carro volta a rodar como novo. Cuidamos de motor, câmbio, embreagem e demais componentes com diagnóstico preciso e peças de qualidade.",
    icon: "Wrench",
  },
  {
    id: "suspensao-freios",
    title: "Suspensão e Freios",
    description:
      "Mais estabilidade nas curvas e frenagem segura para você e sua família. Reparamos amortecedores, molas, pastilhas, discos e todo o sistema.",
    icon: "CircleDot",
    image: "/images/freio-disco.png",
  },
  {
    id: "injecao-eletronica",
    title: "Injeção Eletrônica",
    description:
      "Economia de combustível e motor funcionando redondo. Fazemos diagnóstico computadorizado e manutenção do sistema de injeção para todas as marcas.",
    icon: "Cpu",
    image: "/images/diagnostico.png",
  },
  {
    id: "arrefecimento",
    title: "Sistema de Arrefecimento",
    description:
      "Evite surpresas com o motor superaquecendo. Cuidamos do radiador, bomba d'água, válvula termostática e mangueiras do seu veículo.",
    icon: "Thermometer",
  },
  {
    id: "troca-oleo",
    title: "Troca de Óleo e Filtros",
    description:
      "Prolongue a vida útil do seu motor com troca de óleo e filtros no prazo certo, usando produtos de qualidade comprovada.",
    icon: "Droplets",
  },
  {
    id: "correia-dentada",
    title: "Correia Dentada",
    description:
      "Proteja seu motor contra danos graves. A troca preventiva da correia dentada e do kit evita reparos caros no futuro.",
    icon: "Cog",
    image: "/images/correia-dentada.png",
  },
  {
    id: "eletrica",
    title: "Elétrica Automotiva",
    description:
      "Sem problemas de partida ou falhas elétricas. Resolvemos questões de alternador, motor de partida, bateria, faróis e todo o sistema elétrico.",
    icon: "Zap",
  },
  {
    id: "alinhamento",
    title: "Alinhamento",
    description:
      "Seu carro anda reto e os pneus duram mais. Fazemos alinhamento computadorizado para todas as marcas, garantindo estabilidade e segurança.",
    icon: "Target",
  },
  {
    id: "balanceamento",
    title: "Balanceamento",
    description:
      "Viaje com mais conforto, sem vibrações no volante. O balanceamento correto também reduz o desgaste irregular dos seus pneus.",
    icon: "Circle",
  },
] as const;

export const DIFFERENTIALS = [
  {
    icon: "Search",
    title: "Transparência Total",
    description:
      "Explicamos cada serviço antes de executar. Você sabe exatamente o que será feito e quanto vai custar.",
  },
  {
    icon: "BadgeDollarSign",
    title: "Preço Justo",
    description:
      "Orçamento detalhado sem surpresas. Valores honestos e compatíveis com a qualidade entregue.",
  },
  {
    icon: "Star",
    title: "4.9 no Google",
    description:
      "Mais de 65 avaliações reais de clientes satisfeitos. Nossa reputação fala por nós.",
  },
  {
    icon: "Car",
    title: "Nacionais e Importados",
    description:
      "Atendemos todas as marcas e modelos, com conhecimento técnico para cada tipo de veículo.",
  },
] as const;

export const TEAM = [
  {
    name: "Vinícius",
    role: "Proprietário e Mecânico Chefe",
    bio: "Profissional com vasta experiência em mecânica automotiva, reconhecido pelos clientes pela transparência, honestidade e excelência técnica.",
    image: "/images/team/vinicius.png",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Damarys Silva",
    rating: 5,
    text: "Vinícius é um excelente profissional, super honesto de confiança e explica tudo direitinho. Pra quem é mulher e tem receios, pode ir sem medo, o trabalho é impecável, valores justos. Meu carro ficou perfeito, recomendo super!",
    service: "Revisão Completa",
  },
  {
    name: "Raquel America",
    rating: 5,
    text: "Fui pelos comentários positivos que vi aqui, não conhecia o local. Atendimento bom e o serviço bem executado, o Vinícius é muito claro sobre os problemas sem enrolação, passa confiança. O carro está ótimo. Recomendo.",
    service: "Diagnóstico",
  },
  {
    name: "Marcus Felix",
    rating: 5,
    text: "Atendimento de excelência. Custo e benefício extremamente satisfatório. Parabéns a Novamec, especialmente ao proprietário Vinícius.",
    service: "Mecânica Geral",
  },
  {
    name: "Gilbert Giba",
    rating: 5,
    text: "Excelente oficina, profissionais bem qualificados, lugar agradável. Recomendo a todos!",
    service: "Mecânica Geral",
  },
  {
    name: "Rafael Santos",
    rating: 5,
    text: "Fiz uma revisão geral no meu veículo na NOVAMEC e o serviço foi impecável! O atendimento foi excelente, o prazo foi cumprido à risca, e o carro ficou perfeito.",
    service: "Revisão Completa",
  },
  {
    name: "Flavio Souza",
    rating: 5,
    text: "Atendimento honesto, serviço confiável e bem executado!",
    service: "Mecânica Geral",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Vocês atendem carros importados?",
    answer:
      "Sim! Atendemos veículos nacionais e importados de todas as marcas e modelos, com conhecimento técnico especializado para cada tipo de veículo.",
  },
  {
    question: "Preciso agendar horário?",
    answer:
      "Recomendamos agendar pelo WhatsApp para garantir o melhor atendimento. Assim conseguimos reservar um horário dedicado para o seu veículo.",
  },
  {
    question: "Qual o horário de funcionamento?",
    answer:
      "Funcionamos de segunda a sexta-feira, das 08h às 18h. Sábados, domingos e feriados estamos fechados.",
  },
  {
    question: "Vocês fazem orçamento?",
    answer:
      "Sim! Realizamos diagnóstico e apresentamos um orçamento detalhado antes de iniciar qualquer serviço. Sem surpresas.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos PIX, dinheiro e cartão de crédito em até 12x (juros da maquininha).",
  },
  {
    question: "Os serviços têm garantia?",
    answer:
      "Sim, oferecemos garantia nos nossos serviços. Consulte as condições específicas no momento do orçamento.",
  },
  {
    question: "Onde fica a oficina?",
    answer:
      "Estamos na R. Natal Veronez, 1179, no bairro Três Barras, em Contagem-MG. Fácil acesso pela região metropolitana de Belo Horizonte.",
  },
] as const;

export const NAV_LINKS = [
  { href: "/#top", label: "Início" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
] as const;
