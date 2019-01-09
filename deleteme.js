const fs = require('fs');
const BASE_PATH = `./src/markdown/games`;

let readPromises = [];

fs.readdir(BASE_PATH, function(err, items) {

    readPromises = items.map(
        path=>readFile(`${BASE_PATH}/${path}`)
    );
    Promise.all(readPromises).then((results)=>{
        
        let writePromises = results.map(({path, data})=>{
            console.log(`${path} ...`)
            let headerRemoved = data.substring(
                0,
                data.lastIndexOf('---') + 4
            ) + data.substring( data.lastIndexOf('![') )
            return writeFile(path, headerRemoved);
        });

        return Promise.all(writePromises);

    })
    .then(res=>{
        console.log('done!')
    })
    .catch(e=>console.error(e))
});

function readFile(path) {
    return new Promise((res, rej)=>{
        if (!path) {
            rej(`path has to be defined`)
        }
        fs.readFile(path, 'utf8', (err, data)=>{
            if (err) {
                rej(err);
            } else {
                // console.log(data);
                res( {
                    path: path,
                    data: data
                } );
            }
        })
    })
}

function writeFile(path, data) {
    return new Promise((res, rej)=>{
        fs.writeFile(path, data, 'utf8', (err)=>{
            if (err) {
                rej(err);
            } else {
                res();
            }
        });
    });
}