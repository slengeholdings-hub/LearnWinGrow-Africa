import { Question, Company, Survey, Blog } from './types';

export const initialQuestions: Question[] = [
  {
    id: 1,
    questionText: "Which of the following strategic approaches best represents the concept of 'Agile Resource Allocation' in a volatile market environment?",
    options: [
      { key: 'A', text: "Standardizing operational pipelines across all departments to enforce strict compliance and eliminate waste." },
      { key: 'B', text: "Continuously shifting talent and capital to high-impact projects based on real-time feedback loops and market demand." },
      { key: 'C', text: "Locking in multi-year budgets to ensure project continuity and avoid sudden market fluctuations." },
      { key: 'D', text: "Relying exclusively on senior leadership decisions to reallocate resources during quarterly review cycles." }
    ],
    correctAnswer: 'B'
  },
  {
    id: 2,
    questionText: "In the context of the Google Workspace suite, what is the most secure method for sharing a confidential spreadsheet with an external auditor?",
    options: [
      { key: 'A', text: "Generating a public sharing link and setting permission to 'Anyone with the link can edit'." },
      { key: 'B', text: "Inviting the auditor's specific email address directly with 'Viewer' permissions, while disabling the options to download, print, or copy." },
      { key: 'C', text: "Downloading the file as a PDF and sending it via unencrypted instant messaging apps." },
      { key: 'D', text: "Publishing the document to the web to make it searchable for auditing validation." }
    ],
    correctAnswer: 'B'
  },
  {
    id: 3,
    questionText: "Which of the following describes the core objective of 'Prompt Engineering' when working with Large Language Models (LLMs)?",
    options: [
      { key: 'A', text: "Writing low-level assembly code to optimize the neural network's weights directly." },
      { key: 'B', text: "Structuring input text, parameters, and examples strategically to guide the model to generate the most accurate and context-aware responses." },
      { key: 'C', text: "Upgrading server-side GPU hardware to increase prompt processing speeds." },
      { key: 'D', text: "Enforcing strict firewall rules to block AI interactions in high-security corporate networks." }
    ],
    correctAnswer: 'B'
  },
  {
    id: 4,
    questionText: "When designing a digital commerce app for rural entrepreneurs in South Africa, what is the most critical technical constraint to optimize for?",
    options: [
      { key: 'A', text: "Requiring the latest high-end smartphone hardware to run 3D visual assets." },
      { key: 'B', text: "Deploying high-latency animations and background music players." },
      { key: 'C', text: "Integrating offline data persistence and light data payloads to accommodate unstable network connectivity and high mobile data costs." },
      { key: 'D', text: "Strict reliance on continuous 5G connection to stream video instructions." }
    ],
    correctAnswer: 'C'
  },
  {
    id: 5,
    questionText: "Which of the following best defines the role of 'Emotional Intelligence' (EQ) in high-performing hybrid or remote teams?",
    options: [
      { key: 'A', text: "Minimizing direct contact with team members to prevent personal conflicts." },
      { key: 'B', text: "Actively monitoring mouse movements to log employee hours and predict fatigue." },
      { key: 'C', text: "Nurturing empathy, actively listening, resolving conflicts constructively, and understanding team members' non-verbal cues across digital media." },
      { key: 'D', text: "Automating all team communications using standard canned chatbot messages." }
    ],
    correctAnswer: 'C'
  }
];

export const initialCompanies: Company[] = [
  {
    id: 'c1',
    name: "Vertex Global Finance",
    description: "A leading pan-African digital banking institution deploying modern AI credit scoring models to empower micro-businesses.",
    matchRate: 96,
    sector: "Fintech",
    location: "Gauteng",
    logo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Actively Hiring",
    isFeatured: true
  },
  {
    id: 'c2',
    name: "Nova Green Systems",
    description: "Designing intelligent IoT-driven microgrid solutions to bring reliable, renewable energy to agricultural cooperatives.",
    matchRate: 92,
    sector: "Renewable Energy",
    location: "Western Cape",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Actively Hiring",
    isFeatured: true
  },
  {
    id: 'c3',
    name: "AgriTech SA",
    description: "Developing satellite-based soil moisture mapping tools to assist emerging farming communities in adapting to climate shifts.",
    matchRate: 88,
    sector: "Agriculture",
    location: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Actively Hiring"
  },
  {
    id: 'c4',
    name: "CloudCore SA",
    description: "Providing secure local cloud infrastructure and managed micro-databases for high-growth tech startups in Southern Africa.",
    matchRate: 89,
    sector: "Tech",
    location: "Gauteng",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Actively Hiring"
  },
  {
    id: 'c5',
    name: "Zando Pay",
    description: "The next-generation mobile wallet and loyalty API enabling seamless informal market commerce with zero transaction fees.",
    matchRate: 85,
    sector: "Fintech",
    location: "Western Cape",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Hiring Soon"
  },
  {
    id: 'c6',
    name: "Vitality Lab",
    description: "Empowering mobile clinics with secure cloud-based patient record synchronization and predictive medication supply logs.",
    matchRate: 82,
    sector: "Tech",
    location: "Gauteng",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Hiring Soon"
  },
  {
    id: 'c7',
    name: "Creative Pulse",
    description: "An innovative digital gaming studio capturing local folklore and translating it into immersive global mobile RPG experiences.",
    matchRate: 91,
    sector: "Creative Economy",
    location: "KwaZulu-Natal",
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=200",
    bannerImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
    hiringStatus: "Actively Hiring"
  }
];

export const initialSurveys: Survey[] = [
  { id: 's1', title: "Q3 Youth Digital Skills Inventory", status: "Active", responses: 1450, completionRate: 92.5 },
  { id: 's2', title: "Rural Agricultural Connectivity Study", status: "Active", responses: 890, completionRate: 84.2 },
  { id: 's3', title: "Fintech Trust & Usability Survey", status: "Scheduled", responses: 0, completionRate: 0.0 },
  { id: 's4', title: "Q2 Life Skills Readiness Benchmark", status: "Completed", responses: 2400, completionRate: 97.8 }
];

export const blogs: Blog[] = [
  {
    id: 'b1',
    title: "Navigating the 4th Industrial Revolution: A South African Youth Perspective",
    category: "Future Work",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300",
    snippet: "How the rapid growth of digital tools and automation presents a unique leapfrogging opportunity for young professionals across Africa."
  },
  {
    id: 'b2',
    title: "The Rise of Low-Code/No-Code: Building Enterprise Solutions with Minimal Code",
    category: "Technology",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=300",
    snippet: "Discover how non-technical founders and workers are utilizing modern workflow builders to deploy commercial MVPs in days rather than months."
  },
  {
    id: 'b3',
    title: "Acing the Aptitude Test: Strategic Mindsets for Critical Thinkers",
    category: "Career Guidance",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300",
    snippet: "Our top recruiters break down the mental framework required to answer complex, scenario-based logical and critical reasoning questions."
  }
];
