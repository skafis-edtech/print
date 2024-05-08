document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "Įvardinkite \\(a\\), \\(b\\) ir \\(c\\) reikšmes, kai \\( f(x) = x^2 + 2x + 3 \\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(b\\)", value: 2 },
        { label: "\\(c\\)", value: 3 },
      ],
      answers: [[1, 2, 3]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(b\\) ir \\(c\\) reikšmes, kai \\( f(x) = -x^2 - 2x \\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(b\\)", value: 2 },
        { label: "\\(c\\)", value: 3 },
      ],
      answers: [[-1, -2, 0]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(b\\) ir \\(c\\) reikšmes, kai \\( f(x) = x^2 - 2 \\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(b\\)", value: 2 },
        { label: "\\(c\\)", value: 3 },
      ],
      answers: [[1, 0, -2]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_1\\) ir \\(x_2\\) reikšmes, kai \\( f(x) = 2(x-2)(x-1)\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_1\\)", value: 2 },
        { label: "\\(x_2\\) ", value: 3 },
      ],
      answers: [
        [2, 2, 1],
        [2, 1, 2],
      ],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_1\\) ir \\(x_2\\) reikšmes, kai \\( f(x) = (x-2)(x+1)\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_1\\)", value: 2 },
        { label: "\\(x_2\\) ", value: 3 },
      ],
      answers: [
        [1, 2, -1],
        [1, -1, 2],
      ],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_1\\) ir \\(x_2\\) reikšmes, kai \\( f(x) = -(x-2)^2\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_1\\)", value: 2 },
        { label: "\\(x_2\\) ", value: 3 },
      ],
      answers: [
        [-1, 2, 2],
        [-1, 2, 2],
      ],
      type: "input",
    },
    {
      question:
        "Įvarkindite \\(a\\), \\(x_1\\) ir \\(x_2\\) reikšmes, kai \\( f(x) = (x-0)(x+4)\\)",
      options: [
        { label: "\\(a\\)a", value: 1 },
        { label: "\\(x_1\\)", value: 2 },
        { label: "\\(x_2\\) ", value: 3 },
      ],
      answers: [
        [1, 0, -4],
        [1, -4, 0],
      ],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_1\\) ir \\(x_2\\) reikšmes, kai \\( f(x) = x(x+4)\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_1\\)", value: 2 },
        { label: "\\(x_2\\) ", value: 3 },
      ],
      answers: [
        [1, 0, -4],
        [1, -4, 0],
      ],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_0\\) ir \\(y_0\\) reikšmes, kai \\( f(x) = -2(x-4)^2 + 5\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_0\\)", value: 2 },
        { label: "\\(y_0\\) ", value: 3 },
      ],
      answers: [[-2, 4, 5]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_0\\) ir \\(y_0\\) reikšmes, kai \\( f(x) = (x+2)^2 - 5\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_0\\)", value: 2 },
        { label: "\\(y_0\\) ", value: 3 },
      ],
      answers: [[1, -2, -5]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_0\\) ir \\(y_0\\) reikšmes, kai \\( f(x) = -(x-1)^2\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_0\\)", value: 2 },
        { label: "\\(y_0\\) ", value: 3 },
      ],
      answers: [[-1, 1, 0]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_0\\) ir \\(y_0\\) reikšmes, kai \\( f(x) = (x-0)^2 + 1\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_0\\)", value: 2 },
        { label: "\\(y_0\\) ", value: 3 },
      ],
      answers: [[1, 0, 1]],
      type: "input",
    },
    {
      question:
        "Įvardinkite \\(a\\), \\(x_0\\) ir \\(y_0\\) reikšmes, kai \\( f(x) = x^2 + 1\\)",
      options: [
        { label: "\\(a\\)", value: 1 },
        { label: "\\(x_0\\)", value: 2 },
        { label: "\\(y_0\\) ", value: 3 },
      ],
      answers: [[1, 0, 1]],
      type: "input",
    },
    {
      question:
        "Kaip eis parabolės šakos, kai \\( f(x) = -\\frac{1}{2}x^2 - 2 \\)?",
      options: ["Aukštyn (U forma)", "Žemyn (∩ forma)"],
      answer: 1,
      type: "choice",
    },
    {
      question:
        "Kaip eis parabolės šakos, kai \\( f(x) = \\frac{5}{16}x^2 - 23x + 7 \\)?",
      options: ["Aukštyn (U forma)", "Žemyn (∩ forma)"],
      answer: 0,
      type: "choice",
    },
  ];

  function createQuestionElement(question, index) {
    const div = document.createElement("div");
    div.className = "question";

    let content = `<h3>${question.question}</h3>`;

    if (question.type === "input") {
      content += question.options
        .map(
          (opt) => `
            <label>${opt.label} = <input type="number" name="question${index}_${opt.label}"></label>
        `
        )
        .join("");
    } else {
      content += question.options
        .map(
          (option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}"> ${option}
                </label>
            `
        )
        .join("");
    }

    content += `<button class="btn">Patikrinti atsakymą</button>
                <span class="feedback"></span>`;

    div.innerHTML = content;

    const btn = div.querySelector(".btn");
    btn.addEventListener("click", function () {
      checkAnswer(index, btn, question.type);
    });

    return div;
  }

  function checkAnswer(questionIndex, button, type) {
    const feedback = button.nextElementSibling;

    if (type === "input") {
      const inputs = document.querySelectorAll(
        `input[name^="question${questionIndex}_"]`
      );
      const userValues = Array.from(inputs).map((input) =>
        parseInt(input.value)
      );

      const isCorrect = questions[questionIndex].answers.some(
        (answerSet) => JSON.stringify(userValues) === JSON.stringify(answerSet)
      );

      feedback.textContent = isCorrect ? "Teisingai!" : "Neteisingai!";
      feedback.className = "feedback " + (isCorrect ? "correct" : "incorrect");
    } else {
      const selected = document.querySelector(
        `input[name="question${questionIndex}"]:checked`
      );
      if (selected) {
        const isCorrect = questions[questionIndex].answer == selected.value;
        feedback.textContent = isCorrect ? "Teisingai!" : "Neteisingai!";
        feedback.className =
          "feedback " + (isCorrect ? "correct" : "incorrect");
      } else {
        feedback.textContent = "Pasirinkite atsakymą.";
        feedback.className = "feedback";
      }
    }
  }

  function updateMathJax() {
    MathJax.typesetPromise()
      .then(() => {
        console.log("MathJax updated!");
      })
      .catch((err) => console.log(err.message));
  }

  const description = document.querySelector(".description");
  description.innerHTML = `      <h1>Kvadratinės funkcijos formulės</h1>
  <p>Šis puslapis skirtas perprasti tris kvadratinės funkcijos formules:</p>
  <ul>
    <li>
      <p>standartinę (angl. standard form)</p>
      <p>\\(f(x) = ax^2 + bx + c\\)</p>
    </li>
    <li>
      <p>išskaidytą (angl. fatorized form)</p>
      <p>\\(f(x) = a(x-x_1)(x-x_2)\\)</p>
    </li>
    <li>
      <p>viršūnės (angl. vertex form).</p>
      <p>\\(f(x) = a(x-x_0)^2 + y_0\\)</p>
    </li>
  </ul>
  <p>Čia:</p>
  <ul>
    <li>
      \\(a\\) yra koeficientas, kuris nusako parabolės formą (jei \\(a>0\\),
      parabolės šakos eina aukštyn (U forma), jei \\(a < 0\\), parabolės
      šakos eina žemyn (∩ forma), kuo didesnė absoliuti a reikšmė, tuo šakos
      yra siauresnės),
    </li>
    <li>
      \\(x_1\\) ir \\(x_2\\) yra funkcijos nuliai (x, kur funkcija kerta Ox
      ašį),
    </li>
    <li>\\((x_0; y_0)\\) yra parabolės viršūnės koordinatės.</li>
  </ul>
  <p>
    Pasitikrinti, kaip atrodo grafikai, galite čia:
    <a href="https://desmos.com/calculator">desmos.com/calculator</a>
  </p>
  <p>
    Kam įdomu, ar norit prisidėti prie tinklapio kodo rašymo, kodas patalpintas čia:
    <a href="https://github.com/naglissul/math-test-maker">github.com/naglissul/math-test-maker</a>
  </p>`;
  const container = document.querySelector(".container");
  questions.forEach((question, index) => {
    container.appendChild(createQuestionElement(question, index));
  });
});
