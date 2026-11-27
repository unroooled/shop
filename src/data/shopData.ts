import { ClayProduct, PastProject } from '../types';

const b = import.meta.env.BASE_URL.replace(/\/$/, '');

export const IMAGES = {
  logo: `${b}/assets/aistudio/WhatsApp_Image_2026-11-27_at_12.54.14_04086d61.jpeg`,
  mascot: `${b}/assets/aistudio/WhatsApp_Image_2026-11-27_at_12.54.14_04086d61.jpeg`,
  // real delivered-order photos below
  magnetTrio: `${b}/assets/real/6.jpg`,       // no-face + kuromi clay magnets
  pinBadges: `${b}/assets/real/2.jpg`,        // #swag / sadie / dina badges on denim
  studioHands: `${b}/assets/real/10.jpg`,     // messy studio table with paint pots
  corgiMagnets: `${b}/assets/real/8.jpg`,     // penguin + calico-cat painted rock badges
  hellokittyBatman: `${b}/assets/real/1.jpg`, // hello kitty + batman clay heads
  womanPortrait: `${b}/assets/real/3.jpg`,    // hand-held woman face portrait stone
  maggieKeychain: `${b}/assets/real/4.jpg`,   // pink "maggie" charm pendant
  bunnyEarmuffs: `${b}/assets/real/5.jpg`,    // white bunny with teal earmuffs figure
  foodMiniature: `${b}/assets/real/7.jpg`,    // tiny indian food plate miniature
  venomLighter: `${b}/assets/real/9.jpg`,     // venom face lighter sleeve
  turtleLily: `${b}/assets/real/11.jpg`,      // green turtle + stargazer lily keychain
};

export const CLAY_PRODUCTS: ClayProduct[] = [
  {
    id: 'customised-face-badge',
    name: 'customised face badge',
    price: 60,
    category: 'custom badges',
    description:
      'Mini hand-sculpted polymer clay face pin badge painted with glossy micro details and a secure locking pin back.',
    image: IMAGES.womanPortrait,
    badgeText: 'bestseller ★',
    badgeTone: 'yellow',
    chipIcon: 'face',
    chipText: 'hand-sculpted clay',
    footerIcon: 'sentiment_very_satisfied',
    footerText: 'starts at ₹60',
    dimensions: '3.0cm × 3.0cm',
    hardware: 'locking clutch pin back',
    stockLeft: 12,
  },
  {
    id: 'custom-keychain-diva-badge',
    name: 'custom keychain & "diva badge" combo',
    price: 238,
    category: 'keychains',
    description:
      'A glossy custom clay keychain paired with our signature "Diva Badge" pin — sealed in triple-gloss waterproof UV glaze.',
    image: IMAGES.pinBadges,
    badgeText: 'fan fave ✦',
    badgeTone: 'pink',
    chipIcon: 'auto_awesome',
    chipText: '2-piece combo',
    footerIcon: 'verified',
    footerText: '100% waterproof',
    dimensions: '3.8cm badge + 4cm charm',
    hardware: 'swivel clasp + locking pin back',
    stockLeft: 6,
  },
  {
    id: 'fridge-magnet-india',
    name: 'squishy clay fridge magnet',
    price: 299,
    category: 'fridge magnets',
    description:
      'Chunky, ultra-glossy handmade fridge magnet with embedded rare-earth neodymium backing (₹349 with tracked Bangalore / pan-India shipping).',
    image: IMAGES.magnetTrio,
    badgeText: 'ships pan-india',
    badgeTone: 'yellow',
    chipIcon: 'eco',
    chipText: 'rare-earth magnet',
    footerIcon: 'local_shipping',
    footerText: '₹349 w/ shipping',
    dimensions: '3.8cm × 3.5cm',
    hardware: 'N52 rare earth neodymium magnet',
    stockLeft: 9,
  },
  {
    id: 'custom-badge-duo',
    name: 'custom badge duo (penguin, cat & more)',
    price: 250,
    category: 'custom badges',
    description:
      'Pick any two custom clay badges — cute cats, penguins, or custom portraits (₹250 standard duo · ₹300 detailed character duo).',
    image: IMAGES.corgiMagnets,
    badgeText: 'only 4 slots!',
    badgeTone: 'lilac',
    chipIcon: 'pets',
    chipText: 'set of 2 badges',
    footerIcon: 'lock',
    footerText: 'locking pin backs',
    dimensions: '3.5cm each',
    hardware: '2× brass locking pin backs',
    stockLeft: 4,
  },
  {
    id: 'name-keychain',
    name: 'personalised name keychain',
    price: 150,
    category: 'keychains',
    description:
      'Hand-lettered pastel polymer clay keychain customised with her name, tiny stars, and a glossy scratch-resistant resin coat.',
    image: IMAGES.maggieKeychain,
    badgeText: 'gift pick ★',
    badgeTone: 'yellow',
    chipIcon: 'key',
    chipText: 'custom lettering',
    footerIcon: 'favorite',
    footerText: 'lightweight 14g',
    dimensions: '4.5cm charm + cord',
    hardware: 'pastel loop + metal keyring',
    stockLeft: 10,
  },
  {
    id: 'clay-lip-balm-case',
    name: 'handmade clay lip balm case',
    price: 99,
    category: 'lip balm cases',
    description:
      'Cute tactile clay cap & sleeve charm tailored to fit your favourite lip balm tube so it never gets lost at the bottom of your bag.',
    image: IMAGES.magnetTrio,
    badgeText: 'under ₹100 ✿',
    badgeTone: 'pink',
    chipIcon: 'spa',
    chipText: 'glossy uv glaze',
    footerIcon: 'verified',
    footerText: 'fits standard tubes',
    dimensions: 'custom snug fit',
    hardware: 'optional keychain eyelet',
    stockLeft: 8,
  },
  {
    id: 'custom-four-badge-pack',
    name: '4-badge custom bundle (bg, cat & crew)',
    price: 450,
    category: 'custom badges',
    description:
      'Four hand-sculpted clay badges for totes, jackets, or gifting — from minimalist sets (₹450) to extra-detailed collector packs (₹796).',
    image: IMAGES.corgiMagnets,
    badgeText: 'value pack ✦',
    badgeTone: 'lilac',
    chipIcon: 'palette',
    chipText: '4 custom pieces',
    footerIcon: 'auto_awesome',
    footerText: 'custom pack',
    dimensions: '3.2cm–4.0cm each',
    hardware: '4× stainless locking backs',
    stockLeft: 5,
  },
];

