/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { forwardRef } from "react";
import "./Message.css";
import { Typography, Card, CardContent } from "@material-ui/core";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <div className="messageBox">
      <div ref={ref} className={`message ${isUser && "message__user"}`}>
        <div ref={ref} className="message__username">
          {!isUser && `${message.username || "Unknown User"}:`}
        </div>

        <Card className="message__card">
          <CardContent
            className={`message__cardContent ${
              isUser ? "message__userCard" : "message__guestCard"
            }`}
          >
            <Typography>{message.message}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default Message;
