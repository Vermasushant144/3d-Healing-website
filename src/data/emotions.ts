export interface EmotionData {
  id: string;
  emotionName: string;
  description: string;
  gitaShlok: {
    chapter: number;
    verse: number;
    sanskrit: string;
    transliteration: string;
    meaningSimple: string;
    deepExplanation: string;
  };
  healingSteps: string[];
  reflectionPrompt: string;
  youtubeVideoUrl: string;
  relatedArticle: string;
}

export const emotions: EmotionData[] = [
  {
    id: "fear",
    emotionName: "Fear",
    description: "When you feel scared about future or outcomes",
    gitaShlok: {
      chapter: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakaramaṇi",
      meaningSimple: "You have the right to work only, but never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
      deepExplanation: "Fear usually stems from our attachment to a specific outcome. When we detach ourselves from the result and focus entirely on our present action, fear dissolves. The Gita teaches us to live in the 'now' and do our duty without anxiety about the future."
    },
    healingSteps: [
      "Acknowledge the fear without judging it.",
      "Identify the worst-case scenario and realize it's often an illusion.",
      "Bring your focus back to what you can control right now.",
      "Take one small, practical step forward."
    ],
    reflectionPrompt: "What exact future outcome am I afraid of? Is it completely in my control?",
    youtubeVideoUrl: "https://www.youtube.com/embed/1_t9GgHlXo0", // Placeholder
    relatedArticle: "Overcoming Fear Through Detachment"
  },
  {
    id: "anger",
    emotionName: "Anger",
    description: "When expectations are not met and frustration boils over",
    gitaShlok: {
      chapter: 2,
      verse: 62,
      sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥",
      transliteration: "dhyāyato viṣhayān puṁsaḥ saṅgas teṣhūpajāyate\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho ’bhijāyate",
      meaningSimple: "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
      deepExplanation: "Anger is the secondary emotion of unfulfilled desire or unmet expectations. If we want peace, we must observe our expectations. True control isn't suppressing anger, but understanding its roots in our attachments."
    },
    healingSteps: [
      "Take 5 deep breaths before reacting.",
      "Ask yourself: 'What expectation of mine was just broken?'",
      "Realize that outer events do not dictate your inner peace.",
      "Respond consciously rather than reacting impulsively."
    ],
    reflectionPrompt: "What unmet desire or expectation triggered this anger?",
    youtubeVideoUrl: "https://www.youtube.com/embed/2_t9GgHlXo0", // Placeholder
    relatedArticle: "The Anatomy of Anger in the Gita"
  },
  {
    id: "overthinking",
    emotionName: "Overthinking",
    description: "When your mind creates problems that don't exist",
    gitaShlok: {
      chapter: 6,
      verse: 34,
      sanskrit: "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम्।\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम्॥",
      transliteration: "chañchalaṁ hi manaḥ kṛiṣhṇa pramāthi balavad dṛiḍham\ntasyāhaṁ nigrahaṁ manye vāyor iva su-duṣhkaram",
      meaningSimple: "The mind is restless, turbulent, obstinate and very strong, O Krishna, and to subdue it, I think, is more difficult than controlling the wind.",
      deepExplanation: "Overthinking is the natural state of an untrained mind. Krishna explains that the mind can be a powerful enemy or a strong ally. Bringing it back to the present moment through continued practice (Abhyasa) and detachment (Vairagya) tames the mind."
    },
    healingSteps: [
      "Label your thoughts as 'just thoughts' rather than facts.",
      "Do a quick grounding exercise: list 3 things you can see, hear, and feel.",
      "Let go of the need to have everything figured out right now.",
      "Focus your energy onto an immediate physical task."
    ],
    reflectionPrompt: "Are my current thoughts helping me solve a problem, or just exhausting me?",
    youtubeVideoUrl: "https://www.youtube.com/embed/3_t9GgHlXo0", // Placeholder
    relatedArticle: "Taming the Restless Mind"
  }
];
