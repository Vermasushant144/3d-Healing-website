export interface EmotionData {
  id: string;
  emotionName: string;
  description: string;
  keywords: string[];
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
  relatedArticle: {
    title: string;
    description: string;
  };
}

export const emotions: EmotionData[] = [
  {
    id: "fear",
    emotionName: "Fear",
    description: "When you feel scared about future or outcomes",
    keywords: ["fear", "scared", "afraid", "anxious", "terrified", "panic", "worried"],
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
    youtubeVideoUrl: "https://www.youtube.com/embed/sO3JbO73NfQ",
    relatedArticle: {
      title: "Overcoming Fear Through Detachment",
      description: "Learn how the concept of Nishkama Karma can free you from the invisible chains of fear and anxiety."
    }
  },
  {
    id: "anger",
    emotionName: "Anger",
    description: "When expectations are not met and frustration boils over",
    keywords: ["anger", "angry", "mad", "frustrated", "furious", "irritated", "annoyed", "rage"],
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
    youtubeVideoUrl: "https://www.youtube.com/embed/cILR24DJ0UE",
    relatedArticle: {
      title: "The Anatomy of Anger in the Gita",
      description: "A deep dive into how our desires and attachments mutate into anger when obstructed, and how to break this chain."
    }
  },
  {
    id: "overthinking",
    emotionName: "Overthinking",
    description: "When your mind creates problems that don't exist",
    keywords: ["overthinking", "confused", "lost", "doubt", "overwhelmed", "stressed", "scattered", "chaotic"],
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
    youtubeVideoUrl: "https://www.youtube.com/embed/rV8i_d9YJ8Y",
    relatedArticle: {
      title: "Taming the Restless Mind",
      description: "Practical steps from Chapter 6 of the Gita to anchor a chaotic and overthinking mind back to stillness."
    }
  },
  {
    id: "sadness",
    emotionName: "Sadness",
    description: "When you feel low, lonely, heartbroken, or depressed",
    keywords: ["sad", "sadness", "depressed", "lonely", "heartbroken", "crying", "hopeless", "broken", "grief", "sorrow"],
    gitaShlok: {
      chapter: 2,
      verse: 14,
      sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
      transliteration: "mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ\nāgamāpāyino ’nityās tāns titikṣhasva bhārata",
      meaningSimple: "O son of Kunti, the nonpermanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons.",
      deepExplanation: "Just as seasons come and go, moments of sadness and joy are temporary. You are not your feelings. You are the eternal observer of these feelings. Endure this emotional winter knowing that spring is inevitably on its way."
    },
    healingSteps: [
      "Allow yourself to feel the sadness without resistance.",
      "Remember that this is a passing phase, like a cloud in the sky.",
      "Do one small act of self-care today (e.g., drink water, take a walk).",
      "Surrender your pain to a higher power or the universe."
    ],
    reflectionPrompt: "What is this feeling of sadness trying to teach me about what I value most?",
    youtubeVideoUrl: "https://www.youtube.com/embed/y_G12z8N13w",
    relatedArticle: {
      title: "Finding Light in Darkness",
      description: "How the Gita teaches us to maintain equilibrium during the inevitable emotional winters of our lives."
    }
  },
  {
    id: "motivation_loss",
    emotionName: "Loss of Motivation",
    description: "When you feel stuck, lazy, or lacking purpose",
    keywords: ["lazy", "stuck", "procrastinating", "no motivation", "tired", "giving up", "lost purpose", "unmotivated"],
    gitaShlok: {
      chapter: 3,
      verse: 8,
      sanskrit: "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।\nशरीरयात्रापि च ते न प्रसिद्ध्येद् अकर्मणः॥",
      transliteration: "niyataṁ kuru karma tvaṁ karma jyāyo hyakarmaṇaḥ\nśharīra-yātrāpi cha te na prasiddhyed akarmaṇaḥ",
      meaningSimple: "Perform your prescribed duty, for doing so is better than not working. One cannot even maintain one's physical body without work.",
      deepExplanation: "Inertia or Tamas is a heavy energy that pulls us down. The Gita urges us to rise from inaction into action. Don't wait for motivation to strike; take the smallest disciplined action, and the energy will follow."
    },
    healingSteps: [
      "Do not look at the mountain of tasks; just look at the next single step.",
      "Perform one small task right now for just 5 minutes.",
      "Remind yourself of your deeper 'Why' and purpose.",
      "Treat action itself as an offering, regardless of how you feel."
    ],
    reflectionPrompt: "What is one tiny action I can take right now that requires almost no effort?",
    youtubeVideoUrl: "https://www.youtube.com/embed/kYJ0hT9w_yY",
    relatedArticle: {
      title: "The Cure for Inaction",
      description: "Rising from Tamas (inertia) to Rajas (action) through the power of Karma Yoga."
    }
  }
];

export function findEmotionByKeyword(input: string): EmotionData {
  const normalized = input.toLowerCase();
  for (const emotion of emotions) {
    for (const keyword of emotion.keywords) {
      if (normalized.includes(keyword)) {
        return emotion;
      }
    }
  }
  // Default to overthinking/confusion if no exact matches found
  return emotions.find(e => e.id === "overthinking") || emotions[0];
}
