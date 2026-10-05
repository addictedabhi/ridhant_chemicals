/* Ridhant Speciality Chemicals – site content.
   Edit products, categories, industries and images here. */
window.CATS = [
  { id: 'soaps', name: 'Metallic Soaps', desc: 'Stearates and laurates that work as lubricants, release agents, acid scavengers and stabilisers.' },
  { id: 'disp', name: 'Dispersions', desc: 'Water-based stearate dispersions for easy, dust-free dosing in aqueous systems.' },
  { id: 'waxes', name: 'PE & PP Waxes', desc: 'Polyolefin, oxidised and amide waxes plus emulsions for processing, slip and surface finish.' },
  { id: 'ao', name: 'Antioxidants', desc: 'Primary and secondary antioxidants that protect polymers and oils from heat and oxidation.' },
  { id: 'fill', name: 'Fillers & Minerals', desc: 'Talc and calcium oxide for reinforcement, nucleation and moisture scavenging.' },
  { id: 'food', name: 'Food Additives', desc: 'Preservatives and emulsifiers for bakery, dairy and processed foods.' },
  { id: 'poly', name: 'Polymer Additives', desc: 'Antistats, lubricants, plasticisers, stabilisers and nucleators for plastics and PVC.' }
];
window.PRODUCTS = [
  ['Zinc Stearate','soaps','Lubricant, release agent and flatting agent. Improves flow and surface finish.',['Plastic','Rubber','Paints','Ink & Coatings','Personal Care']],
  ['Calcium Stearate','soaps','Acid scavenger and internal lubricant for PVC and polyolefins; water repellent for construction.',['Plastic','Construction','Rubber','Lubricants']],
  ['Magnesium Stearate','soaps','Lubricant and anti-caking agent with a smooth, fine texture.',['Personal Care','Plastic','Food']],
  ['Aluminium Stearate','soaps','Thickener, gelling and matting agent for paints, inks and greases.',['Paints','Ink & Coatings','Lubricants']],
  ['Sodium Stearate','soaps','Emulsifier and gelling agent; nucleating aid for polymers.',['Personal Care','Rubber','Plastic']],
  ['Potassium Stearate','soaps','Emulsifier for latex and rubber compounding.',['Rubber','Personal Care']],
  ['Zinc Laurate','soaps','Activator and internal lubricant for rubber compounds.',['Rubber']],
  ['Calcium Stearate Dispersion','disp','Water-based dispersion for gypsum, paper coatings and waterproofing.',['Construction','Paints','Ink & Coatings']],
  ['Zinc Stearate Dispersion','disp','Water-based anti-tack and release dispersion; matting for coatings.',['Rubber','Ink & Coatings','Paints']],
  ['PE Wax','waxes','Processing aid and dispersant for masterbatch, PVC and hot-melt road-marking paint.',['Plastic','Paints','Ink & Coatings','EPE']],
  ['PP Wax','waxes','High-melt wax for masterbatch dispersion and slip.',['Plastic','Ink & Coatings']],
  ['Oxidised PE Wax','waxes','External lubricant for rigid PVC; adds gloss and release.',['Plastic','Construction','Ink & Coatings']],
  ['PE Wax Emulsion','waxes','Adds scuff resistance, slip and water repellency to coatings and inks.',['Ink & Coatings','Paints']],
  ['EBS Wax','waxes','Ethylene bis-stearamide for slip, anti-block and mould release.',['Plastic','Rubber','EPE','Lubricants']],
  ['Antioxidant 1010','ao','Primary phenolic antioxidant for long-term thermal stability.',['Plastic','EPE','Lubricants','Petrochemicals','Rubber']],
  ['Antioxidant 168','ao','Phosphite secondary antioxidant for processing stability.',['Plastic','EPE','Petrochemicals']],
  ['Antioxidant 225 & blends','ao','Synergistic 1010/168 blends for polyolefins.',['Plastic','EPE','Petrochemicals']],
  ['Talc','fill','Reinforcing filler and nucleator; improves stiffness and processing.',['Plastic','Paints','Rubber','Personal Care','EPE']],
  ['Calcium Oxide (CaO)','fill','Moisture scavenger for desiccant masterbatch and construction products.',['Plastic','Construction','Rubber']],
  ['Calcium Propionate','food','Mould inhibitor for bread and bakery products.',['Food']],
  ['Sodium Propionate','food','Preservative for bakery, dairy and processed foods.',['Food']],
  ['GMS-SE / GMS-NSE','food','Glycerol monostearate, self- and non-self-emulsifying, for food and cosmetic emulsions.',['Food','Personal Care']],
  ['GMS / DMG 90 / 95','poly','Distilled monoglyceride; antistatic and anti-shrink agent for EPE foam and films.',['EPE','Plastic','Food']],
  ['PETS','poly','Pentaerythritol tetrastearate; release agent and lubricant for engineering plastics.',['Plastic']],
  ['EGDS','poly','Ethylene glycol distearate; pearlising agent and lubricant.',['Personal Care','Plastic']],
  ['ESBO','poly','Epoxidised soybean oil; secondary plasticiser and co-stabiliser for PVC.',['Plastic','Construction']],
  ['ATO','poly','Antimony trioxide; flame-retardant synergist.',['Plastic','Rubber','Paints']],
  ['UV Stabilisers','poly','Protect polymers and coatings against sunlight degradation.',['Plastic','Paints','EPE']],
  ['PVC Stabilisers','poly','Heat stabiliser systems for pipes, profiles and cables.',['Plastic','Construction']],
  ['Nucleating Agents','poly','Faster cycle times, higher clarity and stiffness in polypropylene.',['Plastic']]
].map(([name, cat, use, ind]) => ({ name, cat, use, ind }));
window.INDUSTRIES = [
  ['EPE','Expanded polyethylene foam needs stable cells, low shrinkage and static control. We supply monoglycerides, talc and antioxidants that keep foam lines running consistently.'],
  ['Ink & Coatings','Wax emulsions, stearate dispersions and matting agents for slip, scuff resistance and controlled gloss in printing inks and industrial coatings.'],
  ['Construction','Water repellents, PVC stabilisers and moisture scavengers for gypsum, waterproofing compounds, pipes and profiles.'],
  ['Food','Food-grade preservatives and emulsifiers, including propionates and GMS, for longer shelf life and better texture in bakery and dairy.'],
  ['Plastic','Our broadest range: lubricants, antioxidants, nucleators, antistats and stabilisers for polyolefins, PVC, masterbatch and engineering plastics.'],
  ['Lubricants','Thickeners and antioxidants for greases and industrial lubricants, including aluminium and calcium stearates.'],
  ['Personal Care','Stearates, GMS and EGDS for creams, powders and pearlised cleansers, with smooth texture and stable emulsions.'],
  ['Rubber','Activators, release agents and processing aids for tyres, technical rubber goods and latex.'],
  ['Paints','Waxes for hot-melt road-marking paints, plus matting, anti-settling and UV-protection additives for decorative and industrial paints.'],
  ['Petrochemicals','Stabilisation packages for polymer producers and refiners, built on phenolic and phosphite antioxidants.']
].map(([name, desc]) => ({ name, desc }));

/* Industry card images (keyed by slug). Replace with local files, e.g. "assets/img/industries/epe.jpg" */
window.INDUSTRY_IMAGES = {"construction":"https://cdn.stocksnap.io/img-thumbs/960w/QDDPZH3YSO.jpg","food":"https://cdn.stocksnap.io/img-thumbs/960w/9J9OUZYDZ3.jpg","personalcare":"https://cdn.stocksnap.io/img-thumbs/960w/GZAJOCOQCW.jpg","rubber":"https://cdn.stocksnap.io/img-thumbs/960w/MUVDMYQQXF.jpg","paints":"https://cdn.stocksnap.io/img-thumbs/960w/CMUNDXFEWK.jpg","inkcoatings":"https://cdn.stocksnap.io/img-thumbs/960w/4LB01GZ7EL.jpg","plastic":"https://cdn.stocksnap.io/img-thumbs/960w/EBUJNKRBLV.jpg","epe":"https://cdn.stocksnap.io/img-thumbs/960w/USP4WCYPBW.jpg","lubricants":"https://cdn.stocksnap.io/img-thumbs/960w/2PJ81W5Q7X.jpg","petrochemicals":"https://cdn.stocksnap.io/img-thumbs/960w/9F9BCEC953.jpg"};
