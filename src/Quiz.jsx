import { useState } from "react";
import styles from "./style";
import { Navbar, Question } from "./components";

const Quiz = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const totalQuestions = 5;

  const questions = [
    {
      question: "Does your password have 10 or more characters (which include a diverse array of characters)",
      options: [
        "Yes",
        "No"
      ],
      points: [
        10,
        0
      ]
    },
    {
      question: "Do you use two-factor authentication?",
      options: [
        "Yes",
        "No"
      ],
      points: [
        10,
        0
      ]
    },
    {
      question: "Do you have a VPN and/or malware checker?",
      options: [
        "Yes",
        "No"
      ],
      points: [
        10,
        0
      ]
    },
    {
      question: "Do you have a secure email provider like Gmail and account recovery options?",
      options: [
        "Yes",
        "No"
      ],
      points: [
        10,
        0
      ]
    },
    {
      question: "Do you click on attachments in emails?",
      options: [
        "Yes",
        "No"
      ],
      points: [
        0,
        10
      ]
    }
  ];

  const handleSelect = (selectedPoints) => {
    setTotalPoints((prev) => prev + selectedPoints);
    setQuestionsAnswered((prev) => prev + 1);
  };

  return (
    <div className={`bg-primary`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="w-full max-w-[800px] mx-auto mt-4 mb-8">
            <h1 className="text-4xl font-bold text-white mb-5 text-center" >Financial Quiz</h1>
            <div className="bg-black-gradient-2 rounded-xl p-4 flex justify-between items-center">
              <span className="font-poppins text-dimWhite text-[16px]">
                Score: {totalPoints} points
              </span>
              <span className="font-poppins text-dimWhite text-[16px]">
                Questions: {questionsAnswered}/{totalQuestions}
              </span>
            </div>
          </div>
          <br/>


          {questions.map((q, index) => (
            <Question 
              key={index}
              question={q.question}
              options={q.options}
              points={q.points}
              onSelect={handleSelect}  
            />
          ))}

          {questionsAnswered === totalQuestions && (
            <div className="w-full max-w-[800px] mx-auto my-8 text-center">
              <div className="bg-black-gradient-2 rounded-xl p-8">
                <h2 className="font-poppins font-bold text-[32px] text-gradient mb-4">
                  Quiz Complete!
                </h2>
                <p className="font-poppins text-white text-[20px] mb-2">
                  Final Score: {totalPoints} points
                </p>
                <p className="font-poppins text-dimWhite text-[18px]">
                  {totalPoints === 50 && "Perfect score!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
