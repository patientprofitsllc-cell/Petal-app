import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flower2,
  Heart,
  Home,
  Info,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Trash2,
  X,
} from 'lucide-react';

type Step = {
  title: string;
  text: string;
  tip: string;
  moment: string;
  emoji: string;
};
type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  mins: number;
  emoji: string;
  tone: string;
  steps: Step[];
};
type Product = {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  tag: string;
  tone: string;
  best: string;
  change: string;
  know: string;
  lesson: string;
};

const lessons: Lesson[] = [
  {
    id: 'first',
    title: 'My first period. Now what?',
    subtitle: 'A calm, easy first-day walkthrough.',
    category: 'START HERE',
    mins: 4,
    emoji: '🌷',
    tone: 'pink',
    steps: [
      {
        title: 'First, take a breath',
        text: 'Seeing blood in your underwear can be surprising. It is a normal part of growing up. You do not need to know everything today.',
        tip: 'A first period can be light, spotty, red, pink, or brown.',
        moment: 'You notice a spot while getting dressed.',
        emoji: '💗',
      },
      {
        title: 'Grab a pad and clean underwear',
        text: 'A regular unscented pad is often the easiest place to start. Ask a trusted adult, school nurse, or friend if you do not have one.',
        tip: 'You can make a temporary layer with folded toilet paper while you find a pad. Replace it with a proper product soon.',
        moment: 'You are in a school bathroom without supplies.',
        emoji: '🎒',
      },
      {
        title: 'Put the pad in your underwear',
        text: 'Open the wrapper, peel off the backing, and press the sticky side into the center of your underwear. Fold the wings underneath if it has them.',
        tip: 'The soft absorbent side faces your body, not your underwear.',
        moment: 'You have a new pad in its wrapper.',
        emoji: '🩷',
      },
      {
        title: 'Freshen up, then carry on',
        text: 'Wash your hands, gently wipe from front to back, and put on fresh underwear if needed. Change the pad every few hours, or sooner when wet.',
        tip: 'Wrap used pads and place them in the trash; never flush them.',
        moment: 'You are checking your pad between classes.',
        emoji: '🫧',
      },
      {
        title: 'Tell someone you trust',
        text: 'You might want help getting supplies, managing cramps, or just talking. A caregiver, school nurse, or another trusted adult can help.',
        tip: 'Your cycle may be irregular during the first couple of years. If bleeding is very heavy or pain is severe, ask for medical advice.',
        moment: 'You are home and wondering what happens next.',
        emoji: '🤝',
      },
    ],
  },
  {
    id: 'pad',
    title: 'How to use a pad',
    subtitle: 'From opening the wrapper to changing it.',
    category: 'STEP BY STEP',
    mins: 3,
    emoji: '🩷',
    tone: 'peach',
    steps: [
      {
        title: 'Wash your hands',
        text: 'Start with clean hands and take a fresh pad out of the package.',
        tip: 'Unscented pads can be gentler on sensitive skin.',
        moment: 'You are in the bathroom with a wrapped pad.',
        emoji: '🫧',
      },
      {
        title: 'Unwrap and peel',
        text: 'Open the wrapper and peel away the paper covering the sticky strip. Keep the wrapper for disposal later.',
        tip: 'The sticky side goes against the fabric of your underwear.',
        moment: 'The pad is unfolded in your hands.',
        emoji: '🎀',
      },
      {
        title: 'Place it in the middle',
        text: 'Press the pad inside the center of your underwear. If it has wings, fold them around the underside.',
        tip: 'Smooth it down so it feels secure and comfortable.',
        moment: 'The pad sits flat in your underwear.',
        emoji: '✨',
      },
      {
        title: 'Check and change',
        text: 'Change your pad every few hours and sooner if it feels wet, full, or uncomfortable. You may need changes more often with heavier flow.',
        tip: 'A spare pad in a small pouch is handy at school or on trips.',
        moment: 'A few hours have passed.',
        emoji: '🕒',
      },
      {
        title: 'Wrap, bin, wash',
        text: 'Peel the used pad off, roll it up, wrap it in paper or the new pad wrapper, and put it in a trash bin. Wash your hands.',
        tip: 'Never flush a pad or its wrapper.',
        moment: 'You are ready to put on a fresh pad.',
        emoji: '🗑️',
      },
    ],
  },
  {
    id: 'tampon',
    title: 'Tampons, without the confusion',
    subtitle: 'Safe, optional, and on your terms.',
    category: 'PRODUCT SKILLS',
    mins: 5,
    emoji: '🪷',
    tone: 'lilac',
    steps: [
      {
        title: 'Decide if you want to try one',
        text: 'Tampons absorb blood inside the vagina. They are a choice, not a requirement. Read the directions included in your specific package first.',
        tip: 'Use the lowest absorbency that works for your flow.',
        moment: 'You are thinking about swimming or sports.',
        emoji: '💭',
      },
      {
        title: 'Wash hands and get comfortable',
        text: 'Wash your hands. Sit on the toilet or stand with one foot raised. Relax your muscles and take your time.',
        tip: 'If you feel pressured, it is okay to choose a pad instead.',
        moment: 'You are trying a tampon for the first time.',
        emoji: '🫧',
      },
      {
        title: 'Follow the package directions',
        text: 'Gently insert the tampon into the vagina using the applicator if included, following the diagram on the packaging. The removal string stays outside your body.',
        tip: 'It should feel comfortable. If it hurts or will not go in, stop; never force it.',
        moment: 'You have an applicator tampon and the box instructions.',
        emoji: '📖',
      },
      {
        title: 'Set a safe change routine',
        text: 'Change a tampon every 4 to 8 hours, and never leave one in for more than 8 hours. Only wear tampons during a period.',
        tip: 'For overnight use longer than 8 hours, choose a pad or suitable period underwear.',
        moment: 'You are planning a school day or bedtime.',
        emoji: '⏰',
      },
      {
        title: 'Remove gently and throw away',
        text: 'Wash your hands, relax, and gently pull the string down and forward. Wrap the used tampon and place it in the trash.',
        tip: 'Do not flush tampons or applicators.',
        moment: 'It is time to change to a fresh product.',
        emoji: '🗑️',
      },
      {
        title: 'Know the important warning signs',
        text: 'Toxic shock syndrome is rare but serious. Sudden fever, vomiting, diarrhea, faintness, or a sunburn-like rash while or soon after using a tampon needs urgent medical attention.',
        tip: 'Remove the tampon and seek immediate medical care if those symptoms occur.',
        moment: 'You notice unusual symptoms and feel very unwell.',
        emoji: '🩺',
      },
    ],
  },
  {
    id: 'wash',
    title: 'Your gentle hygiene routine',
    subtitle: 'Feel fresh without overdoing it.',
    category: 'SELF CARE',
    mins: 3,
    emoji: '🫧',
    tone: 'mint',
    steps: [
      {
        title: 'Start with clean hands',
        text: 'Wash your hands before and after changing period products. This is one of the easiest ways to stay hygienic.',
        tip: 'Soap and water are enough for your hands.',
        moment: 'You are about to change your pad.',
        emoji: '👐',
      },
      {
        title: 'Wash the outside only',
        text: 'In the shower, gently rinse the vulva (the skin on the outside) with lukewarm water. If you use soap, choose a mild unscented one only for the outer skin.',
        tip: 'The vagina cleans itself. Never wash inside it or douche.',
        moment: 'You are taking a shower during your period.',
        emoji: '🚿',
      },
      {
        title: 'Dry gently and change clothes',
        text: 'Pat the area dry with a clean towel and put on fresh, breathable underwear. Change out of damp clothes when you can.',
        tip: 'You do not need perfume, scented sprays, or special washes.',
        moment: 'You are getting dressed after showering.',
        emoji: '🌿',
      },
      {
        title: 'Change products regularly',
        text: 'Change pads every few hours; change tampons every 4 to 8 hours and never beyond 8 hours. Follow the instructions for cups and period underwear.',
        tip: 'Comfort, flow, and package instructions help guide you.',
        moment: 'You are checking in during the day.',
        emoji: '⏳',
      },
      {
        title: 'Notice changes without embarrassment',
        text: 'A period may have a mild scent. Strong unusual odor, itching, burning, or unusual discharge should be checked by a healthcare professional.',
        tip: 'It is always okay to ask a medical professional about a concern.',
        moment: 'You wonder what is normal and what is not.',
        emoji: '💬',
      },
    ],
  },
  {
    id: 'school',
    title: 'A leak at school? You have a plan.',
    subtitle: 'A no-panic guide to real-life moments.',
    category: 'REAL LIFE',
    mins: 3,
    emoji: '🎒',
    tone: 'blue',
    steps: [
      {
        title: 'You are not the only one',
        text: 'Leaks happen to lots of people. They are not a sign that you did anything wrong.',
        tip: 'Take a slow breath. You can handle this.',
        moment: 'You see a mark on your clothes between classes.',
        emoji: '💞',
      },
      {
        title: 'Find somewhere private',
        text: 'Head to a restroom if you can. Tie a sweatshirt around your waist or ask a friend for one if you want extra coverage.',
        tip: 'Choose whatever helps you feel comfortable.',
        moment: 'You need to get to the bathroom discreetly.',
        emoji: '🚪',
      },
      {
        title: 'Use a clean product',
        text: 'Change your pad or other product. If you have no supplies, ask a trusted friend, teacher, front office, or school nurse.',
        tip: 'Keep a small pouch with pads, underwear, tissues, and a sealable bag if possible.',
        moment: 'You are short on supplies.',
        emoji: '👜',
      },
      {
        title: 'Handle the stain',
        text: 'Rinse stained fabric with cool water when possible. Change into spare clothes if you have them, or ask the nurse or trusted adult for help.',
        tip: 'Cold water is usually better than hot water for fresh blood stains.',
        moment: 'You are home and washing a stained pair of underwear.',
        emoji: '💧',
      },
      {
        title: 'Go back to your day',
        text: 'A leak does not need to ruin your whole day. It is okay to ask for a break or for help.',
        tip: 'You deserve support, not embarrassment.',
        moment: 'You are ready to head back to class.',
        emoji: '🌈',
      },
    ],
  },
  {
    id: 'underwear',
    title: 'How period underwear works',
    subtitle: 'Wear, change, wash, repeat.',
    category: 'PRODUCT SKILLS',
    mins: 3,
    emoji: '🩲',
    tone: 'lilac',
    steps: [
      {
        title: 'Choose a suitable absorbency',
        text: 'Period underwear has layers designed to absorb menstrual flow. Pick a level that fits your flow and follow the brand instructions.',
        tip: 'Some people use it as backup protection on heavy days.',
        moment: 'You are comparing two pairs at a store.',
        emoji: '🔎',
      },
      {
        title: 'Put it on like regular underwear',
        text: 'Wear it with the absorbent panel in place. Make sure it fits comfortably and is not too tight.',
        tip: 'You can wear it alone or as backup with another product.',
        moment: 'You are getting dressed in the morning.',
        emoji: '💜',
      },
      {
        title: 'Change when needed',
        text: 'How long you can wear it depends on your flow and the product. Change if it feels wet, saturated, or uncomfortable.',
        tip: 'Take a spare pair and a waterproof bag when you will be out for a while.',
        moment: 'You are away from home for the day.',
        emoji: '🧺',
      },
      {
        title: 'Wash using the care label',
        text: 'Follow the manufacturer instructions for rinsing, washing, and drying. Make sure the underwear is fully dry before reusing.',
        tip: 'Avoid guessing washing methods; fabrics vary.',
        moment: 'You are doing laundry after your period.',
        emoji: '🫧',
      },
    ],
  },
  {
    id: 'cramps',
    title: 'Cramps and feeling better',
    subtitle: 'Gentle ways to care for yourself.',
    category: 'FEEL BETTER',
    mins: 3,
    emoji: '☀️',
    tone: 'peach',
    steps: [
      {
        title: 'Notice how you feel',
        text: 'Mild cramps, tiredness, and mood changes can happen during a period. Everyone experiences them differently.',
        tip: 'You deserve comfort and to have your pain taken seriously.',
        moment: 'Your lower belly feels achy.',
        emoji: '💛',
      },
      {
        title: 'Try gentle warmth',
        text: 'A heating pad on a comfortable low setting or warm bath may help cramps. Avoid burns and do not fall asleep with a heating pad on.',
        tip: 'Wrap heat packs in cloth and follow product instructions.',
        moment: 'You are relaxing at home after school.',
        emoji: '🌤️',
      },
      {
        title: 'Eat, drink, and move gently',
        text: 'Stay hydrated, eat regular meals, and try stretching or a gentle walk if you feel up to it. Rest is also fine.',
        tip: 'There is no need to push through pain.',
        moment: 'You are planning the rest of your day.',
        emoji: '🥛',
      },
      {
        title: 'Speak up when pain is too much',
        text: 'If cramps are severe, stop normal activities, or are getting worse, talk to a healthcare professional. Ask a trusted adult about safe pain relief options.',
        tip: 'Seek urgent help for fainting, severe sudden pain, or heavy bleeding with dizziness.',
        moment: 'Pain is keeping you from school or sleep.',
        emoji: '🤍',
      },
    ],
  },
  {
    id: 'cup',
    title: 'Menstrual cups: the basics',
    subtitle: 'Another option when you feel ready.',
    category: 'PRODUCT SKILLS',
    mins: 4,
    emoji: '🌼',
    tone: 'mint',
    steps: [
      {
        title: 'Read your cup instructions',
        text: 'Menstrual cups are flexible reusable products that collect flow inside the vagina. Different cups have different directions for wear and cleaning.',
        tip: 'There is no need to start with a cup if it does not appeal to you.',
        moment: 'You are opening a menstrual cup package.',
        emoji: '📖',
      },
      {
        title: 'Clean hands and prepare the cup',
        text: 'Wash your hands. Clean or sanitize the cup according to its instructions before first use. Follow your brand guide for folding and inserting.',
        tip: 'Never force an uncomfortable product.',
        moment: 'You are preparing for first use.',
        emoji: '🫧',
      },
      {
        title: 'Insert gently as directed',
        text: 'Follow the manufacturer guide to fold, insert, and allow the cup to open and seal. It should feel comfortable.',
        tip: 'If insertion hurts, stop and ask a healthcare professional for advice.',
        moment: 'You are practicing with your cup at home.',
        emoji: '🌸',
      },
      {
        title: 'Empty on schedule',
        text: 'Follow your product guidance; many cups can be worn for up to 8–12 hours depending on the product and flow. Empty sooner if full.',
        tip: 'Never exceed the product instructions, and clean the cup as directed.',
        moment: 'You are planning a long day.',
        emoji: '🕒',
      },
      {
        title: 'Break the seal to remove',
        text: 'Wash your hands. Relax, gently pinch the base to release suction, remove carefully, and empty into the toilet. Wash and store following the product directions.',
        tip: 'Do not pull hard on the stem without releasing the seal.',
        moment: 'You are removing a cup after use.',
        emoji: '🌱',
      },
    ],
  },
];

