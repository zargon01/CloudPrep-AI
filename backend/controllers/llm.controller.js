import axios from 'axios';

export const generateQuestions = async (req, res) => {
  try {
    const { mode, count = 5, topic = 'AWS Cloud Practitioner' } = req.body;

    // Construct a prompt for the LLM
    const prompt = `
Generate ${count} multiple-choice questions on the topic of ${topic} for AWS Cloud Practitioner certification.
Each question should have:
- A clear question
- 4 options (A, B, C, D)
- The correct answer indicated clearly

Format the output as a JSON array like this:
[
  {
    "question": "What does AWS stand for?",
    "options": {
      "A": "Amazon Web Services",
      "B": "Advanced Web Solutions",
      "C": "Applied Web Security",
      "D": "Automated Web Storage"
    },
    "answer": "A"
  },
  ...
]
`;

    // Call Groq API (update to your LLM's specific API schema)
    const response = await axios.post(
      'https://api.groq.com/v1/chat/completions',
      {
        model: 'llama3-70b-8192', // or any available model
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = response.data.choices[0].message.content;

    // Parse LLM response to JSON
    let questions;
    try {
      questions = JSON.parse(raw);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse questions from LLM response' });
    }

    res.status(200).json({ questions });

  } catch (error) {
    console.error('LLM Error:', error.message);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
};
