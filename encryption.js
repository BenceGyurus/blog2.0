
const db = require("./data_Base.js");
const random_Encryption = require("./identity.js");
class encryption_Class{
static encryption(data, encryption_Code){
    let file = db.open_File(`${__dirname}/encryptions/${encryption_Code}.json`);
    let coded = "";
    if (file){
        let json = JSON.parse(file);
        for (let i = 0; i < data.length; i++){
            let w = false;
            for (let k = 0; k < json.encryption_Data.length; k++){
                if (data[i] == json.encryption_Data[k][0]){
                    coded += json.encryption_Data[k][1];
                    w = true;
                }
            }
            if (!w){
                coded = false;
                i = data.length
            }
        }
    }
    return coded;
}

static random_Chars_Code(){
    let AllChars = [];
    for (let i=32; i<127; i++){
        AllChars.push([String.fromCharCode(i), random_Encryption(20)]);
    }
    let code = Math.ceil(Math.random()*1000000000000000000)
    db.write_File(`${__dirname}/encryptions/${code}.json`, JSON.stringify({encryption_Data: AllChars}));
    return code;
}
}

module.exports = encryption_Class;