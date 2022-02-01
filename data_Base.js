const fs = require("fs");
class json_Data_Base{
    static open_File(path){
        let data = "";
        try {
            data = fs.readFileSync(path, 'utf8');
          } catch (err) {
            data = false;
          }
        return data
    }
    static write_File(path, data){
        fs.writeFileSync(path, data);
    }
    static append_To_File(path, data){
      let d = this.open_File(path);
      if (d){
        this.write_File(path, d+data);
      }
      else{
        this.write_File(path, data);
      }
    }
}

module.exports = json_Data_Base;