export const STUDIO_STEPS = [
  {
    number: '01',
    title: 'pick your sculpture vibe',
    description:
      'Customised face badge, penguin & cat duo, name keychain, lip balm case, fridge magnet, or any weird vibe you dream up.',
    detail:
      'Send 1–3 reference photos or a quick doodle. We match fur markings, faces, names, and pastel color palettes by hand-blending raw polymer clay.',
    bgClass: 'bg-primary-container text-on-primary-container',
  },
  {
    number: '02',
    title: 'choose hardware & coat',
    description:
      'Rare-earth fridge magnet, lock-back brooch pin, name keychain loop, lip balm case, or desk statuette.',
    detail:
      'Every piece is double-baked for structural strength, hand-painted with fine acrylics, and cured under UV resin for a glass-like waterproof shine.',
    bgClass: 'bg-secondary-container text-on-secondary-container',
  },
  {
    number: '03',
    title: 'receive sketch & unbox serotonin',
    description:
      'We send a progress photo straight on Instagram DM before applying the final glaze and dispatching across India.',
    detail:
      'Once you approve your raw sculpt photo, we glaze, cure, and pack your charm in plastic-free honeycomb paper with tracked shipping across India.',
    bgClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
  },
];

export const PAST_PROJECTS: PastProject[] = [
  {
    id: 'batch-01',
    batchCode: '#batch01',
    title: 'no-face & kuromi magnets',
    summary: 'Studio Ghibli No-Face meets Kuromi in a gorgeous dual-piece fridge magnet commission (₹450).',
    fullStory:
      'Two standout pieces: a round No-Face-in-flowers disc and a Kuromi head with raised antennae — both hand-sculpted, painted, and finished with a glassy UV dome.',
    category: 'brand mascots',
    image: IMAGES.magnetTrio,
    pieceCount: '2 pieces',
    glaze: 'triple-gloss uv resin',
    turnaround: '5 days',
    rotationClass: 'sm:-rotate-1',
    batchColorClass: 'text-primary',
  },
  {
    id: 'batch-02',
    batchCode: '#batch02',
    title: '#swag, sadie & dina badge set',
    summary: 'Three personalised text & name badges on denim — bold street-art lettering in polymer clay (₹300).',
    fullStory:
      'A three-badge custom pack: an orange #SWAG rectangle pin, a brown Dina tag, and a black "Sadie" bookmark badge — each lettered by hand in acrylic on raw clay.',
    category: 'brand mascots',
    image: IMAGES.pinBadges,
    pieceCount: '3 badges',
    glaze: 'high-gloss enamel finish',
    turnaround: '4 days',
    rotationClass: 'sm:rotate-2',
    batchColorClass: 'text-tertiary',
  },
  {
    id: 'batch-03',
    batchCode: '#batch03',
    title: 'penguin & cat badge duo',
    summary: 'Two chubby handmade penguin & cat clay badges sculpted for a word-of-mouth gift (₹300).',
    fullStory:
      'Hand-pinched tiny penguin and smiling calico cat pins with micro blush cheeks and locking backs, packed in honeycomb wrap with cute sticker confetti.',
    category: 'pet portraits',
    image: IMAGES.corgiMagnets,
    pieceCount: '2 pieces',
    glaze: 'crystal uv coat',
    turnaround: '5 days',
    rotationClass: 'sm:-rotate-2',
    batchColorClass: 'text-secondary',
  },
  {
    id: 'batch-04',
    batchCode: '#batch04',
    title: 'custom face portrait badge',
    summary: 'Tiny hand-painted portrait stone badge — customer sent their photo and got this tiny gem (₹60).',
    fullStory:
      'A palm-sized portrait clay badge painted with striking detail: dark wavy hair, expressive eyes, and a tiny flower clip. The customer literally squealed at unboxing.',
    category: 'pet portraits',
    image: IMAGES.womanPortrait,
    pieceCount: '1 piece',
    glaze: 'satin matte uv coat',
    turnaround: '4 days',
    rotationClass: 'sm:rotate-1',
    batchColorClass: 'text-primary',
  },
  {
    id: 'batch-05',
    batchCode: '#batch05',
    title: '"maggie" name keychain pendant',
    summary: 'Hot-pink personalised name keychain with gold star & orange star confetti, loop-ready (₹150).',
    fullStory:
      'Hand-lettered "Maggie" in bold script on a bright pink clay tile, decorated with orange star motifs and fitted with a silver eyelet loop for bag hanging.',
    category: 'weddings & events',
    image: IMAGES.maggieKeychain,
    pieceCount: '1 piece',
    glaze: 'waterproof resin dome',
    turnaround: '4 days',
    rotationClass: 'sm:-rotate-1',
    batchColorClass: 'text-tertiary',
  },
  {
    id: 'batch-06',
    batchCode: '#batch06',
    title: 'hello kitty & batman clay heads',
    summary: 'A kawaii Hello Kitty and a sleek Batman face sculpted as matching clay magnets (₹250).',
    fullStory:
      'Two iconic character heads in mini clay form: Hello Kitty with her pink bow and Batman in glossy black with painted white eyes — a perfect pop-culture shelf duo.',
    category: 'brand mascots',
    image: IMAGES.hellokittyBatman,
    pieceCount: '2 pieces',
    glaze: 'triple-gloss uv resin',
    turnaround: '7 days',
    rotationClass: 'sm:rotate-1',
    batchColorClass: 'text-primary',
  },
  {
    id: 'batch-07',
    batchCode: '#batch07',
    title: 'cozy bunny winter figurine',
    summary: 'A tiny white bunny with teal earmuffs, striped scarf, and mittens — gifted as a desk totem (₹299).',
    fullStory:
      'Full-body sculpted sitting bunny figure with individually placed teal earmuffs, hand-painted blue-brown stripe scarf, and round mitten paws — zero molds used.',
    category: 'desk totems',
    image: IMAGES.bunnyEarmuffs,
    pieceCount: '1 piece',
    glaze: 'triple-gloss uv resin',
    turnaround: '6 days',
    rotationClass: 'sm:-rotate-2',
    batchColorClass: 'text-secondary',
  },
  {
    id: 'batch-08',
    batchCode: '#batch08',
    title: 'miniature indian thali plate',
    summary: 'A tiny clay thali with idli, vada, tomato chutney, and stuffed mushrooms — miniature food art (₹499).',
    fullStory:
      'Intricate miniature plate in white clay featuring hand-painted idli rounds, golden vada, vibrant tomato chutney, and stuffed mushroom cups on a banana-leaf-green base.',
    category: 'desk totems',
    image: IMAGES.foodMiniature,
    pieceCount: '1 piece (plate + 6 food items)',
    glaze: 'gloss resin coat',
    turnaround: '8 days',
    rotationClass: 'sm:rotate-2',
    batchColorClass: 'text-primary',
  },
  {
    id: 'batch-09',
    batchCode: '#batch09',
    title: 'venom lighter sleeve',
    summary: 'Venom face sculpted in polymer clay as a wearable lighter cover — pop culture commission (₹349).',
    fullStory:
      'A striking Venom lighter sleeve: jet-black clay with large white eye patches, bared jagged teeth, and a protruding tongue — UV-sealed for a wet, inky gloss.',
    category: 'brand mascots',
    image: IMAGES.venomLighter,
    pieceCount: '1 piece',
    glaze: 'high-gloss uv resin',
    turnaround: '5 days',
    rotationClass: 'sm:-rotate-1',
    batchColorClass: 'text-tertiary',
  },
  {
    id: 'batch-10',
    batchCode: '#batch10',
    title: 'turtle + stargazer lily keychain',
    summary: 'A glossy green sea turtle cradling a hand-painted pink stargazer lily — custom keychain pendant (₹150).',
    fullStory:
      'Full-body sculpted green turtle with shiny bead eyes and a gold eyelet loop, its shell replaced by a detailed hand-painted pink stargazer lily with speckled petals and sage-green stamens.',
    category: 'weddings & events',
    image: IMAGES.turtleLily,
    pieceCount: '1 piece',
    glaze: 'triple-gloss uv resin',
    turnaround: '5 days',
    rotationClass: 'sm:rotate-2',
    batchColorClass: 'text-secondary',
  },
];

