const fs = require("fs");
class Functions{
    static get_Header(file_Name){
        let extension = file_Name.split(".")[file_Name.split(".").length-1];
        let h = "";
        if (extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "jpeg"){
            h = "image";
        }
        else if (extension == "json"){
            h = "appliaction";
        }
        else{
            h = "text";
        }
        return `${h}/${extension}`;
    }
    static open_Data(path){
        let data = false;
        try {
            data = fs.readFileSync(`${__dirname}${path}`, 'utf8')
          } catch (err) {
          }
        return data
    }
}

module.exports = Functions;