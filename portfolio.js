// Script amélioré pour le portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Animation du header au défilement
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animations des éléments au scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('.competence-card, .projet-card, .stage-card, .veille-card, .career-card, .option-card, .bio-content, .highlight-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Si l'élément est dans la fenêtre visible (avec une marge)
            if (elementPosition < windowHeight - 100) {
                element.classList.add('apparition');
            }
        });
    };
    
    // Exécuter l'animation au chargement initial
    setTimeout(animateElements, 300);
    
    // Puis sur le défilement
    window.addEventListener('scroll', animateElements);
    
    // Bouton de retour en haut
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animation des liens de navigation avec défilement fluide
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Compensation pour le header fixe
                    behavior: 'smooth'
                });
            }
            
            // Mettre à jour le lien actif
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mise à jour automatique du lien actif au défilement
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialiser au chargement
    
    // Animation des logos de compétences
    const compLogos = document.querySelectorAll('.competence-logo');
    compLogos.forEach((logo, index) => {
        setTimeout(() => {
            logo.classList.add('apparition');
        }, 100 * index); // Décalage progressif pour créer un effet d'apparition séquentielle
    });
    
    // Solution alternative avec des articles statiques sur vos sujets de veille
    // Charger les flux RSS au chargement de la page
    loadVeilleArticles();
    
    // Ajouter un bouton pour "rafraîchir" les flux (qui recharge en fait les mêmes articles)
    const refreshButton = document.getElementById('refresh-rss');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            const feedContainer = document.getElementById('rss-feed-container');
            feedContainer.innerHTML = ''; // Vider le conteneur
            loadVeilleArticles(); // Recharger les articles
        });
    }

    // Animation du formulaire de contact
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach((input) => {
            // Ajouter une classe when focused
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            // Retirer la classe si empty on blur
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Animation de soumission
        contactForm.addEventListener('submit', function(e) {
            // La gestion de soumission est déjà configurée avec Formspree
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        });
    }
});

// Fonction pour charger des articles prédéfinis
function loadVeilleArticles() {
    const feedContainer = document.getElementById('rss-feed-container');
    if (!feedContainer) return;
    
    // Afficher un message de chargement
    feedContainer.innerHTML = '<div class="loading-msg">Chargement des articles de veille...</div>';
    
    // Articles prédéfinis sur l'IA générative
    const iaArticles = [
        {
            title: "OpenAI dévoile GPT-4o, un modèle plus rapide et plus performant",
            date: "18 mai 2024",
            source: "OpenAI Blog",
            description: "GPT-4o (\"o\" pour \"omni\") est multi-modal, optimisé pour une utilisation sur différentes plateformes, et plus rapide que les modèles précédents tout en conservant un haut niveau de performance.",
            link: "https://openai.com/blog/"
        },
        {
            title: "GitHub Copilot devient un assistant généraliste pour les développeurs",
            date: "15 avril 2024",
            source: "GitHub Blog",
            description: "Au-delà de la simple génération de code, GitHub Copilot peut désormais aider à la planification de projets, l'explication de bases de code complexes et l'optimisation des performances.",
            link: "https://github.blog/tag/ai/"
        },
        {
            title: "Midjourney v6 : la révolution de la génération d'images continue",
            date: "12 mars 2024",
            source: "AI News",
            description: "Midjourney v6 améliore considérablement le rendu des mains, visages et textes dans les images générées, réduisant l'écart avec la photographie traditionnelle.",
            link: "https://www.artificialintelligence-news.com/"
        }
    ];
    
    // Articles prédéfinis sur la cybersécurité
    const securityArticles = [
        {
            title: "Nouvelle vulnérabilité zero-day affecte les systèmes Linux",
            date: "22 mai 2024",
            source: "CERT-FR",
            description: "Une vulnérabilité critique permettant l'exécution de code à distance a été découverte dans le noyau Linux. Les chercheurs ont observé des exploitations actives dans la nature.",
            link: "https://www.cert.ssi.gouv.fr/"
        },
        {
            title: "Microsoft corrige 3 vulnérabilités zero-day activement exploitées",
            date: "11 avril 2024",
            source: "Microsoft Security",
            description: "Le Patch Tuesday d'avril inclut des correctifs pour trois vulnérabilités zero-day qui étaient activement exploitées pour compromettre des systèmes Windows et Exchange.",
            link: "https://msrc.microsoft.com/blog/"
        },
        {
            title: "Vulnérabilité dans les navigateurs basés sur Chromium permet le vol de données",
            date: "2 mars 2024",
            source: "Project Zero",
            description: "Les chercheurs de Google ont découvert une faille qui permet à des attaquants de contourner la Same-Origin Policy et d'accéder à des données sensibles sur d'autres sites.",
            link: "https://googleprojectzero.blogspot.com/"
        }
    ];
    
    // Combiner et mélanger légèrement les articles pour donner une impression de diversité
    let allArticles = [...iaArticles, ...securityArticles];
    
    // Un peu de hasard dans l'ordre (tout en gardant les plus "récents" en premier)
    allArticles.sort((a, b) => {
        const dateA = new Date(a.date.split(' ')[0] + ' ' + a.date.split(' ')[1] + ' 2024');
        const dateB = new Date(b.date.split(' ')[0] + ' ' + b.date.split(' ')[1] + ' 2024');
        return dateB - dateA;
    });
    
    // Supprimer le message de chargement
    setTimeout(() => {
        feedContainer.innerHTML = '';
        
        // Afficher les articles
        allArticles.forEach((article, index) => {
            const isAIRelated = iaArticles.some(iaArticle => iaArticle.title === article.title);
            
            // Créer un élément pour l'article
            const articleElement = document.createElement('div');
            articleElement.className = 'rss-article';
            
            // Ajouter une icône thématique
            const topicIcon = isAIRelated ? 
                '<span class="topic-icon ai-topic"><i class="fas fa-robot"></i></span>' : 
                '<span class="topic-icon security-topic"><i class="fas fa-shield-alt"></i></span>';
            
            // Ajouter une étiquette thématique
            const topicTag = isAIRelated ? 
                '<span class="topic-tag ai-tag">IA Générative</span>' : 
                '<span class="topic-tag security-tag">Cybersécurité</span>';
            
            // Remplir l'élément avec les informations de l'article
            articleElement.innerHTML = `
                ${topicIcon}
                ${topicTag}
                <h4>${article.title}</h4>
                <p class="rss-date">${article.date} - ${article.source}</p>
                <p class="rss-description">${article.description}</p>
                <a href="${article.link}" target="_blank" class="rss-link">Lire l'article <i class="fas fa-external-link-alt"></i></a>
            `;
            
            // Ajouter une classe selon le thème
            if (isAIRelated) {
                articleElement.classList.add('ai-article');
            } else {
                articleElement.classList.add('security-article');
            }
            
            // Ajouter l'élément au conteneur avec animation différée
            setTimeout(() => {
                feedContainer.appendChild(articleElement);
                articleElement.classList.add('apparition');
            }, index * 100);
        });
    }, 800);  // Simuler un délai de chargement pour l'effet
}

