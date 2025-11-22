// Function to fit layout for 1920px design
function fitLayoutToScreen() {
    const designWidth = 1920;
    const currentWidth = window.innerWidth;
    const scaleRatio = currentWidth / designWidth;
    document.body.style.zoom = scaleRatio;
}

document.addEventListener('DOMContentLoaded', () => {
    fitLayoutToScreen();
    window.addEventListener('resize', fitLayoutToScreen);

    // --- BENTO STRUCTURE GENERATORS ---
    const createBentoLayout = (title, intro, imgUrl, quote, quoteSource, detailsHTML) => {
        return `
            <div class="sacrament-bento-grid">
                <div class="bento-box hero-box">
                    <h2>${title}</h2>
                    <p>${intro}</p>
                </div>
                
                <div class="bento-box img-box">
                    <img src="${imgUrl}" alt="${title}">
                </div>

                <div class="bento-box detail-box">
                    ${detailsHTML}
                </div>

                <div class="bento-box quote-box">
                    <blockquote>"${quote}"</blockquote>
                    <cite>${quoteSource}</cite>
                </div>
            </div>
        `;
    };

    // --- Data: Sacrament Content ---
    const sacramentData = {
        baptism: createBentoLayout(
            "Holy Baptism",
            "The gateway to life in the Spirit.",
            "image/Baptism.png",
            "Go therefore and make disciples of all nations.",
            "Matthew 28:19",
            `<h3>Foundations</h3><p>Through Baptism we are freed from sin and reborn as sons of God.</p><h3>Key Aspects</h3><ul><li><strong>Regeneration:</strong> Renewal by the Holy Spirit.</li><li><strong>The Rite:</strong> To plunge or immerse.</li></ul>`
        ),
        confirmation: createBentoLayout(
            "Confirmation",
            "Completion of baptismal grace.",
            "image/Confirmation.png",
            "You shall receive power when the Holy Spirit has come.",
            "Acts 1:8",
            `<h3>The Seal</h3><p>Confirmation binds the baptized more perfectly to the Church.</p><h3>Effects</h3><ul><li><strong>Deepening:</strong> Roots us deeply in divine filiation.</li><li><strong>Mission:</strong> Strength to spread the faith.</li></ul>`
        ),
        eucharist: createBentoLayout(
            "The Eucharist",
            "Source and summit of life.",
            "image/Eucharist.png",
            "This is my body given for you.",
            "Luke 22:19",
            `<h3>Sacrifice</h3><p>The whole spiritual good of the Church, Christ himself.</p><h3>Dimensions</h3><ul><li><strong>Thanksgiving:</strong> Praise to the Father.</li><li><strong>Presence:</strong> Christ present by his word.</li></ul>`
        ),
        penance: createBentoLayout(
            "Reconciliation",
            "Restoring us to God's grace.",
            "image/reconciliation.png",
            "Whose sins you forgive are forgiven.",
            "John 20:23",
            `<h3>Penance</h3><p>We are called to constant conversion.</p><h3>Elements</h3><ul><li><strong>Contrition:</strong> Sorrow of the soul.</li><li><strong>Confession:</strong> Disclosure of sins.</li></ul>`
        ),
        anointing: createBentoLayout(
            "Anointing",
            "Commending those who are ill.",
            "image/Anointing.png",
            "Is any among you sick?",
            "James 5:14",
            `<h3>Grace</h3><p>For anyone in danger of death from sickness.</p><h3>Effects</h3><ul><li><strong>Strengthening:</strong> Peace and courage.</li><li><strong>Union:</strong> Uniting to the Passion.</li></ul>`
        ),
        'holy-orders': createBentoLayout(
            "Holy Orders",
            "The mission entrusted by Christ.",
            "image/Holy Orders.png",
            "I will make you fishers of men.",
            "Matthew 4:19",
            `<h3>Ministry</h3><p>The presence of Christ as head is made visible.</p><h3>Degrees</h3><ul><li><strong>Episcopate:</strong> Bishops.</li><li><strong>Presbyterate:</strong> Priests.</li></ul>`
        ),
        matrimony: createBentoLayout(
            "Matrimony",
            "A partnership of the whole of life.",
            "image/Matrimony.png",
            "What God has joined together.",
            "Matthew 19:6",
            `<h3>Covenant</h3><p>The vocation to marriage is written in nature.</p><h3>Grace</h3><ul><li><strong>Unity:</strong> Strengthens indissoluble unity.</li><li><strong>Sanctification:</strong> Holiness in life.</li></ul>`
        )
    };

    // --- Interactive Logic ---
    const modalOverlay = document.getElementById('sacrament-modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('close-modal-btn');
    const squares = document.querySelectorAll('.sacrament-square');

    squares.forEach(square => {
        square.addEventListener('click', () => {
            const id = square.getAttribute('data-id');
            const content = sacramentData[id];
            
            if (content) {
                modalBody.innerHTML = content;
                modalOverlay.classList.remove('hidden');
                setTimeout(() => modalOverlay.classList.add('active'), 10);
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.classList.add('hidden'), 600);
    };

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) { closeModal(); }
    });

    // --- Cinematic Parallax ---
    const heroText = document.getElementById('hero-main-text');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (heroText) {
            // Slower, subtle luxury movement
            heroText.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroText.style.opacity = 1 - (scrollY / 700);
        }
    });

    // Mass Card Expansion
    const rectangles = document.querySelectorAll('.expandable-rectangle');
    rectangles.forEach(rect => {
        rect.addEventListener('mouseenter', () => {
            rectangles.forEach(r => { r.classList.remove('open'); r.classList.add('closed'); });
            rect.classList.remove('closed'); rect.classList.add('open');
        });
    });

    // Simple Verse Generator
    const verses = [
        "Matthew 26:26: Take, eat; this is my body.",
        "John 6:54: Whoever eats my flesh and drinks my blood has eternal life.",
        "1 Corinthians 11:24: Do this in remembrance of me."
    ];
    const eucharistVerse = document.getElementById('eucharist-verse');
    if (eucharistVerse) {
        const randomIndex = Math.floor(Math.random() * verses.length);
        const refSpan = document.createElement('span');
        refSpan.className = "verse-reference-box";
        
        const rawText = verses[randomIndex];
        const splitText = rawText.split(': ');
        
        refSpan.innerText = splitText[0];
        eucharistVerse.innerHTML = '';
        eucharistVerse.appendChild(refSpan);
        eucharistVerse.appendChild(document.createTextNode(splitText[1]));
    }
});