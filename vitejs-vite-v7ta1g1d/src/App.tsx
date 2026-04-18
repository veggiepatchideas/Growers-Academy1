import { useState, useEffect, createContext, useContext } from "react";

// ─── CONFIG — Edit your video IDs here ────────────────────────────────────────
// How to find your video ID: go to your YouTube video → copy the part after v=
// e.g. youtube.com/watch?v=ABC123  →  ID is "ABC123"
const MY_VIDEOS = {
  "fix-slugs":         "6umHdK7CiVc",  // Your slug video
  "soil-basics":       "Q-hEoZzegkc",  // Your compost/soil video
  "grow-tomatoes":     "gntCbz_DVzQ",  // Your tomatoes video
  "containers-beds":   null,
  "sunlight-watering": null,
  "tools-guide":       null,
  "sowing-seeds":      null,
  "grow-lettuce":      null,
  "grow-herbs":        null,
  "grow-radish":       null,
  "grow-potatoes":     null,
  "seasonal-planning": null,
  "fix-aphids":        null,
};

const CHANNEL_URL  = "https://www.youtube.com/@veggiepatchideas";
const WEBSITE_URL  = "https://veggiepatchideas.co.uk";
const CHANNEL_NAME = "Veggie Patch Ideas";
const HOST         = "Glen";

// ─── YOUR LOGO (SVG recreated from your brand mark) ───────────────────────────
function VPILogo({ size = 36 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="#111111" stroke="white" strokeWidth="3.5"/>
      <circle cx="60" cy="60" r="44" fill="#87CEEB"/>
      <defs>
        <radialGradient id={`tg${s}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#E8453C"/>
          <stop offset="55%" stopColor="#C0392B"/>
          <stop offset="100%" stopColor="#7B1A1A"/>
        </radialGradient>
      </defs>
      {/* Tomato body */}
      <ellipse cx="60" cy="71" rx="27" ry="25" fill={`url(#tg${s})`}/>
      {/* Highlight */}
      <ellipse cx="50" cy="59" rx="7" ry="4.5" fill="rgba(255,255,255,0.18)" transform="rotate(-20 50 59)"/>
      {/* Angry eyes */}
      <ellipse cx="52" cy="68" rx="3.5" ry="3" fill="#1a0000"/>
      <ellipse cx="68" cy="68" rx="3.5" ry="3" fill="#1a0000"/>
      {/* Angry brows */}
      <path d="M47 63 Q52 59.5 57 62" stroke="#1a0000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M63 62 Q68 59.5 73 63" stroke="#1a0000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Smirk */}
      <path d="M50 78 Q60 84 70 78" stroke="#1a0000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Stem */}
      <path d="M60 47 Q57 39 53 35" stroke="#1B5E20" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M60 47 Q63 39 67 35" stroke="#1B5E20" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      {/* Leaves */}
      <path d="M60 48 Q49 41 47 47 Q53 49 60 48Z" fill="#43A047"/>
      <path d="M60 48 Q71 41 73 47 Q67 49 60 48Z" fill="#2E7D32"/>
      <path d="M60 48 Q56 36 60 32 Q64 36 60 48Z" fill="#43A047"/>
      {/* Stars */}
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 52;
        const x = 60 + r * Math.cos(rad);
        const y = 60 + r * Math.sin(rad);
        const pts = [];
        for (let j = 0; j < 5; j++) {
          const a1 = (j * 72 - 90) * Math.PI / 180;
          const a2 = (j * 72 - 90 + 36) * Math.PI / 180;
          pts.push(`${x + 4 * Math.cos(a1)},${y + 4 * Math.sin(a1)}`);
          pts.push(`${x + 2 * Math.cos(a2)},${y + 2 * Math.sin(a2)}`);
        }
        return <polygon key={i} fill="#388E3C" points={pts.join(" ")}/>;
      })}
      {/* Arc text */}
      <path id={`ta${s}`} d="M 17,60 A 43,43 0 0,1 103,60" fill="none"/>
      <path id={`ba${s}`} d="M 24,66 A 38,38 0 0,0 96,66" fill="none"/>
      <text fontSize="9" fontWeight="900" fill="white" fontFamily="Arial Black,Arial,sans-serif" letterSpacing="1.5">
        <textPath href={`#ta${s}`} startOffset="8%">VEGGIE PATCH</textPath>
      </text>
      <text fontSize="9" fontWeight="900" fill="white" fontFamily="Arial Black,Arial,sans-serif" letterSpacing="1.5">
        <textPath href={`#ba${s}`} startOffset="20%">IDEAS</textPath>
      </text>
    </svg>
  );
}

// ─── MADE BY BADGE ─────────────────────────────────────────────────────────────
function MadeByBadge({ style = {} }) {
  return (
    <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer"
      style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#111",
        border:"1.5px solid #2a2a2a", borderRadius:999, padding:"5px 14px 5px 6px",
        textDecoration:"none", ...style }}>
      <VPILogo size={26}/>
      <div style={{ lineHeight:1.2 }}>
        <div style={{ fontSize:8, color:"#666", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em" }}>Made by</div>
        <div style={{ fontSize:12, color:"#fff", fontWeight:800 }}>{CHANNEL_NAME}</div>
      </div>
    </a>
  );
}

// ─── GLEN TIP BOX ──────────────────────────────────────────────────────────────
function GlenTip({ text }) {
  return (
    <div style={{ background:"linear-gradient(135deg,#0d1f08,#1a3a10)", border:"1px solid #2D5016",
      borderRadius:16, padding:16, display:"flex", gap:12, alignItems:"flex-start" }}>
      <div style={{ flexShrink:0, marginTop:2 }}><VPILogo size={32}/></div>
      <div>
        <div style={{ color:"#9CCC65", fontWeight:800, fontSize:11, textTransform:"uppercase",
          letterSpacing:".07em", marginBottom:5 }}>{HOST}'s Tip</div>
        <p style={{ color:"rgba(255,255,255,.82)", fontSize:13, lineHeight:1.65, margin:0 }}>{text}</p>
      </div>
    </div>
  );
}

// ─── BRAND FOOTER ─────────────────────────────────────────────────────────────
function BrandFooter() {
  return (
    <div style={{ background:"#111", padding:"28px 20px", display:"flex", flexDirection:"column",
      alignItems:"center", gap:14, textAlign:"center" }}>
      <VPILogo size={56}/>
      <div>
        <div style={{ color:"#fff", fontWeight:800, fontSize:16, marginBottom:3 }}>{CHANNEL_NAME}</div>
        <div style={{ color:"#555", fontSize:12 }}>by {HOST} · South-West UK</div>
      </div>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FF0000",
            color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
          <YTIcon/> YouTube
        </a>
        <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#2D5016",
            color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
          🌱 Website
        </a>
      </div>
      <div style={{ color:"#333", fontSize:11 }}>© {CHANNEL_NAME} · The Growers Academy</div>
    </div>
  );
}

function YTIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2s-.2-1.7-1-2.4c-.9-1-1.9-1-2.4-1.1C17.2 2.5 12 2.5 12 2.5s-5.2 0-8.1.2c-.5.1-1.5.1-2.4 1.1C.7 4.5.5 6.2.5 6.2S.3 8.1.3 10v1.8c0 1.9.2 3.8.2 3.8s.2 1.7 1 2.4c.9 1 2.1.9 2.6 1C5.8 19.2 12 19.2 12 19.2s5.2 0 8.1-.2c.5-.1 1.5-.1 2.4-1.1.8-.7 1-2.4 1-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 13.5V7.9l6.5 2.8-6.5 2.8z"/>
    </svg>
  );
}

