/**
 * MatchCV - Enhanced Dashboard JavaScript
 * Advanced functionality with filters, preview, and tooltips
 */

// ========== Data Management ==========
const cvs = [
  {
    id: 1,
    name: "Software Engineer Resume",
    category: "IT",
    modified: "1 day ago",
    status: "Analyzed",
    score: 82,
    content: "Experienced software engineer with 5+ years in full-stack development...",
  },
  {
    id: 2,
    name: "Marketing Specialist Resume",
    category: "Marketing",
    modified: "2 days ago",
    status: "Submitted",
    score: 75,
    content: "Creative marketing professional with expertise in digital campaigns...",
  },
  {
    id: 3,
    name: "Data Analyst Resume",
    category: "Data",
    modified: "2 days ago",
    status: "Draft",
    score: 0,
    content: "Data-driven analyst skilled in SQL, Python, and Tableau...",
  },
  {
    id: 4,
    name: "Product Manager CV",
    category: "Product",
    modified: "5 days ago",
    status: "Analyzed",
    score: 88,
    content: "Strategic product manager with B2B and B2C product experience...",
  },
  {
    id: 5,
    name: "Frontend Developer Resume",
    category: "IT",
    modified: "1 week ago",
    status: "Activating",
    score: 79,
    content: "Frontend specialist with React, Vue, and Angular expertise...",
  },
  {
    id: 6,
    name: "UX Designer Resume",
    category: "Design",
    modified: "2 weeks ago",
    status: "Draft",
    score: 0,
    content: "User experience designer with 3+ years in digital products...",
  },
]

const topSkills = ["React", "Node.js", "SQL", "Python", "UX Design"]
let searchTerm = ""

const categoryEmojis = {
  IT: "⚙️",
  Marketing: "📊",
  Data: "📈",
  Product: "🎯",
  Design: "🎨",
}

// ========== Initialize ==========
document.addEventListener("DOMContentLoaded", async () => {
  loadTopbar()
  loadSidebar()
  loadHeader()
  renderCVTable()
  renderInsights()
  setupEventListeners()
})

// ========== Load Components ==========
function loadTopbar() {
  const topbar = document.getElementById("topbar")
  fetch("partials/topbar.html")
    .then((res) => res.text())
    .then((html) => {
      topbar.innerHTML = html
      setupTooltips()
    })
    .catch((err) => console.error("Error loading topbar:", err))
}
function loadSidebar() {
  const sidebar = document.getElementById("sidebar")
  fetch("partials/sidebar.html")
    .then((res) => res.text())
    .then((html) => {
      sidebar.innerHTML = html
      setupTooltips()
    })
    .catch((err) => console.error("Error loading sidebar:", err))
}

function loadHeader() {
  const header = document.getElementById("header")
  fetch("partials/header.html")
    .then((res) => res.text())
    .then((html) => {
      header.innerHTML = html
      setupEventListeners()
      setupTooltips()
    })
    .catch((err) => console.error("Error loading header:", err))
}

// ========== Render CV Table with Filters ==========
function renderCVTable() {
  const tbody = document.getElementById("cvTableBody")
  const statusFilter = "" // filters removed per new mock layout
  const categoryFilter = ""
  const scoreFilter = ""

  if (!tbody) return

  tbody.innerHTML = ""

  const filtered = cvs.filter((cv) => {
    if (statusFilter && cv.status !== statusFilter) return false
    if (categoryFilter && cv.category !== categoryFilter) return false
    if (scoreFilter) {
      const [min, max] = scoreFilter.split("-").map(Number)
      if (cv.score < min || cv.score > max) return false
    }
    if (searchTerm && !cv.name.toLowerCase().includes(searchTerm)) return false
    return true
  })

  if (filtered.length === 0) {
    document.querySelector(".table-card table").style.display = "none"
    document.getElementById("emptyState").style.display = "block"
    return
  }

  document.querySelector(".table-card table").style.display = "table"
  document.getElementById("emptyState").style.display = "none"

  filtered.forEach((cv) => {
    tbody.appendChild(createCVRow(cv))
  })
}

