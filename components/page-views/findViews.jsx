
import data from "../../public/data.json"

 export default function findViews(path){

    for(var x in data.data){
      
      if(data.data[x].dimensions && data.data[x].dimensions[0].name.indexOf(path.toString())!=-1) return data.data[x].metrics[0];
    }
    
    return "Not Found";
    
  }