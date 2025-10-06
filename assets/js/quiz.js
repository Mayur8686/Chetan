// quiz.js
const quizQuestions = [
    {
        question: "What is the recommended maximum daily screen time for adults for recreational use?",
        options: [
            "1-2 hours",
            "3-4 hours", 
            "5-6 hours",
            "No specific limit"
        ],
        correct: 0,
        explanation: "Experts recommend limiting recreational screen time to 1-2 hours daily for adults."
    },
    {
        question: "Which of these is considered a positive use of mobile phones?",
        options: [
            "Online learning and educational apps",
            "Excessive social media scrolling",
            "Gaming for 6+ hours continuously",
            "Using phone while driving"
        ],
        correct: 0,
        explanation: "Online learning represents productive and educational use of mobile technology."
    },
    {
        question: "What percentage of smartphone users check their phone within 15 minutes of waking up?",
        options: [
            "25%",
            "50%",
            "75%", 
            "90%"
        ],
        correct: 2,
        explanation: "Studies show approximately 75% of smartphone users check their devices within 15 minutes of waking up."
    },
    {
        question: "Which health issue is NOT directly linked to excessive mobile phone use?",
        options: [
            "Digital eye strain",
            "Text neck syndrome",
            "Sleep disruption",
            "Common cold"
        ],
        correct: 3,
        explanation: "While mobile overuse affects eye health, posture, and sleep, it doesn't directly cause common cold."
    },
    {
        question: "What is 'phubbing' in the context of mobile phone usage?",
        options: [
            "Snubbing someone in favor of your phone",
            "Taking too many selfies",
            "Using phone in bathroom",
            "Phone addiction"
        ],
        correct: 0,
        explanation: "Phubbing refers to snubbing others by paying attention to your phone instead of engaging with them."
    }
];

let currentQuestion = 0;
let userAnswers = [];
let quizScore = 0;

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    updateProgress();
    updateNavigation();
}

function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    
    // Update visual selection
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    document.getElementById('progressText').textContent = 
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function updateNavigation() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitQuiz() {
    calculateScore();
    showResults();
}

function calculateScore() {
    quizScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            quizScore++;
        }
    });
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    document.getElementById('finalScore').textContent = quizScore;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    
    const percentage = (quizScore / quizQuestions.length) * 100;
    let message = '';
    
    if (percentage >= 80) {
        message = "Excellent! You have great knowledge about mobile usage habits.";
    } else if (percentage >= 60) {
        message = "Good job! You understand mobile usage well, but there's room for improvement.";
    } else {
        message = "Keep learning! Understanding mobile usage patterns can help improve your digital wellbeing.";
    }
    
    document.getElementById('scoreMessage').textContent = message;
    
    // Save progress
    saveQuizProgress();
}

function retakeQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    quizScore = 0;
    
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    loadQuestion();
}

function shareResults() {
    const shareText = `I scored ${quizScore}/${quizQuestions.length} on the Mobile Usage Quiz! Test your knowledge about healthy mobile habits.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mobile Usage Quiz Results',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard!');
        });
    }
}

function saveQuizProgress() {
    const progress = {
        score: quizScore,
        total: quizQuestions.length,
        percentage: (quizScore / quizQuestions.length) * 100,
        date: new Date().toISOString(),
        answers: userAnswers
    };
    
    localStorage.setItem('quizProgress', JSON.stringify(progress));
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
});