// ========== Create CV Table Row ==========
function createCVRow(cv) {
  const tr = document.createElement("tr")

  // CV Name with Avatar
  const nameCell = document.createElement("td")
  nameCell.innerHTML = `
        <div class="cv-name-cell">
            <div class="cv-avatar">${categoryEmojis[cv.category] || "📄"}</div>
            <span class="cv-name">${cv.name}</span>
        </div>
    `
  tr.appendChild(nameCell)

  // Last Modified
  const modifiedCell = document.createElement("td")
  modifiedCell.textContent = cv.modified
  modifiedCell.style.color = "var(--text-secondary)"
  tr.appendChild(modifiedCell)

  // Status
  const statusCell = document.createElement("td")
  const statusBadge = document.createElement("span")
  statusBadge.className = `status-badge status-${cv.status.toLowerCase()}`
  statusBadge.textContent = cv.status
  statusCell.appendChild(statusBadge)
  tr.appendChild(statusCell)

  // AI Score
  const scoreCell = document.createElement("td")
  const scoreDisplay = document.createElement("div")
  scoreDisplay.className = "score-display"
  scoreDisplay.textContent = cv.score > 0 ? `${cv.score}%` : "—"
  scoreCell.appendChild(scoreDisplay)
  tr.appendChild(scoreCell)

  // Actions
  const actionsCell = document.createElement("td")
  const actionsDiv = document.createElement("div")
  actionsDiv.className = "action-buttons"

  const previewBtn = document.createElement("button")
  previewBtn.className = "action-btn"
  previewBtn.textContent = "👁️"
  previewBtn.title = "Preview CV"
  previewBtn.setAttribute("data-tooltip", "Preview CV")
  previewBtn.onclick = () => previewCV(cv)
  actionsDiv.appendChild(previewBtn)

  const analyzeBtn = document.createElement("button")
  analyzeBtn.className = "action-btn"
  analyzeBtn.textContent = "⚙️"
  analyzeBtn.title = "Analyze CV"
  analyzeBtn.setAttribute("data-tooltip", "Analyze with AI")
  analyzeBtn.onclick = () => analyzeCV(cv)
  actionsDiv.appendChild(analyzeBtn)

  const rewriteBtn = document.createElement("button")
  rewriteBtn.className = "action-btn"
  rewriteBtn.textContent = "✏️"
  rewriteBtn.title = "AI Rewrite"
  rewriteBtn.setAttribute("data-tooltip", "Rewrite with AI")
  rewriteBtn.onclick = () => rewriteCV(cv)
  actionsDiv.appendChild(rewriteBtn)

  const exportBtn = document.createElement("button")
  exportBtn.className = "action-btn"
  exportBtn.textContent = "📥"
  exportBtn.title = "Export CV"
  exportBtn.setAttribute("data-tooltip", "Export CV")
  exportBtn.onclick = () => exportCV(cv)
  actionsDiv.appendChild(exportBtn)

  // Chevron visual cue inside actions
  const chevronSpan = document.createElement("span")
  chevronSpan.className = "row-chevron"
  chevronSpan.textContent = "›"
  actionsDiv.appendChild(chevronSpan)

  actionsCell.appendChild(actionsDiv)
  tr.appendChild(actionsCell)

  return tr
}

// ========== Preview CV ==========
function previewCV(cv) {
  const modal = document.getElementById("previewModal")
  const previewContent = document.getElementById("previewContent")
  document.getElementById("previewTitle").textContent = `Preview: ${cv.name}`

  previewContent.innerHTML = `
        <div style="white-space: pre-line;">
            <h3 style="color: var(--text-primary); margin-bottom: 12px;">${cv.name}</h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                ${cv.content}
            </p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                <strong>Status:</strong> ${cv.status}<br>
                <strong>Category:</strong> ${cv.category}<br>
                <strong>Score:</strong> ${cv.score > 0 ? cv.score + "%" : "Not analyzed yet"}
            </div>
        </div>
    `

  modal.classList.add("show")
}

function closePreviewModal() {
  document.getElementById("previewModal").classList.remove("show")
}

// ========== Render Insights ==========
function renderInsights() {
  const scores = cvs.filter((cv) => cv.score > 0).map((cv) => cv.score)
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0

  updateScoreCircle("avgScoreCircle", avgScore)
  document.getElementById("avgScore").textContent = avgScore
  document.getElementById("cvsCreated").textContent = cvs.length

  const analyzedThisWeek = cvs.filter((cv) => cv.status === "Analyzed" || cv.status === "Submitted").length
  document.getElementById("analyzedWeek").textContent = analyzedThisWeek

  const skillsContainer = document.getElementById("topSkills")
  if (skillsContainer) {
    skillsContainer.innerHTML = ""
    topSkills.forEach((skill) => {
      const tag = document.createElement("span")
      tag.className = "skill-tag"
      tag.textContent = skill
      skillsContainer.appendChild(tag)
    })
  }
}

// ========== Update Score Circle ==========
function updateScoreCircle(circleId, score) {
  const circle = document.getElementById(circleId)
  if (!circle) return

  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference
  circle.setAttribute("stroke-dashoffset", offset)
}

// ========== Setup Tooltips ==========
function setupTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]")
  tooltipElements.forEach((el) => {
    el.style.cursor = "help"
  })
}

