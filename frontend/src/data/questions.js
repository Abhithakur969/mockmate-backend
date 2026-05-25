export const ROLES = [
  {
    id: "frontend",
    label: "Frontend Developer",
    icon: "⬡",
    tech: "React · CSS · JS · Browser APIs",
  },
  {
    id: "backend",
    label: "Backend Developer",
    icon: "⬢",
    tech: "Node · REST · Databases · Auth",
  },
  {
    id: "fullstack",
    label: "Full Stack Developer",
    icon: "◈",
    tech: "MVC · CORS · SSR · System Design",
  },
  {
    id: "data",
    label: "Data / ML Engineer",
    icon: "◇",
    tech: "Python · ML · NumPy · Evaluation",
  },
  {
    id: "qa",
    label: "QA Engineer",
    icon: "◻",
    tech: "Testing · Bugs · Selenium · Cypress",
  },
];

export const QUESTIONS = {
  "Frontend Developer": [
    {
      id: "fe1",
      question:
        "What is the difference between `let`, `const`, and `var` in JavaScript?",
      hint: "Think about scope, hoisting, and reassignment rules.",
    },
    {
      id: "fe2",
      question: "Explain what the Virtual DOM is and why React uses it.",
      hint: "Compare it to the real DOM and discuss performance.",
    },
    {
      id: "fe3",
      question: "What is CSS Flexbox and when would you use it over CSS Grid?",
      hint: "Think about 1D vs 2D layout use cases.",
    },
    {
      id: "fe4",
      question: "What are React hooks? Name three hooks and explain each.",
      hint: "Start with useState, useEffect, and one more.",
    },
    {
      id: "fe5",
      question:
        "What happens step-by-step when you type a URL and press Enter?",
      hint: "Cover DNS, TCP, HTTP request, and browser rendering.",
    },
  ],
  "Backend Developer": [
    {
      id: "be1",
      question: "What is a REST API? Explain its key principles.",
      hint: "Think statelessness, uniform interface, HTTP methods.",
    },
    {
      id: "be2",
      question: "SQL vs NoSQL — differences and when to choose each?",
      hint: "Talk structure, scalability, real use cases for each.",
    },
    {
      id: "be3",
      question: "What is middleware in Express.js? Give a practical example.",
      hint: "Think about how requests flow through an Express app.",
    },
    {
      id: "be4",
      question: "What is JWT and how does it work for authentication?",
      hint: "Explain the 3 parts of a JWT and how the server verifies.",
    },
    {
      id: "be5",
      question: "What is the difference between async/await and Promises?",
      hint: "Focus on syntax readability and error handling.",
    },
  ],
  "Full Stack Developer": [
    {
      id: "fs1",
      question: "Explain the MVC pattern with a real-world example.",
      hint: "Use a blog or e-commerce site to walk through each layer.",
    },
    {
      id: "fs2",
      question:
        "What is CORS, why does it exist, and how do you fix a CORS error?",
      hint: "Explain browser security model and the server-side fix.",
    },
    {
      id: "fs3",
      question: "What is the difference between SSR and CSR?",
      hint: "Think SEO, performance, and first contentful paint.",
    },
    {
      id: "fs4",
      question: "How would you design a URL shortener like bit.ly?",
      hint: "Consider data model, redirect logic, storage.",
    },
    {
      id: "fs5",
      question: "What is an API rate limit and why should you implement one?",
      hint: "Think abuse prevention, cost control, fairness.",
    },
  ],
  "Data / ML Engineer": [
    {
      id: "da1",
      question:
        "What is the difference between supervised and unsupervised ML?",
      hint: "Give one algorithm example for each type.",
    },
    {
      id: "da2",
      question: "Explain overfitting — how do you detect and fix it?",
      hint: "Cover train/test split, regularization, or dropout.",
    },
    {
      id: "da3",
      question: "What is a confusion matrix and what metrics come from it?",
      hint: "Explain precision, recall, and F1 score.",
    },
    {
      id: "da4",
      question: "What is the difference between a Python list and NumPy array?",
      hint: "Focus on performance, vectorized ops, memory.",
    },
    {
      id: "da5",
      question:
        "How do you handle missing values in a dataset before training?",
      hint: "Name at least two strategies and when to use each.",
    },
  ],
  "QA Engineer": [
    {
      id: "qa1",
      question:
        "What is the difference between functional and non-functional testing?",
      hint: "Give an example of each from a real app.",
    },
    {
      id: "qa2",
      question: "Explain black-box, white-box, and grey-box testing.",
      hint: "Focus on what information the tester has in each.",
    },
    {
      id: "qa3",
      question: "What is regression testing and why is it critical in agile?",
      hint: "Think about frequent code pushes and breakage risk.",
    },
    {
      id: "qa4",
      question: "What makes a well-written bug report? Describe each section.",
      hint: "Steps to reproduce, expected vs actual, severity, environment.",
    },
    {
      id: "qa5",
      question:
        "Selenium vs Cypress — when would you choose one over the other?",
      hint: "Think speed, language support, browser compatibility.",
    },
  ],
};

export function getRandomQuestion(role, excludeId = null) {
  const pool = (QUESTIONS[role] || []).filter((q) => q.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}
