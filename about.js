function showCommandOutputs() {
  const commandOutputs = document.querySelectorAll(".command-output");
  for (let i = 0; i < commandOutputs.length; i++) {
    setTimeout(() => {
      commandOutputs[i].style.opacity = 1;
    }, i * 150);
  }
}

function writeCommand() {
  const commandPrompt = document.querySelector(".shell-prompt");
  let promptTextContent = commandPrompt.textContent;
  // const fullCommand = " ./skills.sh";
  const fullCommand = [" ./", "skills", ".sh"];

  for (let i = 0; i < fullCommand.length; i++) {
    setTimeout(() => {
      promptTextContent = promptTextContent + fullCommand[i];
      commandPrompt.textContent = promptTextContent;
    }, i * 100);
  }

  setTimeout(showCommandOutputs, 600);
}

setTimeout(writeCommand, 1500);
