@echo off
set UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Leader_of_the_PLO%%2C_Yasser_Arafat%%2C_1996_Dan_Hadani_Archive.jpg/500px-Leader_of_the_PLO%%2C_Yasser_Arafat%%2C_1996_Dan_Hadani_Archive.jpg" -o cme_new/assets/card_arafat.png
curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/David_Ben-Gurion_%%28D597-087%%29.jpg/500px-David_Ben-Gurion_%%28D597-087%%29.jpg" -o cme_new/assets/card_bengurion.png
curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Stevan_Kragujevic%%2C_Gamal_Abdel_Naser_u_Beogradu%%2C_1962.jpg/500px-Stevan_Kragujevic%%2C_Gamal_Abdel_Naser_u_Beogradu%%2C_1962.jpg" -o cme_new/assets/card_nasser.png
curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dan_Hadani_collection_%%28990044371930205171%%29.jpg/500px-Dan_Hadani_collection_%%28990044371930205171%%29.jpg" -o cme_new/assets/card_golda.png
curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Jimmy_Carter_Official_Portrait2_%%283x4_cropped%%29.jpg/500px-Jimmy_Carter_Official_Portrait2_%%283x4_cropped%%29.jpg" -o cme_new/assets/card_carter.png
curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yitzhak_Rabin_1994_Portrait_%%283x4_cropped%%29.jpg/500px-Yitzhak_Rabin_1994_Portrait_%%283x4_cropped%%29.jpg" -o cme_new/assets/card_rabin.png
curl.exe -s -A %UA% -L "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ariel_Sharon_official_portrait_2001.webp/500px-Ariel_Sharon_official_portrait_2001.webp.png" -o cme_new/assets/card_sharon.png

echo "Downloaded all portraits!"