// ========== Setup Event Listeners ==========
function setupEventListeners() {
  // Global search (topbar)
  const searchInput = document.getElementById("globalSearch")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim().toLowerCase()
      renderCVTable()
    })
  }
  // Filter changes
  const statusFilter = document.getElementById("statusFilter")
  const categoryFilter = document.getElementById("categoryFilter")
  const scoreFilter = document.getElementById("scoreFilter")

  if (statusFilter) statusFilter.addEventListener("change", renderCVTable)
  if (categoryFilter) categoryFilter.addEventListener("change", renderCVTable)
  if (scoreFilter) scoreFilter.addEventListener("change", renderCVTable)

  // Modal buttons
  const createBtn = document.getElementById("createCvBtn")
  const uploadBtn = document.getElementById("uploadCvBtn")

  if (createBtn) createBtn.addEventListener("click", window.openCreateModal)
  if (uploadBtn) uploadBtn.addEventListener("click", window.openUploadModal)

  // File input
  const fileInput = document.getElementById("fileInput")
  if (fileInput) {
    fileInput.addEventListener("change", handleFileSelect)
  }

  // Drag and drop
  const uploadArea = document.getElementById("uploadArea")
  if (uploadArea) {
    uploadArea.addEventListener("dragover", handleDragOver)
    uploadArea.addEventListener("dragleave", handleDragLeave)
    uploadArea.addEventListener("drop", handleDrop)
    uploadArea.addEventListener("click", () => fileInput?.click())
  }

  // Close modals on outside click
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("show")
      }
    })
  })
}

// ========== Modal Functions ==========
window.openCreateModal = () => {
  const modal = document.getElementById("createModal")
  if (modal) {
    modal.classList.add("show")
    document.getElementById("cvName")?.focus()
  }
}

window.closeCreateModal = () => {
  const modal = document.getElementById("createModal")
  if (modal) {
    modal.classList.remove("show")
    document.getElementById("createCvForm")?.reset()
  }
}

window.openUploadModal = () => {
  const modal = document.getElementById("uploadModal")
  if (modal) {
    modal.classList.add("show")
  }
}

window.closeUploadModal = () => {
  const modal = document.getElementById("uploadModal")
  if (modal) {
    modal.classList.remove("show")
    document.getElementById("fileInput").value = ""
    document.getElementById("fileInfo").style.display = "none"
    document.getElementById("uploadSubmitBtn").disabled = true
  }
}

// ========== Create CV ==========
window.submitCreateCv = () => {
  const cvName = document.getElementById("cvName").value.trim()
  const cvCategory = document.getElementById("cvCategory").value

  if (!cvName || !cvCategory) {
    createToast("Validation", "Please fill in all required fields", "error")
    return
  }

  const newCV = {
    id: cvs.length + 1,
    name: cvName,
    category: cvCategory,
    modified: "Just now",
    status: "Draft",
    score: 0,
    content: "New CV content will appear here...",
  }

  cvs.unshift(newCV)
  renderCVTable()
  renderInsights()
  window.closeCreateModal()
  createToast("Success", `CV "${cvName}" created successfully!`, "success")
}

// ========== File Upload ==========
function handleFileSelect(e) {
  const file = e.target.files[0]
  if (file) validateAndDisplayFile(file)
}

function handleDragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  document.getElementById("uploadArea")?.classList.add("dragover")
}

function handleDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  document.getElementById("uploadArea")?.classList.remove("dragover")
}

function handleDrop(e) {
  e.preventDefault()
  e.stopPropagation()
  document.getElementById("uploadArea")?.classList.remove("dragover")

  const files = e.dataTransfer.files
  if (files.length > 0) {
    validateAndDisplayFile(files[0])
    document.getElementById("fileInput").files = files
  }
}

function validateAndDisplayFile(file) {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]
  const maxSize = 10 * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {
    createToast("Invalid file", "Please upload PDF, DOC, or DOCX files only.", "error")
    return
  }

  if (file.size > maxSize) {
    createToast("File too large", "File size exceeds 10MB limit.", "error")
    return
  }

  document.getElementById("fileName").textContent = file.name
  document.getElementById("fileInfo").style.display = "block"
  document.getElementById("uploadSubmitBtn").disabled = false
}

window.submitUploadCv = () => {
  const fileInput = document.getElementById("fileInput")
  const file = fileInput.files[0]

  if (!file) {
    createToast("No file", "Please select a file to upload.", "error")
    return
  }

  const fileName = file.name.replace(/\.[^/.]+$/, "")
  const newCV = {
    id: cvs.length + 1,
    name: fileName,
    category: "IT",
    modified: "Just now",
    status: "Draft",
    score: 0,
    content: "Uploaded CV content...",
  }

  cvs.unshift(newCV)
  renderCVTable()
  renderInsights()
  window.closeUploadModal()
  createToast("Uploaded", `CV "${fileName}" uploaded successfully!`, "success")
}

// ========== CV Actions ==========
function analyzeCV(cv) {
  createToast("Analyze", `Analyzing "${cv.name}" with AI...`, "info")
}

function rewriteCV(cv) {
  createToast("AI Rewrite", `Rewriting "${cv.name}" to highlight key achievements...`, "info")
}

function exportCV(cv) {
  createToast("Export", `Preparing export for "${cv.name}"...`, "info")
}

// Export functions for global access
window.previewCV = previewCV
window.closePreviewModal = closePreviewModal
window.analyzeCV = analyzeCV
window.rewriteCV = rewriteCV
window.exportCV = exportCV

// ========== Toast Helper ==========
function createToast(title, message, type = "info", timeout = 3000) {
  const container = document.getElementById("toastContainer")
  if (!container) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `
  container.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = "0"
    setTimeout(() => container.removeChild(toast), 200)
  }, timeout)
}
