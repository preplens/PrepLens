export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'draft' | 'published';
}

export interface SubjectQuestions {
  [key: string]: Question[];
}

export const questions: { [key: string]: SubjectQuestions } = {
  upsc: {
    gs1: [
      {
        id: 1,
        text: "Which of the following is NOT a feature of the Indian Constitution?",
        options: [
          "Federalism",
          "Parliamentary Democracy",
          "Absolute Monarchy",
          "Secularism"
        ],
        correctAnswer: 2,
        explanation: "The Indian Constitution establishes a parliamentary democracy, not an absolute monarchy.",
        difficulty: "easy",
        status: "published"
      },
      {
        id: 2,
        text: "The 'Doctrine of Basic Structure' was propounded by the Supreme Court in which case?",
        options: [
          "Kesavananda Bharati case",
          "Golaknath case",
          "Minerva Mills case",
          "S.R. Bommai case"
        ],
        correctAnswer: 0,
        explanation: "The Doctrine of Basic Structure was established in the Kesavananda Bharati case (1973).",
        difficulty: "medium",
        status: "published"
      },
      {
        id: 3,
        text: "Which of the following is NOT a fundamental right under the Indian Constitution?",
        options: [
          "Right to Equality",
          "Right to Property",
          "Right to Freedom",
          "Right against Exploitation"
        ],
        correctAnswer: 1,
        explanation: "Right to Property was removed from fundamental rights and made a legal right under Article 300A.",
        difficulty: "medium",
        status: "published"
      }
    ],
    gs2: [
      {
        id: 1,
        text: "Which of the following is NOT a function of the Election Commission of India?",
        options: [
          "Conducting elections",
          "Delimitation of constituencies",
          "Appointing the Prime Minister",
          "Registration of political parties"
        ],
        correctAnswer: 2,
        explanation: "The Election Commission does not appoint the Prime Minister. The Prime Minister is appointed by the President.",
        difficulty: "easy",
        status: "published"
      }
    ]
  },
  ssc: {
    quant: [
      {
        id: 1,
        text: "If 2x + 3y = 12 and 3x + 2y = 13, then find the value of x + y.",
        options: [
          "5",
          "6",
          "7",
          "8"
        ],
        correctAnswer: 0,
        explanation: "Solving the equations: 2x + 3y = 12 and 3x + 2y = 13, we get x = 3 and y = 2. Therefore, x + y = 5.",
        difficulty: "medium",
        status: "published"
      },
      {
        id: 2,
        text: "A train running at 60 km/h crosses a pole in 9 seconds. What is the length of the train?",
        options: [
          "150 meters",
          "180 meters",
          "200 meters",
          "250 meters"
        ],
        correctAnswer: 1,
        explanation: "Speed = 60 km/h = (60 * 1000) / 3600 m/s = 16.67 m/s. Length = Speed * Time = 16.67 * 9 = 150 meters.",
        difficulty: "hard",
        status: "published"
      }
    ],
    reasoning: [
      {
        id: 1,
        text: "In a certain code language, '256' means 'red sweet apple', '637' means 'eat sweet fruit' and '358' means 'eat red banana'. Which number represents 'red'?",
        options: [
          "2",
          "5",
          "6",
          "3"
        ],
        correctAnswer: 0,
        explanation: "By comparing the codes, we can see that '2' appears in both 'red sweet apple' and 'eat red banana', so '2' represents 'red'.",
        difficulty: "hard",
        status: "published"
      }
    ]
  },
  banking: {
    reasoning: [
      {
        id: 1,
        text: "In a row of 40 children, R is 11th from the right end and T is 31st from the left end. How many children are there between R and T?",
        options: [
          "0",
          "1",
          "2",
          "3"
        ],
        correctAnswer: 0,
        explanation: "R's position from left = 40 - 11 + 1 = 30. T is 31st from left. So there are no children between them.",
        difficulty: "medium",
        status: "published"
      }
    ],
    quant: [
      {
        id: 1,
        text: "A sum of money becomes Rs. 13,380 after 3 years and Rs. 20,070 after 6 years on compound interest. Find the sum.",
        options: [
          "Rs. 8,920",
          "Rs. 8,900",
          "Rs. 8,880",
          "Rs. 8,860"
        ],
        correctAnswer: 0,
        explanation: "Let the sum be P. Then, P(1 + r/100)³ = 13380 and P(1 + r/100)⁶ = 20070. Solving these equations, we get P = Rs. 8,920.",
        difficulty: "hard",
        status: "published"
      }
    ]
  }
}; 