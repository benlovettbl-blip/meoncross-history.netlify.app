const https = require('https');

const mapping = {
  "GrandMufti.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/f8/GrandMufti.jpg",
  "Intifada palestine 1987.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/02/Intifada_palestine_1987.jpg",
  "Yasser Arafat in the 1990s cropped.jpg": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Yasser_Arafat_in_the_1990s_cropped.jpg",
  "Abdullah I of Jordan cropped.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Abdullah_I_of_Jordan_cropped.jpg",
  "King Hussein of Jordan.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/93/King_Hussein_of_Jordan.jpg",
  "Mahmoud Abbas (World Economic Forum) (cropped).jpg": "https://upload.wikimedia.org/wikipedia/commons/5/56/Mahmoud_Abbas_(World_Economic_Forum)_(cropped).jpg",
  "Golda Meir 1969.jpg": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Golda_Meir_1969.jpg",
  "Ariel Sharon cropped.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/10/Ariel_Sharon_cropped.jpg",
  "Moshe Dayan 1955.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Moshe_Dayan_1955.jpg",
  "Yitzhak Rabin 1993.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Yitzhak_Rabin_1993.jpg",
  "Ernest Bevin 1945.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/00/Ernest_Bevin_1945.jpg",
  "Yitzhak Shamir 1981.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/64/Yitzhak_Shamir_1981.jpg",
  "Henry Kissinger 1973.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/38/Henry_Kissinger_1973.jpg",
  "JimmyCarterPortrait2.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/5a/JimmyCarterPortrait2.jpg",
  "Menachem Begin cropped.jpg": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Menachem_Begin_cropped.jpg",
  "Palestinian refugees 1948.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Palestinian_refugees_1948.jpg",
  "Gamal Abdel Nasser 1968.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/18/Gamal_Abdel_Nasser_1968.jpg",
  "George Habash 1969.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/66/George_Habash_1969.jpg",
  "Anwar Sadat 1978.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/08/Anwar_Sadat_1978.jpg",
  "Mikhail Gorbachev 1987 (cropped).jpg": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Mikhail_Gorbachev_1987_(cropped).jpg",
  "Rabin Clinton Arafat 1993-09-13.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/df/Rabin_Clinton_Arafat_1993-09-13.jpg",
  "Egyptian forces crossing the Suez Canal on 7 October 1973.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/67/Egyptian_forces_crossing_the_Suez_Canal_on_7_October_1973.jpg",
  "Hosni Mubarak 1982.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/83/Hosni_Mubarak_1982.jpg",
  "Levi Eshkol.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Levi_Eshkol.jpg",
  "Straits of Tiran.JPG": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Straits_of_Tiran.JPG",
  "UN Palestine Partition Plan 1947.svg": "https://upload.wikimedia.org/wikipedia/commons/3/38/UN_Palestine_Partition_Plan_1947.svg",
  "Saddam Hussein 1979.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/56/Saddam_Hussein_1979.jpg",
  "Western wall 1967.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Western_wall_1967.jpg",
  "Folke Bernadotte portrait.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/35/Folke_Bernadotte_portrait.jpg",
  "Bill Clinton.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bill_Clinton.jpg",
  "Sadat Carter Begin Camp David 1978.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Sadat_Carter_Begin_Camp_David_1978.jpg",
  "Hafez al-Assad.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/58/Hafez_al-Assad.jpg",
  "David Ben Gurion head cropped 1948.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b8/David_Ben_Gurion_head_cropped_1948.jpg",
  "1949 Armistice Agreements Map.png": "https://upload.wikimedia.org/wikipedia/commons/3/3a/1949_Armistice_Agreements_Map.png",
  "Gamal Abdel Nasser nationalizing the Suez Canal 1956.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/19/Gamal_Abdel_Nasser_nationalizing_the_Suez_Canal_1956.jpg",
  "George H. W. Bush presidential portrait cropped.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/55/George_H._W._Bush_presidential_portrait_cropped.jpg"
};

async function checkUrl(name, url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'EdexcelHistoryStudyApp/1.0 (studyapp@gmail.com)' } }, (res) => {
      console.log(`${name}: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`${name} Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  const entries = Object.entries(mapping);
  // Just test a few to check
  for (let i = 0; i < 5; i++) {
    await checkUrl(entries[i][0], entries[i][1]);
  }
}

run();
