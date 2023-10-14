import axios from "axios";

let apiUrl = "http://localhost:5036/api/message/all";

export async function getConversations(email){
    if(email!==undefined){
        const url = `${apiUrl}?sender=${email}`;
        try{
            const res = await axios(url);
            if(res.status===200){
                const users = [];
                for(const el in res.data){
                    const sender = el.split('+')[0];
                    const receiver = el.split('+')[1];
                    users.push({sender,receiver,messageText:res.data[el]});
                }
                return users;
            }
        }catch(e){
            console.log(e);
        }
    }
    return [];
}