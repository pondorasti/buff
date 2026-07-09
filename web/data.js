/* ==========================================================================
   buff — single source of truth
   Everything the app renders (equipment, exercises, routine days, load
   targets) lives here. index.html is a pure renderer over this object.
   Relational-by-id: day items & loads reference exercises/equipment by id,
   so nothing is duplicated and all views stay in sync.
   ========================================================================== */
window.DB = {

  /* ---- Equipment (physical machines; drives gallery + demo photos) ---- */
  equipment: {
    "freedom-rack": { name:"Barbell rack + bench", br:"Nautilus · Smith/half-rack, Olympic bar + plates, bench", photo:"thumbs/IMG_7605.jpg" },
    "tg-press":     { name:"Chest Press / Overhead Press", br:"Technogym · dual", photo:"thumbs/IMG_7589.jpg" },
    "tg-legpress":  { name:"Leg Press / Calf", br:"Technogym · dual", photo:"thumbs/IMG_7588.jpg" },
    "tg-legext":    { name:"Leg Extension / Leg Curl", br:"Technogym · dual", photo:"thumbs/IMG_7592.jpg" },
    "tg-pulls":     { name:"High Pull / Low Pull", br:"Technogym · pulldown + row", photo:"thumbs/IMG_7603.jpg" },
    "nautilus-ft":  { name:"Dual functional trainers", br:"Nautilus Instinct · pair", photo:"thumbs/IMG_7583.jpg" },
    "total-gym":    { name:"Bodyweight glideboard", br:"Incline rail trainer", photo:"thumbs/IMG_7587.jpg" },
    "back-ext":     { name:"Back-extension bench", br:"45° frame", photo:"thumbs/IMG_7585.jpg" },
    "treadmills":   { name:"Treadmills ×2", br:"Star Trac", photo:"thumbs/IMG_7594.jpg" },
    "stairs":       { name:"Stair climbers ×2", br:"StairMaster Gauntlet", photo:"thumbs/IMG_7596.jpg" },
    "rowers":       { name:"Rowers ×2", br:"Rail + fan rower", photo:"thumbs/IMG_7595.jpg" },
    "fuel-bench":   { name:"Adjustable bench", br:"Flat / incline", photo:"thumbs/IMG_7586.jpg" },
    "gymrax":       { name:"Functional rig + free weights", br:"Hex DBs (~10 kg / 22 lb), spin-lock DBs, kettlebell, wall/med balls (8 lb / 3.6 kg), 55 cm ball, rings, foam rollers, step, bands", photo:"thumbs/IMG_7604.jpg" },
  },

  /* Ordering + grouping for the Equipment gallery */
  equipmentGroups: [
    { title:"Strength — Rack & selectorized machines", ids:["freedom-rack","tg-press","tg-legpress","tg-legext","tg-pulls"] },
    { title:"Functional / cable & bodyweight", ids:["nautilus-ft","total-gym","back-ext"] },
    { title:"Cardio", ids:["treadmills","stairs","rowers"] },
    { title:"Free weights & accessories", ids:["fuel-bench","gymrax"] },
  ],

  /* ---- Exercises (canonical: name, muscles, demo gif) ---- */
  exercises: {
    "bench-press":      { name:"Barbell Bench Press", primary:"Chest", secondary:["Triceps","Shoulders"], gif:"anim/bench-press.gif" },
    "incline-db-press": { name:"Incline DB Press", primary:"Upper chest", secondary:["Shoulders"], gif:"anim/incline-db-press.gif" },
    "cable-flye":       { name:"Cable Flye", primary:"Chest", secondary:["Front delts"], gif:"anim/cable-flye.gif" },
    "overhead-press":   { name:"Overhead Press", primary:"Delts", secondary:["Triceps"], gif:"anim/overhead-press.gif" },
    "lateral-raise":    { name:"Cable Lateral Raise", primary:"Side delts", secondary:[], gif:"anim/lateral-raise.gif" },
    "triceps-pushdown": { name:"Rope Triceps Pushdown", primary:"Triceps", secondary:[], gif:"anim/triceps-pushdown.gif" },
    "overhead-triceps": { name:"Overhead Cable Triceps Ext.", primary:"Triceps", secondary:["long head"], gif:"anim/overhead-triceps.gif" },
    "barbell-row":      { name:"Barbell Row", primary:"Upper back", secondary:["Biceps"], gif:"anim/barbell-row.gif" },
    "lat-pulldown":     { name:"Lat Pulldown", primary:"Lats", secondary:["Biceps"], gif:"anim/lat-pulldown.gif" },
    "seated-row":       { name:"Seated Row", primary:"Mid back", secondary:["Biceps"], gif:"anim/seated-row.gif" },
    "face-pull":        { name:"Face Pull", primary:"Rear delts", secondary:["Traps"], gif:"anim/face-pull.gif" },
    "incline-curl":     { name:"Incline DB Curl", primary:"Biceps", secondary:[], gif:"anim/incline-curl.gif" },
    "hammer-curl":      { name:"Hammer / Rope Curl", primary:"Biceps", secondary:["Forearms"], gif:"anim/hammer-curl.gif" },
    "squat":            { name:"Barbell Squat", primary:"Quads", secondary:["Glutes","Hams"], gif:"anim/squat.gif" },
    "leg-press":        { name:"Leg Press", primary:"Quads", secondary:["Glutes"], gif:"anim/leg-press.gif" },
    "leg-extension":    { name:"Leg Extension", primary:"Quads", secondary:[], gif:"anim/leg-extension.gif" },
    "leg-curl":         { name:"Leg Curl", primary:"Hamstrings", secondary:[], gif:"anim/leg-curl.gif" },
    "calf-raise":       { name:"Calf Raise", primary:"Calves", secondary:[], gif:"anim/calf-raise.gif" },
    "rdl":              { name:"Barbell Romanian Deadlift", primary:"Hamstrings", secondary:["Glutes"], gif:"anim/rdl.gif" },
  },

  /* ---- Routine days ----
     Each item references an exercise (ex) + equipment photo (gear).
     `equip` is the free-text "what you use" label. name/primary/secondary
     override the exercise defaults only when the day differs. */
  days: [
    { id:"d1", name:"Push", focus:"CHEST·SHLDR·TRI", sets:22, time:"55–65 min", items:[
      { ex:"bench-press",      equip:"Freedom Rack",              gear:"freedom-rack", sets:"4 × 5–8" },
      { ex:"incline-db-press", equip:"FUEL bench + dumbbells",    gear:"fuel-bench",   sets:"3 × 8–12" },
      { ex:"cable-flye",       equip:"Nautilus functional trainer", gear:"nautilus-ft", sets:"3 × 12–15" },
      { ex:"overhead-press",   equip:"Technogym OH Press",        gear:"tg-press",     sets:"3 × 8–12" },
      { ex:"lateral-raise",    equip:"Nautilus, single-arm",      gear:"nautilus-ft",  sets:"4 × 12–20", star:true },
      { ex:"triceps-pushdown", equip:"Nautilus cable",            gear:"nautilus-ft",  sets:"3 × 10–15" },
      { ex:"overhead-triceps", equip:"Nautilus cable",            gear:"nautilus-ft",  sets:"2 × 12–15" },
    ]},
    { id:"d2", name:"Pull", focus:"BACK·BI·R.DELT", sets:20, time:"50–60 min", items:[
      { ex:"barbell-row",  equip:"Freedom Rack",           gear:"freedom-rack", sets:"4 × 6–10" },
      { ex:"lat-pulldown", equip:"Technogym High Pull",    gear:"tg-pulls",     sets:"4 × 8–12" },
      { ex:"seated-row",   equip:"Technogym Low Pull",     gear:"tg-pulls",     sets:"3 × 8–12" },
      { ex:"face-pull",    equip:"Nautilus cable (rope)",  gear:"nautilus-ft",  sets:"3 × 15–20", star:true },
      { ex:"incline-curl", equip:"FUEL bench + dumbbells", gear:"fuel-bench",   sets:"3 × 10–12" },
      { ex:"hammer-curl",  equip:"Dumbbells or cable",     gear:"gymrax",       sets:"3 × 10–12" },
    ]},
    { id:"d3", name:"Legs", focus:"QUAD·HAM·CALF", sets:17, time:"50–60 min", items:[
      { ex:"squat",         equip:"Freedom Rack",             gear:"freedom-rack", sets:"4 × 5–8" },
      { ex:"leg-press",     equip:"Technogym Leg Press",      gear:"tg-legpress",  sets:"3 × 10–12" },
      { ex:"leg-extension", equip:"Technogym",                gear:"tg-legext",    sets:"3 × 12–15" },
      { ex:"leg-curl",      equip:"Technogym",                gear:"tg-legext",    sets:"3 × 10–12" },
      { ex:"calf-raise",    equip:"Leg press / calf setting", gear:"tg-legpress",  sets:"4 × 12–20" },
    ]},
    { id:"d4", name:"Upper", focus:"DELT/ARM", sets:23, time:"55–60 min", items:[
      { ex:"overhead-press", name:"Barbell Overhead Press", equip:"Freedom Rack",        gear:"freedom-rack", sets:"4 × 6–10" },
      { ex:"lat-pulldown",   name:"Wide Lat Pulldown",      equip:"Technogym High Pull", gear:"tg-pulls",     sets:"3 × 10–12" },
      { name:"Incline Chest Press", primary:"Upper chest", secondary:["Shoulders"], equip:"Machine or FUEL bench", gear:"fuel-bench", sets:"3 × 8–12" },
      { ex:"lateral-raise",  equip:"Nautilus cable",        gear:"nautilus-ft",  sets:"4 × 15–20", star:true },
      { ex:"seated-row",     name:"Cable Row",              equip:"Technogym Low Pull",  gear:"tg-pulls", sets:"3 × 10–12" },
      { ex:"incline-curl",   name:"Superset: Curl + Pushdown", secondary:["Triceps"], equip:"Nautilus cable", gear:"nautilus-ft", sets:"3 × 12 ea" },
      { ex:"face-pull",      equip:"Nautilus cable",        gear:"nautilus-ft",  sets:"3 × 20" },
    ]},
    { id:"d5", name:"Lower+", focus:"LEG·ARM·CORE", sets:22, time:"55–60 min", items:[
      { ex:"rdl",           equip:"Freedom Rack",        gear:"freedom-rack", sets:"4 × 6–10" },
      { ex:"leg-press",     name:"Leg Press (wide stance)", equip:"Technogym", gear:"tg-legpress", sets:"3 × 10–12" },
      { ex:"leg-curl",      equip:"Technogym",           gear:"tg-legext",    sets:"3 × 12" },
      { ex:"leg-extension", equip:"Technogym",           gear:"tg-legext",    sets:"3 × 15" },
      { ex:"calf-raise",    equip:"Leg press / calf",    gear:"tg-legpress",  sets:"4 × 15" },
      { ex:"hammer-curl",   name:"Arm Giant Set: Curl+Hammer+OH Tri", secondary:["Triceps"], equip:"Cables / dumbbells", gear:"gymrax", sets:"3–4 rds" },
      { name:"Core: Rollout · Knee Raise · Crunch", primary:"Core", secondary:["Abs"], equip:"Gym Rax rings, cable", gear:"gymrax", sets:"3 × 10–15" },
    ]},
  ],

  /* ---- Load targets (grouped; rows with `ex` open the demo) ---- */
  loads: [
    { title:"Barbell compounds — Freedom Rack", rows:[
      { name:"Bench Press",       trains:"Chest",         start:"30 kg / 66 lb", target:"60 kg / 132 lb" },
      { name:"Squat",             trains:"Quads / glutes", start:"40 kg / 88 lb", target:"80 kg / 176 lb" },
      { name:"Overhead Press",    trains:"Shoulders",     start:"25 kg / 55 lb", target:"40 kg / 88 lb",  ex:"overhead-press" },
      { name:"Barbell Row",       trains:"Back",          start:"35 kg / 77 lb", target:"60 kg / 132 lb", ex:"barbell-row" },
      { name:"Romanian Deadlift", trains:"Hams / glutes", start:"40 kg / 88 lb", target:"80 kg / 176 lb" },
    ]},
    { title:"Machine & cable accessories", rows:[
      { name:"Lat Pulldown",  trains:"Back",       start:"35 kg / 77 lb",  target:"55 kg / 120 lb", ex:"lat-pulldown" },
      { name:"Seated Row",    trains:"Back",       start:"35 kg / 77 lb",  target:"55 kg / 120 lb", ex:"seated-row" },
      { name:"Leg Press",     trains:"Quads",      start:"70 kg / 155 lb", target:"140 kg / 310 lb", ex:"leg-press" },
      { name:"Leg Extension", trains:"Quads",      start:"30 kg / 66 lb",  target:"55 kg / 120 lb", ex:"leg-extension" },
      { name:"Leg Curl",      trains:"Hamstrings", start:"25 kg / 55 lb",  target:"45 kg / 100 lb", ex:"leg-curl" },
      { name:"Calf Raise",    trains:"Calves",     start:"40 kg / 88 lb",  target:"80 kg / 175 lb", ex:"calf-raise" },
      { name:"Cable Lateral", trains:"Side delts · per arm", start:"5 kg / 11 lb", target:"9 kg / 20 lb", star:true },
      { name:"Face Pull",     trains:"Rear delts", start:"15 kg / 33 lb",  target:"27 kg / 60 lb",  ex:"face-pull", star:true },
      { name:"Curl",          trains:"Biceps · cable/DB", start:"10 kg / 22 lb", target:"16 kg / 35 lb" },
      { name:"Rope Pushdown", trains:"Triceps",    start:"15 kg / 33 lb",  target:"30 kg / 66 lb" },
    ]},
  ],
};
