function generate_Code(number_Of_Chars){
    let code = "";
    let all_Chars = [];
    for (let i=32; i<127; i++){
        all_Chars.push(String.fromCharCode(i));
    }
    min = 0;
    max = (127-32)-1;
    for (let i = 0; i < number_Of_Chars; i++){
        code += all_Chars[Math.floor(Math.random()*(max-min))+min];
    }
    return code;
}

module.exports = generate_Code;