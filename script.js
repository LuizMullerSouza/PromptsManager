// Chave para identificação dos dados no localStorage
const STORAGE_KEY = "prompts_storage"

// Estado para carregar dados do localStorage
const state = {
  prompts: [],
  selectedId: null,
}

// Seletores dos elementos HTML por ID
const elements = {
  promptTitle: document.getElementById("prompt-title"),
  promptContent: document.getElementById("prompt-content"),
  titleWrapper: document.getElementById("title-wrapper"),
  contentWrapper: document.getElementById("content-wrapper"),
  btnOpen: document.getElementById("btn-open"),
  btnCollapse: document.getElementById("btn-collapse"),
  sidebar: document.querySelector(".sidebar"),
  btnSave: document.getElementById("btn-save"),
}

// Atualiza o estado do wrapper conforme o conteúdo do elemento
function updateEditableWrapperState(element, wrapper) {
  const hasText = element.textContent.trim().length > 0
  wrapper.classList.toggle("is-empty", !hasText)
}

// Função para abrir a sidebar
function openSidebar() {
  elements.sidebar.style.display = "flex"
  elements.btnOpen.style.display = "none"
}

// Função para fechar a sidebar
function closeSidebar() {
  elements.sidebar.style.display = "none"
  elements.btnOpen.style.display = "block"
}

// Atualiza o estado de todos os elementos editáveis
function updateAllEditableStates() {
  updateEditableWrapperState(elements.promptTitle, elements.titleWrapper)
  updateEditableWrapperState(elements.promptContent, elements.contentWrapper)
}

// Adiciona listeners de input para atualizar os wrappers em tempo real
function attachAllEditableHandlers() {
  elements.promptTitle.addEventListener("input", function () {
    updateEditableWrapperState(elements.promptTitle, elements.titleWrapper)
  })
  elements.promptContent.addEventListener("input", function () {
    updateEditableWrapperState(elements.promptContent, elements.contentWrapper)
  })
}

// Função para salvar os dados
function save() {
  const title = elements.promptTitle.textContent.trim()
  const content = elements.promptContent.innerHTML.trim()
  const hasContent = elements.promptContent.textContent.trim()

  if (!title || !hasContent) {
    alert(
      "Por favor, preencha tanto o título quanto o conteúdo do prompt antes de salvar."
    )
    return
  }

  if (state.selectedId) {
    // Editar prompt existente
  } else {
    // Criar novo prompt
    const newPrompt = {
      id: Date.now().toString(36),
      title,
      content,
    }

    state.prompts.unshift(newPrompt)
    state.selectedId = newPrompt.id
  }

  persist()
}

// Função para persistir o estado no localStorage
function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prompts))
    alert("Prompt salvo com sucesso!")
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error)
  }
}

// Eventos dos botões
elements.btnSave.addEventListener("click", save)

// Inicialização
function init() {
  attachAllEditableHandlers()
  updateAllEditableStates()

  // Estado inicial da sidebar
  elements.sidebar.style.display = ""
  elements.btnOpen.style.display = "none"

  // Event listeners para abrir ou fechar a sidebar
  elements.btnOpen.addEventListener("click", openSidebar)
  elements.btnCollapse.addEventListener("click", closeSidebar)
}

// Executa a inicialização ao carregar o script
init()
