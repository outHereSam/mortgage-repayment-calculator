const form = document.getElementById("mortgageForm");
const formData = {};
const calculateBtn = document.getElementById("calculate");
const clearBtn = document.querySelector(".clear-form");

const inputs = form.querySelectorAll("input");

calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (input.type === "radio") {
      if (input.checked) {
        formData["mortgageType"] = input.value;
      }
    } else {
      formData[input.name] = input.value;
    }
  });

  if (formData["mortgageType"] === "repayment") {
    calcMonthlyRepayment(
      formData["amount"],
      formData["rate"],
      formData["term"]
    );
  } else if (formData["mortgageType"] === "interest-only") {
    // calcMonthlyInterestOnly();
  }
});

const calcMonthlyRepayment = (mortgageAmount, interestRate, mortgageTerm) => {
  const rate = calcMonthlyInterestRate(interestRate);
  const numPayments = calcNumberOfPayments(mortgageTerm);

  return (
    (mortgageAmount * interestRate * (1 + rate) ** numPayments) /
    ((1 + rate) ** numPayments - 1)
  );
};

const calcMonthlyInterestRate = (interestRate) => {
  return Number(interestRate) / 100 / 12;
};

const calcNumberOfPayments = (mortgageTerm) => {
  return Number(mortgageTerm) * 12;
};

clearBtn.addEventListener("click", () => {
  form.reset();
});
