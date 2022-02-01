const http = require('http');
const fs = require("fs")
const sort_Function = require('./file_Sorter.js');
const Functions = require("./functions.js");
const encryption = require("./encryption.js");
const identity = require("./identity.js");
const db = require("./data_Base.js");

function mail_Encryption(mail){
    let code = db.open_File(`${__dirname}/mail.json`);
    console.log(code)
    if (!code){
        let code = encryption.random_Chars_Code();
        db.write_File(`${__dirname}/mail.json`, JSON.stringify({code: code}));
    }
    else{
        code = JSON.parse(code).code
        console.log(code);
    }
    let coded = encryption.encryption(mail,code);
    console.log(coded);
    return coded;
}
function send_Data(res, data, header, status){
    res.setHeader("Content-Type", header);
    res.writeHead(status);
    res.end(data);
}
function get_Method(res, url){
    path = sort_Function(url);
    console.log(path);
    data = Functions.open_Data(path);
    if (!data){
        status = 404
        data = Functions.open_Data("/error.html");
        path = "error.html";
    }
    else{
        status = 200;
    }
    send_Data(res, data , Functions.get_Header(path), status);
}

function generate_Token(){
    
}

function login(res, data){          //Bejelentkezés
    data = JSON.parse(data);
    coded_Mail = mail_Encryption(data.mail);
    file_Data = db.open_File(`${__dirname}/all_Users/all_Users.json`);
    error = false;
    message = [];
    if (file_Data){
        folder_Name = "";
        file_Data = JSON.parse(file_Data);
        for (let i = 0; i < file_Data.users.length; i++){
            if (coded_Mail == file_Data.users[i].mail){
                folder_Name = file_Data.users[i].f_n;
            }
        }
        console.log(`${__dirname}/all_Users/${folder_Name}/user_Datas.json`);
        user_Data = db.open_File(`${__dirname}/all_Users/${folder_Name}/user_Datas.json`);
        user_Data = JSON.parse(user_Data);
        encryption_Code = user_Data.code;
        coded_Password = encryption.encryption(data.password, encryption_Code);
        console.log(user_Data.password, coded_Password);
        if (user_Data.password == coded_Password){
            message = "Sikeres bejelentkezés"
        }
        else{
            error = true;
            message = "Helytelen jelszó";
        }
    }
    else{
        error = true;
        message = "Ez az email cím nem található";
    }
    let to_Send = JSON.stringify({
        error: error,
        message: message    
    });
    send_Data(res, to_Send, Functions.get_Header("x.json"),200);
}

function registration(res, data){           //Regisztráció
    data = JSON.parse(data);
    data.id = identity(100);
    code = encryption.random_Chars_Code()
    data.password = encryption.encryption(data.password, code);
    data.code = code;
    let users = db.open_File(`${__dirname}/all_Users/all_Users.json`);
    let folder_Name = Math.floor(Math.random()*(999999999999-1000000000))+1000000000;
    data.folder_Name = folder_Name;
    coded_Mail =  mail_Encryption(data.mail);
    let append = {mail: coded_Mail, f_n: folder_Name}; 
    let errors = [];
    let message = ";";
    if (!users){
        console.log(`${__dirname}/all_Users/all_Users.json`);
        db.write_File(`${__dirname}/all_Users/all_Users.json`, JSON.stringify({users : [append]}));
        message = "Sikeres regisztráció!";
        fs.mkdirSync(`${__dirname}/all_Users/${folder_Name}`);
        db.write_File(`${__dirname}/all_Users/${folder_Name}/user_Datas.json`, JSON.stringify(data));
    }else{
        users = JSON.parse(users);
        let u = users.users;
        for (let i = 0; i < u.length; i++){
            if (u[i].mail == coded_Mail){
                errors.push("Ezzel az email címmel már van létrehozva fiók!");
                message = false;
            }
        }
        if (!errors.length){
            users.users.push(append);
            db.write_File(`${__dirname}/all_Users/all_Users.json`, JSON.stringify(users));
            message = "Sikeres regisztráció!";
            fs.mkdirSync(`${__dirname}/all_Users/${folder_Name}`);
            db.write_File(`${__dirname}/all_Users/${folder_Name}/user_Datas.json`, JSON.stringify(data));
        }
    }
    let to_Send = JSON.stringify({
        message: message,
        errors: errors
    })
    send_Data(res, to_Send, Functions.get_Header("x.json"), 200);
}

function post_Method(res, url, data){
    list = [["/LOGIN", login], ["/REGISTRAION", registration]];
    for (let i = 0; i < list.length; i++){
        if (url == list[i][0]){
            list[i][1](res, data);
        }
    }
}
const requestListener = function (req, res) {
    url = req.url;
    method = req.method
    date = new Date();
    log = `[${date}]\t${url}\t${method}\t${req.connection.remoteAddress}\n`;
    db.append_To_File(`${__dirname}/log.txt` , log)
    method == "GET" ? get_Method(res, url) : "";
    if (method == "POST"){
        var body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });
        req.on('end', function () {
            post_Method(res, url, body);
        });
    } 
    
}

const server = http.createServer(requestListener);
server.listen(8080);