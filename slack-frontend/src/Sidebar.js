import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import EditIcon from "@material-ui/icons/Edit";
import SidebarOptions from "./SidebarOptions";
import MessageIcon from "@material-ui/icons/Message";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/People";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("a660dc43184081bbe319", {
  cluster: "ap2",
});

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

  const getChannelList = () => {
    axios.get("/get/channelList").then((res) => {
      setChannels(res.data);
    });
  };

  useEffect(() => {
    // db.collection("rooms").onSnapshot((snapshot) =>
    //   setChannels(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       name: doc.data().name,
    //     }))
    //   )
    // );
    getChannelList();

    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannelList();
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Programming Master</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <EditIcon />
      </div>
      <SidebarOptions Icon={MessageIcon} title="Threads" />
      <SidebarOptions Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOptions Icon={DraftsIcon} title="Saved Items" />
      <SidebarOptions Icon={BookmarkBorderIcon} title="Channel browsers" />
      <SidebarOptions Icon={PeopleIcon} title="People & Groups" />
      <SidebarOptions Icon={AppsIcon} title="Apps" />
      <SidebarOptions Icon={FileCopyIcon} title="File browser" />
      <SidebarOptions Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SidebarOptions Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOptions Icon={AddIcon} addChannelOption title="Add Channel" />

      {channels.map((channel) => (
        <SidebarOptions title={channel.name} id={channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
