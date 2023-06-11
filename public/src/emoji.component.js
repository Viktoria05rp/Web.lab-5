import { useEffect, useRef, useState } from "react";
import like from './images/like.png';
import selectedLike from './images/like_selected.png';

const Emoji = ({ sendEmoji }) => {
 const [selected, setSelected] = useState(false);

 const positiveLike = useRef();
 const negativeLike = useRef();

 const send = (message, status, ref) => {
  if (selected) {
   return;
  }
  sendEmoji();
  setSelected(true);
  ref.current.src = selectedLike;
 };

 return (
  <div className="emojis">
   <div>
    <img
     ref={positiveLike}
     src={like}
     onClick={() => send(message, 'like', positiveLike)} />
    <div>{!message.likes ? 0 : message.likes.positive}</div>
   </div>
   <div>
    <img
     ref={negativeLike}
     src={like}
     className="dislike"
     onClick={() => sendEmoji(message, 'dislike', negativeLike)} />
    <div>{!message.likes ? 0 : message.likes.negative}</div>
   </div>
  </div>
 );
};

export default Emoji;