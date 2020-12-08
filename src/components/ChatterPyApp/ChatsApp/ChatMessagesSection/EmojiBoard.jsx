import React, { useState } from "react";
import ReactDOM from "react-dom";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default function EmojiBoard(): React.Element <'div'> {
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [message, SetMessage] = useState("");


    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
        <Picker
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={emoji => SetMessage(message + emoji.native)}
        />
    );
        function triggerPicker(event) {
            event.preventDefault();
            SetEmojiPicker(!emojiPickerState);
        }
  }


    return ({emojiPicker})
}