const products: Product[] = [
  {
    id: 'pads',
    name: 'Pads',
    subtitle: 'Stick into underwear. Easy to start with.',
    emoji: '🩷',
    tag: 'FIRST-PERIOD FRIENDLY',
    tone: 'pink',
    best: 'First periods, school days, and anyone who prefers external products.',
    change: 'Every few hours, or sooner when wet or full.',
    know: 'Try unscented pads; wings can add security. Choose regular or overnight coverage based on flow.',
    lesson: 'pad',
  },
  {
    id: 'underwear',
    name: 'Period underwear',
    subtitle: 'Absorbent, washable underwear.',
    emoji: '🩲',
    tag: 'REUSABLE',
    tone: 'lilac',
    best: 'Everyday comfort, sleep, and backup protection.',
    change: 'When wet or saturated, according to flow and product directions.',
    know: 'Absorbency differs by brand. Follow the care label for washing and drying.',
    lesson: 'underwear',
  },
  {
    id: 'tampons',
    name: 'Tampons',
    subtitle: 'Wear inside the vagina, with a string for removal.',
    emoji: '🪷',
    tag: 'FOR WHEN YOU ARE READY',
    tone: 'blue',
    best: 'Swimming, sports, or anyone who prefers internal products.',
    change: 'Every 4–8 hours. Never beyond 8 hours.',
    know: 'Use the lowest absorbency needed, read the package directions, and never force insertion.',
    lesson: 'tampon',
  },
  {
    id: 'cups',
    name: 'Menstrual cups',
    subtitle: 'Flexible reusable cups that collect flow.',
    emoji: '🌼',
    tag: 'REUSABLE',
    tone: 'mint',
    best: 'People who want a longer-wear reusable option.',
    change: 'Follow product directions; often up to 8–12 hours.',
    know: 'Practice at home, clean correctly, and release the seal before removing.',
    lesson: 'cup',
  },
  {
    id: 'liners',
    name: 'Panty liners',
    subtitle: 'Thin protection for very light spotting.',
    emoji: '🌿',
    tag: 'LIGHT DAYS',
    tone: 'peach',
    best: 'Very light spotting or a little extra backup.',
    change: 'Replace every few hours or if damp.',
    know: 'Not usually absorbent enough for regular or heavy flow.',
    lesson: 'pad',
  },
];

