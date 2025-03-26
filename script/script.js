// Imagenes de la galeria
const images = [
    './assets/image1.webp',
    './assets/image2.webp',
    './assets/image3.webp',
    './assets/image4.webp',
    './assets/image5.webp'
]

// Variables
const carouselContainer = document.getElementById('imageCarousel')
const carouselImage = document.getElementById('carouselImage')
const carouselImageNext = document.createElement('img')
const thumbnailsContainer = document.getElementById('thumbnails')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const backgroundMusic = document.getElementById('backgroundMusic')
const playPauseBtn = document.getElementById('playPauseBtn')
const volumeControl = document.getElementById('volumeControl')
const fullscreenModal = document.getElementById('fullscreenModal')
const fullscreenImage = document.getElementById('fullscreenImage')
const closeModalBtn = document.getElementById('closeModalBtn')
const darkModeToggle = document.getElementById('darkModeToggle')
const darkModeIcon = document.getElementById('darkModeIcon')

let currentImageIndex = 0
let carouselInterval

// Preparar imagen para transicion
carouselImageNext.classList.add('w-full', 'h-full', 'object-cover', 'absolute', 'top-0', 'left-0', 'opacity-0', 'transition-opacity', 'duration-1000')
carouselContainer.appendChild(carouselImageNext)

// Funcion para cargar imagenes en el carrusel y miniaturas con transicion suave
function loadImages() {
    // Preparar la siguiente imagen
    carouselImageNext.src = images[currentImageIndex]
    
    // Transicion de imagenes
    carouselImage.classList.add('opacity-0')
    carouselImageNext.classList.remove('opacity-0')
    
    // Intercambiar referencias despues de la transicion
    setTimeout(() => {
        carouselImage.src = images[currentImageIndex]
        carouselImage.classList.remove('opacity-0')
        carouselImageNext.classList.add('opacity-0')
    }, 1000)

    // Actualizar miniaturas
    thumbnailsContainer.innerHTML = ''
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img')
        thumbnail.src = image
        thumbnail.classList.add('w-20', 'h-20', 'object-cover', 'cursor-pointer', 'opacity-50', 'hover:opacity-100', 'transition-all', 'duration-300')
        if (index === currentImageIndex) {
            thumbnail.classList.remove('opacity-50')
            thumbnail.classList.add('opacity-100', 'border-2', 'border-blue-500', 'scale-105')
        }
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index
            loadImages()
        })
        thumbnailsContainer.appendChild(thumbnail)
    })
}

// Carrusel automatico con transicion suave
function startCarousel() {
    // Limpiar cualquier intervalo existente
    if (carouselInterval) {
        clearInterval(carouselInterval)
    }
    
    carouselInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length
        loadImages()
    }, 5000) // Aumentado a 5 segundos para dar mas tiempo a la transicion
}

// Navegacion manual con transicion suave
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length
    loadImages()
})

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length
    loadImages()
})

// Control de musica de fondo (sin cambios)
playPauseBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
        backgroundMusic.pause()
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
})

// Actualizar la barra de progreso
function updateProgress() {
    const progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100
    progressBar.value = progress
}

// Eventos para actualizar la barra de progreso
backgroundMusic.addEventListener('timeupdate', updateProgress)

// Controlar la musica con la barra de progreso
progressBar.addEventListener('change', () => {
    const progress = progressBar.value / 100
    backgroundMusic.currentTime = progress * backgroundMusic.duration
})

volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = volumeControl.value
})

// Modal de imagen en pantalla completa (sin cambios)
thumbnailsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        fullscreenImage.src = e.target.src
        fullscreenModal.classList.remove('hidden')
        fullscreenModal.classList.add('flex')
    }
})

closeModalBtn.addEventListener('click', () => {
    fullscreenModal.classList.remove('flex')
    fullscreenModal.classList.add('hidden')
})

// Modo oscuro (sin cambios)
function toggleDarkMode() {
    const htmlElement = document.documentElement
    htmlElement.classList.toggle('dark')

    const isDarkMode = htmlElement.classList.contains('dark')
    localStorage.setItem('darkMode', isDarkMode)

    updateDarkModeIcon()
}

function updateDarkModeIcon() {
    const isDarkMode = document.documentElement.classList.contains('dark')
    darkModeIcon.classList.toggle('fa-moon', !isDarkMode)
    darkModeIcon.classList.toggle('fa-sun', isDarkMode)
}

darkModeToggle.addEventListener('click', toggleDarkMode)

// Inicializacion
function init() {
    // Cargar modo oscuro desde localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    if (savedDarkMode) {
        document.documentElement.classList.add('dark')
    }
    updateDarkModeIcon()
    loadImages()
    startCarousel()
}

init()