document.addEventListener("DOMContentLoaded", () => {
  // Captura dos elementos
  const form = document.querySelector("form");
  const numberInput = document.getElementById("number");
  const minInput = document.getElementById("to");
  const maxInput = document.getElementById("hasta");
  const noRepeatToggle = document.getElementById("toggle");
  const numberWrapper = document.querySelector(".number-wrapper");
  const formSection = document.querySelector(".form-section");
  const resultSection = document.querySelector(".results");
  const btnSortAgain = document.querySelectorAll(".gradient-wrapper .btn")[1];

  // Cria um box com o número
  const createBox = (number) => {
    const box = document.createElement("div");
    box.classList.add("box");

    const span = document.createElement("span");
    span.classList.add("number");
    span.textContent = number;

    box.appendChild(span);
    return box;
  };

  const generateRandomNumbers = (quantity, min, max, noRepeat) => {
    if (noRepeat) {
      const range = max - min + 1;
      if (quantity > range) {
        throw new Error("Quantidade maior que o intervalo disponível sem repetição.");
      }

      const numbers = Array.from({ length: range }, (_, i) => i + min);
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      return numbers.slice(0, quantity);
    } else {
      const result = [];
      for (let i = 0; i < quantity; i++) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        result.push(num);
      }
      return result;
    }
  };

  // Limpa os resultados exibidos
  const clearResults = () => {
    numberWrapper.innerHTML = "";
  };

  // Exibe os números gerados na tela com animação
  const displayResults = (numbers) => {
    clearResults();
    numbers.forEach((num, index) => {
      const box = createBox(num);
      box.style.animationDelay = `${index * 1.3}s`;
      numberWrapper.appendChild(box);
    });
  };

  // Validação dos inputs
  const validateInputs = (quantity, min, max, noRepeat) => {
    if (
      isNaN(quantity) || isNaN(min) || isNaN(max) ||
      quantity <= 0 || min > max ||
      (noRepeat && quantity > max - min + 1)
    ) {
      return false;
    }
    return true;
  };

  // Evento submit do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const quantity = parseInt(numberInput.value, 10);
    const min = parseInt(minInput.value, 10);
    const max = parseInt(maxInput.value, 10);
    const noRepeat = noRepeatToggle.checked;

    if (!validateInputs(quantity, min, max, noRepeat)) {
      alert("Verifique os valores inseridos.");
      return;
    }

    try {
      const numbers = generateRandomNumbers(quantity, min, max, noRepeat);
      displayResults(numbers);

      formSection.classList.add("disable");
      resultSection.classList.remove("disable");
    } catch (error) {
      alert(error.message);
    }
  });

  // Botão para gerar novamente os números
  btnSortAgain.addEventListener("click", () => {
    form.dispatchEvent(new Event("submit"));
  });
});
