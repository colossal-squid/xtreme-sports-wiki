const fs = require('fs');
const path = process.argv[2];

(async function() {
    const gameStr = await readFile(path);
    const game = JSON.parse(gameStr);
    const md = generateMd(game);
    const gameHandle = getHandle(game);
    fs.writeFile(`./tmp/${gameHandle}.md`, md, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
})();

async function readFile(path) {
    return new Promise((res, rej)=>{
        fs.readFile(path, (err, data)=>{
            if (!!err) {
                rej(err);
            }
            let parsed = data.toString();
            res(parsed);
        })
    });
}

function getHandle(game) {
    return game.handle || game.name.replace(/\s()/g, '_').toLowerCase().replace(/[()\,\:]/g, '')
}

function generateMd(game) {
    return `---
title: ${game.name.replace(':', '&#x3a;')}
platforms: ${game.platform}
mechanics: ${game.mechanics}
date: ${game.releaseDate}
sports: ${game.sports}
---
<table> 
    <tr>
        <td>Alternative titles</td>
        <td>${game.altTitles.join(',')}</td>
        <td rowspan="${game.attributes.length}">
            <img src="${game.cover}"/> 
        </td>
    </tr>
    ${ game.attributes.map( attr=> {
        return `<tr> <td>${attr.name}</td><td>${attr.value}</td></tr>`;
    } ).join('\n') }
</table>

### Description:
${game.description}

### Screenshots
${game.screenshots}

### Video
${game.video}

### Related games
${(game.relatedGames || []).map( line=>`* ${line}` ).join('\n')}

### Websites
${game.websites.map( line=>`* ${line}` ).join('\n')}

`;
}