// Ajout de styles pour les icônes de thématique
const styleElement = document.createElement('style');
styleElement.innerHTML = `
    .topic-icon {
        position: absolute;
        top: -15px;
        right: 20px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 2;
    }
    
    .ai-topic {
        background: linear-gradient(135deg, #ff7e5f, #feb47b);
    }
    
    .security-topic {
        background: linear-gradient(135deg, #3a7bd5, #00d2ff);
    }
    
    .rss-article {
        position: relative;
    }
    
    .info-msg {
        text-align: center;
        padding: 20px;
        color: #777;
    }
    
    .topic-tag {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
    
    .ai-tag {
        background-color: rgba(255, 126, 95, 0.1);
        color: var(--primary-color);
    }
    
    .security-tag {
        background-color: rgba(58, 123, 213, 0.1);
        color: #3a7bd5;
    }
`;
document.head.appendChild(styleElement);

// Script de chargement et améliorations pour le portfolio

// Ajouter l'overlay de chargement au DOM
document.body.insertAdjacentHTML('afterbegin', `
    <div class="loading-overlay">
        <div class="loading-spinner"></div>
    </div>
`);

// Ajouter les formes décoratives au DOM
document.querySelector('#accueil').insertAdjacentHTML('afterbegin', `
    <div class="shape-1"></div>
    <div class="shape-2"></div>
    <div class="shape-3"></div>
    <div class="shape-4"></div>
`);

// Masquer l'overlay de chargement une fois la page chargée
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-overlay').classList.add('hidden');
    }, 800); // Attendre 800ms avant de masquer le chargement pour une transition fluide
});

// Animation des liens de navigation avec ligne d'indicateur
const navLinks = document.querySelectorAll('nav a');
const indicator = document.createElement('span');
indicator.classList.add('nav-indicator');
document.querySelector('nav').appendChild(indicator);

function updateIndicator(el) {
    if (!el) return;
    
    const pos = el.getBoundingClientRect();
    const navPos = document.querySelector('nav').getBoundingClientRect();
    
    indicator.style.width = `${pos.width}px`;
    indicator.style.left = `${pos.left - navPos.left}px`;
    indicator.style.opacity = '1';
}

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        updateIndicator(link);
    });
    
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        updateIndicator(link);
    });
});

document.querySelector('nav').addEventListener('mouseleave', () => {
    const activeLink = document.querySelector('nav a.active');
    if (activeLink) {
        updateIndicator(activeLink);
    } else {
        indicator.style.opacity = '0';
    }
});

// Mettre à jour l'indicateur pour le lien actif au chargement
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const activeLink = document.querySelector('nav a.active');
        if (activeLink) updateIndicator(activeLink);
    }, 100);
});

// Effet de parallaxe au défilement pour les formes
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    const shape3 = document.querySelector('.shape-3');
    const shape4 = document.querySelector('.shape-4');
    
    if (shape1 && shape2 && shape3 && shape4) {
        shape1.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        shape2.style.transform = `translateY(${scrollPosition * -0.1}px)`;
        shape3.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        shape4.style.transform = `translateY(${scrollPosition * -0.05}px)`;
    }
});

// Animation de typage pour la section d'accueil
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Lancer l'animation après que l'overlay de chargement disparaisse
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Activer les animations pour les éléments visibles initialement
function checkInitialVisibility() {
    const elements = document.querySelectorAll('.competence-card, .projet-card, .stage-card, .veille-card, .option-card, .career-card, .bio-content, .highlight-box');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        if (position.top < window.innerHeight) {
            setTimeout(() => {
                element.classList.add('apparition');
            }, 300);
        }
    });
}

// Exécuter après le chargement initial
window.addEventListener('load', checkInitialVisibility);