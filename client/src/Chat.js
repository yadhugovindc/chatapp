import React, { useEffect, useState } from "react";

function Chat({socket,username,room}){
  const [currentMessage,setCurrentMessage] = useState("");
  
  const sendMessage = async () =>{
    if (currentMessage !== ""){
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message",messageData);
    }
  };
  useEffect(() =>{
    socket.on("recieve_message",(data) =>{
        console.log(data);
    }) 
  },[socket]);
  return (
    <div>
      <div className="chat-header"> </div>
      <div className="chat-body"></div>
      <br />
      <div className="chat-footer">
        <input type="text" placeholder="hey.." />
        <button onClick={sendMessage}>&rarr;</button>
      </div>
    </div>
  );
}

export default Chat;