import React, { useState, useEffect, useCallback } from 'react';
import { Bot, Mic, Send, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { speechAssistant } from '../services/speechAssistant';
import { sonificationEngine } from '../services/sonificationEngine';

export default function AIAssistantModal({
  isOpen,
  onClose,
  activeDataset,
  currentValue,
  cursorCoords,
  regionInfo,
  language,
  incomingQuery,
  onClearIncomingQuery,
  onExecuteAction
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastAnswer, setLastAnswer] = useState('');
  const isRu = Boolean(language && language.startsWith('ru'));

  const handleAskQuestion = useCallback((textToSend) => {
    const query = (textToSend ?? inputText).trim();
    if (!query) return;

    setInputText('');
    setLiveTranscript('');

    const context = {
      dataset: activeDataset,
      val: currentValue,
      lat: cursorCoords.lat,
      lon: cursorCoords.lon,
      regionInfo,
      timbre: sonificationEngine.timbre,
      scaleMode: sonificationEngine.scaleMode
    };

    const reply = speechAssistant.generateAnswer(query, context);
    setLastAnswer(reply);

    setMessages((prev) => [
      ...prev.slice(-6),
      { sender: 'user', text: query },
      { sender: 'bot', text: reply }
    ]);

    speechAssistant.speak(reply, true);
  }, [inputText, activeDataset, currentValue, cursorCoords, regionInfo]);

  useEffect(() => {
    setIsListening(speechAssistant.isListening);
    setIsSpeaking(speechAssistant.isSpeaking);

    const prevWakeCb = speechAssistant.onWakeStateChange;
    const prevSpeakCb = speechAssistant.onSpeakingStateChange;
    const prevTranscriptCb = speechAssistant.onTranscript;

    speechAssistant.onWakeStateChange = (state) => {
      setIsListening(state);
      if (prevWakeCb) prevWakeCb(state);
    };

    speechAssistant.onSpeakingStateChange = (speaking) => {
      setIsSpeaking(speaking);
      if (prevSpeakCb) prevSpeakCb(speaking);
    };

    speechAssistant.onTranscript = (text, isFinal) => {
      setLiveTranscript(text);
      if (prevTranscriptCb) prevTranscriptCb(text, isFinal);
    };

    return () => {
      speechAssistant.onWakeStateChange = prevWakeCb;
      speechAssistant.onSpeakingStateChange = prevSpeakCb;
      speechAssistant.onTranscript = prevTranscriptCb;
    };
  }, []);

  // When modal opens, enable direct question listening so user doesn't even have to repeat "Wally"
  useEffect(() => {
    if (isOpen) {
      speechAssistant.awaitingQuery = true;
    }
  }, [isOpen]);

  // Handle incoming queries triggered by voice
  useEffect(() => {
    if (incomingQuery && incomingQuery.trim()) {
      handleAskQuestion(incomingQuery);
      if (onClearIncomingQuery) onClearIncomingQuery();
    }
  }, [incomingQuery, handleAskQuestion, onClearIncomingQuery]);

  if (!isOpen) return null;

  const toggleListening = () => {
    speechAssistant.activateDirectQuestionMode();
    const promptMsg = 'Wall-E here! Listening! Ask me anything!';
    setLiveTranscript('🎙️ Speak now...');
    speechAssistant.speak(promptMsg, true, () => {
      speechAssistant.awaitingQuery = true;
    });
  };

  const quickPrompts = isRu
    ? [
        'Это данные NASA Earth Now #40509?',
        'Сколько всего карт?',
        'Все показатели в этой точке',
        'Как работает музыка Хромофонии?',
        'Где я сейчас?',
        'Покажи шлейф пыли PM2.5 в Сахаре'
      ]
    : [
        'Are these NASA Earth Now #40509 data?',
        'How many maps in total?',
        'Show all metrics here',
        'How does Chromophonia music work?',
        'Where am I now?',
        'Show Saharan dust PM2.5'
      ];

  return (
    <div
      role="region"
      aria-label={isRu ? 'Ассистент NASA Валли' : 'NASA Assistant Wally'}
      className="scientific-card"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '410px',
        maxWidth: 'calc(100vw - 40px)',
        zIndex: 60,
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.88)',
        border: '1.5px solid var(--cyan-nasa)',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#0B1220',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '0.65rem 0.95rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(15, 23, 42, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '6px',
            background: '#040812',
            border: '1px solid var(--cyan-nasa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cyan-nasa)'
          }}>
            <Bot size={17} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{isRu ? 'ИИ-Ассистент Валли' : 'Wally AI Assistant'}</span>
              <span style={{ fontSize: '0.62rem', background: 'rgba(0, 242, 254, 0.15)', color: 'var(--cyan-nasa)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                SVS #40509 Earth Now
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: isListening ? '#10B981' : 'var(--text-muted)' }}>
              {isSpeaking
                ? (isRu ? '🔊 Валли отвечает (покажите ✊ кулак чтобы замолчал)' : '🔊 Speaking (show ✊ fist to silence)')
                : isListening
                ? (isRu ? '🎙️ Слушает голос («Валли» или прямой вопрос)' : '🎙️ Listening for "Wally" or direct question')
                : (isRu ? 'Готов ответить на любой вопрос' : 'Ready to answer any question')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {isSpeaking && (
            <button
              onClick={() => speechAssistant.cancel()}
              title={isRu ? 'Остановить речь' : 'Stop speaking'}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #EF4444',
                color: '#FCA5A5',
                borderRadius: '5px',
                padding: '0.2rem 0.45rem',
                fontSize: '0.68rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <VolumeX size={12} />
              <span>{isRu ? 'Стоп' : 'Stop'}</span>
            </button>
          )}
          <button
            onClick={onClose}
            aria-label={isRu ? 'Закрыть панель' : 'Close panel'}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Answer & Conversation History Area */}
      <div style={{ padding: '0.75rem 0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '240px', overflowY: 'auto' }}>
        {liveTranscript && (
          <div style={{
            fontSize: '0.74rem',
            color: '#10B981',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px dashed rgba(16, 185, 129, 0.35)',
            borderRadius: '6px',
            padding: '0.35rem 0.6rem'
          }}>
            {liveTranscript}
          </div>
        )}

        {messages.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {messages.slice(-4).map((m, i) => (
              <div
                key={i}
                style={{
                  fontSize: '0.79rem',
                  lineHeight: '1.45',
                  padding: '0.5rem 0.7rem',
                  borderRadius: '7px',
                  background: m.sender === 'user' ? 'rgba(255,255,255,0.06)' : 'rgba(0, 242, 254, 0.09)',
                  border: m.sender === 'user' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0, 242, 254, 0.28)',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.66rem', fontWeight: 800, color: m.sender === 'user' ? '#9CA3AF' : 'var(--cyan-nasa)' }}>
                    {m.sender === 'user' ? (isRu ? 'ВЫ:' : 'YOU:') : (isRu ? 'ВАЛЛИ (NASA ИИ):' : 'WALLY (NASA AI):')}
                  </span>
                  {m.sender === 'bot' && (
                    <button
                      onClick={() => speechAssistant.speak(m.text, true)}
                      className="btn-scientific"
                      style={{ padding: '0.1rem 0.4rem', fontSize: '0.64rem' }}
                    >
                      <Volume2 size={10} />
                      <span>{isRu ? 'Озвучить' : 'Speak'}</span>
                    </button>
                  )}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
            {isRu
              ? 'Задайте любой вопрос текстом, нажмите на быстрый вопрос ниже или скажите вслух «Валли, ...» (например: «Это реальные данные NASA?», «Сколько карт?», «Где я?»).'
              : 'Type any question below, click a quick prompt, or say aloud "Wally, ..." (e.g. "Are these real-time NASA data?", "How many maps?", "Where am I?").'}
          </div>
        )}

        {/* Quick prompt suggestions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.32rem', marginTop: '0.2rem' }}>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(p)}
              style={{
                fontSize: '0.68rem',
                padding: '0.22rem 0.5rem',
                borderRadius: '5px',
                background: 'rgba(0, 242, 254, 0.07)',
                border: '1px solid rgba(0, 242, 254, 0.22)',
                color: 'var(--cyan-nasa)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        padding: '0.55rem 0.75rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}>
        <button
          onClick={toggleListening}
          className={`btn-scientific ${isListening ? 'btn-scientific-active' : ''}`}
          style={{
            padding: '0.45rem',
            borderRadius: '6px',
            width: '34px',
            height: '34px',
            flexShrink: 0
          }}
          title={isRu ? 'Нажмите и говорите вопрос' : 'Click and speak your question'}
        >
          <Mic size={15} color={isListening ? '#10B981' : 'var(--cyan-nasa)'} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
          placeholder={isRu ? 'Задайте вопрос Валли и нажмите Enter...' : 'Ask Wally anything and press Enter...'}
          style={{
            flex: 1,
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '6px',
            padding: '0.42rem 0.65rem',
            color: '#FFFFFF',
            fontSize: '0.78rem',
            outline: 'none'
          }}
        />

        <button
          onClick={() => handleAskQuestion()}
          className="btn-scientific btn-scientific-primary"
          style={{ padding: '0.42rem 0.7rem', fontSize: '0.78rem', flexShrink: 0 }}
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}
