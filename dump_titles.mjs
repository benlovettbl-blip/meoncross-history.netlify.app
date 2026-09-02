import fs from 'fs';

async function dump() {
    const med = await import('./public/units/medieval_england/data.js');
    console.log("Medieval England:");
    med.unitData.lessons.forEach((l, i) => console.log(i+1, l.title));
    
    const wat = await import('./public/units/water_and_sanitation/data.js');
    console.log("\nWater and Sanitation:");
    wat.unitData.lessons.forEach((l, i) => console.log(i+1, l.title));
}
dump();
