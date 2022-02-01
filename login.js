function login(){
    errors = []
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("password").value;
    if (mail.length < 3){
        errors.push("Az email címnek minimum 3 karakterből kell állnia");    
    }
    else if (password.length < 5){
        errors.push("A jelszónak minimum 5 karakterből kell állnia.");
    }
    if (!errors.length){
        req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.status == 200 && this.readyState == 4){
                console.log(this.responseText);
                json = JSON.parse(this.responseText);
                if (!json.error){
                    document.getElementById("error").style.color = "green";    
                }
                document.getElementById("error").innerHTML = json.message;
            }
        };
        data = JSON.stringify({mail: mail, password: password});
        console.log(data);
        req.open("POST", "LOGIN");
        req.send(data);
    }else{
        document.getElementById("error").innerHTML = errors[0];
    }
}