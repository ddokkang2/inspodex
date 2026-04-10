(() => {
  const titleKoMap = window.REFERENCE_KO_TITLE_MAP || {};
  const uniq = (values) => [...new Set((Array.isArray(values) ? values : [])
    .map((value) => String(value || '').trim())
    .filter(Boolean))];

  const slugify = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const dedupeById = (items) => {
    const map = new Map();
    items.forEach((item) => {
      if (item && item.id && !map.has(item.id)) map.set(item.id, item);
    });
    return [...map.values()];
  };

  const ref = (id, ko, en, q, tags = [], characteristics = [], figures = [], extra = {}) => ({
    id,
    ko,
    en,
    q,
    tags: uniq(tags),
    characteristics: uniq(characteristics),
    figures: uniq(figures),
    ...extra
  });

  const normalizeItem = (item) => {
    if (typeof item === 'string') {
      const en = String(item || '').trim();
      return { en, ko: String(titleKoMap[en] || en).trim() };
    }
    const out = { ...(item || {}) };
    out.en = String(out.en || out.ko || '').trim();
    const mappedKo = String(titleKoMap[out.en] || '').trim();
    const rawKo = String(out.ko || '').trim();
    out.ko = String((rawKo && rawKo !== out.en ? rawKo : mappedKo) || out.en || '').trim();
    return out;
  };

  const expandRefGroups = (groups) => dedupeById(groups.flatMap((group) => group.items.map((itemValue) => {
    const item = normalizeItem(itemValue);
    const en = item.en;
    const ko = item.ko || en;
    const id = item.id || slugify(en);
    const q = item.q || `${en.toLowerCase()} ${group.query}`.trim();
    const tags = uniq([...(group.tags || []), ...(item.tags || [])]);
    const characteristics = uniq(item.characteristics || group.characteristics || []);
    const figures = uniq(item.figures || group.figures || []);
    return ref(id, ko, en, q, tags, characteristics, figures, item.extra || {});
  })));

  const expandArtistGroups = (groups) => dedupeById(groups.flatMap((group) => group.items.map((itemValue) => {
    const item = normalizeItem(itemValue);
    const en = item.en;
    const ko = item.ko || en;
    const id = item.id || slugify(en);
    const q = item.q || `${en.toLowerCase()} ${group.query}`.trim();
    const tags = uniq([...(group.tags || []), ...(item.tags || [])]);
    const characteristics = uniq(item.characteristics || group.characteristics || []);
    const figures = uniq(item.figures || [en]);
    return ref(id, ko, en, q, tags, characteristics, figures, {
      media: uniq(item.media || group.media || []),
      eras: uniq(item.eras || group.eras || []),
      regions: uniq(item.regions || group.regions || []),
      moods: uniq(item.moods || group.moods || []),
      aliases: uniq(item.aliases || []),
      useCases: uniq(item.useCases || ['Style Study', 'Mood Reference', 'Art Direction'])
    });
  })));

  const designGroups = [
    {
      query: 'graphic design poster layout reference',
      tags: ['graphic', 'layout', 'typography'],
      characteristics: ['Structured composition', 'Typographic hierarchy', 'Intentional spacing'],
      items: [
        'Swiss Style', 'International Typographic Style', 'Bauhaus', 'Constructivism', 'De Stijl',
        'Ulm School Graphic', 'Modernist Poster', 'Grid Poster', 'Typographic Poster', 'Photo Typographic Poster'
      ]
    },
    {
      query: 'ornamental historical graphic design reference',
      tags: ['ornamental', 'historical', 'poster'],
      characteristics: ['Decorative detail', 'Period-driven mood', 'Strong visual identity'],
      items: [
        'Art Deco', 'Art Nouveau', 'Victorian Editorial', 'Jugendstil Poster', 'Vienna Secession Graphic',
        'Neo Classical Poster', 'Baroque Graphic', 'Ukiyo E Graphic', 'Woodcut Poster', 'Ornamental Lettering'
      ]
    },
    {
      query: 'print texture poster editorial design reference',
      tags: ['print', 'texture', 'editorial'],
      characteristics: ['Printed texture', 'Analog imperfection', 'Material richness'],
      items: [
        'Risograph', 'Screen Print Poster', 'Letterpress Editorial', 'Halftone Print', 'Newsprint Collage',
        'Linocut Graphic', 'Silkscreen Graphic', 'Xerox Zine', 'Stencil Poster', 'Monoprint Graphic'
      ]
    },
    {
      query: 'postmodern experimental graphic design reference',
      tags: ['experimental', 'postmodern', 'graphic'],
      characteristics: ['Unexpected hierarchy', 'Expressive composition', 'Intentional disruption'],
      items: [
        'Memphis', 'New Wave Typography', 'Deconstructivist Graphic', 'Grunge Editorial', 'Punk Zine',
        'Anti Design', 'Maximalist Collage', 'Acid Graphics', 'Psychedelic Poster', 'Dada Montage'
      ]
    },
    {
      query: 'retro digital visual style reference',
      tags: ['retro', 'digital', 'trend'],
      characteristics: ['Era-coded styling', 'Nostalgic surface treatment', 'Bold digital personality'],
      items: [
        'Y2K Web', 'Vaporwave', 'Synthwave Graphic', 'Cyberpunk HUD', 'Retrofuturism',
        'Frutiger Aero', 'Web 1.0', 'Web 2.0 Glossy', 'Chrome Graphic', 'Glitch Graphic'
      ]
    },
    {
      query: 'interface visual trend ui reference',
      tags: ['ui', 'interface', 'product'],
      characteristics: ['Clear interface language', 'Systemized components', 'Readable interaction states'],
      items: [
        'Glassmorphism', 'Neumorphism', 'Skeuomorphism', 'Material Design', 'Fluent Design',
        'Aqua UI', 'Bento UI', 'Soft UI', 'Card UI', 'Dark Dashboard UI'
      ]
    },
    {
      query: 'product ui dashboard reference',
      tags: ['ui', 'dashboard', 'product'],
      characteristics: ['Task-oriented layout', 'Clear information density', 'Component consistency'],
      items: [
        'Data Dense Dashboard', 'Minimal Dashboard', 'Card Based Dashboard', 'Monochrome Dashboard', 'Widget Dashboard',
        'Command Center UI', 'Terminal Inspired UI', 'Table First Interface', 'Chart First Interface', 'Control Panel UI'
      ]
    },
    {
      query: 'mobile app interface reference',
      tags: ['ui', 'mobile', 'app'],
      characteristics: ['Mobile-first layout', 'Touch-friendly interface', 'Compact hierarchy'],
      items: [
        'Rounded Mobile UI', 'Minimal Mobile UI', 'Gradient Mobile UI', 'High Contrast Mobile UI', 'Card Stack Mobile UI',
        'Pastel Mobile UI', 'Glass Mobile UI', 'Brutalist Mobile UI', 'Editorial Mobile UI', 'Floating Action Mobile UI'
      ]
    },
    {
      query: 'marketing ecommerce web design reference',
      tags: ['web', 'marketing', 'commerce'],
      characteristics: ['Clear narrative flow', 'Conversion-aware layout', 'Brand-forward presentation'],
      items: [
        'Luxury Minimal Web', 'Editorial Commerce Web', 'Bold Campaign Landing', 'Image First Landing', 'Split Hero Landing',
        'Monochrome Marketing Site', 'Soft Gradient Landing', 'Brutalist Commerce Web', 'Magazine Style Landing', 'High Contrast Brand Site'
      ]
    },
    {
      query: 'brand identity system reference',
      tags: ['branding', 'identity', 'system'],
      characteristics: ['Consistent brand voice', 'Recognizable visual cues', 'Scalable system thinking'],
      items: [
        'Minimal Branding', 'Luxury Branding', 'Playful Branding', 'Heritage Branding', 'Eco Branding',
        'Tech Branding', 'Editorial Branding', 'Packaging First Branding', 'Monogram Branding', 'Mascot Branding'
      ]
    },
    {
      query: 'packaging design reference',
      tags: ['packaging', 'brand', 'product'],
      characteristics: ['Shelf presence', 'Material awareness', 'Cohesive label system'],
      items: [
        'Cosmetic Packaging', 'Beverage Packaging', 'Coffee Packaging', 'Tea Packaging', 'Skincare Packaging',
        'Snack Packaging', 'Wine Label Design', 'Craft Beer Packaging', 'Perfume Packaging', 'Sustainable Packaging'
      ]
    },
    {
      query: 'editorial publication design reference',
      tags: ['editorial', 'publication', 'layout'],
      characteristics: ['Narrative sequencing', 'Balanced text-image rhythm', 'Publishing discipline'],
      items: [
        'Magazine Grid Editorial', 'Asymmetric Editorial Layout', 'Book Cover Typography', 'Album Cover Graphic', 'Lookbook Layout',
        'Photo Book Layout', 'Catalog Grid Layout', 'Annual Report Modern', 'Thesis Book Modern', 'Portfolio Editorial Layout'
      ]
    },
    {
      query: 'information design data visualization reference',
      tags: ['information', 'system', 'diagram'],
      characteristics: ['Clear communication', 'Structured wayfinding', 'Functional clarity'],
      items: [
        'Information Design', 'Infographic Design', 'Data Visualization', 'Wayfinding System', 'Iconography System',
        'Pictogram System', 'Transit Map Design', 'Exhibition Signage', 'Diagram Design', 'Process Chart Design'
      ]
    },
    {
      query: 'motion title graphics reference',
      tags: ['motion', 'title', 'broadcast'],
      characteristics: ['Time-based rhythm', 'Readable movement', 'Graphic continuity'],
      items: [
        'Kinetic Typography', 'Title Sequence Design', 'Broadcast Package', 'Lower Third System', 'Sports Broadcast Graphic',
        'News Broadcast Graphic', 'Motion Poster', 'Animated Explainer Graphic', 'UI Motion Design', 'Typographic Loop'
      ]
    },
    {
      query: 'poster campaign graphic design reference',
      tags: ['poster', 'campaign', 'graphic'],
      characteristics: ['Immediate readability', 'Memorable impact', 'Strong campaign language'],
      items: [
        'Festival Poster', 'Event Poster', 'Typographic Campaign', 'Protest Poster', 'Museum Poster',
        'Concert Poster', 'Film Poster Modern', 'Film Poster Minimal', 'Cultural Poster', 'Exhibition Poster'
      ]
    },
    {
      query: 'illustration driven graphic reference',
      tags: ['illustration', 'graphic', 'color'],
      characteristics: ['Image-led communication', 'Distinct silhouette', 'Playful visual texture'],
      items: [
        'Flat Geometric Graphic', 'Cut Paper Graphic', '3D Abstract Graphic', 'Gradient Mesh Graphic', 'Isometric Illustration UI',
        'Doodle Branding', 'Sticker Pack Graphic', 'Cartoon Editorial', 'Botanical Packaging Graphic', 'Folk Pattern Graphic'
      ]
    },
    {
      query: 'minimal material spatial branding reference',
      tags: ['minimal', 'spatial', 'branding'],
      characteristics: ['Quiet restraint', 'Material-led cues', 'Atmospheric clarity'],
      items: [
        'Japanese Minimal', 'Wabi Sabi', 'Scandinavian Graphic', 'Mid Century Modern', 'Brutalist Web',
        'Concrete Minimal', 'Warm Minimal', 'Luxury Interior Branding', 'Spatial Signage', 'Architectural Diagram Style'
      ]
    },
    {
      query: 'corporate product system design reference',
      tags: ['system', 'product', 'enterprise'],
      characteristics: ['Scalable governance', 'Operational clarity', 'System-first thinking'],
      items: [
        'Enterprise Design System', 'Government Service Design', 'Accessibility First UI', 'Design Token System', 'Component Library UI',
        'Documentation Site Design', 'B2B Portal UI', 'Admin Console UI', 'Workflow Builder UI', 'CRM Dashboard'
      ]
    },
    {
      query: 'experimental web storytelling reference',
      tags: ['web', 'storytelling', 'interactive'],
      characteristics: ['Narrative motion', 'Immersive pacing', 'Intentional interaction'],
      items: [
        'Immersive Storytelling Site', 'Parallax Editorial Web', 'Split Screen Landing', 'Scroll Narrative Web', 'Cursor Reactive Web',
        'Brutalist Editorial Web', 'Archive Website', 'Portfolio Showcase', 'Gallery Microsite', 'Interactive Timeline'
      ]
    },
    {
      query: 'future game interface reference',
      tags: ['ui', 'future', 'game'],
      characteristics: ['Speculative interface language', 'High-tech mood', 'Screen-driven readability'],
      items: [
        'Sci Fi Terminal UI', 'Tactical Map UI', 'Space Dashboard UI', 'Mecha Control Panel', 'Cyberpunk Shop UI',
        'Fantasy Game Menu', 'RPG Inventory UI', 'Strategy HUD', 'Retro Arcade Interface', 'Holographic Panel'
      ]
    }
  ];
  const characterGroups = [
    {
      query: 'character design illustration reference',
      tags: ['2d', 'anime', 'toon'],
      characteristics: ['Readable silhouette', 'Expressive face design', 'Appealing stylization'],
      items: [
        'Modern Anime', 'Retro 80s Anime', 'Retro 90s Anime', 'Clean Anime', 'Painterly Anime',
        'Shonen Style', 'Shojo Style', 'Seinen Style', 'Josei Style', 'Isekai Anime Style'
      ]
    },
    {
      query: 'manga character drawing reference',
      tags: ['2d', 'manga', 'toon'],
      characteristics: ['Ink-driven appeal', 'Clear shape language', 'Panel-ready clarity'],
      items: [
        'Manga Ink Line', 'Manga Screentone', 'Gekiga Style', 'Sports Manga Style', 'Horror Manga Style',
        'Comedy Manga Style', 'Shoujo Lace Manga', 'Samurai Manga Style', 'Mecha Manga Style', 'Webtoon Clean'
      ]
    },
    {
      query: 'digital comic character reference',
      tags: ['2d', 'comic', 'toon'],
      characteristics: ['Screen-friendly color', 'Serial readability', 'Flexible expression range'],
      items: [
        'Webtoon Rendered', 'Webtoon Minimal', 'Mobile Comic Style', 'Romance Fantasy Webtoon', 'Action Webtoon Style',
        'Thriller Webtoon Style', 'Slice of Life Webtoon', 'Color Comic Style', 'Vertical Panel Character', 'Korean Game Promo Character'
      ]
    },
    {
      query: 'cute mascot character reference',
      tags: ['2d', 'kawaii', 'toon'],
      characteristics: ['Rounded form language', 'Friendly appeal', 'Instant readability'],
      items: [
        'Chibi', 'Super Deformed Hero', 'Kawaii Mascot', 'Pastel Mascot', 'Round Blob Mascot',
        'Animal Mascot', 'Food Mascot', 'Tech Mascot', 'Kids App Mascot', 'Cozy Mascot'
      ]
    },
    {
      query: 'western cartoon character reference',
      tags: ['2d', 'toon', 'cartoon'],
      characteristics: ['Exaggerated posing', 'Elastic forms', 'Simple high-impact shapes'],
      items: [
        'Classic Cartoon', 'Rubber Hose', 'TV Animation Style', 'Saturday Morning Cartoon', 'Flat Comedy Cartoon',
        'Adventure Cartoon', 'Silhouette Cartoon', 'Exaggerated Toon', 'Family Cartoon', 'Sketchy Cartoon'
      ]
    },
    {
      query: 'european line character illustration reference',
      tags: ['2d', 'illustration', 'ink-line'],
      characteristics: ['Controlled contour', 'Graphic readability', 'Illustrative charm'],
      items: [
        'Ligne Claire', 'Franco Belgian Comic', 'Graphic Novel Minimal', 'Editorial Cartoon', 'Caricature Clean Line',
        'Poster Cartoon Figure', 'Storybook Cartoon', 'Woodcut Character', 'Ink Wash Character', 'Folk Tale Character'
      ]
    },
    {
      query: 'comic hero character reference',
      tags: ['2d', 'toon', 'illustration'],
      characteristics: ['Graphic spot blacks', 'Dynamic anatomy', 'Genre-aware staging'],
      items: [
        'American Comic', 'Superhero Modern', 'Indie Comic Style', 'Noir Comic Style', 'Pulp Comic Hero',
        'Sci Fi Comic Character', 'Fantasy Comic Character', 'Horror Comic Character', 'YA Graphic Novel Character', 'Retro Silver Age Comic'
      ]
    },
    {
      query: 'stylized illustration character reference',
      tags: ['2d', 'illustration', 'toon'],
      characteristics: ['Medium-specific finish', 'Distinct brush personality', 'Readable shapes'],
      items: [
        'Cel Shading', 'Flat Vector Character', 'Gouache Character', 'Watercolor Character', 'Marker Render Character',
        'Colored Pencil Character', 'Cut Paper Character', 'Screenprint Character', 'Grainy Poster Character', 'Minimal Shape Character'
      ]
    },
    {
      query: 'painterly character illustration reference',
      tags: ['2d', 'illustration', 'realistic'],
      characteristics: ['Painterly modeling', 'Believable form', 'Narrative mood'],
      items: [
        'Semi Realistic', 'Painterly Character', 'Realistic Ink Character', 'Fantasy Illustration Character', 'Historical Illustration Character',
        'Dark Fantasy Illustration', 'Fashion Illustration Character', 'Romance Illustration Character', 'Storybook Illustration', 'Childrens Book Character'
      ]
    },
    {
      query: 'stylized 3d character reference',
      tags: ['3d', 'stylized', 'toon'],
      characteristics: ['Readable silhouette', 'Clean material breakup', 'Appealing proportions'],
      items: [
        'Stylized 3D Character', 'Stylized Toy 3D', 'Mobile Game 3D Character', 'Casual Game 3D Character', 'Hero Shooter 3D Character',
        'Family Animation 3D Character', 'Clay Look 3D Character', 'Low Poly Character', 'Hand Painted 3D Character', 'NPR 3D Character'
      ]
    },
    {
      query: 'realistic 3d character reference',
      tags: ['3d', 'realistic', 'character'],
      characteristics: ['Grounded anatomy', 'Material realism', 'Production-ready detail'],
      items: [
        'Realistic 3D Character', 'AAA Game Character', 'Cinematic Hero Character', 'Tactical Realism Character', 'Post Disaster Realism Character',
        'Sci Fi Soldier Character', 'Historical Warrior Character', 'Photoreal Character Bust', 'Grounded Civilian Character', 'Realistic Villain'
      ]
    },
    {
      query: 'pixel sprite character reference',
      tags: ['2d', 'pixel', 'pixel-art'],
      characteristics: ['Cluster discipline', 'Sprite readability', 'Limited-palette appeal'],
      items: [
        'Pixel Art Character', 'Chibi Pixel Sprite', 'JRPG Pixel Hero', 'Tactical RPG Sprite', 'Fighting Game Sprite',
        'Isometric Pixel Character', 'Monster Tamer Pixel', 'Cyberpunk Pixel Character', 'Fantasy NPC Pixel', 'Cozy Game Pixel Character'
      ]
    },
    {
      query: 'creature design reference',
      tags: ['2d', 'concept', 'creature'],
      characteristics: ['Functional anatomy', 'Strong silhouette logic', 'Memorable motif language'],
      items: [
        'Creature Design', 'Beast Character', 'Insectoid Creature', 'Aquatic Creature', 'Reptile Creature',
        'Birdlike Creature', 'Plant Creature', 'Elemental Creature', 'Mythic Beast', 'Giant Monster'
      ]
    },
    {
      query: 'horror monster design reference',
      tags: ['2d', 'concept', 'monster'],
      characteristics: ['Uneasy shape language', 'Dark surface treatment', 'Threat-forward readability'],
      items: [
        'Horror Creature', 'Undead Monster', 'Cosmic Horror Monster', 'Demon Character', 'Slasher Villain Design',
        'Gothic Monster', 'Parasite Creature', 'Mutation Monster', 'Dark Fairy Monster', 'Shadow Creature'
      ]
    },
    {
      query: 'mecha robot character reference',
      tags: ['2d', 'concept', 'mecha'],
      characteristics: ['Mechanical layering', 'Readable articulation', 'Industrial appeal'],
      items: [
        'Mecha Character', 'Super Robot', 'Real Robot Pilot Suit', 'Android Character', 'Service Robot Mascot',
        'Military Mecha Pilot', 'Exosuit Character', 'Sentinel Robot', 'Retro Mecha Hero', 'Mecha Girl'
      ]
    },
    {
      query: 'fantasy archetype character reference',
      tags: ['2d', 'fantasy', 'illustration'],
      characteristics: ['Role-readable costume language', 'Clear class identity', 'Adventure-ready posing'],
      items: [
        'Heroic Fantasy Character', 'Dark Fantasy Character', 'High Fantasy Character', 'Arcane Fantasy Character', 'Rogue Fantasy Character',
        'Gothic Fantasy Character', 'Noble Fantasy Character', 'Barbarian Fantasy Style', 'Mythic Fantasy Character', 'Nordic Fantasy Character'
      ]
    },
    {
      query: 'science fiction character reference',
      tags: ['2d', 'sci-fi', 'concept'],
      characteristics: ['Future-coded surface cues', 'Tech-informed costume logic', 'High-contrast mood'],
      items: [
        'Cyberpunk Character', 'Retro Sci Fi Character', 'Hard Surface Sci Fi Character', 'Space Opera Character', 'Android Character Style',
        'Neon Street Fighter', 'Mech Pilot Character', 'Corporate Dystopia Character', 'Post Apocalyptic Character', 'Biotech Character'
      ]
    },
    {
      query: 'historical cultural character reference',
      tags: ['2d', 'historical', 'illustration'],
      characteristics: ['Era-coded clothing', 'Cultural silhouette cues', 'Decorative authenticity'],
      items: [
        'Samurai Character Style', 'Ninja Character Style', 'Hanbok Character Style', 'Victorian Character Style', 'Rococo Character Style',
        'Renaissance Character Style', 'Ancient Egypt Character Style', 'Mesoamerican Hero Style', 'Arabian Nights Character Style', 'Folklore Warrior Style'
      ]
    },
    {
      query: 'character sheet reference',
      tags: ['2d', 'sheet', 'presentation'],
      characteristics: ['Production clarity', 'Variation coverage', 'Model consistency'],
      items: [
        'Turnaround Model Sheet', 'Expression Sheet', 'Character Lineup', 'Costume Variation Sheet', 'Prop Sheet Character',
        'Silhouette Exploration', 'Face Sheet', 'Hair Variation Sheet', 'Idle Pose Sheet', 'Action Pose Sheet'
      ]
    },
    {
      query: 'game production character reference',
      tags: ['2d', 'game', 'design'],
      characteristics: ['Role clarity', 'Market-aware appeal', 'Gameplay-readable shape language'],
      items: [
        'NPC Style Sheet', 'Boss Concept Character', 'Vtuber Avatar Style', 'Visual Novel Portrait Style', 'Gacha Splash Art Style',
        'MOBA Hero Render', 'Fighting Game Intro Style', 'Platformer Mascot Style', 'Cozy Sim Character Style', 'Puzzle Mascot Style'
      ]
    }
  ];
  const photoGroups = [
    {
      query: 'portrait photography reference',
      tags: ['portrait', 'photo', 'lighting'],
      characteristics: ['Subject-first framing', 'Intentional light quality', 'Mood-aware exposure'],
      items: [
        'Natural Light Portrait', 'Studio Portrait', 'Environmental Portrait', 'Candid Portrait', 'Beauty Lighting',
        'Editorial Fashion', 'Documentary Portrait', 'Corporate Portrait', 'Actor Headshot', 'Fine Art Portrait'
      ]
    },
    {
      query: 'classic portrait lighting reference',
      tags: ['lighting', 'portrait', 'studio'],
      characteristics: ['Light ratio control', 'Face-shaping direction', 'Repeatable studio logic'],
      items: [
        'High Key', 'Low Key', 'Rembrandt Lighting', 'Split Lighting', 'Butterfly Lighting',
        'Loop Lighting', 'Clamshell Lighting', 'Broad Lighting', 'Short Lighting', 'Paramount Lighting'
      ]
    },
    {
      query: 'dramatic lighting photography reference',
      tags: ['lighting', 'dramatic', 'photo'],
      characteristics: ['Strong edge control', 'High mood density', 'Purposeful contrast'],
      items: [
        'Rim Light', 'Backlit', 'Silhouette Portrait', 'Chiaroscuro', 'Noir Lighting',
        'Hard Flash Portrait', 'Gel Lighting', 'Smoke Lit Portrait', 'Spotlight Portrait', 'Window Light'
      ]
    },
    {
      query: 'time of day photography reference',
      tags: ['natural', 'time', 'photo'],
      characteristics: ['Ambient-driven mood', 'Time-sensitive color', 'Location-dependent exposure'],
      items: [
        'Golden Hour', 'Blue Hour', 'Noon Harsh Sun', 'Overcast Soft Light', 'Twilight Portrait',
        'Sunrise Landscape', 'Sunset Silhouette', 'Night Street', 'Dawn Mist Photo', 'Moonlight Look'
      ]
    },
    {
      query: 'street documentary photography reference',
      tags: ['street', 'documentary', 'photo'],
      characteristics: ['Observed authenticity', 'Moment-driven framing', 'Real-world energy'],
      items: [
        'Street Photography', 'Documentary Photography', 'Photojournalism', 'Travel Documentary', 'Urban Candid',
        'Transit Photography', 'Market Photography', 'Protest Photography', 'Night Street Documentary', 'Humanist Street'
      ]
    },
    {
      query: 'fashion editorial photography reference',
      tags: ['fashion', 'editorial', 'photo'],
      characteristics: ['Pose-driven styling', 'Wardrobe-first storytelling', 'Campaign-aware polish'],
      items: [
        'Lookbook Photography', 'Runway Backstage', 'Studio Fashion Editorial', 'Beauty Editorial', 'Luxury Campaign Photo',
        'Minimal Fashion Catalog', 'Streetwear Editorial', 'Avant Garde Fashion', 'Black White Fashion', 'High Flash Fashion'
      ]
    },
    {
      query: 'product still life photography reference',
      tags: ['product', 'still-life', 'photo'],
      characteristics: ['Object-centered lighting', 'Material clarity', 'Commercial cleanliness'],
      items: [
        'Product Macro', 'Still Life', 'Minimal Product Photo', 'Luxury Product Photo', 'Tech Product Photography',
        'Cosmetic Product Shot', 'Watch Photography', 'Jewelry Photography', 'Beverage Product Photo', 'Tabletop Product Photo'
      ]
    },
    {
      query: 'food beverage photography reference',
      tags: ['food', 'beverage', 'photo'],
      characteristics: ['Appetite-driven styling', 'Surface texture clarity', 'Controlled scene storytelling'],
      items: [
        'Food Photography', 'Dark Food Photo', 'Bright Food Photo', 'Restaurant Editorial', 'Beverage Splash Photo',
        'Dessert Close Up', 'Packaging With Food', 'Recipe Overhead', 'Rustic Table Food', 'Commercial Drink Shot'
      ]
    },
    {
      query: 'architecture interior photography reference',
      tags: ['architecture', 'interior', 'photo'],
      characteristics: ['Spatial clarity', 'Line control', 'Environmental atmosphere'],
      items: [
        'Architecture Photography', 'Interior Photography', 'Real Estate Photography', 'Hotel Interior Photo', 'Minimal Architecture',
        'Brutalist Architecture Photo', 'Modern House Photo', 'Cafe Interior Photo', 'Retail Space Photo', 'Symmetrical Architecture'
      ]
    },
    {
      query: 'landscape nature photography reference',
      tags: ['landscape', 'nature', 'photo'],
      characteristics: ['Scale awareness', 'Atmospheric depth', 'Natural light sensitivity'],
      items: [
        'Landscape Photography', 'Seascape Photography', 'Forest Photography', 'Desert Landscape', 'Mountain Photography',
        'Aerial Landscape', 'Long Exposure Water', 'Storm Landscape', 'Winter Landscape', 'Nature Macro'
      ]
    },
    {
      query: 'sports action photography reference',
      tags: ['action', 'sports', 'photo'],
      characteristics: ['Timing precision', 'Motion readability', 'Energy-first framing'],
      items: [
        'Sports Photography', 'Dance Photography', 'Fitness Photography', 'Motion Blur Action', 'Freeze Motion Action',
        'Outdoor Adventure Photo', 'Surf Photography', 'Skate Photography', 'Martial Arts Photo', 'Concert Performance Photo'
      ]
    },
    {
      query: 'macro detail photography reference',
      tags: ['macro', 'detail', 'photo'],
      characteristics: ['Micro texture clarity', 'Selective depth of field', 'Precision framing'],
      items: [
        'Macro Photography', 'Botanical Macro', 'Insect Macro', 'Texture Study Photo', 'Jewelry Macro',
        'Watch Detail Macro', 'Water Drop Macro', 'Fabric Detail Photo', 'Product Detail Shot', 'Scientific Macro'
      ]
    },
    {
      query: 'film stock color grading photography reference',
      tags: ['film', 'grade', 'photo'],
      characteristics: ['Color signature', 'Analog-inspired rolloff', 'Mood-defining palette'],
      items: [
        'Film Look', 'Portra Tone', 'Cinestill', 'Kodachrome Look', 'Fuji Provia Look',
        'Fuji Velvia Look', 'Ektachrome Look', 'Matte Color', 'Teal Orange', 'Muted Tone'
      ]
    },
    {
      query: 'monochrome graphic photography reference',
      tags: ['black-white', 'graphic', 'photo'],
      characteristics: ['Tone control', 'Shape-first reading', 'Timeless graphic impact'],
      items: [
        'Black White High Contrast', 'Black White Soft Range', 'Infrared', 'Monochrome Minimal', 'Graphic Shadow Photo',
        'Silhouette Graphic', 'Grainy Monochrome', 'Silver Gelatin Look', 'Noir Monochrome', 'Architecture Monochrome'
      ]
    },
    {
      query: 'experimental photography reference',
      tags: ['experimental', 'photo', 'process'],
      characteristics: ['Technique-led imagery', 'Unexpected visual effect', 'Process visibility'],
      items: [
        'Double Exposure', 'Prism Photography', 'Lens Flare Portrait', 'Intentional Motion Blur', 'Long Exposure Light Trails',
        'Cyanotype Inspired Photo', 'Wet Plate Look', 'Cross Process Look', 'Solarized Photo', 'Lomo Snapshot'
      ]
    },
    {
      query: 'photo composition study reference',
      tags: ['composition', 'photo', 'framing'],
      characteristics: ['Intentional framing', 'Spatial balance', 'Directional readability'],
      items: [
        'Symmetry Photography', 'Leading Lines Photo', 'Negative Space Photo', 'Reflection Photography', 'Frame Within Frame',
        'Overhead Flat Lay', 'Top Down Still Life', 'Off Center Composition', 'Tight Crop Portrait', 'Wide Environmental Frame'
      ]
    },
    {
      query: 'lens look photography reference',
      tags: ['lens', 'photo', 'depth'],
      characteristics: ['Optical personality', 'Depth control', 'Perspective awareness'],
      items: [
        '35mm Documentary Look', '50mm Natural View', '85mm Portrait Compression', 'Wide Angle Portrait', 'Telephoto Street Look',
        'Shallow Depth Portrait', 'Deep Focus Environmental', 'Tilt Shift Cityscape', 'Fisheye Experimental', 'Macro Bokeh'
      ]
    },
    {
      query: 'night urban photography reference',
      tags: ['night', 'urban', 'photo'],
      characteristics: ['Practical-light mood', 'Colorful night contrast', 'Urban atmosphere'],
      items: [
        'Neon Night', 'Rainy Night Street', 'Gas Station At Night', 'Cyberpunk Alley Photo', 'City Lights Bokeh',
        'Car Light Trails', 'Blue Neon Portrait', 'Red Gel Night Portrait', 'Club Photography', 'Concert Lighting Photo'
      ]
    },
    {
      query: 'wedding event photography reference',
      tags: ['event', 'wedding', 'photo'],
      characteristics: ['Moment capture', 'Client-facing polish', 'Fast-reacting composition'],
      items: [
        'Wedding Editorial', 'Wedding Documentary', 'Ceremony Candid', 'Reception Flash Style', 'Event Photojournalism',
        'Festival Documentary', 'Corporate Event Candid', 'Family Lifestyle Session', 'Graduation Portrait Style', 'Couple Lifestyle Session'
      ]
    },
    {
      query: 'travel culture photography reference',
      tags: ['travel', 'culture', 'photo'],
      characteristics: ['Place-driven storytelling', 'Context-rich framing', 'Human-environment balance'],
      items: [
        'Travel Photography', 'Cultural Portrait', 'Market Travel Photo', 'Temple Photography', 'Coastal Town Travel',
        'Train Window Travel', 'Desert Nomad Portrait', 'Rural Documentary', 'Festival Travel Photo', 'Heritage Architecture Travel'
      ]
    }
  ];
  const artistGroups = [
    {
      query: 'visual style film still cinematography reference',
      tags: ['cinema', 'frames', 'production'],
      characteristics: ['Authorial framing', 'Memorable mood control', 'Distinct visual identity'],
      media: ['Cinema'],
      eras: ['Contemporary'],
      regions: ['North America'],
      moods: ['Cinematic', 'Controlled'],
      items: [
        'Wes Anderson', 'David Fincher', 'Denis Villeneuve', 'Sofia Coppola', 'Spike Jonze',
        'Greta Gerwig', 'Barry Jenkins', 'Christopher Nolan', 'Michael Mann', 'Steven Spielberg'
      ]
    },
    {
      query: 'east asian cinema visual style reference',
      tags: ['cinema', 'auteur', 'composition'],
      characteristics: ['Atmosphere-led framing', 'Narrative visual rhythm', 'Strong tonal personality'],
      media: ['Cinema'],
      eras: ['Modern'],
      regions: ['East Asia'],
      moods: ['Cinematic', 'Emotional'],
      items: [
        'Wong Kar Wai', 'Park Chan Wook', 'Akira Kurosawa', 'Hirokazu Koreeda', 'Edward Yang',
        'Zhang Yimou', 'Bong Joon Ho', 'Shunji Iwai', 'Hou Hsiao Hsien', 'Lee Chang Dong'
      ]
    },
    {
      query: 'european cinema visual style reference',
      tags: ['cinema', 'author', 'stills'],
      characteristics: ['Formal rigor', 'Auteur-driven pacing', 'Distinct cinematic grammar'],
      media: ['Cinema'],
      eras: ['Modern'],
      regions: ['Europe'],
      moods: ['Cinematic', 'Meditative'],
      items: [
        'Stanley Kubrick', 'Andrei Tarkovsky', 'Jean Luc Godard', 'Federico Fellini', 'Ingmar Bergman',
        'Michelangelo Antonioni', 'Pedro Almodovar', 'Lars von Trier', 'Wim Wenders', 'Jacques Demy'
      ]
    },
    {
      query: 'stylized genre cinema visual reference',
      tags: ['cinema', 'genre', 'style'],
      characteristics: ['High signature mood', 'Strong genre worldbuilding', 'Memorable image language'],
      media: ['Cinema'],
      eras: ['Contemporary'],
      regions: ['Global'],
      moods: ['Graphic', 'Intense'],
      items: [
        'Guillermo del Toro', 'Tim Burton', 'Ridley Scott', 'Tony Scott', 'Nicolas Winding Refn',
        'Gaspar Noe', 'Dario Argento', 'John Carpenter', 'Brian De Palma', 'George Miller'
      ]
    },
    {
      query: 'editorial fashion photography style reference',
      tags: ['photography', 'editorial', 'fashion'],
      characteristics: ['Styled portrait control', 'Published-image polish', 'Signature lighting language'],
      media: ['Photography'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Curated', 'Bold'],
      items: [
        'Annie Leibovitz', 'Helmut Newton', 'Irving Penn', 'Richard Avedon', 'Peter Lindbergh',
        'Tim Walker', 'Paolo Roversi', 'Steven Meisel', 'Ellen von Unwerth', 'Nick Knight'
      ]
    },
    {
      query: 'street documentary photography style reference',
      tags: ['photography', 'street', 'documentary'],
      characteristics: ['Moment sensitivity', 'Everyday drama', 'Authentic composition'],
      media: ['Photography'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Humanist', 'Observational'],
      items: [
        'Steve McCurry', 'Saul Leiter', 'Daido Moriyama', 'Fan Ho', 'Henri Cartier Bresson',
        'Vivian Maier', 'Garry Winogrand', 'Josef Koudelka', 'Alex Webb', 'William Eggleston'
      ]
    },
    {
      query: 'fine art photography style reference',
      tags: ['photography', 'fine-art', 'staged'],
      characteristics: ['Concept-driven image making', 'Atmospheric control', 'Signature visual authorship'],
      media: ['Photography'],
      eras: ['Contemporary'],
      regions: ['Global'],
      moods: ['Conceptual', 'Atmospheric'],
      items: [
        'Gregory Crewdson', 'Cindy Sherman', 'Andreas Gursky', 'Jeff Wall', 'Nan Goldin',
        'Sally Mann', 'Alec Soth', 'Hiroshi Sugimoto', 'Wolfgang Tillmans', 'Rinko Kawauchi'
      ]
    },
    {
      query: 'portrait travel photography style reference',
      tags: ['photography', 'portrait', 'travel'],
      characteristics: ['Place-aware portraiture', 'Human presence', 'Fieldwork atmosphere'],
      media: ['Photography'],
      eras: ['Contemporary'],
      regions: ['Global'],
      moods: ['Vivid', 'Humanist'],
      items: [
        'Sebastiao Salgado', 'Martin Parr', 'Lee Jeffries', 'Jimmy Nelson', 'Steve Winter',
        'Gregory Colbert', 'Trent Parke', 'Raghu Rai', 'Cristina Mittermeier', 'Platon'
      ]
    },
    {
      query: 'manga anime creator style reference',
      tags: ['illustration', 'animation', 'manga'],
      characteristics: ['Distinct drawing language', 'Genre-shaping influence', 'Recognizable storytelling rhythm'],
      media: ['Illustration', 'Animation', 'Comics'],
      eras: ['Contemporary'],
      regions: ['East Asia'],
      moods: ['Expressive', 'Stylized'],
      items: [
        'Hayao Miyazaki', 'Satoshi Kon', 'Yoshitaka Amano', 'Katsuhiro Otomo', 'Osamu Tezuka',
        'Takehiko Inoue', 'Naoko Takeuchi', 'Rumiko Takahashi', 'CLAMP', 'Tite Kubo'
      ]
    },
    {
      query: 'european comic illustration style reference',
      tags: ['illustration', 'comics', 'linework'],
      characteristics: ['Distinct line language', 'Worldbuilding strength', 'Graphic storytelling voice'],
      media: ['Illustration', 'Comics'],
      eras: ['Modern'],
      regions: ['Europe'],
      moods: ['Graphic', 'Imaginative'],
      items: [
        'Moebius', 'Herge', 'Enki Bilal', 'Milo Manara', 'Hugo Pratt',
        'Lorenzo Mattotti', 'Joann Sfar', 'Claire Wendling', 'Nicolas de Crecy', 'Benjamin Lacombe'
      ]
    },
    {
      query: 'animation background art style reference',
      tags: ['animation', 'background', 'illustration'],
      characteristics: ['Shape-led environment design', 'Color storytelling', 'Appealing visual worlds'],
      media: ['Animation', 'Illustration'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Wonder', 'Decorative'],
      items: [
        'Mary Blair', 'Eyvind Earle', 'Glen Keane', 'Genndy Tartakovsky', 'Rebecca Sugar',
        'Don Bluth', 'Tomm Moore', 'Chris Sanders', 'Tadahiro Uesugi', 'Frederic Back'
      ]
    },
    {
      query: 'concept art digital illustration style reference',
      tags: ['concept', 'digital', 'illustration'],
      characteristics: ['Worldbuilding clarity', 'Production-minded rendering', 'Strong visual development'],
      media: ['Illustration', 'Concept Art'],
      eras: ['Contemporary'],
      regions: ['Global'],
      moods: ['Epic', 'Designed'],
      items: [
        'Craig Mullins', 'Syd Mead', 'Feng Zhu', 'Jama Jurabaev', 'Maciej Kuciara',
        'Raphael Lacoste', 'Claire Hummel', 'Ian McQue', 'Ruan Jia', 'James Gurney'
      ]
    },
    {
      query: 'childrens book editorial illustration style reference',
      tags: ['illustration', 'editorial', 'childrens'],
      characteristics: ['Narrative warmth', 'Iconic image making', 'Page-friendly composition'],
      media: ['Illustration'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Warm', 'Storybook'],
      items: [
        'Quentin Blake', 'Beatrix Potter', 'Maurice Sendak', 'Tove Jansson', 'Shaun Tan',
        'Eric Carle', 'Oliver Jeffers', 'Kay Nielsen', 'Arthur Rackham', 'Maira Kalman'
      ]
    },
    {
      query: 'renaissance baroque painting style reference',
      tags: ['painting', 'master', 'historical'],
      characteristics: ['Canonical composition', 'Strong draftsmanship', 'Enduring visual language'],
      media: ['Painting'],
      eras: ['Pre-1900'],
      regions: ['Europe'],
      moods: ['Dramatic', 'Classical'],
      items: [
        'Caravaggio', 'Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Titian',
        'Rembrandt', 'Vermeer', 'Velazquez', 'Peter Paul Rubens', 'El Greco'
      ]
    },
    {
      query: 'impressionist post impressionist painting style reference',
      tags: ['painting', 'color', 'historical'],
      characteristics: ['Light-sensitive color', 'Brush-led atmosphere', 'Foundational art language'],
      media: ['Painting'],
      eras: ['Pre-1900'],
      regions: ['Europe'],
      moods: ['Luminous', 'Painterly'],
      items: [
        'Claude Monet', 'Edgar Degas', 'Pierre Auguste Renoir', 'Vincent van Gogh', 'Paul Cezanne',
        'Henri de Toulouse Lautrec', 'Georges Seurat', 'Paul Gauguin', 'Berthe Morisot', 'Mary Cassatt'
      ]
    },
    {
      query: 'modern european painting style reference',
      tags: ['painting', 'modern', 'europe'],
      characteristics: ['Distinct formal language', 'Recognizable motif systems', 'High authorial identity'],
      media: ['Painting'],
      eras: ['Modern'],
      regions: ['Europe'],
      moods: ['Graphic', 'Expressive'],
      items: [
        'Gustav Klimt', 'Egon Schiele', 'Rene Magritte', 'Salvador Dali', 'Pablo Picasso',
        'Henri Matisse', 'Joan Miro', 'Wassily Kandinsky', 'Paul Klee', 'Giorgio de Chirico'
      ]
    },
    {
      query: 'modern global painting style reference',
      tags: ['painting', 'modern', 'global'],
      characteristics: ['Distinct visual authorship', 'Culture-shaping iconography', 'Strong stylistic signatures'],
      media: ['Painting'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Expressive', 'Memorable'],
      items: [
        'Edward Hopper', 'Georgia OKeeffe', 'Jean Michel Basquiat', 'Keith Haring', 'Mark Rothko',
        'David Hockney', 'Frida Kahlo', 'Diego Rivera', 'Tamara de Lempicka', 'Yoshitomo Nara'
      ]
    },
    {
      query: 'graphic designer visual style reference',
      tags: ['design', 'graphic', 'identity'],
      characteristics: ['Systemic thinking', 'Iconic graphic voice', 'Industry-shaping influence'],
      media: ['Design'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Graphic', 'Designed'],
      items: [
        'Saul Bass', 'Paul Rand', 'Massimo Vignelli', 'Josef Muller Brockmann', 'Paula Scher',
        'David Carson', 'Neville Brody', 'Milton Glaser', 'Shigeo Fukuda', 'Ikko Tanaka'
      ]
    },
    {
      query: 'graphic design master style reference',
      tags: ['design', 'typography', 'graphic'],
      characteristics: ['Typography leadership', 'System-aware craft', 'Long-tail visual influence'],
      media: ['Design'],
      eras: ['Modern'],
      regions: ['Global'],
      moods: ['Graphic', 'Intentional'],
      items: [
        'Peter Saville', 'Alan Fletcher', 'Stefan Sagmeister', 'April Greiman', 'Wolfgang Weingart',
        'Herb Lubalin', 'Otl Aicher', 'Muriel Cooper', 'Susan Kare', 'Tadanori Yokoo'
      ]
    },
    {
      query: 'contemporary cross media artist style reference',
      tags: ['artist', 'contemporary', 'cross-media'],
      characteristics: ['Strong stylistic authorship', 'Wide visual influence', 'Instantly recognizable voice'],
      media: ['Illustration', 'Painting', 'Digital Art'],
      eras: ['Contemporary'],
      regions: ['Global'],
      moods: ['Stylized', 'Distinctive'],
      items: [
        'Beeple', 'Loish', 'Kim Jung Gi', 'Takashi Murakami', 'James Jean',
        'Hajime Sorayama', 'Junji Ito', 'Krenz Cushart', 'Norman Rockwell', 'Ashley Wood'
      ]
    }
  ];

  window.STYLES_DATA = expandRefGroups(designGroups).slice(0, 200);
  window.CHAR_STYLES_DATA = expandRefGroups(characterGroups).slice(0, 200);
  window.PHOTO_STYLES_DATA = expandRefGroups(photoGroups).slice(0, 200);
  window.ARTIST_STYLES_DATA = expandArtistGroups(artistGroups).slice(0, 200);
})();