// ─── VIDEO PLAYER ─────────────────────────────────────────────────────────────
function YTPlayer({ videoKey, onPlay }) {
  const [playing, setPlaying] = useState(false);
  const id = MY_VIDEOS[videoKey];

  if (!id) return (
    <div style={{ background:"#111", borderRadius:16, padding:"28px 20px", textAlign:"center" }}>
      <div style={{ fontSize:36, marginBottom:8 }}>📺</div>
      <div style={{ color:"#444", fontSize:13, fontWeight:600, marginBottom:12 }}>
        Video coming soon from {CHANNEL_NAME}
      </div>
      <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#FF0000",
          color:"#fff", borderRadius:999, padding:"9px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
        <YTIcon/> Watch on YouTube
      </a>
    </div>
  );

  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  return (
    <div style={{ position:"relative", width:"100%", paddingTop:"56.25%", borderRadius:16,
      overflow:"hidden", background:"#000", boxShadow:"0 4px 24px rgba(0,0,0,.2)" }}>
      {playing
        ? <iframe style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen title={videoKey}/>
        : <div style={{ position:"absolute", inset:0, cursor:"pointer", display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center" }}
            onClick={() => { setPlaying(true); onPlay && onPlay(); }}>
            <img src={thumb} alt="thumbnail" style={{ position:"absolute", inset:0,
              width:"100%", height:"100%", objectFit:"cover" }}/>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.3)" }}/>
            <div style={{ position:"relative", zIndex:2, width:64, height:64, background:"rgba(255,0,0,.92)",
              borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 24px rgba(0,0,0,.5)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft:4 }}>
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
            <div style={{ position:"relative", zIndex:2, marginTop:12, display:"flex", alignItems:"center",
              gap:8, background:"rgba(0,0,0,.65)", padding:"6px 14px", borderRadius:999, backdropFilter:"blur(6px)" }}>
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
  .ccirc{width:21px;height:21px;border-radius:50%;border:2px solid var(--g3);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;margin-top:1px;font-size:11px;color:#fff}
  .ccirc.on{background:var(--g5);border-color:var(--g5)}
  .sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(.8);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
  .fu{animation:fadeUp .3s ease both}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--g2);border-radius:3px}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const COURSES = [
  { id:"level-1", level:1, title:"Getting Started", emoji:"🌱", color:"#7CB342",
    desc:"Build your gardening foundations. Learn what plants really need.",
    lessons:[
      { id:"l1-soil", title:"Soil & Compost Basics", emoji:"🌍", dur:"8 min", vk:"soil-basics",
        glen:"On my allotment site I always tell new plot holders — spend money on your soil before anything else. Good compost transforms even the worst ground.",
        intro:"Good soil is the secret to everything. Think of it as your plants' home — get this right and everything else gets easier.",
        takes:["Healthy soil is alive — full of worms, bacteria and fungi","Most veg prefers well-draining, nutrient-rich soil","Compost is your best free fertiliser","pH matters — most veg likes 6.0–7.0"],
        steps:[{n:1,t:"Test your soil",d:"Grab a handful and squeeze. Good soil clumps but breaks apart easily. Sandy soil falls apart; clay stays in a hard ball."},{n:2,t:"Add compost",d:"Mix in a 5–10cm layer of compost or well-rotted manure. Improves drainage in clay and water retention in sandy soil."},{n:3,t:"Check drainage",d:"Dig a 30cm hole and fill with water — it should drain within an hour. If not, add grit or consider raised beds."},{n:4,t:"Feed regularly",d:"Top-dress with compost every few weeks or use a liquid feed fortnightly once plants are growing."}],
        cl:["Buy a bag of multi-purpose compost","Test your soil by feel or with a pH kit","Clear weeds from your growing area","Mark out your first bed or container"],
        tip:"Used coffee grounds are brilliant for soil structure — worms absolutely love them!",
        mistakes:["Using soil straight from a bag without mixing","Compacting soil by walking on beds","Adding uncomposted kitchen scraps directly"],
        quiz:{q:"What pH do most vegetables prefer?",opts:["4.0–5.0","6.0–7.0","7.5–8.5","Doesn't matter"],a:1}},
      { id:"l1-containers", title:"Containers & Beds", emoji:"📦", dur:"7 min", vk:"containers-beds",
        glen:"I've seen brilliant crops grown in old wheelbarrows and even an old toilet! Drainage is all that matters. Don't overthink the container.",
        intro:"Whether you have a balcony, patio or a full garden, there's a growing setup that works perfectly for you.",
        takes:["Containers can grow almost anything if sized correctly","Raised beds give you full control over your soil","Drainage holes are non-negotiable","Bigger is almost always better for containers"],
        steps:[{n:1,t:"Choose your container",d:"Match the container to the crop. Lettuce loves a window box; tomatoes need a 30L+ pot."},{n:2,t:"Add drainage",d:"A layer of gravel at the bottom, then compost mixed with perlite to stop compaction."},{n:3,t:"Position carefully",d:"South-facing spots are gold. Rotate pots weekly so all sides get equal light."},{n:4,t:"Water more often",d:"Containers dry out faster than beds — check daily in summer."}],
        cl:["Measure your growing space","Choose at least one container or bed","Ensure drainage holes are in place","Buy a bag of potting compost"],
        tip:"Self-watering containers have a base reservoir — absolute game changer for tomatoes on a hot patio!",
        mistakes:["Using garden soil in containers — it compacts and drowns roots","Undersizing containers","Forgetting drainage holes"],
        quiz:{q:"What goes at the bottom of a container for drainage?",opts:["Kitchen paper","Gravel or broken crockery","Sand only","Nothing"],a:1}},
      { id:"l1-sunlight", title:"Sunlight & Watering", emoji:"☀️", dur:"6 min", vk:"sunlight-watering",
        glen:"Here on the South-West coast I still map my plot at different times of day. Shade from fences catches out beginners every year.",
        intro:"Sun and water are your plants' two most basic needs. Get these right and they'll reward you enormously.",
        takes:["Most veg needs 6+ hours of direct sun","Water at the base, not the leaves","Morning watering reduces disease risk","More plants die from overwatering than drought"],
        steps:[{n:1,t:"Map your sun",d:"Spend one day noting where sun falls. South and west-facing spots get the most."},{n:2,t:"Water at the base",d:"Direct water to the soil. Wet leaves invite fungal problems."},{n:3,t:"Check before watering",d:"Push finger 2cm into soil. Damp? Leave it. Dry? Water thoroughly."},{n:4,t:"Mulch to retain moisture",d:"Add 5cm of compost, straw or bark around plants to lock in moisture."}],
        cl:["Map the sunniest spots in your garden","Get a watering can with a rose","Set a soil-check reminder","Buy some mulch"],
        tip:"A cheap rain gauge tells you exactly how much natural water your garden is getting!",
        mistakes:["Watering a little every day instead of deeply","Watering in midday sun","Ignoring rainfall in wet weeks"],
        quiz:{q:"Best time to water plants?",opts:["Midday","Evening only","Morning","Doesn't matter"],a:2}},
      { id:"l1-tools", title:"Basic Gardening Tools", emoji:"🔧", dur:"5 min", vk:"tools-guide",
        glen:"I've been using the same trowel for 12 years — it was £3 from a car boot. A good tool cleaned after every use will outlast a dozen cheap ones.",
        intro:"You don't need a shed full of equipment. A few good tools will take you very far.",
        takes:["Quality beats quantity — always","Clean tools after every use","A trowel and fork are your everyday essentials","Build your collection gradually"],
        steps:[{n:1,t:"Start with the basics",d:"Trowel, hand fork, watering can, gloves and a dibber. That's genuinely enough to begin."},{n:2,t:"Add a hoe",d:"A long-handled hoe for weeding saves your back. Use it before weeds flower."},{n:3,t:"Get a kneeler",d:"Your knees will thank you. A foam pad costs just a few pounds."},{n:4,t:"Store properly",d:"Dry before storing. Rub metal parts with an oily rag after every use."}],
        cl:["Buy a quality trowel and fork","Get a watering can (8–10L)","Find gloves that fit","Grab a kneeling pad"],
        tip:"Car boot sales are brilliant for tools — vintage metal tools often outlast cheap new ones.",
        mistakes:["Cheap tools that break in week one","Leaving tools outside to rust","Skipping gloves — always protect your hands"],
        quiz:{q:"Most essential beginner tool?",opts:["Electric strimmer","Trowel","Garden spade","Wheelbarrow"],a:1}},
      { id:"l1-seeds", title:"Sowing Seeds", emoji:"🫘", dur:"10 min", vk:"sowing-seeds",
        glen:"I sow almost everything in modules — less root disturbance when planting out, and much better success rates. Give it a try!",
        intro:"Sowing your first seeds is one of the most satisfying things in gardening. Let's get it right from day one.",
        takes:["Seed packets tell you almost everything you need","Sow thinly — overcrowded seedlings struggle","Warmth and moisture are key to germination","Most seeds take 5–14 days — be patient!"],
        steps:[{n:1,t:"Read the packet",d:"Check depth, spacing, timing and light needs."},{n:2,t:"Prepare your tray",d:"Fill with seed compost, firm gently, water lightly then let it drain."},{n:3,t:"Sow thinly",d:"One or two seeds per cell. Cover lightly with compost or vermiculite."},{n:4,t:"Label everything",d:"You WILL forget what you planted where. Use lolly sticks and write the date!"},{n:5,t:"Keep warm and moist",d:"Most seeds germinate at 15–22°C. Cover until seedlings appear."}],
        cl:["Buy easy seeds (radish or lettuce to start)","Get seed compost","Find small pots or a module tray","Buy plant labels"],
        tip:"Window ledges work brilliantly for germination — central heating warmth speeds things up!",
        mistakes:["Sowing too deep — most small seeds need just 1–2cm","Letting compost dry out after sowing","Not labelling"],
        quiz:{q:"Best germination temperature for most seeds?",opts:["5–10°C","15–22°C","28–35°C","Doesn't matter"],a:1}},
    ]},
  { id:"level-2", level:2, title:"Easy Wins", emoji:"🥬", color:"#558B2F",
    desc:"Fast, forgiving, delicious crops to build your confidence.",
    lessons:[
      { id:"l2-lettuce", title:"Lettuce", emoji:"🥗", dur:"8 min", vk:"grow-lettuce",
        glen:"I grow lettuce in the gaps between slower crops all season. It's the ultimate filler crop — never have a bare patch again.",
        intro:"Lettuce is the perfect starter crop — fast, easy, and you can pick it for months if you sow little and often.",
        takes:["Grows in as little as 4 weeks","Loves cool weather","Pick leaves regularly to keep it producing","Grows brilliantly in containers"],
        steps:[{n:1,t:"Choose your type",d:"Loose-leaf like 'Salad Bowl' is easiest — just cut as needed."},{n:2,t:"Sow little and often",d:"A small row every 2–3 weeks from March to September gives continuous picking."},{n:3,t:"Keep it moist",d:"Lettuce is mostly water — dry spells make it bolt and go bitter."},{n:4,t:"Harvest correctly",d:"Snip outer leaves with scissors, leaving the heart to keep growing."}],
        cl:["Buy loose-leaf lettuce seeds","Prepare a container or small bed","Set a daily watering reminder","Sow your first row this weekend!"],
        tip:"Scatter copper rings or crushed eggshells around lettuce to deter slugs naturally.",
        mistakes:["Letting it dry out even once — goes bitter instantly","Sowing too thick","Leaving bolted plants in"],
        quiz:{q:"How to keep loose-leaf lettuce producing?",opts:["Pull the whole plant","Cut outer leaves, leave heart","Water less","Add more fertiliser"],a:1}},
      { id:"l2-herbs", title:"Herbs", emoji:"🌿", dur:"7 min", vk:"grow-herbs",
        glen:"A pot of fresh herbs on a sunny doorstep is the quickest win in gardening. I always start new growers with chives — absolutely impossible to kill.",
        intro:"Fresh herbs transform your cooking and they're among the easiest plants you can grow, even on a windowsill.",
        takes:["Basil, parsley, chives and mint are great starters","Most herbs love sun and well-drained soil","Container-friendly","Harvest regularly to encourage bushy growth"],
        steps:[{n:1,t:"Pick your herbs",d:"Start with chives (indestructible), mint (pot only!), basil (needs warmth) and parsley."},{n:2,t:"Right pot, right drainage",d:"Herbs hate waterlogged roots. Drainage holes essential."},{n:3,t:"Position in sun",d:"Most herbs need 6+ hours of sun. South-facing windowsill is ideal."},{n:4,t:"Harvest from the top",d:"Always snip above a leaf node — encourages bushy branching."}],
        cl:["Choose 2–3 herbs to start","Get pots with drainage holes","Position in your sunniest spot","Learn correct harvesting technique"],
        tip:"Supermarket herb plants can be split into 3–4 smaller plants and repotted — brilliant value!",
        mistakes:["Overwatering","Letting herbs flower without pinching","Growing mint in a bed — it takes over!"],
        quiz:{q:"Which herb must always be grown in a pot?",opts:["Basil","Chives","Mint","Parsley"],a:2}},
      { id:"l2-radish", title:"Radishes", emoji:"🔴", dur:"5 min", vk:"grow-radish",
        glen:"I use radishes to mark out carrot rows on my allotment — they germinate fast so you can see the row, and they're harvested long before the carrots need the space.",
        intro:"Radishes are so fast you can harvest them in 3 weeks — perfect for impatient first-time growers!",
        takes:["Ready in 3–4 weeks from sowing","Sow directly where they'll grow","Brilliant gap fillers","Cool-season crop — avoid midsummer heat"],
        steps:[{n:1,t:"Sow directly",d:"Radishes dislike transplanting. Sow 1cm deep every 10cm."},{n:2,t:"Keep moist",d:"Dry spells make radishes hot and woody. Consistent watering is key."},{n:3,t:"Thin promptly",d:"Thin to 5cm apart once 2cm tall. Eat the thinnings in salads!"},{n:4,t:"Harvest when ready",d:"Pull when golf-ball sized (3–4 weeks). Leave too long and they go pithy."}],
        cl:["Buy radish seeds (Cherry Belle is a classic)","Clear a small patch or container","Sow this weekend!"],
        tip:"Interplant radishes with slower crops to mark the rows and fill space efficiently.",
        mistakes:["Growing in summer heat — stick to spring and autumn","Not thinning","Waiting too long to harvest"],
        quiz:{q:"How quickly can radishes be harvested?",opts:["6–8 weeks","3–4 weeks","12 weeks","1 week"],a:1}},
    ]},
  { id:"level-3", level:3, title:"Grow Like a Pro", emoji:"🍅", color:"#E53935",
    desc:"Tackle the classics. Tomatoes, potatoes and more rewarding crops.",
    lessons:[
      { id:"l3-tomatoes", title:"Tomatoes", emoji:"🍅", dur:"12 min", vk:"grow-tomatoes",
        glen:"I grow tomatoes in my polytunnel and get massive crops every year. The secret? Feed every single week once the flowers appear. Never miss a week — ever.",
        intro:"Tomatoes are the ultimate grow-your-own crop. A little effort pays back in bucketloads of flavour.",
        takes:["Need warmth — start indoors, plant out after frosts","Cordon types need pinching and supporting","Feed weekly with tomato food once flowers appear","Most popular grow-your-own crop in the UK"],
        steps:[{n:1,t:"Choose your type",d:"Bush types like 'Tumbling Tom' are easiest. Cordon types like 'Gardener's Delight' give higher yields."},{n:2,t:"Start indoors March",d:"Sow in small pots on a warm windowsill. Plant outside only after last frost (late May UK)."},{n:3,t:"Support and pinch",d:"For cordon types, tie to a cane. Pinch out sideshoots between main stem and branches."},{n:4,t:"Water and feed consistently",d:"Irregular watering causes blossom end rot. Water daily, feed weekly once flowers appear."}],
        cl:["Choose your tomato variety","Sow indoors in March or buy plants in May","Set up canes and supports early","Buy a bottle of tomato feed"],
        tip:"Put a banana skin at the bottom of your planting hole — the potassium genuinely supercharges fruiting!",
        mistakes:["Planting out before last frost — one cold night can kill them","Skipping the weekly feed","Inconsistent watering — causes splitting"],
        quiz:{q:"What to do with sideshoots on cordon tomatoes?",opts:["Leave them","Pinch them out","Tie them in","Water more"],a:1}},
      { id:"l3-potatoes", title:"Potatoes", emoji:"🥔", dur:"10 min", vk:"grow-potatoes",
        glen:"On my 80-plot allotment site potatoes are the number one crop. Get your chitting right and earth up properly — those two things make all the difference.",
        intro:"Few things beat digging up your own potatoes. It's like treasure hunting — and the treasure is delicious.",
        takes:["First earlies give new potatoes June–July","Plant March–April after chitting","Earth up regularly to protect tubers","Brilliant in large containers or grow bags"],
        steps:[{n:1,t:"Choose and chit",d:"Buy seed potatoes Jan–Feb. Chitting means sprouting in a cool, light spot before planting."},{n:2,t:"Plant at the right depth",d:"10–15cm deep, sprouts facing up. Space 30cm apart in rows 60cm apart."},{n:3,t:"Earth up",d:"When shoots are 20–25cm tall, mound soil up around them. Repeat 2–3 times."},{n:4,t:"Harvest",d:"First earlies when flowers appear. Maincrop when foliage yellows. Lift on a dry day."}],
        cl:["Buy first early seed potatoes Jan–Feb","Start chitting on a cool windowsill","Prepare your bed or grow bags","Mark planting date on your calendar"],
        tip:"Grow bags on patios are brilliant — no digging, just roll back the bag to harvest!",
        mistakes:["Forgetting to earth up — green potatoes are mildly toxic","Harvesting too early — wait for the flowers"],
        quiz:{q:"What is 'chitting' a potato?",opts:["Cutting it in half","Letting it sprout shoots before planting","Soaking overnight","Removing the skin"],a:1}},
    ]},
  { id:"level-4", level:4, title:"Grow All Year", emoji:"🗓️", color:"#1565C0",
    desc:"Plan across seasons. Never have a bare garden again.",
    lessons:[
      { id:"l4-seasonal", title:"Seasonal Planning", emoji:"📅", dur:"10 min", vk:"seasonal-planning",
        glen:"I keep a growing notebook every year. Looking back at your notes from last season is the single fastest way to improve as a grower.",
        intro:"Understanding the seasons transforms you from a reactive grower into a confident, purposeful planner.",
        takes:["Growing is year-round if you plan ahead","Each season has its own tasks and crops","Succession sowing avoids gluts and gaps","Keep a growing journal — it's invaluable"],
        steps:[{n:1,t:"Map the year",d:"Spring: Sow and plant. Summer: Water, feed, harvest. Autumn: Clear, plant garlic. Winter: Plan and order seeds."},{n:2,t:"Use a sowing calendar",d:"Mark sowing dates 8–10 weeks before your target planting-out date."},{n:3,t:"Succession sow",d:"Sow small amounts every 2–3 weeks to stagger your harvest."},{n:4,t:"Keep notes",d:"A notebook noting what you sowed, when, and how it performed is invaluable."}],
        cl:["Check the Monthly Planner in this app","Start a simple growing journal","Plan next month's sowing","Order seeds for the coming season"],
        tip:"Order seeds in January — popular varieties sell out by March every year!",
        mistakes:["Treating the garden as purely seasonal — there's always something to do","Not noting what worked","Trying to grow everything at once in your first year"],
        quiz:{q:"Best time to order UK seeds?",opts:["March","January","May","Whenever you fancy"],a:1}},
    ]},
];

const MONTHLY = {
  1:{s:["Onion seeds (indoors)","Broad beans (indoors)","Chillies (heated propagator)"],po:[],h:["Winter salad leaves","Kale","Leeks"],j:["Order seeds from catalogues","Plan your growing space","Clean and sharpen tools","Start chitting seed potatoes"],tip:"🌨️ January is perfect for planning. Best varieties sell out quickly — order now!"},
  2:{s:["Broad beans","Onions","Aubergines (heated)","Chillies"],po:[],h:["Purple sprouting broccoli","Winter salads","Kale"],j:["Continue chitting potatoes","Prepare beds with compost","Sow indoors with heat","Check for early slugs"],tip:"❄️ Still cold but indoors we can get started! Windowsills and heat mats are your friends."},
  3:{s:["Tomatoes (indoors)","Peppers","Lettuce","Peas","Spinach","Spring onions"],po:["Onion sets","Garlic","First early potatoes"],h:["Winter salads","Purple sprouting broccoli"],j:["Plant first early potatoes","Sow tomatoes indoors","Harden off indoor seedlings","Put up slug barriers"],tip:"🌷 March is exciting — the growing season begins! Frost still possible so protect young plants."},
  4:{s:["Cucumbers (indoors)","Courgettes","Beans","Beetroot","Carrots","Radishes"],po:["Onion sets","Lettuce (hardened off)","Second early potatoes"],h:["Spring onions","Radishes","Asparagus"],j:["Pot on tomato seedlings","Harden off seedlings","Protect against late frosts","Install climbing supports"],tip:"🌱 April is one of the busiest months. Little and often with sowing gives harvests all summer."},
  5:{s:["Sweetcorn","Squash","Beans","Courgettes","Salads for succession"],po:["Tomatoes (after last frost)","Courgettes","Cucumbers","Beans"],h:["Asparagus","Salad leaves","Spring onions","Radishes"],j:["Plant out tender crops after 15th May","Erect canes and nets","Pinch out tomato sideshoots","Watch for aphids"],tip:"🌞 Last frosts usually over by mid-May. Wait before planting tender crops outdoors."},
  6:{s:["French beans (succession)","Salads","Kale for autumn"],po:["Leeks","Squash"],h:["First early potatoes","Strawberries","Lettuce","Broad beans"],j:["Water daily in dry spells","Feed tomatoes weekly","Check for blight","Harvest regularly"],tip:"🍓 June brings first real harvests. Stay on top of watering — pots dry out fast!"},
  7:{s:["Spring onions","Salads for autumn"],po:[],h:["Tomatoes","Cucumbers","Courgettes","Potatoes","Beans","Peas","Beetroot"],j:["Water and feed consistently","Harvest every 2–3 days","Look for pests","Support heavy fruit trusses"],tip:"🥒 Peak season! Harvest every 2–3 days or crops stop. Courgettes become marrows overnight!"},
  8:{s:["Spring onions","Spinach","Land cress","Salad leaves for autumn"],po:["Kale for winter","Purple sprouting broccoli"],h:["Tomatoes","Cucumbers","Courgettes","Sweetcorn","Beans"],j:["Keep feeding and watering","Remove spent plants","Save seeds from best plants","Order garlic for autumn"],tip:"🌽 Sweetcorn is ready when silks go dark. Press a kernel — milky juice means perfect!"},
  9:{s:["Winter salad leaves","Lamb's lettuce","Garlic (from mid-Sept)"],po:["Spring cabbages","Garlic"],h:["Squash and pumpkins","Maincrop potatoes","Tomatoes"],j:["Plant garlic cloves","Clear spent beds","Add compost to empty beds","Lift maincrop potatoes"],tip:"🍂 September marks the shift. Clear, compost and plant garlic for next year's harvest."},
  10:{s:["Broad beans (overwintering)","Green manures"],po:["Garlic","Overwintering onion sets"],h:["Squash","Kale","Leeks","Parsnips"],j:["Harvest and store squash","Plant overwintering broad beans","Mulch empty beds","Tidy and compost"],tip:"🎃 Squash must be harvested before hard frost. Ripe squash sounds hollow when tapped!"},
  11:{s:["Broad beans","Garlic (last chance)"],po:["Garlic"],h:["Kale","Leeks","Brussels sprouts","Parsnips"],j:["Protect tender plants with fleece","Lag outdoor taps","Clear leaves from beds","Sharpen and oil tools"],tip:"🍃 Kale tastes better after frost — the cold converts starch to sugar. Pick outer leaves regularly."},
  12:{s:[],po:[],h:["Brussels sprouts","Kale","Parsnips","Leeks","Winter salads"],j:["Order seed catalogues","Review growing notes","Plan next year's layout","Service tools","Enjoy your produce!"],tip:"🎄 December is for planning and dreaming. Browse seed catalogues with a cuppa!"},
};

const PROBLEMS = [
  {id:"slugs",title:"Slug Damage",emoji:"🐌",sev:"medium",vk:"fix-slugs",looks:"Irregular holes in leaves with slime trails. Worst overnight and after rain.",causes:["Slugs and snails feeding at night","Particularly bad in wet weather","Worse in beds with lots of mulch"],fix:"Go out at night with a torch and remove slugs. Set beer traps. Apply organic ferric phosphate pellets. Use copper tape around containers. Encourage hedgehogs and frogs!",prev:"Raise seedlings before planting out. Clear debris. Let soil surface dry between waterings."},
  {id:"yellow-leaves",title:"Yellow Leaves",emoji:"🟡",sev:"medium",vk:null,looks:"Leaves turning yellow — sometimes from the bottom up, sometimes patchy.",causes:["Overwatering / waterlogged roots","Nitrogen deficiency","Natural ageing of lower leaves"],fix:"Check soil moisture first. If soggy, improve drainage. If dry and pale, apply liquid nitrogen feed.",prev:"Ensure good drainage. Feed every 2 weeks. Always check soil before watering."},
  {id:"wilting",title:"Wilting Plants",emoji:"😮",sev:"high",vk:null,looks:"Plants look sad and droopy, especially in the afternoon heat.",causes:["Underwatering (most common)","Overwatering","Root rot","Extreme heat stress"],fix:"Check soil immediately. Bone dry? Water deeply. Soggy? Let roots air. Wilting on hot afternoons and recovering by evening is normal heat stress.",prev:"Water consistently. Mulch around plants. Water in the morning."},
  {id:"aphids",title:"Aphids",emoji:"🐛",sev:"low",vk:"fix-aphids",looks:"Tiny green, black or white insects on new growth. Sticky residue and distorted leaves.",causes:["Reproduce extremely fast in warm weather","More common when plants are stressed","Ants farming aphids"],fix:"Blast off with a strong jet of water. Squish by hand. Apply insecticidal soap. Encourage ladybirds!",prev:"Grow nasturtiums and marigolds as companions. Keep plants healthy. Check under leaves weekly."},
  {id:"leggy",title:"Leggy Seedlings",emoji:"📏",sev:"medium",vk:null,looks:"Seedlings tall, thin and floppy — leaning toward the light.",causes:["Insufficient light","Too much warmth without light","Sown too early"],fix:"Move to a much brighter spot. Rotate trays daily. Pot up deeper — tomato stems will root along their length!",prev:"Sow from March onwards. Use a south-facing windowsill."},
  {id:"no-fruit",title:"Plants Not Fruiting",emoji:"🍃",sev:"medium",vk:null,looks:"Healthy leaves and flowers but no fruit setting.",causes:["Poor pollination","Too much nitrogen fertiliser","Inconsistent watering"],fix:"For tomatoes: tap flower clusters daily. Switch to high-potassium tomato feed. Consistent watering.",prev:"Grow pollinator-friendly flowers nearby. Feed with tomato food once flowers appear."},
];

const BADGES = [
  {id:"first-seed",e:"🫘",t:"First Seed",d:"Planted your very first seed"},
  {id:"soil-expert",e:"🌍",t:"Soil Expert",d:"Mastered the basics of soil"},
  {id:"green-thumb",e:"👍",t:"Green Thumb",d:"Completed Level 1"},
  {id:"easy-wins",e:"🥬",t:"Easy Wins",d:"Completed Level 2"},
  {id:"week-streak",e:"🔥",t:"7-Day Streak",d:"Visited 7 days in a row"},
  {id:"tomato-master",e:"🍅",t:"Tomato Master",d:"Completed the tomato lesson"},
  {id:"container-grower",e:"📦",t:"Container Grower",d:"Mastered container growing"},
  {id:"problem-solver",e:"🔍",t:"Problem Solver",d:"Used the problem solver"},
  {id:"planner",e:"📅",t:"Planner",d:"Set up your grower profile"},
  {id:"glens-student",e:"📺",t:"Glen's Student",d:"Watched your first video lesson"},
];

const MN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const Ctx = createContext(null);
const useApp = () => useContext(Ctx);

function Provider({ children }) {
  const ls = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const ss = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const [profile, setProf] = useState(() => ls("ga_p", null));
  const [done, setDone]     = useState(() => ls("ga_d", []));
  const [badges, setBadges] = useState(() => ls("ga_b", []));
  const [streak, setStreak] = useState(() => ls("ga_s", { count: 0, last: null }));
  const [page, setPage]     = useState("home");
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [toast, setToast]   = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    if (streak.last !== today) {
      const yd = new Date(); yd.setDate(yd.getDate() - 1);
      const c = streak.last === yd.toDateString() ? streak.count + 1 : 1;
      const ns = { count: c, last: today }; setStreak(ns); ss("ga_s", ns);
    }
  }, []);

  const showToast = m => { setToast(m); setTimeout(() => setToast(null), 2800); };

  const awardBadge = id => setBadges(prev => {
    if (prev.includes(id)) return prev;
    const n = [...prev, id]; ss("ga_b", n);
    const b = BADGES.find(x => x.id === id);
    if (b) showToast(`${b.e} Badge unlocked: ${b.t}!`);
    return n;
  });

  const completeLesson = lid => setDone(prev => {
    if (prev.includes(lid)) return prev;
    const n = [...prev, lid]; ss("ga_d", n);
    const bmap = { "l1-seeds":"first-seed","l1-soil":"soil-expert","l1-containers":"container-grower","l3-tomatoes":"tomato-master" };
    if (bmap[lid]) setTimeout(() => awardBadge(bmap[lid]), 800);
    COURSES.forEach(c => { if (c.lessons.every(l => n.includes(l.id))) { const lb = {"level-1":"green-thumb","level-2":"easy-wins"}; if (lb[c.id]) setTimeout(() => awardBadge(lb[c.id]), 1200); } });
    return n;
  });

  const setProfile = p => { setProf(p); ss("ga_p", p); };
  const navigate   = (p, ex = {}) => { setPage(p); if (ex.lesson) setLesson(ex.lesson); if (ex.course) setCourse(ex.course); window.scrollTo(0, 0); };
  const reset      = () => { localStorage.clear(); setProf(null); setDone([]); setBadges([]); setStreak({ count:0, last:null }); setPage("home"); };

  return (
    <Ctx.Provider value={{ profile, setProfile, done, completeLesson, badges, awardBadge, streak, page, navigate, lesson, course, reset, toast }}>
      {children}
      {toast && <div style={{ position:"fixed", bottom:80, left:"50%", transform:"translateX(-50%)", background:"#111", color:"#fff", padding:"12px 20px", borderRadius:999, fontWeight:700, fontSize:13, zIndex:9999, whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(0,0,0,.4)", animation:"fadeUp .3s ease" }}>{toast}</div>}
    </Ctx.Provider>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage() {
  const { navigate } = useApp();
  return (
    <div style={{ minHeight:"100vh" }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(155deg,#0a1a05 0%,#1a3a08 50%,#2D5016 80%,#4e8226 100%)", padding:"52px 24px 64px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        {[{ t:-40,r:-40,s:160 },{ b:-60,l:-20,s:200 }].map((c,i) =>
          <div key={i} style={{ position:"absolute",top:c.t,right:c.r,bottom:c.b,left:c.l,width:c.s,height:c.s,borderRadius:"50%",background:"rgba(255,255,255,.04)" }}/>)}
        {[{ t:"8%",l:"4%",e:"🍅" },{ t:"10%",r:"5%",e:"🥕" },{ b:"12%",r:"5%",e:"🥬" },{ b:"16%",l:"5%",e:"🫘" }].map((d,i) =>
          <div key={i} style={{ position:"absolute",top:d.t,right:d.r,bottom:d.b,left:d.l,fontSize:28,opacity:.1,animation:"pulse 3s infinite",animationDelay:`${i*0.6}s` }}>{d.e}</div>)}
        <div style={{ position:"relative",zIndex:1 }}>
          {/* Channel badge */}
          <div style={{ display:"flex",justifyContent:"center",marginBottom:20 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:999,padding:"8px 18px 8px 10px" }}>
              <VPILogo size={32}/>
              <div style={{ textAlign:"left" }}>
                <div style={{ color:"rgba(255,255,255,.45)",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em" }}>by {HOST} at</div>
                <div style={{ color:"#fff",fontSize:13,fontWeight:800 }}>{CHANNEL_NAME}</div>
              </div>
            </div>
          </div>
          <h1 style={{ fontSize:"clamp(26px,7vw,40px)",fontWeight:900,color:"#fff",lineHeight:1.15,marginBottom:10 }}>The Growers<br/>Academy</h1>
          <p style={{ color:"rgba(255,255,255,.82)",fontSize:16,fontWeight:600,marginBottom:6,lineHeight:1.4 }}>Learn to grow your own veg<br/>in a fun, interactive way</p>
          <p style={{ color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:26,maxWidth:270,margin:"0 auto 26px" }}>Lessons, videos and a weekly planner — everything a beginner needs, from {HOST}.</p>
          <div style={{ display:"flex",flexDirection:"column",gap:10,alignItems:"center" }}>
            <button className="btn blg" onClick={() => navigate("onboarding")} style={{ background:"#fff",color:"var(--g7)",width:"100%",maxWidth:290,boxShadow:"0 8px 28px rgba(0,0,0,.28)" }}>🚀 Start Growing — It's Free</button>
            <button className="btn byt" onClick={() => navigate("videos")} style={{ width:"100%",maxWidth:290 }}><YTIcon/> Browse Video Lessons</button>
          </div>
        </div>
      </div>

      {/* Benefits grid */}
      <div style={{ padding:"28px 18px" }}>
        <h2 style={{ textAlign:"center",fontSize:19,fontWeight:900,marginBottom:4,color:"var(--g8)" }}>Why The Growers Academy?</h2>
        <p style={{ textAlign:"center",color:"var(--tl)",marginBottom:18,fontSize:13 }}>Real advice from {HOST}'s allotment, built for beginners</p>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:11 }}>
          {[{e:"📖",t:"Step-by-step lessons",d:"Structured courses for complete beginners"},{e:"📺",t:`${HOST}'s video lessons`,d:`Watch & learn from ${CHANNEL_NAME}`},{e:"📅",t:"Monthly planner",d:"Know exactly what to do each week"},{e:"⭐",t:"Earn badges",d:"Track progress as your skills grow"}].map((b,i) => (
            <div key={i} className="card fu" style={{ animationDelay:`${i*0.07}s`,textAlign:"center" }}>
              <div style={{ fontSize:26,marginBottom:7 }}>{b.e}</div>
              <div style={{ fontWeight:800,fontSize:13,marginBottom:4,color:"var(--g8)" }}>{b.t}</div>
              <div style={{ fontSize:12,color:"var(--tl)",lineHeight:1.4 }}>{b.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured video */}
      <div style={{ padding:"0 18px 22px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:13 }}>
          <VPILogo size={26}/><h2 style={{ fontSize:16,fontWeight:800,color:"var(--g8)" }}>{HOST}'s featured video</h2>
        </div>
        <YTPlayer videoKey="grow-tomatoes"/>
        <button className="btn bs bsm" style={{ width:"100%",marginTop:11 }} onClick={() => navigate("videos")}>View all video lessons →</button>
      </div>

      {/* About Glen */}
      <div style={{ padding:"0 18px 22px" }}>
        <div style={{ background:"linear-gradient(135deg,#0a1a05,#1a3a08)",borderRadius:24,padding:20 }}>
          <div style={{ display:"flex",gap:14,alignItems:"flex-start" }}>
            <VPILogo size={44}/>
            <div>
              <div style={{ color:"var(--g3)",fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:".06em",marginBottom:4 }}>About your instructor</div>
              <h3 style={{ color:"#fff",fontWeight:800,fontSize:15,marginBottom:6 }}>Hi, I'm {HOST} 👋</h3>
              <p style={{ color:"rgba(255,255,255,.7)",fontSize:13,lineHeight:1.6 }}>I'm based on the South-West coast of the UK and run a site with 80 allotment plots. I share practical growing tips, allotment diaries and DIY projects on my YouTube channel and website.</p>
              <div style={{ display:"flex",gap:8,marginTop:12,flexWrap:"wrap" }}>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"#FF0000",color:"#fff",borderRadius:999,padding:"7px 14px",fontSize:12,fontWeight:700,textDecoration:"none" }}><YTIcon/> YouTube</a>
                <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.1)",color:"#fff",borderRadius:999,padding:"7px 14px",fontSize:12,fontWeight:700,textDecoration:"none" }}>🌱 Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding:"0 18px 14px",textAlign:"center" }}>
        <button className="btn bp blg" onClick={() => navigate("onboarding")} style={{ width:"100%",maxWidth:320 }}>🌱 Start Your Growing Journey</button>
        <p style={{ marginTop:11,fontSize:12,color:"var(--tmut)" }}>Free to use · No account required</p>
      </div>

      <BrandFooter/>
    </div>
  );
}

// ─── VIDEOS PAGE ──────────────────────────────────────────────────────────────
function VideosPage() {
  const { navigate, awardBadge, badges } = useApp();
  const [pk, setPk] = useState(null);
  const handlePlay = k => { setPk(k); if (!badges.includes("glens-student")) setTimeout(() => awardBadge("glens-student"), 1000); };

  const LABELS = {"fix-slugs":"Slug Control","soil-basics":"Soil & Compost","grow-tomatoes":"Growing Tomatoes","containers-beds":"Containers & Beds","sunlight-watering":"Sunlight & Watering","tools-guide":"Gardening Tools","sowing-seeds":"Sowing Seeds","grow-lettuce":"Growing Lettuce","grow-herbs":"Growing Herbs","grow-radish":"Radishes","grow-potatoes":"Growing Potatoes","seasonal-planning":"Seasonal Planning","fix-aphids":"Controlling Aphids"};
  const sections = [
    {title:"🌱 Getting Started",keys:["soil-basics","containers-beds","sunlight-watering","tools-guide","sowing-seeds"]},
    {title:"🥬 Easy Wins",keys:["grow-lettuce","grow-herbs","grow-radish"]},
    {title:"🍅 Grow Like a Pro",keys:["grow-tomatoes","grow-potatoes"]},
    {title:"🗓️ Grow All Year",keys:["seasonal-planning"]},
    {title:"🔍 Problem Fixes",keys:["fix-slugs","fix-aphids"]},
  ];

  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0a1a05,#1a2a10)",padding:"22px 16px 24px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
          <button onClick={() => navigate("home")} style={{ border:"none",background:"rgba(255,255,255,.08)",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18,color:"#fff" }}>←</button>
          <VPILogo size={28}/>
          <div><h1 style={{ color:"#fff",fontSize:18,fontWeight:900,lineHeight:1.1 }}>Video Lessons</h1><p style={{ color:"rgba(255,255,255,.4)",fontSize:11 }}>by {HOST} · {CHANNEL_NAME}</p></div>
        </div>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,0,0,.85)",color:"#fff",borderRadius:999,padding:"9px 18px",fontSize:13,fontWeight:700,textDecoration:"none" }}><YTIcon/> Subscribe to {CHANNEL_NAME}</a>
      </div>

      <div style={{ padding:"16px" }}>
        <div style={{ background:"var(--g0)",border:"2px solid var(--g2)",borderRadius:14,padding:"11px 15px",marginBottom:18,display:"flex",gap:10,alignItems:"flex-start" }}>
          <VPILogo size={22}/>
          <p style={{ fontSize:13,color:"var(--g8)",lineHeight:1.5 }}><strong>{HOST}'s videos pair with written lessons.</strong> Watch first, then follow the steps and mark complete to earn your badge!</p>
        </div>

        {sections.map(sec => (
          <div key={sec.title} style={{ marginBottom:24 }}>
            <h2 style={{ fontSize:15,fontWeight:800,marginBottom:12 }}>{sec.title}</h2>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {sec.keys.map(key => {
                const id = MY_VIDEOS[key]; const isPlaying = pk === key; const label = LABELS[key] || key;
                return (
                  <div key={key} style={{ background:"#fff",borderRadius:22,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.07)",border:"1px solid var(--cdk)" }}>
                    {id ? (
                      <div style={{ position:"relative",paddingTop:"56.25%",background:"#000" }}>
                        {isPlaying
                          ? <iframe style={{ position:"absolute",inset:0,width:"100%",height:"100%",border:"none" }} src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={label}/>
                          : <div style={{ position:"absolute",inset:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={() => handlePlay(key)}>
                              <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={label} style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }}/>
                              <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.22)" }}/>
                              <div style={{ position:"relative",zIndex:2,width:52,height:52,background:"rgba(255,0,0,.92)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ marginLeft:3 }}><polygon points="5,3 19,12 5,21"/></svg>
                              </div>
                            </div>
                        }
                      </div>
                    ) : (
                      <div style={{ background:"#1a1a1a",padding:"22px",textAlign:"center" }}>
                        <div style={{ fontSize:26,marginBottom:5 }}>📺</div>
                        <div style={{ color:"#444",fontSize:12,fontWeight:600 }}>Video coming soon</div>
                      </div>
                    )}
                    <div style={{ padding:"11px 15px 13px" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                        <VPILogo size={16}/>
                        <span style={{ fontSize:10,fontWeight:700,color:"var(--tmut)",textTransform:"uppercase",letterSpacing:".05em" }}>{CHANNEL_NAME}</span>
                        {id && <span style={{ marginLeft:"auto",fontSize:10,background:"#E8F5E9",color:"#2E7D32",padding:"2px 8px",borderRadius:999,fontWeight:700 }}>✅ Live</span>}
                        {!id && <span style={{ marginLeft:"auto",fontSize:10,background:"var(--cdk)",color:"var(--tmut)",padding:"2px 8px",borderRadius:999,fontWeight:700 }}>Coming soon</span>}
                      </div>
                      <div style={{ fontWeight:800,fontSize:14 }}>{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <BrandFooter/>
      </div>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function OnboardingPage() {
  const { setProfile, navigate, awardBadge } = useApp();
  const [step, setStep] = useState(0);
  const [ans, setAns]   = useState({ space:[], experience:"", time:"", crops:[], goal:"" });

  const STEPS = [
    {id:"space",title:"What's your growing space?",sub:"Pick everything that applies",multi:true,opts:[{v:"garden",l:"Garden",e:"🌳"},{v:"greenhouse",l:"Greenhouse",e:"🏠"},{v:"raised-beds",l:"Raised Beds",e:"📦"},{v:"containers",l:"Containers",e:"🪴"},{v:"balcony",l:"Balcony/Patio",e:"🌇"},{v:"windowsill",l:"Windowsill",e:"🪟"}]},
    {id:"experience",title:"How much experience do you have?",sub:"Be honest — no wrong answers!",multi:false,opts:[{v:"beginner",l:"Total beginner",e:"🌱",d:"Never grown anything before"},{v:"some",l:"Some experience",e:"🌿",d:"Mixed results so far"},{v:"confident",l:"Fairly confident",e:"🌾",d:"I grow but want to improve"}]},
    {id:"time",title:"Time available each week?",sub:"Even 30 minutes is enough!",multi:false,opts:[{v:"30min",l:"Less than 30 mins",e:"⚡",d:"Quick and easy crops"},{v:"1hour",l:"30–60 minutes",e:"⏰",d:"A good range of crops"},{v:"2hours",l:"1–2 hours",e:"🌱",d:"Most crops possible"},{v:"more",l:"2+ hours",e:"🌾",d:"Go for it — grow everything!"}]},
    {id:"crops",title:"What do you want to grow?",sub:"Pick your favourites",multi:true,opts:[{v:"tomatoes",l:"Tomatoes",e:"🍅"},{v:"potatoes",l:"Potatoes",e:"🥔"},{v:"lettuce",l:"Salad",e:"🥬"},{v:"carrots",l:"Carrots",e:"🥕"},{v:"cucumbers",l:"Cucumbers",e:"🥒"},{v:"herbs",l:"Herbs",e:"🌿"},{v:"beans",l:"Beans",e:"🫘"},{v:"other",l:"Other veg",e:"🌽"}]},
    {id:"goal",title:"What's your main goal?",sub:"We'll personalise your path",multi:false,opts:[{v:"save-money",l:"Save money",e:"💰",d:"Cut the grocery bill"},{v:"health",l:"Healthier food",e:"💚",d:"Know what's in my food"},{v:"skill",l:"Learn a new skill",e:"📚",d:"Personal development"},{v:"self-sufficient",l:"Self-sufficiency",e:"🏡",d:"Grow more of my own food"},{v:"enjoyment",l:"Enjoy gardening",e:"🌈",d:"It's my happy place"}]},
  ];

  const cur = STEPS[step]; const isLast = step === STEPS.length - 1;
  const toggle = v => { if (cur.multi) { setAns(a => ({ ...a, [cur.id]: a[cur.id].includes(v) ? a[cur.id].filter(x => x !== v) : [...a[cur.id], v] })); } else { setAns(a => ({ ...a, [cur.id]: v })); } };
  const isSel  = v => { const val = ans[cur.id]; return Array.isArray(val) ? val.includes(v) : val === v; };
  const canNext= () => { const v = ans[cur.id]; return Array.isArray(v) ? v.length > 0 : !!v; };
  const next   = () => { if (!isLast) { setStep(s => s + 1); } else { const p = { ...ans, startedAt: new Date().toISOString(), recommendedLevel: ans.experience === "beginner" ? 1 : ans.experience === "some" ? 2 : 3 }; setProfile(p); awardBadge("planner"); navigate("welcome"); } };

  return (
    <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column" }}>
      <div style={{ background:"#fff",padding:"13px 18px",borderBottom:"1px solid var(--cdk)",position:"sticky",top:0,zIndex:10 }}>
        <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:9 }}>
          {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ border:"none",background:"var(--cream)",borderRadius:10,width:35,height:35,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:17 }}>←</button>}
          <div style={{ flex:1 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}><span style={{ fontSize:12,fontWeight:700,color:"var(--g6)" }}>Step {step+1} of {STEPS.length}</span><span style={{ fontSize:12,color:"var(--tmut)" }}>{Math.round((step/STEPS.length)*100)}%</span></div>
            <div className="pb"><div className="pf" style={{ width:`${(step/STEPS.length)*100}%` }}/></div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}><VPILogo size={20}/><span style={{ fontWeight:800,color:"var(--g8)",fontSize:13 }}>The Growers Academy</span></div>
      </div>

      <div style={{ flex:1,padding:"24px 18px 18px" }} key={step}>
        <h2 style={{ fontSize:20,fontWeight:900,marginBottom:4,lineHeight:1.3 }}>{cur.title}</h2>
        <p style={{ color:"var(--tl)",fontSize:13,marginBottom:20 }}>{cur.sub}</p>
        <div style={{ display:"grid",gridTemplateColumns:cur.multi?"1fr 1fr":"1fr",gap:9 }}>
          {cur.opts.map(opt => { const sel = isSel(opt.v); return (
            <button key={opt.v} onClick={() => toggle(opt.v)} style={{ padding:"14px",border:`2px solid ${sel?"var(--g5)":"var(--cdk)"}`,borderRadius:16,background:sel?"var(--g0)":"#fff",cursor:"pointer",textAlign:"left",transition:"all .15s",transform:sel?"scale(1.02)":"scale(1)",fontFamily:"var(--ff)" }}>
              <div style={{ fontSize:cur.multi?26:27,marginBottom:5 }}>{opt.e}</div>
              <div style={{ fontWeight:800,fontSize:13,color:sel?"var(--g8)":"var(--td)",marginBottom:opt.d?3:0 }}>{opt.l}</div>
              {opt.d && <div style={{ fontSize:11,color:"var(--tl)",lineHeight:1.4 }}>{opt.d}</div>}
            </button>
          ); })}
        </div>
      </div>

      <div style={{ padding:"13px 18px",background:"#fff",borderTop:"1px solid var(--cdk)" }}>
        <button className="btn bp blg" style={{ width:"100%" }} disabled={!canNext()} onClick={next}>{isLast ? "🌱 Create My Grower Profile" : "Next →"}</button>
        {step === 0 && <button style={{ width:"100%",marginTop:9,border:"none",background:"none",color:"var(--tmut)",cursor:"pointer",fontSize:13,fontFamily:"var(--ff)",padding:8 }} onClick={() => navigate("courses")}>Skip for now</button>}
      </div>
    </div>
  );
}

// ─── WELCOME ──────────────────────────────────────────────────────────────────
function WelcomePage() {
  const { profile, navigate } = useApp();
  if (!profile) { navigate("home"); return null; }
  const msgs = { "save-money":"You're going to save a bundle growing your own!", "health":"Homegrown food tastes better — and you'll know exactly what's in it.", "skill":"Gardening is one of the most rewarding skills you can learn!", "self-sufficient":"Growing your own food is incredibly empowering. Let's build those skills!", "enjoyment":"The garden is the best place in the world. Welcome home!" };
  const recLevels = { 1:{ t:"Level 1: Getting Started", d:"We'll start with soil, containers, sunlight and your first seeds." }, 2:{ t:"Level 2: Easy Wins", d:"Let's grow some fast, rewarding crops right away." }, 3:{ t:"Level 3: Grow Like a Pro", d:"You're ready to tackle tomatoes, cucumbers and more." } };
  const rec = recLevels[profile.recommendedLevel] || recLevels[1];
  const spE = { garden:"🌳",greenhouse:"🏠","raised-beds":"📦",containers:"🪴",balcony:"🌇",windowsill:"🪟" };

  return (
    <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column" }}>
      <div style={{ background:"linear-gradient(155deg,#0a1a05,#4e8226)",padding:"50px 24px 38px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ fontSize:52,marginBottom:12,animation:"pop .6s ease" }}>🎉</div>
        <h1 style={{ color:"#fff",fontSize:23,fontWeight:900,marginBottom:8 }}>Welcome to the Academy!</h1>
        <p style={{ color:"rgba(255,255,255,.82)",fontSize:15,lineHeight:1.5 }}>{msgs[profile.goal] || "Your growing journey starts now!"}</p>
        <div style={{ marginTop:16,display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.1)",borderRadius:999,padding:"7px 16px 7px 9px" }}>
          <VPILogo size={22}/><span style={{ color:"rgba(255,255,255,.8)",fontSize:12,fontWeight:700 }}>Powered by {CHANNEL_NAME}</span>
        </div>
      </div>

      <div style={{ padding:"20px 18px",flex:1 }}>
        {profile.space?.length > 0 && <div className="card" style={{ marginBottom:12 }}>
          <h3 style={{ fontSize:14,fontWeight:800,marginBottom:9,color:"var(--g8)" }}>Your growing space 🌱</h3>
          <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>{profile.space.map(s => <span key={s} style={{ background:"var(--g0)",border:"1px solid var(--g2)",borderRadius:999,padding:"5px 12px",fontSize:12,fontWeight:700,color:"var(--g8)" }}>{spE[s]} {s.replace("-"," ")}</span>)}</div>
        </div>}
        <div className="card" style={{ marginBottom:12,border:"2px solid var(--g2)" }}>
          <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
            <div style={{ width:44,height:44,background:"var(--g6)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>🗺️</div>
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:"var(--g6)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:3 }}>Your recommended path</div>
              <h3 style={{ fontSize:15,fontWeight:800,marginBottom:3 }}>{rec.t}</h3>
              <p style={{ fontSize:13,color:"var(--tl)",lineHeight:1.5 }}>{rec.d}</p>
            </div>
          </div>
        </div>
        <div style={{ background:"linear-gradient(135deg,#FFF8E1,#FFFDE7)",border:"2px solid #FFC107",borderRadius:20,padding:17,textAlign:"center",marginBottom:20,animation:"pop .8s .5s ease both" }}>
          <div style={{ fontSize:34,marginBottom:6 }}>📅</div>
          <div style={{ fontWeight:800,color:"#E65100",marginBottom:3 }}>Badge unlocked!</div>
          <div style={{ fontWeight:700,fontSize:14,marginBottom:3 }}>Planner</div>
          <div style={{ fontSize:12,color:"var(--tl)" }}>You've set up your grower profile</div>
        </div>
        <button className="btn bp blg" style={{ width:"100%",marginBottom:10 }} onClick={() => navigate("dashboard")}>🚀 Go to My Dashboard</button>
        <button className="btn bs" style={{ width:"100%",marginBottom:10 }} onClick={() => navigate("courses")}>📚 Start My First Lesson</button>
        <button className="btn byt" style={{ width:"100%" }} onClick={() => navigate("videos")}><YTIcon/> Browse {HOST}'s Video Lessons</button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage() {
  const { profile, done, badges, streak, navigate } = useApp();
  const IT = [{id:"t1",task:"Check soil moisture in all containers"},{id:"t2",task:"Look under leaves for pests"},{id:"t3",task:"Water seedlings in the morning"},{id:"t4",task:"Harden off any indoor seedlings"},{id:"t5",task:"Pull any visible weeds"}];
  const [tasks, setTasks] = useState(() => { try { const s = localStorage.getItem("ga_tasks"); return s ? JSON.parse(s) : IT.map(t => ({ ...t, done:false })); } catch { return IT.map(t => ({ ...t, done:false })); } });
  const toggleT = id => { const n = tasks.map(t => t.id === id ? { ...t, done:!t.done } : t); setTasks(n); try { localStorage.setItem("ga_tasks", JSON.stringify(n)); } catch {} };

  const total = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const pct   = Math.round((done.length / total) * 100);
  const month = new Date().toLocaleString("default", { month:"long" });
  const hour  = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const nextLesson = (() => { for (const c of COURSES) for (const l of c.lessons) if (!done.includes(l.id)) return { c, l }; return null; })();
  const recentBadges = badges.slice(-3).map(id => BADGES.find(b => b.id === id)).filter(Boolean);

  return (
    <div>
      <div style={{ background:"linear-gradient(155deg,#0a1a05,#4e8226)",padding:"20px 18px 24px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.04)" }}/>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative" }}>
          <div>
            <div style={{ color:"rgba(255,255,255,.6)",fontSize:13,marginBottom:3 }}>{greeting} 👋</div>
            <h1 style={{ color:"#fff",fontSize:19,fontWeight:900,marginBottom:3 }}>{profile?.experience === "beginner" ? "Beginner Grower" : profile?.experience === "some" ? "Growing Enthusiast" : "Confident Grower"}!</h1>
            <div style={{ color:"rgba(255,255,255,.65)",fontSize:13 }}>{month} growing season</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ background:"rgba(255,255,255,.1)",border:"2px solid rgba(255,255,255,.18)",borderRadius:13,padding:"9px 13px" }}>
              <div style={{ fontSize:19 }}>🔥</div>
              <div style={{ color:"#fff",fontWeight:900,fontSize:19,lineHeight:1 }}>{streak.count}</div>
              <div style={{ color:"rgba(255,255,255,.55)",fontSize:10,fontWeight:700 }}>day streak</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop:16,position:"relative" }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}><span style={{ color:"rgba(255,255,255,.7)",fontSize:13,fontWeight:700 }}>Overall progress</span><span style={{ color:"rgba(255,255,255,.9)",fontSize:13,fontWeight:800 }}>{done.length}/{total} lessons</span></div>
          <div style={{ height:8,background:"rgba(255,255,255,.15)",borderRadius:999,overflow:"hidden" }}><div style={{ height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,var(--g3),#AEEA00)",borderRadius:999,transition:"width .8s ease" }}/></div>
        </div>
      </div>

      <div style={{ padding:"16px",display:"flex",flexDirection:"column",gap:14 }}>
        {nextLesson && <div>
          <div className="sh"><h2 style={{ fontSize:15,fontWeight:800 }}>Continue learning</h2><button className="btn bgh bsm" onClick={() => navigate("courses")}>See all</button></div>
          <div className="card tap" onClick={() => navigate("lesson", { lesson:nextLesson.l, course:nextLesson.c })} style={{ background:"linear-gradient(135deg,var(--g0),#fff)",border:"2px solid var(--g2)" }}>
            <div style={{ display:"flex",gap:12,alignItems:"center" }}>
              <div style={{ width:48,height:48,background:nextLesson.c.color,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>{nextLesson.l.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10,fontWeight:700,color:nextLesson.c.color,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2 }}>{nextLesson.c.title}</div>
                <div style={{ fontWeight:800,fontSize:14,marginBottom:3 }}>{nextLesson.l.title}</div>
                <div style={{ display:"flex",gap:7,alignItems:"center" }}><span style={{ fontSize:11,color:"var(--tmut)" }}>⏱ {nextLesson.l.dur}</span>{nextLesson.l.vk && MY_VIDEOS[nextLesson.l.vk] && <span style={{ fontSize:9,background:"#FFEBEE",color:"#FF0000",padding:"2px 6px",borderRadius:999,fontWeight:700 }}>📺 Video</span>}</div>
              </div>
              <div style={{ fontSize:17,color:"var(--g5)" }}>→</div>
            </div>
          </div>
        </div>}

        <div>
          <div className="sh"><h2 style={{ fontSize:15,fontWeight:800 }}>This week's tasks</h2><span style={{ fontSize:13,fontWeight:700,color:"var(--g6)" }}>{tasks.filter(t=>t.done).length}/{tasks.length}</span></div>
          <div className="card">
            {tasks.filter(t=>t.done).length === tasks.length && <div style={{ textAlign:"center",padding:"11px 0",background:"var(--g0)",borderRadius:11,marginBottom:10 }}><div style={{ fontSize:24,marginBottom:3 }}>🎉</div><div style={{ fontWeight:800,color:"var(--g7)",fontSize:12 }}>All tasks done!</div></div>}
            {tasks.map(t => <div key={t.id} className="crow" onClick={() => toggleT(t.id)}><div className={`ccirc${t.done?" on":""}`}>{t.done && "✓"}</div><span style={{ fontSize:13,fontWeight:600,color:t.done?"var(--tmut)":"var(--td)",textDecoration:t.done?"line-through":"none" }}>{t.task}</span></div>)}
            <button className="btn bs bsm" style={{ width:"100%",marginTop:10 }} onClick={() => navigate("planner")}>📅 Open Full Planner</button>
          </div>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
          {[{e:"📚",v:done.length,l:"Lessons"},{e:"🏅",v:badges.length,l:"Badges"},{e:"🔥",v:streak.count,l:"Streak"}].map((s,i) =>
            <div key={i} className="card" style={{ textAlign:"center",padding:"12px 8px" }}><div style={{ fontSize:19,marginBottom:3 }}>{s.e}</div><div style={{ fontWeight:900,fontSize:18,color:"var(--g7)" }}>{s.v}</div><div style={{ fontSize:10,color:"var(--tmut)",fontWeight:600 }}>{s.l}</div></div>)}
        </div>

        {recentBadges.length > 0 && <div>
          <div className="sh"><h2 style={{ fontSize:15,fontWeight:800 }}>Recent badges</h2><button className="btn bgh bsm" onClick={() => navigate("progress")}>All badges</button></div>
          <div style={{ display:"flex",gap:10 }}>{recentBadges.map(b => <div key={b.id} className="card" style={{ flex:1,textAlign:"center",padding:"11px 8px" }}><div style={{ fontSize:22,marginBottom:3 }}>{b.e}</div><div style={{ fontSize:10,fontWeight:800,lineHeight:1.2 }}>{b.t}</div></div>)}</div>
        </div>}

        <div>
          <h2 style={{ fontSize:15,fontWeight:800,marginBottom:10 }}>Quick access</h2>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {[{e:"📺",l:"Video Lessons",p:"videos",bg:"#FFEBEE",bd:"#FFCDD2"},{e:"📅",l:"Weekly Planner",p:"planner",bg:"var(--g0)",bd:"var(--g2)"},{e:"🔍",l:"Problem Solver",p:"problems",bg:"#FFF8E1",bd:"#FFE082"},{e:"⭐",l:"My Progress",p:"progress",bg:"#FFF3E0",bd:"#FFCC80"}].map(lnk =>
              <button key={lnk.p} onClick={() => navigate(lnk.p)} style={{ background:lnk.bg,border:`2px solid ${lnk.bd}`,borderRadius:17,padding:"14px 12px",cursor:"pointer",textAlign:"center",fontFamily:"var(--ff)",transition:"all .2s" }}>
                <div style={{ fontSize:25,marginBottom:5 }}>{lnk.e}</div><div style={{ fontSize:12,fontWeight:700 }}>{lnk.l}</div>
              </button>)}
          </div>
        </div>

        <div className="tip">
          <div style={{ fontWeight:800,fontSize:13,color:"var(--g8)",marginBottom:4 }}>🌱 {month} growing tip</div>
          <p style={{ fontSize:13,color:"var(--tm)",lineHeight:1.5 }}>Check the Weekly Planner to see exactly what to sow, plant and harvest this month!</p>
          <button className="btn bp bsm" style={{ marginTop:10 }} onClick={() => navigate("planner")}>Open Planner</button>
        </div>
      </div>
    </div>
  );
}

// ─── COURSES ──────────────────────────────────────────────────────────────────
function CoursesPage() {
  const { navigate, done } = useApp();
  const total = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  return (
    <div style={{ padding:"18px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <h1 style={{ fontSize:21,fontWeight:900,marginBottom:4 }}>📚 The Academy</h1>
        <p style={{ fontSize:13,color:"var(--tl)" }}>{done.length} of {total} lessons completed</p>
        <div className="pb" style={{ marginTop:8 }}><div className="pf" style={{ width:`${(done.length/total)*100}%` }}/></div>
      </div>
      {COURSES.map((c, ci) => {
        const cDone = c.lessons.filter(l => done.includes(l.id)).length;
        const pct   = Math.round((cDone / c.lessons.length) * 100);
        const unlocked = ci === 0 || COURSES[ci-1].lessons.every(l => done.includes(l.id));
        return (
          <div key={c.id} style={{ marginBottom:20 }}>
            <div style={{ background:unlocked?`${c.color}16`:"var(--cdk)",border:`2px solid ${unlocked?c.color+"44":"var(--cdk)"}`,borderRadius:22,padding:15,marginBottom:8 }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:unlocked?10:0 }}>
                <div style={{ width:48,height:48,background:unlocked?c.color:"var(--tmut)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,opacity:unlocked?1:.5 }}>{unlocked?c.emoji:"🔒"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",color:unlocked?c.color:"var(--tmut)",marginBottom:2 }}>Level {c.level}</div>
                  <h2 style={{ fontSize:15,fontWeight:900,marginBottom:2,color:unlocked?"var(--td)":"var(--tmut)" }}>{c.title}</h2>
                  <p style={{ fontSize:12,color:"var(--tl)",lineHeight:1.4 }}>{c.desc}</p>
                </div>
              </div>
              {unlocked && <div>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}><span style={{ fontSize:11,fontWeight:700,color:"var(--tl)" }}>{cDone}/{c.lessons.length} lessons</span><span style={{ fontSize:11,fontWeight:700,color:c.color }}>{pct}%</span></div>
                <div style={{ height:5,background:"#eee",borderRadius:999,overflow:"hidden" }}><div style={{ height:"100%",width:`${pct}%`,background:c.color,borderRadius:999 }}/></div>
              </div>}
              {!unlocked && <div style={{ marginTop:7,fontSize:12,color:"var(--tmut)",fontWeight:600,textAlign:"center" }}>🔒 Complete Level {c.level-1} to unlock</div>}
            </div>
            {unlocked && <div style={{ display:"flex",flexDirection:"column",gap:7,paddingLeft:6 }}>
              {c.lessons.map(l => { const isDone = done.includes(l.id); return (
                <button key={l.id} className="card tap" onClick={() => navigate("lesson", { lesson:l, course:c })} style={{ display:"flex",alignItems:"center",gap:11,border:`1px solid ${isDone?"var(--g2)":"var(--cdk)"}`,background:isDone?"var(--g0)":"#fff",padding:"12px 14px",textAlign:"left",fontFamily:"var(--ff)" }}>
                  <div style={{ width:38,height:38,background:isDone?"var(--g5)":`${c.color}22`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:isDone?15:19,flexShrink:0,color:isDone?"#fff":"inherit" }}>{isDone?"✓":l.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,fontSize:13,marginBottom:2,color:isDone?"var(--g8)":"var(--td)" }}>{l.title}</div>
                    <div style={{ display:"flex",gap:7,alignItems:"center" }}><span style={{ fontSize:11,color:"var(--tmut)" }}>⏱ {l.dur}</span>{l.vk&&MY_VIDEOS[l.vk]&&<span style={{ fontSize:9,background:"#FFEBEE",color:"#FF0000",padding:"2px 6px",borderRadius:999,fontWeight:700 }}>📺 Live</span>}{l.vk&&!MY_VIDEOS[l.vk]&&<span style={{ fontSize:9,background:"var(--cdk)",color:"var(--tmut)",padding:"2px 6px",borderRadius:999,fontWeight:700 }}>📺 Soon</span>}</div>
                  </div>
                  {isDone ? <span style={{ color:"var(--g5)",fontWeight:800,fontSize:11 }}>Done ✓</span> : <span style={{ color:"var(--tmut)",fontSize:16 }}>→</span>}
                </button>
              ); })}
            </div>}
          </div>
        );
      })}
    </div>
  );
}

// ─── LESSON ───────────────────────────────────────────────────────────────────
function LessonPage() {
  const { lesson, course, navigate, done, completeLesson, awardBadge, badges } = useApp();
  const [checked, setChecked] = useState({});
  const [qa, setQa] = useState(null);
  const [qd, setQd] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  if (!lesson || !course) { navigate("courses"); return null; }
  const isDone = done.includes(lesson.id);

  const handleVid = () => { if (!badges.includes("glens-student")) setTimeout(() => awardBadge("glens-student"), 1000); };
  const handleComplete = () => { completeLesson(lesson.id); setCelebrating(true); setTimeout(() => { setCelebrating(false); navigate("courses"); }, 2200); };

  const VL = {"fix-slugs":"Slug Control","soil-basics":"Soil & Compost","grow-tomatoes":"Growing Tomatoes","containers-beds":"Containers & Beds","sunlight-watering":"Sunlight & Watering","tools-guide":"Gardening Tools","sowing-seeds":"Sowing Seeds","grow-lettuce":"Growing Lettuce","grow-herbs":"Growing Herbs","grow-radish":"Radishes","grow-potatoes":"Growing Potatoes","seasonal-planning":"Seasonal Planning","fix-aphids":"Controlling Aphids"};

  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:course.color,padding:"16px",position:"sticky",top:0,zIndex:10 }}>
        <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:8 }}>
          <button onClick={() => navigate("courses")} style={{ display:"flex",alignItems:"center",gap:5,border:"none",background:"rgba(255,255,255,.18)",borderRadius:10,padding:"7px 12px",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"var(--ff)" }}>← Back</button>
          <div style={{ flex:1 }}><div style={{ fontSize:10,color:"rgba(255,255,255,.65)",fontWeight:700,textTransform:"uppercase" }}>{course.title}</div></div>
          {isDone && <span style={{ background:"rgba(255,255,255,.18)",color:"#fff",padding:"4px 10px",borderRadius:999,fontSize:11,fontWeight:700 }}>✓ Done</span>}
        </div>
        <h1 style={{ color:"#fff",fontSize:19,fontWeight:900,lineHeight:1.2 }}>{lesson.emoji} {lesson.title}</h1>
        <div style={{ display:"flex",gap:8,alignItems:"center",marginTop:4 }}><span style={{ color:"rgba(255,255,255,.65)",fontSize:12 }}>⏱ {lesson.dur}</span>{lesson.vk&&<span style={{ background:"rgba(255,255,255,.18)",color:"#fff",padding:"3px 10px",borderRadius:999,fontSize:10,fontWeight:700 }}>📺 {MY_VIDEOS[lesson.vk]?"Video included":"Video coming soon"}</span>}</div>
      </div>

      <div style={{ padding:"16px",display:"flex",flexDirection:"column",gap:15 }}>
        <div className="card" style={{ borderLeft:`4px solid ${course.color}` }}><p style={{ fontSize:14,color:"var(--tm)",lineHeight:1.7,fontWeight:500 }}>{lesson.intro}</p></div>

        {lesson.vk && <div>
          <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:10 }}>
            <div style={{ width:24,height:24,background:"#FF0000",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></div>
            <h2 style={{ fontSize:14,fontWeight:800 }}>{MY_VIDEOS[lesson.vk] ? `Watch: ${VL[lesson.vk]||lesson.title}` : `Video coming soon: ${lesson.title}`}</h2>
          </div>
          <YTPlayer videoKey={lesson.vk} onPlay={handleVid}/>
          <div style={{ marginTop:8,display:"flex",alignItems:"center",gap:7,padding:"9px 13px",background:"var(--g0)",borderRadius:11 }}>
            <span style={{ fontSize:13 }}>💡</span><span style={{ fontSize:12,color:"var(--tm)",fontWeight:600 }}>Watch first, then follow the steps below for the full experience.</span>
          </div>
        </div>}

        <div className="card">
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:10,color:"var(--g8)" }}>🎯 Key takeaways</h2>
          {lesson.takes.map((t, i) => <div key={i} style={{ display:"flex",gap:9,marginBottom:8,alignItems:"flex-start" }}>
            <div style={{ width:20,height:20,background:course.color,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:900,flexShrink:0,marginTop:1 }}>{i+1}</div>
            <span style={{ fontSize:13,color:"var(--tm)",lineHeight:1.5 }}>{t}</span>
          </div>)}
        </div>

        <div>
          <h2 style={{ fontSize:15,fontWeight:800,marginBottom:11 }}>📋 Step by step</h2>
          {lesson.steps.map(s => <div key={s.n} style={{ display:"flex",gap:11,marginBottom:11,alignItems:"flex-start" }}>
            <div style={{ width:29,height:29,background:`linear-gradient(135deg,${course.color},${course.color}BB)`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:13,flexShrink:0 }}>{s.n}</div>
            <div className="card" style={{ flex:1,padding:"11px 13px" }}><div style={{ fontWeight:800,marginBottom:4,fontSize:13 }}>{s.t}</div><p style={{ fontSize:13,color:"var(--tl)",lineHeight:1.6 }}>{s.d}</p></div>
          </div>)}
        </div>

        {lesson.glen && <GlenTip text={lesson.glen}/>}

        {lesson.cl && <div className="card">
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:9 }}>✅ Your action checklist</h2>
          {lesson.cl.map((item, i) => <div key={i} className="crow" onClick={() => setChecked(p => ({ ...p, [i]:!p[i] }))}>
            <div className={`ccirc${checked[i]?" on":""}`}>{checked[i] && "✓"}</div>
            <span style={{ fontSize:13,fontWeight:600,textDecoration:checked[i]?"line-through":"none",color:checked[i]?"var(--tmut)":"var(--td)" }}>{item}</span>
          </div>)}
        </div>}

        {lesson.tip && <div className="tip"><div style={{ fontWeight:800,color:"var(--g8)",marginBottom:4,fontSize:13 }}>💡 Pro tip</div><p style={{ fontSize:13,color:"var(--tm)",lineHeight:1.6 }}>{lesson.tip}</p></div>}

        {lesson.mistakes && <div className="card">
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:9 }}>⚠️ Common mistakes</h2>
          {lesson.mistakes.map((m, i) => <div key={i} style={{ display:"flex",gap:8,marginBottom:7,alignItems:"flex-start" }}>
            <span style={{ color:"#E53935",fontSize:14,flexShrink:0,marginTop:1 }}>✗</span>
            <span style={{ fontSize:13,color:"var(--tm)",lineHeight:1.5 }}>{m}</span>
          </div>)}
        </div>}

        {lesson.quiz && <div className="card" style={{ border:"2px solid var(--g2)",background:"var(--g0)" }}>
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:3,color:"var(--g8)" }}>🧠 Quick quiz</h2>
          <p style={{ fontSize:12,color:"var(--tl)",marginBottom:11 }}>Test your knowledge!</p>
          <p style={{ fontWeight:700,marginBottom:10,fontSize:14 }}>{lesson.quiz.q}</p>
          <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
            {lesson.quiz.opts.map((opt, i) => {
              const ic = i === lesson.quiz.a, ch = qa === i;
              let bd = "var(--cdk)", bg = "#fff";
              if (qd) { if (ic) { bg="#E8F5E9";bd="#4CAF50"; } else if (ch&&!ic) { bg="#FFEBEE";bd="#EF5350"; } }
              return <button key={i} onClick={() => !qd && setQa(i)} style={{ padding:"10px 14px",border:`2px solid ${ch&&!qd?"var(--g5)":bd}`,borderRadius:11,background:ch&&!qd?"var(--g0)":bg,cursor:qd?"default":"pointer",textAlign:"left",fontSize:13,fontWeight:600,fontFamily:"var(--ff)" }}>{qd&&ic&&"✅ "}{qd&&ch&&!ic&&"❌ "}{opt}</button>;
            })}
          </div>
          {!qd && qa !== null && <button className="btn bp bsm" style={{ marginTop:10,width:"100%" }} onClick={() => setQd(true)}>Submit Answer</button>}
          {qd && <div style={{ marginTop:9,padding:"9px 13px",background:qa===lesson.quiz.a?"#E8F5E9":"#FFF3E0",borderRadius:11,fontWeight:700,fontSize:13,color:qa===lesson.quiz.a?"#2E7D32":"#E65100",textAlign:"center" }}>{qa===lesson.quiz.a?"🎉 Correct! Well done.":`💡 The answer was: "${lesson.quiz.opts[lesson.quiz.a]}"`}</div>}
        </div>}

        {/* Glen's channel footer */}
        <div style={{ background:"linear-gradient(135deg,#0a1a05,#1a3a08)",borderRadius:20,padding:18,textAlign:"center" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:10 }}><VPILogo size={40}/></div>
          <div style={{ color:"var(--g3)",fontWeight:800,fontSize:13,marginBottom:4 }}>More from {CHANNEL_NAME}</div>
          <p style={{ color:"rgba(255,255,255,.6)",fontSize:12,marginBottom:12,lineHeight:1.4 }}>{HOST}'s channel has more growing videos, allotment diaries and DIY builds.</p>
          <div style={{ display:"flex",gap:8,justifyContent:"center" }}>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"#FF0000",color:"#fff",borderRadius:999,padding:"8px 15px",fontSize:12,fontWeight:700,textDecoration:"none" }}><YTIcon/> YouTube</a>
            <button onClick={() => navigate("videos")} style={{ border:"2px solid rgba(255,255,255,.2)",background:"transparent",color:"#fff",borderRadius:999,padding:"8px 15px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--ff)" }}>All Videos</button>
          </div>
        </div>

        {isDone ? (
          <div style={{ background:"var(--g0)",border:"2px solid var(--g3)",borderRadius:20,padding:18,textAlign:"center" }}>
            <div style={{ fontSize:30,marginBottom:6 }}>🌟</div>
            <div style={{ fontWeight:800,color:"var(--g8)",fontSize:14 }}>Lesson complete!</div>
            <button className="btn bs bsm" style={{ marginTop:10 }} onClick={() => navigate("courses")}>Back to courses</button>
          </div>
        ) : (
          <button className="btn bp blg" style={{ width:"100%" }} onClick={handleComplete}>✓ Mark as Complete</button>
        )}
      </div>

      {celebrating && <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:24 }}>
        <div style={{ background:"#fff",borderRadius:26,padding:"28px 22px",textAlign:"center",animation:"pop .4s ease",maxWidth:280,width:"100%" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:12 }}><VPILogo size={52}/></div>
          <div style={{ fontSize:46,marginBottom:10 }}>🎉</div>
          <h2 style={{ fontWeight:900,fontSize:18,marginBottom:7,color:"var(--g8)" }}>Lesson Complete!</h2>
          <p style={{ color:"var(--tl)",fontSize:13 }}>Great work! Keep growing with {HOST}.</p>
        </div>
      </div>}
    </div>
  );
}

// ─── PLANNER ──────────────────────────────────────────────────────────────────
function PlannerPage() {
  const curM = new Date().getMonth() + 1;
  const [sel, setSel] = useState(curM);
  const [tab, setTab] = useState("sow");
  const data = MONTHLY[sel] || MONTHLY[1];
  const tabs = [{id:"sow",l:"🌱 Sow",k:"s"},{id:"plant",l:"🌿 Plant Out",k:"po"},{id:"harvest",l:"🌾 Harvest",k:"h"},{id:"jobs",l:"🔧 Jobs",k:"j"}];
  const active = data[tabs.find(t => t.id === tab)?.k] || [];

  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0a1a05,#2D5016)",padding:"20px 16px 17px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}><VPILogo size={24}/><h1 style={{ color:"#fff",fontSize:19,fontWeight:900 }}>📅 Weekly Planner</h1></div>
        <p style={{ color:"rgba(255,255,255,.55)",fontSize:12 }}>Know exactly what to do each month — by {HOST}</p>
      </div>

      <div style={{ background:"#fff",borderBottom:"1px solid var(--cdk)",padding:"8px 0",overflowX:"auto" }}>
        <div style={{ display:"flex",gap:5,padding:"0 14px",width:"max-content" }}>
          {MN.map((m, i) => { const mo = i+1,isSel=mo===sel,isCur=mo===curM; return (
            <button key={m} onClick={() => setSel(mo)} style={{ padding:"6px 11px",border:`2px solid ${isSel?"var(--g5)":isCur?"var(--g2)":"transparent"}`,borderRadius:999,background:isSel?"var(--g5)":isCur?"var(--g0)":"transparent",color:isSel?"#fff":isCur?"var(--g7)":"var(--tl)",cursor:"pointer",fontWeight:isSel||isCur?800:600,fontSize:11,fontFamily:"var(--ff)",whiteSpace:"nowrap" }}>{m.slice(0,3)}{isCur&&<span style={{ marginLeft:2,fontSize:8 }}>●</span>}</button>
          ); })}
        </div>
      </div>

      <div style={{ padding:"14px 16px" }}>
        <div className="tip" style={{ marginBottom:13 }}><p style={{ fontSize:13,color:"var(--tm)",lineHeight:1.6 }}>{data.tip}</p></div>
        <div style={{ display:"flex",background:"#fff",borderRadius:16,padding:3,gap:3,marginBottom:11,boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
          {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1,padding:"8px 2px",border:"none",borderRadius:12,background:tab===t.id?"var(--g6)":"transparent",color:tab===t.id?"#fff":"var(--tl)",cursor:"pointer",fontWeight:700,fontSize:10,fontFamily:"var(--ff)",transition:"all .15s" }}>{t.l}</button>)}
        </div>
        <div className="card">
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:11,color:"var(--g8)" }}>{MN[sel-1]} — {tabs.find(t=>t.id===tab)?.l}</h2>
          {active.length === 0
            ? <div style={{ textAlign:"center",padding:"28px 18px",color:"var(--tmut)" }}><span style={{ fontSize:34,display:"block",marginBottom:8 }}>😴</span><p style={{ fontWeight:600,fontSize:13 }}>Nothing this month for this category</p></div>
            : <div style={{ display:"flex",flexDirection:"column",gap:7 }}>{active.map((item,i) => <div key={i} style={{ display:"flex",gap:9,alignItems:"center",padding:"10px",background:"var(--cream)",borderRadius:11,border:"1px solid var(--cdk)" }}><div style={{ width:27,height:27,background:"var(--g1)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0 }}>{tab==="sow"?"🌱":tab==="plant"?"🌿":tab==="harvest"?"🌾":"🔧"}</div><span style={{ fontSize:13,fontWeight:600 }}>{item}</span></div>)}</div>}
        </div>

        <div style={{ marginTop:13 }}>
          <div className="card" style={{ background:"linear-gradient(135deg,#0a1a05,#2D5016)",color:"#fff" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:9 }}><VPILogo size={22}/><h3 style={{ fontSize:14,fontWeight:800,color:"#fff" }}>{HOST}'s priority list for {MN[sel-1]}</h3></div>
            <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
              {[...(data.s.slice(0,2).map(s=>`Sow: ${s}`)),...(data.j.slice(0,2)),...(data.h.slice(0,1).map(h=>`Harvest: ${h}`))].slice(0,4).map((task,i) =>
                <div key={i} style={{ display:"flex",gap:7 }}><span style={{ opacity:.5 }}>→</span><span style={{ fontSize:12,fontWeight:600,color:"rgba(255,255,255,.82)" }}>{task}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROBLEMS ─────────────────────────────────────────────────────────────────
function ProblemsPage() {
  const { awardBadge, badges } = useApp();
  const [sel, setSel] = useState(null);
  if (!badges.includes("problem-solver")) setTimeout(() => awardBadge("problem-solver"), 500);

  const sevStyles = { low:{ c:"#4CAF50",l:"Low risk",bg:"#E8F5E9" }, medium:{ c:"#FF9800",l:"Worth fixing",bg:"#FFF3E0" }, high:{ c:"#F44336",l:"Act quickly",bg:"#FFEBEE" } };

  if (sel) {
    const p = PROBLEMS.find(x => x.id === sel);
    const s = sevStyles[p.sev];
    return (
      <div style={{ minHeight:"100vh" }}>
        <div style={{ background:"#fff",padding:"14px",borderBottom:"1px solid var(--cdk)",position:"sticky",top:0,zIndex:10,display:"flex",alignItems:"center",gap:11 }}>
          <button onClick={() => setSel(null)} style={{ border:"none",background:"var(--cream)",borderRadius:10,width:35,height:35,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:17 }}>←</button>
          <div><div style={{ fontSize:9,color:"var(--tmut)",fontWeight:700 }}>Problem Solver</div><h1 style={{ fontSize:15,fontWeight:900 }}>{p.emoji} {p.title}</h1></div>
        </div>
        <div style={{ padding:"14px",display:"flex",flexDirection:"column",gap:11 }}>
          <div style={{ background:s.bg,border:`2px solid ${s.c}44`,borderRadius:11,padding:"8px 14px",display:"flex",alignItems:"center",gap:8 }}><div style={{ width:8,height:8,borderRadius:"50%",background:s.c }}/><span style={{ fontWeight:700,fontSize:12,color:s.c }}>{s.l}</span></div>
          {p.vk && <div>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:9 }}>
              <div style={{ width:23,height:23,background:"#FF0000",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="9" height="9" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></div>
              <h2 style={{ fontSize:13,fontWeight:800 }}>{HOST}'s fix video</h2>
            </div>
            <YTPlayer videoKey={p.vk}/>
          </div>}
          <div className="card"><h2 style={{ fontSize:13,fontWeight:800,marginBottom:7,color:"var(--g8)" }}>🔍 What it looks like</h2><p style={{ fontSize:13,color:"var(--tm)",lineHeight:1.6 }}>{p.looks}</p></div>
          <div className="card"><h2 style={{ fontSize:13,fontWeight:800,marginBottom:8 }}>🤔 Likely causes</h2>{p.causes.map((c,i)=><div key={i} style={{ display:"flex",gap:7,marginBottom:6 }}><span style={{ color:"#FF7043",fontSize:12,flexShrink:0,marginTop:2 }}>•</span><span style={{ fontSize:13,color:"var(--tm)",lineHeight:1.5 }}>{c}</span></div>)}</div>
          <div style={{ background:"linear-gradient(135deg,var(--g0),#fff)",border:"2px solid var(--g3)",borderRadius:16,padding:14 }}><h2 style={{ fontSize:13,fontWeight:800,marginBottom:7,color:"var(--g8)" }}>🔧 Easy fix</h2><p style={{ fontSize:13,color:"var(--tm)",lineHeight:1.7 }}>{p.fix}</p></div>
          <div className="tip"><h2 style={{ fontSize:13,fontWeight:800,marginBottom:5,color:"var(--g8)" }}>🛡️ Prevention</h2><p style={{ fontSize:13,color:"var(--tm)",lineHeight:1.6 }}>{p.prev}</p></div>
          <button className="btn bs" style={{ width:"100%" }} onClick={() => setSel(null)}>← Back to Problem Solver</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#7B1818,#E53935)",padding:"20px 16px 24px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}><VPILogo size={24}/><h1 style={{ color:"#fff",fontSize:19,fontWeight:900 }}>🔍 Problem Solver</h1></div>
        <p style={{ color:"rgba(255,255,255,.75)",fontSize:12 }}>Quick fixes from {HOST} for common growing problems.</p>
      </div>
      <div style={{ padding:"14px 16px" }}>
        <div className="warn" style={{ marginBottom:14 }}><p style={{ fontSize:13,color:"#5D4037",lineHeight:1.5 }}><strong>Good news:</strong> Most plant problems have simple causes and easy fixes. Don't panic!</p></div>
        <h2 style={{ fontSize:14,fontWeight:800,marginBottom:11 }}>Common problems</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
          {PROBLEMS.map(p => { const s = sevStyles[p.sev]; return (
            <button key={p.id} className="card tap" onClick={() => setSel(p.id)} style={{ display:"flex",alignItems:"center",gap:11,textAlign:"left",border:"1px solid var(--cdk)",fontFamily:"var(--ff)",padding:"12px 14px" }}>
              <div style={{ width:46,height:46,background:s.bg,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0 }}>{p.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800,fontSize:13,marginBottom:2 }}>{p.title}</div>
                <div style={{ fontSize:11,color:"var(--tl)",lineHeight:1.4 }}>{p.looks.slice(0,60)}...</div>
                <div style={{ marginTop:4,display:"flex",alignItems:"center",gap:7 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:3 }}><div style={{ width:6,height:6,borderRadius:"50%",background:s.c }}/><span style={{ fontSize:10,fontWeight:700,color:s.c }}>{s.l}</span></div>
                  {p.vk && MY_VIDEOS[p.vk] && <span style={{ fontSize:9,background:"#FFEBEE",color:"#FF0000",padding:"2px 6px",borderRadius:999,fontWeight:700 }}>📺 Video fix</span>}
                </div>
              </div>
              <span style={{ fontSize:16,color:"var(--tmut)" }}>→</span>
            </button>
          ); })}
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
function ProgressPage() {
  const { done, badges, streak, profile, navigate, reset } = useApp();
  const total = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const pct   = Math.round((done.length / total) * 100);

  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(155deg,#1a0a00,#5D4037)",padding:"20px 16px 24px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}><VPILogo size={24}/><h1 style={{ color:"#fff",fontSize:19,fontWeight:900 }}>⭐ My Progress</h1></div>
        <p style={{ color:"rgba(255,255,255,.55)",fontSize:12 }}>Track your journey with {HOST}'s Academy</p>
      </div>

      <div style={{ padding:"14px 16px",display:"flex",flexDirection:"column",gap:14 }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:11 }}>
          {[{e:"📚",v:done.length,sub:`of ${total} lessons`,l:"completed"},{e:"🔥",v:streak.count,sub:`day${streak.count!==1?"s":""} in a row`,l:"streak"}].map((s,i) =>
            <div key={i} className="card" style={{ textAlign:"center" }}><div style={{ fontSize:30,marginBottom:4 }}>{s.e}</div><div style={{ fontWeight:900,fontSize:24,color:"var(--g7)",lineHeight:1 }}>{s.v}</div><div style={{ fontSize:11,color:"var(--tmut)",fontWeight:600,marginTop:3 }}>{s.sub}</div><div style={{ fontSize:12,fontWeight:700,color:"var(--tl)" }}>{s.l}</div></div>)}
        </div>

        <div className="card">
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:10 }}>Overall progress</h2>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}><span style={{ fontSize:12,color:"var(--tl)" }}>{done.length} done</span><span style={{ fontSize:15,fontWeight:900,color:"var(--g7)" }}>{pct}%</span></div>
          <div className="pb" style={{ height:10 }}><div className="pf" style={{ width:`${pct}%` }}/></div>
          {pct === 100 && <div style={{ marginTop:10,textAlign:"center",color:"var(--g7)",fontWeight:800 }}>🎉 Academy Complete! You're a proper grower!</div>}
        </div>

        <div>
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:11 }}>Progress by level</h2>
          <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
            {COURSES.map(c => { const d2 = c.lessons.filter(l => done.includes(l.id)).length, p = Math.round((d2/c.lessons.length)*100); return (
              <div key={c.id} className="card" style={{ padding:"12px 14px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}><div style={{ width:34,height:34,background:c.color,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0 }}>{c.emoji}</div><div style={{ flex:1 }}><div style={{ fontWeight:800,fontSize:13,marginBottom:1 }}>{c.title}</div><div style={{ fontSize:11,color:"var(--tmut)" }}>{d2}/{c.lessons.length} lessons · {p}%</div></div>{p===100&&<span style={{ fontSize:17 }}>✅</span>}</div>
                <div style={{ height:5,background:"#eee",borderRadius:999,overflow:"hidden" }}><div style={{ height:"100%",width:`${p}%`,background:c.color,borderRadius:999 }}/></div>
              </div>
            ); })}
          </div>
        </div>

        <div>
          <div className="sh"><h2 style={{ fontSize:14,fontWeight:800 }}>Badges</h2><span style={{ fontSize:12,fontWeight:700,color:"var(--g6)" }}>{badges.length}/{BADGES.length}</span></div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9 }}>
            {BADGES.map(b => { const earned = badges.includes(b.id); return (
              <div key={b.id} className="card" style={{ textAlign:"center",opacity:earned?1:.36,border:earned?"2px solid var(--g2)":"1px solid var(--cdk)",background:earned?"linear-gradient(135deg,var(--g0),white)":"#fff" }}>
                <div style={{ fontSize:26,marginBottom:4,filter:earned?"none":"grayscale(100%)" }}>{b.e}</div>
                <div style={{ fontWeight:800,fontSize:11,marginBottom:2,color:earned?"var(--g8)":"var(--tmut)" }}>{b.t}</div>
                <div style={{ fontSize:10,color:"var(--tmut)",lineHeight:1.4 }}>{b.d}</div>
                {earned && <div style={{ marginTop:6,background:"var(--g5)",color:"#fff",borderRadius:999,padding:"2px 10px",fontSize:9,fontWeight:700,display:"inline-block" }}>Earned ✓</div>}
              </div>
            ); })}
          </div>
        </div>

        {profile && <div className="card">
          <h2 style={{ fontSize:14,fontWeight:800,marginBottom:10 }}>My grower profile</h2>
          {[{l:"Experience",v:profile.experience==="beginner"?"🌱 Beginner":profile.experience==="some"?"🌿 Some experience":"🌾 Confident"},{l:"Time/week",v:profile.time==="30min"?"⚡ <30 min":profile.time==="1hour"?"⏰ 30–60 min":profile.time==="2hours"?"⏱ 1–2 hrs":"🕐 2+ hrs"},{l:"Main goal",v:profile.goal==="save-money"?"💰 Save money":profile.goal==="health"?"💚 Healthier food":profile.goal==="skill"?"📚 New skill":profile.goal==="self-sufficient"?"🏡 Self-sufficiency":"🌈 Enjoyment"},{l:"Member since",v:new Date(profile.startedAt).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}].map((row,i) =>
            <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--cdk)" }}><span style={{ fontSize:12,color:"var(--tl)" }}>{row.l}</span><span style={{ fontSize:12,fontWeight:700 }}>{row.v}</span></div>)}
          <button className="btn bs bsm" style={{ width:"100%",marginTop:10 }} onClick={() => navigate("onboarding")}>Update profile</button>
        </div>}

        <BrandFooter/>
        <div style={{ textAlign:"center",paddingBottom:6 }}>
          <button onClick={() => { if (window.confirm("Reset all progress? This cannot be undone.")) reset(); }} style={{ border:"none",background:"none",color:"var(--tmut)",fontSize:12,cursor:"pointer",fontFamily:"var(--ff)",textDecoration:"underline" }}>Reset all progress</button>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav() {
  const { page, navigate, profile } = useApp();
  if (!profile) return null;
  const items = [{id:"dashboard",e:"🏡",l:"Home"},{id:"courses",e:"📚",l:"Learn"},{id:"videos",e:"📺",l:"Videos"},{id:"planner",e:"📅",l:"Planner"},{id:"progress",e:"⭐",l:"Progress"}];
  const isActive = id => page === id || (id === "courses" && page === "lesson");

  return (
    <nav style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,height:"var(--nav)",background:"#fff",borderTop:"1px solid var(--cdk)",display:"flex",alignItems:"center",justifyContent:"space-around",zIndex:100,boxShadow:"0 -4px 18px rgba(0,0,0,.06)" }}>
      {items.map(item => {
        const active = isActive(item.id);
        const isYT   = item.id === "videos";
        return (
          <button key={item.id} onClick={() => navigate(item.id)} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 4px",border:"none",background:"transparent",cursor:"pointer",color:active?(isYT?"#FF0000":"var(--g6)"):"var(--tmut)",transition:"all .2s",fontFamily:"var(--ff)" }}>
            <span style={{ fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:9,background:active?(isYT?"#FFEBEE":"var(--g0)"):"transparent",transition:"all .2s",transform:active?"scale(1.08)":"scale(1)" }}>{item.e}</span>
            <span style={{ fontSize:9,fontWeight:active?800:600,letterSpacing:".02em" }}>{item.l}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── ROUTER + ROOT ────────────────────────────────────────────────────────────
function Router() {
  const { page, profile } = useApp();
  const noNav = ["home","onboarding","welcome"];
  const showNav = profile && !noNav.includes(page);
  const Page = () => {
    switch (page) {
      case "home":      return <HomePage/>;
      case "onboarding":return <OnboardingPage/>;
      case "welcome":   return <WelcomePage/>;
      case "dashboard": return <DashboardPage/>;
      case "courses":   return <CoursesPage/>;
      case "lesson":    return <LessonPage/>;
      case "videos":    return <VideosPage/>;
      case "planner":   return <PlannerPage/>;
      case "problems":  return <ProblemsPage/>;
      case "progress":  return <ProgressPage/>;
      default:          return <HomePage/>;
    }
  };
  return (
    <div className="wrap">
      <style>{css}</style>
      <div style={{ paddingBottom: showNav ? "var(--nav)" : 0 }}><Page/></div>
      <BottomNav/>
    </div>
  );
}

export default function App() {
  return <Provider><Router/></Provider>;
}
