const dotenv=require("dotenv").config();
const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');


const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
const development={
   name:'development',
    asset_path:'./assets',
    db:'codeial_development',
    
}

const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    db:process.env.CODEIAL_DB,
    
}
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);