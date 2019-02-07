const fs = require('fs');

const BASE_CONTENT_PATH = 'output.json';
const ADDITIONAL_CONTENT_PATH = 'tmp/';


(async function() {
    const additionalFiles = await getFileList(ADDITIONAL_CONTENT_PATH);
    const map = await readFilesToMap(additionalFiles);
    const base = await readFile(BASE_CONTENT_PATH);
    let baseGames = JSON.parse(base);
    const baseTitles = baseGames.map(g => g.title.replace('&#x3a;',':'));
    const parsedTitles = Array.from(map.keys());
    const baseTitlesNoPair = baseTitles.filter( n => !parsedTitles.includes(n) );
    const canBerMerged = baseTitles.filter( n => parsedTitles.includes(n) );
    const parsedTitlesNoPair = parsedTitles.filter( n => !baseTitles.includes(n) );
    
    // guess I'll leave em AS IS
    // console.log( 'Base titles with no pair\n\n\n' ) 
    // console.log( baseTitlesNoPair.join('\n') );

    // create new pages for em
    // console.log( 'Parsed titles with no pair\n\n\n' )
    // console.log( parsedTitlesNoPair.join('\n') );

    // merge with existing ones
    // console.log( 'can be merged\n\n\n' )
    // console.log( canBerMerged.join('\n') );
    canBerMerged.forEach( (name) => {
        let base = baseGames.find( g => g.title.replace('&#x3a;',':') === name );
        let ext = map.get(name);
        let merged = {...base, ...ext};
        fs.writeFile( `tmp2/${merged.handle}.json`, JSON.stringify(merged, null, 2), (err)=>{
            if (err)
            throw new Error(err); 
        } )
    } )

})();

async function getFileList(folderPath) {
    return new Promise((res, rej)=>{
        fs.readdir(folderPath, (err, items) => {
            if (!!err) {
                rej(err);
            }
            res(items.map(i=>folderPath + i))
        });
    })
}

async function readFilesToMap(filePaths) {
    const map = new Map();
    return Promise.all( 
        filePaths.map(path => readFile(path))
    ).then( res => {
        for (let i=0; i<filePaths.length; i++) {
            const game = JSON.parse(res[i]);
            const filePath = filePaths[i].replace('.json', '');

            if (filePath[filePath.length -1] === '_'  || filePath[filePath.length -1] === '-' ) {
                // console.log('!! found ' + filePath);
                let platformIdx = game.attributes.indexOf("Platform");
                let platformFormatted = '';
                if (platformIdx === -1) {
                    platformIdx = game.attributes.indexOf("Platforms");
                    platformFormatted = game.attributes[platformIdx + 1].map( i => i.text ).join(', ');
                } else {
                    // console.log(game.attributes[platformIdx + 1])
                    platformFormatted = game.attributes[platformIdx + 1].map( i => i.text ).join('');
                }
                game.name = `${game.name} (${platformFormatted})`
            }
            // group attributes
            let attributes = [ ... game.attributes ];
            const mappedAttributes = {};
            let lastKey = '';
            for (let j=0; j<attributes.length; j++) {
                const item = attributes[j];
                if (typeof item === 'string') {
                    lastKey = item;
                } else {
                    if (!!lastKey) {
                        mappedAttributes[lastKey] = item;
                    }
                }
            }
            const formattedAttributes = [];
            Object.keys(mappedAttributes).forEach(k=>{
                formattedAttributes.push(  {
                    name: k,
                    value: mappedAttributes[k].map( a => a.text ).join(',')
                } )
            })
            game.attributes = formattedAttributes ;
            
            map.set( game.name, game )
        }
        return map;
    } );
}

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