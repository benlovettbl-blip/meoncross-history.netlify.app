const fs = require('fs');
let c = fs.readFileSync('public/units/great_war/data.js', 'utf8');

c = c.replace(
    '“We do not want to put anyone in the shade, but we too demand our place in the sun.”',
    '“The days when the German left the earth to one of his neighbors, the sea to the other, and reserved for himself the heavens where pure philosophy reigns—those days are over. We recognize that without power, without a strong army and a strong navy, there can be no welfare for us. We do not want to step on the toes of any foreign power, but at the same time we do not want our own feet tramped by any foreign power. We do not want to put anyone in the shade, but we too demand our place in the sun.”'
);

c = c.replace(
    '“We want eight, and we won\'t wait!”',
    '“The German Kaiser is building a mighty battle fleet that threatens our island nation and our vast Empire. Britain has always ruled the waves, and we must never surrender our naval supremacy. If the Germans are building new Dreadnoughts, then we must outbuild them, no matter the cost to the taxpayer. The safety of our homes depends upon it. We demand that the government immediately construct eight new super-battleships this year. We want eight, and we won\'t wait!”'
);

c = c.replace(
    '“Serbia is a viper that must be crushed. If we do not destroy them now, our empire will be torn apart by Slavic nationalism.”',
    '“The assassination of our beloved Archduke Franz Ferdinand is an unforgivable outrage. It is clear that the government in Belgrade provided the weapons and training for these terrorist assassins. Serbia is a viper that must be crushed. For years they have stirred up rebellion among the Slavic peoples living within our borders. If we do not destroy them now, our entire multi-national empire will be torn apart by Slavic nationalism. We must strike quickly and without mercy, to show the world that Austria-Hungary is still a great power.”'
);

c = c.replace(
    '“You may rest assured that His Majesty will faithfully stand by Austria-Hungary, as is required by the obligations of his alliance and of his ancient friendship.”',
    '“The Kaiser views the assassination at Sarajevo as a direct attack on the principle of monarchy itself. We fully understand that Austria-Hungary must take swift and severe military action against Serbia to restore its honor. If Russia foolishly decides to intervene to protect Serbia, Germany will not hesitate to mobilize its own forces. You may rest assured that His Majesty will faithfully stand by Austria-Hungary, as is required by the obligations of his alliance and of his ancient friendship, even if it leads to a European war.”'
);

fs.writeFileSync('public/units/great_war/data.js', c);
console.log('Patched sources in data.js');
