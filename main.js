function get_Ajax(url, callback){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            callback(this.responseText);
        }
    }
}
function element_To_Conteiner(data){
    document.getElementById("conteiner").innerHTML = "data"
}

function get_Url(){
        get_Ajax(window.location.pathname, element_To_Conteiner);
    }