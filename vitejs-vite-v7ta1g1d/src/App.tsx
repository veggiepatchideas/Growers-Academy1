// @ts-nocheck
import React, { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── VIDEO IDs — paste your YouTube video ID after filming each one ───────────
const MY_VIDEOS = {
  "fix-slugs":         "6umHdK7CiVc",   // ✅ Your slug video
  "soil-basics":       "Q-hEoZzegkc",   // ✅ Your compost/soil video
  "grow-tomatoes":     "gntCbz_DVzQ",   // ✅ Your tomatoes video
  "containers-beds":   "RQPUR0dnUi4",  // ✅ Containers & beds video
  "sunlight-watering": "-J8VIgzQZsI",  // ✅ Sunlight & watering video
  "tools-guide":       "BMFEuAej1hQ",  // ✅ Tools guide video
  "sowing-seeds":      "_tS8VaCPyEs",  // ✅ Sowing seeds video
  "grow-lettuce":      "1qO1dV7GqiU",  // ✅ Lettuce video
  "grow-herbs":        "9cA6cS63zsE",  // ✅ Potting on video (replaces herbs)
  "grow-radish":       "H0wl7ZUJT4U",  // ✅ Radish video
  "grow-carrots":      "TlvlPPQ2nzQ",  // ✅ Carrots video
  "grow-spring-onions":"nTU5bGL_cok",  // ✅ Spring onions video
  "grow-peas":         "G6Yy6Y14w1w",  // ✅ Beans video (replaces peas)
  "grow-cucumbers":    "WcLkCvW_OL8",  // ✅ Cucumbers video
  "grow-courgettes":   "rBrIGucyxDo",  // ✅ Courgettes video
  "grow-beans":        "G6Yy6Y14w1w",  // ✅ Beans video
  "grow-beetroot":     null,
  "grow-onions-garlic":"rHes5khf9NY",  // ✅ Garlic video
  "grow-potatoes":     null,
  "seasonal-planning": null,
  "winter-growing":    null,
  "succession-sowing": null,
  "green-manures":     null,
  "plot-planning":     null,
  "irrigation":        null,
  "polytunnel":        null,
  "pest-management":   null,
  "seed-saving":       null,
  "composting":        "_ywYgOHVHcE",  // ✅ Composting video
  "crop-rotation":     null,
  "no-dig":            "SQKjZl_S8gI",  // ✅ No-dig video
  "fix-aphids":        null,
};

// ─── AMAZON AFFILIATE PRODUCTS ────────────────────────────────────────────────
// Add your Amazon Associates links here. Each product needs: name, why, url
// Optional: img (Amazon product image URL)
// To add a product: paste your amzn.to link in the url field
// To assign to a lesson: add the product key to the lesson's "products" array in COURSES
const AFFILIATE_PRODUCTS = {
  // ── TOOLS & EQUIPMENT ──
  "trowel":          { name:"Stainless Steel Hand Trowel", why:"Glen's most-used tool — a quality trowel lasts decades", url:"https://amzn.to/4sXayk2", tag:"🪴 Equipment" },
  "dibber":          { name:"Garden Hand Scoop", why:"Perfect for planting bulbs, seeds and transplanting seedlings", url:"https://amzn.to/42wXhnf", tag:"🪴 Equipment" },
  "hoe":             { name:"Long-Handled Dutch Hoe", why:"The fastest way to control weeds between rows", url:"https://amzn.to/4mOx8da", tag:"🪴 Equipment" },
  "watering-can":    { name:"10L Watering Can with Rose", why:"A long-reach rose gives the gentle shower seeds need", url:"https://amzn.to/4tFGhHx", tag:"🪴 Equipment" },
  "kneeler":         { name:"Garden Kneeler & Seat", why:"Your knees will thank you — doubles as a seat", url:"https://amzn.to/4uaGNNK", tag:"🪴 Equipment" },
  // ── GROWING SUPPLIES ──
  "seed-compost":    { name:"Garden Soil Sieve", why:"Sieve compost to get the fine texture seeds need to germinate well", url:"https://amzn.to/4u6XoSq", tag:"🌱 Growing" },
  "module-trays":    { name:"Modular Seed Trays", why:"Less root disturbance than open trays — better transplanting", url:"https://amzn.to/4cKUhbV", tag:"🌱 Growing" },
  "grow-bags":       { name:"Tomato Grow Bags", why:"Ideal for tomatoes and cucumbers — fresh compost every year", url:"https://amzn.to/4cKWy6I", tag:"🌱 Growing" },
  "perlite":         { name:"Perlite for Drainage", why:"Mix into compost for containers to massively improve drainage", url:"https://amzn.to/4e79SVo", tag:"🌱 Growing" },
  "liquid-feed":     { name:"Tomato Liquid Feed", why:"High-potassium feed switches plants from leaf to fruit production", url:"https://amzn.to/4tYla2M", tag:"🌱 Growing" },
  // ── PEST CONTROL ──
  "slug-pellets":    { name:"Ferric Phosphate Slug Pellets", why:"Organic and wildlife-safe — Glen's recommended slug control", url:"https://amzn.to/4cDVXoR", tag:"🐛 Pest Control" },
  "copper-tape":     { name:"Copper Slug Tape", why:"Stick around containers and raised beds for lasting protection", url:"https://amzn.to/4cvfAiM", tag:"🐛 Pest Control" },
  "insect-mesh":     { name:"Fine Insect Mesh Netting", why:"Keeps carrot fly, cabbage white and birds off crops", url:"https://amzn.to/3OAw9Rd", tag:"🐛 Pest Control" },
  // ── PROTECTION ──
  "fleece":          { name:"Horticultural Fleece Roll", why:"Essential for frost protection — keep a roll handy March to June", url:"https://amzn.to/3QkNSwz", tag:"🌡️ Protection" },
  "cloche":          { name:"Polypropylene Cloches", why:"Warms soil and protects early crops — extends season by weeks", url:"https://amzn.to/4u4pkGm", tag:"🌡️ Protection" },
  // ── SOIL & COMPOST ──
  "compost-bin":     { name:"300L Compost Bin", why:"Every plot needs at least one — free compost from kitchen and garden waste", url:"https://amzn.to/3QkO3YL", tag:"♻️ Soil" },
  "ph-tester":       { name:"Soil pH Test Kit", why:"Know your soil — vegetables prefer pH 6.0–7.0", url:"https://amzn.to/3OBONbo", tag:"♻️ Soil" },
  "growmore":        { name:"Blood Fish & Bone Fertiliser", why:"A balanced organic feed to work into beds before planting", url:"https://amzn.to/4mTqZMY", tag:"♻️ Soil" },
};

// Map lesson IDs to affiliate product keys — add product keys as you get Associates links
const LESSON_PRODUCTS = {
  "l1-soil":          ["compost-bin","ph-tester","growmore"],
  "l1-containers":    ["seed-compost","module-trays","perlite"],
  "l1-sunlight":      ["watering-can","fleece"],
  "l1-tools":         ["trowel","dibber","hoe","kneeler"],
  "l1-seeds":         ["seed-compost","module-trays"],
  "l2-lettuce":       ["seed-compost","module-trays"],
  "l2-herbs":         ["seed-compost","perlite"],
  "l2-carrots":       ["insect-mesh"],
  "l3-tomatoes":      ["grow-bags","liquid-feed","insect-mesh"],
  "l3-potatoes":      ["growmore"],
  "l3-cucumbers":     ["grow-bags","liquid-feed"],
  "l3-courgettes":    ["grow-bags"],
  "l4-winter":        ["fleece","cloche"],
  "l5-pests":         ["slug-pellets","copper-tape","insect-mesh","fleece"],
  "l5-composting":    ["compost-bin"],
  "l5-irrigation":    ["watering-can"],
  "slugs":            ["slug-pellets","copper-tape"],
};

const CHANNEL_URL  = "https://www.youtube.com/@veggiepatchideas";
const WEBSITE_URL  = "https://veggiepatchideas.co.uk";
const CHANNEL_NAME = "Veggie Patch Ideas";
const HOST         = "Glen";
const GUMROAD_URL        = "https://veggiepatchideas.co.uk"; // 🔑 Replace with your Gumroad link when ready
const GUMROAD_PRODUCT_ID = "your-product-permalink"; // 🔑 Replace with your Gumroad product permalink
const DIARY_URL          = "https://veggiepatchideas.co.uk/product/vegetable-garden-planner-diary/";

// ─── XP CONFIG ────────────────────────────────────────────────────────────────
const XP_VALUES = {
  lessonComplete: 20,
  perfectQuiz: 10,
  dailyVisit: 5,
  levelComplete: 50,
  watchVideo: 10,
  streakSeven: 25,
  streakThirty: 100,
  checklistComplete: 15,
  speedLearner: 30,
};

// Error boundary to catch crashes
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error: error.message }; }
  render() {
    if (this.state.error) return (
      <div style={{ padding:24, background:"#FFEBEE", minHeight:"100vh" }}>
        <h2 style={{ color:"#C62828", marginBottom:12 }}>⚠️ App Error</h2>
        <p style={{ fontSize:13, color:"#B71C1C", fontFamily:"monospace", background:"#fff", padding:12, borderRadius:8, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{this.state.error}</p>
        <button onClick={() => window.location.reload()} style={{ marginTop:16, background:"#C62828", color:"#fff", border:"none", borderRadius:999, padding:"10px 20px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Reload App</button>
      </div>
    );
    return this.props.children;
  }
}

const LEAGUES = [
  { id:"seedling",     name:"Seedling",      emoji:"🌱", minXP:0,    color:"#8BC34A" },
  { id:"grower",       name:"Grower",         emoji:"🌿", minXP:100,  color:"#4CAF50" },
  { id:"harvester",    name:"Harvester",      emoji:"🥬", minXP:300,  color:"#2E7D32" },
  { id:"cultivator",   name:"Cultivator",     emoji:"🍅", minXP:600,  color:"#E53935" },
  { id:"allotmenteer", name:"Allotmenteer",   emoji:"🌾", minXP:1000, color:"#FF8F00" },
  { id:"graduate",     name:"Glen's Graduate",emoji:"👨‍🌾",minXP:2000, color:"#6A1B9A" },
];

const getLeague = xp => {
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (xp >= LEAGUES[i].minXP) return LEAGUES[i];
  }
  return LEAGUES[0];
};

const getNextLeague = xp => {
  for (let i = 0; i < LEAGUES.length; i++) {
    if (xp < LEAGUES[i].minXP) return LEAGUES[i];
  }
  return null;
};

// ─── BADGES ───────────────────────────────────────────────────────────────────
const BADGES = [
  // Learning
  { id:"first-seed",       e:"🫘", t:"First Seed",        d:"Completed your first lesson",          cat:"learning" },
  { id:"soil-expert",      e:"🌍", t:"Soil Expert",        d:"Mastered soil & compost",               cat:"learning" },
  { id:"container-king",   e:"📦", t:"Container King",     d:"Mastered containers & beds",            cat:"learning" },
  { id:"sun-chaser",       e:"☀️", t:"Sun Chaser",         d:"Completed sunlight & watering",         cat:"learning" },
  { id:"tool-master",      e:"🔧", t:"Tool Master",        d:"Completed the tools lesson",            cat:"learning" },
  { id:"sow-and-grow",     e:"🌱", t:"Sow & Grow",         d:"Completed the seeds lesson",            cat:"learning" },
  { id:"salad-days",       e:"🥗", t:"Salad Days",         d:"Completed the lettuce lesson",          cat:"learning" },
  { id:"herb-garden",      e:"🌿", t:"Herb Garden",        d:"Completed the herbs lesson",            cat:"learning" },
  { id:"speedy-grower",    e:"🔴", t:"Speedy Grower",      d:"Completed the radishes lesson",         cat:"learning" },
  { id:"root-worker",      e:"🥕", t:"Root Worker",        d:"Completed the carrots lesson",          cat:"learning" },
  { id:"pod-person",       e:"🫛", t:"Pod Person",         d:"Completed the peas lesson",             cat:"learning" },
  { id:"tomato-master",    e:"🍅", t:"Tomato Master",      d:"Completed the tomatoes lesson",         cat:"learning" },
  { id:"spud-king",        e:"🥔", t:"Spud King",          d:"Completed the potatoes lesson",         cat:"learning" },
  { id:"cucumber-cool",    e:"🥒", t:"Cucumber Cool",      d:"Completed the cucumbers lesson",        cat:"learning" },
  { id:"courgette-king",   e:"🫑", t:"Courgette King",     d:"Completed the courgettes lesson",       cat:"learning" },
  { id:"allium-expert",    e:"🧅", t:"Allium Expert",      d:"Completed onions & garlic",             cat:"learning" },
  // Level completion
  { id:"green-thumb",      e:"👍", t:"Green Thumb",        d:"Completed Level 1",                     cat:"level" },
  { id:"easy-wins",        e:"🥬", t:"Easy Wins",          d:"Completed Level 2",                     cat:"level" },
  { id:"pro-grower",       e:"🍅", t:"Pro Grower",         d:"Completed Level 3",                     cat:"level" },
  { id:"all-seasons",      e:"🗓️", t:"All Seasons",        d:"Completed Level 4",                     cat:"level" },
  { id:"allotment-master", e:"🏡", t:"Allotment Master",   d:"Completed Level 5",                     cat:"level" },
  { id:"glens-graduate",   e:"👨‍🌾", t:"Glen's Graduate",   d:"Completed the entire free academy",     cat:"level" },
  // Streaks
  { id:"streak-3",         e:"🔥", t:"3-Day Streak",       d:"Visited 3 days in a row",               cat:"streak" },
  { id:"streak-7",         e:"🔥🔥",t:"7-Day Streak",      d:"Visited 7 days in a row",               cat:"streak" },
  { id:"streak-30",        e:"⚡", t:"30-Day Streak",       d:"Visited 30 days in a row",              cat:"streak" },
  { id:"speed-learner",    e:"⚡", t:"Speed Learner",       d:"Completed 3 lessons in one day",        cat:"streak" },
  // Special
  { id:"glens-student",    e:"📺", t:"Glen's Student",     d:"Watched your first video lesson",        cat:"special" },
  { id:"quiz-whiz",        e:"🧠", t:"Quiz Whiz",          d:"5 perfect quiz scores in a row",         cat:"special" },
  { id:"checklist-champ",  e:"✅", t:"Checklist Champion", d:"Completed 10 action checklists",         cat:"special" },
  { id:"problem-solver",   e:"🔍", t:"Problem Solver",     d:"Used the problem solver",                cat:"special" },
  { id:"planner",          e:"📅", t:"Planner",            d:"Set up your grower profile",             cat:"special" },
  { id:"no-mistakes",      e:"💎", t:"No Mistakes",        d:"Completed a level with no wrong answers",cat:"special" },
  { id:"full-academy",     e:"🏆", t:"Full Academy",       d:"Completed every single lesson",          cat:"special" },
];

// ─── COURSES DATA ─────────────────────────────────────────────────────────────
// NOTE: Levels 2-6 will be added in subsequent builds
const COURSES = [
  {
    id:"level-1", level:1, title:"Getting Started", emoji:"🌱", color:"#7CB342",
    desc:"Build your gardening foundations. Learn what every plant really needs to thrive.",
    free: true,
    lessons:[
      {
        id:"l1-soil", title:"Soil & Compost Basics", emoji:"🌍", dur:"8 min", vk:"soil-basics",
        xp: 20,
        glen:"On my allotment site I always tell new plot holders — spend money on your soil before anything else. Good compost transforms even the worst ground.",
        intro:"Good soil is the secret to everything in gardening. Think of it as your plants' home — get this right and everything else gets so much easier.",
        takes:["Healthy soil is alive — full of worms, bacteria and fungi","Most veg prefers well-draining, nutrient-rich soil","Compost is your best free fertiliser","pH matters — most veg likes 6.0–7.0"],
        steps:[
          {n:1,t:"Test your soil",d:"Grab a handful and squeeze. Good soil clumps but breaks apart easily. Sandy soil falls apart; clay stays in a hard ball."},
          {n:2,t:"Add compost",d:"Mix in a 5–10cm layer of compost or well-rotted manure. Improves drainage in clay and water retention in sandy soil."},
          {n:3,t:"Check drainage",d:"Dig a 30cm hole and fill with water — it should drain within an hour. If not, add grit or consider raised beds."},
          {n:4,t:"Feed regularly",d:"Top-dress with compost every few weeks or use a liquid feed fortnightly once plants are growing."},
        ],
        cl:["Buy a bag of multi-purpose compost","Test your soil by feel or with a pH kit","Clear weeds from your growing area","Mark out your first bed or container"],
        tip:"Used coffee grounds are brilliant for soil structure — worms absolutely love them!",
        mistakes:["Using soil straight from a bag without mixing","Compacting soil by walking on beds","Adding uncomposted kitchen scraps directly — they need to rot first"],
        quiz:[{q:"What pH do most vegetables prefer?",opts:["4.0–5.0","6.0–7.0","7.5–8.5","Doesn't matter"],a:1},{q:"What do worms in your soil indicate?",opts:["Poor drainage","A pest problem","Healthy, fertile soil","Too much clay"],a:2},{q:"What should you add to improve heavy clay soil?",opts:["Sand only","Compost or organic matter","Lime only","Nothing — clay is fine"],a:1},{q:"True or False: You should dig over your soil every year to improve it.",opts:["True", "False"],a:1},{q:"True or False: Worms in your soil are a sign of good soil health.",opts:["True", "False"],a:0}],
        badge:"soil-expert",
      },
      {
        id:"l1-containers", title:"Containers & Beds", emoji:"📦", dur:"7 min", vk:"containers-beds",
        xp: 20,
        glen:"I've seen brilliant crops grown in old wheelbarrows, washing-up bowls and even an old toilet! Drainage is all that matters — don't overthink the container.",
        intro:"Whether you have a balcony, patio or a full garden, there's a growing setup that works perfectly for you.",
        takes:["Containers can grow almost anything if sized correctly","Raised beds give you full control over your soil","Drainage holes are non-negotiable","Bigger is almost always better for containers"],
        steps:[
          {n:1,t:"Choose your container",d:"Match the container to the crop. Lettuce loves a window box; tomatoes need a 30L+ pot."},
          {n:2,t:"Add drainage",d:"A layer of gravel at the bottom, then compost mixed with perlite to stop compaction."},
          {n:3,t:"Position carefully",d:"South-facing spots are gold. Rotate pots weekly so all sides get equal light."},
          {n:4,t:"Water more often",d:"Containers dry out faster than beds — check daily in summer."},
        ],
        cl:["Measure your growing space","Choose at least one container or bed","Ensure drainage holes are in place","Buy a bag of potting compost"],
        tip:"Self-watering containers have a base reservoir — absolute game changer for tomatoes on a hot patio!",
        mistakes:["Using garden soil in containers — it compacts and drowns roots","Undersizing containers","Forgetting drainage holes"],
        quiz:[{q:"What goes at the bottom of a container for drainage?",opts:["Kitchen paper","Gravel or broken crockery","Sand only","Nothing needed"],a:1},{q:"What is the minimum depth for a container growing tomatoes?",opts:["10cm","20cm","30cm or more","5cm is fine"],a:2},{q:"Why do containers dry out faster than beds?",opts:["The soil is different","Limited volume and no connection to ground water","Containers get more sun","The plastic heats up"],a:1},{q:"True or False: Any container with drainage holes can be used to grow vegetables.",opts:["True", "False"],a:0},{q:"True or False: You should use the same compost in containers every year without changing it.",opts:["True", "False"],a:1}],
        badge:"container-king",
      },
      {
        id:"l1-sunlight", title:"Sunlight & Watering", emoji:"☀️", dur:"6 min", vk:"sunlight-watering",
        xp: 20,
        glen:"Here on the South-West coast I still map my plot at different times of day. Shade from fences catches out beginners every single year.",
        intro:"Sun and water are your plants' two most basic needs. Get these right and they'll reward you enormously.",
        takes:["Most veg needs 6+ hours of direct sun","Water at the base, not the leaves","Morning watering reduces disease risk","More plants die from overwatering than drought"],
        steps:[
          {n:1,t:"Map your sun",d:"Spend one day noting where sun falls. South and west-facing spots get the most light."},
          {n:2,t:"Water at the base",d:"Direct water to the soil, not the leaves. Wet leaves invite fungal problems."},
          {n:3,t:"Check before watering",d:"Push finger 2cm into soil. Damp? Leave it. Dry? Water thoroughly."},
          {n:4,t:"Mulch to retain moisture",d:"Add 5cm of compost, straw or bark around plants to lock in moisture."},
        ],
        cl:["Map the sunniest spots in your garden","Get a watering can with a rose attachment","Set a soil-check reminder","Buy some mulch for your beds"],
        tip:"A cheap rain gauge tells you exactly how much natural water your garden is getting — really useful in wet UK summers!",
        mistakes:["Watering a little every day instead of deeply","Watering in midday sun — scorches leaves","Ignoring rainfall in wet weeks and overwatering"],
        quiz:[{q:"Best time to water your plants?",opts:["Midday sun","Evening only","Morning","Doesn't matter at all"],a:2},{q:"How do you check if a plant needs watering?",opts:["Check the leaves colour","Push finger 2cm into soil — dry means water","Water every day regardless","Lift the pot"],a:1},{q:"What does mulching around plants do?",opts:["Makes the garden look tidy","Reduces evaporation and retains moisture","Adds nutrients immediately","Prevents all weeds permanently"],a:1},{q:"True or False: Most vegetables need at least 6 hours of sunlight per day.",opts:["True", "False"],a:0},{q:"True or False: It is better to water plants a little every day than deeply less often.",opts:["True", "False"],a:1}],
        badge:"sun-chaser",
      },
      {
        id:"l1-tools", title:"Basic Gardening Tools", emoji:"🔧", dur:"5 min", vk:"tools-guide",
        xp: 20,
        glen:"I've been using the same trowel for 12 years — it was £3 from a car boot sale. A good tool cleaned after every use will outlast a dozen cheap ones.",
        intro:"You don't need a shed full of expensive equipment. A few good tools will take you very far indeed.",
        takes:["Quality beats quantity — always","Clean tools after every single use","A trowel and fork are your everyday essentials","Build your collection gradually — don't buy everything at once"],
        steps:[
          {n:1,t:"Start with the basics",d:"Trowel, hand fork, watering can, gloves and a dibber. That's genuinely enough to begin growing."},
          {n:2,t:"Add a hoe",d:"A long-handled hoe for weeding saves your back enormously. Use it before weeds flower."},
          {n:3,t:"Get a kneeler",d:"Your knees will thank you. A foam kneeling pad costs just a few pounds."},
          {n:4,t:"Store properly",d:"Dry before storing. Rub metal parts with an oily rag after every use to prevent rust."},
        ],
        cl:["Buy a quality trowel and hand fork","Get a watering can (8–10L is ideal)","Find gloves that actually fit your hands","Grab a kneeling pad"],
        tip:"Car boot sales are brilliant for tools — vintage metal tools often outlast cheap modern ones by decades!",
        mistakes:["Buying cheap tools that break in week one","Leaving tools outside to rust in the rain","Skipping gloves — always protect your hands"],
        quiz:[{q:"Most essential tool for a beginner?",opts:["Electric strimmer","Trowel","Full-size spade","Wheelbarrow"],a:1},{q:"What is a dibber used for?",opts:["Digging large holes","Making planting holes for seeds and seedlings","Mixing compost","Cutting roots"],a:1},{q:"How should you store metal garden tools?",opts:["Leave them outside — they're weatherproof","Clean off soil and store dry to prevent rust","Submerge in water","It doesn't matter"],a:1},{q:"True or False: Expensive tools are always better than cheaper ones.",opts:["True", "False"],a:1},{q:"True or False: Garden tools should be cleaned and dried after use to prevent rust.",opts:["True", "False"],a:0}],
        badge:"tool-master",
      },
      {
        id:"l1-seeds", title:"Sowing Seeds", emoji:"🫘", dur:"10 min", vk:"sowing-seeds",
        xp: 20,
        glen:"I sow almost everything in modules rather than trays — it means far less root disturbance when planting out, and much better success rates overall. Give it a try!",
        intro:"Sowing your first seeds is one of the most satisfying things in gardening. Let's get it right from day one.",
        takes:["Seed packets tell you almost everything you need to know","Sow thinly — overcrowded seedlings struggle badly","Warmth and moisture are the two keys to germination","Most seeds take 5–14 days to sprout — patience is key!"],
        steps:[
          {n:1,t:"Read the packet",d:"Check depth, spacing, timing and light needs. Most packets list days to harvest too."},
          {n:2,t:"Prepare your tray",d:"Fill with seed compost, firm gently, water lightly then let it drain before sowing."},
          {n:3,t:"Sow thinly",d:"One or two seeds per cell. Cover lightly with compost or vermiculite."},
          {n:4,t:"Label everything",d:"You WILL forget what you planted where. Use lolly sticks and always write the date!"},
          {n:5,t:"Keep warm and moist",d:"Most seeds germinate best at 15–22°C. Cover with a propagator lid until seedlings appear."},
        ],
        cl:["Buy easy seeds (radish or lettuce are perfect starters)","Get dedicated seed compost — not regular potting compost","Find small pots or a module tray","Buy plant labels and a waterproof marker"],
        tip:"Window ledges work brilliantly for germination — the warmth from central heating really speeds things up in early spring!",
        mistakes:["Sowing too deep — most small seeds need just 1–2cm cover","Letting compost dry out completely after sowing","Not labelling — you will never guess correctly"],
        quiz:[{q:"Best germination temperature for most veg seeds?",opts:["5–10°C","15–22°C","28–35°C","Temperature doesn't matter"],a:1},{q:"Why sow seeds in modules rather than open trays?",opts:["Modules look neater","Less root disturbance when transplanting","Seeds germinate faster","You use less compost"],a:1},{q:"What should you always do immediately after sowing seeds?",opts:["Feed with liquid fertiliser","Label with the variety name and date","Move to a cold spot","Water with hot water"],a:1},{q:"True or False: All seeds need light to germinate.",opts:["True", "False"],a:1},{q:"True or False: Seeds sown too deep may fail to germinate.",opts:["True", "False"],a:0}],
        badge:"sow-and-grow",
      },
    ],
  },
  {
    id:"level-2", level:2, title:"Easy Wins", emoji:"🥬", color:"#558B2F",
    desc:"Fast, forgiving and delicious crops to build your confidence quickly.",
    free: true,
    lessons:[
      {
        id:"l2-lettuce", title:"Lettuce & Salad Leaves", emoji:"🥗", dur:"8 min", vk:"grow-lettuce", xp:20,
        glen:"I grow lettuce in every gap between slower crops all season long. It's the ultimate filler crop — never have a bare patch on your plot again.",
        intro:"Lettuce is the perfect starter crop. It's fast, forgiving, and if you sow a little every few weeks you'll have fresh salad for months without even trying.",
        takes:["Grows in as little as 4 weeks from sowing","Loves cool weather — perfect for spring and autumn","Pick outer leaves regularly to keep it producing all season","Grows brilliantly in containers, window boxes and gaps between other crops"],
        steps:[
          {n:1,t:"Choose your type",d:"Loose-leaf varieties like 'Salad Bowl' or 'Lollo Rosso' are the easiest — just cut as needed and the plant keeps growing. Hearting types like 'Little Gem' take longer but feel more satisfying."},
          {n:2,t:"Sow little and often",d:"A short row or small pot every 2–3 weeks from March to September gives you continuous picking all season. This is called succession sowing."},
          {n:3,t:"Keep it consistently moist",d:"Lettuce is mostly water — even one dry spell can make it bolt (flower) and turn bitter. Check daily in warm weather."},
          {n:4,t:"Harvest the right way",d:"Snip outer leaves with scissors at the base, leaving the heart intact. The plant will keep producing new leaves for weeks."},
        ],
        cl:["Buy loose-leaf lettuce seeds (or a mixed salad leaf packet)","Prepare a container, window box or small bed","Set a daily watering check reminder","Sow your first row or pot this weekend!"],
        tip:"Scatter crushed eggshells or copper rings around lettuce to create a barrier that slugs really don't like crossing.",
        mistakes:["Letting the soil dry out even once — it goes bitter almost instantly","Sowing too thickly — thin ruthlessly to give plants room","Leaving bolted plants in — they take up space and seed everywhere"],
        quiz:[{q:"How do you keep a loose-leaf lettuce producing all season?",opts:["Pull the whole plant when ready","Cut outer leaves and leave the heart growing","Stop watering once it's big","Feed with extra nitrogen"],a:1},{q:"What causes lettuce to bolt?",opts:["Too much watering","Hot weather and long days trigger it to flower and go bitter","Not enough sun","Root damage from pests"],a:1},{q:"What is succession sowing and why is lettuce perfect for it?",opts:["Growing different varieties at once","Sowing small amounts every 2–3 weeks for a continuous harvest — lettuce grows fast","Sowing in different containers","Sowing after another crop finishes"],a:1},{q:"True or False: Lettuce can be harvested multiple times using cut-and-come-again.",opts:["True", "False"],a:0},{q:"True or False: Lettuce grows best in full midday sun with no shade.",opts:["True", "False"],a:1}],
        badge:"salad-days",
      },
      {
        id:"l2-herbs", title:"Herbs", emoji:"🌿", dur:"7 min", vk:"grow-herbs", xp:20,
        glen:"A pot of fresh herbs on a sunny doorstep is genuinely the quickest win in all of gardening. I always start complete beginners with chives — they are absolutely impossible to kill.",
        intro:"Fresh herbs transform your cooking, cost almost nothing to grow, and they're among the easiest plants you can ever grow. Even a bright windowsill is enough.",
        takes:["Basil, parsley, chives and mint are the perfect starters","Most herbs love sun and hate waterlogged roots","Container-friendly — brilliant on a south-facing windowsill","Harvest regularly — it actually encourages bushy, healthy growth"],
        steps:[
          {n:1,t:"Pick your first herbs",d:"Start with chives (almost indestructible), mint (always grow in a pot!), basil (needs warmth and sun) and flat-leaf parsley (slow to germinate but worth it)."},
          {n:2,t:"Get the right pot with drainage",d:"Herbs die from wet feet more than almost anything else. Choose pots with drainage holes and use free-draining compost. Terracotta pots are ideal."},
          {n:3,t:"Position in your best sun",d:"Most herbs need 6+ hours of direct sun. A south-facing windowsill or patio spot is ideal. Move pots to follow the sun if needed."},
          {n:4,t:"Harvest correctly from the top",d:"Always cut stems just above a pair of leaves (a leaf node). This signals the plant to branch out and become bushy rather than tall and straggly."},
        ],
        cl:["Choose 2–3 herbs to start with","Get pots with drainage holes","Position in your sunniest available spot","Learn the correct harvesting technique before you start cutting"],
        tip:"Supermarket herb plants are almost always 3–4 plants crammed into one pot. Split them apart gently, repot individually, and you've got 4 plants for the price of one!",
        mistakes:["Overwatering — herbs in waterlogged compost rot incredibly quickly","Letting herbs flower without pinching — they stop producing leaves","Growing mint in an open bed — it will completely take over within a season"],
        quiz:[{q:"Which herb absolutely must be grown in its own pot to stop it spreading?",opts:["Basil","Chives","Mint","Flat-leaf parsley"],a:2},{q:"Where should you cut when harvesting herbs to encourage bushy regrowth?",opts:["At the base of the whole plant","Just above a leaf node","From the roots upward","It doesn't matter where you cut"],a:1},{q:"Why does basil struggle in UK outdoor conditions?",opts:["It prefers clay soil","It's a tropical plant needing warmth above 10°C that UK summers can't guarantee","It needs very acidic soil","It grows too fast outdoors"],a:1},{q:"True or False: Most herbs prefer well-drained soil rather than wet conditions.",opts:["True", "False"],a:0},{q:"True or False: You should let herbs flower to get the best leaf flavour.",opts:["True", "False"],a:1}],
        badge:"herb-garden",
      },
      {
        id:"l2-radish", title:"Radishes", emoji:"🔴", dur:"5 min", vk:"grow-radish", xp:20,
        glen:"I use radishes to mark out my carrot rows on the allotment every single year. They germinate so fast you can see exactly where the row is, and they're harvested and gone long before the carrots need the space.",
        intro:"Radishes might be the most satisfying crop a beginner can grow. Sow them today and you could literally be eating them in three weeks. It's hard to believe until you try it.",
        takes:["Ready in just 3–4 weeks from sowing — the fastest crop you can grow","Sow directly in the ground — they hate being transplanted","Brilliant for filling gaps between slower-growing crops","A cool-season crop — avoid the heat of midsummer"],
        steps:[
          {n:1,t:"Sow directly where they'll grow",d:"Radishes really dislike having their roots disturbed. Sow seeds 1cm deep, every 5–8cm, directly in the bed or container where they'll stay."},
          {n:2,t:"Keep consistently moist",d:"Dry spells during growth make radishes hot, woody and unpleasant to eat. Consistent watering gives you the mild, crisp results you want."},
          {n:3,t:"Thin promptly",d:"Once seedlings are 2cm tall, thin to 5cm apart. The thinnings are delicious — eat them raw in salads, roots and all."},
          {n:4,t:"Check and harvest weekly",d:"Pull when golf-ball sized — usually 3–4 weeks. If you leave them too long they go hollow, pithy and very hot. Check every few days."},
        ],
        cl:["Buy radish seeds (Cherry Belle or French Breakfast are classics)","Clear a small patch of bed or fill a container","Sow directly this weekend — you'll see germination in days"],
        tip:"Sow a short row every two weeks from March to May, then again August to October. You'll have radishes for months with almost no effort.",
        mistakes:["Growing in the heat of midsummer — they bolt and go pithy in heat","Not thinning properly — crowded radishes give all leaf and no root","Waiting too long to harvest — check them every few days once they're sizing up"],
        quiz:[{q:"How quickly can you harvest summer radishes after sowing?",opts:["6–8 weeks","3–4 weeks","12 weeks","2 days"],a:1},{q:"What happens if you leave radishes in the ground too long?",opts:["They grow bigger and tastier","They become hollow, pithy and too hot to eat","They turn white","Nothing — they keep indefinitely"],a:1},{q:"What are radish thinnings good for?",opts:["Nothing — discard them","Eating raw in salads — they're delicious","Replanting elsewhere","Composting only"],a:1},{q:"True or False: Radishes can be harvested in as little as 3 weeks from sowing.",opts:["True", "False"],a:0},{q:"True or False: Radishes left in the ground too long become soft and sweet.",opts:["True", "False"],a:1}],
        badge:"speedy-grower",
      },
      {
        id:"l2-carrots", title:"Carrots", emoji:"🥕", dur:"9 min", vk:"grow-carrots", xp:20,
        glen:"Carrots on my allotment are always sown in raised beds with homemade compost. The secret is deep, loose, stone-free soil — and patience. They reward you when you don't rush them.",
        intro:"There is genuinely nothing like pulling your first homegrown carrot. The flavour compared to shop-bought is completely different — sweeter, earthier and absolutely delicious.",
        takes:["Need deep, loose, stone-free soil to grow straight and long","Sow thinly and thin ruthlessly — crowding is the main reason for failure","Never add fresh manure — it makes carrots fork and split","Slow to germinate — up to 3 weeks. Don't give up!"],
        steps:[
          {n:1,t:"Prepare your soil carefully",d:"Carrots need deep, loose soil free from stones and fresh manure. For containers use a deep pot (30cm+) with sandy compost. Raised beds are ideal."},
          {n:2,t:"Sow thinly in rows",d:"Sow seeds 1cm deep in rows 15cm apart from March to June. Sow as thinly as you possibly can — this saves a lot of thinning later."},
          {n:3,t:"Thin in two stages",d:"First thin to 2cm apart once seedlings are 2cm tall. Then thin again to 5–7cm apart. Always thin in the evening to avoid attracting carrot fly."},
          {n:4,t:"Cover against carrot fly",d:"Carrot fly is the main pest. Cover with fine mesh or fleece from sowing to harvest. Avoid thinning in the morning when flies are most active."},
          {n:5,t:"Harvest at the right time",d:"Check by gently exposing the top of the root. Most varieties are ready when the shoulder is 1–2cm across. Lift with a fork to avoid snapping."},
        ],
        cl:["Choose a carrot variety (Nantes or Chantenay for heavy soils)","Prepare deep, stone-free soil or a deep container","Buy fine mesh or fleece to protect against carrot fly","Plan to sow from March onwards"],
        tip:"Mix carrot seeds with a little dry sand before sowing — it helps you sow much more thinly and evenly, which makes a huge difference to your final crop.",
        mistakes:["Adding fresh manure — makes roots fork badly","Sowing too thickly and not thinning — causes small, twisted carrots","Thinning in the heat of the day — the smell attracts carrot fly","Giving up after 2 weeks with no germination — they're just slow!"],
        quiz:[{q:"What is the main pest threat to carrots?",opts:["Slugs","Aphids","Carrot fly","Rabbits"],a:2},{q:"Why should you thin carrots in the evening rather than the morning?",opts:["Easier to see in low light","Carrot fly is attracted to the smell — evening reduces the risk of attracting them","Evening soil is softer","Cooler temperatures help roots recover"],a:1},{q:"What soil condition gives you the best shaped, straightest carrots?",opts:["Heavy clay soil","Deep, stone-free, loose soil","Very fertile soil with lots of manure","Waterlogged conditions"],a:1},{q:"True or False: Carrots grow best in heavy clay soil.",opts:["True", "False"],a:1},{q:"True or False: Carrot fly can be prevented by covering with fine mesh.",opts:["True", "False"],a:0}],
        badge:"root-worker",
      },
      {
        id:"l2-spring-onions", title:"Spring Onions", emoji:"🌱", dur:"6 min", vk:"grow-spring-onions", xp:20,
        glen:"Spring onions are on my allotment every single year without fail. They're ready in 8 weeks, take up almost no space, and I can always find a use for them. Perfect for filling any gap.",
        intro:"Spring onions are one of the most underrated crops for beginners. Quick to grow, compact, versatile in the kitchen — and you can squeeze them into the tiniest of spaces.",
        takes:["Ready in just 8–10 weeks from sowing","Incredibly compact — perfect for containers and window boxes","Sow every few weeks for a continuous supply","Much easier to grow than full-size onions"],
        steps:[
          {n:1,t:"Sow directly in rows",d:"Sow seeds 1cm deep in rows 10cm apart from March to August. Sow thinly — about one seed per centimetre. No need to thin if sown thinly."},
          {n:2,t:"Keep watered in dry spells",d:"Spring onions have shallow roots and dry out quickly. Water regularly but don't let them sit in waterlogged soil."},
          {n:3,t:"Succession sow every 3 weeks",d:"Sow a short row every 3 weeks throughout the season and you'll have fresh spring onions available from May right through to October."},
          {n:4,t:"Harvest when pencil-thick",d:"Pull when the stems are pencil-thick — usually 8–10 weeks. They can stay in the ground a little longer but eventually get tough and hollow."},
        ],
        cl:["Buy spring onion seeds (White Lisbon is the classic)","Find a small patch or container","Plan succession sowings every 3 weeks","Add spring onions to your weekly planting schedule"],
        tip:"Spring onions make brilliant companion plants for carrots — the onion smell confuses and deters carrot fly. Sow them in alternating rows for double the benefit!",
        mistakes:["Sowing too thickly — leads to weak, spindly plants","Only sowing once — one big harvest instead of a continuous supply","Harvesting too late — they become tough and hollow quickly"],
        quiz:[{q:"How often should you sow spring onions for a continuous supply?",opts:["Once a year","Every 3 weeks","Every day","Only in spring"],a:1},{q:"Which crop makes an excellent companion plant alongside spring onions?",opts:["Tomatoes","Carrots — spring onions help deter carrot fly","Courgettes","Potatoes"],a:1},{q:"When should you harvest spring onions for the best flavour?",opts:["When fully mature and forming large bulbs","When pencil-thick — don't wait for them to bulb up","Only in summer","After they flower"],a:1},{q:"True or False: Spring onions can be sown every 3 weeks for a continuous harvest.",opts:["True", "False"],a:0},{q:"True or False: Spring onions must be grown in full shade to develop properly.",opts:["True", "False"],a:1}],
        badge:null,
      },
      {
        id:"l2-peas", title:"Peas", emoji:"🫛", dur:"8 min", vk:"grow-peas", xp:20,
        glen:"I grow mangetout every year because you get an enormous harvest from a very small space. Pick them every single day at their peak and they just keep producing. Leave even one to mature and the whole plant stops — so keep picking!",
        intro:"Peas straight from the pod, eaten in the garden before they even make it indoors — that's one of the great joys of growing your own. They're also surprisingly easy once you know their tricks.",
        takes:["Love cool weather — sow early spring or late summer for best results","Must be supported as they grow — even dwarf varieties benefit from support","The more you pick, the more they produce — harvest daily at peak season","Mangetout and sugar snap varieties give the biggest harvests from the smallest space"],
        steps:[
          {n:1,t:"Choose your type",d:"Mangetout and sugar snap peas are easiest and most productive for beginners. Traditional shelling peas taste incredible but need more space and timing."},
          {n:2,t:"Sow direct or in guttering",d:"Sow 3–5cm deep in double rows 8cm apart from March to May. Or pre-germinate in lengths of guttering indoors and slide the whole row into a prepared trench — brilliant technique!"},
          {n:3,t:"Put up support immediately",d:"Even before they need it, put up pea sticks, netting or a trellis. Once peas start climbing they grow remarkably fast and will collapse without support."},
          {n:4,t:"Water at flowering",d:"Consistent watering when flowers appear directly affects pod set and yield. This is when water matters most — don't let them dry out now."},
          {n:5,t:"Pick every single day",d:"This is the crucial step most beginners miss. Once pods are ready, pick every day. Even one pod left to mature on the plant signals it to stop producing entirely."},
        ],
        cl:["Buy mangetout or sugar snap seeds (Oregon Sugar Pod is excellent)","Prepare a sunny spot with supports ready","Plan your sowing for March–May","Set a daily picking reminder when they're in full production"],
        tip:"Pre-soak pea seeds in water for 12–24 hours before sowing. Germination is much faster and more even — especially useful in cold spring soil.",
        mistakes:["Not supporting plants early enough — they fall over and become a tangled mess","Forgetting to pick daily — one missed day can slow production significantly","Sowing in hot midsummer — peas dislike heat and will bolt immediately","Overwatering before flowering — save the extra water for when pods are forming"],
        quiz:[{q:"What happens if you leave pea pods to mature on the plant?",opts:["The plant produces even more pods","The plant stops producing entirely","The pods taste better","Nothing changes"],a:1},{q:"What is the guttering technique for sowing peas?",opts:["A watering method","Pre-sowing in guttering indoors then sliding into a trench — no root disturbance","A way of building raised beds","A pest control method"],a:1},{q:"Why do peas need support?",opts:["To keep them warm","They are climbing plants that use tendrils to grip upward","To prevent carrot fly","Purely for visual effect"],a:0},{q:"True or False: Pea plants need support to climb.",opts:["True", "False"],a:0},{q:"True or False: Leaving pea pods on the plant encourages more production.",opts:["True", "False"],a:1}],
        badge:"pod-person",
      },
    ],
  },
  {
    id:"level-3", level:3, title:"Grow Like a Pro", emoji:"🍅", color:"#E53935",
    desc:"Tackle the classics — tomatoes, potatoes and more rewarding crops.",
    free: true,
    lessons:[
      {
        id:"l3-tomatoes", title:"Tomatoes", emoji:"🍅", dur:"12 min", vk:"grow-tomatoes", xp:25,
        glen:"I grow tomatoes in my polytunnel and get massive crops every single year. The absolute secret? Feed every week without fail once the flowers appear. Never miss a single week — ever. That one habit makes all the difference.",
        intro:"Tomatoes are the number one grow-your-own crop in the UK for very good reason. They're productive, incredibly satisfying, and the flavour of a homegrown tomato versus a shop-bought one is genuinely incomparable.",
        takes:["Need warmth — start indoors in March, plant outside only after last frost","Cordon (tall) types need regular pinching out of sideshoots and supporting","Feed every single week with tomato food once the first flowers appear","The biggest beginner mistake by far is skipping feeds — don't do it"],
        steps:[
          {n:1,t:"Choose your variety",d:"Bush types like 'Tumbling Tom' are the easiest — no pinching needed. Cordon types like 'Gardener's Delight' and 'Sungold' give higher yields but need more attention. Start with bush if you're new to tomatoes."},
          {n:2,t:"Sow indoors in March",d:"Sow seeds in small pots on a warm, sunny windowsill. They need warmth to germinate — 20°C+ is ideal. Don't plant outside until after the last frost, usually late May in the UK."},
          {n:3,t:"Pinch out sideshoots on cordon types",d:"The sideshoot grows in the angle between the main stem and a branch. Pinch it out when small with your fingers. Do this every week or plants become an unmanageable jungle."},
          {n:4,t:"Water consistently every day",d:"Irregular watering is the main cause of blossom end rot (black bottom) and fruit splitting. Water at the base daily in summer — never let the compost dry out completely."},
          {n:5,t:"Feed every single week",d:"Switch to tomato feed (high in potassium) once the first tiny flowers appear. Feed every week without fail until the end of the season. This is non-negotiable for a good crop."},
        ],
        cl:["Choose your tomato variety — bush or cordon?","Sow indoors in March or buy plants from a garden centre in May","Set up canes and supports before plants need them","Buy a bottle of liquid tomato feed","Set a weekly feeding reminder on your phone"],
        tip:"Put a ripe banana skin at the bottom of your planting hole before planting. The potassium it releases as it breaks down genuinely supercharges fruit production.",
        mistakes:["Planting outside before the last frost — one cold night can kill young plants overnight","Skipping the weekly feed — the single biggest beginner mistake with tomatoes","Inconsistent watering — causes blossom end rot and splitting fruits","Not pinching out sideshoots on cordon types — plants become unmanageable"],
        quiz:[{q:"What should you do with sideshoots on a cordon tomato plant?",opts:["Leave them to grow naturally","Pinch them out every week","Tie them to the cane","Water them separately"],a:1},{q:"What does stopping a cordon tomato plant in August mean?",opts:["Stopping all watering","Pinching out the top growing tip so energy goes to ripening existing fruit","Removing all remaining flowers","Cutting the plant back by half"],a:1},{q:"What type of tomato does NOT need to have sideshoots removed?",opts:["Cordon varieties","All tomatoes need sideshoots removed","Bush and tumbling varieties — they grow naturally without training","Only heritage varieties"],a:2},{q:"True or False: Cordon tomatoes need sideshoots removing regularly.",opts:["True", "False"],a:0},{q:"True or False: Tomatoes should be fed high-nitrogen feed once flowering begins.",opts:["True", "False"],a:1}],
        badge:"tomato-master",
      },
      {
        id:"l3-potatoes", title:"Potatoes", emoji:"🥔", dur:"10 min", vk:"grow-potatoes", xp:25,
        glen:"On my 80-plot allotment site, potatoes are by far the number one crop. Everyone grows them. Get your chitting right and earth up properly and consistently — those two simple things make all the difference between a good crop and a great one.",
        intro:"Few things in gardening match the pure satisfaction of digging up your own potatoes. It feels exactly like a treasure hunt — and the treasure is absolutely delicious.",
        takes:["First early varieties give you new potatoes from June–July","Plant March–April after chitting sprouts","Earth up regularly to protect tubers from light and increase yield","Grow bags on a patio work brilliantly — no digging required at harvest"],
        steps:[
          {n:1,t:"Buy and chit seed potatoes",d:"Buy certified seed potatoes from January. Chitting means placing them in a cool, light, frost-free spot (like a windowsill) with the eyes facing up so they develop short, stubby green sprouts before planting."},
          {n:2,t:"Plant at the right depth",d:"Plant 10–15cm deep with sprouts facing upward. Space 30cm apart in rows 60cm apart. In grow bags, plant 3 per standard bag."},
          {n:3,t:"Earth up regularly",d:"When shoots reach 20–25cm, use a hoe or your hands to mound soil up around the stems, covering the lower leaves. Repeat 2–3 times as the season progresses. This prevents greening and dramatically increases yield."},
          {n:4,t:"Watch for blight",d:"Potato blight is a fungal disease that spreads in warm, wet weather (July–August). Look for brown patches on leaves with white mould underneath. If you see it, cut the foliage off immediately and harvest what you can."},
          {n:5,t:"Harvest at the right time",d:"First earlies: harvest when the flowers fully open. Maincrop: wait until foliage turns yellow and dies back. Always lift on a dry day using a fork to avoid spearing your crop."},
        ],
        cl:["Buy first early seed potatoes in January or February","Start chitting on a cool, light windowsill","Prepare your bed or fill grow bags with compost","Mark your planting date on the calendar","Get a garden fork ready for harvest"],
        tip:"Grow bags on a patio are brilliant for potatoes — no digging at harvest time, just roll back the bag and your potatoes are right there. So satisfying and so easy.",
        mistakes:["Forgetting to earth up — green potatoes contain solanine and are mildly toxic. Never eat green potatoes","Planting unchitted potatoes — they take much longer to establish","Harvesting maincrop too early — wait for the foliage to die back","Ignoring blight signs — act immediately if you see them"],
        quiz:[{q:"What is 'chitting' a potato?",opts:["Cutting it into pieces before planting","Letting it develop sprouts in the light before planting","Soaking it in water overnight","Removing the skin before planting"],a:1},{q:"Why must you earth up potatoes as they grow?",opts:["To add nutrients","To prevent tubers turning green and producing solanine","To keep them warm","To improve drainage"],a:1},{q:"What is the most reliable sign that first early potatoes are ready to harvest?",opts:["The flowers open","When you count 10 weeks from planting","When the foliage starts to die back and flowers appear","After a hard frost"],a:2},{q:"True or False: Chitting means allowing seed potatoes to sprout before planting.",opts:["True", "False"],a:0},{q:"True or False: Green potatoes are safe to eat once cooked.",opts:["True", "False"],a:1}],
        badge:"spud-king",
      },
      {
        id:"l3-cucumbers", title:"Cucumbers", emoji:"🥒", dur:"9 min", vk:"grow-cucumbers", xp:25,
        glen:"Cucumbers in my polytunnel are unbelievably productive once they get going. The key thing most people miss is that you must keep them warm — they genuinely hate cold. And keep picking or they stop producing overnight.",
        intro:"A well-grown cucumber plant is one of the most productive things you can grow. One plant in a good summer can give you dozens of cucumbers. The trick is giving them the warmth and feeding they crave.",
        takes:["Cucumbers love heat — they genuinely struggle below 15°C","Greenhouse and polytunnel growing gives by far the best results in the UK","All-female varieties are easiest — no pollination needed","Pick cucumbers young and often — leaving them to over-mature stops production completely"],
        steps:[
          {n:1,t:"Choose the right variety",d:"For growing under cover, choose all-female varieties like 'Marketmore' or 'Bella'. For outdoors in a sheltered spot, choose ridge cucumber varieties which are more tolerant of cooler conditions."},
          {n:2,t:"Sow indoors in April",d:"Sow seeds on their edge (not flat) in small pots of seed compost. Keep at 20°C+ — they need real warmth to germinate well. Don't rush them outside."},
          {n:3,t:"Train up a support",d:"Cucumbers are climbing plants. Train the main stem up a cane or wire. Pinch out the growing tip once it reaches the top of your support. Side shoots will produce the fruit."},
          {n:4,t:"Water and feed consistently",d:"Cucumbers need reliable watering — daily in summer. Feed weekly with a high-potassium liquid feed once flowers appear, just like tomatoes."},
          {n:5,t:"Pick young and often",d:"Harvest cucumbers when they're 15–20cm long. Don't let them go yellow and fat — it stops the plant producing. Check every single day in peak season."},
        ],
        cl:["Choose a variety suitable for your growing conditions","Sow indoors in April in warmth","Set up a vertical support structure","Plan daily watering and weekly feeding routine","Set a daily checking reminder during peak season"],
        tip:"Remove any flowers from outdoor cucumber plants for the first 4–5 weeks. This encourages the plant to put its energy into developing a strong root system before it starts fruiting.",
        mistakes:["Putting plants outside too early — one cold night seriously sets them back","Growing indoors without removing male flowers (on non all-female varieties) — causes bitter fruits","Not picking frequently enough — leaving mature cucumbers stops production dead","Inconsistent watering — causes bitter fruits and poor texture"],
        quiz:[{q:"When should you harvest cucumbers for the best flavour and continued production?",opts:["When they are yellow and fully mature","When they are 15–20cm long and still firm and green","Only once a week","After the first frost"],a:1},{q:"Why do cucumbers need to be grown under cover in most of the UK?",opts:["They need protection from rain only","They need consistent warmth above 15°C that UK outdoor summers can't guarantee","They attract too many outdoor pests","They need artificial lighting"],a:1},{q:"What do you do with the growing tip of a cucumber plant when it reaches the top of its support?",opts:["Leave it to trail down","Pinch it out to redirect energy into fruiting sideshoots","Tie it to the next cane","Remove it completely"],a:1},{q:"True or False: Cucumbers grow best outdoors in the UK without protection.",opts:["True", "False"],a:1},{q:"True or False: Cucumbers should be harvested before they turn yellow.",opts:["True", "False"],a:0}],
        badge:"cucumber-cool",
      },
      {
        id:"l3-courgettes", title:"Courgettes", emoji:"🫑", dur:"8 min", vk:"grow-courgettes", xp:25,
        glen:"Courgettes are the most generous crop on my entire allotment. One plant fed and watered well will keep a family in courgettes all summer. But here's the thing everyone learns the hard way — check them every single day. A courgette becomes a marrow literally overnight.",
        intro:"Courgettes are legendary for productivity — one well-fed plant produces more veg than most beginners expect. They're also one of the easiest crops to grow once they get established.",
        takes:["One well-fed plant genuinely feeds a family all summer","They need a lot of space — at least 90cm between plants","Must check every single day at peak season — courgettes become marrows overnight","Superb in containers if you have a large enough pot (30L+)"],
        steps:[
          {n:1,t:"Sow indoors in April–May",d:"Sow one seed per pot, on its edge, in seed compost. Keep warm (18°C+). They germinate quickly — usually within a week. Plant outside after the last frost."},
          {n:2,t:"Plant in rich, well-prepared soil",d:"Courgettes are hungry plants. Dig in a generous amount of compost or well-rotted manure at planting time. They reward good soil preparation more than almost any other crop."},
          {n:3,t:"Water generously at the base",d:"Courgettes have huge leaves that lose a lot of water. Water at the base daily in dry weather — not over the leaves, as this encourages powdery mildew."},
          {n:4,t:"Feed every two weeks",d:"Once plants start flowering, feed with a balanced liquid fertiliser every two weeks. Switch to a high-potassium feed like tomato food once fruits are forming."},
          {n:5,t:"Check and pick daily",d:"This is the most important step. A courgette that's perfect on Monday morning can be a massive, seedy marrow by Tuesday evening. Pick when 15–20cm long for the best flavour."},
        ],
        cl:["Buy courgette seeds or plants (one or two plants is plenty)","Prepare a large, rich planting spot or big container","Plan for daily checking during peak summer","Set up a feeding schedule from first flowering"],
        tip:"Plant courgettes through a hole in black plastic mulch. It keeps weeds down, retains soil moisture, and the black plastic warms the soil — courgettes absolutely love the extra warmth.",
        mistakes:["Planting too close together — they need serious space to perform well","Watering over the leaves — causes powdery mildew which weakens the plant","Not checking daily — the marrow problem is very real and very common","Under-feeding — courgettes are hungry and reward generous feeding enormously"],
        quiz:[{q:"How often should you check courgette plants during peak season?",opts:["Once a week","Every few weeks","Every single day","Only when you want to cook them"],a:2},{q:"At what size should you harvest courgettes for the best flavour?",opts:["As large as possible","At 15–20cm — before they become marrows","Only when yellow","After the flower drops off"],a:1},{q:"What disease commonly affects courgette leaves?",opts:["Blight","Clubroot","Powdery mildew — avoid wetting the leaves","Carrot fly"],a:2},{q:"True or False: Courgettes should be checked every day in summer.",opts:["True", "False"],a:0},{q:"True or False: Courgettes are best harvested when they reach marrow size.",opts:["True", "False"],a:1}],
        badge:"courgette-king",
      },
      {
        id:"l3-beans", title:"French Beans", emoji:"🫘", dur:"8 min", vk:"grow-beans", xp:25,
        glen:"French beans are one of my favourite crops to grow with kids on the allotment — they're easy, fast, and picking a big bowl of fresh beans is incredibly satisfying. Dwarf varieties are the easiest place to start — no staking needed and they're ready in just 8 weeks.",
        intro:"French beans are incredibly satisfying to grow. They're fast, productive, and fresh beans from the garden taste completely different — far better — than anything you can buy. Dwarf varieties are a brilliant beginner crop.",
        takes:["Dwarf varieties are the easiest — compact, no support needed","Climbing varieties are more productive but need a 1.8m+ cane or frame","Direct sow after last frost — they dislike root disturbance","Pick every few days — like peas, regular picking keeps them producing"],
        steps:[
          {n:1,t:"Choose your type",d:"Start with dwarf French beans like 'The Prince' or 'Safari' — they're compact, easy and need no support. Climbing beans like 'Cobra' give more per square metre but need a trellis or wigwam of canes."},
          {n:2,t:"Sow direct after last frost",d:"Sow seeds 5cm deep, 15cm apart in rows 45cm apart, directly outside from late May onwards. Or start indoors in April in root trainers for an earlier crop."},
          {n:3,t:"Keep moist at flowering",d:"Water is most critical when plants are in flower. Inconsistent watering at this stage causes flowers to drop without setting pods. Keep the soil consistently moist."},
          {n:4,t:"Provide support for climbers",d:"Put up canes, netting or a wigwam BEFORE you need it. Once climbing beans start growing they go fast and will scramble all over neighbouring plants if not guided."},
          {n:5,t:"Pick every 2–3 days",d:"Pick beans when they're young and tender — about finger thickness. The more you pick, the more the plant produces. Leave pods to mature and set seed, and production stops."},
        ],
        cl:["Choose dwarf or climbing variety","Buy seeds or source from a local garden centre","Plan sowing date for after last frost (late May in most of UK)","Set up supports for climbers before sowing","Plan picking routine every 2–3 days at harvest"],
        tip:"Sow a second batch of French beans 4–5 weeks after your first sowing. This staggers the harvest so you're not overwhelmed all at once and have beans for much longer.",
        mistakes:["Sowing too early before last frost — beans are very cold-sensitive","Not picking often enough — production slows dramatically if pods are left to mature","Under-watering at flowering stage — causes flower drop and poor pod set","Planting climbing beans without adequate support — they become impossible to manage"],
        quiz:[{q:"Why must you pick French beans regularly every 2–3 days?",opts:["To make them taste better","Because they go yellow quickly","Regular picking keeps the plant producing — leaving pods slows production","They fall off if not picked"],a:2},{q:"What is the difference between dwarf and climbing bean varieties?",opts:["Climbing varieties taste better","Dwarf needs no support — climbing produces more over a longer season","Dwarf varieties are disease resistant","There is no real difference"],a:1},{q:"At what stage should French beans be harvested for the best eating quality?",opts:["When seeds are bulging in the pod","When young and finger-thick before seeds develop","Only when pods turn yellow","After the first frost"],a:1},{q:"True or False: Picking French beans regularly encourages more production.",opts:["True", "False"],a:0},{q:"True or False: French beans are best when seeds are fully bulging in the pod.",opts:["True", "False"],a:1}],
        badge:null,
      },
      {
        id:"l3-beetroot", title:"Beetroot", emoji:"🟣", dur:"7 min", vk:"grow-beetroot", xp:25,
        glen:"Beetroot is massively underrated. It's dead easy, incredibly versatile in the kitchen, and the young leaves are brilliant in salads. I grow a row all season. The golden and candy-stripe varieties are spectacular — try them if you can find the seeds.",
        intro:"Beetroot is one of the most straightforward and rewarding crops you can grow. Sow it, water it, and in 8–10 weeks you have beautiful roots and edible leaves. What's not to love?",
        takes:["One of the easiest root vegetables — almost nothing goes wrong","Sow direct from April onwards — no indoor sowing needed","The young leaves are delicious in salads — a bonus crop from day one","Globe varieties are easiest; try golden or candy-stripe for something different"],
        steps:[
          {n:1,t:"Sow directly in rows",d:"Beetroot seeds are actually clusters of 2–3 seeds in one. Sow 2.5cm deep, 10cm apart in rows 25cm apart from April to July. Water in well after sowing."},
          {n:2,t:"Thin carefully",d:"Once seedlings are 2–3cm tall, thin to leave the strongest plant every 10cm. Don't throw the thinnings away — they're tender and delicious added raw to salads."},
          {n:3,t:"Water steadily",d:"Beetroot needs consistent moisture to develop evenly. Irregular watering causes the roots to split or go woody. Aim for steady, regular watering rather than feast-and-famine."},
          {n:4,t:"Harvest at the right size",d:"Golf ball to tennis ball size is perfect — usually 8–10 weeks. Twist the root out rather than pulling to avoid bleeding. Don't cut the leaves — twist them off to prevent the root losing its colour."},
        ],
        cl:["Buy beetroot seeds (Boltardy is the most popular for beginners)","Prepare a weed-free bed or deep container","Plan succession sowings from April to July","Use the thinnings in salads — don't waste them"],
        tip:"Soak beetroot seeds in warm water for 30 minutes before sowing. It softens the seed coat and significantly improves germination speed and evenness.",
        mistakes:["Harvesting too late — large beetroot become woody and tough","Cutting the leaves off at harvest — the root bleeds and loses colour. Always twist them off","Irregular watering — causes splitting and poor shape","Forgetting the leaves are edible — young beetroot leaves are a genuinely excellent salad ingredient"],
        quiz:[{q:"How should you remove beetroot leaves at harvest to prevent colour loss?",opts:["Cut with a sharp knife","Pull with both hands","Twist them off gently","Leave them on the root"],a:2},{q:"What is the bonus crop you get from growing beetroot?",opts:["The roots double in size","The leaves are edible and excellent in salads from day one","Seeds can be eaten raw","The flowers are edible"],a:1},{q:"Why is the beetroot seed unusual compared to most vegetable seeds?",opts:["It needs to be chilled before sowing","Each 'seed' is actually a cluster containing 2–3 seeds","It only germinates in darkness","It takes 6 months to germinate"],a:1},{q:"True or False: Each beetroot seed cluster can produce more than one plant.",opts:["True", "False"],a:0},{q:"True or False: Beetroot leaves cannot be eaten.",opts:["True", "False"],a:1}],
        badge:null,
      },
      {
        id:"l3-onions-garlic", title:"Onions & Garlic", emoji:"🧅", dur:"10 min", vk:"grow-onions-garlic", xp:25,
        glen:"I plant garlic every single October without fail. It goes in after the summer crops come out, it overwinters with no attention, and I harvest it in June. It is the most effort-free crop on my entire allotment. Onion sets in March are just as simple.",
        intro:"Onions and garlic are the backbone of almost every meal — and both are surprisingly easy to grow at home. Plant them at the right time, keep them weed-free, and they'll do most of the work themselves.",
        takes:["Garlic is planted in autumn and harvested in summer — almost zero effort required","Onion sets (small onion bulbs) are far easier than growing from seed","Both need well-drained soil and a sunny spot to perform well","Curing (drying) properly after harvest is the key to making them last for months"],
        steps:[
          {n:1,t:"Plant garlic in October–November",d:"Split a garlic bulb into individual cloves. Plant each clove pointed-end up, 2.5cm deep and 15cm apart in rows 25cm apart. Choose a sunny, well-drained bed."},
          {n:2,t:"Plant onion sets in March–April",d:"Push onion sets (small baby onions) just below the soil surface, 10cm apart in rows 25–30cm apart. Firm the soil around them. Protect from birds with netting — they love to pull sets out."},
          {n:3,t:"Keep weed-free",d:"Both onions and garlic hate competition from weeds. Hoe between rows regularly through spring and early summer. Once the foliage starts to die back in summer, stop hoeing."},
          {n:4,t:"Stop watering when tops fall",d:"When the green foliage flops over naturally (usually June for garlic, July–August for onions) this signals they're ready. Stop watering completely — this helps the skins harden."},
          {n:5,t:"Cure properly before storing",d:"Lift on a dry day and leave in the sun or a warm, airy shed for 2–4 weeks until the outer skins are dry and papery. Properly cured onions and garlic will store for months."},
        ],
        cl:["Order garlic bulbs in September (good varieties sell out early)","Buy onion sets in late February or March","Choose a sunny, well-drained bed for both","Plan curing space — a shed, greenhouse or sunny patio","Label rows so you remember which varieties are where"],
        tip:"Plant garlic on the shortest day (around 21 December) and harvest on the longest day (around 21 June). It's not an exact science but it's a brilliant way to remember the timing!",
        mistakes:["Planting garlic in spring — it needs cold to develop properly. Autumn planting is essential","Using supermarket garlic — it may carry disease. Always buy certified seed garlic","Harvesting before foliage dies back — bulbs won't be fully formed","Skipping the curing stage — uncured onions rot in storage within weeks"],
        quiz:[{q:"When is the best time to plant garlic in the UK?",opts:["February or March","May or June","October or November","Any time of year"],a:2},{q:"Which way up should garlic cloves be planted?",opts:["Flat side up","Pointy end upward","It doesn't matter","Sideways"],a:1},{q:"How do you know when onions are ready to harvest?",opts:["When they reach a specific size","When the foliage flops over naturally and starts to yellow","After exactly 6 months","When they begin to flower"],a:1},{q:"True or False: Garlic is best planted in the UK between October and December.",opts:["True", "False"],a:0},{q:"True or False: Onions are ready when foliage turns green and stands upright.",opts:["True", "False"],a:1}],
        badge:"allium-expert",
      },
    ],
  },
  {
    id:"level-4", level:4, title:"Grow All Year", emoji:"🗓️", color:"#1565C0",
    desc:"Plan across seasons and never have a bare patch again.",
    free: false,
    lessons:[
      {
        id:"l4-seasonal", title:"Seasonal Planning", emoji:"📅", dur:"10 min", vk:"seasonal-planning", xp:25,
        glen:"I keep a growing notebook every single year without fail. Looking back at what I sowed, when I sowed it, and how it performed is genuinely the fastest way to improve as a grower. It takes 5 minutes after each session — just do it.",
        intro:"Most beginner gardeners react to the season as it happens. But understanding the rhythm of the growing year — and planning ahead — transforms you from a reactive grower into a confident, purposeful one.",
        takes:["The growing year has four distinct phases — each with its own jobs","Planning ahead means you never miss a sowing window","A simple notebook or spreadsheet is the most powerful tool you can own as a grower","Succession sowing is the single biggest lesson most growers wish they'd learned earlier"],
        steps:[
          {n:1,t:"Map the four seasons",d:"Spring (March–May): sow and plant. Summer (June–August): water, feed and harvest daily. Autumn (September–October): clear, compost and plant garlic. Winter (November–February): plan, order seeds and prepare beds."},
          {n:2,t:"Work backwards from harvest",d:"Look at the seed packet and find 'days to maturity'. Count back from when you want to harvest to find your sowing date. This one skill transforms your planning completely."},
          {n:3,t:"Build a sowing calendar",d:"Write down every crop you want to grow and its sowing dates on a calendar or in a notebook. Even a basic spreadsheet works brilliantly. Tick things off as you do them."},
          {n:4,t:"Plan for gaps",d:"Walk your garden or allotment in your mind season by season. Where will there be empty space? Fill gaps with fast crops like lettuce, radish or spring onions between slower crops."},
          {n:5,t:"Start your growing journal",d:"After each session, write 5 things: what you did, what you sowed, the date, weather conditions, and one observation. It takes 5 minutes and becomes invaluable by year two."},
        ],
        cl:["Buy a dedicated notebook or start a simple spreadsheet","Write down every crop you plan to grow this year","Mark sowing dates on your calendar right now","Check the Monthly Planner in this app for what to do this month","Commit to writing 5 notes after every gardening session"],
        tip:"Order all your seeds in January. The best varieties — especially heritage tomatoes, unusual squash and heritage beans — sell out completely by March every single year without fail.",
        mistakes:["Treating gardening as purely seasonal — there is always something to do in every month of the year","Not keeping notes — memory is genuinely unreliable and you'll repeat the same mistakes every year","Trying to grow absolutely everything in your very first year — start with 5–6 crops and do them well"],
        quiz:[{q:"When should you order your seeds to guarantee the best variety selection?",opts:["March when things start growing","January — before varieties sell out","May when you need them","Any time — it doesn't matter"],a:1},{q:"Which phase of the year is best for sowing and planting out?",opts:["Summer — June to August","Autumn — September to November","Spring — February to May","Winter — December to January"],a:2},{q:"What is the most important tool Glen recommends for improving year on year?",opts:["A better spade","An expensive pH meter","A growing notebook to record what worked and failed","A polytunnel"],a:2}],
        badge:null,
      },
      {
        id:"l4-winter", title:"Winter Growing", emoji:"❄️", dur:"9 min", vk:"winter-growing", xp:25,
        glen:"The biggest mistake I see on my allotment site is people abandoning their plots completely in October. A bit of planning in August means you can be harvesting kale, leeks, parsnips, sprouts and winter salads all the way through to March. The plot never has to be empty.",
        intro:"Winter growing is where experienced growers separate themselves from beginners. With a little planning and the right crops, you can harvest something from your garden in every single month of the year.",
        takes:["Hardy crops like kale, leeks, parsnips and sprouts can be harvested through frost and snow","Winter salad leaves grow slowly but provide fresh food through the coldest months","The key is sowing at the right time in summer — most winter crops are sown in June–August","Fleece and cloches extend your season at both ends significantly"],
        steps:[
          {n:1,t:"Plan your winter crops in summer",d:"Most winter crops — kale, purple sprouting broccoli, leeks, spring cabbage — need to be sown in June or July. This is the most important lesson: winter growing starts in summer."},
          {n:2,t:"Sow winter salad leaves in August–September",d:"Lamb's lettuce, land cress, winter purslane and hardy spinach all germinate in warmth and then continue growing slowly through winter. Sow in August for harvests from October to March."},
          {n:3,t:"Use cloches and fleece",d:"A simple cloche or double layer of horticultural fleece over salad beds in November can extend your harvest by 6–8 weeks. It's one of the best investments you can make."},
          {n:4,t:"Plant garlic and overwintering onions",d:"October and November are perfect for getting garlic and overwintering onion sets into the ground. They establish roots over winter and romp away in spring."},
          {n:5,t:"Keep beds productive",d:"As you harvest one crop, have the next one ready to go in. Clear spent summer plants completely, add compost, and replant or sow immediately rather than leaving beds empty."},
        ],
        cl:["Plan your winter crops NOW — check what needs sowing this month","Buy fleece or cloches for frost protection","Order garlic for October planting","Identify empty beds that could grow winter salad leaves","Sow at least one hardy winter crop this season"],
        tip:"Kale genuinely tastes better after a hard frost — the cold converts starches in the leaves to sugars, making it sweeter and more tender. Pick outer leaves regularly and plants produce all winter.",
        mistakes:["Sowing winter crops too late — most need 10–12 weeks of growth before winter sets in","Abandoning the plot in October — it leads to weeds, pests and wasted growing time","Not using fleece — a simple covering extends your season enormously for minimal cost","Forgetting that parsnips need frost to taste their best — don't harvest before December"],
        quiz:[{q:"When must most winter crops like kale and leeks be sown?",opts:["October or November","December or January","June or July — in the summer","March or April"],a:2},{q:"Why do parsnips and leeks taste better after a hard frost?",opts:["Frost adds minerals from the air","Cold converts starches to sugars, making them noticeably sweeter","Frost kills off bitter compounds","They don't — frost damages the flavour"],a:1},{q:"What simple protection significantly extends the winter salad season?",opts:["A full polytunnel only","A cloche or sheet of fleece over hardy salad varieties","Grow lights","Central heating in the shed"],a:1}],
        badge:null,
      },
      {
        id:"l4-succession", title:"Successional Sowing", emoji:"🔄", dur:"8 min", vk:"succession-sowing", xp:25,
        glen:"Successional sowing is the single biggest lesson I see beginners missing on my allotment site. They sow everything at once, get an enormous glut they can't use, then nothing for weeks. Sow a little bit every 2–3 weeks instead — it completely transforms your harvests.",
        intro:"Successional sowing is the professional grower's most powerful technique. Instead of sowing a whole packet of lettuce seeds at once and being buried in salad for two weeks, you sow small amounts regularly for a continuous, manageable harvest all season.",
        takes:["Sowing little and often transforms your harvests from feast-or-famine into steady abundance","Most salad crops, radishes, beetroot, beans and spring onions are perfect for succession sowing","Even a 2-week gap between sowings makes a huge difference","The best succession sowings take less than 10 minutes — just a short row or small pot"],
        steps:[
          {n:1,t:"Identify your succession crops",d:"The best crops for succession sowing are: lettuce and salad leaves, radishes, spring onions, beetroot, spinach, French beans, kohlrabi, and peas. These all grow relatively quickly and produce over a short window."},
          {n:2,t:"Set a regular sowing schedule",d:"Every 2–3 weeks, sow a short row or fill a small pot with your chosen succession crop. Mark it in your calendar or notebook. Consistency is everything — even small amounts sown regularly give incredible results."},
          {n:3,t:"Use the space efficiently",d:"When a fast crop like radish comes out, immediately sow or plant the next one in that space. A bed or container should rarely be empty for more than a day or two."},
          {n:4,t:"Stagger different crops too",d:"Don't just succession sow one crop — plan so that different crops are maturing at different times throughout the season. This gives you variety on your plate as well as a continuous harvest."},
          {n:5,t:"Keep a simple record",d:"Note down every sowing date and which variety in your growing journal. After one season you'll have a personal sowing plan perfectly timed to give you exactly what you want, when you want it."},
        ],
        cl:["Choose 3 crops you'll succession sow this season","Mark a sowing date every 2–3 weeks in your calendar","Prepare a dedicated succession sowing area — even a few containers","Set a phone reminder every 2 weeks: 'Time to sow a row!'","Write sowing dates in your growing journal from now on"],
        tip:"Keep opened seed packets in a sealed tin or zip-lock bag in the fridge. Most vegetable seeds stay viable for 2–4 years when stored cool and dry — perfect for succession sowing all season from one packet.",
        mistakes:["Sowing entire packets at once — the classic beginner mistake that leads to gluts and gaps","Waiting until one crop finishes before sowing the next — always have the next crop going","Forgetting to sow — set reminders. Life gets busy and weeks slip by surprisingly fast","Not labelling sowing dates — you need to know when each batch went in to plan harvests"],
        quiz:[{q:"What is the main benefit of successional sowing?",opts:["You use fewer seeds overall","You get a continuous harvest rather than one big glut","Plants grow faster when sown in succession","It reduces the need for watering"],a:1},{q:"What is the best way to actually remember to make the next succession sowing?",opts:["Try to remember mentally","Write the next sowing date in your phone calendar immediately after each sowing","Set a monthly reminder","Wait until you run out of the current harvest"],a:1},{q:"Which crops are most suitable for succession sowing?",opts:["Potatoes and squash","Lettuce, radishes, spring onions, beetroot and spinach","Garlic and onions only","Perennial crops like asparagus"],a:1}],
        badge:null,
      },
      {
        id:"l4-green-manures", title:"Green Manures & Soil Care", emoji:"🌿", dur:"9 min", vk:"green-manures", xp:25,
        glen:"I sow green manures on every empty bed on my allotment from September onwards. It's one of the best things I do for my soil all year. The beds that get a green manure over winter are noticeably better the following spring — the soil structure is improved, the worms are happy and the weeds can't get established.",
        intro:"Green manures are one of the most underused tools in the beginner's toolkit. They're quick-growing plants you sow specifically to improve your soil — not to eat. They protect bare soil over winter, add nutrients, and leave the ground in brilliant condition for the following spring.",
        takes:["Green manures protect bare soil from rain, erosion and weed colonisation","Many green manures fix nitrogen from the air into the soil — a free natural fertiliser","They improve soil structure significantly when dug in or cut and composted","Mustard, phacelia and field beans are the easiest to use for beginners"],
        steps:[
          {n:1,t:"Understand what green manures do",d:"Green manures do three things: they protect bare soil from weeds and erosion; certain types (legumes like field beans and clover) fix atmospheric nitrogen into the soil; and when dug in or composted they add organic matter that feeds soil life and improves structure."},
          {n:2,t:"Choose the right green manure",d:"Mustard is the fastest — ready in 4–6 weeks. Phacelia is brilliant and produces beautiful blue flowers for pollinators. Field beans fix nitrogen and are very hardy. Winter tares overwinter well. Choose based on how long your bed will be empty."},
          {n:3,t:"Sow in late summer or early autumn",d:"The ideal time to sow most green manures is August to October, as summer crops finish. This gives them enough growing time before the worst of winter."},
          {n:4,t:"Cut and compost or dig in",d:"Before the green manure sets seed in spring, cut the tops off and compost them. Leave the roots in the ground — they'll break down and feed the soil life. Or dig the whole plant into the top 15cm of soil 4–6 weeks before you need to plant."},
          {n:5,t:"Maintain year-round soil cover",d:"The golden rule of soil care is to never leave soil bare for long. Bare soil loses nutrients, gets compacted by rain, and is quickly colonised by weeds. Green manures, compost mulches or even cardboard all protect it."},
        ],
        cl:["Identify which beds will be empty this autumn","Buy green manure seed mix from a garden centre or online","Sow as soon as a bed is cleared in late summer or autumn","Plan when you'll cut and compost it in late winter or early spring","Add green manure to your rotation plan going forward"],
        tip:"Phacelia is one of the best green manures for any garden. It's fast-growing, incredibly attractive to pollinators (leave a patch to flower), it's not related to any vegetable so has no disease crossover risk, and it breaks down quickly when cut. A brilliant all-rounder.",
        mistakes:["Letting green manures flower and set seed — some can become weeds if you let this happen","Digging in too close to planting time — allow at least 4 weeks for it to break down first","Thinking only large plots benefit — even container gardeners can mulch with compost over winter","Ignoring soil care entirely — it's the single most impactful thing you can do for long-term productivity"],
        quiz:[{q:"What is the main purpose of sowing a green manure?",opts:["To harvest and eat as a salad crop","To protect and improve the soil while a bed is empty","To attract slugs away from other crops","To test soil pH before planting"],a:1},{q:"When must you cut down or dig in a green manure?",opts:["After it flowers and sets seed","Just before it flowers — or it becomes a weed","In the middle of winter","Whenever convenient"],a:1},{q:"Which green manure fixes nitrogen from the air — making it ideal before hungry crops?",opts:["Mustard","Phacelia","Red clover","Buckwheat"],a:2}],
        badge:"all-seasons",
      },
    ],
  },
  {
    id:"level-5", level:5, title:"Allotment Master", emoji:"🏡", color:"#6A1B9A",
    desc:"Advanced skills to get the very most from your growing space.",
    free: false,
    lessons:[
      {
        id:"l5-plot-planning", title:"Planning Your Plot Layout", emoji:"🗺️", dur:"10 min", vk:"plot-planning", xp:30,
        glen:"I help new plot holders on our 80-plot site plan their allotments every spring. The single most common mistake is putting tall crops in the wrong place and shading everything else. Think about sun direction first, then build everything around that.",
        intro:"A well-planned growing space outperforms a poorly planned one massively — even if both have identical soil and the same crops. A little time spent planning on paper saves hours of frustration later.",
        takes:["Sun direction is the most critical factor in plot planning — get this right first","Tall crops (sweetcorn, beans, brassicas) must go to the north so they don't shade shorter crops","Crop rotation — moving crops around each year — protects against pests and disease buildup","Permanent crops like fruit bushes and asparagus need their own dedicated space from day one"],
        steps:[
          {n:1,t:"Draw your space to scale",d:"Grab squared paper and sketch your growing area to scale. Mark north, note where shade falls from fences, walls and trees at different times of day. This is the most useful 20 minutes you'll spend all year."},
          {n:2,t:"Position tall crops to the north",d:"Sweetcorn, climbing beans, brassicas and Jerusalem artichokes all go on the north side of your plot. This ensures they don't cast shade over shorter crops. In the southern hemisphere this is reversed."},
          {n:3,t:"Group crops by family for rotation",d:"Divide your space into 4 sections and rotate which crop family goes where each year: 1) Brassicas 2) Legumes (peas/beans) 3) Roots 4) Alliums/others. Move each group one section clockwise every year."},
          {n:4,t:"Plan permanent beds carefully",d:"Asparagus, rhubarb, fruit bushes and perennial herbs stay in the same place for years. Give them a dedicated bed from the start — ideally at the edge of your plot where they won't disrupt rotation."},
          {n:5,t:"Leave paths wide enough",d:"A path you can actually walk along comfortably — at least 45cm — saves your back and your plants. Narrow paths lead to damaged plants, compacted beds and frustration. Plan paths first, then beds."},
        ],
        cl:["Draw a rough plan of your growing space on paper","Mark where north is and where shade falls","Identify where your tallest crops will go","Decide on your 4 rotation sections","Mark out any permanent beds for fruit or perennial crops"],
        tip:"Take a photo of your plot plan and keep it on your phone. Refer to it every time you're planning a sowing or wondering where something went last year. It becomes more useful with every season you add to it.",
        mistakes:["Planting tall crops on the south side — they'll shade everything behind them all season","Not leaving rotation space — moving crops each year is essential for long-term soil and plant health","Making paths too narrow — you'll curse yourself when carrying heavy tools","Forgetting permanent crops need their own long-term space from day one"],
        quiz:[{q:"Why should tall crops always be positioned on the north side of your plot?",opts:["They grow better in northern soil","So they don't shade shorter crops to the south","Because north-facing soil is more fertile","It makes them easier to harvest"],a:1},{q:"How wide should paths between beds be?",opts:["10cm is enough","At least 45cm — wide enough to walk comfortably","Paths are unnecessary","As wide as the beds"],a:1},{q:"Why do permanent crops need their own separate bed?",opts:["They look better together","They stay in place for years and would disrupt crop rotation","They are more expensive","They need more water"],a:1}],
        badge:null,
      },
      {
        id:"l5-irrigation", title:"Irrigation & Water Management", emoji:"💧", dur:"9 min", vk:"irrigation", xp:30,
        glen:"Water management is genuinely where most growing successes and failures happen. On my allotment site I see it every dry summer — the plots with good water management thrive, the plots without it struggle badly. A good mulch and a drip system are worth more than almost any other investment you can make.",
        intro:"Water is the single resource that most directly controls your harvest. Too little and plants stress and fail. Too much and roots drown and rot. Mastering water management separates good growers from great ones.",
        takes:["Deep, infrequent watering builds stronger root systems than shallow daily watering","Mulching is the most effective way to dramatically reduce how much watering you need","Morning watering is always better — leaves dry during the day and disease risk drops","Drip irrigation is the most efficient system and saves huge amounts of time in summer"],
        steps:[
          {n:1,t:"Water deeply and less often",d:"Water thoroughly until the soil is moist 15–20cm deep, then let it dry out slightly before watering again. This trains roots to grow deep in search of moisture, making plants much more resilient in dry spells."},
          {n:2,t:"Mulch every bed generously",d:"Apply 5–8cm of compost, bark, straw or well-rotted manure around all plants. Mulch dramatically reduces evaporation, suppresses weeds and improves soil structure all at once. It's the most effective single thing you can do to reduce watering needs."},
          {n:3,t:"Water at the base",d:"Direct water to the soil at the base of plants, not over the foliage. Wet leaves create the warm, humid conditions that fungal diseases — mildew, botrytis, blight — love. Always water at the base."},
          {n:4,t:"Learn critical watering times",d:"Not all growth stages need the same amount of water. Water is most critical at: germination, transplanting, flowering and fruit swelling. At these stages, consistent moisture directly determines yield and quality."},
          {n:5,t:"Consider a simple drip system",d:"A basic drip irrigation system connected to a timer is transformative for busy growers. It delivers water precisely where it's needed, at the right time, while you're at work. The time saving over a whole summer is enormous."},
        ],
        cl:["Buy a roll of mulch (compost, bark or straw) and apply it to all your beds","Water deeply this week and check soil moisture 20cm down with your finger","Set a watering schedule based on weather — not a rigid daily routine","Research simple drip irrigation kits — they're much cheaper than you might think","Install a water butt if you don't have one — free water from rainfall"],
        tip:"A water butt connected to a downpipe is one of the best investments on any allotment or garden. Rainwater is free, it's slightly acidic which many plants prefer, and it's always there when mains pressure is restricted in a drought.",
        mistakes:["Watering a little every day — this keeps roots near the surface and creates drought-sensitive plants","Overhead watering in the evening — wet leaves overnight is a recipe for fungal disease","Watering when it's not needed — always check soil moisture before watering, especially after rainfall","Ignoring mulching — it's the single most effective way to reduce water loss"],
        quiz:[{q:"Why is deep, infrequent watering better than shallow daily watering?",opts:["It uses less water overall","It encourages roots to grow deep, making plants more drought-resilient","It's easier to manage","Deep water has more nutrients"],a:1},{q:"What is the most effective way to reduce how much watering your beds need?",opts:["Water twice a day","Apply a 5–8cm mulch layer around all plants","Install expensive irrigation","Use smaller plants"],a:1},{q:"At what growth stages is consistent water most critical for crops?",opts:["Only at germination","Germination, transplanting, flowering and fruit swelling","Only when fruits are forming","At no particular stage — just water regularly"],a:1}],
        badge:null,
      },
      {
        id:"l5-polytunnel", title:"Polytunnel & Greenhouse Growing", emoji:"🏠", dur:"11 min", vk:"polytunnel", xp:30,
        glen:"My polytunnel completely transformed what I can grow and when I can grow it. I get crops in April that outdoor growers don't see until June. I grow through October when outdoor beds are bare. If you ever get the chance to have even a small greenhouse or polytunnel, take it without hesitation — it changes everything.",
        intro:"A polytunnel or greenhouse doesn't just extend your season — it opens up a completely different world of growing. Crops that struggle in the UK outdoors thrive under cover, and you gain weeks at both ends of the season.",
        takes:["A polytunnel or greenhouse extends your season by 4–6 weeks at each end","Crops that struggle outdoors in the UK — aubergines, peppers, melons — become achievable","Ventilation is the most important management task under cover — heat and humidity without airflow causes disease","Even a small cold frame or row of cloches gives meaningful season extension for very little cost"],
        steps:[
          {n:1,t:"Understand what cover gives you",d:"Protection from frost means earlier planting in spring and later harvests in autumn. Protection from rain reduces fungal disease on susceptible crops. The warmer microclimate allows crops like aubergines, peppers, cucumbers and melons that barely work outdoors in the UK."},
          {n:2,t:"Ventilate every single day",d:"This is the most critical management task under cover and the most commonly neglected. Open vents and doors every morning. Close them before sunset. High temperatures combined with high humidity without airflow is a breeding ground for botrytis, mildew and blight."},
          {n:3,t:"Water more frequently than outdoors",d:"Plants under cover can't rely on rainfall. In summer, polytunnel crops may need watering twice a day. Drip irrigation is ideal for under-cover growing — it delivers water consistently without wetting foliage."},
          {n:4,t:"Maximise your space",d:"Grow vertically wherever possible — cucumbers, tomatoes, climbing beans and melons all go up. Use the floor for lower crops like lettuce, herbs and strawberries. Stack your crops by height."},
          {n:5,t:"Plan a year-round cropping schedule",d:"Winter: salad leaves, spinach, overwintering onions, broad beans. Spring: early tomatoes, cucumbers, peppers started. Summer: tomatoes, cucumbers, aubergines, melons, peppers at full production. Autumn: tomatoes finishing, winter crops establishing."},
        ],
        cl:["If you have a greenhouse or polytunnel — audit how you're currently using all the space","If not — research cold frames and cloches as a cost-effective alternative","Plan a year-round cropping schedule for under cover space","Install or plan ventilation so it's easy to open and close daily","Research drip irrigation for under-cover use"],
        tip:"In a polytunnel or greenhouse, always grow tomatoes in grow bags or containers rather than directly in the soil. The soil under permanent cover builds up diseases and pests over the years. Fresh compost in containers sidesteps this completely.",
        mistakes:["Not ventilating daily — the single most common cause of disease under cover","Overwatering in winter — plants grow slowly and don't need as much water as in summer","Only using cover for summer crops — the real value is spring and autumn extension","Neglecting pest management — red spider mite and whitefly thrive in the warm conditions under cover"],
        quiz:[{q:"What is the most critical daily management task when growing under cover?",opts:["Feeding every plant","Opening vents and doors for ventilation","Checking for caterpillars","Watering the glass"],a:1},{q:"Why should tomatoes in a polytunnel be grown in containers rather than the soil?",opts:["Containers look tidier","Soil builds up diseases over years — fresh compost in containers avoids this","Containers are cheaper","Tomatoes don't grow in soil"],a:1},{q:"Which pest thrives particularly well in the warm conditions under cover?",opts:["Slugs","Red spider mite and whitefly","Carrot fly","Cabbage white butterfly"],a:1}],
        badge:null,
      },
      {
        id:"l5-pests", title:"Pest & Disease Management", emoji:"🐛", dur:"10 min", vk:"pest-management", xp:30,
        glen:"On a site with 80 allotment plots I see every pest and disease problem going. The best growers I know don't panic — they observe, identify, act early and prevent rather than cure. A weekly walk around your plot with your eyes open is worth more than any spray.",
        intro:"Every grower faces pests and diseases. The difference between a grower who loses crops and one who doesn't is usually down to observation, early action and prevention — not expensive sprays or complicated treatments.",
        takes:["Early identification and action is always more effective than waiting","Prevention through good growing practices beats cure almost every time","A weekly walk inspecting plants carefully is the most powerful pest management tool you have","Encouraging beneficial insects — ladybirds, hoverflies, ground beetles — creates natural pest control"],
        steps:[
          {n:1,t:"Walk and inspect every week",d:"The single most effective thing you can do. Spend 15 minutes every week looking carefully at your plants — under leaves, at new growth, at soil level. Catching problems early when they're small is infinitely easier than fighting a major infestation."},
          {n:2,t:"Identify before you act",d:"Don't reach for a spray until you know what you're dealing with. Misidentification leads to wasted money and sometimes makes things worse. Most problems have a simple, specific solution once correctly identified."},
          {n:3,t:"Use physical barriers first",d:"Fine mesh netting keeps carrot fly, cabbage white butterflies and birds off crops. Copper tape deters slugs. Brassica collars stop cabbage root fly. These physical barriers work brilliantly and have no downsides."},
          {n:4,t:"Encourage beneficial insects",d:"Grow companion plants that attract beneficial insects. Marigolds attract hoverflies (whose larvae eat aphids). Phacelia and borage attract pollinators and beneficial predators. A small wildflower patch is worth its weight in gold to any grower."},
          {n:5,t:"Know the organic options",d:"Ferric phosphate slug pellets — safe for wildlife. Insecticidal soap spray for aphids and whitefly. Bacillus thuringiensis (Bt) for caterpillars. Copper-based fungicide for blight. These are the organic grower's toolkit."},
        ],
        cl:["Schedule a weekly 15-minute inspection walk of all your crops","Buy fine mesh netting to protect brassicas and carrots","Sow marigolds and phacelia as companion plants throughout your growing space","Identify the top 3 pest or disease problems on your plot and research specific solutions","Get a good RHS pest and disease handbook — worth every penny"],
        tip:"A torch and a bucket of salty water on a warm, damp evening is still the most effective slug control there is. Go out an hour after dark, pick slugs by hand and drop them in. Unpleasant but extraordinarily effective — and completely free.",
        mistakes:["Spraying before identifying the problem — you may be killing beneficial insects","Waiting too long to act — small problems become large problems quickly if ignored","Ignoring companion planting — it genuinely works and creates a healthier, more balanced plot","Panicking at the first sign of pest damage — a few holes in a leaf rarely threatens a crop"],
        quiz:[{q:"What is the most effective and cost-free pest management tool available to every grower?",opts:["Expensive pesticide sprays","A weekly inspection walk of all your plants","Growing everything under netting","Companion planting alone"],a:1},{q:"What do marigolds do when planted alongside tomatoes?",opts:["They provide shade","They attract hoverflies whose larvae eat aphids","They repel all pests","They add nitrogen to the soil"],a:1},{q:"What should you do before reaching for a spray to treat a pest problem?",opts:["Spray immediately to stop spread","Correctly identify what the problem is first","Remove the whole plant","Water more heavily"],a:1}],
        badge:"problem-solver",
      },
      {
        id:"l5-seed-saving", title:"Seed Saving", emoji:"🌾", dur:"9 min", vk:"seed-saving", xp:30,
        glen:"Seed saving connects you to something really deep in gardening history. I save seeds from my best tomatoes and beans every year. After a few years you have varieties genuinely adapted to your own soil and conditions — and you never need to buy those seeds again. It's incredibly satisfying.",
        intro:"Saving your own seeds is one of the most satisfying things you can do as a grower. It closes the loop completely — from seed to plant to harvest to seed again — and connects you to thousands of years of agricultural tradition.",
        takes:["Open-pollinated and heritage varieties come true from seed — F1 hybrids do not","Always save from your healthiest, most productive plants — never from weak or diseased ones","Dry storage is the absolute key to seed viability — moisture destroys stored seeds","Some crops are much easier to save seed from than others — start with tomatoes, beans and peas"],
        steps:[
          {n:1,t:"Choose the right varieties",d:"Only save seeds from open-pollinated or heritage varieties. F1 hybrid seeds (labelled F1 on the packet) will not produce true plants from saved seed — the offspring revert to parent plants. Look for heritage or heirloom varieties specifically."},
          {n:2,t:"Select your best plants",d:"Save seed from the healthiest, most productive plants with the best flavour and characteristics you want to continue. Never save from sick, weak or bolted plants — you'll breed those characteristics in over time."},
          {n:3,t:"Allow full maturity",d:"Seeds must be fully mature before harvesting. For beans and peas, leave pods on the plant until they're dry and papery. For tomatoes, let the fruit go fully ripe and slightly soft. For lettuce and brassicas, let the seed heads fully dry on the plant."},
          {n:4,t:"Clean and dry thoroughly",d:"Remove seeds from pods or fruit. For tomatoes, ferment the pulp in water for 2–3 days to remove the germination-inhibiting gel coating. Rinse and spread on kitchen paper to dry for 1–2 weeks in a warm, airy place."},
          {n:5,t:"Store properly",d:"Store completely dry seeds in paper envelopes or small glass jars. Label with variety name and date. Keep in a cool, dark, dry place — a tin in a cool cupboard is ideal. Properly stored seeds remain viable for 3–10 years depending on the crop."},
        ],
        cl:["Identify 2–3 open-pollinated crops you currently grow that are worth saving","Select your best plants now and mark them (a piece of coloured wool tied on works well)","Let selected pods, fruits or seed heads reach full maturity before harvesting","Set up a proper seed storage system — paper envelopes in a labelled tin","Look up your local seed swap — it's a brilliant way to get heritage varieties and share your own"],
        tip:"Put a small silica gel sachet (the kind that comes in shoeboxes) in with your stored seeds. It absorbs moisture and dramatically extends seed viability. Save them from new purchases and reuse them indefinitely.",
        mistakes:["Trying to save seed from F1 hybrid varieties — the offspring won't be true to the parent","Saving seed before it's fully mature — immature seeds won't germinate","Storing seeds before they're completely dry — moisture causes mould and destroys viability quickly","Not labelling — you will not remember which variety is which after even one season"],
        quiz:[{q:"Which type of variety can you successfully save seed from?",opts:["F1 hybrid varieties only","Open-pollinated or heritage varieties","Any variety — it doesn't matter","Only supermarket vegetables"],a:1},{q:"How should saved seeds be stored?",opts:["In plastic bags in the fridge","In paper envelopes in a cool, dark, dry place","In water to keep moist","In direct sunlight"],a:1},{q:"Why do you ferment tomato seeds before saving them?",opts:["It improves germination rate","To remove the germination-inhibiting gel coating","To sterilise them","To dry them faster"],a:1}],
        badge:null,
      },
      {
        id:"l5-composting", title:"Composting Masterclass", emoji:"♻️", dur:"10 min", vk:"composting", xp:30,
        glen:"I have three compost bins on my allotment and they are absolutely central to how I grow. Good compost is better than any fertiliser you can buy — and it's completely free. Every scrap of plant material that comes off my plot goes back into the compost. Nothing is wasted.",
        intro:"Making your own compost closes the growing loop completely. Kitchen and garden waste in, rich, dark, living compost out. It's free, it's better than anything you can buy, and it transforms your soil season after season.",
        takes:["Good compost needs the right balance of green (nitrogen-rich) and brown (carbon-rich) materials","Turning your heap speeds decomposition dramatically — heat is the sign it's working","Finished compost is dark, crumbly, earthy-smelling and full of worms","A well-managed heap can produce usable compost in 2–3 months in warm weather"],
        steps:[
          {n:1,t:"Get the green/brown balance right",d:"Greens (nitrogen): fresh grass clippings, kitchen vegetable scraps, fresh plant material, coffee grounds, young weeds. Browns (carbon): cardboard, paper, straw, wood chip, dead leaves, egg boxes. Aim for roughly equal volumes of each — this is the single most important composting principle."},
          {n:2,t:"Build in layers",d:"Alternate layers of greens and browns, roughly 10–15cm deep each. Add a thin layer of soil or finished compost occasionally — it introduces the microorganisms and worms that do the actual decomposing work."},
          {n:3,t:"Keep it moist but not wet",d:"Squeeze a handful — it should feel like a wrung-out sponge. Too dry and decomposition slows to a crawl. Too wet and it turns anaerobic and smells terrible. Add water in dry weather, add more browns if it's too wet."},
          {n:4,t:"Turn regularly for speed",d:"Turning the heap introduces oxygen which dramatically speeds up decomposition. Turn every 2–4 weeks if you want fast compost. Even turning once or twice a season makes a significant difference."},
          {n:5,t:"Recognise finished compost",d:"Finished compost is dark brown, crumbly, has an earthy smell (not rotten), and you can no longer identify the original ingredients. It should be full of worms and other beneficial organisms. Use it immediately or store covered."},
        ],
        cl:["Set up at least one compost bin or bay — two is better for turning","Start collecting brown material — cardboard, paper bags, egg boxes","Establish a kitchen scraps routine — a lidded caddy on the worktop helps enormously","Turn your current heap this week and check its moisture level","Start a separate leaf mould pile from autumn leaves — it makes brilliant mulch"],
        tip:"Crush or shred brown cardboard before adding it to the heap. Large flat pieces create impermeable layers that block airflow and slow everything down. Torn or shredded cardboard decomposes in weeks rather than months.",
        mistakes:["Too many greens and not enough browns — creates a wet, slimy, smelly heap","Never turning the heap — decomposition is slow and uneven without aeration","Adding cooked food, meat or dairy — attracts rats and produces horrible smells","Forgetting to water in dry summer weather — a dry heap barely decomposes at all"],
        quiz:[{q:"What is the most important principle for successful hot composting?",opts:["Adding only grass clippings","A balanced ratio of green (nitrogen-rich) and brown (carbon-rich) materials","Turning it every single day","Keeping it completely dry"],a:1},{q:"What does it mean when your compost heap steams when turned?",opts:["It's gone wrong","It's working — the heat shows active decomposition","It needs more water","It needs more browns"],a:1},{q:"How can you tell when compost is ready to use?",opts:["After exactly 6 months","Dark, crumbly, earthy-smelling — original ingredients unrecognisable","When it stops steaming","After the first winter"],a:1}],
        badge:null,
      },
      {
        id:"l5-crop-rotation", title:"Crop Rotation", emoji:"🔄", dur:"8 min", vk:"crop-rotation", xp:30,
        glen:"Crop rotation is non-negotiable on my allotment. I've seen the consequences when people ignore it — clubroot in brassicas, eelworm in potatoes — and these problems can make a bed unusable for years. Moving crops around costs nothing and prevents problems that are almost impossible to fix once established.",
        intro:"Crop rotation is one of the most powerful tools in the grower's toolkit. By moving crops around your growing space each year, you naturally break pest and disease cycles, prevent nutrient depletion and maintain healthy, productive soil.",
        takes:["Never grow the same crop family in the same spot in consecutive years","A simple 4-year rotation protects against the most serious soil-borne pests and diseases","Some problems like clubroot and potato cyst eelworm can persist in soil for 20+ years without rotation","Rotation also naturally balances soil nutrition — different crops take and give different nutrients"],
        steps:[
          {n:1,t:"Divide your space into 4 sections",d:"Whether you have one raised bed or a full allotment, mentally divide your growing space into four roughly equal sections. These sections rotate through four crop families each year."},
          {n:2,t:"Learn the 4 crop groups",d:"Group 1: Brassicas (cabbage, broccoli, kale, sprouts). Group 2: Legumes (peas, beans) — these fix nitrogen. Group 3: Roots (carrots, parsnips, beetroot, onions). Group 4: Potatoes/tomatoes. Each group moves to the next section each year."},
          {n:3,t:"Rotate in one direction each year",d:"Move each group clockwise (or anticlockwise — just be consistent) one section each year. Brassicas follow where potatoes were (potatoes clean the ground of some brassica problems). Legumes follow brassicas (fix nitrogen for hungry brassicas in following year)."},
          {n:4,t:"Keep records",d:"This only works if you know what was where last year. A simple sketch map each season takes 5 minutes and is absolutely essential. Without records, rotation becomes guesswork."},
          {n:5,t:"Handle permanent crops separately",d:"Asparagus, rhubarb, fruit bushes and perennial herbs stay put. Give them their own permanent bed outside your rotation. Jerusalem artichokes are incredibly vigorous — confine them ruthlessly or they'll take over."},
        ],
        cl:["Draw your 4 rotation sections on your plot plan","Assign each section a crop group for this year","Make a note of what's where before you sow anything","Plan next year's rotation now — it takes 2 minutes if you do it now","Keep brassicas and potatoes at least 3 sections apart in the rotation"],
        tip:"If you only have one raised bed, you can still rotate within it — divide it mentally into quarters and rotate where each crop group goes each year. Even imperfect rotation is dramatically better than none.",
        mistakes:["Growing brassicas in the same place for more than one year — clubroot builds up and can persist for 20 years","Not keeping records — rotation without records is essentially random","Treating potatoes and tomatoes as separate groups — they're in the same family (Solanaceae) and share diseases","Ignoring rotation because it 'seems complicated' — it really is just moving crops one section each year"],
        quiz:[{q:"Why is crop rotation so important for long-term soil and plant health?",opts:["It makes plants grow faster","It breaks pest and disease cycles that build up when the same crops grow in the same place","It adds nutrients to the soil","It makes watering easier"],a:1},{q:"How long can clubroot persist in soil without rotation?",opts:["One season","2–3 years","Up to 20 years","It disappears after winter"],a:2},{q:"Which crop family should follow legumes (peas and beans) in the rotation?",opts:["More legumes","Brassicas — they benefit from the nitrogen legumes fix","Potatoes","Roots"],a:1}],
        badge:null,
      },
      {
        id:"l5-no-dig", title:"No-Dig Growing", emoji:"⛏️", dur:"9 min", vk:"no-dig", xp:30,
        glen:"I converted a section of my allotment to no-dig three years ago and the results have been remarkable. Less work, fewer weeds, better soil structure and genuinely better crops. It goes against everything I was taught as a young grower but the evidence is undeniable. Charles Dowding has done more for UK growing than almost anyone else — look up his work.",
        intro:"No-dig growing turns conventional gardening wisdom on its head. Instead of digging, forking and tilling your soil each year, you simply add compost on top and let the soil life do the work. The results — for soil health, for weed suppression and for crop yields — are genuinely impressive.",
        takes:["No-dig preserves soil structure and the fungal networks that plants depend on","Adding compost on top rather than digging it in feeds the soil from above — exactly as nature does","Weed seeds in the subsoil are never brought to the surface where they germinate","Soil carbon is preserved rather than released — no-dig is better for the environment too"],
        steps:[
          {n:1,t:"Suppress existing weeds",d:"On an existing weedy bed: lay thick cardboard (remove all tape and staples) directly on the soil and weeds. Overlap edges by 20cm. This smothers existing weeds without disturbing the soil underneath or any weed seeds below."},
          {n:2,t:"Add a thick compost layer",d:"Apply 10–15cm of good quality compost directly on top of the cardboard. On an established no-dig bed, add 2–5cm of compost each spring as your annual top-dressing. This is your only soil 'cultivation'."},
          {n:3,t:"Plant directly into the compost",d:"Most crops are transplanted or sown directly into the compost layer. The compost provides nutrients immediately and the cardboard beneath breaks down within a few months, allowing roots to penetrate into the soil below."},
          {n:4,t:"Never compact the surface",d:"Stay off the beds entirely — always work from permanent paths. Compaction is the main enemy of no-dig. Raised beds with permanent paths are ideal for this system."},
          {n:5,t:"Be patient in year one",d:"Year one of no-dig sometimes shows slightly lower yields as the system establishes. Years two and three typically show significantly better results as soil life builds, structure improves and weed pressure drops dramatically."},
        ],
        cl:["Collect cardboard — supermarkets and furniture shops are excellent sources","Order or make enough compost for 10–15cm depth across your beds","Choose one bed to trial no-dig this season — don't convert everything at once","Plan permanent paths so you never need to walk on your growing beds","Look up Charles Dowding's work — his YouTube channel is an excellent free resource"],
        tip:"Use the best compost you can get for your no-dig top dressing. Homemade compost is ideal. Well-rotted horse manure works brilliantly. Cheap multi-purpose compost is fine but premium compost gives noticeably better results in year one.",
        mistakes:["Digging or forking your no-dig beds 'just this once' — it completely undermines the soil structure you're building","Using thin cardboard that breaks down before weeds are suppressed — use thick single-wall or double-wall cardboard","Not adding enough compost — 10–15cm is the minimum for year one conversion","Expecting instant results — no-dig rewards patience and improves noticeably with each passing year"],
        quiz:[{q:"What is the main principle of no-dig growing?",opts:["Never watering your beds","Adding compost on top rather than digging it in, preserving soil structure and life","Growing without any compost at all","Only growing root vegetables"],a:1},{q:"What do you lay on the soil first when setting up a new no-dig bed?",opts:["Grit and sand","Thick cardboard to suppress weeds","Landscape fabric","A layer of gravel"],a:1},{q:"How thick should your compost layer be when converting to no-dig?",opts:["1–2cm","5cm","10–15cm","30cm"],a:2}],
        badge:"allotment-master",
      },
    ],
  },
  {
    id:"level-6", level:6, title:"Glen's Expert Secrets", emoji:"👨‍🌾", color:"#FF8F00",
    desc:"Glen's personal advanced secrets from 20+ years of growing. Premium members only.",
    free: false,
    lessons:[
      {
        id:"l6-advanced-tomatoes", title:"Advanced Tomato Growing", emoji:"🍅", dur:"14 min", vk:"grow-tomatoes", xp:40,
        glen:"Tomatoes are my absolute passion crop. After 20 years of growing them I've learned things that make the difference between a good crop and a jaw-dropping one. Variety selection, feeding timing, pinching technique, blight management — this lesson covers everything I wish I'd known 15 years earlier.",
        intro:"You've grown tomatoes before. Now let's take everything up a level — the variety secrets, the feeding schedules, the techniques for bigger harvests and better flavour that most growers never discover.",
        takes:["Variety selection is the biggest single factor in tomato success after soil preparation","Calcium deficiency causes blossom end rot — it's a watering issue, not a feeding issue","Side shooting technique matters enormously — too early removes energy, too late wastes it","Stopping the plant at the right time maximises the ripening of existing fruits"],
        steps:[
          {n:1,t:"Master variety selection",d:"For flavour: Sungold (orange cherry, incomparable sweetness), Black Krim (dark beefsteak, complex flavour), Tigerella (striped, tangy). For productivity: Gardener's Delight, Sweet Million. For containers: Tumbling Tom, Tumbler. Grow at least two different types every year."},
          {n:2,t:"Perfect your feeding schedule",d:"Weeks 1–4 after planting: balanced feed (equal NPK) to establish. First flower trusses appearing: switch to high-potassium tomato feed. Feed every 5–7 days without exception. Increase frequency in hot weather when plants are drinking heavily. This feeding schedule is what professional growers use."},
          {n:3,t:"Time your side shooting precisely",d:"Pinch sideshoots when they're 2–5cm long — small enough to remove cleanly with your fingers, large enough to find easily. Do it every 4–5 days in peak summer. Leave them longer and you waste plant energy. Remove them when tiny and you miss some."},
          {n:4,t:"Stop the plant in late summer",d:"In early August, pinch out the very top growing tip of cordon plants. This redirects all the plant's remaining energy into ripening existing fruit rather than producing new trusses that won't ripen before the season ends. Leave two leaves above the topmost truss."},
          {n:5,t:"Manage blight proactively",d:"Blight strikes in warm, wet weather (above 10°C with 90%+ humidity for 48 hours — the 'Smith Period'). Remove any lower leaves touching the soil before blight season. Consider a copper fungicide spray as prevention in high-risk weather. Remove and bin affected material immediately — never compost it."},
        ],
        cl:["Order at least one heritage or unusual tomato variety to try alongside your regular ones","Create a written feeding schedule and pin it somewhere visible in your growing space","Set a calendar reminder every 5 days for feeding","Practice identifying sideshoots on your plants — every growing tip in a leaf axil","Plan your stopping date — early August for cordon varieties"],
        tip:"To get the absolute best flavour from any tomato variety, allow the fruits to ripen fully on the plant. A tomato picked fully ripe from a warm plant in late afternoon has incomparably better flavour than one picked early and ripened on a windowsill.",
        mistakes:["Feeding irregularly — tomatoes need consistent nutrition, not occasional large doses","Removing too many leaves — the lower leaves photosynthesize and feed the plant; only remove those showing disease or touching the soil","Not stopping the plant in August — plants keep producing trusses that never ripen and waste precious energy","Composting blighted material — it spreads disease. Always bin it"],
        quiz:[{q:"When is the ideal time to pinch out tomato sideshoots?",opts:["Only when they are very large and obvious","When they are 2–5cm long","Every day regardless of size","Never — sideshoots should be left to grow"],a:1},{q:"When should you stop (pinch out the top of) cordon tomato plants?",opts:["When the first fruit sets","In early August to focus energy on ripening existing fruit","Only when they hit the roof","Never stop them"],a:1},{q:"What variety is known for its exceptional sweet flavour among cherry tomatoes?",opts:["Moneymaker","Alicante","Sungold","Roma"],a:2}],
        badge:null,
      },
      {
        id:"l6-maincrop-potatoes", title:"Maincrop Potato Mastery", emoji:"🥔", dur:"12 min", vk:"grow-potatoes", xp:40,
        glen:"Maincrop potatoes are a completely different challenge to first earlies. They're in the ground for five months, they face blight, and the curing and storage stage is where most people go wrong and lose half their crop. Get it right and you can eat your own potatoes from August right through to the following spring.",
        intro:"Growing maincrop potatoes well — from variety selection through to long-term storage — is one of the most satisfying achievements in growing. Master this and you could supply your household with potatoes for most of the year.",
        takes:["Maincrop varieties stay in the ground until August–September — 5 months from planting","Blight management is the central challenge for maincrop growers","Curing potatoes properly before storage is what separates a 2-month supply from a 6-month supply","Storage conditions — cool, dark, frost-free — are as important as growing conditions"],
        steps:[
          {n:1,t:"Choose blight-resistant varieties",d:"For the best chance against blight: Sarpo Mira and Sarpo Axona have exceptional blight resistance. Cara and Desiree are good all-rounders with moderate resistance. Avoid varieties with poor blight resistance (like King Edward) unless you're prepared to spray or can guarantee dry summers."},
          {n:2,t:"Earth up high and repeatedly",d:"Earth up more aggressively than you would for first earlies. Build the ridges up to 30cm high over 3 earthing-up sessions. More soil coverage means more tubers, better protection from light (greening) and some protection against blight spores washing down to tubers."},
          {n:3,t:"Monitor for blight weekly",d:"From July onwards, inspect foliage every single week. At the first sign of blight — brown patches on leaves with white mould on the underside in humid conditions — cut all the foliage off at ground level immediately. Leave tubers in the ground for 2 more weeks (the skin toughens) then harvest."},
          {n:4,t:"Cure before storing",d:"This is the step most home growers skip — and it's why their potatoes rot in storage. After lifting, spread potatoes in a single layer in a warm (15–18°C), humid, dark place for 10–14 days. The skin toughens and heals any small wounds, massively extending storage life."},
          {n:5,t:"Store in perfect conditions",d:"After curing, move to cool (4–7°C), dark, frost-free, humid conditions — a garage, shed or cellar. Store in hessian or paper sacks, never plastic. Check monthly and remove any that show signs of rot immediately — one rotten potato genuinely does spoil the whole sack."},
        ],
        cl:["Research and order a blight-resistant maincrop variety for next season","Plan a storage space — cool, dark, frost-free with some humidity","Buy hessian sacks or paper bags for storage — never plastic","Set a weekly blight inspection reminder from July onwards","Plan your curing area before harvest so it's ready when you need it"],
        tip:"If blight strikes and you have to cut your haulm (foliage) early, don't panic. Leave the tubers in the ground for exactly 14 days after cutting. The soil acts as insulation and the skin toughens significantly in that fortnight. Then harvest on a dry day.",
        mistakes:["Growing blight-susceptible varieties without a spray programme in a wet year — almost certain to lose the crop","Harvesting immediately after cutting blight-struck haulm — skins are still soft and tubers won't store","Skipping the curing stage — potatoes go soft and rot within weeks rather than months","Storing in plastic bags — condensation causes rot extraordinarily quickly"],
        quiz:[{q:"What does the curing stage do for harvested potatoes?",opts:["Makes them taste sweeter","Toughens the skin and heals wounds, dramatically extending storage life","Removes the starch","Makes them easier to peel"],a:1},{q:"How long after cutting blight-struck haulm should you wait before harvesting?",opts:["Harvest immediately","3 days","14 days — skins toughen in the soil","One month"],a:2},{q:"Which storage material should you NEVER use for potatoes?",opts:["Hessian sacks","Paper bags","Plastic bags — condensation causes rapid rot","Cardboard boxes"],a:2}],
        badge:null,
      },
      {
        id:"l6-chillies-peppers", title:"Chillies & Peppers", emoji:"🌶️", dur:"11 min", vk:null, xp:40,
        glen:"Chillies are my favourite crop to grow under cover. The range of flavours, heat levels and colours is extraordinary — and they produce prolifically all season in a polytunnel. The key things most people don't know: they need more heat than tomatoes to germinate, they need to stay indoors in the UK, and the more you pick, the more they produce.",
        intro:"Growing your own chillies and peppers opens up a completely different flavour world. From sweet bell peppers to fiercely hot habaneros, the variety available to the home grower is vastly greater than anything you'll find in a supermarket.",
        takes:["Chillies and peppers need more warmth than almost any other crop — 25°C+ to germinate well","They must be grown under cover in the UK — they cannot tolerate cold outdoor temperatures","Sweet peppers need more water and feed; chillies tolerate drier conditions once established","The more you pick, the more the plant produces — harvest regularly to maximise yield"],
        steps:[
          {n:1,t:"Sow early with real heat",d:"Sow chillies and peppers in January or February — earlier than any other crop. They need a propagator or heated mat at 25–28°C to germinate well. Without bottom heat, germination is slow, erratic and often fails entirely."},
          {n:2,t:"Pot on regularly",d:"Chillies and peppers resent being pot-bound. Start in 7cm pots, move to 12cm when roots show at the base, then to final 20–25cm pots or grow bags. Each pot-on triggers a growth spurt. Final containers should be at least 20L for sweet peppers."},
          {n:3,t:"Pinch out the growing tip early",d:"When the plant is 20–25cm tall with 4–5 pairs of leaves, pinch out the central growing tip. This causes the plant to branch out and produce many more fruiting stems rather than one tall, unproductive central stem."},
          {n:4,t:"Feed and water differently by type",d:"Sweet bell peppers: water generously and feed every week with high-potassium feed once flowering. Chillies: slightly drier conditions improve heat levels and concentrate flavour — stress the plant a little once it's fruiting well. Both need consistent calcium to prevent blossom end rot."},
          {n:5,t:"Harvest to maximise production",d:"Green chillies are unripe. Red, yellow or orange are ripe. Both are usable but ripe fruits have more complex flavour. Crucially — pick regularly even if you're leaving some to ripen fully. Every fruit picked stimulates more to develop."},
        ],
        cl:["Order chilli or pepper seeds in December or January — sow by early February","Get a propagator or heated mat — essential for reliable germination","Plan under-cover growing space — a greenhouse or polytunnel windowsill","Set a potting-on schedule — every 4–6 weeks until final container","Try at least one sweet pepper AND one chilli variety side by side this season"],
        tip:"At the end of the season, don't compost your chilli plants. Cut them back by two thirds, bring them inside to a frost-free, light windowsill, barely water them through winter, and bring them back into growth in February. Second-year chilli plants are vastly more productive than first-year ones.",
        mistakes:["Trying to germinate without sufficient heat — you'll wait weeks for nothing","Growing sweet peppers and chillies the same way — they need slightly different water regimes","Not pinching out early — plants become tall and unproductive without early structure","Letting the plant get pot-bound — it dramatically limits productivity"],
        quiz:[{q:"What temperature do chillies and peppers need to germinate reliably?",opts:["15–18°C — the same as most seeds","25–28°C — they need real heat from a propagator","Any temperature above 10°C","They prefer cold temperatures"],a:1},{q:"What happens to chilli heat levels if you stress the plant slightly by keeping it drier?",opts:["Heat levels decrease","Heat levels increase and flavour concentrates","The plant dies","No effect on heat levels"],a:1},{q:"What is the advantage of overwintering a chilli plant?",opts:["It produces different coloured fruit","Second-year plants are vastly more productive than first-year","It becomes pest resistant","It needs less watering"],a:1}],
        badge:null,
      },
      {
        id:"l6-soft-fruit", title:"Soft Fruit: Strawberries & Raspberries", emoji:"🍓", dur:"12 min", vk:null, xp:40,
        glen:"Soft fruit is one of the best investments you can make on an allotment or in a garden. Plant it once, maintain it properly, and you'll have crops for 10–20 years. I have a 6-metre raspberry row and a 20-plant strawberry bed that between them produce more fruit than my family can eat every summer. The setup effort is genuinely worth it.",
        intro:"Homegrown strawberries and raspberries taste completely different from anything you can buy. They're also permanent plants — invest once in setting them up correctly and they reward you for years and years.",
        takes:["Strawberries peak in years 2–3 and should be replaced every 3–4 years","Raspberries are caned plants — summer and autumn varieties are managed differently","Net both crops before fruit colours — birds are extraordinarily quick","Proper pruning is essential for continued productivity in both crops"],
        steps:[
          {n:1,t:"Choose the right strawberry varieties",d:"Cambridge Favourite: reliable, heavy cropper, good flavour. Elsanta: supermarket quality, excellent for preserving. Mara des Bois: extraordinary flavour, repeat-flowering all summer. Florence: late season, extends the picking period. Plant 2–3 varieties to spread your harvest window."},
          {n:2,t:"Plant strawberries correctly",d:"Plant in August or September for fruit the following June. Set crowns exactly at soil level — too deep rots them, too shallow dries them out. Space 45cm apart. Mulch with straw under the developing fruits to keep them off the soil and reduce botrytis."},
          {n:3,t:"Manage summer-fruiting raspberries",d:"Summer raspberries fruit on last year's canes. After fruiting (July), cut all the canes that fruited right down to the ground. New green canes that grew this summer will fruit next year. Tie these new canes to wires 8–10cm apart. Feed with a balanced fertiliser in early spring."},
          {n:4,t:"Manage autumn-fruiting raspberries",d:"Autumn raspberries fruit on current year's growth. In February, cut all canes right to the ground — every single one. New canes grow and fruit from August to October. Much simpler management than summer varieties. Joan J and Autumn Bliss are excellent varieties."},
          {n:5,t:"Net before colour shows",d:"The moment fruits start to colour — even slightly — net the entire crop. Birds can strip a strawberry bed in 20 minutes flat. A fruit cage or temporary netting tunnel is not optional if you want to actually eat your fruit."},
        ],
        cl:["Order strawberry plants in summer for autumn planting (best timing for crop the following year)","Decide on summer or autumn raspberries — or both — and order canes","Prepare a permanent bed with plenty of compost before planting","Plan your netting solution before the fruit colours","Set a reminder to replace strawberry plants every 3–4 years"],
        tip:"Propagate your best strawberry plants for free. After fruiting, the plant sends out runners (long horizontal stems with baby plants at the end). Pin the strongest baby plant into a small pot of compost, let it root (3–4 weeks), then cut the runner. You have a free plant true to the parent.",
        mistakes:["Planting strawberry crowns too deep — the most common cause of failure","Not netting in time — one morning's inattention can cost you the entire crop","Leaving summer raspberry canes in place after fruiting — they don't fruit again and crowd out new growth","Keeping strawberry plants beyond year 4 — productivity falls dramatically and disease risk rises"],
        quiz:[{q:"When is the best time to plant strawberries for maximum fruit the following year?",opts:["Spring, just before fruiting season","August or September — the previous autumn","January under glass","Any time — it doesn't matter"],a:1},{q:"How do you propagate new strawberry plants for free?",opts:["Take cuttings from leaves","Pin runners into small pots of compost, let them root, then cut the runner","Divide the crown","Grow from seed every year"],a:1},{q:"How do you manage autumn-fruiting raspberries?",opts:["Cut out only canes that fruited","Leave all canes in place","Cut all canes to the ground in February — new canes fruit the same year","Prune in summer after fruiting"],a:2}],
        badge:null,
      },
      {
        id:"l6-full-year", title:"Growing a Full Year's Worth of Food", emoji:"🌍", dur:"13 min", vk:null, xp:40,
        glen:"Growing a meaningful proportion of your own food requires planning that most growing guides don't cover. You need to think about storage, preservation, variety selection for keeping quality, and seasonal balance. I've been working towards year-round self-sufficiency for years and this lesson contains everything I've learned about what actually works.",
        intro:"Growing enough food to meaningfully supplement — or even replace — a large part of what you buy requires a completely different level of planning. This lesson covers the strategies, crops and techniques that make genuine self-sufficiency possible.",
        takes:["Storage crops are as important as eating-fresh crops for year-round growing","Preservation — freezing, fermenting, drying, storing in oil — dramatically extends your growing season","The gap months (November to March) are the challenge — plan specifically for them","Calorie crops (potatoes, squash, beans) give the best return on space for genuine self-sufficiency"],
        steps:[
          {n:1,t:"Identify your gap months",d:"Map out when you currently have nothing to harvest — for most UK growers this is November through to March or April. These gap months are your planning challenge. Everything else in this lesson is about solving this problem."},
          {n:2,t:"Focus on storage crops",d:"Onions (6+ months in storage), garlic (6–9 months), maincrop potatoes (4–6 months), winter squash (4–6 months), dried beans (years), carrots in sand (3–4 months), beetroot in sand (3 months). These crops bridge your hungry gap."},
          {n:3,t:"Learn preservation techniques",d:"Freezing: blanch and freeze beans, peas, spinach, kale. Fermentation: sauerkraut, kimchi, fermented hot sauce — these keep for months without refrigeration. Drying: chillies, herbs, sliced tomatoes in a dehydrator. Storing in oil: roasted garlic, chillies, sundried tomatoes."},
          {n:4,t:"Grow winter salad under cover",d:"A cold frame or cloche over winter salad varieties (lamb's lettuce, land cress, mizuna, winter purslane, hardy claytonia) gives fresh salad leaves right through winter. These crops need almost zero care once established."},
          {n:5,t:"Calculate quantities",d:"Work out how much of each crop your household actually eats per week, then multiply by the weeks you want to cover. Most people dramatically underestimate how much they need to grow. For potatoes: a family of four eats roughly 250kg per year. That's a significant growing commitment."},
        ],
        cl:["Map your current harvest gap months honestly","Identify your top 3 storage crops to grow more of","Learn one preservation technique this season — start with freezing beans or making fermented kraut","Plant at least one winter salad under cover this autumn","Calculate how many potatoes your household needs for a year — the number may surprise you"],
        tip:"Winter squash is pound-for-pound the best storage crop for most UK growers. Crown Prince, Uchiki Kuri and Butternut all store beautifully for 4–6 months in a cool, frost-free room. One vigorous plant in good soil can produce 4–6 large squash — enough for a family for months.",
        mistakes:["Growing only summer crops — the storage and winter growing side is where real self-sufficiency is built","Underestimating quantities needed — a few plants of each thing is a hobby, not a food supply","Not learning any preservation — without it, you get overwhelmed in summer and starve in winter","Growing what's interesting rather than what's calorie-dense — if you want self-sufficiency, potatoes, squash and beans must dominate"],
        quiz:[{q:"Which crop group gives the best calorie return per square metre for genuine food self-sufficiency?",opts:["Salad leaves and herbs","Potatoes, squash and beans — the calorie crops","Cherry tomatoes","Exotic crops like aubergines"],a:1},{q:"Which winter squash variety is known for exceptional long-term storage?",opts:["Butternut only","Crown Prince, Uchiki Kuri and Butternut — all store 4–6 months","Pumpkin only","Acorn squash"],a:1},{q:"What is the gap months problem for UK growers?",opts:["Too much to harvest in summer","November to March when most outdoor crops aren't growing","April is always cold","August heat causes problems"],a:1}],
        badge:null,
      },
      {
        id:"l6-glens-plan", title:"Glen's Full Allotment Plan", emoji:"📋", dur:"15 min", vk:"seasonal-planning", xp:40,
        glen:"This is my actual allotment plan — the real one I use on my own plot. Exactly what I grow, where I grow it, when I sow and plant each crop, how I manage the rotation, and how I plan for harvests from February right through to December. Everything I've learned over 20+ years of allotment growing condensed into one practical, usable plan.",
        intro:"Stop guessing and see exactly how an experienced allotment holder plans, manages and gets the most from a full-sized plot. This is Glen's real system — adapted from years of trial, error and refinement.",
        takes:["A full allotment benefits from a written master plan reviewed each January","Crop rotation across 4 sections is the structural foundation everything else builds on","Timing is everything — the same variety sown 2 weeks too early or too late gives dramatically different results","Record-keeping is what separates a plan from a wish — write everything down"],
        steps:[
          {n:1,t:"Glen's 4-section rotation",d:"Section A (Brassicas): kale, purple sprouting broccoli, cabbages, sprouts. Section B (Legumes + salad): peas, beans, lettuce, spinach, beetroot. Section C (Roots + alliums): carrots, parsnips, onions, garlic, leeks. Section D (Solanums + squash): tomatoes (polytunnel), potatoes, courgettes, squash, cucumbers. Rotate clockwise each year."},
          {n:2,t:"Glen's sowing calendar",d:"January: chillies, peppers (heated). February: tomatoes, aubergines (heated). March: onions, leeks, early brassicas. April: courgettes, cucumbers, beans, beetroot, carrots. May: squash, sweetcorn, more beans. June: kale, purple sprouting broccoli (for winter). July: winter salads, spring onions. August: winter brassicas, garlic planting preparation. September/October: garlic in, spring onions, overwintering broad beans."},
          {n:3,t:"Glen's priority crops",d:"Non-negotiables every year: tomatoes (polytunnel), potatoes (maincrop), garlic, kale, leeks, squash, courgettes, climbing beans, salads. These form the backbone. Everything else is added around them based on space and interest that year."},
          {n:4,t:"Glen's maintenance routine",d:"Monday: water polytunnel, check for pests. Wednesday: hoe between rows, feed tomatoes and cucumbers. Friday: harvest anything ready, succession sow if needed, general tidy. Weekend: bigger jobs — earthing up, planting out, building and mending. This routine takes 3–4 hours per week in peak season."},
          {n:5,t:"Glen's yearly review",d:"Every January Glen sits down with his growing notebook and reviews: what gave the best yields, what failed, what he'd do differently, which varieties were worth growing again. Then he orders seeds. This review is the single most important session of the growing year."},
        ],
        cl:["Write out your own 4-section rotation plan based on Glen's model","Create your sowing calendar for the next 12 months","Identify your 8–10 non-negotiable crops for this season","Set up a simple weekly maintenance routine that fits your life","Block out a January review session in your calendar — do it every year without fail"],
        tip:"Glen's single most important piece of advice after 20 years: grow what you actually eat. Not what looks impressive, not what wins prizes at the local show, not what you think you should grow. Grow the things your household genuinely cooks and eats — those crops will get the attention they need and won't go to waste.",
        mistakes:["Planning a plot that needs more time than you actually have — be honest about your available hours","Growing the same crops in the same places year after year — rotation exists for very good reasons","Over-complicating the plan — simple, well-executed beats complex and chaotic every time","Not reviewing what worked — without reflection, you make the same mistakes every year"],
        quiz:[{q:"According to Glen, what is the most important question to ask when planning what to grow?",opts:["What's most impressive to other growers?","What's easiest to grow?","What does your household actually eat and cook?","What gives the highest yield per square metre?"],a:2},{q:"What does Glen do every January without fail?",opts:["Plants his first seeds","Reviews the previous season and orders seeds","Digs over all beds","Takes a gardening holiday"],a:1},{q:"How many sections does Glen divide his allotment into for rotation?",opts:["Two","Three","Four","Six"],a:2}],
        badge:"glens-graduate",
      },
      {
        id:"l6-saving-money", title:"Saving Money Growing Your Own", emoji:"💰", dur:"10 min", vk:null, xp:40,
        glen:"People often ask me if growing your own actually saves money. The answer is: it absolutely can — but only if you're strategic about it. Grow high-value crops, save your own seeds, make your own compost, and focus on what your household actually uses. Done right, a well-managed plot can save hundreds of pounds a year.",
        intro:"Growing your own food should save you money — but only if you approach it smartly. The wrong crops, bought as expensive plants, in expensive compost, in expensive containers, can actually cost more than buying the food. Here's how to make sure you're firmly in profit.",
        takes:["Focus on high-value crops — what costs the most per kg in the shops","Saving seeds, making compost and growing from seed (not plants) are the three biggest cost savers","A full allotment or large garden growing the right crops can genuinely save £500–£1000+ per year","Track your costs and harvests — knowing your actual savings is motivating and reveals where to improve"],
        steps:[
          {n:1,t:"Focus on high-value crops",d:"The crops that save the most money are those that are expensive in the shops: herbs (a £1.50 packet of supermarket basil replaced by a £0.99 seed packet yielding 20+ plants), salad leaves (£3 a bag vs almost free from a container), tomatoes (cherry tomatoes especially), chillies, courgettes and beans. These give dramatically better returns than potatoes or carrots which are very cheap to buy."},
          {n:2,t:"Grow from seed not plants",d:"A tomato plant from a garden centre costs £3–£4. A whole packet of tomato seeds costs £2.50 and contains 20+ seeds. The saving is enormous at scale. Learn to propagate from seed for every crop you grow regularly — it's the single biggest cost reduction available to home growers."},
          {n:3,t:"Make your own compost",d:"A 50L bag of decent compost costs £8–£12. Three compost bins producing year-round can supply most of the compost a full allotment needs — for free. Every bag you don't buy is pure saving. Compost making is the most financially impactful thing you can do after choosing the right crops."},
          {n:4,t:"Save your own seeds",d:"Once you're growing open-pollinated varieties, you can save seeds from your best plants for free. Tomatoes, beans, peas, lettuce and squash are the easiest to save. After 2–3 years, your seed costs drop dramatically and you have varieties specifically selected for your conditions."},
          {n:5,t:"Track your savings",d:"Weigh every harvest and record the shop price of an equivalent amount. This takes 2 minutes per harvest and builds a genuinely motivating picture of your savings. Most serious growers who track properly are surprised by how quickly the numbers add up over a full season."},
        ],
        cl:["List the top 5 crops your household spends the most money on — those should be your priority grows","Calculate the cost of starting your crops from seed vs buying plants — the difference will motivate you","Start a compost system if you haven't already — it's the most financially impactful change you can make","Order a kitchen scale and a notebook to track harvest weights and equivalent shop values","Research one heritage variety to save seed from this season"],
        tip:"Fresh herbs are pound-for-pound the most financially valuable thing most people can grow. A pot of supermarket basil costs £1.50 and dies within a week. A packet of basil seeds costs £1.50 and produces 20+ plants that yield fresh leaves for months. Herbs alone can save a household £200+ a year if you cook regularly.",
        mistakes:["Growing cheap crops when space is limited — potatoes save pennies; cherry tomatoes and herbs save pounds","Buying expensive plants when seeds are a fraction of the cost","Not making your own compost — it's free and the savings compound every season","Not tracking harvests — without data you're guessing at your savings and missing the motivation that real numbers provide"],
        quiz:[{q:"Which type of crop generally gives the best financial return for a home grower?",opts:["Cheap staples like potatoes and carrots","High-value crops like herbs, salad leaves and cherry tomatoes that are expensive in shops","Unusual exotic crops","Whatever is cheapest to grow"],a:1},{q:"What is the single biggest cost-saving change a home grower can make?",opts:["Buying cheaper tools","Growing from seed instead of buying plants","Only growing easy crops","Stopping buying organic produce"],a:1},{q:"Approximately how much can a family of four spend on potatoes per year?",opts:["£20–30","£50–80","Around £250kg worth","Potatoes are free to grow — no comparison"],a:2}],
        badge:"full-academy",
      },
    ],
  },
];

// ─── MONTHLY PLANNER DATA ─────────────────────────────────────────────────────
const MONTHLY = {
  1:{s:["Onion seeds (indoors)","Broad beans (indoors)","Chillies (heated propagator)"],po:[],h:["Winter salad leaves","Kale","Leeks"],j:["Order seeds from catalogues","Plan your growing space","Clean and sharpen tools","Start chitting seed potatoes"],tip:"🌨️ January is perfect for planning. Best varieties sell out quickly — order seeds now!"},
  2:{s:["Broad beans","Onions","Aubergines (heated)","Chillies"],po:[],h:["Purple sprouting broccoli","Winter salads","Kale"],j:["Continue chitting potatoes","Prepare beds with compost","Sow indoors with heat","Check for early slugs"],tip:"❄️ Still cold but indoors we can get started! Windowsills and heat mats are your friends."},
  3:{s:["Tomatoes (indoors)","Peppers","Lettuce","Peas","Spinach","Spring onions"],po:["Onion sets","Garlic","First early potatoes"],h:["Winter salads","Purple sprouting broccoli"],j:["Plant first early potatoes","Sow tomatoes indoors","Harden off indoor seedlings","Put up slug barriers"],tip:"🌷 March is exciting — the growing season begins! Frost is still possible so protect young plants."},
  4:{s:["Cucumbers (indoors)","Courgettes","Beans","Beetroot","Carrots","Radishes"],po:["Onion sets","Lettuce (hardened off)","Second early potatoes"],h:["Spring onions","Radishes","Asparagus"],j:["Pot on tomato seedlings","Harden off seedlings","Protect against late frosts","Install climbing supports"],tip:"🌱 April is one of the busiest months. Little and often with sowing gives harvests all summer."},
  5:{s:["Sweetcorn","Squash","Beans","Courgettes","Salads for succession"],po:["Tomatoes (after last frost)","Courgettes","Cucumbers","Beans"],h:["Asparagus","Salad leaves","Spring onions","Radishes"],j:["Plant out tender crops after 15th May","Erect canes and nets","Pinch out tomato sideshoots","Watch for aphids"],tip:"🌞 Last frosts usually over by mid-May. Wait before planting tender crops outdoors."},
  6:{s:["French beans (succession)","Salads","Kale for autumn"],po:["Leeks","Squash"],h:["First early potatoes","Strawberries","Lettuce","Broad beans"],j:["Water daily in dry spells","Feed tomatoes weekly","Check for blight","Harvest regularly to keep plants producing"],tip:"🍓 June brings the first real harvests. Stay on top of watering — pots dry out incredibly fast!"},
  7:{s:["Spring onions","Salads for autumn"],po:[],h:["Tomatoes","Cucumbers","Courgettes","Potatoes","Beans","Peas","Beetroot"],j:["Water and feed consistently","Harvest every 2–3 days","Look for pests","Support heavy fruit trusses"],tip:"🥒 Peak season! Harvest every 2–3 days or crops stop producing. Courgettes become marrows overnight!"},
  8:{s:["Spring onions","Spinach","Land cress","Salad leaves for autumn"],po:["Kale for winter","Purple sprouting broccoli"],h:["Tomatoes","Cucumbers","Courgettes","Sweetcorn","Beans"],j:["Keep feeding and watering","Remove spent plants","Save seeds from your best plants","Order garlic for autumn planting"],tip:"🌽 Sweetcorn is ready when the silks go dark. Press a kernel — milky juice means it's perfect!"},
  9:{s:["Winter salad leaves","Lamb's lettuce","Garlic (from mid-Sept)"],po:["Spring cabbages","Garlic"],h:["Squash and pumpkins","Maincrop potatoes","Tomatoes"],j:["Plant garlic cloves","Clear spent beds","Add compost to empty beds","Lift maincrop potatoes"],tip:"🍂 September marks the big seasonal shift. Clear, compost and plant garlic for next year."},
  10:{s:["Broad beans (overwintering)","Green manures"],po:["Garlic","Overwintering onion sets"],h:["Squash","Kale","Leeks","Parsnips"],j:["Harvest and store squash","Plant overwintering broad beans","Mulch empty beds","Tidy and compost"],tip:"🎃 Squash must be harvested before hard frost. Ripe squash sounds hollow when tapped!"},
  11:{s:["Broad beans","Garlic (last chance)"],po:["Garlic"],h:["Kale","Leeks","Brussels sprouts","Parsnips"],j:["Protect tender plants with fleece","Lag outdoor taps","Clear leaves from beds","Sharpen and oil tools for winter"],tip:"🍃 Kale tastes better after frost — the cold converts starch to sugar. Pick outer leaves regularly."},
  12:{s:[],po:[],h:["Brussels sprouts","Kale","Parsnips","Leeks","Winter salads"],j:["Order seed catalogues","Review your growing notes","Plan next year's layout","Service tools","Enjoy your homegrown produce!"],tip:"🎄 December is for planning and dreaming. Browse seed catalogues with a cuppa — get excited!"},
};

const PROBLEMS = [
  {id:"slugs",title:"Slug Damage",emoji:"🐌",sev:"medium",vk:"fix-slugs",looks:"Irregular holes in leaves with slime trails. Worst overnight and after rain.",causes:["Slugs and snails feeding at night","Particularly bad in wet weather","Worse in beds with lots of mulch to hide in"],fix:"Go out at night with a torch and remove slugs by hand. Set beer traps. Apply organic ferric phosphate pellets. Use copper tape around containers. Encourage hedgehogs and frogs into your garden!",prev:"Raise seedlings to a good size before planting out. Clear debris from around beds. Let the soil surface dry between waterings."},
  {id:"yellow-leaves",title:"Yellow Leaves",emoji:"🟡",sev:"medium",vk:null,looks:"Leaves turning yellow — sometimes from the bottom up, sometimes patchy across the plant.",causes:["Overwatering / waterlogged roots","Nitrogen deficiency","Natural ageing of lower leaves","Root damage from pests"],fix:"Check soil moisture first. If soggy, improve drainage and hold off watering. If dry and pale, apply a liquid nitrogen feed. Lower leaves yellowing naturally? Simply remove them.",prev:"Ensure good drainage. Feed every 2 weeks during growing season. Always check soil before watering."},
  {id:"wilting",title:"Wilting Plants",emoji:"😮",sev:"high",vk:null,looks:"Plants look sad and droopy, especially in the afternoon heat.",causes:["Underwatering (most common cause)","Overwatering — roots can't breathe","Root rot from waterlogged soil","Extreme heat stress"],fix:"Check soil immediately. Bone dry? Water deeply at the base. Soggy? Let roots air dry slightly. If wilting on hot afternoons but recovering by evening — this is normal heat stress, not a problem.",prev:"Water consistently and deeply. Mulch around plants to retain moisture. Water in the morning before heat builds."},
  {id:"aphids",title:"Aphids",emoji:"🐛",sev:"low",vk:"fix-aphids",looks:"Tiny green, black or white insects on new growth. Sticky residue on leaves and distorted young shoots.",causes:["Reproduce extremely fast in warm weather","More common when plants are stressed","Ants farming aphids and protecting them from predators"],fix:"Blast off with a strong jet of water. Squish by hand — it's satisfying! Apply insecticidal soap spray. Encourage ladybirds — they're voracious aphid predators.",prev:"Grow nasturtiums and marigolds as companion plants. Keep your plants healthy and unstressed. Check under leaves weekly throughout summer."},
  {id:"leggy",title:"Leggy Seedlings",emoji:"📏",sev:"medium",vk:null,looks:"Seedlings that are tall, thin and floppy — often leaning desperately toward the light.",causes:["Insufficient light — most common cause","Too much warmth without enough light","Sown too early before light levels are adequate"],fix:"Move to a much brighter spot immediately. Rotate trays daily so all sides get equal light. If very leggy, pot up deeper — tomato stems will actually root along their length!",prev:"Sow from March onwards when light levels are sufficient. Use a south-facing windowsill. Don't rush the season."},
  {id:"no-fruit",title:"Plants Not Fruiting",emoji:"🍃",sev:"medium",vk:null,looks:"Healthy leaves and plenty of flowers but no fruit actually setting on tomatoes, cucumbers or beans.",causes:["Poor pollination — especially under cover","Too much nitrogen fertiliser","Inconsistent watering","Cool temperatures preventing fruit set"],fix:"For tomatoes: tap flower clusters daily to release pollen. Switch from general feed to high-potassium tomato food. Ensure consistent watering — feast-or-famine causes problems.",prev:"Grow pollinator-friendly flowers nearby (marigolds, borage). Feed with tomato food once flowers appear. Water consistently every day in summer."},
];

const MN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── VPI LOGO ─────────────────────────────────────────────────────────────────
function VPILogo({ size = 36 }) {
  return (
    <img
      src="https://veggiepatchideas.co.uk/wp-content/uploads/2026/04/logo-500x500pxl.png"
      alt="Veggie Patch Ideas"
      width={size}
      height={size}
      style={{ borderRadius:"50%", display:"block", flexShrink:0 }}
    />
  );
}

function YTIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2s-.2-1.7-1-2.4c-.9-1-1.9-1-2.4-1.1C17.2 2.5 12 2.5 12 2.5s-5.2 0-8.1.2c-.5.1-1.5.1-2.4 1.1C.7 4.5.5 6.2.5 6.2S.3 8.1.3 10v1.8c0 1.9.2 3.8.2 3.8s.2 1.7 1 2.4c.9 1 2.1.9 2.6 1C5.8 19.2 12 19.2 12 19.2s5.2 0 8.1-.2c.5-.1 1.5-.1 2.4-1.1.8-.7 1-2.4 1-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 13.5V7.9l6.5 2.8-6.5 2.8z"/></svg>;
}

// ─── ILLUSTRATED ICON SYSTEM ──────────────────────────────────────────────────
function Chip({ size, bg, radius = null, children }: { size: any, bg: any, radius?: any, children: any }) {
  const r = radius ?? size * 0.26;
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:bg, flexShrink:0,
      position:"relative", overflow:"hidden",
      boxShadow:`0 4px 14px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.25)` }}>
      <div style={{ position:"absolute", top:0, left:"8%", right:"8%", height:"40%",
        background:"rgba(255,255,255,.18)", borderRadius:"0 0 50% 50%", pointerEvents:"none" }}/>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position:"absolute", inset:0 }}>
        {children}
      </svg>
    </div>
  );
}

// Nav icons
function INavHome({ size=48 }) { return <Chip size={size} bg="linear-gradient(160deg,#6abf35,#3d6b1e)"><polygon points="50,18 78,40 78,80 22,80 22,40" fill="rgba(255,255,255,.22)" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/><polygon points="50,12 84,42 16,42" fill="rgba(255,255,255,.4)" stroke="white" strokeWidth="2" strokeLinejoin="round"/><rect x="41" y="57" width="18" height="23" rx="9" fill="rgba(255,255,255,.5)" stroke="white" strokeWidth="1.5"/><rect x="26" y="50" width="14" height="12" rx="3" fill="rgba(255,255,255,.45)" stroke="white" strokeWidth="1.5"/><rect x="60" y="50" width="14" height="12" rx="3" fill="rgba(255,255,255,.45)" stroke="white" strokeWidth="1.5"/><rect x="60" y="18" width="8" height="18" rx="2" fill="rgba(255,255,255,.4)"/><circle cx="64" cy="13" r="4" fill="rgba(255,255,255,.35)"/><circle cx="68" cy="9" r="3" fill="rgba(255,255,255,.25)"/></Chip>; }

function INavLearn({ size=48 }) { return <Chip size={size} bg="linear-gradient(160deg,#FFB300,#E65100)"><path d="M50 25 Q30 22 18 28 L18 75 Q30 70 50 73 Q70 70 82 75 L82 28 Q70 22 50 25z" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="2"/><line x1="50" y1="25" x2="50" y2="73" stroke="white" strokeWidth="2.5"/><line x1="25" y1="38" x2="46" y2="37" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="25" y1="46" x2="46" y2="45" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="25" y1="54" x2="46" y2="53" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="25" y1="62" x2="46" y2="61" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="54" y1="37" x2="75" y2="38" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="54" y1="45" x2="75" y2="46" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="54" y1="53" x2="75" y2="54" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="54" y1="61" x2="75" y2="62" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><polygon points="78,18 84,18 84,34 81,30 78,34" fill="rgba(255,255,255,.8)"/></Chip>; }

function INavVideos({ size=48 }) { return <Chip size={size} bg="linear-gradient(160deg,#FF5252,#B71C1C)"><rect x="12" y="26" width="56" height="42" rx="6" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="2.5"/><circle cx="40" cy="47" r="16" fill="rgba(255,255,255,.22)" stroke="white" strokeWidth="2"/><polygon points="36,40 36,54 52,47" fill="white"/><rect x="12" y="18" width="8" height="8" rx="2" fill="rgba(255,255,255,.5)"/><rect x="24" y="18" width="8" height="8" rx="2" fill="rgba(255,255,255,.5)"/><rect x="36" y="18" width="8" height="8" rx="2" fill="rgba(255,255,255,.5)"/><rect x="48" y="18" width="8" height="8" rx="2" fill="rgba(255,255,255,.5)"/><rect x="60" y="18" width="8" height="8" rx="2" fill="rgba(255,255,255,.5)"/><line x1="40" y1="68" x2="40" y2="78" stroke="white" strokeWidth="3"/><line x1="30" y1="78" x2="50" y2="78" stroke="white" strokeWidth="3" strokeLinecap="round"/></Chip>; }

function INavPlanner({ size=48 }) { return <Chip size={size} bg="linear-gradient(160deg,#42A5F5,#0D47A1)"><rect x="14" y="22" width="72" height="62" rx="8" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="2.5"/><rect x="14" y="22" width="72" height="20" rx="8" fill="rgba(255,255,255,.28)"/><rect x="14" y="32" width="72" height="10" fill="rgba(255,255,255,.28)"/><rect x="30" y="14" width="8" height="18" rx="4" fill="rgba(255,255,255,.7)" stroke="white" strokeWidth="1.5"/><rect x="62" y="14" width="8" height="18" rx="4" fill="rgba(255,255,255,.7)" stroke="white" strokeWidth="1.5"/><text x="50" y="35" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial,sans-serif">APRIL</text><circle cx="23" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="23" cy="63" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="23" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="23" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="34" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="34" cy="63" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="34" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="34" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="45" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="45" cy="63" r="5.5" fill="white"/><circle cx="45" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="45" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="56" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="56" cy="63" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="56" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="56" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="67" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="67" cy="63" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="67" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="67" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="78" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="78" cy="63" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="78" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="78" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="89" cy="52" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="89" cy="63" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="89" cy="74" r="3.5" fill="rgba(255,255,255,.45)"/><circle cx="89" cy="85" r="3.5" fill="rgba(255,255,255,.45)"/></Chip>; }

function INavProgress({ size=48 }) { return <Chip size={size} bg="linear-gradient(160deg,#FFD740,#FF6F00)"><polygon points="50,14 57,36 80,36 62,50 69,72 50,58 31,72 38,50 20,36 43,36" fill="white" stroke="rgba(255,255,255,.3)" strokeWidth="1"/><polygon points="50,22 55,36 68,36 58,45 62,58 50,50 38,58 42,45 32,36 45,36" fill="rgba(255,200,0,.55)"/><circle cx="80" cy="20" r="3" fill="rgba(255,255,255,.7)"/><circle cx="20" cy="22" r="2" fill="rgba(255,255,255,.7)"/></Chip>; }

function INavProblems({ size=48 }) { return <Chip size={size} bg="linear-gradient(160deg,#EF5350,#7B0000)"><circle cx="50" cy="44" r="22" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="2.5"/><text x="50" y="52" textAnchor="middle" fill="white" fontSize="26" fontWeight="900" fontFamily="Arial Black,sans-serif">?</text><circle cx="50" cy="72" r="5" fill="white"/><line x1="50" y1="64" x2="50" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round"/></Chip>; }

// Lesson icons
function ITomato({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#EF5350,#7B0000)"><defs><radialGradient id={`tg${size}`} cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#FF7043" stopOpacity="0.4"/><stop offset="100%" stopColor="#7B0000" stopOpacity="0.3"/></radialGradient></defs><ellipse cx="50" cy="58" rx="32" ry="30" fill="#E53935"/><ellipse cx="50" cy="58" rx="32" ry="30" fill={`url(#tg${size})`}/><ellipse cx="38" cy="44" rx="10" ry="7" fill="rgba(255,255,255,.22)" transform="rotate(-20,38,44)"/><ellipse cx="42" cy="54" rx="5" ry="4.5" fill="#1a0000"/><ellipse cx="58" cy="54" rx="5" ry="4.5" fill="#1a0000"/><circle cx="43.5" cy="53" r="1.5" fill="white"/><circle cx="59.5" cy="53" r="1.5" fill="white"/><path d="M36 48 Q42 44 48 47" stroke="#1a0000" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M52 47 Q58 44 64 48" stroke="#1a0000" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M40 66 Q50 73 60 66" stroke="#1a0000" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M50 28 Q48 22 44 19" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 28 Q52 22 56 19" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 30 Q40 24 38 30 Q44 32 50 30Z" fill="#4CAF50"/><path d="M50 30 Q60 24 62 30 Q56 32 50 30Z" fill="#388E3C"/><path d="M50 30 Q46 20 50 16 Q54 20 50 30Z" fill="#4CAF50"/></Chip>; }

function IPotato({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#A1887F,#4E342E)"><defs><radialGradient id={`pg${size}`} cx="38%" cy="35%" r="65%"><stop offset="0%" stopColor="#EFEBE9" stopOpacity="0.5"/><stop offset="100%" stopColor="#4E342E" stopOpacity="0.2"/></radialGradient></defs><ellipse cx="50" cy="58" rx="28" ry="22" fill="#D7CCC8" transform="rotate(-10,50,58)"/><ellipse cx="50" cy="58" rx="28" ry="22" fill={`url(#pg${size})`} transform="rotate(-10,50,58)"/><ellipse cx="40" cy="52" rx="4" ry="3" fill="#795548" transform="rotate(-10,40,52)"/><ellipse cx="56" cy="48" rx="3.5" ry="2.5" fill="#795548" transform="rotate(-10,56,48)"/><ellipse cx="44" cy="65" rx="3" ry="2" fill="#795548" transform="rotate(-10,44,65)"/><ellipse cx="38" cy="48" rx="8" ry="5" fill="rgba(255,255,255,.2)" transform="rotate(-20,38,48)"/><path d="M58 36 Q60 28 56 22" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M56 22 Q52 17 54 14" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="54" cy="14" rx="5" ry="3" fill="#66BB6A" transform="rotate(-20,54,14)"/><path d="M58 26 Q64 22 66 18" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" fill="none"/><ellipse cx="67" cy="17" rx="4" ry="2.5" fill="#66BB6A" transform="rotate(20,67,17)"/></Chip>; }

function ISoil({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#8D6E63,#3E2723)"><rect x="12" y="52" width="76" height="36" rx="4" fill="#5D4037"/><rect x="12" y="40" width="76" height="16" rx="2" fill="#795548"/><rect x="12" y="28" width="76" height="14" rx="2" fill="#8D6E63"/><rect x="12" y="20" width="76" height="12" rx="2" fill="#4CAF50" opacity=".8"/><path d="M22 20 Q20 12 22 8" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M34 20 Q36 10 30 6" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M46 20 Q44 11 48 7" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M58 20 Q60 10 54 6" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M70 20 Q68 12 72 8" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M30 62 Q38 58 40 65 Q42 72 50 68" stroke="#E91E63" strokeWidth="3.5" fill="none" strokeLinecap="round"/><circle cx="50" cy="68" r="3" fill="#E91E63"/><circle cx="52" cy="67" r="1.5" fill="white"/><path d="M50 52 Q44 60 42 70" stroke="#A5D6A7" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7"/><path d="M50 52 Q56 58 60 68" stroke="#A5D6A7" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7"/><ellipse cx="26" cy="70" rx="5" ry="3.5" fill="#6D4C41" transform="rotate(-15,26,70)"/><ellipse cx="70" cy="65" rx="4" ry="3" fill="#6D4C41" transform="rotate(10,70,65)"/></Chip>; }

function IContainer({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#66BB6A,#2E7D32)"><rect x="20" y="45" width="60" height="38" rx="8" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="2"/><path d="M18 40 L22 26 L78 26 L82 40Z" fill="rgba(255,255,255,.28)" stroke="white" strokeWidth="1.5"/><ellipse cx="50" cy="40" rx="32" ry="7" fill="rgba(0,0,0,.15)"/><rect x="30" y="26" width="8" height="8" rx="3" fill="#5D4037"/><circle cx="34" cy="30" r="2" fill="#795548"/><rect x="62" y="26" width="8" height="8" rx="3" fill="#5D4037"/><path d="M50 26 Q44 12 42 6" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 26 Q56 14 60 8" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none"/><ellipse cx="42" cy="6" rx="6" ry="4" fill="#66BB6A" transform="rotate(-20,42,6)"/><ellipse cx="60" cy="8" rx="6" ry="4" fill="#66BB6A" transform="rotate(20,60,8)"/><ellipse cx="50" cy="14" rx="5" ry="7" fill="#81C784"/><line x1="32" y1="48" x2="32" y2="80" stroke="rgba(255,255,255,.2)" strokeWidth="2"/><line x1="68" y1="48" x2="68" y2="80" stroke="rgba(255,255,255,.2)" strokeWidth="2"/></Chip>; }

function ISun({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FDD835,#E65100)"><circle cx="50" cy="50" r="20" fill="rgba(255,255,255,.35)"/><circle cx="50" cy="50" r="14" fill="rgba(255,255,255,.5)"/><line x1="50" y1="10" x2="50" y2="22" stroke="white" strokeWidth="3.5" strokeLinecap="round"/><line x1="50" y1="78" x2="50" y2="90" stroke="white" strokeWidth="3.5" strokeLinecap="round"/><line x1="10" y1="50" x2="22" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round"/><line x1="78" y1="50" x2="90" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round"/><line x1="21" y1="21" x2="29" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round"/><line x1="71" y1="71" x2="79" y2="79" stroke="white" strokeWidth="3" strokeLinecap="round"/><line x1="79" y1="21" x2="71" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round"/><line x1="21" y1="79" x2="29" y2="71" stroke="white" strokeWidth="3" strokeLinecap="round"/><path d="M62 70 Q62 62 68 70z" fill="rgba(100,180,255,.85)"/><path d="M72 74 Q72 67 77 74z" fill="rgba(100,180,255,.85)"/></Chip>; }

function ITools({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#78909C,#263238)"><path d="M14.7 30.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l19-19a6 6 0 01-7.94 7.94l-3.45 3.45" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" transform="scale(2.8) translate(-14,-14)"/><path d="M20 68 L76 20" stroke="rgba(255,255,255,.3)" strokeWidth="4" strokeLinecap="round"/><rect x="62" y="60" width="22" height="10" rx="5" fill="rgba(255,255,255,.3)" stroke="white" strokeWidth="2" transform="rotate(-45,73,65)"/><path d="M18 72 L28 62 L36 70 L26 80Z" fill="rgba(255,255,255,.25)" stroke="white" strokeWidth="2"/><circle cx="22" cy="76" r="5" fill="rgba(255,255,255,.4)"/><rect x="60" y="14" width="20" height="8" rx="4" fill="rgba(255,255,255,.4)" stroke="white" strokeWidth="1.5"/><rect x="64" y="22" width="12" height="30" rx="3" fill="rgba(255,255,255,.25)" stroke="white" strokeWidth="1.5"/></Chip>; }

function ISeeds({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#66BB6A,#1B5E20)"><ellipse cx="50" cy="58" rx="20" ry="24" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="2"/><ellipse cx="34" cy="56" rx="14" ry="18" fill="rgba(255,255,255,.15)" stroke="white" strokeWidth="1.5"/><ellipse cx="66" cy="56" rx="14" ry="18" fill="rgba(255,255,255,.15)" stroke="white" strokeWidth="1.5"/><path d="M50 34 Q48 26 44 22" stroke="#A5D6A7" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M50 34 Q52 26 56 22" stroke="#A5D6A7" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M50 34 Q50 24 50 18" stroke="#C8E6C9" strokeWidth="2" strokeLinecap="round" fill="none"/><circle cx="44" cy="20" r="6" fill="#FDD835" stroke="#F9A825" strokeWidth="1.5"/><circle cx="56" cy="18" r="5" fill="#FDD835" stroke="#F9A825" strokeWidth="1.5"/><circle cx="50" cy="14" r="4" fill="#FFEE58"/><text x="44" y="23" textAnchor="middle" fontSize="7" fill="#E65100" fontWeight="900" fontFamily="Arial">✦</text><text x="56" y="21" textAnchor="middle" fontSize="6" fill="#E65100" fontWeight="900" fontFamily="Arial">✦</text></Chip>; }

function ILettuce({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#66BB6A,#1B5E20)"><ellipse cx="50" cy="55" rx="36" ry="30" fill="#388E3C" opacity=".7"/><ellipse cx="30" cy="50" rx="18" ry="14" fill="#43A047" transform="rotate(-20,30,50)"/><ellipse cx="70" cy="50" rx="18" ry="14" fill="#43A047" transform="rotate(20,70,50)"/><ellipse cx="50" cy="70" rx="20" ry="12" fill="#43A047"/><ellipse cx="50" cy="52" rx="26" ry="22" fill="#66BB6A"/><ellipse cx="36" cy="48" rx="14" ry="10" fill="#81C784" transform="rotate(-15,36,48)"/><ellipse cx="64" cy="48" rx="14" ry="10" fill="#81C784" transform="rotate(15,64,48)"/><ellipse cx="50" cy="50" rx="14" ry="12" fill="#A5D6A7"/><ellipse cx="50" cy="50" rx="8" ry="7" fill="#C8E6C9"/><path d="M50 44 Q46 50 50 58" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" fill="none"/><path d="M50 44 Q54 50 50 58" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" fill="none"/><path d="M22 22 Q22 16 26 22z" fill="rgba(100,200,255,.8)"/><path d="M75 18 Q75 13 78 18z" fill="rgba(100,200,255,.8)"/></Chip>; }

function IHerbs({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#26A69A,#004D40)"><path d="M30 75 Q28 62 32 58 L68 58 Q72 62 70 75Z" fill="#795548"/><rect x="26" y="55" width="48" height="8" rx="4" fill="#8D6E63"/><ellipse cx="50" cy="58" rx="22" ry="5" fill="#5D4037"/><ellipse cx="50" cy="42" rx="12" ry="16" fill="#43A047"/><ellipse cx="36" cy="44" rx="10" ry="14" fill="#388E3C" transform="rotate(-25,36,44)"/><ellipse cx="64" cy="44" rx="10" ry="14" fill="#388E3C" transform="rotate(25,64,44)"/><ellipse cx="38" cy="34" rx="8" ry="12" fill="#4CAF50" transform="rotate(-15,38,34)"/><ellipse cx="62" cy="34" rx="8" ry="12" fill="#4CAF50" transform="rotate(15,62,34)"/><ellipse cx="50" cy="28" rx="9" ry="13" fill="#66BB6A"/><circle cx="50" cy="17" r="5" fill="#F8BBD0"/><circle cx="50" cy="17" r="2.5" fill="#F48FB1"/><circle cx="40" cy="22" r="4" fill="#F8BBD0"/><circle cx="60" cy="22" r="4" fill="#F8BBD0"/></Chip>; }

function IRadish({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#EC407A,#880E4F)"><defs><radialGradient id={`rg${size}`} cx="38%" cy="32%" r="65%"><stop offset="0%" stopColor="#F48FB1" stopOpacity="0.5"/><stop offset="100%" stopColor="#880E4F" stopOpacity="0.3"/></radialGradient></defs><ellipse cx="50" cy="62" rx="26" ry="28" fill="#E91E63"/><ellipse cx="50" cy="62" rx="26" ry="28" fill={`url(#rg${size})`}/><ellipse cx="40" cy="50" rx="8" ry="5" fill="rgba(255,255,255,.22)" transform="rotate(-20,40,50)"/><path d="M50 88 Q48 94 50 98" stroke="#E91E63" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 36 Q48 26 46 20" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 36 Q52 26 54 20" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 36 Q50 26 50 18" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="46" cy="18" rx="7" ry="4" fill="#4CAF50" transform="rotate(-20,46,18)"/><ellipse cx="54" cy="17" rx="7" ry="4" fill="#388E3C" transform="rotate(20,54,17)"/></Chip>; }

function ICarrot({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FFA726,#BF360C)"><defs><radialGradient id={`cag${size}`} cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#FFCC02" stopOpacity="0.3"/><stop offset="100%" stopColor="#BF360C" stopOpacity="0.4"/></radialGradient></defs><path d="M50 20 Q62 22 68 45 Q65 75 50 88 Q35 75 32 45 Q38 22 50 20z" fill="#FF6D00"/><path d="M50 20 Q62 22 68 45 Q65 75 50 88 Q35 75 32 45 Q38 22 50 20z" fill={`url(#cag${size})`}/><path d="M36 40 Q50 37 64 40" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" fill="none"/><path d="M35 52 Q50 49 65 52" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" fill="none"/><path d="M36 64 Q50 61 64 64" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" fill="none"/><ellipse cx="42" cy="38" rx="6" ry="10" fill="rgba(255,255,255,.2)" transform="rotate(-5,42,38)"/><path d="M50 20 Q42 8 36 10 Q38 18 50 20Z" fill="#4CAF50"/><path d="M50 20 Q46 6 50 4 Q54 6 50 20Z" fill="#66BB6A"/><path d="M50 20 Q58 8 64 10 Q62 18 50 20Z" fill="#4CAF50"/></Chip>; }

function ISpringOnion({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#AED581,#33691E)"><ellipse cx="50" cy="78" rx="10" ry="14" fill="white" opacity=".8" stroke="white" strokeWidth="1.5"/><ellipse cx="50" cy="78" rx="6" ry="10" fill="rgba(255,255,255,.5)"/><path d="M50 65 Q44 50 42 30 Q44 20 46 12" stroke="#66BB6A" strokeWidth="4" strokeLinecap="round" fill="none"/><path d="M50 65 Q52 48 54 30 Q56 18 56 10" stroke="#4CAF50" strokeWidth="3.5" strokeLinecap="round" fill="none"/><path d="M50 65 Q50 46 50 26 Q50 16 50 8" stroke="#81C784" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M46 30 Q36 26 34 18" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M54 28 Q64 24 66 16" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/></Chip>; }

function IPeas({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#66BB6A,#2E7D32)"><path d="M15 50 Q18 26 50 22 Q82 26 85 50 Q82 74 50 78 Q18 74 15 50Z" fill="#4CAF50"/><path d="M15 50 Q18 26 50 22 Q82 26 85 50 Q82 74 50 78 Q18 74 15 50Z" fill={`url(#pead${size})`} opacity=".5"/><path d="M22 36 Q50 30 78 36" stroke="rgba(255,255,255,.3)" strokeWidth="2" fill="none"/><circle cx="28" cy="50" r="9" fill="#81C784" stroke="#388E3C" strokeWidth="1"/><circle cx="44" cy="50" r="9" fill="#81C784" stroke="#388E3C" strokeWidth="1"/><circle cx="60" cy="50" r="9" fill="#81C784" stroke="#388E3C" strokeWidth="1"/><circle cx="75" cy="50" r="7" fill="#81C784" stroke="#388E3C" strokeWidth="1"/><circle cx="26" cy="48" r="2" fill="#2E7D32"/><circle cx="30" cy="48" r="2" fill="#2E7D32"/><path d="M26 54 Q28 56 30 54" stroke="#2E7D32" strokeWidth="1.2" fill="none"/><circle cx="42" cy="48" r="2" fill="#2E7D32"/><circle cx="46" cy="48" r="2" fill="#2E7D32"/><path d="M42 54 Q44 56 46 54" stroke="#2E7D32" strokeWidth="1.2" fill="none"/><path d="M85 38 Q92 30 88 22 Q84 18 86 12" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="50" y1="22" x2="50" y2="14" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"/><circle cx="50" cy="10" r="6" fill="#F06292"/><circle cx="50" cy="10" r="3" fill="#FCE4EC"/><defs><radialGradient id={`pead${size}`} cx="50%" cy="35%" r="65%"><stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.4"/><stop offset="100%" stopColor="#1B5E20" stopOpacity="0.3"/></radialGradient></defs></Chip>; }

function ICucumber({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#8BC34A,#33691E)"><rect x="20" y="28" width="60" height="36" rx="18" fill="#558B2F" transform="rotate(-15,50,46)"/><rect x="20" y="28" width="60" height="36" rx="18" fill={`url(#cucd${size})`} transform="rotate(-15,50,46)"/><path d="M32 22 Q28 50 34 72" stroke="#33691E" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6"/><path d="M44 18 Q38 46 42 72" stroke="#33691E" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6"/><path d="M56 16 Q52 44 56 70" stroke="#33691E" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6"/><circle cx="35" cy="38" r="4" fill="#7CB342" opacity=".8"/><circle cx="48" cy="32" r="4" fill="#7CB342" opacity=".8"/><circle cx="60" cy="36" r="4" fill="#7CB342" opacity=".8"/><circle cx="52" cy="55" r="3.5" fill="#7CB342" opacity=".8"/><circle cx="74" cy="42" r="7" fill="#FDD835"/><path d="M74 34 Q76 30 74 26" stroke="#9E9D24" strokeWidth="2" fill="none"/><circle cx="22" cy="54" r="5" fill="#795548"/><ellipse cx="42" cy="34" rx="10" ry="5" fill="rgba(255,255,255,.2)" transform="rotate(-15,42,34)"/><defs><radialGradient id={`cucd${size}`} cx="35%" cy="35%" r="65%"><stop offset="0%" stopColor="#AED581" stopOpacity="0.4"/><stop offset="100%" stopColor="#1B5E20" stopOpacity="0.3"/></radialGradient></defs></Chip>; }

function ICourgette({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#9CCC65,#33691E)"><rect x="10" y="34" width="70" height="30" rx="15" fill="#558B2F"/><path d="M14 34 Q16 64 14 64" stroke="#33691E" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5"/><path d="M28 34 Q30 64 28 64" stroke="#33691E" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5"/><path d="M42 34 Q44 64 42 64" stroke="#33691E" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5"/><path d="M56 34 Q58 64 56 64" stroke="#33691E" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5"/><ellipse cx="40" cy="42" rx="24" ry="6" fill="rgba(255,255,255,.2)"/><circle cx="80" cy="49" r="12" fill="#FDD835"/><circle cx="80" cy="49" r="6" fill="#F57F17"/><path d="M80 35 Q82 30 80 24" stroke="#F9A825" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M90 40 Q96 37 98 30" stroke="#F9A825" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M10 49 Q4 44 2 36" stroke="#795548" strokeWidth="4" strokeLinecap="round" fill="none"/></Chip>; }

function IBeans({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#66BB6A,#1B5E20)"><path d="M50 12 L58 18 L62 30 L58 42 L50 46 L42 42 L38 30 L42 18Z" fill="#8BC34A" stroke="#558B2F" strokeWidth="1.5"/><circle cx="50" cy="20" r="4" fill="#C8E6C9"/><circle cx="54" cy="30" r="4" fill="#C8E6C9"/><circle cx="48" cy="38" r="4" fill="#C8E6C9"/><path d="M50 46 Q46 58 42 70" stroke="#558B2F" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 46 Q54 58 58 70" stroke="#558B2F" strokeWidth="3" strokeLinecap="round" fill="none"/><ellipse cx="42" cy="72" rx="8" ry="5" fill="#8BC34A" stroke="#558B2F" strokeWidth="1.5"/><ellipse cx="58" cy="72" rx="8" ry="5" fill="#8BC34A" stroke="#558B2F" strokeWidth="1.5"/><path d="M28 36 L22 28 L18 16 L26 10 L32 16" stroke="#66BB6A" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="14" r="3" fill="#A5D6A7"/></Chip>; }

function IBeetroot({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#EC407A,#4A0020)"><defs><radialGradient id={`brg${size}`} cx="38%" cy="32%" r="65%"><stop offset="0%" stopColor="#F06292" stopOpacity="0.4"/><stop offset="100%" stopColor="#4A0020" stopOpacity="0.3"/></radialGradient></defs><ellipse cx="50" cy="62" rx="28" ry="28" fill="#880E4F"/><ellipse cx="50" cy="62" rx="28" ry="28" fill={`url(#brg${size})`}/><ellipse cx="40" cy="50" rx="9" ry="6" fill="rgba(255,255,255,.2)" transform="rotate(-20,40,50)"/><path d="M50 34 Q46 24 44 16" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 34 Q54 24 56 16" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M44 16 Q38 10 36 4" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M56 16 Q62 10 64 4" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="40" cy="14" rx="8" ry="5" fill="#4CAF50" transform="rotate(-20,40,14)"/><ellipse cx="60" cy="14" rx="8" ry="5" fill="#388E3C" transform="rotate(20,60,14)"/><path d="M50 86 Q48 92 50 96" stroke="#880E4F" strokeWidth="3" strokeLinecap="round"/><path d="M42 90 Q40 94 38 96" stroke="#880E4F" strokeWidth="2" strokeLinecap="round"/><path d="M58 90 Q60 94 62 96" stroke="#880E4F" strokeWidth="2" strokeLinecap="round"/></Chip>; }

function IGarlic({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#EDE7F6,#6A1B9A)"><defs><radialGradient id={`gg${size}`} cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="white" stopOpacity="0.5"/><stop offset="100%" stopColor="#6A1B9A" stopOpacity="0.2"/></radialGradient></defs><ellipse cx="50" cy="68" rx="28" ry="14" fill="#CE93D8" opacity=".6"/><ellipse cx="50" cy="55" rx="26" ry="28" fill="#F3E5F5"/><ellipse cx="50" cy="55" rx="26" ry="28" fill={`url(#gg${size})`}/><path d="M50 28 Q50 80 50 80" stroke="#CE93D8" strokeWidth="1.5" fill="none" opacity=".6"/><path d="M36 32 Q30 55 38 78" stroke="#CE93D8" strokeWidth="1.5" fill="none" opacity=".6"/><path d="M64 32 Q70 55 62 78" stroke="#CE93D8" strokeWidth="1.5" fill="none" opacity=".6"/><ellipse cx="35" cy="54" rx="10" ry="18" fill="rgba(206,147,216,.3)" transform="rotate(-10,35,54)"/><ellipse cx="65" cy="54" rx="10" ry="18" fill="rgba(206,147,216,.3)" transform="rotate(10,65,54)"/><ellipse cx="40" cy="44" rx="8" ry="12" fill="rgba(255,255,255,.35)" transform="rotate(-10,40,44)"/><line x1="38" y1="80" x2="36" y2="88" stroke="#CE93D8" strokeWidth="1.2" strokeLinecap="round" opacity=".7"/><line x1="44" y1="80" x2="46" y2="88" stroke="#CE93D8" strokeWidth="1.2" strokeLinecap="round" opacity=".7"/><line x1="50" y1="80" x2="48" y2="88" stroke="#CE93D8" strokeWidth="1.2" strokeLinecap="round" opacity=".7"/><line x1="56" y1="80" x2="58" y2="88" stroke="#CE93D8" strokeWidth="1.2" strokeLinecap="round" opacity=".7"/><line x1="62" y1="80" x2="60" y2="88" stroke="#CE93D8" strokeWidth="1.2" strokeLinecap="round" opacity=".7"/><path d="M50 28 Q48 18 50 10" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 18 Q44 12 40 8" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M50 18 Q56 12 60 8" stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" fill="none"/></Chip>; }

function ISlug({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#AB47BC,#4A148C)"><ellipse cx="50" cy="60" rx="34" ry="24" fill="#4CAF50" opacity=".7"/><circle cx="35" cy="55" r="6" fill="rgba(0,0,0,.5)"/><circle cx="62" cy="65" r="5" fill="rgba(0,0,0,.5)"/><circle cx="45" cy="68" r="4" fill="rgba(0,0,0,.5)"/><ellipse cx="52" cy="42" rx="22" ry="12" fill="#9C6E4E"/><circle cx="73" cy="38" r="9" fill="#A07850"/><line x1="70" y1="32" x2="67" y2="22" stroke="#A07850" strokeWidth="2.5" strokeLinecap="round"/><line x1="76" y1="30" x2="76" y2="20" stroke="#A07850" strokeWidth="2.5" strokeLinecap="round"/><circle cx="67" cy="21" r="4" fill="#1a1a1a"/><circle cx="76" cy="19" r="4" fill="#1a1a1a"/><circle cx="68" cy="20" r="1.5" fill="white"/><circle cx="77" cy="18" r="1.5" fill="white"/><path d="M68 42 Q73 46 78 42" stroke="#7B5B3A" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M30 48 Q20 52 14 56" stroke="rgba(180,230,180,.7)" strokeWidth="4" fill="none" strokeLinecap="round"/></Chip>; }

function ISeasonalPlan({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#42A5F5,#0D47A1)"><circle cx="50" cy="50" r="34" fill="rgba(255,255,255,.12)" stroke="white" strokeWidth="2.5"/><line x1="50" y1="18" x2="50" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round"/><line x1="50" y1="50" x2="68" y2="60" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><circle cx="50" cy="50" r="4" fill="white"/><circle cx="50" cy="20" r="4" fill="#FDD835"/><circle cx="80" cy="50" r="4" fill="#66BB6A"/><circle cx="50" cy="80" r="4" fill="#90CAF9"/><circle cx="20" cy="50" r="4" fill="#EF9A9A"/><text x="50" y="17" textAnchor="middle" fill="#FDD835" fontSize="6" fontWeight="900" fontFamily="Arial">☀️</text><text x="84" y="54" textAnchor="middle" fill="#66BB6A" fontSize="6" fontWeight="900" fontFamily="Arial">🌿</text><text x="50" y="94" textAnchor="middle" fill="#90CAF9" fontSize="6" fontWeight="900" fontFamily="Arial">❄️</text><text x="14" y="54" textAnchor="middle" fill="#EF9A9A" fontSize="6" fontWeight="900" fontFamily="Arial">🌸</text></Chip>; }

function IWinter({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#90CAF9,#0D47A1)"><circle cx="50" cy="40" r="22" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="2"/><line x1="50" y1="18" x2="50" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="28" y1="40" x2="72" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="34" y1="24" x2="66" y2="56" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="66" y1="24" x2="34" y2="56" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="66.0" cy="40.0" r="3" fill="rgba(255,255,255,.7)"/><circle cx="58.0" cy="53.86" r="3" fill="rgba(255,255,255,.7)"/><circle cx="42.0" cy="53.86" r="3" fill="rgba(255,255,255,.7)"/><circle cx="34.0" cy="40.0" r="3" fill="rgba(255,255,255,.7)"/><circle cx="42.0" cy="26.14" r="3" fill="rgba(255,255,255,.7)"/><circle cx="58.0" cy="26.14" r="3" fill="rgba(255,255,255,.7)"/><path d="M22 72 Q30 65 38 68 Q46 72 50 68 Q54 65 62 68 Q70 72 78 68" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="30" cy="80" r="5" fill="rgba(255,255,255,.5)"/><circle cx="50" cy="82" r="7" fill="rgba(255,255,255,.4)"/><circle cx="70" cy="80" r="5" fill="rgba(255,255,255,.5)"/></Chip>; }

function ICompost({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#A5D6A7,#2E7D32)"><rect x="18" y="40" width="64" height="46" rx="8" fill="#795548"/><rect x="18" y="40" width="64" height="14" rx="8" fill="#8D6E63"/><rect x="14" y="36" width="72" height="12" rx="6" fill="#6D4C41"/><path d="M30 52 Q38 46 42 54 Q46 62 54 56" stroke="#E91E63" strokeWidth="3.5" fill="none" strokeLinecap="round"/><circle cx="54" cy="56" r="3" fill="#E91E63"/><circle cx="56" cy="55" r="1.5" fill="white"/><path d="M62 58 Q70 52 72 58 Q70 65 62 62Z" fill="#4CAF50"/><path d="M22 62 Q28 58 30 64 Q28 70 22 68Z" fill="#4CAF50"/><path d="M40 68 Q48 62 52 68 Q50 76 40 72Z" fill="#66BB6A"/><circle cx="35" cy="74" r="3" fill="#6D4C41"/><circle cx="58" cy="76" r="2.5" fill="#6D4C41"/><path d="M26 36 Q28 22 32 14" stroke="#66BB6A" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 36 Q50 20 50 12" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M74 36 Q72 22 68 14" stroke="#66BB6A" strokeWidth="3" strokeLinecap="round" fill="none"/><circle cx="32" cy="12" r="5" fill="#66BB6A"/><circle cx="50" cy="10" r="5" fill="#4CAF50"/><circle cx="68" cy="12" r="5" fill="#66BB6A"/></Chip>; }

function INodig({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#A5D6A7,#1B5E20)"><rect x="12" y="55" width="76" height="32" rx="4" fill="#5D4037"/><rect x="12" y="44" width="76" height="14" rx="2" fill="#795548" opacity=".8"/><rect x="12" y="34" width="76" height="12" rx="2" fill="#8D6E63" opacity=".6"/><rect x="12" y="26" width="76" height="10" rx="2" fill="#4CAF50" opacity=".8"/><path d="M24 26 Q22 16 24 10" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M38 26 Q40 14 36 8" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M52 26 Q50 14 54 8" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M66 26 Q68 16 64 10" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M40 62 Q50 58 60 62" stroke="#A5D6A7" strokeWidth="2" fill="none" opacity=".7"/><circle cx="52" cy="46" r="5" fill="#4CAF50" opacity=".6"/><circle cx="32" cy="50" r="4" fill="#4CAF50" opacity=".5"/><circle cx="68" cy="50" r="4" fill="#4CAF50" opacity=".5"/><path d="M76 36 Q84 28 80 20" stroke="rgba(255,255,255,.5)" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="80" cy="19" r="4" fill="rgba(255,255,255,.6)"/><line x1="78" y1="14" x2="82" y2="24" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"/></Chip>; }

function ICropRotation({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FFB74D,#E65100)"><circle cx="50" cy="50" r="34" fill="rgba(255,255,255,.1)" stroke="white" strokeWidth="2"/><path d="M50 20 A30 30 0 0 1 80 50" stroke="#81C784" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M80 50 A30 30 0 0 1 50 80" stroke="#FF8A65" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M50 80 A30 30 0 0 1 20 50" stroke="#CE93D8" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M20 50 A30 30 0 0 1 50 20" stroke="#90CAF9" strokeWidth="8" fill="none" strokeLinecap="round"/><circle cx="50" cy="50" r="10" fill="white"/><path d="M46 50 L50 46 L54 50 L50 54Z" fill="#E65100"/><polygon points="50,22 56,32 44,32" fill="#81C784"/></Chip>; }

function IPlotPlan({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#80CBC4,#00695C)"><rect x="12" y="12" width="76" height="76" rx="6" fill="rgba(255,255,255,.15)" stroke="white" strokeWidth="2"/><rect x="18" y="18" width="34" height="32" rx="4" fill="#4CAF50" opacity=".7"/><rect x="56" y="18" width="26" height="32" rx="4" fill="#FF8A65" opacity=".7"/><rect x="18" y="54" width="26" height="28" rx="4" fill="#64B5F6" opacity=".7"/><rect x="48" y="54" width="34" height="28" rx="4" fill="#FFD54F" opacity=".7"/><line x1="50" y1="12" x2="50" y2="88" stroke="white" strokeWidth="2.5"/><line x1="12" y1="50" x2="88" y2="50" stroke="white" strokeWidth="2.5"/><circle cx="50" cy="50" r="6" fill="white"/><circle cx="35" cy="34" r="4" fill="rgba(255,255,255,.6)"/><circle cx="69" cy="34" r="4" fill="rgba(255,255,255,.6)"/><circle cx="31" cy="68" r="4" fill="rgba(255,255,255,.6)"/><circle cx="65" cy="68" r="4" fill="rgba(255,255,255,.6)"/></Chip>; }

function IIrrigation({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#4FC3F7,#0277BD)"><path d="M14 30 Q30 26 50 30 Q70 34 86 30" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/><path d="M14 30 L14 72" stroke="white" strokeWidth="3" strokeLinecap="round"/><circle cx="14" cy="74" r="5" fill="rgba(255,255,255,.6)"/><line x1="28" y1="34" x2="28" y2="50" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><line x1="42" y1="32" x2="42" y2="48" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><line x1="56" y1="32" x2="56" y2="55" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><line x1="70" y1="30" x2="70" y2="52" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><line x1="84" y1="30" x2="84" y2="46" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><path d="M28 55 Q28 63 31 67z" fill="rgba(100,200,255,.85)"/><path d="M42 53 Q42 61 45 65z" fill="rgba(100,200,255,.85)"/><path d="M56 60 Q56 68 59 72z" fill="rgba(100,200,255,.85)"/><path d="M70 57 Q70 65 73 69z" fill="rgba(100,200,255,.85)"/><path d="M84 51 Q84 59 87 63z" fill="rgba(100,200,255,.85)"/><ellipse cx="50" cy="82" rx="30" ry="8" fill="rgba(100,200,255,.3)"/><path d="M86 28 Q90 20 86 14 Q84 20 86 28z" fill="rgba(255,255,255,.6)"/></Chip>; }

function IPolytunnel({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#B2EBF2,#00838F)"><path d="M12 60 Q12 28 50 22 Q88 28 88 60" fill="rgba(255,255,255,.25)" stroke="white" strokeWidth="2.5"/><path d="M20 60 Q20 34 50 28 Q80 34 80 60" fill="rgba(255,255,255,.15)"/><line x1="12" y1="60" x2="88" y2="60" stroke="white" strokeWidth="2.5"/><path d="M30 22 Q30 28 30 60" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/><path d="M40 20 Q40 28 40 60" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/><path d="M50 18 Q50 28 50 60" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/><path d="M60 20 Q60 28 60 60" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/><path d="M70 22 Q70 28 70 60" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/><rect x="22" y="48" width="12" height="20" rx="3" fill="#4CAF50" opacity=".7"/><rect x="38" y="42" width="12" height="26" rx="3" fill="#E53935" opacity=".7"/><rect x="54" y="46" width="12" height="22" rx="3" fill="#FF9800" opacity=".7"/><rect x="70" y="50" width="10" height="18" rx="3" fill="#66BB6A" opacity=".7"/><ellipse cx="50" cy="60" rx="38" ry="5" fill="rgba(0,0,0,.2)"/><rect x="20" y="60" width="10" height="16" rx="5" fill="rgba(255,255,255,.3)"/></Chip>; }

function ISeedSaving({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FFCC80,#E65100)"><rect x="18" y="18" width="64" height="50" rx="8" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="2"/><rect x="26" y="28" width="48" height="6" rx="3" fill="rgba(255,255,255,.5)"/><rect x="26" y="38" width="36" height="5" rx="2.5" fill="rgba(255,255,255,.4)"/><rect x="26" y="47" width="42" height="5" rx="2.5" fill="rgba(255,255,255,.4)"/><circle cx="72" cy="58" r="14" fill="#4CAF50"/><path d="M72 58 Q68 52 72 46 Q76 52 72 58z" fill="rgba(255,255,255,.5)" stroke="none"/><ellipse cx="69" cy="52" rx="5" ry="3" fill="rgba(255,255,255,.3)" transform="rotate(-20,69,52)"/><circle cx="72" cy="58" r="4" fill="#FDD835"/><path d="M18 62 L82 62 L82 74 Q50 82 18 74Z" fill="#795548"/><path d="M18 62 L18 74 Q50 82 82 74 L82 62" fill="rgba(255,255,255,.1)"/></Chip>; }

function IPestMgmt({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#EF9A9A,#B71C1C)"><ellipse cx="50" cy="60" rx="30" ry="22" fill="#4CAF50" opacity=".6"/><circle cx="38" cy="54" r="5" fill="rgba(0,0,0,.4)"/><circle cx="55" cy="65" r="5" fill="rgba(0,0,0,.4)"/><circle cx="42" cy="67" r="4" fill="rgba(0,0,0,.4)"/><ellipse cx="50" cy="38" rx="14" ry="10" fill="#EF9A9A"/><circle cx="42" cy="34" r="3" fill="#1a1a1a"/><circle cx="58" cy="34" r="3" fill="#1a1a1a"/><circle cx="42.5" cy="33.5" r="1.2" fill="white"/><circle cx="58.5" cy="33.5" r="1.2" fill="white"/><path d="M44 42 Q50 46 56 42" stroke="#B71C1C" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M36 32 Q34 24 30 20" stroke="#EF9A9A" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M64 32 Q66 24 70 20" stroke="#EF9A9A" strokeWidth="2" strokeLinecap="round" fill="none"/><circle cx="30" cy="18" r="5" fill="#FFCC80"/><circle cx="30" cy="18" r="2.5" fill="rgba(255,255,255,.5)"/><circle cx="70" cy="18" r="4" fill="#FFCC80"/><circle cx="70" cy="18" r="2" fill="rgba(255,255,255,.5)"/><path d="M76 52 Q84 44 86 36" stroke="rgba(255,255,255,.6)" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="87" cy="34" r="4" fill="rgba(255,255,255,.7)"/><line x1="85" y1="30" x2="89" y2="38" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><line x1="83" y1="34" x2="91" y2="34" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/></Chip>; }

function IGreenManure({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#B2DFDB,#00695C)"><rect x="12" y="58" width="76" height="28" rx="4" fill="#5D4037"/><rect x="12" y="48" width="76" height="12" rx="2" fill="#795548"/><path d="M16 48 Q12 32 16 24" stroke="#66BB6A" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="12" cy="16" rx="7" ry="5" fill="#F48FB1" transform="rotate(0,12,16)"/><path d="M26 48 Q30 34 26 25" stroke="#81C784" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="30" cy="17" rx="7" ry="5" fill="#FFF176" transform="rotate(15,30,17)"/><path d="M36 48 Q32 36 36 26" stroke="#66BB6A" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="32" cy="18" rx="7" ry="5" fill="#80CBC4" transform="rotate(30,32,18)"/><path d="M46 48 Q50 38 46 27" stroke="#81C784" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="50" cy="19" rx="7" ry="5" fill="#F48FB1" transform="rotate(45,50,19)"/><path d="M56 48 Q52 40 56 28" stroke="#66BB6A" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="52" cy="20" rx="7" ry="5" fill="#FFF176" transform="rotate(60,52,20)"/><path d="M66 48 Q70 42 66 29" stroke="#81C784" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="70" cy="21" rx="7" ry="5" fill="#80CBC4" transform="rotate(75,70,21)"/><path d="M76 48 Q72 44 76 30" stroke="#66BB6A" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="72" cy="22" rx="7" ry="5" fill="#F48FB1" transform="rotate(90,72,22)"/><path d="M30 72 Q38 66 42 74 Q46 82 54 76" stroke="#A5D6A7" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="54" cy="76" r="3" fill="#A5D6A7"/></Chip>; }

function ISuccession({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#AED581,#558B2F)"><rect x="10" y="18" width="24" height="14" rx="4" fill="#4CAF50"/><rect x="10" y="38" width="24" height="14" rx="4" fill="#66BB6A"/><rect x="10" y="58" width="24" height="14" rx="4" fill="#A5D6A7"/><path d="M28 10 Q34 10 34 14 L34 78 Q34 82 40 82" stroke="white" strokeWidth="2" fill="none"/><line x1="40" y1="74" x2="76" y2="74" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="40" y1="62" x2="68" y2="62" stroke="rgba(255,255,255,.7)" strokeWidth="2"/><line x1="40" y1="50" x2="60" y2="50" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"/><text x="18" y="29" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="Arial">W1</text><text x="18" y="49" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="Arial">W3</text><text x="18" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="Arial">W5</text><circle cx="76" cy="74" r="5" fill="white" opacity=".8"/><circle cx="68" cy="62" r="4" fill="white" opacity=".6"/><circle cx="60" cy="50" r="3.5" fill="white" opacity=".4"/></Chip>; }

function IGlenPlan({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FFD54F,#E65100)"><rect x="14" y="14" width="72" height="72" rx="8" fill="rgba(255,255,255,.15)" stroke="white" strokeWidth="2"/><rect x="20" y="20" width="32" height="30" rx="4" fill="rgba(255,255,255,.25)"/><rect x="56" y="20" width="24" height="30" rx="4" fill="rgba(255,255,255,.2)"/><rect x="20" y="54" width="24" height="26" rx="4" fill="rgba(255,255,255,.2)"/><rect x="48" y="54" width="32" height="26" rx="4" fill="rgba(255,255,255,.2)"/><text x="36" y="39" textAnchor="middle" fill="white" fontSize="14" fontFamily="Arial">🍅</text><text x="68" y="39" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">🥔</text><text x="32" y="71" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">🧅</text><text x="64" y="71" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">🥬</text><line x1="50" y1="14" x2="50" y2="86" stroke="white" strokeWidth="2.5"/><line x1="14" y1="50" x2="86" y2="50" stroke="white" strokeWidth="2.5"/></Chip>; }

function ISaveMoney({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#A5D6A7,#1B5E20)"><circle cx="50" cy="46" r="26" fill="rgba(255,255,255,.2)" stroke="white" strokeWidth="2.5"/><circle cx="50" cy="46" r="18" fill="rgba(255,255,255,.15)"/><text x="50" y="54" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="Arial" dominantBaseline="middle">£</text><path d="M30 72 Q40 68 50 72 Q60 76 70 72" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/><circle cx="30" cy="72" r="4" fill="rgba(255,255,255,.5)"/><circle cx="50" cy="74" r="5" fill="rgba(255,255,255,.4)"/><circle cx="70" cy="72" r="4" fill="rgba(255,255,255,.5)"/><path d="M50 20 Q52 14 54 10" stroke="#FDD835" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="54" cy="9" r="3" fill="#FDD835"/><path d="M62 24 Q66 18 70 16" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" fill="none"/><circle cx="71" cy="15" r="2.5" fill="#FDD835"/></Chip>; }

function IFullYear({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#80CBC4,#004D40)"><circle cx="50" cy="50" r="34" fill="rgba(255,255,255,.1)" stroke="white" strokeWidth="2"/><path d="M50 16 A34 34 0 0 1 84 50" stroke="#FDD835" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M84 50 A34 34 0 0 1 50 84" stroke="#66BB6A" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M50 84 A34 34 0 0 1 16 50" stroke="#90CAF9" strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M16 50 A34 34 0 0 1 50 16" stroke="#FFCC80" strokeWidth="8" fill="none" strokeLinecap="round"/><circle cx="50" cy="50" r="12" fill="white"/><text x="50" y="54" textAnchor="middle" fill="#004D40" fontSize="10" fontWeight="900" fontFamily="Arial">365</text></Chip>; }

function IAdvTomato({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FF5252,#7B0000)"><defs><radialGradient id={`atg${size}`} cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#FF7043" stopOpacity="0.5"/><stop offset="100%" stopColor="#7B0000" stopOpacity="0.3"/></radialGradient></defs><ellipse cx="46" cy="58" rx="26" ry="28" fill="#E53935"/><ellipse cx="46" cy="58" rx="26" ry="28" fill={`url(#atg${size})`}/><ellipse cx="35" cy="44" rx="8" ry="5" fill="rgba(255,255,255,.2)" transform="rotate(-20,35,44)"/><path d="M46 30 Q42 22 38 18" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M46 30 Q48 22 52 18" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M46 32 Q36 26 34 32 Q40 34 46 32Z" fill="#4CAF50"/><path d="M46 32 Q56 26 58 32 Q52 34 46 32Z" fill="#388E3C"/><path d="M46 32 Q44 22 46 18 Q48 22 46 32Z" fill="#4CAF50"/><ellipse cx="64" cy="36" rx="10" ry="10" fill="#FF5252" stroke="#B71C1C" strokeWidth="2"/><ellipse cx="64" cy="36" rx="6" ry="6" fill="#FF1744"/><text x="64" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="Arial">★</text><line x1="64" y1="20" x2="64" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="64" cy="18" r="3" fill="white" opacity=".7"/></Chip>; }

function IChillies({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#FF5722,#BF360C)"><path d="M36 28 Q30 20 32 12 Q34 8 36 6" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M36 28 Q46 24 50 30 Q56 40 52 60 Q48 78 44 86" stroke="#FF5722" strokeWidth="0" fill="none"/><path d="M36 28 Q46 24 50 30 Q56 40 52 60 Q48 78 44 86 Q32 82 28 68 Q22 50 28 38 Q30 32 36 28Z" fill="#FF5722"/><path d="M36 28 Q46 24 50 30 Q56 40 52 60 Q48 78 44 86 Q32 82 28 68 Q22 50 28 38 Q30 32 36 28Z" fill={`url(#chig${size})`}/><ellipse cx="36" cy="52" rx="6" ry="8" fill="rgba(255,255,255,.15)" transform="rotate(-10,36,52)"/><path d="M62 34 Q68 26 70 18 Q72 12 72 8" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M62 34 Q72 30 74 40 Q76 54 70 68 Q66 78 64 84 Q54 80 52 66 Q48 50 52 42 Q56 36 62 34Z" fill="#FF7043"/><defs><radialGradient id={`chig${size}`} cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#FFCCBC" stopOpacity="0.3"/><stop offset="100%" stopColor="#BF360C" stopOpacity="0.3"/></radialGradient></defs><path d="M36 6 Q34 2 38 2 Q40 4 36 6Z" fill="#66BB6A"/><path d="M72 8 Q70 4 74 4 Q76 6 72 8Z" fill="#66BB6A"/></Chip>; }

function ISoftFruit({ size=52 }) { return <Chip size={size} bg="linear-gradient(160deg,#F48FB1,#880E4F)"><ellipse cx="38" cy="58" rx="16" ry="16" fill="#E91E63"/><path d="M24 56 Q28 48 32 48 Q36 48 38 52 Q40 48 44 48 Q48 48 52 56 Q52 66 38 74 Q24 66 24 56Z" fill="#F06292"/><circle cx="34" cy="60" r="2" fill="#AD1457"/><circle cx="40" cy="64" r="2" fill="#AD1457"/><circle cx="36" cy="68" r="1.5" fill="#AD1457"/><path d="M36 48 Q36 38 38 32" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="32" cy="30" rx="8" ry="5" fill="#66BB6A" transform="rotate(-20,32,30)"/><ellipse cx="44" cy="28" rx="8" ry="5" fill="#4CAF50" transform="rotate(10,44,28)"/><circle cx="64" cy="42" r="14" fill="#FF7043"/><circle cx="58" cy="38" r="5" fill="rgba(255,255,255,.2)"/><circle cx="62" cy="50" r="2" fill="#BF360C"/><circle cx="68" cy="46" r="2" fill="#BF360C"/><circle cx="66" cy="54" r="1.5" fill="#BF360C"/><path d="M62 28 Q62 20 64 14" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="60" cy="12" rx="6" ry="4" fill="#66BB6A" transform="rotate(-15,60,12)"/></Chip>; }

// Map lesson IDs to icon components
const LESSON_ICONS = {
  "l1-soil":         ISoil,
  "l1-containers":   IContainer,
  "l1-sunlight":     ISun,
  "l1-tools":        ITools,
  "l1-seeds":        ISeeds,
  "l2-lettuce":      ILettuce,
  "l2-herbs":        IHerbs,
  "l2-radish":       IRadish,
  "l2-carrots":      ICarrot,
  "l2-spring-onions":ISpringOnion,
  "l2-peas":         IPeas,
  "l3-tomatoes":     ITomato,
  "l3-potatoes":     IPotato,
  "l3-cucumbers":    ICucumber,
  "l3-courgettes":   ICourgette,
  "l3-beans":        IBeans,
  "l3-beetroot":     IBeetroot,
  "l3-onions-garlic":IGarlic,
  "l4-seasonal":     ISeasonalPlan,
  "l4-winter":       IWinter,
  "l4-succession":   ISuccession,
  "l4-green-manures":IGreenManure,
  "l5-plot-planning":IPlotPlan,
  "l5-irrigation":   IIrrigation,
  "l5-polytunnel":   IPolytunnel,
  "l5-pests":        IPestMgmt,
  "l5-seed-saving":  ISeedSaving,
  "l5-composting":   ICompost,
  "l5-crop-rotation":ICropRotation,
  "l5-no-dig":       INodig,
  "l6-advanced-tomatoes": IAdvTomato,
  "l6-maincrop-potatoes": IPotato,
  "l6-chillies-peppers":  IChillies,
  "l6-soft-fruit":        ISoftFruit,
  "l6-full-year":         IFullYear,
  "l6-glens-plan":        IGlenPlan,
  "l6-saving-money":      ISaveMoney,
  "slugs":           ISlug,
  "fix-slugs":       ISlug,
  "fix-aphids":      IPestMgmt,
};

// Level icons
const LEVEL_ICONS = {
  "level-1": (s=52) => <Chip size={s} bg="linear-gradient(160deg,#7CB342,#33691E)"><line x1="50" y1="82" x2="50" y2="42"/><path d="M50 42C50 42 38 36 34 24c8 0 14 10 16 18z" fill="rgba(255,255,255,.35)"/><path d="M50 42C50 42 62 36 66 24c-8 0-14 10-16 18z" fill="rgba(255,255,255,.25)"/><path d="M50 36Q50 26 52 20Q56 24 50 36z" fill="rgba(255,255,255,.5)" stroke="none"/><line x1="42" y1="78" x2="58" y2="78" stroke="white" strokeWidth="3" strokeLinecap="round"/></Chip>,
  "level-2": (s=52) => <Chip size={s} bg="linear-gradient(160deg,#66BB6A,#2E7D32)"><path d="M50 20L20 35l30 15 30-15-30-15z" fill="rgba(255,255,255,.3)" stroke="white" strokeWidth="2"/><path d="M20 50l30 15 30-15" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M20 65l30 15 30-15" stroke="rgba(255,255,255,.6)" strokeWidth="2" fill="none" strokeLinecap="round"/></Chip>,
  "level-3": (s=52) => <Chip size={s} bg="linear-gradient(160deg,#EF5350,#7B0000)"><defs><radialGradient id={`l3g${s}`} cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#FF7043" stopOpacity="0.4"/><stop offset="100%" stopColor="#7B0000" stopOpacity="0.3"/></radialGradient></defs><ellipse cx="50" cy="58" rx="32" ry="30" fill="#E53935"/><ellipse cx="50" cy="58" rx="32" ry="30" fill={`url(#l3g${s})`}/><ellipse cx="38" cy="44" rx="10" ry="7" fill="rgba(255,255,255,.22)" transform="rotate(-20,38,44)"/><ellipse cx="42" cy="54" rx="5" ry="4.5" fill="#1a0000"/><ellipse cx="58" cy="54" rx="5" ry="4.5" fill="#1a0000"/><circle cx="43.5" cy="53" r="1.5" fill="white"/><circle cx="59.5" cy="53" r="1.5" fill="white"/><path d="M36 48 Q42 44 48 47" stroke="#1a0000" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M52 47 Q58 44 64 48" stroke="#1a0000" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M40 66 Q50 73 60 66" stroke="#1a0000" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M50 28 Q48 22 44 19" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 28 Q52 22 56 19" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none"/><path d="M50 30 Q40 24 38 30 Q44 32 50 30Z" fill="#4CAF50"/><path d="M50 30 Q60 24 62 30 Q56 32 50 30Z" fill="#388E3C"/><path d="M50 30 Q46 20 50 16 Q54 20 50 30Z" fill="#4CAF50"/></Chip>,
  "level-4": (s=52) => <Chip size={s} bg="linear-gradient(160deg,#42A5F5,#0D47A1)"><circle cx="50" cy="50" r="30" fill="rgba(255,255,255,.12)" stroke="white" strokeWidth="2"/><line x1="50" y1="22" x2="50" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round"/><line x1="50" y1="50" x2="68" y2="62" stroke="rgba(255,255,255,.7)" strokeWidth="2.5" strokeLinecap="round"/><circle cx="50" cy="50" r="4" fill="white"/></Chip>,
  "level-5": (s=52) => <Chip size={s} bg="linear-gradient(160deg,#7E57C2,#4A148C)"><path d="M50 20L20 35v30l30 15 30-15V35z" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="2.2"/><path d="M50 20v50" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/><path d="M20 35l30 15 30-15" stroke="white" strokeWidth="2"/></Chip>,
  "level-6": (s=52) => <Chip size={s} bg="linear-gradient(160deg,#FFD54F,#E65100)"><polygon points="50,14 57,36 80,36 62,50 69,72 50,58 31,72 38,50 20,36 43,36" fill="white" stroke="rgba(255,255,255,.3)" strokeWidth="1"/><polygon points="50,22 55,36 68,36 58,45 62,58 50,50 38,58 42,45 32,36 45,36" fill="rgba(255,200,0,.55)"/></Chip>,
};

function LessonIcon({ lessonId, size = 52, fallbackEmoji = "🌱" }) {
  const IconComponent = LESSON_ICONS[lessonId];
  if (IconComponent) return <IconComponent size={size}/>;
  return (
    <div style={{ width:size, height:size, borderRadius:size*0.26, background:"linear-gradient(135deg,#5E9E2E,#2D5016)",
      display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.4, flexShrink:0 }}>
      {fallbackEmoji}
    </div>
  );
}

function LevelIcon({ levelId, size = 52 }) {
  const fn = LEVEL_ICONS[levelId];
  if (fn) return fn(size);
  return <div style={{ width:size, height:size, borderRadius:size*0.26, background:"#ccc", flexShrink:0 }}/>;
}
function XPPopup({ amount, visible }) {
  if (!visible) return null;
  return (
    <div style={{ position:"fixed", top:80, right:16, background:"linear-gradient(135deg,#FFD700,#FFA000)", color:"#111", padding:"10px 18px", borderRadius:999, fontWeight:900, fontSize:16, zIndex:9999, boxShadow:"0 4px 20px rgba(255,160,0,.5)", animation:"xpPop .5s ease" }}>
      +{amount} XP ⭐
    </div>
  );
}

// ─── HEARTS DISPLAY ────────────────────────────────────────────────────────────
function Hearts({ count, prevCount }) {
  const lost = prevCount !== undefined && count < prevCount;
  return (
    <div style={{ display:"flex", gap:3 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{
          fontSize:16,
          filter: i < count ? "none" : "grayscale(100%)",
          opacity: i < count ? 1 : 0.3,
          display:"inline-block",
          animation: lost && i === count ? "heartBreak .5s ease" : "none",
        }}>❤️</span>
      ))}
    </div>
  );
}

// ─── LEAGUE BADGE ─────────────────────────────────────────────────────────────
function LeagueBadge({ xp, small = false }) {
  const league = getLeague(xp);
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:small?4:6, background:`${league.color}22`, border:`2px solid ${league.color}44`, borderRadius:999, padding:small?"3px 10px":"6px 14px" }}>
      <span style={{ fontSize:small?14:18 }}>{league.emoji}</span>
      <span style={{ fontWeight:800, fontSize:small?11:13, color:league.color, letterSpacing:".04em" }}>{league.name}</span>
    </div>
  );
}

// ─── XP BAR ───────────────────────────────────────────────────────────────────
function XPBar({ xp }) {
  const league = getLeague(xp);
  const next   = getNextLeague(xp);
  const pct    = next ? Math.round(((xp - league.minXP) / (next.minXP - league.minXP)) * 100) : 100;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:11, fontWeight:700, color:league.color }}>{league.emoji} {league.name}</span>
        <span style={{ fontSize:11, fontWeight:700, color:"var(--tmut)" }}>{xp} XP{next?` / ${next.minXP}`:""}</span>
      </div>
      <div style={{ height:8, background:"#eee", borderRadius:999, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${league.color},${league.color}CC)`, borderRadius:999, transition:"width .6s ease" }}/>
      </div>
      {next && <div style={{ fontSize:10, color:"var(--tmut)", marginTop:3 }}>{next.minXP - xp} XP to {next.emoji} {next.name}</div>}
    </div>
  );
}

// ─── GLEN TIP ─────────────────────────────────────────────────────────────────
function GlenTip({ text }) {
  return (
    <div style={{ background:"linear-gradient(135deg,#0d1f08,#1a3a10)", border:"1px solid #2D5016", borderRadius:16, padding:16, display:"flex", gap:12, alignItems:"flex-start" }}>
      <div style={{ flexShrink:0 }}><VPILogo size={32}/></div>
      <div>
        <div style={{ color:"#9CCC65", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>{HOST}'s Tip</div>
        <p style={{ color:"rgba(255,255,255,.82)", fontSize:13, lineHeight:1.65, margin:0 }}>{text}</p>
      </div>
    </div>
  );
}

// ─── BRAND FOOTER ─────────────────────────────────────────────────────────────
function BrandFooter() {
  return (
    <div style={{ background:"#111", padding:"28px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:14, textAlign:"center" }}>
      <VPILogo size={56}/>
      <div>
        <div style={{ color:"#fff", fontWeight:800, fontSize:16, marginBottom:3 }}>{CHANNEL_NAME}</div>
        <div style={{ color:"#555", fontSize:12 }}>by {HOST} · South-West UK</div>
      </div>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FF0000", color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}><YTIcon/> YouTube</a>
        <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#2D5016", color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}>🌱 Website</a>
      </div>
      <div style={{ color:"#333", fontSize:11 }}>© {CHANNEL_NAME} · The Growers Academy</div>
    </div>
  );
}

// ─── VIDEO PLAYER ─────────────────────────────────────────────────────────────
function YTPlayer({ videoKey, onPlay }) {
  const [playing, setPlaying] = useState(false);
  const id = MY_VIDEOS[videoKey];
  if (!id) return (
    <div style={{ background:"#111", borderRadius:16, padding:"28px 20px", textAlign:"center" }}>
      <div style={{ fontSize:36, marginBottom:8 }}>📺</div>
      <div style={{ color:"#444", fontSize:13, fontWeight:600, marginBottom:12 }}>Video coming soon from {CHANNEL_NAME}</div>
      <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FF0000", color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}><YTIcon/> Watch on YouTube</a>
    </div>
  );
  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  return (
    <div style={{ position:"relative", width:"100%", paddingTop:"56.25%", borderRadius:16, overflow:"hidden", background:"#000", boxShadow:"0 4px 24px rgba(0,0,0,.2)" }}>
      {playing
        ? <iframe style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }} src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={videoKey}/>
        : <div style={{ position:"absolute", inset:0, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }} onClick={() => { setPlaying(true); onPlay && onPlay(); }}>
            <img src={thumb} alt="thumbnail" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.3)" }}/>
            <div style={{ position:"relative", zIndex:2, width:64, height:64, background:"rgba(255,0,0,.92)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 24px rgba(0,0,0,.5)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft:4 }}><polygon points="5,3 19,12 5,21"/></svg>
            </div>
            <div style={{ position:"relative", zIndex:2, marginTop:12, display:"flex", alignItems:"center", gap:8, background:"rgba(0,0,0,.65)", padding:"6px 14px", borderRadius:999 }}>
              <VPILogo size={18}/><span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{CHANNEL_NAME}</span>
            </div>
          </div>
      }
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  :root {
    --g9:#1a3a08;--g8:#2D5016;--g7:#3d6b1e;--g6:#4e8226;--g5:#5E9E2E;
    --g4:#7CB342;--g3:#9CCC65;--g2:#C5E1A5;--g1:#DCEDC8;--g0:#F1F8E9;
    --cream:#F7F4EF;--cdk:#EDE8DF;
    --td:#1C1C1E;--tm:#3A3A3C;--tl:#6B6B70;--tmut:#8E8E93;
    --gold:#FFD700;--golddk:#FFA000;
    --ff:'Nunito',system-ui,sans-serif;
    --nav:64px;--r:16px;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:var(--ff);background:var(--cream);color:var(--td);-webkit-font-smoothing:antialiased;overflow-x:hidden}
  button{font-family:var(--ff);cursor:pointer}
  .wrap{max-width:480px;margin:0 auto;min-height:100vh;background:var(--cream)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;border-radius:999px;border:none;font-family:var(--ff);font-size:15px;font-weight:700;transition:all .2s;line-height:1;cursor:pointer}
  .bp{background:var(--g6);color:#fff;box-shadow:0 4px 14px rgba(78,130,38,.35)}.bp:hover{background:var(--g7);transform:translateY(-1px)}
  .bs{background:#fff;color:var(--g7);border:2px solid var(--g2)}.bs:hover{border-color:var(--g4)}
  .byt{background:#FF0000;color:#fff}.byt:hover{background:#cc0000;transform:translateY(-1px)}
  .bgold{background:linear-gradient(135deg,var(--gold),var(--golddk));color:#111}.bgold:hover{transform:translateY(-1px)}
  .bgh{background:transparent;color:var(--tm);padding:8px 14px}
  .bsm{padding:8px 16px;font-size:13px}.blg{padding:18px 28px;font-size:17px}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .card{background:#fff;border-radius:var(--r);padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.07)}
  .tap{cursor:pointer;transition:all .2s}.tap:active{transform:scale(.98)}
  .pb{height:7px;background:var(--g1);border-radius:999px;overflow:hidden}
  .pf{height:100%;background:linear-gradient(90deg,var(--g5),var(--g4));border-radius:999px;transition:width .6s ease}
  .tip{background:linear-gradient(135deg,var(--g0),#fff);border-left:4px solid var(--g4);border-radius:0 14px 14px 0;padding:14px}
  .warn{background:#FFF8E1;border-left:4px solid #FFC107;border-radius:0 14px 14px 0;padding:14px}
  .crow{display:flex;align-items:flex-start;gap:11px;padding:9px 0;border-bottom:1px solid var(--cdk);cursor:pointer}
  .crow:last-child{border-bottom:none}
  .ccirc{width:22px;height:22px;border-radius:50%;border:2px solid var(--g3);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;margin-top:1px;font-size:11px;color:#fff}
  .ccirc.on{background:var(--g5);border-color:var(--g5)}
  .sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .heart-shake{animation:heartShake .4s ease}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(.8);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes quizCorrect{0%{transform:scale(1)}30%{transform:scale(1.04)}60%{transform:scale(0.98)}100%{transform:scale(1)}}
  @keyframes quizWrong{0%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}100%{transform:translateX(0)}}
  @keyframes heartBreak{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
  .quiz-correct{animation:quizCorrect .4s ease}
  .quiz-wrong{animation:quizWrong .4s ease}
  @keyframes float3{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
  @keyframes xpPop{0%{opacity:0;transform:translateY(-10px) scale(.8)}40%{transform:translateY(0) scale(1.15)}100%{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes heartShake{0%,100%{transform:scale(1)}25%{transform:scale(1.3) rotate(-10deg)}75%{transform:scale(1.3) rotate(10deg)}}
  @keyframes streakFlame{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
  @keyframes heartBreak{0%{transform:scale(1)}20%{transform:scale(1.4)}40%{transform:scale(.8) rotate(-15deg)}60%{transform:scale(1.1) rotate(5deg)}80%{transform:scale(.9)}100%{transform:scale(1)}}
  @keyframes heartLost{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-40px) scale(.5)}}
  @keyframes xpFloat{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-60px) scale(1.3)}}
  @keyframes correctBounce{0%{transform:scale(1)}30%{transform:scale(1.12)}60%{transform:scale(.96)}100%{transform:scale(1)}}
  @keyframes wrongShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
  @keyframes vegDance{0%,100%{transform:translateY(0) rotate(0deg) scale(1)}15%{transform:translateY(-18px) rotate(-12deg) scale(1.1)}30%{transform:translateY(-8px) rotate(8deg) scale(1.05)}45%{transform:translateY(-22px) rotate(-8deg) scale(1.12)}60%{transform:translateY(-10px) rotate(10deg) scale(1.08)}75%{transform:translateY(-20px) rotate(-6deg) scale(1.1)}90%{transform:translateY(-5px) rotate(4deg) scale(1.02)}}
  @keyframes vegDance2{0%,100%{transform:translateY(0) rotate(0deg) scale(1)}20%{transform:translateY(-20px) rotate(10deg) scale(1.1)}40%{transform:translateY(-6px) rotate(-12deg) scale(1.05)}60%{transform:translateY(-18px) rotate(8deg) scale(1.12)}80%{transform:translateY(-8px) rotate(-6deg) scale(1.06)}}
  @keyframes vegDance3{0%,100%{transform:translateY(0) rotate(0deg) scale(1)}25%{transform:translateY(-15px) rotate(-10deg) scale(1.08)}50%{transform:translateY(-25px) rotate(12deg) scale(1.15)}75%{transform:translateY(-10px) rotate(-8deg) scale(1.05)}}
  @keyframes badgePop{0%{opacity:0;transform:translateX(-50%) translateY(-20px) scale(.8)}60%{transform:translateX(-50%) translateY(4px) scale(1.05)}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
  @keyframes confettiSway{0%,100%{margin-left:0}50%{margin-left:20px}}
  .fu{animation:fadeUp .3s ease both}
  .correct-bounce{animation:correctBounce .4s ease}
  .wrong-shake{animation:wrongShake .4s ease}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--g2);border-radius:3px}
`;

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const Ctx = createContext(null);
const useApp = () => useContext(Ctx);

function Provider({ children }) {
  const ls = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const ss = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const [profile, setProf]   = useState(() => ls("ga_p", null));
  const [done, setDone]       = useState(() => ls("ga_d", []));
  const [badges, setBadges]   = useState(() => ls("ga_b", []));
  const [xp, setXP]           = useState(() => ls("ga_xp", 0));
  const [hearts, setHearts] = useState(() => {
    try {
      const today = new Date().toDateString();
      const lastH = localStorage.getItem("ga_hlast");
      if (lastH !== today) {
        localStorage.setItem("ga_h", "5");
        localStorage.setItem("ga_hlast", today);
        return 5;
      }
      const h = localStorage.getItem("ga_h");
      return h ? JSON.parse(h) : 5;
    } catch { return 5; }
  });
  const [streak, setStreak]   = useState(() => ls("ga_s", { count:0, last:null }));
  const [todayLessons, setTL] = useState(() => ls("ga_tl", { date:"", count:0 }));
  const [perfQuiz, setPerfQ]  = useState(() => ls("ga_pq", 0));
  const [clCount, setClCount] = useState(() => ls("ga_cl", 0));
  const [page, setPage]       = useState(() => {
    try { return localStorage.getItem("ga_p") ? "dashboard" : "home"; } catch { return "home"; }
  });
  const [lesson, setLesson]   = useState(null);
  const [course, setCourse]   = useState(null);
  const [toast, setToast]     = useState(null);
  const [xpAnim, setXpAnim]   = useState({ show:false, amount:0 });
  const [darkMode, setDarkModeState] = useState(() => ls("ga_dm", false));
  const [newBadge, setNewBadge]      = useState(null); // badge popup
  const [pageAnim, setPageAnim]      = useState(false); // page transition
  const [dailyDone, setDailyDone]    = useState(() => ls("ga_dd", { date:"", done:false, score:null }));
  const [emailCapture, setEmailCapture] = useState(() => ls("ga_ec", false));
  const [premium, setPremium]           = useState(() => ls("ga_prem", false));
  const [licenceKey, setLicenceKey]     = useState(() => ls("ga_lk", ""));

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkModeState(next);
    ss("ga_dm", next);
  };

  // Streak logic
  useEffect(() => {
    const today = new Date().toDateString();
    if (streak.last !== today) {
      const yd = new Date(); yd.setDate(yd.getDate() - 1);
      const c = streak.last === yd.toDateString() ? streak.count + 1 : 1;
      const ns = { count:c, last:today };
      setStreak(ns); ss("ga_s", ns);
      // Daily XP
      addXP(XP_VALUES.dailyVisit, false);
      // Streak badges
      if (c >= 3)  awardBadge("streak-3");
      if (c >= 7)  { awardBadge("streak-7");  addXP(XP_VALUES.streakSeven, false); }
      if (c >= 30) { awardBadge("streak-30"); addXP(XP_VALUES.streakThirty, false); }
    }
    // Refill hearts daily — always reset on new day
    const lastH = ls("ga_hlast", "");
    if (lastH !== today) {
      setHearts(5);
      ss("ga_h", 5);
      ss("ga_hlast", today);
    }
    // Safety — if hearts somehow stuck at 0 and last refill was today, still refill
    // (handles case where loseHeart was called after hlast was set)
    const currentHearts = ls("ga_h", 5);
    if (currentHearts <= 0 && lastH === today) {
      // Check if hlast was set more than 20 hours ago
      const lastHTime = ls("ga_hlast_time", 0);
      const now = Date.now();
      if (now - lastHTime > 20 * 60 * 60 * 1000) {
        setHearts(5); ss("ga_h", 5); ss("ga_hlast", today); ss("ga_hlast_time", now);
      }
    } else {
      ss("ga_hlast_time", Date.now());
    }
  }, []);

  const showToast = m => { setToast(m); setTimeout(() => setToast(null), 2800); };

  const addXP = (amount, animate = true) => {
    setXP(prev => { const n = prev + amount; ss("ga_xp", n); return n; });
    if (animate) { setXpAnim({ show:true, amount }); setTimeout(() => setXpAnim({ show:false, amount:0 }), 1500); }
  };

  const loseHeart = () => {
    setHearts(prev => { const n = Math.max(0, prev - 1); ss("ga_h", n); return n; });
  };
  const restoreHeart = () => {
    setHearts(prev => { const n = Math.min(5, prev + 1); ss("ga_h", n); return n; });
  };

  const awardBadge = id => setBadges(prev => {
    if (prev.includes(id)) return prev;
    const n = [...prev, id]; ss("ga_b", n);
    const b = BADGES.find(x => x.id === id);
    if (b) {
      setNewBadge(b);
      setTimeout(() => setNewBadge(null), 3500);
    }
    return n;
  });

  const completeLesson = (lid, earnedXP = 20) => {
    setDone(prev => {
      if (prev.includes(lid)) return prev;
      const n = [...prev, lid]; ss("ga_d", n);

      // Lesson badge mapping
      const bmap = {
        "l1-soil":"soil-expert","l1-containers":"container-king","l1-sunlight":"sun-chaser",
        "l1-tools":"tool-master","l1-seeds":"sow-and-grow",
      };
      if (bmap[lid]) setTimeout(() => awardBadge(bmap[lid]), 800);

      // First lesson badge
      if (n.length === 1) setTimeout(() => awardBadge("first-seed"), 400);

      // Level completion badges
      COURSES.forEach(c => {
        if (c.lessons.length > 0 && c.lessons.every(l => n.includes(l.id))) {
          const lb = { "level-1":"green-thumb","level-2":"easy-wins","level-3":"pro-grower","level-4":"all-seasons","level-5":"allotment-master" };
          if (lb[c.id]) { setTimeout(() => awardBadge(lb[c.id]), 1200); addXP(XP_VALUES.levelComplete, false); }
        }
      });

      // Full academy badge
      const totalLessons = COURSES.reduce((a, c) => a + c.lessons.length, 0);
      if (n.length === totalLessons) setTimeout(() => awardBadge("full-academy"), 1600);

      // Speed learner
      const today = new Date().toDateString();
      const tl = ls("ga_tl", { date:"", count:0 });
      const newCount = tl.date === today ? tl.count + 1 : 1;
      const newTL = { date:today, count:newCount };
      setTL(newTL); ss("ga_tl", newTL);
      if (newCount >= 3) setTimeout(() => awardBadge("speed-learner"), 1000);

      return n;
    });
    addXP(earnedXP);
  };

  const recordPerfectQuiz = () => {
    setPerfQ(prev => {
      const n = prev + 1; ss("ga_pq", n);
      if (n >= 5) awardBadge("quiz-whiz");
      return n;
    });
    addXP(XP_VALUES.perfectQuiz);
  };

  const recordChecklistComplete = () => {
    setClCount(prev => {
      const n = prev + 1; ss("ga_cl", n);
      if (n >= 10) awardBadge("checklist-champ");
      return n;
    });
    addXP(XP_VALUES.checklistComplete);
  };

  const unlockPremium = (key) => {
    setPremium(true);
    setLicenceKey(key);
    ss("ga_prem", true);
    ss("ga_lk", key);
  };

  const setProfile  = p => { setProf(p); ss("ga_p", p); };
  const haptic = (type = "light") => {
    if (navigator.vibrate) {
      navigator.vibrate(type === "light" ? 10 : type === "medium" ? 20 : 40);
    }
  };
  const navigate = (p, ex = {}) => {
    setPage(p);
    if (ex.lesson) setLesson(ex.lesson);
    if (ex.course) setCourse(ex.course);
    window.scrollTo(0, 0);
    haptic("light");
  };
  const reset = () => { localStorage.clear(); setProf(null); setDone([]); setBadges([]); setXP(0); setHearts(5); setStreak({ count:0, last:null }); setPremium(false); setLicenceKey(""); setPage("home"); };



  return (
    <Ctx.Provider value={{ profile, setProfile, done, completeLesson, badges, awardBadge, xp, addXP, hearts, loseHeart, restoreHeart, streak, page, navigate, lesson, course, reset, toast, recordPerfectQuiz, recordChecklistComplete, perfQuiz, clCount, darkMode, toggleDarkMode, newBadge, pageAnim, haptic, dailyDone, setDailyDone: (d) => { setDailyDone(d); ss("ga_dd", d); }, emailCapture, setEmailCapture: (v) => { setEmailCapture(v); ss("ga_ec", v); }, premium, licenceKey, unlockPremium }}>
      {children}
      <XPPopup amount={xpAnim.amount} visible={xpAnim.show}/>
      {toast && <div style={{ position:"fixed", bottom:80, left:"50%", transform:"translateX(-50%)", background:"#111", color:"#fff", padding:"12px 20px", borderRadius:999, fontWeight:700, fontSize:13, zIndex:9998, whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(0,0,0,.4)", animation:"fadeUp .3s ease" }}>{toast}</div>}
    </Ctx.Provider>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const { navigate } = useApp();
  const floaters = [
    { t:"5%",  l:"3%",  e:"🍅", s:60, a:"float",  d:"0s"   },
    { t:"7%",  r:"4%",  e:"🥕", s:50, a:"float3", d:".6s"  },
    { t:"40%", l:"2%",  e:"🥬", s:46, a:"float2", d:"1.1s" },
    { b:"20%", r:"3%",  e:"🧅", s:44, a:"float",  d:".4s"  },
  ];
  return (
    <div style={{ minHeight:"100vh" }}>
      {/* ── HERO ── */}
      <div style={{ background:"linear-gradient(170deg,#0f2206 0%,#1e3d0a 45%,#152b07 100%)", padding:"52px 28px 48px", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Gold glow */}
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,193,7,.1) 0%,transparent 70%)", pointerEvents:"none" }}/>

        {/* Floating veg */}
        {floaters.map((v,i) => (
          <div key={i} style={{ position:"absolute", top:v.t, left:v.l, right:v.r, bottom:v.b, fontSize:v.s, opacity:.22, animation:`${v.a} ${3.2+i*.4}s ${v.d} ease-in-out infinite`, pointerEvents:"none" }}>{v.e}</div>
        ))}

        <div style={{ position:"relative", zIndex:1, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
          {/* Brand badge */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36 }}>
            <VPILogo size={48}/>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em" }}>By {HOST} at</div>
              <div style={{ fontSize:15, color:"#fff", fontWeight:900 }}>{CHANNEL_NAME}</div>
            </div>
          </div>

          {/* Gold divider */}
          <div style={{ width:48, height:3, background:"linear-gradient(90deg,#FFD700,#FF8F00)", borderRadius:999, marginBottom:20 }}/>

          {/* Headline */}
          <h1 style={{ fontSize:46, fontWeight:900, color:"#fff", lineHeight:1.05, marginBottom:14, letterSpacing:"-.02em" }}>
            The Growers<br/>
            <span style={{ color:"#FFD700" }}>Academy</span>
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.6)", lineHeight:1.65, marginBottom:28, maxWidth:272 }}>
            Learn to grow your own veg in a fun, interactive way
          </p>

          {/* Veg row */}
          <div style={{ display:"flex", gap:14, marginBottom:36, justifyContent:"center" }}>
            {["🌱","🥬","🍅","🥕","🥒","👨‍🌾"].map((e,i) => (
              <span key={i} style={{ fontSize:32, filter:"drop-shadow(0 3px 6px rgba(0,0,0,.35))", animation:`float${i%3===0?"":(i%3===1?"2":"3")} ${3+i*.3}s ${i*.2}s ease-in-out infinite`, display:"inline-block" }}>{e}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:12 }}>
            <button className="btn blg" onClick={() => navigate("onboarding")} style={{ width:"100%", background:"linear-gradient(135deg,#FFD700,#FF8F00)", color:"#1a1a00", boxShadow:"0 8px 28px rgba(255,193,7,.45)", fontWeight:900 }}>
              🚀 Start Growing — It's Free
            </button>
            <button className="btn byt" onClick={() => navigate("videos")} style={{ width:"100%" }}>
              <YTIcon/> Browse Video Lessons
            </button>
          </div>

          {/* Trust line */}
          <div style={{ marginTop:24, fontSize:11, color:"rgba(255,255,255,.3)", fontWeight:600 }}>
            Free to start · Premium levels available · No account needed
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:"#fff", padding:"14px 20px", display:"flex", justifyContent:"space-around", borderBottom:"1px solid var(--cdk)" }}>
        {[{v:"37",l:"Lessons"},{v:"30",l:"Badges"},{v:"6",l:"Levels"},{v:"Free",l:"To Join"}].map((s,i) =>
          <div key={i} style={{ textAlign:"center" }}><div style={{ fontWeight:900, fontSize:20, color:"var(--g6)" }}>{s.v}</div><div style={{ fontSize:11, color:"var(--tl)", fontWeight:600 }}>{s.l}</div></div>)}
      </div>

      {/* Benefits */}
      <div style={{ padding:"28px 18px" }}>
        <h2 style={{ textAlign:"center", fontSize:19, fontWeight:900, marginBottom:4, color:"var(--g8)" }}>Why The Growers Academy?</h2>
        <p style={{ textAlign:"center", color:"var(--tl)", marginBottom:18, fontSize:13 }}>Real advice from {HOST}'s allotment, built for beginners</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11 }}>
          {[{e:"📖",t:"37 lessons",d:"Structured courses from beginner to pro"},{e:"📺",t:`${HOST}'s videos`,d:`Watch & learn from ${CHANNEL_NAME}`},{e:"⭐",t:"XP & Leagues",d:"Level up as your skills grow"},{e:"🌱",t:"Step by step",d:"From total beginner to confident grower"}].map((b,i) => (
            <div key={i} className="card fu" style={{ animationDelay:`${i*0.07}s`, textAlign:"center" }}>
              <div style={{ fontSize:26, marginBottom:7 }}>{b.e}</div>
              <div style={{ fontWeight:800, fontSize:13, marginBottom:4, color:"var(--g8)" }}>{b.t}</div>
              <div style={{ fontSize:12, color:"var(--tl)", lineHeight:1.4 }}>{b.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leagues preview */}
      <div style={{ padding:"0 18px 24px" }}>
        <h2 style={{ fontSize:16, fontWeight:800, marginBottom:4, color:"var(--g8)" }}>🏆 Climb the Leagues</h2>
        <p style={{ fontSize:13, color:"var(--tl)", marginBottom:14 }}>Earn XP as you learn and unlock new leagues</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {LEAGUES.map((l, i) => (
            <div key={l.id} className="card" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1px solid ${l.color}33` }}>
              <span style={{ fontSize:24 }}>{l.emoji}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:13, color:l.color }}>{l.name}</div>
                <div style={{ fontSize:11, color:"var(--tl)" }}>{l.minXP === 0 ? "Starting league" : `${l.minXP} XP needed`}</div>
              </div>
              {i === 0 && <span style={{ fontSize:11, background:"var(--g0)", color:"var(--g7)", padding:"3px 10px", borderRadius:999, fontWeight:700 }}>Start here</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Featured video */}
      <div style={{ padding:"0 18px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:13 }}>
          <VPILogo size={26}/><h2 style={{ fontSize:16, fontWeight:800, color:"var(--g8)" }}>Welcome to The Growers Academy</h2>
        </div>
        <div style={{ position:"relative", paddingTop:"56.25%", background:"#000", borderRadius:16, overflow:"hidden" }}>
          <iframe style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }} src="https://www.youtube.com/embed/tYjY0Zjpt8Y?rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Welcome to The Growers Academy"/>
        </div>
        <button className="btn bs bsm" style={{ width:"100%", marginTop:11 }} onClick={() => navigate("videos")}>View all video lessons →</button>
      </div>

      {/* About Glen */}
      <div style={{ padding:"0 18px 22px" }}>
        <div style={{ background:"linear-gradient(135deg,#0a1a05,#1a3a08)", borderRadius:24, padding:20 }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <VPILogo size={44}/>
            <div>
              <div style={{ color:"var(--g3)", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:".06em", marginBottom:4 }}>About your instructor</div>
              <h3 style={{ color:"#fff", fontWeight:800, fontSize:15, marginBottom:6 }}>Hi, I'm {HOST} 👋</h3>
              <p style={{ color:"rgba(255,255,255,.7)", fontSize:13, lineHeight:1.6 }}>I'm based on the South-West coast of the UK and run a site with 80 allotment plots. I share practical growing tips, allotment diaries and DIY projects on my YouTube channel.</p>
              <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FF0000", color:"#fff", borderRadius:999, padding:"7px 14px", fontSize:12, fontWeight:700, textDecoration:"none" }}><YTIcon/> YouTube</a>
                <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,.1)", color:"#fff", borderRadius:999, padding:"7px 14px", fontSize:12, fontWeight:700, textDecoration:"none" }}>🌱 Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding:"0 18px 14px", textAlign:"center" }}>
        <button className="btn bp blg" onClick={() => navigate("onboarding")} style={{ width:"100%", maxWidth:320 }}>🌱 Start Your Growing Journey</button>
        <p style={{ marginTop:11, fontSize:12, color:"var(--tmut)" }}>Free to use · No account required · 37 lessons</p>
      </div>
      <BrandFooter/>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function OnboardingPage() {
  const { setProfile, navigate, awardBadge } = useApp();
  const [termsAccepted, setTermsAccepted] = useState(() => {
    try { return localStorage.getItem("ga_terms") === "1"; } catch { return false; }
  });
  const [step, setStep] = useState(0);
  const [ans, setAns]   = useState({ space:[], experience:"", time:"", crops:[], goal:"" });

  const STEPS = [
    { id:"space", title:"What's your growing space?", sub:"Pick everything that applies", multi:true, opts:[{v:"garden",l:"Garden",e:"🌳"},{v:"greenhouse",l:"Greenhouse",e:"🏠"},{v:"raised-beds",l:"Raised Beds",e:"📦"},{v:"allotment",l:"Allotment",e:"🌾"},{v:"containers",l:"Containers",e:"🪴"},{v:"balcony",l:"Balcony/Patio",e:"🌇"},{v:"windowsill",l:"Windowsill",e:"🪟"}] },
    { id:"experience", title:"How much experience do you have?", sub:"Be honest — there's no wrong answer!", multi:false, opts:[{v:"beginner",l:"Total beginner",e:"🌱",d:"Never grown anything before"},{v:"some",l:"Some experience",e:"🌿",d:"Mixed results so far"},{v:"confident",l:"Fairly confident",e:"🌾",d:"I grow but want to improve"}] },
    { id:"time", title:"Time available each week?", sub:"Even 30 minutes is enough to grow great veg!", multi:false, opts:[{v:"30min",l:"Less than 30 mins",e:"⚡",d:"Quick and easy crops"},{v:"1hour",l:"30–60 minutes",e:"⏰",d:"A good range of crops"},{v:"2hours",l:"1–2 hours",e:"🌱",d:"Most crops possible"},{v:"more",l:"2+ hours",e:"🌾",d:"Go for it — grow everything!"}] },
    { id:"crops", title:"What do you want to grow?", sub:"Pick your favourites", multi:true, opts:[{v:"tomatoes",l:"Tomatoes",e:"🍅"},{v:"potatoes",l:"Potatoes",e:"🥔"},{v:"lettuce",l:"Salad",e:"🥬"},{v:"carrots",l:"Carrots",e:"🥕"},{v:"cucumbers",l:"Cucumbers",e:"🥒"},{v:"herbs",l:"Herbs",e:"🌿"},{v:"beans",l:"Beans",e:"🫘"},{v:"courgettes",l:"Courgettes",e:"🫑"},{v:"onions",l:"Onions",e:"🧅"},{v:"all-veg",l:"All Veg!",e:"🌈"}] },
    { id:"goal", title:"What's your main goal?", sub:"We'll personalise your path based on this", multi:false, opts:[{v:"save-money",l:"Save money",e:"💰",d:"Cut the grocery bill"},{v:"health",l:"Healthier food",e:"💚",d:"Know what's in my food"},{v:"skill",l:"Learn a new skill",e:"📚",d:"Personal development"},{v:"self-sufficient",l:"Self-sufficiency",e:"🏡",d:"Grow more of my own food"},{v:"enjoyment",l:"Enjoy gardening",e:"🌈",d:"It's my happy place"}] },
  ];

  const cur    = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const toggle = v => { if (cur.multi) { setAns(a => ({ ...a, [cur.id]: a[cur.id].includes(v) ? a[cur.id].filter(x => x !== v) : [...a[cur.id], v] })); } else { setAns(a => ({ ...a, [cur.id]: v })); } };
  const isSel  = v => { const val = ans[cur.id]; return Array.isArray(val) ? val.includes(v) : val === v; };
  const canNext= () => { const v = ans[cur.id]; return Array.isArray(v) ? v.length > 0 : !!v; };
  const next   = () => { if (!isLast) { setStep(s => s + 1); } else { const p = { ...ans, startedAt: new Date().toISOString(), recommendedLevel: ans.experience === "beginner" ? 1 : ans.experience === "some" ? 2 : 3 }; setProfile(p); awardBadge("planner"); navigate("welcome"); } };

  // ── TERMS SCREEN — shown before onboarding questions ──────────────────────
  if (!termsAccepted) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"var(--cream)" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1a3a08,#4e8226)", padding:"28px 18px 24px", textAlign:"center" }}>
        <VPILogo size={56}/>
        <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, marginTop:14, marginBottom:6 }}>Welcome to The Growers Academy</h1>
        <p style={{ color:"rgba(255,255,255,.7)", fontSize:14 }}>by {CHANNEL_NAME}</p>
      </div>

      <div style={{ flex:1, padding:"22px 18px", overflowY:"auto" }}>
        <p style={{ fontSize:14, fontWeight:700, color:"var(--td)", marginBottom:18, lineHeight:1.5 }}>
          Before we get started, please read and agree to our terms. It only takes a moment.
        </p>

        {/* Terms summary cards */}
        {[
          { icon:"🌱", title:"Growing Advice", body:"All growing advice is for general guidance only. Results vary based on your location, soil and climate. We accept no liability for crop losses or failures." },
          { icon:"🛒", title:"Affiliate Links", body:"Some lessons contain product recommendations with Amazon affiliate links. We earn a small commission if you buy — at no extra cost to you. We only recommend products Glen genuinely uses." },
          { icon:"🔒", title:"Your Data", body:"Your progress and profile are stored only on your device — never on our servers. We don't track you, use cookies, or collect personal data." },
          { icon:"💳", title:"Premium Content", body:"Levels 4, 5 and 6 require a one-time payment. No subscriptions, no recurring charges. Premium access never expires." },
        ].map((t, i) => (
          <div key={i} style={{ background:"#fff", borderRadius:16, padding:"14px 16px", marginBottom:12, display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ fontSize:22, flexShrink:0 }}>{t.icon}</div>
            <div>
              <div style={{ fontWeight:800, fontSize:14, marginBottom:4 }}>{t.title}</div>
              <p style={{ fontSize:12, color:"var(--tl)", lineHeight:1.6, margin:0 }}>{t.body}</p>
            </div>
          </div>
        ))}

        <div style={{ background:"#F1F8E9", border:"1px solid #C5E1A5", borderRadius:14, padding:"12px 14px", marginBottom:20, marginTop:4 }}>
          <p style={{ fontSize:12, color:"#2D5016", lineHeight:1.6, margin:0 }}>
            By tapping "I Agree & Continue" you confirm you have read and understood these terms. For the full legal information visit{" "}
            <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ color:"var(--g6)", fontWeight:700 }}>veggiepatchideas.co.uk</a>
            {" "}or email{" "}
            <a href={`${WEBSITE_URL}/contact`} target="_blank" rel="noopener noreferrer" style={{ color:"var(--g6)", fontWeight:700 }}>our contact form</a>
          </p>
        </div>

        <div style={{ paddingBottom:100 }}/>
      </div>

      {/* Sticky accept button */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, padding:"14px 18px 24px", background:"#fff", borderTop:"1px solid var(--cdk)", boxShadow:"0 -4px 20px rgba(0,0,0,.08)", zIndex:50 }}>
        <button className="btn bp blg" style={{ width:"100%", marginBottom:10 }} onClick={() => { localStorage.setItem("ga_terms","1"); setTermsAccepted(true); }}>
          ✅ I Agree & Continue
        </button>
        <button onClick={() => navigate("home")} style={{ width:"100%", border:"none", background:"none", color:"var(--tmut)", cursor:"pointer", fontSize:13, fontFamily:"var(--ff)", padding:8 }}>
          No thanks — go back
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{ background:"#fff", padding:"13px 18px", borderBottom:"1px solid var(--cdk)", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:9 }}>
          {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ border:"none", background:"var(--cream)", borderRadius:10, width:35, height:35, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:17 }}>←</button>}
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}><span style={{ fontSize:12, fontWeight:700, color:"var(--g6)" }}>Step {step+1} of {STEPS.length}</span><span style={{ fontSize:12, color:"var(--tmut)" }}>{Math.round((step/STEPS.length)*100)}%</span></div>
            <div className="pb"><div className="pf" style={{ width:`${(step/STEPS.length)*100}%` }}/></div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}><VPILogo size={20}/><span style={{ fontWeight:800, color:"var(--g8)", fontSize:13 }}>The Growers Academy</span></div>
      </div>

      <div style={{ flex:1, padding:"24px 18px", paddingBottom: canNext() ? 100 : 24 }} key={step}>
        <h2 style={{ fontSize:20, fontWeight:900, marginBottom:4, lineHeight:1.3 }}>{cur.title}</h2>
        <p style={{ color:"var(--tl)", fontSize:13, marginBottom:20 }}>{cur.sub}</p>
        <div style={{ display:"grid", gridTemplateColumns:cur.multi?"1fr 1fr":"1fr", gap:9 }}>
          {cur.opts.map(opt => { const sel = isSel(opt.v); return (
            <button key={opt.v} onClick={() => toggle(opt.v)} style={{ padding:"14px", border:`2px solid ${sel?"var(--g5)":"var(--cdk)"}`, borderRadius:16, background:sel?"var(--g0)":"#fff", cursor:"pointer", textAlign:"left", transition:"all .15s", transform:sel?"scale(1.02)":"scale(1)", fontFamily:"var(--ff)" }}>
              <div style={{ fontSize:cur.multi?26:27, marginBottom:5 }}>{opt.e}</div>
              <div style={{ fontWeight:800, fontSize:13, color:sel?"var(--g8)":"var(--td)", marginBottom:opt.d?3:0 }}>{opt.l}</div>
              {opt.d && <div style={{ fontSize:11, color:"var(--tl)", lineHeight:1.4 }}>{opt.d}</div>}
            </button>
          ); })}
        </div>
        {step === 0 && (
          <button style={{ width:"100%", marginTop:16, border:"none", background:"none", color:"var(--tmut)", cursor:"pointer", fontSize:13, fontFamily:"var(--ff)", padding:8 }} onClick={() => navigate("courses")}>
            Skip for now
          </button>
        )}
      </div>

      {/* Duolingo-style slide-up button — only appears after selection */}
      <div style={{
        position:"fixed",
        left:"50%",
        transform:"translateX(-50%)",
        width:"100%",
        maxWidth:480,
        padding:"14px 18px 24px",
        background:"#fff",
        borderTop:"1px solid var(--cdk)",
        boxShadow:"0 -4px 20px rgba(0,0,0,.08)",
        transition:"bottom .3s ease, opacity .3s ease",
        bottom: canNext() ? 0 : "-120px",
        opacity: canNext() ? 1 : 0,
        zIndex: 200,
      }}>
        <button className="btn bp blg" style={{ width:"100%" }} onClick={next}>
          {isLast ? "🌱 Create My Grower Profile" : "Next →"}
        </button>
      </div>
    </div>
  );
}

// ─── WELCOME PAGE ─────────────────────────────────────────────────────────────
function WelcomePage() {
  const { profile, navigate, xp } = useApp();
  if (!profile) { navigate("home"); return null; }
  const msgs = { "save-money":"You're going to save a bundle growing your own!", "health":"Homegrown food tastes better — and you'll know exactly what's in it.", "skill":"Gardening is one of the most rewarding skills you can learn!", "self-sufficient":"Growing your own food is incredibly empowering.", "enjoyment":"The garden is the best place in the world. Welcome home!" };
  const league = getLeague(xp);

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{ background:"linear-gradient(155deg,#0a1a05,#4e8226)", padding:"50px 24px 38px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ fontSize:52, marginBottom:12, animation:"pop .6s ease" }}>🎉</div>
        <h1 style={{ color:"#fff", fontSize:23, fontWeight:900, marginBottom:8 }}>Welcome to the Academy!</h1>
        <p style={{ color:"rgba(255,255,255,.82)", fontSize:15, lineHeight:1.5 }}>{msgs[profile.goal] || "Your growing journey starts now!"}</p>
        <div style={{ marginTop:16, display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.1)", borderRadius:999, padding:"7px 16px 7px 9px" }}>
          <VPILogo size={22}/><span style={{ color:"rgba(255,255,255,.8)", fontSize:12, fontWeight:700 }}>Powered by {CHANNEL_NAME}</span>
        </div>
      </div>
      <div style={{ padding:"20px 18px", flex:1 }}>
        {/* Starting league */}
        <div className="card" style={{ marginBottom:14, background:"linear-gradient(135deg,#FFF8E1,#FFFDE7)", border:`2px solid ${league.color}44`, textAlign:"center" }}>
          <div style={{ fontSize:42, marginBottom:6 }}>{league.emoji}</div>
          <div style={{ fontWeight:800, fontSize:16, color:league.color, marginBottom:3 }}>You're a {league.name}!</div>
          <div style={{ fontSize:13, color:"var(--tl)", marginBottom:10 }}>Complete lessons to earn XP and climb the leagues</div>
          <XPBar xp={xp}/>
        </div>

        <div className="card" style={{ marginBottom:12, border:"2px solid var(--g2)" }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:44, height:44, background:"var(--g6)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🗺️</div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:"var(--g6)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:3 }}>Your recommended path</div>
              <h3 style={{ fontSize:15, fontWeight:800, marginBottom:3 }}>Level {profile.recommendedLevel}: {["","Getting Started","Easy Wins","Grow Like a Pro"][profile.recommendedLevel]}</h3>
              <p style={{ fontSize:13, color:"var(--tl)", lineHeight:1.5 }}>Start here and work your way up through all 6 levels.</p>
            </div>
          </div>
        </div>

        {/* XP guide */}
        <div className="card" style={{ marginBottom:14 }}>
          <h3 style={{ fontSize:14, fontWeight:800, marginBottom:10 }}>⭐ How to earn XP</h3>
          {[{a:"Complete a lesson",x:"+20 XP"},{a:"Perfect quiz score",x:"+10 XP"},{a:"Watch a video",x:"+10 XP"},{a:"Daily visit",x:"+5 XP"},{a:"7-day streak",x:"+25 XP"}].map((r,i) =>
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:i<4?"1px solid var(--cdk)":"none" }}>
              <span style={{ fontSize:13, color:"var(--tm)" }}>{r.a}</span>
              <span style={{ fontSize:13, fontWeight:800, color:"var(--golddk)" }}>{r.x}</span>
            </div>)}
        </div>

        <button className="btn bp blg" style={{ width:"100%", marginBottom:10 }} onClick={() => navigate("dashboard")}>🚀 Go to My Dashboard</button>
        <button className="btn bs" style={{ width:"100%", marginBottom:10 }} onClick={() => navigate("courses")}>📚 Start My First Lesson</button>
        <button className="btn byt" style={{ width:"100%" }} onClick={() => navigate("videos")}><YTIcon/> Browse {HOST}'s Video Lessons</button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage() {
  const { profile, done, badges, streak, navigate, xp, hearts, dailyDone, emailCapture, setEmailCapture } = useApp();
  const IT = [{id:"t1",task:"Check soil moisture in all containers"},{id:"t2",task:"Look under leaves for pests"},{id:"t3",task:"Water seedlings in the morning"},{id:"t4",task:"Harden off any indoor seedlings"},{id:"t5",task:"Pull any visible weeds"}];
  const [tasks, setTasks] = useState(() => { try { const s = localStorage.getItem("ga_tasks"); return s ? JSON.parse(s) : IT.map(t => ({ ...t, done:false })); } catch { return IT.map(t => ({ ...t, done:false })); } });
  const toggleT = id => { const n = tasks.map(t => t.id === id ? { ...t, done:!t.done } : t); setTasks(n); try { localStorage.setItem("ga_tasks", JSON.stringify(n)); } catch {} };

  const total      = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const actualTotal= COURSES.filter(c=>!c.comingSoon).reduce((a,c) => a+c.lessons.length, 0);
  const pct        = actualTotal > 0 ? Math.round((done.length / actualTotal) * 100) : 0;
  const month      = new Date().toLocaleString("default", { month:"long" });
  const hour       = new Date().getHours();
  const greeting   = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const nextLesson = (() => { for (const c of COURSES) if (!c.comingSoon) for (const l of c.lessons) if (!done.includes(l.id)) return { c, l }; return null; })();
  const recentBadges = badges.slice(-3).map(id => BADGES.find(b => b.id === id)).filter(Boolean);
  const league     = getLeague(xp);

  return (
    <div>
      {/* Header */}
      <div style={{ background:"linear-gradient(155deg,#0a1a05,#4e8226)", padding:"20px 18px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,.04)" }}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
          <div>
            <div style={{ color:"rgba(255,255,255,.6)", fontSize:13, marginBottom:3 }}>{greeting} 👋</div>
            <div style={{ display:"flex", gap:6, marginBottom:6 }}>
              {(profile?.experience === "beginner"
                ? ["🌱","🌱","🌱"]
                : profile?.experience === "some"
                ? ["🌱","🥬","🍅"]
                : ["🍅","🥔","🌽","🧅","🥕"]
              ).map((e,i) => <span key={i} style={{ fontSize:22, filter:"drop-shadow(0 2px 4px rgba(0,0,0,.3))" }}>{e}</span>)}
            </div>
            <LeagueBadge xp={xp} small/>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
            <div style={{ background:"rgba(255,255,255,.1)", border:"2px solid rgba(255,255,255,.18)", borderRadius:13, padding:"9px 13px", textAlign:"center" }}>
              <div style={{ fontSize:19, animation:"streakFlame 2s infinite" }}>🔥</div>
              <div style={{ color:"#fff", fontWeight:900, fontSize:19, lineHeight:1 }}>{streak.count}</div>
              <div style={{ color:"rgba(255,255,255,.55)", fontSize:10, fontWeight:700 }}>streak</div>
            </div>
            <Hearts count={hearts}/>
          </div>
        </div>
        {/* XP bar */}
        <div style={{ marginTop:14, position:"relative" }}>
          <XPBar xp={xp}/>
        </div>
        {/* Progress */}
        <div style={{ marginTop:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}><span style={{ color:"rgba(255,255,255,.7)", fontSize:12, fontWeight:700 }}>Lessons completed</span><span style={{ color:"rgba(255,255,255,.9)", fontSize:12, fontWeight:800 }}>{done.length}/{actualTotal}</span></div>
          <div style={{ height:7, background:"rgba(255,255,255,.15)", borderRadius:999, overflow:"hidden" }}><div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,var(--g3),#AEEA00)", borderRadius:999, transition:"width .8s ease" }}/></div>
        </div>
      </div>

      <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:14 }}>
        {/* Streak warning */}
        {/* Daily Challenge Card */}
        {(() => {
          const today = new Date().toDateString();
          const isDailyDone = dailyDone.date === today && dailyDone.done;
          return (
            <button onClick={() => navigate("daily")} style={{ width:"100%", background: isDailyDone ? "var(--g0)" : "linear-gradient(135deg,#1a3a08,#2d5016)", border:`2px solid ${isDailyDone?"var(--g2)":"transparent"}`, borderRadius:16, padding:"14px 16px", display:"flex", gap:12, alignItems:"center", cursor:"pointer", fontFamily:"var(--ff)", textAlign:"left" }}>
              <div style={{ fontSize:28, flexShrink:0 }}>{isDailyDone ? "✅" : "🌱"}</div>
              <div style={{ flex:1 }}>
                <div style={{ color: isDailyDone ? "var(--g6)" : "#9CCC65", fontWeight:800, fontSize:12, marginBottom:2 }}>{isDailyDone ? "Daily Challenge — Complete!" : "🔥 Daily Challenge — New question!"}</div>
                <div style={{ color: isDailyDone ? "var(--tl)" : "rgba(255,255,255,.6)", fontSize:12 }}>{isDailyDone ? "Come back tomorrow for a new question" : "Answer today's question for +15 XP"}</div>
              </div>
              <div style={{ color: isDailyDone ? "var(--g4)" : "rgba(255,255,255,.4)", fontSize:16 }}>→</div>
            </button>
          );
        })()}

        {/* Email Capture — shown once before paywall */}
        {!emailCapture && done.length >= 3 && (
          <div style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e)", border:"1px solid rgba(255,215,0,.25)", borderRadius:18, overflow:"hidden" }}>
            {/* Product image */}
            <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAJYAlgDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAUDBAYHCAIBCf/EAF4QAAEDAwIDBAYEBwsHCQYGAwEAAgMEBREGEgchMQgTQVEUImFxkaEVMoGSI0JSU3KxwQkWFyQzNFRiorLRNTZDY3SCkyVVVpSjs8Lw8Rg3REVk4SY4c4PT5HWk0v/EABsBAQEBAQEBAQEAAAAAAAAAAAABAgMEBQYH/8QAOhEBAAIBAgQCBwUGBgMAAAAAAAERAgMEBRIhMUFRBhMUYXGBkTKhscHRFSIzUuHwBxYjU3LxQkOy/9oADAMBAAIRAxEAPwDstERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERfC5o6uA+1B9RUn1EDPrytHvKpPuFKz/AEmfdzRaldIrB91gH1Wud7lRfd/yIs+8qWVKVRQr7rOfqNa3381SfcKp3+k2+5LXllPr4XsHVzR9qxx9RO85dK77DhU3Oc76zi73lSzlZG+pp2HDpWj3lUX3GlacF5PuGVAolrywmX3WEH1WOd7lSfdzn1IQR7SotEtahfPulQT6oaB7RlILjKJ2umkxH4jwVirG/vkjsVfJECZGU0jm48w0kfqUspk8V0p5HbWyAn3q+Y4OGQudtG6sqam4Ma+QkE+a3zYpzNRscTnIW3NJIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIi+EgdSB70H1F4fNE0ZdI0D3qi+upWjPetPuKLS5RWL7pTAerud9mFSfdm49SJ2fapZUpNFDvu0pHqxtafflUX3GqcPrBvuCWvLKeXwuaOrgPeVjr6qoeMOlcVTdJI4Yc9xHtKlnKyN88LBl0jR9qpPr6Voz3oPu5rH0S15U0+6U4+qHO+zCpPu4/EiP2qKRLXlhIPusx+qxrfmqT7jVO/HDfcFaIpZUKr6mof9aV36lTc97vrPc73nK+IiiIiAiIgIiAE9ASgIo+53uzWuIzXO72+hjHV1TUsiA+1xCxG6cZ+FNtiMtTr6wvA8KepFQ74R7igz5FpK6dqPhBRwl9PdrjcXDoymt0gJ/4gYFiN17Y2kY4SbXpG+VUngKmWKAfFpf8AqSkuHTaLjW7dsm/SQltq0RbKWTwdU1kk4H2NDP1qIsva819Heqea8WixVNuDvw9PTQyRPc3x2vL3YPvBCtJzQ7hXmVgkjdG4Za8FpHmCqVvqoq6gp62Akw1ETZYyR1a4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kY3NY5oPreud6bR5D4IAAMAAc88kGn9Y6jraLWNBXsuMVnir7RQMrK9waWUUck8hc/18tGTtYC4EAvBOVjOkNb6hoqm30NLcqR1HNcJ6hj3NjY259/eatk5Y134RxDA1zWxcw57S7LSF0OQCCCAQeoKEAkEgZHT2IOfbRxXu9Za6yB2qKFlSfQaiGeV1LHJtmbMZI24JhjwYmgCZ5wXiN0ge5q3lpm4C7abtl0DnPFZRxVAc6ExE72B2SwklvX6uTjpkq/LWkYLQfsX1AREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z"
              alt="Vegetable Garden Planner Diary"
              style={{ width:"100%", display:"block", borderRadius:"0" }}
              onError={e => e.target.style.display="none"}
            />
            <div style={{ padding:"16px 18px 18px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,215,0,.15)", border:"1px solid rgba(255,215,0,.3)", borderRadius:999, padding:"3px 12px", marginBottom:10 }}>
                <span style={{ fontSize:12 }}>🎁</span>
                <span style={{ fontSize:10, fontWeight:800, color:"#FFD700", textTransform:"uppercase", letterSpacing:".08em" }}>Free with Premium</span>
              </div>
              <h3 style={{ color:"#fff", fontWeight:900, fontSize:16, marginBottom:6, lineHeight:1.3 }}>Get the Garden Planner Diary — Free!</h3>
              <p style={{ color:"rgba(255,255,255,.65)", fontSize:13, lineHeight:1.6, marginBottom:14 }}>
                Glen's month-by-month growing planner — what to sow, plant and harvest every week of the year. Yours <strong style={{ color:"#FFD700" }}>completely free</strong> when you unlock premium levels.
              </p>
              <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => { setEmailCapture(true); ss("ga_ec", true); }}
                style={{ display:"block", background:"linear-gradient(135deg,#FFD700,#FF8F00)", color:"#1a1a00", borderRadius:999, padding:"13px 18px", fontSize:14, fontWeight:900, textDecoration:"none", textAlign:"center", marginBottom:8 }}>
                🚀 Unlock Premium + Free Diary
              </a>
              <button onClick={() => { setEmailCapture(true); }} style={{ width:"100%", border:"none", background:"none", color:"rgba(255,255,255,.25)", fontSize:11, cursor:"pointer", fontFamily:"var(--ff)" }}>Maybe later</button>
            </div>
          </div>
        )}

        {/* Seasonal Banner */}
        {(() => {
          const month = new Date().getMonth(); // 0=Jan
          const seasonal = [
            { m:0,  icon:"🌱", msg:"January — Order your seeds now! Best varieties sell out fast.", link:"courses" },
            { m:1,  icon:"🌱", msg:"February — Sow chillies and peppers indoors. They need a head start!", link:"courses" },
            { m:2,  icon:"🌿", msg:"March — Start sowing tomatoes and onions. Spring is here!", link:"courses" },
            { m:3,  icon:"🍅", msg:"April — Plant out hardened seedlings. Check for late frosts!", link:"problems" },
            { m:4,  icon:"☀️", msg:"May — Last frost risk passes mid-May. Time to plant courgettes!", link:"courses" },
            { m:5,  icon:"💧", msg:"June — Water consistently and feed tomatoes every week.", link:"courses" },
            { m:6,  icon:"🥬", msg:"July — Harvest regularly and sow kale for winter. Keep picking!", link:"courses" },
            { m:7,  icon:"🌾", msg:"August — Stop tomato plants now. Sow spring onions and salads.", link:"courses" },
            { m:8,  icon:"🧅", msg:"September — Plant garlic this month. Clear summer beds.", link:"courses" },
            { m:9,  icon:"🍂", msg:"October — Plant garlic and spring bulbs. Harvest squash before frost.", link:"problems" },
            { m:10, icon:"❄️", msg:"November — Protect tender plants. Plan next year's grow!", link:"planner" },
            { m:11, icon:"📋", msg:"December — Review this year, plan next year and order seeds early!", link:"planner" },
          ];
          const tip = seasonal[month];
          return (
            <div onClick={() => navigate(tip.link)} style={{ background:"linear-gradient(135deg,#1a3a08,#2d5016)", borderRadius:16, padding:"14px 16px", display:"flex", gap:12, alignItems:"center", cursor:"pointer" }}>
              <div style={{ fontSize:28, flexShrink:0 }}>{tip.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ color:"var(--g3)", fontWeight:800, fontSize:10, textTransform:"uppercase", letterSpacing:".06em", marginBottom:3 }}>This month in the garden</div>
                <p style={{ color:"rgba(255,255,255,.85)", fontSize:13, lineHeight:1.5, fontWeight:600 }}>{tip.msg}</p>
              </div>
              <div style={{ color:"rgba(255,255,255,.4)", fontSize:18 }}>→</div>
            </div>
          );
        })()}


        {streak.count > 0 && streak.count < 7 && (
          <div style={{ background:"linear-gradient(135deg,#FFF3E0,#FFF8E1)", border:"2px solid #FFB74D", borderRadius:16, padding:"12px 16px", display:"flex", gap:12, alignItems:"center" }}>
            <span style={{ fontSize:28, animation:"streakFlame 2s infinite" }}>🔥</span>
            <div>
              <div style={{ fontWeight:800, fontSize:13, color:"#E65100" }}>{streak.count}-day streak! Keep it going!</div>
              <div style={{ fontSize:12, color:"#BF360C" }}>Come back tomorrow to keep your streak alive</div>
            </div>
          </div>
        )}

        {/* Next lesson */}
        {nextLesson && <div>
          <div className="sh"><h2 style={{ fontSize:15, fontWeight:800 }}>Continue learning</h2><button className="btn bgh bsm" onClick={() => navigate("courses")}>See all</button></div>
          <div className="card tap" onClick={() => navigate("lesson", { lesson:nextLesson.l, course:nextLesson.c })} style={{ background:"linear-gradient(135deg,var(--g0),#fff)", border:"2px solid var(--g2)" }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ flexShrink:0 }}><LessonIcon lessonId={nextLesson.l.id} size={52} fallbackEmoji={nextLesson.l.emoji}/></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, fontWeight:700, color:nextLesson.c.color, textTransform:"uppercase", letterSpacing:".05em", marginBottom:2 }}>{nextLesson.c.title}</div>
                <div style={{ fontWeight:800, fontSize:14, marginBottom:3 }}>{nextLesson.l.title}</div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:11, color:"var(--tmut)" }}>⏱ {nextLesson.l.dur}</span>
                  <span style={{ fontSize:10, background:"linear-gradient(135deg,var(--gold),var(--golddk))", color:"#111", padding:"2px 8px", borderRadius:999, fontWeight:700 }}>+{nextLesson.l.xp} XP</span>
                  {nextLesson.l.vk && MY_VIDEOS[nextLesson.l.vk] && <span style={{ fontSize:9, background:"#FFEBEE", color:"#FF0000", padding:"2px 6px", borderRadius:999, fontWeight:700 }}>📺 Video</span>}
                </div>
              </div>
              <div style={{ fontSize:17, color:"var(--g5)" }}>→</div>
            </div>
          </div>
        </div>}

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
          {[{e:"📚",v:done.length,l:"Done"},{e:"⭐",v:xp,l:"XP"},{e:"🏅",v:badges.length,l:"Badges"},{e:"❤️",v:hearts,l:"Hearts"}].map((s,i) =>
            <div key={i} className="card" style={{ textAlign:"center", padding:"11px 6px" }}>
              <div style={{ fontSize:18, marginBottom:3 }}>{s.e}</div>
              <div style={{ fontWeight:900, fontSize:17, color:"var(--g7)" }}>{s.v}</div>
              <div style={{ fontSize:9, color:"var(--tmut)", fontWeight:600 }}>{s.l}</div>
            </div>)}
        </div>

        {/* Tasks */}
        <div>
          <div className="sh"><h2 style={{ fontSize:15, fontWeight:800 }}>This week's tasks</h2><span style={{ fontSize:13, fontWeight:700, color:"var(--g6)" }}>{tasks.filter(t=>t.done).length}/{tasks.length}</span></div>
          <div className="card">
            {tasks.filter(t=>t.done).length === tasks.length && <div style={{ textAlign:"center", padding:"11px 0", background:"var(--g0)", borderRadius:11, marginBottom:10 }}><div style={{ fontSize:24, marginBottom:3 }}>🎉</div><div style={{ fontWeight:800, color:"var(--g7)", fontSize:12 }}>All tasks done!</div></div>}
            {tasks.map(t => <div key={t.id} className="crow" onClick={() => toggleT(t.id)}><div className={`ccirc${t.done?" on":""}`}>{t.done && "✓"}</div><span style={{ fontSize:13, fontWeight:600, color:t.done?"var(--tmut)":"var(--td)", textDecoration:t.done?"line-through":"none" }}>{t.task}</span></div>)}
            <button className="btn bs bsm" style={{ width:"100%", marginTop:10 }} onClick={() => navigate("planner")}>📅 Open Full Planner</button>
          </div>
        </div>

        {/* Recent badges */}
        {recentBadges.length > 0 && <div>
          <div className="sh"><h2 style={{ fontSize:15, fontWeight:800 }}>Recent badges</h2><button className="btn bgh bsm" onClick={() => navigate("progress")}>All {badges.length}</button></div>
          <div style={{ display:"flex", gap:10 }}>{recentBadges.map(b => <div key={b.id} className="card" style={{ flex:1, textAlign:"center", padding:"11px 8px" }}><div style={{ fontSize:22, marginBottom:3 }}>{b.e}</div><div style={{ fontSize:10, fontWeight:800, lineHeight:1.2 }}>{b.t}</div></div>)}</div>
        </div>}

        {/* Quick access */}
        <div>
          <h2 style={{ fontSize:15, fontWeight:800, marginBottom:10 }}>Quick access</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[{e:"📺",l:"Video Lessons",p:"videos",bg:"#FFEBEE",bd:"#FFCDD2"},{e:"📅",l:"Monthly Planner",p:"planner",bg:"var(--g0)",bd:"var(--g2)"},{e:"🔍",l:"Problem Solver",p:"problems",bg:"#FFF8E1",bd:"#FFE082"},{e:"⭐",l:"My Progress",p:"progress",bg:"#FFF3E0",bd:"#FFCC80"}].map(lnk =>
              <button key={lnk.p} onClick={() => navigate(lnk.p)} style={{ background:lnk.bg, border:`2px solid ${lnk.bd}`, borderRadius:17, padding:"14px 12px", cursor:"pointer", textAlign:"center", fontFamily:"var(--ff)", transition:"all .2s" }}>
                <div style={{ fontSize:25, marginBottom:5 }}>{lnk.e}</div><div style={{ fontSize:12, fontWeight:700 }}>{lnk.l}</div>
              </button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COURSES PAGE ─────────────────────────────────────────────────────────────
function CoursesPage() {
  const { navigate, done, xp, premium } = useApp();
  const actualTotal = COURSES.filter(c=>!c.comingSoon).reduce((a,c) => a+c.lessons.length, 0);

  return (
    <div style={{ padding:"18px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <h1 style={{ fontSize:21, fontWeight:900, marginBottom:4 }}>📚 The Academy</h1>
        <p style={{ fontSize:13, color:"var(--tl)" }}>{done.length} of {actualTotal} lessons complete</p>
        <div className="pb" style={{ marginTop:8 }}><div className="pf" style={{ width:`${actualTotal>0?(done.length/actualTotal)*100:0}%` }}/></div>
        <div style={{ marginTop:8 }}><LeagueBadge xp={xp} small/></div>
      </div>

      {COURSES.map((c, ci) => {
        const cDone    = c.lessons.filter(l => done.includes(l.id)).length;
        const pct      = c.lessons.length > 0 ? Math.round((cDone/c.lessons.length)*100) : 0;
        const isPremium = !c.free;
        const isUnlockedByPremium = isPremium && premium;
        const unlocked  = !c.comingSoon && (!isPremium || isUnlockedByPremium) && (ci === 0 || COURSES.slice(0,ci).filter(x=>!x.comingSoon&&(!x.free||premium)).every(x => x.lessons.every(l => done.includes(l.id))));

        // ── PREMIUM LEVEL ────────────────────────────────────────────────────
        if (isPremium && !isUnlockedByPremium) return (
          <div key={c.id} style={{ marginBottom:20 }}>
            <div style={{ background:"linear-gradient(135deg,#1a0a00,#3E1F00)", border:"2px solid #FF8F0044", borderRadius:22, padding:18, overflow:"hidden", position:"relative" }}>
              <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,143,0,.08)" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14, position:"relative" }}>
                <div style={{ width:50, height:50, background:"linear-gradient(135deg,#FF8F00,#E65100)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>👨‍🌾</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em", color:"#FF8F00" }}>Level {c.level}</div>
                    <span style={{ fontSize:9, background:"linear-gradient(135deg,var(--gold),var(--golddk))", color:"#111", padding:"2px 8px", borderRadius:999, fontWeight:800 }}>PREMIUM</span>
                  </div>
                  <h2 style={{ fontSize:16, fontWeight:900, color:"#fff", marginBottom:2 }}>{c.title}</h2>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,.6)", lineHeight:1.4 }}>{c.desc}</p>
                </div>
              </div>
              {/* Lesson previews — locked */}
              <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:16 }}>
                {c.lessons.map((l,li) => (
                  <div key={l.id} style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,.06)", borderRadius:12, padding:"10px 12px" }}>
                    <div style={{ width:34, height:34, background:"rgba(255,143,0,.2)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{l.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:12, color:"rgba(255,255,255,.8)" }}>{l.title}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>⏱ {l.dur} · +{l.xp} XP</div>
                    </div>
                    <span style={{ fontSize:14, opacity:.4 }}>🔒</span>
                  </div>
                ))}
              </div>
              {/* Paywall CTA */}
              <div style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,143,0,.3)", borderRadius:16, padding:"18px" }}>
                <div style={{ textAlign:"center", marginBottom:16 }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>🔓</div>
                  <h3 style={{ color:"#fff", fontWeight:900, fontSize:16, marginBottom:6 }}>Unlock Premium — Levels 4, 5 & 6</h3>
                  <p style={{ color:"rgba(255,255,255,.6)", fontSize:12, lineHeight:1.5 }}>One payment · Lifetime access · 19 advanced lessons</p>
                </div>
                {/* Selling points */}
                <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:16 }}>
                  {[
                    ["🗓️","Grow All Year Round","Never have a bare plot again — plan across all four seasons"],
                    ["🏡","Allotment Manager Insights","Crop rotation, no-dig, composting and more — with real advice from an experienced allotment site manager"],
                    ["👨‍🌾","Glen's Expert Secrets","20+ years of growing wisdom in 7 exclusive lessons"],
                    ["📔","Free Garden Planner Diary","Get our bestselling Vegetable Garden Planner Diary completely free when you go premium — worth £9.99!"],
                    ["💰","Save Money Growing","Which crops save the most — and how to grow them for almost free"],
                  ].map(([emoji, title, desc]) => (
                    <div key={title} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <div style={{ width:34, height:34, background:"rgba(255,143,0,.15)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{emoji}</div>
                      <div>
                        <div style={{ color:"#fff", fontWeight:800, fontSize:13 }}>{title}</div>
                        <div style={{ color:"rgba(255,255,255,.55)", fontSize:12, lineHeight:1.4 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" style={{ display:"block", background:"linear-gradient(135deg,var(--gold),var(--golddk))", color:"#111", borderRadius:999, padding:"14px 20px", fontSize:15, fontWeight:900, textDecoration:"none", textAlign:"center" }}>
                    💰 Unlock All 3 Premium Levels
                  </a>
                  <button onClick={() => navigate("unlock")} style={{ border:"none", background:"none", color:"rgba(255,255,255,.5)", fontSize:12, cursor:"pointer", fontFamily:"var(--ff)", textDecoration:"underline", padding:"4px 0" }}>
                    Already bought? Enter licence key →
                  </button>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", textAlign:"center" }}>One-time payment · Lifetime access · Never expires</div>
                </div>
              </div>
            </div>
          </div>
        );

        // ── FREE LEVELS ──────────────────────────────────────────────────────
        return (
          <div key={c.id} style={{ marginBottom:20 }}>
            <div style={{ background:unlocked?`${c.color}16`:c.comingSoon?"#f5f5f5":"var(--cdk)", border:`2px solid ${unlocked?c.color+"44":"var(--cdk)"}`, borderRadius:22, padding:15, marginBottom:c.lessons.length>0&&unlocked?8:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ flexShrink:0, opacity:unlocked?1:.5, filter:unlocked?"none":"grayscale(100%)" }}>
                  {c.comingSoon
                    ? <div style={{ width:50,height:50,background:"#ccc",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>🔜</div>
                    : <LevelIcon levelId={c.id} size={50}/>
                  }
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em", color:unlocked?c.color:"var(--tmut)" }}>Level {c.level}</div>
                    {c.comingSoon && <span style={{ fontSize:9, background:"var(--g0)", color:"var(--g7)", padding:"2px 8px", borderRadius:999, fontWeight:700 }}>Coming soon</span>}
                  </div>
                  <h2 style={{ fontSize:15, fontWeight:900, marginBottom:2, color:unlocked?"var(--td)":"var(--tmut)" }}>{c.title}</h2>
                  <p style={{ fontSize:12, color:"var(--tl)", lineHeight:1.4 }}>{c.desc}</p>
                </div>
              </div>
              {unlocked && c.lessons.length > 0 && <div style={{ marginTop:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:11, fontWeight:700, color:"var(--tl)" }}>{cDone}/{c.lessons.length} lessons</span><span style={{ fontSize:11, fontWeight:700, color:c.color }}>{pct}%</span></div>
                <div style={{ height:5, background:"#eee", borderRadius:999, overflow:"hidden" }}><div style={{ height:"100%", width:`${pct}%`, background:c.color, borderRadius:999 }}/></div>
              </div>}
              {!unlocked && !c.comingSoon && <div style={{ marginTop:7, fontSize:12, color:"var(--tmut)", fontWeight:600, textAlign:"center" }}>🔒 Complete Level {c.level-1} to unlock</div>}
            </div>
            {unlocked && <div style={{ display:"flex", flexDirection:"column", gap:7, paddingLeft:6 }}>
              {c.lessons.map(l => { const isDone = done.includes(l.id); return (
                <button key={l.id} className="card tap" onClick={() => navigate("lesson", { lesson:l, course:c })} style={{ display:"flex", alignItems:"center", gap:11, border:`1px solid ${isDone?"var(--g2)":"var(--cdk)"}`, background:isDone?"var(--g0)":"#fff", padding:"12px 14px", textAlign:"left", fontFamily:"var(--ff)" }}>
                  <div style={{ flexShrink:0, position:"relative" }}>
                    <LessonIcon lessonId={l.id} size={42} fallbackEmoji={l.emoji}/>
                    {isDone && <div style={{ position:"absolute", inset:0, borderRadius:42*0.26, background:"rgba(46,125,50,.8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"white", fontWeight:900 }}>✓</div>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:13, marginBottom:2, color:isDone?"var(--g8)":"var(--td)" }}>{l.title}</div>
                    <div style={{ display:"flex", gap:7, alignItems:"center" }}>
                      <span style={{ fontSize:11, color:"var(--tmut)" }}>⏱ {l.dur}</span>
                      <span style={{ fontSize:9, background:"linear-gradient(135deg,#FFF8E1,#FFF3E0)", color:"var(--golddk)", padding:"2px 6px", borderRadius:999, fontWeight:700 }}>+{l.xp} XP</span>
                      {l.vk&&MY_VIDEOS[l.vk]&&<span style={{ fontSize:9, background:"#FFEBEE", color:"#FF0000", padding:"2px 6px", borderRadius:999, fontWeight:700 }}>📺 Live</span>}
                      {l.vk&&!MY_VIDEOS[l.vk]&&<span style={{ fontSize:9, background:"var(--cdk)", color:"var(--tmut)", padding:"2px 6px", borderRadius:999, fontWeight:700 }}>📺 Soon</span>}
                    </div>
                  </div>
                  {isDone ? <span style={{ color:"var(--g5)", fontWeight:800, fontSize:11 }}>Done ✓</span> : <span style={{ color:"var(--tmut)", fontSize:16 }}>→</span>}
                </button>
              ); })}
            </div>}
          </div>
        );
      })}
    </div>
  );
}

// ─── LESSON PAGE ──────────────────────────────────────────────────────────────
function LessonPage() {
  const { lesson, course, navigate, done, completeLesson, awardBadge, badges, hearts, loseHeart, restoreHeart, recordPerfectQuiz, recordChecklistComplete, addXP, haptic } = useApp();

  // ── Checklist state ─────────────────────────────────────────────────────────
  const [checked, setChecked] = useState(() => {
    try { const s = localStorage.getItem("ga_ck_" + (lesson?.id||"")); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [checklistDone, setChecklistDone] = useState(() => {
    try { return localStorage.getItem("ga_ckd_" + (lesson?.id||"")) === "1"; } catch { return false; }
  });
  const [showXP, setShowXP] = useState(() => {
    try { return localStorage.getItem("ga_ckd_" + (lesson?.id||"")) === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { const s = localStorage.getItem("ga_ck_" + (lesson?.id||"")); setChecked(s ? JSON.parse(s) : {}); } catch { setChecked({}); }
    const done = localStorage.getItem("ga_ckd_" + (lesson?.id||"")) === "1";
    setChecklistDone(done);
    setShowXP(done);
  }, [lesson?.id]);

  // ── Quiz state — clean rebuild ──────────────────────────────────────────────
  const [quizComplete, setQuizComplete] = useState(() => {
    try { return localStorage.getItem("ga_qc_" + (lesson?.id||"")) === "1"; } catch { return false; }
  });
  // Keep quizComplete in sync with localStorage in case re-renders reset it
  const isQuizDone = quizComplete || (() => { try { return localStorage.getItem("ga_qc_" + (lesson?.id||"")) === "1"; } catch { return false; } })();
  const [quizAnswers, setQuizAnswers]   = useState(() => {
    try { const s = localStorage.getItem("ga_qa_" + (lesson?.id||"")); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [celebrating, setCelebrating]   = useState(false);
  const [lifelineUsed, setLifelineUsed] = useState(() => {
    try { return localStorage.getItem("ga_ll_" + (lesson?.id||"")) === "1"; } catch { return false; }
  });

  const handleQuizComplete = (answers, heartsLost = 0) => {
    setQuizAnswers(answers);
    setQuizComplete(true);
    try { localStorage.setItem("ga_qc_" + lesson.id, "1"); } catch {}
    try { localStorage.setItem("ga_qa_" + lesson.id, JSON.stringify(answers)); } catch {}
    setTimeout(() => {
      const el = document.getElementById("quiz-results");
      if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
    }, 400);
    setTimeout(() => {
      const score = answers.filter(a => a.correct).length;
      if (score > 0) addXP(score * 10);
      for (let i = 0; i < heartsLost; i++) { if (loseHeart) loseHeart(); }
      if (score === quizzes.length) recordPerfectQuiz();
    }, 800);
  };

  if (!lesson || !course) { navigate("courses"); return null; }

  const isDone    = done.includes(lesson.id);
  const quizzes   = Array.isArray(lesson.quiz) ? lesson.quiz : lesson.quiz ? [lesson.quiz] : [];
  
  
  
  const quizScore = quizAnswers.filter(a => a.correct).length;

  // Progress bar steps
  const hasChecklist = lesson.cl && lesson.cl.length > 0;
  const hasQuiz      = quizzes.length > 0;
  const progressSteps = ["Read", hasChecklist && "Action", hasQuiz && "Quiz", "Done"].filter(Boolean);
  const checklistAllDone = hasChecklist && lesson.cl.every((_, i) => !!checked[i]);
  const currentStep = isQuizDone || isDone
    ? progressSteps.length - 1
    : checklistAllDone && hasQuiz ? progressSteps.indexOf("Quiz")
    : checklistAllDone ? 1 : 0;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleCheck = i => {
    setChecked(prev => {
      const n = { ...prev, [i]: !prev[i] };
      try { localStorage.setItem("ga_ck_" + lesson.id, JSON.stringify(n)); } catch {}
      const allDone = lesson.cl.every((_, j) => !!n[j]);
      if (allDone && !checklistDone) {
        try { localStorage.setItem("ga_ckd_" + lesson.id, "1"); } catch {}
        setChecklistDone(true);
        // Delay XP/badge calls so render completes first
        setTimeout(() => {
          recordChecklistComplete();
          setTimeout(() => setShowXP(true), 600);
        }, 50);
      }
      return n;
    });
  };



  const handleComplete = () => {
    completeLesson(lesson.id, lesson.xp || 20);
    const isLastInLevel = course.lessons[course.lessons.length - 1].id === lesson.id;
    setCelebrating(true);
    setTimeout(() => {
      setCelebrating(false);
      if (isLastInLevel) navigate("level-complete", { course });
      else navigate("courses");
    }, 2400);
  };

  const handleVid = () => { if (!badges.includes("glens-student")) { awardBadge("glens-student"); addXP(10); } };

  // ── Celebration overlay ─────────────────────────────────────────────────────
  if (celebrating) return (
    <div style={{ position:"fixed", inset:0, background:"linear-gradient(135deg,#1a3a08,#4e8226)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <div style={{ fontSize:80, animation:"pop .5s ease", marginBottom:20 }}>🎉</div>
      <div style={{ color:"#fff", fontSize:24, fontWeight:900 }}>Lesson Complete!</div>
      <div style={{ color:"rgba(255,255,255,.7)", fontSize:16, marginTop:8 }}>+{lesson.xp} XP earned!</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh" }}>
      {/* ── HEADER ── */}
      <div style={{ background:`linear-gradient(135deg,${course.color}CC,${course.color})`, padding:"16px 18px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <button onClick={() => navigate("courses")} style={{ border:"none", background:"rgba(255,255,255,.15)", borderRadius:10, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:17, color:"#fff" }}>←</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:9, color:"rgba(255,255,255,.55)", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em" }}>{course.title}</div>
            <div style={{ color:"#fff", fontSize:13, fontWeight:800, marginTop:1 }}>{lesson.emoji} {lesson.title}</div>
          </div>
          <span style={{ background:"rgba(255,255,255,.2)", color:"#fff", padding:"4px 10px", borderRadius:999, fontSize:11, fontWeight:800 }}>+{lesson.xp} XP</span>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:8 }}>
          <span style={{ color:"rgba(255,255,255,.65)", fontSize:11 }}>⏱ {lesson.dur}</span>
          {lesson.vk && <span style={{ background:"rgba(255,255,255,.18)", color:"#fff", padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:700 }}>📺 {MY_VIDEOS[lesson.vk]?"Video included":"Video coming soon"}</span>}
        </div>
        {/* Progress bar */}
        <div style={{ display:"flex", gap:4 }}>
          {progressSteps.map((step, i) => (
            <div key={step} style={{ flex:1 }}>
              <div style={{ height:3, borderRadius:999, background: i <= currentStep ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.25)", transition:"background .3s", marginBottom:3 }}/>
              <div style={{ fontSize:9, fontWeight:700, color: i <= currentStep ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.4)", textAlign:"center" }}>{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:14 }}>

        {/* Video */}
        {lesson.vk && MY_VIDEOS[lesson.vk] && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9 }}>
              <div style={{ width:22, height:22, background:"#FF0000", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="9" height="9" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></div>
              <h2 style={{ fontSize:13, fontWeight:800 }}>{HOST}'s video — watch first!</h2>
            </div>
            <YTPlayer videoKey={lesson.vk} onPlay={handleVid}/>
          </div>
        )}

        {/* Lesson content */}
        <div className="card">
          <h2 style={{ fontSize:15, fontWeight:800, marginBottom:10, color:"var(--g8)" }}>📖 {lesson.title}</h2>
          <p style={{ fontSize:13, color:"var(--tm)", lineHeight:1.8, marginBottom:10 }}>{lesson.intro}</p>
          {lesson.steps && lesson.steps.map((s,i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"var(--g1)", border:"2px solid var(--g3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"var(--g7)", flexShrink:0, marginTop:1 }}>{typeof s === "string" ? i+1 : s.n}</div>
              <p style={{ fontSize:13, color:"var(--tm)", lineHeight:1.7 }}>{typeof s === "string" ? s : s.d}</p>
            </div>
          ))}
          {lesson.tip && <div className="tip" style={{ marginTop:8 }}><strong>💡 Glen's tip:</strong> {lesson.tip}</div>}
          {lesson.mistakes && <div style={{ background:"#FFF3E0", border:"1px solid #FFCC80", borderRadius:12, padding:"12px 14px", marginTop:8 }}>
            <div style={{ fontWeight:800, fontSize:13, color:"#E65100", marginBottom:6 }}>⚠️ Common mistakes</div>
            {lesson.mistakes.map((m,i) => <div key={i} style={{ display:"flex", gap:6, marginBottom:4 }}><span style={{ color:"#FF7043", flexShrink:0 }}>•</span><span style={{ fontSize:12, color:"#BF360C", lineHeight:1.5 }}>{m}</span></div>)}
          </div>}
        </div>

        {/* Checklist */}
        {lesson.cl && lesson.cl.length > 0 && (
          <div className="card">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <h2 style={{ fontSize:14, fontWeight:800 }}>✅ Action checklist</h2>
              <span style={{ fontSize:11, color:"var(--tl)" }}>{Object.values(checked).filter(Boolean).length}/{lesson.cl.length}</span>
            </div>
            {lesson.cl.map((item, i) => {
              const ticked = !!checked[i];
              return (
                <div key={i} onClick={() => handleCheck(i)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom: i < lesson.cl.length-1 ? "1px solid var(--cdk)" : "none", cursor:"pointer" }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${ticked?"var(--g5)":"var(--cdk)"}`, background:ticked?"var(--g5)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", flexShrink:0, transition:"all .2s" }}>
                    {ticked && "✓"}
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, textDecoration:ticked?"line-through":"none", color:ticked?"var(--tmut)":"var(--td)", flex:1, lineHeight:1.5, transition:"all .2s" }}>{item}</span>
                </div>
              );
            })}
            {showXP && <div style={{ textAlign:"center", padding:"12px 0 4px", fontSize:13, color:"var(--g6)", fontWeight:800 }}>✅ All done! +15 XP earned 🌟</div>}
          </div>
        )}

        {/* ── QUIZ — fully rebuilt ── */}

        {/* Quiz widget */}
        {quizzes.length > 0 && !isQuizDone && (
          <QuizWidget quizzes={quizzes} lessonId={lesson.id} hearts={hearts} loseHeart={loseHeart} onComplete={handleQuizComplete}/>
        )}

        {/* Quiz complete results */}
        {isQuizDone && (
          <QuizWidget quizzes={quizzes} lessonId={lesson.id} hearts={hearts} loseHeart={loseHeart} onComplete={handleQuizComplete}/>
        )}

        {/* After quiz complete — complete button + share + next lesson */}
        {isQuizDone && (() => {
          const lessonIndex = course.lessons.findIndex(l => l.id === lesson.id);
          const nextLesson  = course.lessons[lessonIndex + 1];
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {!isDone
                ? <button className="btn bp blg" style={{ width:"100%", fontSize:16 }} onClick={handleComplete}>✅ Mark Lesson Complete — +{lesson.xp} XP</button>
                : <div style={{ textAlign:"center", padding:14, background:"#E8F5E9", border:"2px solid #4CAF50", borderRadius:16, fontSize:14, fontWeight:800, color:"#2E7D32" }}>✅ Lesson Complete!</div>
              }
              <div style={{ background:"#fff", border:"1px solid var(--cdk)", borderRadius:16, padding:"14px 16px", textAlign:"center" }}>
                <p style={{ fontSize:12, color:"var(--tl)", marginBottom:10, fontWeight:600 }}>🌱 Share your progress!</p>
                <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
                  <a href={`https://twitter.com/intent/tweet?text=Just+completed+${encodeURIComponent(lesson?.title||"")}+on+The+Growers+Academy+by+${encodeURIComponent(CHANNEL_NAME)}!+🌱+${encodeURIComponent(WEBSITE_URL)}`} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#000", color:"#fff", borderRadius:999, padding:"8px 16px", fontSize:13, fontWeight:700, textDecoration:"none" }}>𝕏 Share</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(WEBSITE_URL)}`} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#1877F2", color:"#fff", borderRadius:999, padding:"8px 16px", fontSize:13, fontWeight:700, textDecoration:"none" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</a>
                </div>
              </div>
              {nextLesson && null}
            </div>
          );
        })()}

        {/* Affiliate products */}
        {(() => {
          const products = (LESSON_PRODUCTS[lesson.id] || []).map(k => AFFILIATE_PRODUCTS[k]).filter(Boolean);
          if (!products.length) return null;
          return (
            <div style={{ background:"#fff", border:"1px solid var(--cdk)", borderRadius:20, padding:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <div style={{ fontSize:20 }}>🛒</div>
                <div>
                  <h2 style={{ fontSize:14, fontWeight:900 }}>Recommended kit</h2>
                  <p style={{ fontSize:11, color:"var(--tl)" }}>Handpicked by Glen · Affiliate links help support this free app · Opens in Amazon</p>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {products.map((p,i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer sponsored"
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"var(--cream)", borderRadius:14, textDecoration:"none", border:"1px solid var(--cdk)" }}>
                    <div style={{ width:40, height:40, background:"linear-gradient(135deg,#FF9900,#FF6600)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>📦</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:800, fontSize:13, color:"var(--td)", marginBottom:2 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:"var(--tl)", lineHeight:1.4 }}>{p.why}</div>
                      <div style={{ fontSize:10, background:"#FF990022", color:"#CC6600", borderRadius:999, padding:"2px 8px", display:"inline-block", marginTop:4, fontWeight:700 }}>{p.tag}</div>
                    </div>
                    <div style={{ color:"#FF9900", fontSize:11, fontWeight:700, flexShrink:0, textAlign:"center" }}>View on<br/>Amazon →</div>
                  </a>
                ))}
              </div>
              <p style={{ fontSize:10, color:"var(--tmut)", marginTop:12, textAlign:"center", lineHeight:1.5 }}>
                As an Amazon Associate, {CHANNEL_NAME} earns from qualifying purchases at no extra cost to you.{" "}
                <button onClick={() => navigate("legal")} style={{ background:"none", border:"none", color:"var(--tl)", textDecoration:"underline", cursor:"pointer", fontSize:10, fontFamily:"var(--ff)", padding:0 }}>Legal info</button>
              </p>
            </div>
          );
        })()}

        {/* Glen channel footer */}
        <div style={{ background:"linear-gradient(135deg,#1a3a08,#2d5016)", borderRadius:20, padding:18 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
            <VPILogo size={40}/>
            <div>
              <div style={{ color:"#9CCC65", fontWeight:800, fontSize:12, marginBottom:2 }}>Want to see this in action?</div>
              <div style={{ color:"rgba(255,255,255,.8)", fontSize:13, fontWeight:700 }}>Watch Glen grow it on YouTube</div>
            </div>
          </div>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#FF0000", color:"#fff", borderRadius:999, padding:"11px 18px", fontSize:14, fontWeight:800, textDecoration:"none" }}>
            <YTIcon/> {CHANNEL_NAME} on YouTube
          </a>
        </div>

        {/* Complete button (if no quiz) */}
        {quizzes.length === 0 && !isDone && (
          <button className="btn bp blg" style={{ width:"100%" }} onClick={handleComplete}>✓ Complete Lesson & Earn {lesson.xp} XP</button>
        )}
        {isDone && quizzes.length === 0 && (
          <div style={{ textAlign:"center", padding:12, background:"#E8F5E9", borderRadius:14, fontSize:13, fontWeight:700, color:"#2E7D32" }}>✅ Lesson complete!</div>
        )}
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}


// ─── QUIZ WIDGET — fully self-contained, no Provider state during questions ──
function QuizWidget({ quizzes, lessonId, hearts, loseHeart, onComplete }) {
  // ALL state in refs — zero Provider re-renders during quiz
  const phaseRef        = useRef("question"); // question | feedback | results
  const qIdxRef         = useRef(0);
  const selectedRef     = useRef(null);
  const correctRef      = useRef(false);
  const answersRef      = useRef([]);
  const heartsLostRef   = useRef(0);
  const animRef         = useRef(""); // quiz-correct | quiz-wrong | ""
  const [tick, setTick] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [heartsLostFinal, setHeartsLostFinal] = useState(() => {
    try { return parseInt(localStorage.getItem("ga_hl_" + lessonId) || "0"); } catch { return 0; }
  });
  const rerender = () => setTick(n => n + 1);

  const totalQ   = quizzes.length;

  useEffect(() => {
    phaseRef.current      = "question";
    qIdxRef.current       = 0;
    selectedRef.current   = null;
    correctRef.current    = false;
    answersRef.current    = [];
    heartsLostRef.current = 0;
    animRef.current       = "";
    setAnswers([]);
    setHeartsLostFinal(0);
    try {
      const qc = localStorage.getItem("ga_qc_" + lessonId);
      const qa = localStorage.getItem("ga_qa_" + lessonId);
      if (qc === "1" && qa) {
        const parsed = JSON.parse(qa);
        if (parsed.length > 0 && parsed[0].opts) {
          answersRef.current = parsed;
          setAnswers(parsed);
          phaseRef.current = "results";
          const hl = parseInt(localStorage.getItem("ga_hl_" + lessonId) || "0");
          setHeartsLostFinal(hl);
          rerender();
        } else {
          localStorage.removeItem("ga_qc_" + lessonId);
          localStorage.removeItem("ga_qa_" + lessonId);
        }
      }
    } catch {}
  }, [lessonId]);

  const currentQ = quizzes[qIdxRef.current] || quizzes[0];
  const isTF     = currentQ?.opts?.length === 2;

  const handleSelect = (optIdx) => {
    if (phaseRef.current !== "question") return;
    const isCorrect = optIdx === currentQ.a;
    selectedRef.current = optIdx;
    correctRef.current  = isCorrect;
    phaseRef.current    = "feedback";
    animRef.current     = isCorrect ? "quiz-correct" : "quiz-wrong";
    if (!isCorrect) heartsLostRef.current += 1;
    rerender();

    // Clear animation class after it plays
    setTimeout(() => { animRef.current = ""; rerender(); }, 500);

    const capturedQIdx = qIdxRef.current;
    const capturedQ    = currentQ;
    setTimeout(() => {
      const newAnswers = [...answersRef.current, {
        correct: isCorrect, selected: optIdx,
        correctAnswer: capturedQ.a, question: capturedQ.q, opts: capturedQ.opts
      }];
      answersRef.current = newAnswers;

      if (capturedQIdx < totalQ - 1) {
        qIdxRef.current   = capturedQIdx + 1;
        selectedRef.current = null;
        correctRef.current  = false;
        animRef.current     = "";
        phaseRef.current    = "question";
        rerender();
      } else {
        phaseRef.current = "results";
        setAnswers(newAnswers);
        setHeartsLostFinal(heartsLostRef.current);
        try { localStorage.setItem("ga_hl_" + lessonId, String(heartsLostRef.current)); } catch {}
        rerender();
        try { localStorage.setItem("ga_qc_" + lessonId, "1"); } catch {}
        try { localStorage.setItem("ga_qa_" + lessonId, JSON.stringify(newAnswers)); } catch {}
        onComplete(newAnswers, heartsLostRef.current);
      }
    }, isCorrect ? 1400 : 2400);
  };

  // ── RESULTS VIEW ────────────────────────────────────────────────────────────
  if (phaseRef.current === "results") {
    const score = answers.filter(a => a.correct).length;
    const wrong = answers.filter(a => !a.correct);
    const heartsLost = heartsLostFinal;
    return (
      <div id="quiz-results" className="card" style={{ border:`2px solid ${score===totalQ?"#FFD700":score>=totalQ/2?"#4CAF50":"#FF9800"}`, background:"var(--g0)", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:10, animation:"pop .5s ease" }}>{score===totalQ?"🏆":score>=totalQ/2?"🎉":"📚"}</div>
        <h2 style={{ fontSize:18, fontWeight:900, marginBottom:6 }}>Quiz complete!</h2>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:10 }}>
          {answers.map((a,i) => (
            <div key={i} style={{ width:36, height:36, borderRadius:"50%", background:a.correct?"linear-gradient(135deg,#4CAF50,#81C784)":"linear-gradient(135deg,#EF5350,#E57373)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 2px 6px rgba(0,0,0,.15)" }}>
              {a.correct?"✓":"✗"}
            </div>
          ))}
        </div>
        <p style={{ fontSize:26, fontWeight:900, color:score===totalQ?"#E65100":score>=totalQ/2?"#2E7D32":"#FF6F00", marginBottom:4 }}>{score}/{totalQ}</p>
        <p style={{ fontSize:13, color:"var(--tl)", marginBottom:10, lineHeight:1.5 }}>
          {score===totalQ?"Perfect score! Impressive growing knowledge! 🌱":score>=totalQ/2?"Good effort — keep learning and you'll nail it!":"Have another read of the lesson and try again!"}
        </p>
        {score > 0 && <div style={{ background:"linear-gradient(135deg,#FFF8E1,#FFF3E0)", border:"1px solid #FFD54F", borderRadius:12, padding:"8px 14px", fontSize:13, color:"#E65100", fontWeight:800, marginBottom:10, display:"inline-block" }}>+{score*10} XP earned!</div>}

        {/* Hearts summary */}
        <div style={{ marginBottom:14, padding:"10px 14px", background:"rgba(255,255,255,.6)", borderRadius:12 }}>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:4 }}>
            {Array.from({length:5}).map((_,i) => (
              <span key={i} style={{ fontSize:20 }}>{i < (5 - heartsLost) ? "❤️" : "🤍"}</span>
            ))}
          </div>
          <div style={{ fontSize:12, fontWeight:700, color: heartsLost===0?"#4CAF50":"#EF5350" }}>
            {heartsLost===0 ? "💚 No hearts lost — perfect!" : `💔 ${heartsLost} heart${heartsLost>1?"s":""} lost`}
          </div>
        </div>

        {/* Review wrong answers */}
        {wrong.length > 0 && (
          <div style={{ textAlign:"left", borderTop:"1px solid var(--cdk)", paddingTop:14, marginBottom:4 }}>
            <h3 style={{ fontSize:13, fontWeight:800, color:"var(--td)", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
              <span>📖</span> Questions you missed
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {wrong.map((a,i) => (
                <div key={i} style={{ background:"#FFEBEE", border:"1px solid #FFCDD2", borderRadius:14, padding:"12px 14px" }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#B71C1C", marginBottom:8, lineHeight:1.5 }}>{a.question}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                      <span style={{ fontSize:14, flexShrink:0 }}>❌</span>
                      <span style={{ fontSize:12, color:"#B71C1C", textDecoration:"line-through", lineHeight:1.4 }}>{a.opts?.[a.selected]||"—"}</span>
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                      <span style={{ fontSize:14, flexShrink:0 }}>✅</span>
                      <span style={{ fontSize:12, color:"#1B5E20", fontWeight:700, lineHeight:1.4 }}>{a.opts?.[a.correctAnswer]||"—"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── NO HEARTS ───────────────────────────────────────────────────────────────
  if (hearts <= 0) {
    return (
      <div className="card" style={{ border:"2px solid #FF9800", background:"linear-gradient(135deg,#FFF8E1,#FFF3E0)", textAlign:"center", padding:20 }}>
        <div style={{ fontSize:40, marginBottom:10 }}>❤️‍🩹</div>
        <h2 style={{ fontSize:17, fontWeight:900, color:"#E65100", marginBottom:8 }}>You've used all your hearts!</h2>
        <div style={{ background:"rgba(255,143,0,.12)", border:"1px solid rgba(255,143,0,.3)", borderRadius:14, padding:"11px 14px", marginBottom:14, fontStyle:"italic", fontSize:13, color:"#BF360C", lineHeight:1.6 }}>
          "Don't worry — read through the lesson, study the correct answers, then your hearts refill tomorrow. You've got this!" — Glen
        </div>
        <button className="btn blg" style={{ width:"100%", background:"linear-gradient(135deg,#FF9800,#E65100)", color:"#fff" }}
          onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
          📖 Re-read the lesson
        </button>
      </div>
    );
  }

  // ── QUESTION VIEW ────────────────────────────────────────────────────────────
  const selected  = selectedRef.current;
  const isCorrect = correctRef.current;
  const phase     = phaseRef.current;

  return (
    <div className={`card ${animRef.current}`} style={{ border:"2px solid var(--g2)", background:"var(--g0)" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <h2 style={{ fontSize:14, fontWeight:800, color:"var(--g8)" }}>🧠 Quiz</h2>
        <div style={{ display:"flex", gap:3 }}>
          {Array.from({length:5}).map((_,i) => <span key={i} style={{ fontSize:16 }}>{i < hearts ? "❤️" : "🤍"}</span>)}
        </div>
      </div>

      {/* Question counter */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <span style={{ fontSize:11, fontWeight:700, color:"var(--tl)" }}>Question {qIdxRef.current+1} of {totalQ}</span>
        <span style={{ fontSize:10, background:isTF?"#E3F2FD":"#FFF8E1", color:isTF?"#1565C0":"#E65100", borderRadius:999, padding:"3px 10px", fontWeight:800, textTransform:"uppercase", letterSpacing:".05em" }}>
          {isTF?"True or False":"Multiple Choice"}
        </span>
      </div>

      {/* Question */}
      <p style={{ fontWeight:800, fontSize:15, lineHeight:1.55, marginBottom:16, color:"var(--td)" }}>{currentQ?.q}</p>

      {/* Options */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {currentQ?.opts.map((opt, i) => {
          const isSelected   = i === selected;
          const isCorrectOpt = i === currentQ.a;
          let bg = "#fff", border = "#E0D8CC", color = "var(--td)", icon = null, scale = "scale(1)";

          if (phase === "feedback") {
            if (isCorrectOpt)       { bg="#E8F5E9"; border="#4CAF50"; color="#1B5E20"; icon="✅"; }
            else if (isSelected)    { bg="#FFEBEE"; border="#EF5350"; color="#B71C1C"; icon="❌"; }
            else                    { bg="#fafafa"; color="var(--tmut)"; }
          } else if (isSelected)    { bg="var(--g0)"; border="var(--g5)"; scale="scale(1.02)"; }

          return (
            <button key={i} onClick={() => handleSelect(i)}
              disabled={phase === "feedback"}
              style={{
                padding:"13px 16px", border:`2px solid ${border}`, borderRadius:16,
                background:bg, cursor:phase==="feedback"?"default":"pointer",
                textAlign:"left", fontSize:13, fontWeight:700,
                fontFamily:"var(--ff)", color,
                display:"flex", alignItems:"center", gap:12,
                transform:scale,
                transition:"all .15s ease",
                boxShadow: isSelected && phase==="question" ? "0 2px 8px rgba(0,0,0,.1)" : "none",
              }}>
              <div style={{
                width:28, height:28, borderRadius:"50%", flexShrink:0,
                background: phase==="feedback" && isCorrectOpt ? "#4CAF50"
                          : phase==="feedback" && isSelected   ? "#EF5350"
                          : "var(--cdk)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:12, fontWeight:900,
                color: phase==="feedback" && (isCorrectOpt||isSelected) ? "#fff" : "var(--tl)",
                transition:"all .2s"
              }}>
                {icon || String.fromCharCode(65+i)}
              </div>
              <span style={{ flex:1 }}>{opt}</span>
              {phase==="feedback" && isSelected && !isCorrectOpt && (
                <span style={{ fontSize:10, color:"#EF5350", fontWeight:700, flexShrink:0 }}>Wrong</span>
              )}
              {phase==="feedback" && isCorrectOpt && (
                <span style={{ fontSize:10, color:"#4CAF50", fontWeight:700, flexShrink:0 }}>Correct ✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback message */}
      {phase === "feedback" && (
        <div style={{
          marginTop:14, padding:"12px 14px", borderRadius:14,
          background: isCorrect ? "linear-gradient(135deg,#E8F5E9,#F1F8E9)" : "linear-gradient(135deg,#FFEBEE,#FFF8E1)",
          border:`1px solid ${isCorrect?"#4CAF50":"#EF5350"}`,
          display:"flex", gap:10, alignItems:"flex-start",
          animation:"fadeUp .25s ease"
        }}>
          <span style={{ fontSize:24, flexShrink:0 }}>{isCorrect?"🎉":"💡"}</span>
          <div>
            <div style={{ fontWeight:900, fontSize:13, color:isCorrect?"#2E7D32":"#C62828", marginBottom:3 }}>
              {isCorrect ? "Correct! +10 XP 🌟" : `The answer is: "${currentQ?.opts[currentQ?.a]}"`}
            </div>
            <div style={{ fontSize:11, color:"var(--tl)", fontWeight:600 }}>
              {qIdxRef.current < totalQ-1 ? "Next question coming up..." : "Finishing quiz..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function VideosPage() {
  const { navigate, awardBadge, badges, addXP } = useApp();
  const [pk, setPk] = useState(null);
  const handlePlay = k => { setPk(k); if (!badges.includes("glens-student")) { awardBadge("glens-student"); addXP(10); } };
  const LABELS = { "fix-slugs":"Slug Control","soil-basics":"Soil & Compost","grow-tomatoes":"Growing Tomatoes","containers-beds":"Containers & Beds","sunlight-watering":"Sunlight & Watering","tools-guide":"Gardening Tools","sowing-seeds":"Sowing Seeds","grow-lettuce":"Growing Lettuce","grow-herbs":"Potting On","grow-radish":"Radishes","grow-carrots":"Carrots","grow-spring-onions":"Spring Onions","grow-peas":"Peas","grow-cucumbers":"Cucumbers","grow-courgettes":"Courgettes","grow-beans":"French Beans","grow-beetroot":"Beetroot","grow-onions-garlic":"Onions & Garlic","grow-potatoes":"Growing Potatoes","seasonal-planning":"Seasonal Planning","winter-growing":"Winter Growing","succession-sowing":"Successional Sowing","green-manures":"Green Manures","plot-planning":"Plot Planning","irrigation":"Irrigation","polytunnel":"Polytunnel & Greenhouse","pest-management":"Pest Management","seed-saving":"Seed Saving","composting":"Composting","crop-rotation":"Crop Rotation","no-dig":"No-Dig Growing","fix-aphids":"Controlling Aphids" };
  const sections = [
    {title:"🌱 Level 1: Getting Started",keys:["soil-basics","containers-beds","sunlight-watering","tools-guide","sowing-seeds"]},
    {title:"🥬 Level 2: Easy Wins",keys:["grow-lettuce","grow-herbs","grow-radish","grow-carrots","grow-spring-onions","grow-peas"]},
    {title:"🍅 Level 3: Grow Like a Pro",keys:["grow-tomatoes","grow-potatoes","grow-cucumbers","grow-courgettes","grow-beans","grow-beetroot","grow-onions-garlic"]},
    {title:"🗓️ Level 4: Grow All Year",keys:["seasonal-planning","winter-growing","succession-sowing","green-manures"]},
    {title:"🏡 Level 5: Allotment Master",keys:["plot-planning","irrigation","polytunnel","pest-management","seed-saving","composting","crop-rotation","no-dig"]},
    {title:"🔍 Problem Fixes",keys:["fix-slugs","fix-aphids"]},
  ];
  const totalVideos = Object.values(MY_VIDEOS).filter(Boolean).length;
  const totalSlots = Object.keys(MY_VIDEOS).length;
  const pct = Math.round((totalVideos/totalSlots)*100);
  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0a1a05,#1a2a10)", padding:"22px 16px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
          <button onClick={() => navigate("dashboard")} style={{ border:"none", background:"rgba(255,255,255,.08)", borderRadius:10, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, color:"#fff" }}>←</button>
          <VPILogo size={28}/>
          <div><h1 style={{ color:"#fff", fontSize:18, fontWeight:900 }}>Video Lessons</h1><p style={{ color:"rgba(255,255,255,.4)", fontSize:11 }}>by {HOST} · {CHANNEL_NAME}</p></div>
        </div>
        <div style={{ background:"rgba(255,255,255,.08)", borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ color:"rgba(255,255,255,.7)", fontSize:12, fontWeight:700 }}>📺 {totalVideos} of {totalSlots} videos live</span>
            <span style={{ color:"#9CCC65", fontWeight:800, fontSize:12 }}>{pct}%</span>
          </div>
          <div style={{ height:6, background:"rgba(255,255,255,.15)", borderRadius:999, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#7CB342,#9CCC65)", borderRadius:999 }}/>
          </div>
          <p style={{ color:"rgba(255,255,255,.4)", fontSize:11, marginTop:6 }}>Glen is filming more — subscribe to be notified!</p>
        </div>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,0,0,.85)", color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}><YTIcon/> Subscribe to {CHANNEL_NAME}</a>
      </div>
      <div style={{ padding:"16px" }}>
        {sections.map(sec => {
          const liveCount = sec.keys.filter(k => MY_VIDEOS[k]).length;
          return (
            <div key={sec.title} style={{ marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <h2 style={{ fontSize:15, fontWeight:800 }}>{sec.title}</h2>
                <span style={{ fontSize:11, background:liveCount===sec.keys.length?"#E8F5E9":"var(--cdk)", color:liveCount===sec.keys.length?"#2E7D32":"var(--tmut)", borderRadius:999, padding:"3px 10px", fontWeight:700 }}>{liveCount}/{sec.keys.length} live</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {sec.keys.map(key => {
                  const id = MY_VIDEOS[key]; const isPlaying = pk===key; const label = LABELS[key]||key;
                  return (
                    <div key={key} style={{ background:"#fff", borderRadius:22, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.07)", border:"1px solid var(--cdk)" }}>
                      {id ? (
                        <div style={{ position:"relative", paddingTop:"56.25%", background:"#000" }}>
                          {isPlaying
                            ? <iframe style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }} src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={label}/>
                            : <div style={{ position:"absolute", inset:0, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => handlePlay(key)}>
                                <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={label} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
                                <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.22)" }}/>
                                <div style={{ position:"relative", zIndex:2, width:52, height:52, background:"rgba(255,0,0,.92)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ marginLeft:3 }}><polygon points="5,3 19,12 5,21"/></svg></div>
                              </div>
                          }
                        </div>
                      ) : (
                        <div style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e)", padding:"28px", textAlign:"center" }}>
                          <div style={{ fontSize:32, marginBottom:8 }}>🎬</div>
                          <div style={{ color:"rgba(255,255,255,.6)", fontSize:13, fontWeight:700, marginBottom:4 }}>{label}</div>
                          <div style={{ color:"rgba(255,255,255,.3)", fontSize:11, marginBottom:10 }}>Glen is filming this soon</div>
                          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,0,0,.7)", color:"#fff", borderRadius:999, padding:"7px 14px", fontSize:11, fontWeight:700, textDecoration:"none" }}><YTIcon/> Subscribe</a>
                        </div>
                      )}
                      {id && <div style={{ padding:"11px 15px 13px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}><VPILogo size={16}/><span style={{ fontSize:10, fontWeight:700, color:"var(--tmut)", textTransform:"uppercase", letterSpacing:".05em" }}>{CHANNEL_NAME}</span><span style={{ marginLeft:"auto", fontSize:10, background:"#E8F5E9", color:"#2E7D32", padding:"2px 8px", borderRadius:999, fontWeight:700 }}>✅ Live</span></div>
                        <div style={{ fontWeight:800, fontSize:14 }}>{label}</div>
                      </div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PLANNER PAGE ──────────────────────────────────────────────────────────────
function PlannerPage() {
  const { navigate } = useApp();
  const month = new Date().getMonth();
  const MONTHS = [
    {name:"January",emoji:"❄️",sow:["Chillies","Peppers (heated propagator)"],plant:[],harvest:["Parsnips","Leeks","Kale"],jobs:["Order seeds early — best varieties sell out","Plan your crop rotation for the year","Check stored vegetables"]},
    {name:"February",emoji:"🌱",sow:["Onions","Leeks","Early tomatoes"],plant:[],harvest:["Leeks","Kale","Purple sprouting broccoli"],jobs:["Chit seed potatoes in a light frost-free place","Prepare beds by adding compost","Check fences and supports"]},
    {name:"March",emoji:"🌿",sow:["Tomatoes","Courgettes","Cucumbers","Lettuce","Peas"],plant:["Onion sets","Shallots","Early potatoes"],harvest:["Purple sprouting broccoli","Spring onions","Kale"],jobs:["Start hardening off seedlings","Prepare raised beds","Sow peas under cover"]},
    {name:"April",emoji:"🌸",sow:["Beans","Sweetcorn","Squash","More lettuce"],plant:["Potatoes (main crop)","Onion sets","Early beetroot"],harvest:["Asparagus","Spring onions","Radishes"],jobs:["Watch for late frosts — keep fleece handy","Earth up potatoes as they emerge","Plant strawberries"]},
    {name:"May",emoji:"☀️",sow:["More beans","Succession lettuce","Carrots"],plant:["Tomatoes (after mid-May)","Courgettes","Cucumbers","Squash"],harvest:["Asparagus","Radishes","Lettuce","Spring onions"],jobs:["Last frost date usually mid-May","Pinch out tomato sideshoots","Start watering regularly"]},
    {name:"June",emoji:"🌞",sow:["Succession carrots","Beetroot","More lettuce"],plant:["Leeks","Brassicas"],harvest:["Broad beans","Lettuce","Strawberries","Early potatoes","Courgettes"],jobs:["Feed tomatoes weekly with liquid tomato food","Water consistently — daily in dry spells"]},
    {name:"July",emoji:"🌻",sow:["Succession salads","Spring onions","Kale for winter"],plant:["Winter brassicas"],harvest:["Tomatoes","Courgettes","Cucumbers","Beans","Garlic","Onions","Potatoes"],jobs:["Harvest garlic and onions when tops flop","Keep picking courgettes daily"]},
    {name:"August",emoji:"🍅",sow:["Winter salads","Spinach","Spring onions"],plant:["Strawberry runners"],harvest:["Tomatoes","Courgettes","Beans","Cucumbers","Sweetcorn","Peppers"],jobs:["Stop tomato plants — pinch out top","Sow green manures on cleared beds"]},
    {name:"September",emoji:"🍂",sow:["Garlic","Winter salads"],plant:["Garlic","Overwintering salads"],harvest:["Squash","Tomatoes (final)","Potatoes","Beetroot"],jobs:["Harvest and store squash before first frost","Begin clearing summer beds"]},
    {name:"October",emoji:"🍁",sow:["Broad beans","Garlic"],plant:["Garlic","Spring bulbs"],harvest:["Squash","Root vegetables","Kale","Leeks"],jobs:["Earth up brassicas against wind rock","Add compost to cleared beds"]},
    {name:"November",emoji:"🌧️",sow:[],plant:[],harvest:["Parsnips","Leeks","Kale","Brussels sprouts","Carrots"],jobs:["Protect brassicas from pigeons","Mulch beds to protect roots","Plan next year"]},
    {name:"December",emoji:"⛄",sow:[],plant:[],harvest:["Parsnips","Leeks","Kale","Brussels sprouts"],jobs:["Order seed catalogues","Check stored crops","Clean and oil tools ready for spring"]},
  ];
  const m = MONTHS[month];
  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#1a3a08,#4e8226)", padding:"20px 18px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}><VPILogo size={24}/><h1 style={{ color:"#fff", fontSize:19, fontWeight:900 }}>📅 Monthly Planner</h1></div>
        <p style={{ color:"rgba(255,255,255,.7)", fontSize:13 }}>What to do in the garden this month</p>
      </div>
      <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ background:"linear-gradient(135deg,var(--g1),var(--g0))", border:"2px solid var(--g3)", borderRadius:20, padding:18, textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:4 }}>{m.emoji}</div>
          <h2 style={{ fontSize:22, fontWeight:900, color:"var(--g8)" }}>{m.name}</h2>
          <p style={{ fontSize:13, color:"var(--tl)" }}>{new Date().getFullYear()}</p>
        </div>
        {[
          {title:"🌱 Sow now",items:m.sow,color:"#E8F5E9",border:"#A5D6A7",tc:"#1B5E20"},
          {title:"🌿 Plant out",items:m.plant,color:"#E3F2FD",border:"#90CAF9",tc:"#0D47A1"},
          {title:"🥕 Harvest",items:m.harvest,color:"#FFF8E1",border:"#FFE082",tc:"#E65100"},
          {title:"🔧 Key jobs",items:m.jobs,color:"#F3E5F5",border:"#CE93D8",tc:"#4A148C"},
        ].map(s => s.items.length>0 && (
          <div key={s.title} style={{ background:s.color, border:`1px solid ${s.border}`, borderRadius:16, padding:"14px 16px" }}>
            <h3 style={{ fontSize:14, fontWeight:800, color:s.tc, marginBottom:10 }}>{s.title}</h3>
            {s.items.map((item,i) => <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}><span style={{ color:s.tc, flexShrink:0 }}>•</span><span style={{ fontSize:13, color:s.tc, lineHeight:1.5 }}>{item}</span></div>)}
          </div>
        ))}
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:8, background:"#FF0000", color:"#fff", borderRadius:999, padding:"12px 18px", fontSize:14, fontWeight:700, textDecoration:"none", justifyContent:"center" }}><YTIcon/> Watch Glen's latest videos</a>
      </div>
    </div>
  );
}

// ─── PROBLEMS PAGE ─────────────────────────────────────────────────────────────
function ProblemsPage() {
  const { awardBadge, badges } = useApp();
  const [sel, setSel] = useState(null);
  const [search, setSearch] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [asked, setAsked] = useState("");
  if (!badges.includes("problem-solver")) setTimeout(() => awardBadge("problem-solver"), 500);
  const sevStyles = { low:{c:"#4CAF50",l:"Low risk",bg:"#E8F5E9"}, medium:{c:"#FF9800",l:"Worth fixing",bg:"#FFF3E0"}, high:{c:"#F44336",l:"Act quickly",bg:"#FFEBEE"} };
  const filtered = PROBLEMS.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.looks.toLowerCase().includes(search.toLowerCase()));
  const askAI = async () => {
    if (!search.trim()||search.trim().length<5) return;
    setAiLoading(true); setAiAnswer(null); setAiError(false); setAsked(search.trim());
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are Glen, an experienced allotment manager with 20+ years growing experience in the UK. Answer growing questions warmly and practically. Structure: likely cause, practical fix, prevention tip. Under 200 words.`,
          messages:[{role:"user", content:`Growing question: "${search.trim()}"`}] }) });
      const data = await res.json();
      const text = data?.content?.[0]?.text;
      if (text) setAiAnswer(text); else setAiError(true);
    } catch(e) { setAiError(true); }
    setAiLoading(false);
  };
  if (sel) {
    const p = PROBLEMS.find(x => x.id===sel); const s = sevStyles[p.sev];
    return (
      <div style={{ minHeight:"100vh" }}>
        <div style={{ background:"#fff", padding:"14px", borderBottom:"1px solid var(--cdk)", position:"sticky", top:0, zIndex:10, display:"flex", alignItems:"center", gap:11 }}>
          <button onClick={() => setSel(null)} style={{ border:"none", background:"var(--cream)", borderRadius:10, width:35, height:35, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:17 }}>←</button>
          <div><div style={{ fontSize:9, color:"var(--tmut)", fontWeight:700 }}>Problem Solver</div><h1 style={{ fontSize:15, fontWeight:900 }}>{p.emoji} {p.title}</h1></div>
        </div>
        <div style={{ padding:"14px", display:"flex", flexDirection:"column", gap:11 }}>
          <div style={{ background:s.bg, border:`2px solid ${s.c}44`, borderRadius:11, padding:"8px 14px", display:"flex", alignItems:"center", gap:8 }}><div style={{ width:8, height:8, borderRadius:"50%", background:s.c }}/><span style={{ fontWeight:700, fontSize:12, color:s.c }}>{s.l}</span></div>
          {p.vk && MY_VIDEOS[p.vk] && <YTPlayer videoKey={p.vk}/>}
          <div className="card"><h2 style={{ fontSize:13, fontWeight:800, marginBottom:7, color:"var(--g8)" }}>🔍 What it looks like</h2><p style={{ fontSize:13, color:"var(--tm)", lineHeight:1.6 }}>{p.looks}</p></div>
          <div className="card"><h2 style={{ fontSize:13, fontWeight:800, marginBottom:8 }}>🤔 Likely causes</h2>{p.causes.map((c,i) => <div key={i} style={{ display:"flex", gap:7, marginBottom:6 }}><span style={{ color:"#FF7043", fontSize:12, flexShrink:0 }}>•</span><span style={{ fontSize:13, color:"var(--tm)", lineHeight:1.5 }}>{c}</span></div>)}</div>
          <div style={{ background:"linear-gradient(135deg,var(--g0),#fff)", border:"2px solid var(--g3)", borderRadius:16, padding:14 }}><h2 style={{ fontSize:13, fontWeight:800, marginBottom:7, color:"var(--g8)" }}>🔧 Easy fix</h2><p style={{ fontSize:13, color:"var(--tm)", lineHeight:1.7 }}>{p.fix}</p></div>
          <div className="tip"><h2 style={{ fontSize:13, fontWeight:800, marginBottom:5, color:"var(--g8)" }}>🛡️ Prevention</h2><p style={{ fontSize:13, color:"var(--tm)", lineHeight:1.6 }}>{p.prev}</p></div>
          <button className="btn bs" style={{ width:"100%" }} onClick={() => setSel(null)}>← Back to Problem Solver</button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#7B1818,#E53935)", padding:"20px 16px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}><VPILogo size={24}/><h1 style={{ color:"#fff", fontSize:19, fontWeight:900 }}>🔍 Problem Solver</h1></div>
        <p style={{ color:"rgba(255,255,255,.75)", fontSize:12 }}>Ask any growing question — powered by Glen's expertise.</p>
      </div>
      <div style={{ padding:"12px 16px 0", background:"#fff", borderBottom:"1px solid var(--cdk)" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:"var(--cream)", borderRadius:12, padding:"10px 14px" }}>
            <span style={{ fontSize:16 }}>🔍</span>
            <input type="text" placeholder="Ask Glen anything — e.g. why are my tomato leaves curling?" value={search} onChange={e => { setSearch(e.target.value); setAiAnswer(null); }} onKeyDown={e => e.key==="Enter" && askAI()} style={{ flex:1, border:"none", background:"transparent", fontSize:13, fontFamily:"var(--ff)", outline:"none", color:"var(--td)" }}/>
            {search && <button onClick={() => { setSearch(""); setAiAnswer(null); }} style={{ border:"none", background:"none", cursor:"pointer", fontSize:14, color:"var(--tmut)" }}>✕</button>}
          </div>
          <button onClick={askAI} disabled={aiLoading||search.trim().length<5} style={{ background:"linear-gradient(135deg,#7B1818,#E53935)", border:"none", borderRadius:12, padding:"11px 14px", color:"#fff", fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"var(--ff)", opacity:search.trim().length<5?.5:1 }}>{aiLoading?"...":"Ask"}</button>
        </div>
        <div style={{ fontSize:10, color:"var(--tmut)", padding:"6px 4px 10px" }}>Powered by AI · Press Ask or Enter</div>
      </div>
      <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {aiLoading && <div style={{ background:"linear-gradient(135deg,#0f2206,#1a3a08)", borderRadius:18, padding:18 }}><div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}><VPILogo size={32}/><div><div style={{ color:"#9CCC65", fontWeight:800, fontSize:12 }}>Glen is thinking...</div><div style={{ color:"rgba(255,255,255,.5)", fontSize:11 }}>"{asked}"</div></div></div><div style={{ display:"flex", gap:4 }}>{[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:"#9CCC65", animation:`pulse 1s ${i*.2}s infinite` }}/>)}</div></div>}
        {aiAnswer && !aiLoading && <div style={{ background:"linear-gradient(135deg,#0f2206,#1a3a08)", borderRadius:18, padding:18, border:"1px solid rgba(156,204,101,.3)" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}><VPILogo size={36}/><div><div style={{ color:"#9CCC65", fontWeight:800, fontSize:12 }}>Glen's Answer</div><div style={{ color:"rgba(255,255,255,.5)", fontSize:11 }}>"{asked}"</div></div></div>
          <div style={{ color:"rgba(255,255,255,.88)", fontSize:14, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{aiAnswer}</div>
          <button onClick={() => { setSearch(""); setAiAnswer(null); }} style={{ marginTop:12, border:"1px solid rgba(255,255,255,.2)", background:"transparent", borderRadius:999, padding:"7px 14px", color:"rgba(255,255,255,.6)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--ff)" }}>Ask another question</button>
        </div>}
        {aiError && !aiLoading && <div style={{ background:"#FFF3E0", border:"1px solid #FFB74D", borderRadius:14, padding:"14px 16px" }}><div style={{ fontWeight:800, fontSize:13, color:"#E65100" }}>⚠️ Couldn't get an answer right now</div></div>}
        {!aiAnswer && !aiLoading && <>
          <div className="warn"><p style={{ fontSize:13, color:"#5D4037", lineHeight:1.5 }}><strong>Good news:</strong> Most problems have simple fixes. Don't panic!</p></div>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {filtered.map(p => { const s = sevStyles[p.sev]; return (
              <button key={p.id} className="card tap" onClick={() => setSel(p.id)} style={{ display:"flex", alignItems:"center", gap:11, textAlign:"left", border:"1px solid var(--cdk)", fontFamily:"var(--ff)", padding:"12px 14px" }}>
                <div style={{ width:46, height:46, background:s.bg, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21, flexShrink:0 }}>{p.emoji}</div>
                <div style={{ flex:1 }}><div style={{ fontWeight:800, fontSize:13, marginBottom:2 }}>{p.title}</div><div style={{ fontSize:11, color:"var(--tl)", lineHeight:1.4 }}>{p.looks.slice(0,60)}...</div></div>
                <span style={{ fontSize:16, color:"var(--tmut)" }}>→</span>
              </button>
            ); })}
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── PROGRESS PAGE ─────────────────────────────────────────────────────────────
function ProgressPage() {
  const { done, badges, streak, profile, navigate, reset, xp, hearts, darkMode, toggleDarkMode } = useApp();  const totalLessons = COURSES.reduce((a,c) => a+c.lessons.length, 0);
  const pct = Math.round((done.length/totalLessons)*100);
  return (
    <div style={{ minHeight:"100vh", background:"var(--cream)", paddingBottom:100 }}>
      <div style={{ background:"linear-gradient(135deg,#1a3a08,#4e8226)", padding:"22px 18px 28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <VPILogo size={44}/>
          <div><h1 style={{ color:"#fff", fontSize:20, fontWeight:900 }}>My Progress</h1><p style={{ color:"rgba(255,255,255,.6)", fontSize:13 }}>{profile?.experience==="beginner"?"Beginner Grower":profile?.experience==="some"?"Growing Enthusiast":"Confident Grower"}</p></div>
          <div style={{ marginLeft:"auto" }}><LeagueBadge xp={xp}/></div>
        </div>
        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          {[{v:xp,l:"Total XP",e:"⭐"},{v:done.length,l:"Lessons",e:"📚"},{v:streak.count,l:"Streak",e:"🔥"},{v:badges.length,l:"Badges",e:"🏅"}].map(s => (
            <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,.1)", borderRadius:14, padding:"10px 8px", textAlign:"center" }}>
              <div style={{ fontSize:18 }}>{s.e}</div>
              <div style={{ color:"#fff", fontWeight:900, fontSize:16 }}>{s.v}</div>
              <div style={{ color:"rgba(255,255,255,.55)", fontSize:9, fontWeight:700 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(255,255,255,.15)", borderRadius:999, height:8, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#FFD700,#FF8F00)", borderRadius:999 }}/>
        </div>
        <div style={{ color:"rgba(255,255,255,.6)", fontSize:11, marginTop:6, textAlign:"center" }}>{done.length} of {totalLessons} lessons · {pct}%</div>
      </div>
      <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:14 }}>
        <div className="card">
          <h2 style={{ fontSize:15, fontWeight:800, marginBottom:14 }}>🏅 Badges ({badges.length}/{BADGES.length})</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {BADGES.map(b => {
              const earned = badges.includes(b.id);
              return <div key={b.id} style={{ width:60, textAlign:"center", opacity:earned?1:.3 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:earned?"linear-gradient(135deg,#5E9E2E,#9CCC65)":"var(--cdk)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 4px" }}>{b.e}</div>
                <div style={{ fontSize:9, fontWeight:700, color:earned?"var(--g7)":"var(--tmut)", lineHeight:1.3 }}>{b.t}</div>
              </div>;
            })}
          </div>
        </div>
        <div className="card">
          <h2 style={{ fontSize:15, fontWeight:800, marginBottom:14 }}>📚 Course progress</h2>
          {COURSES.map(c => {
            const completed = c.lessons.filter(l => done.includes(l.id)).length;
            const p2 = Math.round((completed/c.lessons.length)*100);
            return <div key={c.id} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:13, fontWeight:700 }}>{c.emoji} {c.title}</span><span style={{ fontSize:12, color:"var(--tl)" }}>{completed}/{c.lessons.length}</span></div>
              <div style={{ height:6, background:"var(--cdk)", borderRadius:999, overflow:"hidden" }}><div style={{ height:"100%", width:`${p2}%`, background:`linear-gradient(90deg,${c.color},${c.color}BB)`, borderRadius:999 }}/></div>
            </div>;
          })}
        </div>
        {/* Dark mode{/* Dark mode */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--g0)", border:"1px solid var(--g2)", borderRadius:14, padding:"12px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:18 }}>{darkMode?"🌙":"☀️"}</span><span style={{ fontSize:13, fontWeight:700 }}>Dark Mode</span></div>
          <button onClick={toggleDarkMode} style={{ width:48, height:26, borderRadius:999, border:"none", cursor:"pointer", background:darkMode?"var(--g5)":"var(--cdk)", position:"relative", transition:"background .3s" }}>
            <div style={{ width:20, height:20, borderRadius:"50%", background:"white", position:"absolute", top:3, left:darkMode?25:3, transition:"left .3s" }}/>
          </button>
        </div>
        <BrandFooter/>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => navigate("daily")} style={{ border:"none", background:"none", color:"var(--g6)", fontSize:12, cursor:"pointer", fontFamily:"var(--ff)", textDecoration:"underline", fontWeight:700 }}>🌱 Daily Challenge</button>
          <button onClick={() => navigate("legal")} style={{ border:"none", background:"none", color:"var(--tl)", fontSize:12, cursor:"pointer", fontFamily:"var(--ff)", textDecoration:"underline" }}>📋 Legal & Disclaimers</button>
          <button onClick={() => { if (window.confirm("Reset all progress? This cannot be undone.")) reset(); }} style={{ border:"none", background:"none", color:"var(--tmut)", fontSize:12, cursor:"pointer", fontFamily:"var(--ff)", textDecoration:"underline" }}>Reset all progress</button>
        </div>
      </div>
    </div>
  );
}

// ─── LEVEL COMPLETE PAGE ───────────────────────────────────────────────────────
function LevelCompletePage() {
  const { course, navigate, xp } = useApp();
  if (!course) { navigate("courses"); return null; }
  const LEVEL_MSGS = {
    "level-1":{msg:"You've got the foundations! You now understand what every plant needs to thrive.",emoji:"🌱"},
    "level-2":{msg:"Brilliant work! You've grown some of the most rewarding beginner crops there are.",emoji:"🥬"},
    "level-3":{msg:"Incredible — you're no longer a beginner. Tomatoes, potatoes, cucumbers and more.",emoji:"🍅"},
    "level-4":{msg:"You think like a real grower now. Planning, succession, soil care — all mastered.",emoji:"🗓️"},
    "level-5":{msg:"You've reached Allotment Master level. Crop rotation, no-dig, composting — all yours.",emoji:"🏡"},
    "level-6":{msg:"You've completed the entire Growers Academy. Glen is proud. You're a proper grower.",emoji:"👨‍🌾"},
  };
  const isLastLevel = course.id==="level-6";
  const info = LEVEL_MSGS[course.id]||LEVEL_MSGS["level-1"];
  const nextCourse = COURSES[COURSES.findIndex(c => c.id===course.id)+1];
  const LEVEL_DANCERS = {"level-1":["🌱","🌿","🫘"],"level-2":["🥬","🥕","🌿"],"level-3":["🍅","🥔","🥒"],"level-4":["🗓️","❄️","🔄"],"level-5":["🏡","♻️","💧"],"level-6":["👨‍🌾","🌟","🏆"]};
  const dancers = LEVEL_DANCERS[course.id]||["🌱","🍅","🥕"];
  const confetti = [...Array(24)].map((_,i) => ({id:i,color:["#FF5252","#FF9800","#FFEB3B","#4CAF50","#2196F3","#9C27B0","#FF4081","#00BCD4"][i%8],left:`${(i*4.2)%100}%`,delay:`${(i*.08)%1.5}s`,duration:`${1.2+(i%6)*.2}s`,size:`${8+(i%5)*3}px`,shape:i%3===0?"50%":i%3===1?"2px":"0%"}));
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"var(--cream)" }}>
      <div style={{ background:`linear-gradient(155deg,${course.color}DD,${course.color})`, padding:"52px 24px 44px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          {confetti.map(c => <div key={c.id} style={{ position:"absolute", top:-10, left:c.left, width:c.size, height:c.size, background:c.color, borderRadius:c.shape, animation:`confettiFall ${c.duration} ${c.delay} ease-in forwards` }}/>)}
        </div>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:64, marginBottom:12, animation:"pop .5s ease" }}>🎉</div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,.2)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
            <span style={{ fontSize:14 }}>{info.emoji}</span>
            <span style={{ color:"#fff", fontSize:12, fontWeight:800, textTransform:"uppercase", letterSpacing:".06em" }}>Level Complete!</span>
          </div>
          <h1 style={{ color:"#fff", fontSize:26, fontWeight:900, lineHeight:1.2, marginBottom:10 }}>You've completed<br/>{course.title}!</h1>
          <p style={{ color:"rgba(255,255,255,.85)", fontSize:15, lineHeight:1.5, maxWidth:300, margin:"0 auto 20px" }}>{info.msg}</p>
          <div style={{ display:"flex", justifyContent:"center", gap:20, marginBottom:20 }}>
            {dancers.map((veg,i) => <div key={i} style={{ fontSize:46, animation:`${["vegDance","vegDance2","vegDance3"][i]} ${1.4+i*.15}s ${i*.2}s ease-in-out infinite`, display:"inline-block" }}>{veg}</div>)}
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,0,0,.2)", borderRadius:999, padding:"10px 20px" }}>
            <span style={{ fontSize:20 }}>⭐</span><span style={{ color:"#fff", fontWeight:900, fontSize:16 }}>{xp} Total XP</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"24px 18px", display:"flex", flexDirection:"column", gap:16, flex:1 }}>
        {!isLastLevel && nextCourse && (
          <div className="card" style={{ border:`2px solid ${nextCourse.color}44`, background:`${nextCourse.color}0A` }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
              <div style={{ width:46, height:46, background:nextCourse.color, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{nextCourse.emoji}</div>
              <div><div style={{ fontSize:10, fontWeight:700, color:nextCourse.color, textTransform:"uppercase", letterSpacing:".05em", marginBottom:2 }}>Up next</div><h2 style={{ fontSize:16, fontWeight:900, marginBottom:2 }}>{nextCourse.title}</h2><p style={{ fontSize:13, color:"var(--tl)", lineHeight:1.4 }}>{nextCourse.desc}</p></div>
            </div>
            <button className="btn bp blg" style={{ width:"100%", background:nextCourse.color }} onClick={() => navigate("courses")}>Start {nextCourse.title} →</button>
          </div>
        )}
        <div style={{ background:"linear-gradient(135deg,#0a1a05,#1a3a08)", borderRadius:20, padding:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}><VPILogo size={36}/><div><div style={{ color:"var(--g3)", fontWeight:800, fontSize:11, textTransform:"uppercase", marginBottom:3 }}>Catch up with {HOST}</div><h3 style={{ color:"#fff", fontWeight:900, fontSize:16 }}>Latest from {CHANNEL_NAME}</h3></div></div>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#FF0000", color:"#fff", borderRadius:999, padding:"14px 20px", fontSize:15, fontWeight:800, textDecoration:"none" }}><YTIcon/> Visit {CHANNEL_NAME} on YouTube</a>
        </div>
        <div className="card" style={{ textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>{info.emoji}</div>
          <h3 style={{ fontSize:15, fontWeight:800, marginBottom:4 }}>Share your achievement</h3>
          <p style={{ fontSize:13, color:"var(--tl)", marginBottom:14, lineHeight:1.5 }}>Completed {course.title} on The Growers Academy!</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <a href={`https://twitter.com/intent/tweet?text=Just+completed+${encodeURIComponent(course.title)}+on+The+Growers+Academy!+🌱+${encodeURIComponent(WEBSITE_URL)}`} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#000", color:"#fff", borderRadius:999, padding:"9px 16px", fontSize:13, fontWeight:700, textDecoration:"none" }}>𝕏 Share</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(WEBSITE_URL)}`} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#1877F2", color:"#fff", borderRadius:999, padding:"9px 16px", fontSize:13, fontWeight:700, textDecoration:"none" }}>Facebook</a>
          </div>
        </div>
        <button className="btn bs" style={{ width:"100%" }} onClick={() => navigate("courses")}>← Back to all courses</button>
      </div>
    </div>
  );
}


// ─── UNLOCK PAGE ──────────────────────────────────────────────────────────────
function UnlockPage() {
  const { navigate, unlockPremium, premium } = useApp();
  const [key, setKey]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState(false);

  // If already premium just go back
  if (premium) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
        <h1 style={{ fontSize:22, fontWeight:900, marginBottom:8 }}>You're already premium!</h1>
        <p style={{ fontSize:14, color:"var(--tl)", marginBottom:24 }}>All levels are unlocked. Happy growing!</p>
        <button className="btn bp blg" onClick={() => navigate("courses")}>Back to courses →</button>
      </div>
    );
  }

  const verifyKey = async () => {
    if (!key.trim()) { setError("Please enter your licence key"); return; }
    setLoading(true);
    setError("");
    try {
      // Verify with Gumroad's licence key API
      const res = await fetch("https://api.gumroad.com/v2/licenses/verify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          product_permalink: GUMROAD_PRODUCT_ID,
          license_key: key.trim(),
          increment_uses_count: "false"
        })
      });
      const data = await res.json();
      if (data.success) {
        unlockPremium(key.trim());
        setSuccess(true);
        setTimeout(() => navigate("courses"), 2500);
      } else {
        setError("Invalid licence key — please check and try again, or contact us via the website.");
      }
    } catch(e) {
      setError("Couldn't connect to verify your key. Check your internet connection and try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--cream)" }}>
      <div style={{ background:"linear-gradient(135deg,#1a0a00,#3E1F00)", padding:"28px 20px 32px", textAlign:"center" }}>
        <button onClick={() => navigate("courses")} style={{ position:"absolute", left:16, top:20, border:"none", background:"rgba(255,255,255,.1)", borderRadius:10, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, color:"#fff" }}>←</button>
        <div style={{ fontSize:48, marginBottom:10 }}>🔓</div>
        <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, marginBottom:6 }}>Unlock Premium</h1>
        <p style={{ color:"rgba(255,255,255,.65)", fontSize:14, lineHeight:1.5 }}>Enter your Gumroad licence key to unlock Levels 4, 5 & 6</p>
      </div>

      <div style={{ padding:"24px 20px", display:"flex", flexDirection:"column", gap:16 }}>
        {success ? (
          <div style={{ textAlign:"center", padding:32 }}>
            <div style={{ fontSize:64, marginBottom:16, animation:"pop .5s ease" }}>🎉</div>
            <h2 style={{ fontSize:20, fontWeight:900, color:"var(--g7)", marginBottom:8 }}>Premium Unlocked!</h2>
            <p style={{ fontSize:14, color:"var(--tl)" }}>All levels are now available. Taking you to the courses...</p>
          </div>
        ) : (
          <>
            {/* What you get */}
            <div className="card">
              <h2 style={{ fontSize:15, fontWeight:800, marginBottom:12 }}>What you're unlocking:</h2>
              {[
                ["🗓️","Level 4 — Grow All Year Round","4 lessons"],
                ["🏡","Level 5 — Allotment Master","8 lessons"],
                ["👨‍🌾","Level 6 — Glen's Expert Secrets","7 lessons"],
                ["📔","Free Garden Planner Diary","Delivered with your order"],
              ].map(([e,t,d]) => (
                <div key={t} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
                  <div style={{ width:38, height:38, background:"var(--g0)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{e}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{t}</div>
                    <div style={{ fontSize:11, color:"var(--tl)" }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key entry */}
            <div className="card">
              <h2 style={{ fontSize:14, fontWeight:800, marginBottom:6 }}>Enter your licence key</h2>
              <p style={{ fontSize:12, color:"var(--tl)", marginBottom:14, lineHeight:1.5 }}>
                Your licence key was emailed to you by Gumroad after purchase. Check your inbox or spam folder.
              </p>
              <input
                type="text"
                placeholder="e.g. XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                value={key}
                onChange={e => { setKey(e.target.value.toUpperCase()); setError(""); }}
                onKeyDown={e => e.key === "Enter" && verifyKey()}
                style={{ width:"100%", padding:"12px 14px", border:`2px solid ${error?"#EF5350":"var(--cdk)"}`, borderRadius:14, fontSize:13, fontFamily:"var(--ff)", outline:"none", background:"#fafafa", marginBottom:10 }}
              />
              {error && <p style={{ fontSize:12, color:"#EF5350", fontWeight:700, marginBottom:10 }}>{error}</p>}
              <button className="btn bp blg" style={{ width:"100%", opacity:loading?0.7:1 }}
                onClick={verifyKey} disabled={loading}>
                {loading ? "Verifying..." : "🔓 Unlock Premium Access"}
              </button>
            </div>

            {/* Haven't bought yet */}
            <div style={{ background:"linear-gradient(135deg,#1a0a00,#3E1F00)", borderRadius:20, padding:18, textAlign:"center" }}>
              <p style={{ color:"rgba(255,255,255,.7)", fontSize:13, marginBottom:12 }}>Don't have a licence key yet?</p>
              <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer"
                style={{ display:"block", background:"linear-gradient(135deg,#FFD700,#FF8F00)", color:"#1a1a00", borderRadius:999, padding:"13px 18px", fontSize:14, fontWeight:900, textDecoration:"none" }}>
                🚀 Get Premium Access
              </a>
            </div>

            <p style={{ fontSize:11, color:"var(--tmut)", textAlign:"center", lineHeight:1.6 }}>
              Having trouble? Contact us via <a href={WEBSITE_URL} style={{ color:"var(--g5)" }}>our website</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function DailyChallengePage() {
  const { navigate, dailyDone, setDailyDone, addXP, haptic } = useApp();
  const [qa, setQa] = useState(null);
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(null);

  const today = new Date().toDateString();
  const alreadyDone = dailyDone.date === today && dailyDone.done;

  // Pick a daily question based on the day of year
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const ALL_QUESTIONS = [
    { q:"What is the ideal soil pH for most vegetables?", opts:["4.0–5.0","6.0–7.0","7.5–8.5","Doesn't matter"], a:1 },
    { q:"When is the best time to water your plants?", opts:["Midday","Evening","Morning","Any time"], a:2 },
    { q:"What does 'hardening off' seedlings mean?", opts:["Cutting back growth","Gradually acclimatising indoor plants to outdoor conditions","Adding grit to compost","Letting roots dry out"], a:1 },
    { q:"Which vegetable is best sown directly and hates being transplanted?", opts:["Tomatoes","Carrots","Lettuce","Courgettes"], a:1 },
    { q:"What should you do the moment peas start flowering?", opts:["Feed with nitrogen","Stop watering","Start picking daily as soon as pods form","Cut back the plant"], a:2 },
    { q:"What causes tomato leaves to curl upward?", opts:["Too much water","Heat stress or inconsistent watering","Too much nitrogen","Blight"], a:1 },
    { q:"How deep should you plant garlic cloves?", opts:["On the surface","2–3cm deep, pointy end up","10cm deep","Doesn't matter"], a:1 },
    { q:"What is the purpose of earthing up potatoes?", opts:["To add nutrients","To prevent tubers turning green","To improve drainage","To speed up growth"], a:1 },
    { q:"Which green manure fixes nitrogen from the air?", opts:["Mustard","Phacelia","Red clover","Buckwheat"], a:2 },
    { q:"When should you pinch out basil to keep it bushy?", opts:["Never — leave it to grow","Pinch out flowers as soon as they appear","Only in autumn","Cut the roots back"], a:1 },
    { q:"What does succession sowing prevent?", opts:["Pests","Gluts and gaps in harvest","Weeds","Root disease"], a:1 },
    { q:"What is the main advantage of no-dig growing?", opts:["Cheaper tools needed","Preserves soil structure and beneficial organisms","Needs less watering","Grows vegetables faster"], a:1 },
    { q:"Why shouldn't you plant brassicas in the same spot each year?", opts:["They look better elsewhere","Clubroot and other diseases build up in the soil","They prefer shade","They use all the nutrients"], a:1 },
    { q:"What temperature is needed for chilli seeds to germinate reliably?", opts:["10–15°C","15–20°C","25–28°C","Any temperature"], a:2 },
    { q:"When is garlic traditionally planted in the UK?", opts:["March","May","October to December","February"], a:2 },
  ];

  const q = ALL_QUESTIONS[dayOfYear % ALL_QUESTIONS.length];

  const handleSubmit = () => {
    const isCorrect = qa === q.a;
    setCorrect(isCorrect);
    setDone(true);
    haptic(isCorrect ? "medium" : "light");
    if (isCorrect) addXP(15);
    setDailyDone({ date: today, done: true, score: isCorrect ? 1 : 0 });
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--cream)", paddingBottom:40 }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0f2206,#2d5016)", padding:"20px 18px 24px" }}>
        <button onClick={() => navigate("dashboard")} style={{ display:"flex", alignItems:"center", gap:6, border:"none", background:"rgba(255,255,255,.15)", borderRadius:10, padding:"7px 12px", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"var(--ff)", marginBottom:16 }}>← Back</button>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <span style={{ fontSize:28 }}>🌱</span>
          <div>
            <div style={{ color:"rgba(255,255,255,.55)", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em" }}>Daily Challenge</div>
            <h1 style={{ color:"#fff", fontWeight:900, fontSize:18 }}>Today's Growing Question</h1>
          </div>
        </div>
        <div style={{ color:"rgba(255,255,255,.5)", fontSize:12, marginTop:6 }}>
          {new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long" })} · +15 XP if correct
        </div>
      </div>

      <div style={{ padding:"24px 18px", display:"flex", flexDirection:"column", gap:16 }}>
        {alreadyDone && !done ? (
          <div className="card" style={{ textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>{dailyDone.score === 1 ? "🎉" : "💡"}</div>
            <h2 style={{ fontSize:17, fontWeight:900, marginBottom:8 }}>Already done today!</h2>
            <p style={{ fontSize:13, color:"var(--tl)", lineHeight:1.6, marginBottom:16 }}>
              {dailyDone.score === 1 ? "You got it right! Come back tomorrow for a new question." : "Come back tomorrow and try again — there's a new question every day."}
            </p>
            <button className="btn bp" onClick={() => navigate("dashboard")} style={{ width:"100%" }}>Back to Dashboard</button>
          </div>
        ) : !done ? (
          <>
            <div className="card" style={{ border:"2px solid var(--g2)", background:"var(--g0)" }}>
              <div style={{ fontSize:11, color:"var(--g6)", fontWeight:800, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>🧠 Question of the day</div>
              <p style={{ fontWeight:800, fontSize:16, lineHeight:1.5, marginBottom:16, color:"var(--td)" }}>{q.q}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {q.opts.map((opt, i) => (
                  <button key={i} onClick={() => setQa(i)} style={{ padding:"13px 16px", border:`2px solid ${qa===i?"var(--g5)":"var(--cdk)"}`, borderRadius:12, background:qa===i?"var(--g0)":"#fff", cursor:"pointer", textAlign:"left", fontSize:14, fontWeight:600, fontFamily:"var(--ff)", transition:"all .15s", transform:qa===i?"scale(1.01)":"scale(1)" }}>{opt}</button>
                ))}
              </div>
              {qa !== null && <button className="btn bp" style={{ width:"100%", marginTop:14 }} onClick={handleSubmit}>Submit Answer</button>}
            </div>
          </>
        ) : (
          <div className="card" style={{ textAlign:"center", border:`2px solid ${correct?"#4CAF50":"#EF5350"}`, background:correctRef.current?"#E8F5E9":"#FFEBEE" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>{correctRef.current ? "🎉" : "💡"}</div>
            <h2 style={{ fontSize:18, fontWeight:900, marginBottom:6, color:correctRef.current?"#2E7D32":"#C62828" }}>{correct ? "Correct!" : "Not quite!"}</h2>
            {correct && <div style={{ background:"linear-gradient(135deg,#FFF8E1,#FFF3E0)", border:"1px solid #FFD54F", borderRadius:12, padding:"8px 14px", fontSize:13, color:"#E65100", fontWeight:800, marginBottom:12, display:"inline-block" }}>+15 XP earned! 🌟</div>}
            {!correct && <div style={{ background:"rgba(255,255,255,.7)", borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#B71C1C", marginBottom:3 }}>✅ The correct answer was:</div>
              <div style={{ fontSize:14, fontWeight:800 }}>{q.opts[q.a]}</div>
            </div>}
            <p style={{ fontSize:13, color:"var(--tl)", marginBottom:16 }}>Come back tomorrow for a new question!</p>
            <button className="btn bp" style={{ width:"100%" }} onClick={() => navigate("dashboard")}>Back to Dashboard</button>
          </div>
        )}

        {/* Streak reminder */}
        <div style={{ background:"linear-gradient(135deg,#1a3a08,#2d5016)", borderRadius:16, padding:"14px 16px", display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ fontSize:28 }}>🔥</span>
          <div>
            <div style={{ color:"#9CCC65", fontWeight:800, fontSize:13 }}>Daily questions keep your streak alive!</div>
            <div style={{ color:"rgba(255,255,255,.55)", fontSize:12 }}>Answer every day to build your growing knowledge</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav() {
  const { page, navigate, profile } = useApp();
  if (!profile) return null;
  const noNav = ["home","onboarding","welcome","level-complete"];
  if (noNav.includes(page)) return null;
  const items = [
    {id:"dashboard", e:"🏡", l:"Home"},
    {id:"courses",   e:"📚", l:"Learn"},
    {id:"videos",    e:"📺", l:"Videos"},
    {id:"planner",   e:"📅", l:"Planner"},
    {id:"problems",  e:"🔍", l:"Fix It"},
    {id:"progress",  e:"⭐", l:"Progress"},
  ];
  const isActive = id => page===id || (id==="courses" && page==="lesson");
  return (
    <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, height:"var(--nav)", background:"#fff", borderTop:"1px solid var(--cdk)", display:"flex", alignItems:"center", justifyContent:"space-around", zIndex:100, boxShadow:"0 -4px 18px rgba(0,0,0,.06)", overflowX:"auto" }}>
      {items.map(item => {
        const active = isActive(item.id);
        const isYT = item.id==="videos";
        return (
          <button key={item.id} onClick={() => navigate(item.id)} style={{ flex:1, minWidth:48, display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"6px 2px", border:"none", background:"transparent", cursor:"pointer", color:active?(isYT?"#FF0000":"var(--g6)"):"var(--tmut)", transition:"all .2s", fontFamily:"var(--ff)" }}>
            <span style={{ fontSize:19, display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, borderRadius:9, background:active?(isYT?"#FFEBEE":"var(--g0)"):"transparent", transition:"all .2s", transform:active?"scale(1.08)":"scale(1)" }}>{item.e}</span>
            <span style={{ fontSize:8, fontWeight:active?800:600, letterSpacing:".02em" }}>{item.l}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Router() {
  const { page, profile, darkMode, newBadge, pageAnim, navigate } = useApp();
  const noNav  = ["home","onboarding","welcome","level-complete"];
  const showNav = profile && !noNav.includes(page);
  const Page = () => {
    switch (page) {
      case "level-complete":return <LevelCompletePage/>;
      case "home":       return <HomePage/>;
      case "onboarding": return <OnboardingPage/>;
      case "welcome":    return <WelcomePage/>;
      case "dashboard":  return <DashboardPage/>;
      case "courses":    return <CoursesPage/>;
      case "lesson":     return <LessonPage/>;
      case "videos":     return <VideosPage/>;
      case "planner":    return <PlannerPage/>;
      case "problems":   return <ProblemsPage/>;
      case "progress":   return <ProgressPage/>;
      case "legal":      return <LegalPage/>;
      case "daily":      return <DailyChallengePage/>;
      case "unlock":     return <UnlockPage/>;
      default:           return <HomePage/>;
    }
  };

  // Dark mode CSS overrides
  const darkCss = darkMode ? `
    body, .wrap { background: #0f1a0a !important; }
    .card { background: #1a2d12 !important; border-color: #2d4a1e !important; }
    body { color: #e8f5e0 !important; }
    :root {
      --cream: #0f1a0a;
      --cdk: #2d4a1e;
      --td: #e8f5e0;
      --tm: #c8e6b0;
      --tl: #8ab878;
      --tmut: #5a7a4a;
      --g0: #1a2d12;
    }
  ` : "";

  return (
    <div className="wrap" style={{ background: darkMode ? "#0f1a0a" : undefined }}>
      <style>{css + darkCss}</style>

      {/* Page transition overlay */}
      {pageAnim && <div style={{ position:"fixed", inset:0, background: darkMode ? "#0f1a0a" : "var(--cream)", opacity:.6, zIndex:9998, pointerEvents:"none", animation:"fadeUp .12s ease" }}/>}

      {/* Badge earned popup */}
      {newBadge && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:9999, animation:"badgePop .4s cubic-bezier(.34,1.56,.64,1)", maxWidth:320, width:"90%" }}>
          <div style={{ background:"linear-gradient(135deg,#1a3a08,#2d5016)", border:"2px solid #7CB342", borderRadius:20, padding:"14px 18px", display:"flex", gap:12, alignItems:"center", boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#5E9E2E,#9CCC65)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0, boxShadow:"0 0 0 3px rgba(156,204,101,.3)" }}>{newBadge.e}</div>
            <div>
              <div style={{ color:"#9CCC65", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".08em", marginBottom:3 }}>🏅 Badge Unlocked!</div>
              <div style={{ color:"#fff", fontWeight:900, fontSize:15, marginBottom:2 }}>{newBadge.t}</div>
              <div style={{ color:"rgba(255,255,255,.6)", fontSize:12 }}>{newBadge.d}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingBottom: showNav ? "var(--nav)" : 0 }}>
        <Page/>
      </div>
      <BottomNav/>
    </div>
  );
}

// ─── LEGAL PAGE ───────────────────────────────────────────────────────────────
function LegalPage() {
  const { navigate } = useApp();
  const sections = [
    {
      title:"Affiliate Links Disclosure",
      icon:"🛒",
      body:`The Growers Academy contains affiliate links to products on Amazon and other retailers. When you click one of these links and make a purchase, ${CHANNEL_NAME} may earn a small commission at no extra cost to you.\n\nAll products recommended in this app are genuinely used and trusted by Glen. We only recommend products we believe will help your growing. Affiliate income helps keep the free lessons in this app free.`,
    },
    {
      title:"Growing Advice Disclaimer",
      icon:"🌱",
      body:`All growing advice in this app is provided for general informational and educational purposes only. Results will vary depending on your location, soil, climate, experience and many other factors.\n\n${CHANNEL_NAME} and Glen accept no liability for crop failures, losses or damage arising from following advice in this app. Gardening involves real-world variables that no app can fully account for. Always apply your own judgement and seek local advice where needed.`,
    },
    {
      title:"Data Storage & Privacy",
      icon:"🔒",
      body:`The Growers Academy stores your progress, profile and preferences in your browser's local storage only. This data never leaves your device and is never sent to any external server.\n\nNo personal data is collected, stored or processed by ${CHANNEL_NAME}. This app does not use cookies, tracking pixels, or any third-party analytics.`,
    },
    {
      title:"Premium Content & Payments",
      icon:"💳",
      body:`Access to premium levels (Levels 4, 5 and 6) requires a one-time payment processed through a third-party payment provider. ${CHANNEL_NAME} does not store payment information.\n\nPremium access is granted on a lifetime basis — there are no recurring charges. ${CHANNEL_NAME} reserves the right to update, modify or add to premium content at any time.\n\nFor payment queries please contact us via the contact form at ${WEBSITE_URL}.`,
    },
    {
      title:"Privacy Notice (UK GDPR)",
      icon:"🔐",
      body:`Veggie Patch Ideas is committed to protecting your privacy. This is a summary of how we handle your data in The Growers Academy app.\n\nData controller: Veggie Patch Ideas, England (sole trader)\nContact: Via the contact form at ${WEBSITE_URL}\n\nWhat data the app collects:\n• App progress, profile and preferences — stored only on your device in local storage. Never transmitted to any server.\n• The app does not use cookies, tracking pixels or third-party analytics.\n\nYour rights:\nUnder UK GDPR you have the right to access, correct or delete your data at any time. Since all app data is stored locally on your device, you can exercise these rights using the Reset option in the app or by clearing your browser storage.\n\nFor our full Privacy Notice covering our website, shop, newsletter and all services visit:\n${WEBSITE_URL}/privacy-policy\n\nTo make a complaint contact the ICO at ico.org.uk.`,
    },
    {
      title:"Contact",
      icon:"📬",
      body:`For any questions about these terms, affiliate partnerships, or the app in general, please get in touch via the contact form at ${WEBSITE_URL}.`,
    },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--cream)", paddingBottom:40 }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1a3a08,#4e8226)", padding:"20px 18px 24px" }}>
        <button onClick={() => navigate("progress")} style={{ display:"flex", alignItems:"center", gap:6, border:"none", background:"rgba(255,255,255,.15)", borderRadius:10, padding:"7px 12px", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"var(--ff)", marginBottom:16 }}>← Back</button>
        <VPILogo size={36}/>
        <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, marginTop:12, marginBottom:4 }}>Legal Information</h1>
        <p style={{ color:"rgba(255,255,255,.65)", fontSize:13 }}>The Growers Academy by {CHANNEL_NAME}</p>
      </div>

      <div style={{ padding:"20px 18px", display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ background:"#FFF8E1", border:"1px solid #FFE082", borderRadius:14, padding:"12px 14px" }}>
          <p style={{ fontSize:12, color:"#6D4C00", lineHeight:1.6, fontWeight:600 }}>
            Please read this information carefully. By using The Growers Academy you agree to the terms described below. Last updated: {new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} className="card">
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ fontSize:22 }}>{s.icon}</div>
              <h2 style={{ fontSize:15, fontWeight:900, color:"var(--td)" }}>{s.title}</h2>
            </div>
            {s.body.split("\n\n").map((para, j) => (
              <p key={j} style={{ fontSize:13, color:"var(--tm)", lineHeight:1.7, marginBottom: j < s.body.split("\n\n").length - 1 ? 10 : 0 }}>{para}</p>
            ))}
          </div>
        ))}

        <div style={{ textAlign:"center", padding:"8px 0" }}>
          <p style={{ fontSize:12, color:"var(--tmut)", lineHeight:1.6 }}>
            © {new Date().getFullYear()} {CHANNEL_NAME} · All rights reserved
          </p>
          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:"var(--g6)", textDecoration:"none", fontWeight:700 }}>{WEBSITE_URL}</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <ErrorBoundary><Provider><Router/></Provider></ErrorBoundary>;
}
