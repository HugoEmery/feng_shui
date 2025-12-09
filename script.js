// script.js - Funcionalidades principais do site Feng Shui

document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU MOBILE =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // ===== DETECTAR PÁGINA ATIVA =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (linkPage !== 'index.html' && currentPage.includes(linkPage.replace('.html', '')))) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ===== ANIMAÇÃO DE REVELAÇÃO AO SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.card, .content-block, h2, h3');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // ===== SIMULAÇÃO DO CICLO DOS 5 ELEMENTOS (página elementos.html) =====
    const cycleButtons = document.querySelectorAll('.cycle-btn');
    
    cycleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cycleType = this.dataset.cycle;
            const elements = document.querySelectorAll('.element-cycle');
            
            // Resetar elementos
            elements.forEach(el => {
                el.classList.remove('active');
            });
            
            // Ativar sequência do ciclo
            let sequence = [];
            
            if (cycleType === 'produtivo') {
                sequence = ['agua', 'madeira', 'fogo', 'terra', 'metal'];
            } else if (cycleType === 'destrutivo') {
                sequence = ['agua', 'fogo', 'metal', 'madeira', 'terra'];
            } else if (cycleType === 'reducao') {
                sequence = ['fogo', 'madeira', 'agua', 'metal', 'terra'];
            }
            
            // Animar sequência
            sequence.forEach((elementId, index) => {
                setTimeout(() => {
                    const element = document.getElementById(elementId);
                    if (element) {
                        element.classList.add('active');
                        
                        // Remover classe após animação
                        setTimeout(() => {
                            element.classList.remove('active');
                        }, 1000);
                    }
                }, index * 600);
            });
        });
    });
    
    // ===== SIMULADOR DE PA-KUA =====
    const paKuaAreas = document.querySelectorAll('.pa-kua-area');
    
    paKuaAreas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            const areaName = this.dataset.area;
            const tooltip = document.getElementById('pa-kua-tooltip');
            
            if (tooltip) {
                tooltip.textContent = this.dataset.description;
                tooltip.style.display = 'block';
                tooltip.style.left = `${this.offsetLeft + this.offsetWidth/2 - tooltip.offsetWidth/2}px`;
                tooltip.style.top = `${this.offsetTop - 50}px`;
            }
        });
        
        area.addEventListener('mouseleave', function() {
            const tooltip = document.getElementById('pa-kua-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
    });
    
    // ===== CALCULADORA DE ELEMENTO PESSOAL =====
    const calculatorForm = document.getElementById('element-calculator');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const birthYear = parseInt(document.getElementById('birth-year').value);
            const birthMonth = parseInt(document.getElementById('birth-month').value);
            
            if (birthYear && birthMonth) {
                let element = '';
                
                // Lógica simplificada para determinação do elemento
                if (birthMonth >= 3 && birthMonth <= 5) {
                    element = 'Madeira';
                } else if (birthMonth >= 6 && birthMonth <= 8) {
                    element = 'Fogo';
                } else if (birthMonth >= 9 && birthMonth <= 11) {
                    element = 'Terra';
                } else {
                    element = 'Água';
                }
                
                // Ano final 3 ou 4 = Madeira, 5 ou 6 = Fogo, etc.
                const lastDigit = birthYear % 10;
                if (lastDigit === 3 || lastDigit === 4) {
                    element = 'Madeira';
                } else if (lastDigit === 5 || lastDigit === 6) {
                    element = 'Fogo';
                } else if (lastDigit === 7 || lastDigit === 8) {
                    element = 'Terra';
                } else if (lastDigit === 9 || lastDigit === 0) {
                    element = 'Metal';
                } else if (lastDigit === 1 || lastDigit === 2) {
                    element = 'Água';
                }
                
                const resultDiv = document.getElementById('element-result');
                resultDiv.innerHTML = `
                    <h4>Seu Elemento Pessoal: <span style="color: var(--cor-destaque)">${element}</span></h4>
                    <p>Este elemento influencia sua energia pessoal e compatibilidade com ambientes.</p>
                    <p><strong>Dica:</strong> Incorpore cores e formas relacionadas ao elemento ${element} em seus espaços pessoais.</p>
                `;
                resultDiv.style.display = 'block';
            }
        });
    }
    
    // ===== DICAS ALEATÓRIAS DE FENG SHUI =====
    const fengShuiTips = [
        "Mantenha a entrada da sua casa limpa e iluminada para atrair energia positiva.",
        "Evite espelhos de frente para a cama, pois podem perturbar o sono.",
        "Plantas com folhas arredondadas atraem energia positiva para sua casa.",
        "Organize sua mesa de trabalho para que você possa ver a porta de entrada.",
        "Use cores suaves no quarto para promover um sono tranquilo.",
        "Coloque um aquário ou fonte de água no setor da prosperidade (sudeste).",
        "Evite móveis com cantos pontiagudos apontando para áreas de descanso.",
        "Sinos de vento na entrada ajudam a circular energia estagnada.",
        "Mantenha o banheiro fechado e a tampa da privada abaixada.",
        "Use cristais para refletir e espalhar luz positiva pelos ambientes."
    ];
    
    const tipElement = document.getElementById('fengshui-tip');
    if (tipElement) {
        // Mostrar uma dica aleatória
        const randomTip = fengShuiTips[Math.floor(Math.random() * fengShuiTips.length)];
        tipElement.textContent = randomTip;
        
        // Alternar dica a cada 10 segundos (opcional)
        setInterval(() => {
            const newTip = fengShuiTips[Math.floor(Math.random() * fengShuiTips.length)];
            tipElement.style.opacity = 0;
            setTimeout(() => {
                tipElement.textContent = newTip;
                tipElement.style.opacity = 1;
            }, 500);
        }, 10000);
    }
    
    // ===== BOTÃO VOLTAR AO TOPO =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--cor-primaria);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(42, 96, 65, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // ===== TOGGLE DE CONTEÚDO =====
    const toggleButtons = document.querySelectorAll('.toggle-content');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.toggle('active');
                this.innerHTML = targetContent.classList.contains('active') 
                    ? `${this.dataset.label} <i class="fas fa-chevron-up"></i>`
                    : `${this.dataset.label} <i class="fas fa-chevron-down"></i>`;
            }
        });
    });
});

// ===== FUNÇÃO PARA ADICIONAR EFEITO DE DIGITAÇÃO =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efeito de digitação em elementos específicos
const typingElements = document.querySelectorAll('.typing-effect');
typingElements.forEach(element => {
    const text = element.getAttribute('data-text') || element.textContent;
    typeWriter(element, text);
});