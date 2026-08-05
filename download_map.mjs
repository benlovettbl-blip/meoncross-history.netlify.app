import fs from 'fs';
import path from 'path';

async function download() {
    const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ottoman_Empire_16-17th_century.svg/500px-Ottoman_Empire_16-17th_century.svg.png";
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(process.cwd(), 'public', 'images', 'ottoman_1453.jpg'), Buffer.from(buffer));
        console.log("Success");
    } else {
        console.log("Failed", res.status);
    }
}
download();
