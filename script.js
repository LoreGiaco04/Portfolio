// Gestione navigazione
function showSection(sectionId) {
  // Nascondi tutte le sezioni
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Mostra la sezione selezionata
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Aggiorna la navigazione
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  const activeLink = document.querySelector(`[data-section="${sectionId}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Gestione CV Modal
function enlargeCV() {
  const modal = document.getElementById("cv-modal")
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeCV() {
  const modal = document.getElementById("cv-modal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Chiudi modal cliccando sullo sfondo
document.getElementById("cv-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeCV()
  }
})

// Chiudi modal con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCV()
  }
})

// Download CV
function downloadCV() {
  // Crea un link temporaneo per il download
  const link = document.createElement("a")
  link.href = "/cv-lorenzo-giacopuzzi.pdf" // Path al file PDF
  link.download = "CV-Lorenzo-Giacopuzzi.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Mostra messaggio di conferma
  showNotification("Download del CV avviato!", "success")
}

// Gestione form contatti
function sendMessage(event) {
  event.preventDefault()

  // Ottieni i dati del form
  const formData = new FormData(event.target)
  const nome = formData.get("nome")
  const email = formData.get("email")
  const oggetto = formData.get("oggetto")
  const messaggio = formData.get("messaggio")

  // Validazione base
  if (!nome || !email || !oggetto || !messaggio) {
    showNotification("Per favore compila tutti i campi", "error")
    return
  }

  // Simulazione invio (qui potresti integrare con un servizio email)
  showNotification("Messaggio inviato con successo! Ti risponderò presto.", "success")

  // Reset form
  event.target.reset()

  // In un'implementazione reale, qui invieresti i dati a un server
  console.log("Messaggio da inviare:", {
    nome,
    email,
    oggetto,
    messaggio,
  })
}

// Sistema di notifiche
function showNotification(message, type = "info") {
  // Rimuovi notifiche esistenti
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => {
    notification.remove()
  })

  // Crea nuova notifica
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `

  // Aggiungi stili per le notifiche
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style")
    styles.id = "notification-styles"
    styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                max-width: 400px;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                animation: slideIn 0.3s ease-out;
            }
            
            .notification-success {
                background-color: #10b981;
                color: white;
            }
            
            .notification-error {
                background-color: #ef4444;
                color: white;
            }
            
            .notification-info {
                background-color: #3b82f6;
                color: white;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `
    document.head.appendChild(styles)
  }

  // Aggiungi al DOM
  document.body.appendChild(notification)

  // Rimuovi automaticamente dopo 5 secondi
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Smooth scrolling per i link interni
document.addEventListener("DOMContentLoaded", () => {
  // Inizializza la prima sezione
  showSection("chi-sono")

  // Aggiungi listener per i link esterni
  const externalLinks = document.querySelectorAll('a[href^="http"]')
  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank")
    link.setAttribute("rel", "noopener noreferrer")
  })
})

// Gestione responsive per la navigazione mobile
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  navMenu.classList.toggle("mobile-active")
}

// Aggiungi stili per menu mobile se necessario
if (window.innerWidth <= 768) {
  const mobileStyles = document.createElement("style")
  mobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-menu.mobile-active {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-top: 1px solid #e2e8f0;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
        }
    `
  document.head.appendChild(mobileStyles)
}

// Gestione eventi tastiera per accessibilità
document.addEventListener("keydown", (e) => {
  // Navigazione con Tab
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Aggiungi stili per la navigazione da tastiera
const keyboardStyles = document.createElement("style")
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
    
    body:not(.keyboard-navigation) *:focus {
        outline: none;
    }
`
document.head.appendChild(keyboardStyles)

// Lazy loading per le immagini (se necessario)
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Inizializza lazy loading se supportato
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", lazyLoadImages)
}