export const TESTIMONIALS = [
  {
    id: 'tw1',
    image: `${b}/assets/real/13.jpg`,
    quote: 'Sooo cuteee 😭😭 look how my mom arranged them hahha',
    product: 'family face badges',
    rotation: 'sm:-rotate-1',
  },
  {
    id: 'tw2',
    image: `${b}/assets/real/12.jpg`,
    quote: 'The pins are bigger than i imagined haha!! And very very cute 😭😭😭 Really made my day',
    product: 'custom badges',
    rotation: 'sm:rotate-2',
  },
  {
    id: 'tw3',
    image: `${b}/assets/real/18.jpg`,
    quote: 'They are so fickin cutee 😭😭😭😭 Absolutely loved themm. Packaging is also so good',
    product: 'kuromi + no-face badges',
    rotation: 'sm:-rotate-2',
  },
  {
    id: 'tw4',
    image: `${b}/assets/real/19.jpg`,
    quote: 'Thank you @unroooled for the little package 😍 I looooooove the keychain, it\'s very cute 💜',
    product: 'maggie name keychain',
    rotation: 'sm:rotate-1',
  },
  {
    id: 'tw5',
    image: `${b}/assets/real/14.jpg`,
    quote: 'These are sooo cute 🥰 I love them',
    product: 'glasses guy + owl badges',
    rotation: 'sm:-rotate-1',
  },
  {
    id: 'tw6',
    image: `${b}/assets/real/16.jpg`,
    quote: 'LOVEEE THEM SO MUCHHH 😝 He has it on his bag and i have it on my id',
    product: 'penguin pin badge',
    rotation: 'sm:rotate-2',
  },
  {
    id: 'tw7',
    image: `${b}/assets/real/17.jpg`,
    quote: '"Im sorry I didn\'t like it" → "I LOOOOOVEEEEEEE THEMMMMMMM 😭😭😭😭"',
    product: 'custom badge order',
    rotation: 'sm:-rotate-2',
  },
  {
    id: 'tw8',
    image: `${b}/assets/real/15.jpg`,
    quote: 'this was very pretty and the packaging as well, thank you 😊',
    product: 'face badge',
    rotation: 'sm:rotate-1',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'how durable are the badges, magnets & lip balm cases?',
    answer:
      'Every piece is conditioned, sculpted from premium polymer clay, double-baked for toughness, and sealed in 2–3 coats of UV-cured resin. Pins use locking backs and magnets use N52 rare-earth discs embedded directly into the clay.',
  },
  {
    question: 'how do customised face badges & pet portraits work?',
    answer:
      'Fill out the custom studio configurator or DM us 2–3 photos on Instagram (@unroooled). Customised face badges start at ₹60, custom badge duos at ₹250, and we always send you a progress photo before final glazing & dispatch!',
  },
  {
    question: 'do you ship across india (bangalore, mumbai, delhi & more)?',
    answer:
      'Yes! We ship tracked parcels all across India (flat ₹50 shipping, free on orders ₹499+). Everything arrives tucked inside recyclable honeycomb paper with zero bubble wrap.',
  },
  {
    question: 'can i order custom combos like a keychain + diva badge or 4-badge pack?',
    answer:
      'Totally! You can mix and match badges, name keychains, fridge magnets, and lip balm cases in our custom studio. Bulk orders of 15+ custom favors also get an automatic 15% studio discount.',
  },
];
