import { useState } from 'react';
import styles from '../style';

function Question({ question, options, points, onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);

    const handleOptionSelect = (option, index) => {
        if (!isAnswered) {
            setSelectedOption(option);
            setIsAnswered(true);
            setEarnedPoints(points[index]);
            console.log(`Earned ${points[index]} points!`);
            
            onSelect(points[index]);
        }
    };

    const getOptionClass = (option) => {
        const baseClass = `w-full p-4 mb-3 rounded-xl text-left transition-all duration-300 font-poppins
            ${!isAnswered ? 'bg-[#6d6d6d] hover:bg-blue-gradient text-white cursor-pointer' : ''}
            ${isAnswered && option === selectedOption ? 'bg-[#304675] text-black' : ''} 
            ${isAnswered && option !== selectedOption ? 'bg-gray-800 text-gray-400' : ''}`;
        
        return baseClass;
    };

    return (
        <div className={`${styles.flexCenter} flex-col w-full max-w-[800px] mx-auto my-8`}>
            <div className="w-full bg-black-gradient-2 rounded-2xl p-8 mb-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-poppins font-semibold text-[24px] text-white leading-[1.2]">
                        {question}
                    </h2>
                </div>
                <div className="flex flex-col gap-4">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={getOptionClass(option)}
                            onClick={() => handleOptionSelect(option, index)}
                            disabled={isAnswered}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-poppins font-normal text-[16px] text-white">
                                    {option}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
                {isAnswered && (
                    <div className="mt-8 text-center">
                        <p className="font-poppins font-semibold text-gradient text-[18px]">
                            Answer recorded! +{earnedPoints} points ✅
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Question;
