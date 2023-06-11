import './style.css';
import EventSourceChat from './event-source';
import LongPollingChat from './long-polling';
import WebSocketChat from './web-socket';

const App = () => {

  return (
    // <LongPollingChat />
    // <EventSourceChat />
    <WebSocketChat />
  );
};

export default App;
