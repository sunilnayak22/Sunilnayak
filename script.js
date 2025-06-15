// Skills data
const skills = [
  { name: "React", level: 90 },
  { name: "Bootstrap", level: 85 },
  { name: "PHP", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "Python", level: 75 },
  { name: "CSS/SCSS", level: 90 },
  { name: "MongoDB", level: 80 },
  { name: "JavaScript", level: 78 },
  { name: "Firebase", level: 85 },
  { name: "Git/GitHub", level: 88 },
]

// Global variables
let activeSection = "home"
let isLoaded = false

// Initialize the portfolio
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio()
})

function initializePortfolio() {
  // Mark as loaded
  setTimeout(() => {
    document.body.classList.add("loaded")
    document.getElementById("portfolio").classList.add("loaded")
    isLoaded = true
  }, 100)

  // Generate skills
  generateSkills()

  // Initialize Lucide icons
  const lucide = window.lucide // Declare the variable before using it
  if (lucide) {
    lucide.createIcons()
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll)

  // Add form submit handler
  document.getElementById("contactForm").addEventListener("submit", handleFormSubmit)

  // Initial scroll check
  handleScroll()
}

function generateSkills() {
  const skillsGrid = document.getElementById("skillsGrid")

  skills.forEach((skill, index) => {
    const skillItem = document.createElement("div")
    skillItem.className = "skill-item"
    skillItem.style.animationDelay = `${index * 0.1}s`

    skillItem.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        `

    skillsGrid.appendChild(skillItem)
  })
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

function handleScroll() {
  const sections = ["home", "about", "skills", "education", "projects", "contact"]
  const scrollPosition = window.scrollY + 100

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetHeight = element.offsetHeight

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        if (activeSection !== section) {
          setActiveSection(section)
        }
        break
      }
    }
  }
}

function setActiveSection(section) {
  activeSection = section

  // Update navigation
  const navButtons = document.querySelectorAll(".nav-btn")
  navButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-section") === section) {
      btn.classList.add("active")
    }
  })
}
// Smooth scrolling for older browsers
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    const offsetTop = element.offsetTop - 70 // Account for fixed nav

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add intersection observer for animations
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  // Observe animated elements
  const animatedElements = document.querySelectorAll(".skill-item, .education-item, .project-card")
  animatedElements.forEach((el) => observer.observe(el))
}

// Initialize intersection observer when DOM is loaded
document.addEventListener("DOMContentLoaded", observeElements)

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})
 function handleFormSubmit(e) {
  e.preventDefault();

  // Use emailjs to send the form
  emailjs.sendForm(
    "service_2ip18gh",    
    "template_vz6n919", 
    e.target
  ).then(
    function () {
      alert("Email sent successfully!");
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Failed to send email. Please try again.");
    }
  );

  // Optionally reset the form after sending
  e.target.reset();
}
