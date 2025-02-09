import { Button, Flex, Tabs } from "antd";
import React, { useState } from "react";
import CreateRoomForm from "./components/create-room";
import JoinRoomForm from "./components/join-room/JoinRoomForm";

const App = () => {

  const createRoomTab = {
    label: "Create Room",
    key: "1",
    children: <CreateRoomForm/>,
  };

  const joinRoomTab = {
    label: "Join Room",
    key: "2",
    children: <JoinRoomForm/>,
  }

  return (
  <div>
    <Flex style={{
      width: "400px",
    }}>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ marginBottom: 32 }}
        items={[createRoomTab, joinRoomTab]}
      />
    </Flex>
  </div>
  );
};

export default App;
