const Functions = require("./functions")
function split(data, con){
    e = "";
    array = [];
    for (let i = 0; i < data.length; i++){
        if (data[i] == con){
            array.push(e);e = "";
        }else{e += data[i]}
    }
    array.push(e);
    console.log(array);
    return array;
}
function sort(file_Name){
    n = file_Name.split("?")[file_Name.split("?").length-1];
    file_Names = Functions.open_Data("/jsons/open_It.json");
    file_Name = JSON.parse(file_Names);
    let path = "";
    n == "/" ? path = n  : path = `${split(n, "/")[split(n, "/").length-1]}`;
    console.log(path)
    if (split(path, ".").length < 2){
        for (let i = 0; i < file_Name.data.length; i++){
            if (file_Name.data[i][0] == path){
                path = file_Name.data[i][1];
            }
        }
    }
    else{
        path = `/${path}`;
        console.log(path, "path");
    }
    return path;
}

module.exports = sort;