const fs = require("fs");
const readline = require("readline");
var argv = require('minimist')(process.argv.slice(2));//args using minimist, but ignore first 2

const version="TXT-to-HTML Static Site Converter v0.1";//tool name and version when queried

//help description
const help="This is mainly a tool that covnerts txt files to static web pages.\n\
The user can provide one or more txt files to covnert into html file(s) of the same names.\n\n\
--version or -v\n\
This provides tool name and its version.\n\
--help or -h\nThis shows the help guide.\n"

//main txt to html conversion
function txtReader(source){
    const destination = "./dist"+source.slice(source.lastIndexOf("/"),source.indexOf(".txt"))+".html";
    const inStream = fs.createReadStream(source);
    const outStream = fs.createWriteStream(destination, { encoding: "utf8" });

    //interface
    var reader = readline.createInterface({
      input: inStream,
      terminal: false
    });

    //change to each line
    reader.on("line", function(line) {
     if(line.trim()==""){
        outStream.write(" \n");
     }
     else{
        outStream.write("<p>"+line+"</p>\n");
     }
      
    });
}


/**execute different things depending on args*/
if (argv.version || argv.v){
   console.log(version);
}

if (argv.help || argv.h){
   console.log(help);//update hlep as you go<=====1
}

//when one or more file are provided, convert them to html
if(argv.input || argv.i){
   const source = (argv.input || argv.i)+"";
   if(source.slice(-4)==".txt"){//only 1 file
      txtReader(source);
   }
   else{//a directory
      fs.readdirSync(source).forEach(file => {
         txtReader(source+"/"+file);
       });
   }
}


//test only, please delete later<=====4
console.log(argv);
