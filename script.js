const fs = require('fs');
const moment = require('moment');
const igdb = require('igdb-api-node').default;

// const igdb_api_key = process.argv[2];
// const ids = [process.argv[3]];
// console.log('reading params...');
// console.log(igdb_api_key);
// const client = igdb(igdb_api_key);

// client.games({
//     fields: '*',
//     limit: 1,
//     ids: ids
// }).then(res=>{
//     console.log(res.body);
// }).catch(err=>{
//     console.log(err);
// });
regen();
/** re-generating the markdown stuff */
function regen() {
    fs.readFile('./cooldump.json', 'utf8', (err, bin)=>{
        if (err) {
            throw err;
        }
        const allRecords = JSON.parse(bin.substring(1));
        let allFilePromises = allRecords.data.map((record)=>{
            const game = record.data[0];
            const fileName = `${game.slug}-${game.id}.md`;
            const dataToWrite = recToMd(game, allRecords.data);
            return new Promise((res, rej)=>{
                fs.writeFile(`./src/markdown/games/${fileName}`, dataToWrite, (err) => {
                    if (err) rej(err);
                    console.log(`The file ${fileName} has been saved!`);
                    res();
                });
            })
            
        });
    });
}

function recToMd(game, allRecords) {
const gamesList = (game.games || [])
.map( id => {
    let found = allRecords.find( rec => rec.data[0].id === id );
    if (!found) {
        console.log(`could not map ${id}`)
    } else {
        console.log(`Mapped ${found.data[0].name}`)
    }
    return !!found ? found.data[0] : 'nope'; 
})
.filter(g => g!== 'nope')
.map( rec => `* [${rec.name}](/games/${rec.slug +'-'+ rec.id}/)` ).join('\n');
const screenshotsHtml = game.screenshots && game.screenshots.length ? game.screenshots.map(
    scr=>`<a target="_blank" href="${scr.url.replace('t_thumb', 't_cover_big')}"><img src="${scr.url}"/></a>`
).join('') : '[no screenshots yet ...]';
const videoHtml = game.videos && game.videos.length ? game.videos.map(vid=>{
    return `####${vid.name}

<iframe width="560" height="315" src="https://www.youtube.com/embed/${vid.video_id}" frameborder="0" allowfullscreen></iframe>
`
}) : '[no videos yet...]';
return `---
title: ${game.name.replace(':','&#x3a;')}
platforms: ${transformPlatforms(game.platforms)}
mechanics: ${game.core_mechanics || "n/a"}
date: ${game.first_release_date ? moment(new Date(game.first_release_date)).format('MMMM YYYY') : 'n/a'}
sports: ${(game.sports || []).join(',')}
---
#${game.name}
![game cover art](${game.cover && game.cover.url ? game.cover.url.replace('t_thumb', 't_cover_big') : '-'} "Logo Title Text 1")
####Alternative tiles:
${(game.alternative_names || []).map(name=>`* ${name.name} (${name.comment})`).join('\n')}
###Platforms
${transformPlatforms(game.platforms)}

###Description:
${game.summary}
###Screenshots
${screenshotsHtml}
###Video
${videoHtml}
###Related games
${gamesList}
###Websites
${(game.websites || []).map( site=> `* [${site.url}](${site.url})` ).join('\n')}
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