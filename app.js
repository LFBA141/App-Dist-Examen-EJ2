const express = require('express')
const app = express()
const port = 9000
var fs = require('fs'); 
const AdmZip = require('adm-zip');
app.listen(port, () => console.log(`Server started on port ${port}`));

var uploadDir = fs.readdirSync(__dirname+"/upload"); 
app.get('/', (req, res) => {
    const zip = new AdmZip();

    for(var i = 0; i < uploadDir.length;i++){
        zip.addLocalFile(__dirname+"/upload/"+uploadDir[i]);
    }
    const downloadName = `downloadfile.zip`;
  
    const data = zip.toBuffer();

    //salvo la descarga zip
    zip.writeZip(__dirname+"/"+downloadName);
    
    //codigo para la descarga zip
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.send(data);


});
