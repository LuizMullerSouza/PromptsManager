// Seletores dos elementos HTML por ID
const elements = {
  promptTitle: document.getElementById("prompt-title"),
  promptContent: document.getElementById("prompt-content"),
  titleWrapper: document.getElementById("title-wrapper"),
  contentWrapper: document.getElementById("content-wrapper"),
}

// Atualiza o estado do wrapper conforme o conteúdo do elemento
function updateEditableWrapperState(element, wrapper) {
  if (!element || !wrapper) return
  if (element.textContent.trim() === "") {
    wrapper.classList.add("is-empty")
  } else {
    wrapper.classList.remove("is-empty")
  }
}

// Atualiza o estado de todos os campos editáveis
function updateAllEditableStates() {
  updateEditableWrapperState(elements.promptTitle, elements.titleWrapper)
  updateEditableWrapperState(elements.promptContent, elements.contentWrapper)
}

// Adiciona listeners de input para atualizar os wrappers em tempo real
function attachAllEditableHandlers() {
  elements.promptTitle.addEventListener("input", () => {
    updateEditableWrapperState(elements.promptTitle, elements.titleWrapper)
  })
  elements.promptContent.addEventListener("input", () => {
    updateEditableWrapperState(elements.promptContent, elements.contentWrapper)
  })
  // Atualiza estado inicial
  updateAllEditableStates()
}

// Função de inicialização
function init() {
  attachAllEditableHandlers()
}

// Executa a inicialização ao carregar o script
init()
