const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [
  // 1. Wright of Derby - An Experiment on a Bird in the Air Pump
  {
    name: 'wright_air_pump.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/An_Experiment_on_a_Bird_in_the_Air_Pump_by_Joseph_Wright_of_Derby%2C_1768.jpg/1280px-An_Experiment_on_a_Bird_in_the_Air_Pump_by_Joseph_Wright_of_Derby%2C_1768.jpg',
  },
  {
    name: 'wright_portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Joseph_Wright_of_Derby_self_portrait.jpg/500px-Joseph_Wright_of_Derby_self_portrait.jpg',
  },
  // 2. Goya - The Third of May 1808
  {
    name: 'goya_third_of_may.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_edges.jpg/1280px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_edges.jpg',
  },
  {
    name: 'goya_portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vicente_L%C3%B3pez_Porta%C3%B1a_-_El_pintor_Francisco_de_Goya.jpg/500px-Vicente_L%C3%B3pez_Porta%C3%B1a_-_El_pintor_Francisco_de_Goya.jpg',
  },
  // 3. Hogarth - Gin Lane
  {
    name: 'hogarth_gin_lane.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/William_Hogarth_-_Gin_Lane.jpg/1024px-William_Hogarth_-_Gin_Lane.jpg',
  },
  {
    name: 'hogarth_portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/William_Hogarth_self-portrait_with_pug_1745.jpg/500px-William_Hogarth_self-portrait_with_pug_1745.jpg',
  },
  // 4. Sargent - Gassed
  {
    name: 'sargent_gassed.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/John_Singer_Sargent_-_Gassed.jpg/1280px-John_Singer_Sargent_-_Gassed.jpg',
  },
  {
    name: 'sargent_portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/John_Singer_Sargent_Self-portrait_1906.jpg/500px-John_Singer_Sargent_Self-portrait_1906.jpg',
  },
  // 5. Velazquez - Las Meninas
  {
    name: 'velazquez_meninas.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/1024px-Las_Meninas_01.jpg',
  },
  {
    name: 'velazquez_portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Diego_Vel%C3%A1zquez_Autorretrato_45_x_38_cm_-_Colecci%C3%B3n_Real_Academia_de_Bellas_Artes_de_San_Fernando_R-0043.jpg/500px-Diego_Vel%C3%A1zquez_Autorretrato_45_x_38_cm_-_Colecci%C3%B3n_Real_Academia_de_Bellas_Artes_de_San_Fernando_R-0043.jpg',
  },
];

const destDir = path.resolve('public/images/masterpieces');

function download(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(destDir, item.name);
    const options = {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HistoryRevisionHub/1.0 (educational)',
      },
    };

    function fetchUrl(url) {
      https
        .get(url, options, (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            fetchUrl(res.headers.location);
          } else if (res.statusCode === 200) {
            const stream = fs.createWriteStream(filePath);
            res.pipe(stream);
            stream.on('finish', () => resolve(item.name));
          } else {
            reject(new Error('Status ' + res.statusCode + ' for ' + url));
          }
        })
        .on('error', reject);
    }

    fetchUrl(item.url);
  });
}

(async () => {
  for (const t of targets) {
    try {
      await download(t);
      console.log('✅ Downloaded:', t.name, 'Size:', fs.statSync(path.join(destDir, t.name)).size);
    } catch (e) {
      console.error('❌ Error on', t.name, e.message);
    }
  }
})();