const faqs = [
  {
    q: 'What if my period is brown?',
    a: 'Period blood can be red, dark red, or brown. Brown often means the blood has taken longer to leave the body. Ask a healthcare professional if you notice other concerning symptoms.',
  },
  {
    q: 'Do I have to use tampons?',
    a: 'Not at all. Pads, period underwear, tampons, and cups are options, not requirements. The best product is one you can use safely and comfortably.',
  },
  {
    q: 'Can I shower during my period?',
    a: 'Yes! Showering is safe. Gently wash the outer vulva; the vagina cleans itself and should not be washed inside.',
  },
  {
    q: 'What if my period is irregular?',
    a: 'Cycles can be irregular during the first few years. Talk with a healthcare professional if you go more than 3 months without a period after your periods have started, or if you have other concerns.',
  },
  {
    q: 'Is it normal to have a smell?',
    a: 'A mild scent can be normal. You do not need scented products. Strong unusual odor, itching, burning, or unusual discharge deserves medical advice.',
  },
  {
    q: 'When is bleeding too heavy?',
    a: 'Get medical advice if you soak through a pad or tampon every 1–2 hours, bleed for more than 7 days, or miss normal activities because of symptoms. Seek urgent care with heavy bleeding and dizziness or fainting.',
  },
];

const careItems = [
  {
    id: 'hands',
    title: 'Wash my hands',
    detail: 'Before and after changing a product',
    emoji: '🫧',
  },
  {
    id: 'product',
    title: 'Change my protection',
    detail: 'Regularly, based on my flow and product',
    emoji: '🩷',
  },
  {
    id: 'gentle',
    title: 'Keep it gentle',
    detail: 'Clean outer skin only; skip fragrance',
    emoji: '🌿',
  },
  {
    id: 'fresh',
    title: 'Feel comfortable',
    detail: 'Clean underwear and a fresh outfit if needed',
    emoji: '✨',
  },
  {
    id: 'kind',
    title: 'Be kind to myself',
    detail: 'Water, rest, and asking for help count',
    emoji: '💗',
  },
];

