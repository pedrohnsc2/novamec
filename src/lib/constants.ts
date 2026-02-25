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
  owner: "Vinícius",
} as const;

export const SERVICES = [
  {
    id: "revisao",
    title: "Revisão Automotiva Completa",
    description:
      "Checklist completo do seu veículo com inspeção de todos os sistemas, garantindo segurança e performance.",
    icon: "ClipboardCheck",
  },
  {
    id: "mecanica-geral",
    title: "Mecânica Geral",
    description:
      "Motor, câmbio, embreagem e componentes mecânicos. Diagnóstico preciso e reparo com peças de qualidade.",
    icon: "Wrench",
  },
  {
    id: "suspensao-freios",
    title: "Suspensão e Freios",
    description:
      "Amortecedores, molas, pastilhas, discos e todo o sistema de frenagem e suspensão do seu veículo.",
    icon: "CircleDot",
    image: "/images/freio-disco.png",
  },
  {
    id: "injecao-eletronica",
    title: "Injeção Eletrônica",
    description:
      "Diagnóstico computadorizado e manutenção do sistema de injeção eletrônica para todas as marcas.",
    icon: "Cpu",
    image: "/images/diagnostico.png",
  },
  {
    id: "arrefecimento",
    title: "Sistema de Arrefecimento",
    description:
      "Radiador, bomba d'água, válvula termostática e mangueiras. Evite superaquecimento do motor.",
    icon: "Thermometer",
  },
  {
    id: "troca-oleo",
    title: "Troca de Óleo e Filtros",
    description:
      "Troca de óleo do motor e filtros (óleo, ar, combustível, cabine) com produtos de qualidade.",
    icon: "Droplets",
  },
  {
    id: "correia-dentada",
    title: "Correia Dentada",
    description:
      "Troca preventiva da correia dentada e componentes do kit, evitando danos graves ao motor.",
    icon: "Cog",
    image: "/images/correia-dentada.png",
  },
  {
    id: "eletrica",
    title: "Elétrica Automotiva",
    description:
      "Alternador, motor de partida, bateria, faróis e todo o sistema elétrico do seu veículo.",
    icon: "Zap",
  },
  {
    id: "ar-condicionado",
    title: "Ar Condicionado Automotivo",
    description:
      "Recarga, manutenção do compressor e reparo completo do sistema de A/C.",
    icon: "Wind",
  },
  {
    id: "alinhamento",
    title: "Alinhamento",
    description:
      "Alinhamento de direção computadorizado para todas as marcas, garantindo estabilidade e segurança na condução.",
    icon: "Target",
  },
  {
    id: "balanceamento",
    title: "Balanceamento",
    description:
      "Balanceamento de rodas para eliminar vibrações, reduzir desgaste irregular dos pneus e garantir conforto ao dirigir.",
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
    name: "Cliente Google",
    rating: 5,
    text: "Profissional de altíssima qualidade, atendimento excelente, oficina super organizada, tratamento com os clientes de qualidade. Recomendo a todos.",
    service: "Mecânica Geral",
  },
  {
    name: "Cliente Google",
    rating: 5,
    text: "Vinícius é um excelente profissional, super honesto de confiança e explica tudo direitinho. Pra quem é mulher e tem receios, pode ir sem medo, o trabalho é impecável, valores justos. Meu carro ficou perfeito, recomendo super!",
    service: "Revisão Completa",
  },
  {
    name: "Cliente Google",
    rating: 5,
    text: "Fui pelos comentários positivos que vi aqui, não conhecia o local. Atendimento bom e o serviço bem executado, o Vinícius é muito claro sobre os problemas sem enrolação, passa confiança. O carro está ótimo. Recomendo.",
    service: "Diagnóstico",
  },
  {
    name: "Cliente Google",
    rating: 5,
    text: "Atendimento de excelência. Custo e benefício extremamente satisfatório. Parabéns a Novamec, especialmente ao proprietário Vinícius.",
    service: "Mecânica Geral",
  },
  {
    name: "Cliente Google",
    rating: 5,
    text: "Excelente oficina, profissionais bem qualificados, lugar agradável. Recomendo!",
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
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
] as const;
