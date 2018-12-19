var fs = require('fs');

fs.readFile('./cooldump.json', 'utf8', (err, bin)=>{
    if (err) {
        throw err;
    }
    const allRecords = JSON.parse(bin.substring(1));
    let allFilePromises = allRecords.data.map((record)=>{
        const game = record.data[0];
        const fileName = `${game.slug}-${game.id}.md`;
        const dataToWrite = recToMd(game);
        return new Promise((res, rej)=>{
            fs.writeFile(`./src/markdown/games/${fileName}`, dataToWrite, (err) => {
                if (err) rej(err);
                console.log(`The file ${fileName} has been saved!`);
                res();
            });
        })
        
    });
});

function recToMd(game) {
const screenshotsHtml = game.screenshots && game.screenshots.length ? game.screenshots.map(scr=>`<img src="${scr.url}"/>`) : '-';
return `---
title: ${game.name.replace(':','&#x3a;')}
platforms: ${transformPlatforms(game.platforms)}
mechanics: ${game.core_mechanics || "n/a"}
---
#${game.name}
![game cover art](${game.cover && game.cover.url ? game.cover.url : '-'} "Logo Title Text 1")
${game.summary}
${screenshotsHtml}
`;
}

const PLATFORMS = {
    3: 'Linux',
  4: 'Nintendo 64',
  5: 'Nintendo Wii',
  7: 'PSOne',
  8: 'PS2',
  9: 'PS3',
    11: 'Xbox',
    14: 'Mac',
  21: 'Nintendo Gamecube',
  22: 'Game Boy Color',
  34: 'Android',
  36: 'Xbox Live Arcade',
  38: 'PSP',
  12: 'Xbox 360',
  23: 'Sega Dreamcast',
  20: 'Nintendo DS',
  37: 'Nintendo 3DS',
  39: 'iOS',
  24: 'GBA',
  41: 'Virtual console',
  42: 'N-Gage',
  45: 'PlayStation Network',
  46: 'PSVita',
  48: 'PS4',
  49: 'Xbox One',
  47: 'Wii U',
  52: 'Arcade',
  55: 'Mobile',
  73: 'BlackBerry OS',
  6: 'PC (Microsoft Windows)',
  92: 'Steam OS',
  130: 'Nintendo Switch',
  159: 'Nintendo DSi'
};

function transformPlatforms(platforms) {
    if (!platforms || !platforms.length) {
        return 'n/a'
    } else {
        return platforms.map(p=>PLATFORMS[p]).join(', ');
    }
}