const sourceLinks = [
  {
    title: 'ACOG · Your First Period',
    url: 'https://www.acog.org/womens-health/faqs/your-first-period',
  },
  {
    title: 'CDC · Menstrual Hygiene',
    url: 'https://www.cdc.gov/hygiene/about/menstrual-hygiene.html',
  },
  {
    title: 'FDA · Tampon Safety',
    url: 'https://www.fda.gov/consumers/consumer-updates/facts-tampons-and-tampon-safety',
  },
];

const readStorage = (key: string): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(v) ? v.filter(a => typeof a === 'string') : [];
  } catch {
    return [];
  }
};

function App() {
  const [view, setView] = useState('home');
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>(() =>
    readStorage('petal_completed')
  );
  const [saved, setSaved] = useState<string[]>(() =>
    readStorage('petal_saved')
  );
  const [checked, setChecked] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [clearDialog, setClearDialog] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const lesson = lessons.find(item => item.id === currentLesson) || null;
  const product = products.find(item => item.id === activeProduct) || null;
  const completion = Math.round((completed.length / lessons.length) * 100);
  const filteredLessons = useMemo(
    () =>
      lessons.filter(item =>
        (item.title + ' ' + item.subtitle + ' ' + item.category)
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );
  useEffect(() => {
    localStorage.setItem('petal_completed', JSON.stringify(completed));
  }, [completed]);
  useEffect(() => {
    localStorage.setItem('petal_saved', JSON.stringify(saved));
  }, [saved]);
  useEffect(() => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('./sw.js').catch(() => {});
  }, []);
  const navigate = (next: string) => {
    setView(next);
    setCurrentLesson(null);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openLesson = (id: string) => {
    setCurrentLesson(id);
    setStepIndex(0);
    setView('lesson');
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const nextStep = () => {
    if (!lesson) return;
    if (stepIndex < lesson.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCompleted(prev =>
        prev.includes(lesson.id) ? prev : [...prev, lesson.id]
      );
      navigate('learn');
    }
  };
  const toggleSaved = (id: string) =>
    setSaved(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  const erase = () => {
    localStorage.removeItem('petal_completed');
    localStorage.removeItem('petal_saved');
    setCompleted([]);
    setSaved([]);
    setChecked([]);
    setClearDialog(false);
  };
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Lessons', icon: BookOpen },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'care', label: 'My care', icon: Heart },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ];
  const quizFits: Record<string, string[]> = {
    'Just starting': ['pads', 'underwear'],
    'School & everyday': ['pads', 'underwear', 'liners'],
    'Swimming or sports': ['tampons', 'cups'],
    'Reusable options': ['underwear', 'cups'],
    'Sleep comfortably': ['pads', 'underwear'],
  };
  const ButtonArrow = () => (
    <ArrowRight size={17} strokeWidth={2.3} aria-hidden="true" />
  );
  const LessonCard = ({
    item,
    featured = false,
  }: {
    item: Lesson;
    featured?: boolean;
  }) => (
    <article
      className={
        'lesson-card ' + (featured ? 'featured-lesson ' : '') + item.tone
      }
    >
      <div className="lesson-card-top">
        <div className="lesson-emoji" aria-hidden="true">
          {item.emoji}
        </div>
        <button
          className={
            'save-button ' + (saved.includes(item.id) ? 'is-saved' : '')
          }
          onClick={() => toggleSaved(item.id)}
          aria-label={
            (saved.includes(item.id) ? 'Remove' : 'Save') + ' ' + item.title
          }
        >
          <Bookmark
            size={19}
            fill={saved.includes(item.id) ? 'currentColor' : 'none'}
          />
        </button>
      </div>
      <div className="eyebrow">
        {item.category} <span className="bullet">·</span> {item.mins} MIN READ
      </div>
      <h3>{item.title}</h3>
      <p>{item.subtitle}</p>
      <button className="inline-go" onClick={() => openLesson(item.id)}>
        {completed.includes(item.id) ? 'Review lesson' : 'Start lesson'}{' '}
        <ButtonArrow />
      </button>
      {completed.includes(item.id) && (
        <div className="done-tag">
          <CheckCircle2 size={14} /> Completed
        </div>
      )}
    </article>
  );
  return (
    <div className="app-shell">
      <aside className="desktop-sidebar">
        <button
          className="brand big-brand"
          onClick={() => navigate('home')}
          aria-label="Petal home"
        >
          <span className="brand-mark">
            <Flower2 size={23} strokeWidth={2.3} />
          </span>
          <span>
            petal<span className="brand-dot">.</span>
          </span>
        </button>
        <div className="sidebar-kicker">YOUR SAFE SPACE</div>
        <nav aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={
                'nav-link ' +
                (view === id || (view === 'lesson' && id === 'learn')
                  ? 'active'
                  : '')
              }
              onClick={() => navigate(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
              {id === 'learn' && completed.length > 0 && (
                <span className="tiny-count">{completed.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="side-support">
          <div className="side-support-icon">
            <Heart size={20} />
          </div>
          <strong>You've got this.</strong>
          <p>
            Real answers. No awkward questions. A little more confidence every
            day.
          </p>
          <button onClick={() => navigate('care')}>
            Your care space <ArrowRight size={16} />
          </button>
        </div>
        <button className="sidebar-bottom" onClick={() => navigate('privacy')}>
          <ShieldCheck size={17} /> Privacy & sources
        </button>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <button
            className="brand mobile-brand"
            onClick={() => navigate('home')}
          >
            <span className="brand-mark">
              <Flower2 size={20} />
            </span>
            petal<span className="brand-dot">.</span>
          </button>
          <span className="top-caption">
            A little guide to growing up <Sparkles size={13} />
          </span>
          <button
            className="top-icon"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <Menu size={22} />
          </button>
        </header>
        {mobileMenu && (
          <div className="mobile-menu">
            {navItems.map(({ id, label }) => (
              <button key={id} onClick={() => navigate(id)}>
                {label}
                <ChevronRight size={16} />
              </button>
            ))}
            <button onClick={() => navigate('privacy')}>
              Privacy & sources
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        <main>
          {view === 'home' && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <div className="eyebrow hero-eyebrow">
                    <span className="eyebrow-star">
                      <Sparkles size={12} />
                    </span>{' '}
                    YOUR PERIOD BESTIE, IN YOUR POCKET
                  </div>
                  <h1>
                    Growing up
                    <br />
                    looks good <em>on you.</em>
                  </h1>
                  <p>
                    Periods can feel confusing. We're here to make them feel a
                    whole lot simpler. One tiny step at a time.
                  </p>
                  <div className="hero-actions">
                    <button
                      className="primary-button"
                      onClick={() => openLesson('first')}
                    >
                      I'm new to periods <ArrowRight size={18} />
                    </button>
                    <button
                      className="quiet-button"
                      onClick={() => navigate('learn')}
                    >
                      Explore all lessons <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                <div
                  className="hero-art"
                  aria-label="Illustration of a smiling flower blooming"
                >
                  <div className="art-sparkle a">✦</div>
                  <div className="art-sparkle b">✳</div>
                  <div className="art-sparkle c">✦</div>
                  <div className="circle-back"></div>
                  <div className="flower-stem"></div>
                  <div className="flower-leaf one"></div>
                  <div className="flower-leaf two"></div>
                  <div className="flower-bloom">
                    <span className="petal-p p1"></span>
                    <span className="petal-p p2"></span>
                    <span className="petal-p p3"></span>
                    <span className="petal-p p4"></span>
                    <span className="petal-p p5"></span>
                    <span className="petal-center">
                      <span className="eyes">•‿•</span>
                    </span>
                  </div>
                  <span className="art-label">
                    You are
                    <br />
                    <b>doing great!</b>
                    <span>♡</span>
                  </span>
                </div>
              </section>
              <section
                className="progress-strip"
                aria-label="Learning progress"
              >
                <div className="progress-icon">
                  <Sparkles size={22} />
                </div>
                <div className="progress-info">
                  <strong>Little steps, big confidence</strong>
                  <p>
                    {completed.length === 0
                      ? 'Your learning journey starts here.'
                      : completed.length +
                        ' of ' +
                        lessons.length +
                        ' lessons finished. Keep blooming!'}
                  </p>
                </div>
                <div className="progress-right">
                  <strong>{completion}%</strong>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: completion + '%' }}
                    />
                  </div>
                </div>
              </section>
              <section className="section-body">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">
                      START SOMEWHERE COMFORTABLE
                    </span>
                    <h2>What do you need today?</h2>
                  </div>
                </div>
                <div className="quick-grid">
                  <button
                    className="quick-card peach"
                    onClick={() => openLesson('first')}
                  >
                    <span className="quick-icon">🌸</span>
                    <span>
                      <strong>My period just started</strong>
                      <small>Walk me through it</small>
                    </span>
                    <ChevronRight size={19} />
                  </button>
                  <button
                    className="quick-card lavender"
                    onClick={() => openLesson('school')}
                  >
                    <span className="quick-icon">🎒</span>
                    <span>
                      <strong>Oops, I had a leak</strong>
                      <small>Here's what to do</small>
                    </span>
                    <ChevronRight size={19} />
                  </button>
                  <button
                    className="quick-card blue"
                    onClick={() => navigate('products')}
                  >
                    <span className="quick-icon">🩲</span>
                    <span>
                      <strong>Which product should I use?</strong>
                      <small>Find what feels right</small>
                    </span>
                    <ChevronRight size={19} />
                  </button>
                  <button
                    className="quick-card mint"
                    onClick={() => openLesson('wash')}
                  >
                    <span className="quick-icon">🫧</span>
                    <span>
                      <strong>How do I stay clean?</strong>
                      <small>Simple, gentle hygiene</small>
                    </span>
                    <ChevronRight size={19} />
                  </button>
                </div>
              </section>
              <section className="section-body lesson-feature">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">MADE FOR REAL LIFE</span>
                    <h2>
                      Let's learn together{' '}
                      <span className="flower-title">✳</span>
                    </h2>
                  </div>
                  <button
                    className="view-all"
                    onClick={() => navigate('learn')}
                  >
                    All lessons <ArrowRight size={16} />
                  </button>
                </div>
                <div className="lesson-grid">
                  {lessons.slice(0, 3).map(item => (
                    <LessonCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
              <div className="home-note">
                <div className="note-illustration">💌</div>
                <div>
                  <strong>A reminder from us to you</strong>
                  <p>
                    Everyone's body is different. There isn't one perfect way to
                    have a period, and you never have to figure it out alone.
                  </p>
                </div>
                <span>♡</span>
              </div>
              <div className="bottom-space"></div>
            </>
          )}
          {view === 'learn' && (
            <div className="inner-page">
              <div className="page-heading">
                <span className="section-kicker">YOUR MINI-LESSON LIBRARY</span>
                <h1>
                  Learn at your own pace<span className="pink-dot">.</span>
                </h1>
                <p>
                  No confusing words. No silly questions. Just practical,
                  step-by-step help.
                </p>
              </div>
              <div className="search-box">
                <Search size={19} />
                <input
                  aria-label="Search lessons"
                  placeholder="Search something you want to learn..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setSearch('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="lesson-result">
                <span>{filteredLessons.length} lessons for you</span>
                <span>
                  {completed.length} completed <CheckCircle2 size={15} />
                </span>
              </div>
              <div className="lesson-grid full">
                {filteredLessons.map(item => (
                  <LessonCard key={item.id} item={item} />
                ))}
              </div>
              {filteredLessons.length === 0 && (
                <div className="empty-state">
                  <Search size={28} />
                  <h3>Nothing found yet</h3>
                  <p>Try searching for a different word.</p>
                  <button
                    className="secondary-button"
                    onClick={() => setSearch('')}
                  >
                    See all lessons
                  </button>
                </div>
              )}
            </div>
          )}
          {view === 'lesson' && lesson && (
            <div className="inner-page lesson-page">
              <button className="back-link" onClick={() => navigate('learn')}>
                <ArrowLeft size={18} /> All lessons
              </button>
              <div className="lesson-intro">
                <span className="section-kicker">
                  {lesson.category} · {lesson.mins} MIN READ
                </span>
                <h1>{lesson.title}</h1>
                <p>{lesson.subtitle}</p>
              </div>
              <div className="step-counter-row">
                <span>
                  STEP {stepIndex + 1} OF {lesson.steps.length}
                </span>
                <span>
                  {Math.round(((stepIndex + 1) / lesson.steps.length) * 100)}%
                  through
                </span>
              </div>
              <div className="step-bar">
                {lesson.steps.map((_, i) => (
                  <div
                    key={i}
                    className={
                      'step-segment ' + (i <= stepIndex ? 'filled' : '')
                    }
                  />
                ))}
              </div>
              <div className="step-main">
                <div className={'step-visual ' + lesson.tone}>
                  <div className="visual-orbit one"></div>
                  <div className="visual-orbit two"></div>
                  <div className="step-emoji" aria-hidden="true">
                    {lesson.steps[stepIndex].emoji}
                  </div>
                  <span className="visual-caption">ONE STEP AT A TIME ✳</span>
                </div>
                <div className="step-content">
                  <span className="step-tag">THE REAL-LIFE MOMENT</span>
                  <p className="moment">“{lesson.steps[stepIndex].moment}”</p>
                  <h2>{lesson.steps[stepIndex].title}</h2>
                  <p className="step-text">{lesson.steps[stepIndex].text}</p>
                  <div className="remember-tip">
                    <span>💡</span>
                    <div>
                      <strong>A little tip</strong>
                      <p>{lesson.steps[stepIndex].tip}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="step-footer">
                <button
                  className="secondary-button"
                  onClick={() => {
                    if (stepIndex > 0) {
                      setStepIndex(stepIndex - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else navigate('learn');
                  }}
                >
                  <ArrowLeft size={17} />{' '}
                  {stepIndex === 0 ? 'Back to lessons' : 'Previous step'}
                </button>
                <button className="primary-button" onClick={nextStep}>
                  {stepIndex === lesson.steps.length - 1
                    ? 'Finish this lesson'
                    : 'Got it, next step'}{' '}
                  {stepIndex === lesson.steps.length - 1 ? (
                    <Check size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </div>
              <div className="lesson-bottom">
                <ShieldCheck size={19} /> No tests, no grades. Go at your own
                pace. You can revisit this anytime.
              </div>
            </div>
          )}
          {view === 'products' && (
            <div className="inner-page">
              <div className="page-heading">
                <span className="section-kicker">YOUR OPTIONS, EXPLAINED</span>
                <h1>
                  Find your kind of comfort<span className="pink-dot">.</span>
                </h1>
                <p>
                  There is no one-size-fits-all product. Let's figure out what
                  might work for you.
                </p>
              </div>
              <div className="quiz-card">
                <div>
                  <span className="section-kicker">
                    THE NO-PRESSURE PRODUCT GUIDE ✨
                  </span>
                  <h2>What sounds like you?</h2>
                  <p>Choose a moment. We'll show you options, not rules.</p>
                </div>
                <div className="quiz-options">
                  {Object.keys(quizFits).map(option => (
                    <button
                      key={option}
                      className={quiz === option ? 'selected' : ''}
                      onClick={() => setQuiz(quiz === option ? null : option)}
                    >
                      {option}
                      {quiz === option ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <ArrowRight size={15} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {quiz && (
                <div className="recommendation">
                  <Sparkles size={20} />
                  <span>
                    For <strong>{quiz.toLowerCase()}</strong>, you could
                    explore:{' '}
                    {products
                      .filter(p => quizFits[quiz].includes(p.id))
                      .map(p => p.name)
                      .join(' + ')}
                    . The final choice is yours!
                  </span>
                </div>
              )}
              <div className="section-heading products-heading">
                <div>
                  <span className="section-kicker">GET TO KNOW THE BASICS</span>
                  <h2>Meet the products</h2>
                </div>
              </div>
              <div className="products-grid">
                {products.map(item => (
                  <button
                    key={item.id}
                    className={
                      'product-card ' +
                      item.tone +
                      (quiz && quizFits[quiz].includes(item.id)
                        ? ' product-match'
                        : '')
                    }
                    onClick={() => setActiveProduct(item.id)}
                  >
                    <div className="product-emoji">{item.emoji}</div>
                    <div className="product-tag">{item.tag}</div>
                    <h3>{item.name}</h3>
                    <p>{item.subtitle}</p>
                    <span className="product-action">
                      Learn about it <ArrowRight size={16} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="gentle-warning">
                <Info size={19} />
                <p>
                  Period products don't need perfume or deodorant to work. If a
                  product irritates your skin or causes pain, stop using it and
                  speak to a healthcare professional.
                </p>
              </div>
            </div>
          )}
          {view === 'care' && (
            <div className="inner-page">
              <div className="page-heading">
                <span className="section-kicker">A LITTLE TLC</span>
                <h1>
                  Taking care of you<span className="pink-dot">.</span>
                </h1>
                <p>
                  Keeping clean doesn't have to be complicated. Build confidence
                  with tiny habits.
                </p>
              </div>
              <div className="care-layout">
                <div className="checklist-card">
                  <div className="check-head">
                    <div>
                      <span className="section-kicker">
                        TODAY'S GENTLE ROUTINE
                      </span>
                      <h2>My feel-good checklist</h2>
                    </div>
                    <span className="check-progress">
                      {checked.length}/{careItems.length}
                    </span>
                  </div>
                  <div className="check-track">
                    <div
                      style={{
                        width: (checked.length / careItems.length) * 100 + '%',
                      }}
                    />
                  </div>
                  <div className="check-items">
                    {careItems.map(item => (
                      <button
                        key={item.id}
                        className={
                          'check-item ' +
                          (checked.includes(item.id) ? 'checked' : '')
                        }
                        onClick={() =>
                          setChecked(prev =>
                            prev.includes(item.id)
                              ? prev.filter(x => x !== item.id)
                              : [...prev, item.id]
                          )
                        }
                      >
                        <span className="check-item-emoji">{item.emoji}</span>
                        <span className="check-item-copy">
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                        </span>
                        <span className="check-circle">
                          {checked.includes(item.id) && <Check size={16} />}
                        </span>
                      </button>
                    ))}
                  </div>
                  {checked.length === 5 && (
                    <div className="care-success">
                      🌸 Your care routine is complete. You deserve this
                      kindness!
                    </div>
                  )}
                  <button
                    className="reset-check"
                    onClick={() => setChecked([])}
                  >
                    <RotateCcw size={15} /> Reset checklist
                  </button>
                  <p className="privacy-mini">
                    <ShieldCheck size={14} /> Checklist selections reset when
                    the app closes.
                  </p>
                </div>
                <div className="care-side">
                  <div className="care-pink">
                    <span className="care-side-emoji">🫧</span>
                    <span className="section-kicker">THE GOLDEN RULE</span>
                    <h2>Keep it gentle.</h2>
                    <p>
                      Wash the outside (vulva) with water. The inside (vagina)
                      cleans itself. Skip douching, fragrances, and scented
                      sprays.
                    </p>
                    <button onClick={() => openLesson('wash')}>
                      Show me how <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="care-calm">
                    <Sun size={26} />
                    <h3>Comfort counts, too</h3>
                    <p>
                      A warm compress, extra rest, water, or talking to someone
                      can make a hard day softer.
                    </p>
                    <button onClick={() => openLesson('cramps')}>
                      Cramps & comfort <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <section className="faq-section">
                <div className="section-heading">
                  <div>
                    <span className="section-kicker">YOU CAN ASK ANYTHING</span>
                    <h2>Is this normal?</h2>
                  </div>
                </div>
                <div className="faq-list">
                  {faqs.map((item, i) => (
                    <div
                      key={i}
                      className={'faq-item ' + (faqOpen === i ? 'opened' : '')}
                    >
                      <button
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        aria-expanded={faqOpen === i}
                      >
                        <span>{item.q}</span>
                        <span className="faq-plus">
                          {faqOpen === i ? '−' : '+'}
                        </span>
                      </button>
                      {faqOpen === i && <p>{item.a}</p>}
                    </div>
                  ))}
                </div>
              </section>
              <div className="urgent-panel">
                <div className="urgent-icon">
                  <Heart size={23} />
                </div>
                <div>
                  <h3>When to get medical help</h3>
                  <p>
                    Talk to a healthcare professional if you soak through a pad
                    or tampon every 1–2 hours, bleed longer than 7 days, have
                    severe pain, or have unusual symptoms. Get urgent help for
                    fainting, heavy bleeding with dizziness, or sudden fever and
                    rash while using a tampon.
                  </p>
                </div>
              </div>
            </div>
          )}
          {view === 'saved' && (
            <div className="inner-page">
              <div className="page-heading">
                <span className="section-kicker">YOUR LITTLE LIBRARY</span>
                <h1>
                  Saved just for you<span className="pink-dot">.</span>
                </h1>
                <p>
                  Your favorite lessons in one easy place. Bookmarks stay on
                  this device.
                </p>
              </div>
              {saved.length ? (
                <div className="lesson-grid full">
                  {lessons
                    .filter(l => saved.includes(l.id))
                    .map(item => (
                      <LessonCard key={item.id} item={item} />
                    ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-art">♡</div>
                  <h3>Nothing saved just yet</h3>
                  <p>Tap the bookmark on a lesson to keep it right here.</p>
                  <button
                    className="primary-button"
                    onClick={() => navigate('learn')}
                  >
                    Browse lessons <ArrowRight size={17} />
                  </button>
                </div>
              )}
            </div>
          )}
          {view === 'privacy' && (
            <div className="inner-page privacy-page">
              <button className="back-link" onClick={() => navigate('home')}>
                <ArrowLeft size={18} /> Back home
              </button>
              <div className="page-heading">
                <span className="section-kicker">YOU'RE IN CONTROL</span>
                <h1>
                  Privacy, safety & sources<span className="pink-dot">.</span>
                </h1>
                <p>Clear information about how this little guide works.</p>
              </div>
              <div className="privacy-card">
                <ShieldCheck size={28} />
                <h2>Your body, your information.</h2>
                <p>
                  Petal does not require an account or ask for dates of your
                  period, location, photos, or medical details. It has no ads,
                  no analytics, and no tracking. Lesson completion and saved
                  lessons are stored only on this device, in the app's local
                  storage, and are never sent anywhere. Your checklist is only
                  held until you close the app. In the iPhone app, nothing
                  leaves your device. If you use the website version, the
                  company that hosts the website may keep standard technical
                  request logs, such as your IP address and the time of the
                  visit. Deleting the app or tapping the button below removes
                  everything Petal has saved.
                </p>
                <button
                  className="outline-danger"
                  onClick={() => setClearDialog(true)}
                >
                  <Trash2 size={17} /> Clear saved lessons & progress
                </button>
              </div>
              <div className="privacy-card">
                <BookOpen size={26} />
                <h2>Trusted guidance</h2>
                <p>
                  Health information here is for education, not a diagnosis or a
                  substitute for a doctor. Petal is not a medical device. It
                  does not diagnose, treat, or predict anything. Product
                  instructions differ, so always read the manufacturer's
                  directions. Content is based on public guidance from:
                </p>
                <div className="sources-list">
                  {sourceLinks.map(item => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                      <ArrowRight size={15} />
                    </a>
                  ))}
                </div>
                <p className="last-reviewed">
                  Content last updated October 2026.
                </p>
              </div>
              <div className="privacy-card">
                <Heart size={26} />
                <h2>Need help right now?</h2>
                <p>
                  Ask a trusted adult, school nurse, clinician, or local medical
                  service. For fainting, severe symptoms, or possible toxic
                  shock syndrome, seek urgent medical care.
                </p>
              </div>
            </div>
          )}
        </main>
        <footer className="footer">
          <span>
            <Flower2 size={16} /> petal. made with care
          </span>
          <span>Educational guidance, not medical advice</span>
          <button onClick={() => navigate('privacy')}>
            Privacy & sources <ArrowRight size={13} />
          </button>
        </footer>
      </div>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={
              view === id || (view === 'lesson' && id === 'learn')
                ? 'selected'
                : ''
            }
            onClick={() => navigate(id)}
          >
            <Icon size={21} strokeWidth={view === id ? 2.4 : 1.9} />
            <small>{label}</small>
          </button>
        ))}
      </nav>
      {product && (
        <div
          className="modal-backdrop"
          onMouseDown={e => {
            if (e.target === e.currentTarget) setActiveProduct(null);
          }}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
          >
            <button
              className="modal-close"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product detail"
            >
              <X size={20} />
            </button>
            <div className={'modal-product-art ' + product.tone}>
              {product.emoji}
            </div>
            <span className="section-kicker">{product.tag}</span>
            <h2 id="product-title">{product.name}</h2>
            <p className="modal-subtitle">{product.subtitle}</p>
            <div className="detail-row">
              <span>
                <Heart size={18} /> Good for
              </span>
              <p>{product.best}</p>
            </div>
            <div className="detail-row">
              <span>
                <Clock3 size={18} /> When to change
              </span>
              <p>{product.change}</p>
            </div>
            <div className="detail-row">
              <span>
                <Sparkles size={18} /> What to know
              </span>
              <p>{product.know}</p>
            </div>
            <button
              className="primary-button modal-cta"
              onClick={() => openLesson(product.lesson)}
            >
              Show me the step-by-step <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
      {clearDialog && (
        <div className="modal-backdrop">
          <div
            className="confirm-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="erase-title"
          >
            <div className="clear-art">
              <Trash2 size={24} />
            </div>
            <h2 id="erase-title">Clear your learning history?</h2>
            <p>
              This removes your saved lessons and completion progress from this
              browser. You can always start again.
            </p>
            <div className="confirm-actions">
              <button
                className="secondary-button"
                onClick={() => setClearDialog(false)}
              >
                Keep my progress
              </button>
              <button className="danger-button" onClick={erase}>
                Yes, clear it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
