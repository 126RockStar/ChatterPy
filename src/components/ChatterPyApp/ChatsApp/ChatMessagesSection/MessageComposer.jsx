// @flow
import * as React from 'react';
import {useState} from 'react';
import $ from 'jquery';

import ChatterPyContext from '../../ChatterPyContext';
import ChatterPyDispatch from '../../ChatterPyDispatch';
import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ChatService from '../../../../services/ChatService';
import TemplatePopup from './TemplatePopup';
import useMessageComposer from '../ChatMessagesSection/useMessageComposer';
import type {Contact, ConversationId} from '../../types';
import Picker, {SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';
import clsx from "clsx";
import styled from "styled-components"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type Props = {
    conversationId: ConversationId,
    onTogglePMComposer: () => void,
    recipient: Contact,
    nodeRef?: { current: ?HTMLDivElement },
};

export default function MessageComposer({
                                            conversationId,
                                            onTogglePMComposer,
                                            recipient,
                                            nodeRef,
                                        }: Props): React.Node {
    const globalState = React.useContext(ChatterPyContext);
    const globalDispatch = React.useContext(ChatterPyDispatch);
    const [showCalendarPopup, setShowCalendarPopup] = React.useState(false);
    const [messageContents, setMessageContents] = React.useState('');
    const [text, setText] = React.useState("");
    const [emojiFlag, setEmojiFlag] = React.useState(false)
    const [trackNum, setTrackNum] = React.useState(0)
    const [messageLength, setMessageLength] = React.useState(0)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(8)
    const [meridian, setMeridian] = useState("AM")
    const [flag, setFlag] = useState(false)
    useMessageComposer();

    const onMessageSubmit = () => {

        const {selectedPhoneNumber} = globalState;
        if (messageContents !== '' && selectedPhoneNumber) {
            ChatService.sendMessage(
                conversationId,
                selectedPhoneNumber.phoneNumber,
                recipient.phoneNumber,
                messageContents,
            ).then(msg => {
                globalDispatch({
                    type: 'MESSAGE_SEND',
                    message: msg,
                    recipientContactId: recipient.id,
                });
                setMessageContents('');
            });
        }
    };

    const onCalendarIconClick = (e) => {
        e.preventDefault();
        if (showCalendarPopup) {
            $('.js-popup-close').click();
        }
        setShowCalendarPopup(prev => !prev);
    };

    const onCalendarCloseIconClick = (e) => {
        e.preventDefault();
        setShowCalendarPopup(false);
    };
    const handleSmileClick = () => {
        setEmojiFlag(!emojiFlag)
    }
    const onEmojiClick = (event, emojiObject) => {
        setMessageContents(messageContents + emojiObject.emoji);
    };
    const onMessageChange = e => {
        setMessageContents(e.target.value)
    }
    const [file, setFile] = React.useState("");

    function handleUpload(event) {
      setFile(event.target.files[0]);

      // Add code here to upload file to server
      // ...
    }
    const deleteItem = async file => {
      setFile("")
    }
    const inputEl = React.useRef()
    const handleCameraClick = e => {
      inputEl.current.click();
    }
    return (
        <div className="chats__chat-utilities" ref={nodeRef}>
            <div className="chats__input-controls">
                <label htmlFor="field-message" className="hidden">
                    Type Message
                </label>
                <div className="chats__input-controls-inner" style={{position: 'relative'}}>
                    {/*<InputEmoji
            className="field field--big"
            value={messageContents}
            onChange={setMessageContents}
            cleanOnEnter
            onEnter={onMessageSubmit}
            placeholder="Type a message"
          />
*/}                  
                    {file && <ImageThumb image={file} onClick={deleteItem}/>}
                    <input
                        type="text"
                        className="field field--big"
                        value={messageContents}
                        placeholder="Type message"
                        onChange={onMessageChange}
                    />
                    <p className="hidden visible-xs-block">
                        {messageContents.length}<span>{Math.ceil(messageContents.length / 160)}/8</span>
                    </p>

                </div>

                <div
                    role="button"
                    className="btn btn--smallest btn--darkblue visible-xs-inline-block hidden"
                    onClick={onMessageSubmit}
                >
                    <span>Send Now</span>
                </div>
            </div>
            {/*<EmojiBoard />*/}
            <ul className="chats__icons">
                <li className="hidden-xs">
                    <p>
                        <span>{messageContents.length}</span>
                        <span>{Math.ceil(messageContents.length / 160)}/8</span>
                    </p>
                </li>

                <li style={{position: 'relative'}}>

                    <img
                        src={ChatterPyImages.Icons.smile}
                        alt=""
                        width="19"
                        height="19"
                        onClick={handleSmileClick}
                    />
                    {emojiFlag && (
                        <div style={{position: 'absolute', bottom: '30px', right: '10px'}}>
                            <Picker
                                onEmojiClick={onEmojiClick}
                                disableAutoFocus={true}
                                skinTone={SKIN_TONE_MEDIUM_DARK}
                                groupNames={{smileys_people: "PEOPLE"}}

                            />
                        </div>
                    )}

                </li>

                <li>
                     <input ref={inputEl} type="file" onChange={handleUpload} style={{display: 'none'}} />
                                            <img
                                                src={ChatterPyImages.Icons.camera}
                                                alt=""
                                                width="23"
                                                height="19"
                                                onClick={handleCameraClick}
                                            />
                   
                </li>

                <li>
                    <TemplatePopup/>
                </li>

                <li>
                    <div role="button" onClick={onTogglePMComposer}>
                        <img
                            src={ChatterPyImages.Icons.atSign}
                            alt=""
                            width="23"
                            height="23"
                        />
                    </div>
                </li>

                <li>
                    <div className={clsx("popup popup--calendar js-popup", {"is-active": showCalendarPopup})}>
                        <a
                            className="js-popup-trigger popup__trigger"
                            href="/#"
                            onClick={onCalendarIconClick}
                        >
                            <img
                                src={ChatterPyImages.Icons.later}
                                alt=""
                                width="25"
                                height="25"
                            />
                        </a>

                        <div className="popup__menu js-popup-menu">
                            <div className="popup__menu-head">
                                <a href="/#" className="popup__close js-popup-close" onClick={onCalendarCloseIconClick}>
                                    X
                                </a>

                                <p>Send this message later</p>
                            </div>

                            <div className="popup__menu-body">
                                <div className="popup__cols">
                                    <div className="popup__col popup__col--size1">
                                        <div className="js-datepicker-trigger"/>
                                    </div>

                                    <div className="popup__col popup__col--size2">
                                        <div className="form-date">
                                            <div className="form__head">
                                                <input
                                                    type="text"
                                                    className="popup__date js-datepicker-alt-field"
                                                />

                                                <p>at {hour}:{minute} {meridian}</p>
                                            </div>

                                            <div className="form__body">
                                                <div className="form__row">
                                                    <div className="form__cols">
                                                        <div className="form__col form__col--1of3">
                                                            <div className="select select--plain">
                                                                <select name="select-hours" id="select-hours"
                                                                        value={hour} onChange={event => {
                                                                    setHour(event.target.value)
                                                                }}>
                                                                    {Array(12).fill(1).map((item, index) => (
                                                                        <option key={index}
                                                                                value={item + index}>{item + index}</option>))}
                                                                </select>

                                                                <div className="select__delimiter">:</div>
                                                            </div>
                                                        </div>

                                                        <div className="form__col form__col--1of3">
                                                            <div className="select select--plain">
                                                                <select
                                                                    name="select-minutes"
                                                                    id="select-minutes"
                                                                    onChange={(event) => {
                                                                        setMinute(event.target.value)
                                                                    }}
                                                                    value={minute}
                                                                >
                                                                    {Array(12).fill(5).map((item, index) => (
                                                                        <option key={index}
                                                                                value={item * index}>{item * index < 10 ? `0${item * index}` : item * index}</option>))}

                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form__col form__col--1of3">
                                                            <div className="select select--plain">
                                                                <select name="select-period" id="select-period"
                                                                        value={meridian}
                                                                        onChange={event => setMeridian(event.target.value)}>
                                                                    <option value="AM">AM</option>

                                                                    <option value="PM">PM</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form__actions">
                                                <input
                                                    type="reset"
                                                    value="Cancel"
                                                    className="form__btn form__btn--plain"
                                                />

                                                <input
                                                    type="submit"
                                                    value="Save"
                                                    className="form__btn"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li className="hidden-xs">
                    <div
                        role="button"
                        className="btn btn--smallest-1 btn--darkblue"
                        onClick={onMessageSubmit}
                    >
                        <span>Send Now</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
const ImageThumb = ({ image, onClick }) => (
  <div style={{position: 'absolute', top: '-120px'}}>
  <UploadedItemWrapper>
        <PreviewImage src={URL.createObjectURL(image)} alt={image.name}/>
        <DeleteIconWrapper><DeleteForeverIcon onClick={onClick} color="secondary"/></DeleteIconWrapper>
        </UploadedItemWrapper>
  </div>
);
const UploadedItemWrapper = styled.div`
  font: 16px Arial, Helvetica, sans-serif;
  color: gray;
  height: 100px;
  width: 100px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  position: relative;
`
const PreviewImage = styled.img`
  float: left;
  padding: 3px;
  width: 90px;
  height: 90px;
  margin-right: 5px;
`
const DeleteIconWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 28px;
`