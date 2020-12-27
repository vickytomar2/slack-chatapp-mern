import React from "react";
import { useHistory } from "react-router-dom";
import "./SidebarOptions.css";
import db from "./firebase";
import axios from "./axios";

function SidebarOptions({ Icon, title, id, addChannelOption }) {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt("Please enter name of the channel");

    if (channelName) {
      // db.collection("rooms").add({
      //   name: channelName,
      // });
      axios.post("/new/channel", {
        channelName: channelName,
      });
    }
  };

  return (
    <div
      className="sidebarOptions"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOptions__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOptions__channel">
          <span className="sidebarOptions__hash">#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOptions;
