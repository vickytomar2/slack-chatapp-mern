import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import db from "./firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("a660dc43184081bbe319", {
  cluster: "ap2",
});

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  const getConvo = () => {
    axios.get(`/get/conversation?id=${roomId}`).then((res) => {
      console.log(res);
      setRoomDetails(res.data[0].channelName);
      setRoomMessages(res.data[0].conversation);
    });
  };

  useEffect(() => {
    if (roomId) {
      // db.collection("rooms")
      //   .doc(roomId)
      //   .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));

      // db.collection("rooms")
      //   .doc(roomId)
      //   .collection("messages")
      //   .orderBy("timestamp", "asc")
      //   .onSnapshot((snapshot) =>
      //     setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      //   );
      getConvo();

      const channel = pusher.subscribe("conversation");
      channel.bind("newMessage", function (data) {
        getConvo();
      });
    }
  }, [roomId]);

  //console.log(roomMessages);
  //console.log(roomDetails);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails} </strong>
          </h4>
          <StarBorderIcon />
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoIcon />
            Details
          </p>
        </div>
      </div>

      <div className="chat__messages">
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>

      <ChatInput channelName={roomDetails} channelId={roomId} />
    </div>
  );
}

export default Chat;
