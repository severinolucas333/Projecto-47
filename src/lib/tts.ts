export const speakFrench = (text: string) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
};
