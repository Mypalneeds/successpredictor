const questions = [
    { question: "What is your current employment status?", options: ["Employed", "Self-employed", "Unemployed", "Student"], weights: [10, 8, 2, 5] },
    { question: "How often do you save money from your income?", options: ["Every month", "Occasionally", "Rarely", "Never"], weights: [10, 7, 4, 1] },
    { question: "What is your highest level of education?", options: ["Primary School", "Secondary School", "University Degree", "Postgraduate Degree"], weights: [3, 5, 8, 10] },
    { question: "How many income streams do you have?", options: ["One", "Two", "More than two", "None"], weights: [4, 7, 10, 1] },
    { question: "How do you rate your financial literacy?", options: ["Excellent", "Good", "Average", "Poor"], weights: [10, 7, 5, 2] },
    { question: "What is your current age?", options: ["18-25", "26-35", "36-45", "46+"], weights: [7, 10, 8, 5] },
    { question: "Do you have any debts?", options: ["No", "Yes, but manageable", "Yes, and struggling"], weights: [10, 5, 1] },
    { question: "How often do you invest in your personal development?", options: ["Regularly", "Occasionally", "Rarely", "Never"], weights: [10, 7, 4, 1] },
    { question: "Do you have a financial plan?", options: ["Yes, detailed", "Yes, basic", "No"], weights: [10, 5, 1] },
    { question: "How do you handle financial risks?", options: ["Carefully", "Moderately", "Recklessly", "Avoid"], weights: [10, 7, 2, 1] },
    { question: "How many dependents do you have?", options: ["None", "1-2", "3-4", "5+"], weights: [10, 8, 5, 2] },
    { question: "What is your monthly income range?", options: ["Less than 50k", "50k-100k", "100k-200k", "200k+"], weights: [2, 5, 8, 10] },
    { question: "How satisfied are you with your current job?", options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"], weights: [10, 7, 4, 1] },
    { question: "Do you own any assets (e.g., house, car)?", options: ["Yes, multiple", "Yes, one", "No"], weights: [10, 7, 1] },
    { question: "Do you have health insurance?", options: ["Yes", "No"], weights: [10, 1] },
    { question: "Do you have a retirement plan?", options: ["Yes", "No"], weights: [10, 1] },
    { question: "How often do you budget your expenses?", options: ["Regularly", "Occasionally", "Rarely", "Never"], weights: [10, 7, 4, 1] },
    { question: "Do you have an emergency fund?", options: ["Yes", "No"], weights: [10, 1] },
    { question: "How often do you review your financial goals?", options: ["Regularly", "Occasionally", "Rarely", "Never"], weights: [10, 7, 4, 1] },
    { question: "Do you have any investments?", options: ["Yes, diversified", "Yes, but not diversified", "No"], weights: [10, 5, 1] }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';
    showQuestion();
    updateProgressBar();
}

function showQuestion() {
    const form = document.getElementById('quizForm');
    const questionData = questions[currentQuestionIndex];
    form.innerHTML = `<h3>${questionData.question}</h3>`;
    questionData.options.forEach((option, index) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = `option${index}`;
        radio.name = 'option';
        radio.value = index;
        form.appendChild(radio);

        const label = document.createElement('label');
        label.htmlFor = `option${index}`;
        label.textContent = option;
        form.appendChild(label);

        form.appendChild(document.createElement('br'));
    });
}

function submitQuiz() {
    const form = document.getElementById('quizForm');
    const selectedOption = form.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        alert('Please select an option');
        return;
    }

    const weight = questions[currentQuestionIndex].weights[selectedOption.value];
    score += weight;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        updateProgressBar();
        showQuestion();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('resultsPage').style.display = 'block';

    const resultText = document.getElementById('resultText');
    resultText.textContent = `Your predicted success rate is ${score}/200. ${score >= 100 ? 'You are likely to be successful!' : 'You may need to restructure your life.'}`;

    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Success Rate', 'Improvement Needed'],
            datasets: [{
                data: [score, 200 - score],
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        },
        options: {
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    const educationalResources = document.getElementById('educationalResources');
    educationalResources.innerHTML = `
        <h3>Resources to Improve Your Score</h3>
        <ul>
            <li><a href="https://www.investopedia.com/best-resources-for-improving-financial-literacy-5091689">Financial Planning</a></li>
            <li><a href="https://www.investopedia.com/articles/basics/11/3-s-simple-investing.asp">Investing Basics</a></li>
            <li><a href="https://www.investopedia.com/articles/investing/100615/10-ways-effectively-save-future.asp">Saving Strategies</a></li>
        </ul>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('resultsPage').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
    updateProgressBar();
}

function shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?text=I scored ${score}/200 on the Success Predictor! Find out your score:`;
    window.open(url, '_blank');
}

function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=https://example.com`;
    window.open(url, '_blank');
}

function shareOnWhatsApp() {
    const url = `https://api.whatsapp.com/send?text=I scored ${score}/200 on the Success Predictor! Find out your score: https://example.com`;
    window.open(url, '_blank');
}

function backToHome() {
    document.getElementById('supportPage').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
}
