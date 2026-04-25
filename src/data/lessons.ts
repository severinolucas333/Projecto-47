import { Lesson } from '../types';

export const LESSON_UNITS = [
  {
    id: 1,
    title: "Vogais Básicas",
    description: "Aprendendo as vogais orais fundamentais do francês.",
    lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 2,
    title: "Vogais Nasais",
    description: "O som característico do francês.",
    lessons: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  // ... more units to reach 120 lessons
];

export const ALL_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "A Vogal /a/",
    description: "Palavras simples com o som /a/.",
    type: "vowel",
    theory: "O som /a/ em francês é muito similar ao português em 'casa'. Exemplos: *chat*, *papa*, *sac*.",
    exercises: [
      { word: "chat", transcription: "/ʃa/", hint: "Gato" },
      { word: "papa", transcription: "/papa/", hint: "Pai" },
      { word: "sac", transcription: "/sak/", hint: "Saco/Mochila" },
      { word: "ami", transcription: "/ami/", hint: "Amigo" }
    ]
  },
  {
    id: 2,
    title: "A Vogal /i/",
    description: "Explorando o som fechado /i/.",
    type: "vowel",
    theory: "O som /i/ é sempre agudo e tenso. Exemplos: *vie*, *lit*, *midi*.",
    exercises: [
      { word: "vie", transcription: "/vi/", hint: "Vida" },
      { word: "lit", transcription: "/li/", hint: "Cama" },
      { word: "midi", transcription: "/midi/", hint: "Meio-dia" },
      { word: "isole", transcription: "/izɔle/", hint: "Isolado" }
    ]
  },
  {
    id: 3,
    title: "A Vogal /y/",
    description: "O som 'u' francês.",
    type: "vowel",
    theory: "O som /y/ é produzido com a língua na posição de /i/ mas lábios arredondados como /u/. Exemplos: *tu*, *rue*, *bus*.",
    exercises: [
      { word: "tu", transcription: "/ty/", hint: "Tu" },
      { word: "rue", transcription: "/ry/", hint: "Rua" },
      { word: "bus", transcription: "/bys/", hint: "Ônibus" },
      { word: "salut", transcription: "/saly/", hint: "Oi/Tchau" }
    ]
  }
  // I will programmatically generate a placeholder for the rest to reach 120
];

// Helper to fill up 120 lessons for demo/structure
for (let i = 4; i <= 120; i++) {
  ALL_LESSONS.push({
    id: i,
    title: `Lição ${i}`,
    description: `Conteúdo da lição ${i}`,
    type: "mixed",
    theory: `Teoria para a lição ${i}...`,
    exercises: [
      { word: "exemple", transcription: "/ɛɡzɑ̃pl/", hint: "Exemplo" }
    ]
  });
}
