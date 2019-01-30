const PATH = 'C:/dev/js/gatsby/xtreme-static/src/markdown/games/'
const fs = require('fs');

(async function(){
    const files = await getFileList(PATH);
    const map = await readFilesToMap(files);
    const mapped = Array.from(map.keys()).map( key => {
        const obj = markdownToJson(map.get(key));
        obj.filePath = key;
        return obj;
    } );
    console.log(JSON.stringify(mapped, null, 2));
}())

/*split my markdown into a json obj*/
function markdownToJson(markdown) {
    const obj = {};
    // read frontmatter first. frontmatter is easy
    const frontmatterRows = markdown.substring(
        markdown.indexOf('---'),
        markdown.lastIndexOf('---')
    ).split('\n');
    
    frontmatterRows.forEach(row=>{
        const key = row.substring(0, row.indexOf(':'));
        if (!key) {
            return;
        }
        obj[key] = row.substring( row.indexOf(':') + 1 ).replace('\r', '').trim();
    });
    let partial = markdown.substring(
        markdown.lastIndexOf('---') + 5
    );
    partial = partial.substring(0, partial.indexOf('####Alternative tiles') );
    obj.cover = partial;
    obj.altTitles = markdown.substring(
        markdown.indexOf('####Alternative tiles') + 22,
        markdown.indexOf('###Platforms'),
    ).replace(/\r/g,'')
    .replace(/\n/g, '')
    .split('*')
    .filter(t=>!!t)
    .map(t=>t.replace('(undefined)', '').trim())

    obj.description = markdown.substring(
        markdown.indexOf('###Description') + 17,
        markdown.indexOf('###Screenshots')
    ).replace('undefined', '').replace(/\r/g,'')
    .replace(/\n/g, '');

    const scrPartial = markdown.substring(
        markdown.indexOf('###Screenshots') + 16,
        markdown.indexOf('###Video')
    );
    obj.screenshots = scrPartial.includes('no screenshots') ? [] : scrPartial;

    if (markdown.indexOf('###Video') !== -1) {
        const videoPartial = markdown.substring(
            markdown.indexOf('###Video') + 11,
            markdown.indexOf('###Related games')
        );
        obj.video = videoPartial.includes('no videos yet') ? '' : videoPartial;
    }

    obj.relatedGames = markdown.substring(
        markdown.indexOf('###Related games') + 16,
        markdown.indexOf('###Websites')
    ).replace(/\r/g,'')
    .replace(/\n/g, '')
    .split('*')
    .filter(t=>!!t)
    .map(t=>t.trim());

    obj.websites = markdown.substring(
        markdown.indexOf('###Websites') + 11
    )
    .split('*')
    .map(t =>t.replace(/\r/g,''))
    .map(t =>t.replace(/\n/g,''))
    .filter(t=>!!t)

    return obj;
}

async function readFilesToMap(filePaths) {
    const map = new Map();
    return Promise.all( 
        filePaths.map(path => readFile(path))
    ).then( res => {
        for (let i=0; i<filePaths.length; i++) {
            map.set( filePaths[i], res[i] )
        }
        return map;
    } );
}

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