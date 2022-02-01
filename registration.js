function element_Error(message){
    document.getElementById("error").innerHTML = message[0];
}

function registraion(){
    let errors = [];
    list = ["first_Name", "last_Name", "mail", "password", "re_Password"];
    datas = []
    for (let i = 0; i < list.length; i++){
        d = document.getElementById(list[i]).value;
        if (d.length < 3){
            errors.push("Minden mezőnek legalább 3 karaketből kell állnia!");
        }
        datas.push(d);
    }
    if (datas[3] != datas[4]){
        errors.push("Nem egyezik a két jelszó!");
    }
    console.log(errors);
    if (errors.length){
        document.getElementById("error").innerHTML = errors[0];
    }else{
        req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.status == 200 && this.readyState == 4){
                data = JSON.parse(this.responseText);
                if (!data.message){
                    element_Error(data.errors)
                }
                else{
                    document.getElementById("error").innerHTML = data.message;
                    document.getElementById("error").style.color = "green";
                }
            }
        }
        req.open("POST", "REGISTRAION");
        data = JSON.stringify({
            first_Name: datas[0],
            last_Name : datas[1],
            mail: datas[2],
            password: datas[3]
        });
        req.send(data)
    }
}
