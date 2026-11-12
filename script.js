// 1. Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// 2. Dados das Áreas de Atuação + Modal Interativo
const careersData = [
    {
        title: "Instrumentista & Cantor(a)",
        tag: "Palco & Estúdio",
        short: "Atuação ao vivo em bandas, orquestras, teatro musical, cruzeiros e gravações em estúdio para outros artistas.",
        fullDesc: "O performer musical transforma partituras e ideias em emoção sonora. Pode atuar como artista solo, integrante de bandas, músico contratado (freelancer) para turnês ou instrumentista concursado em orquestras sinfônicas.",
        skills: [
            "Domínio técnico avançado do instrumento ou técnica vocal",
            "Leitura de partitura e cifras à primeira vista",
            "Versatilidade estilística (MPB, Pop, Rock, Jazz, Erudito)",
            "Resistência física, disciplina de ensaio e presença de palco"
        ]
    },
    {
        title: "Produtor(a) Musical & Beatmaker",
        tag: "Estúdio & Tecnologia",
        short: "Direção artística de gravações, criação de beats, arranjos digitais, mixagem e masterização.",
        fullDesc: "O produtor musical é o arquiteto sonoro de um projeto fonográfico. Ele guia o artista no estúdio, escolhe timbres, programa baterias e sintetizadores em DAWs (como Ableton, Logic ou Pro Tools) e entrega a música pronta para o streaming.",
        skills: [
            "Domínio de softwares de áudio (DAWs) e plugins",
            "Conhecimento em acústica, microfonação e mixagem",
            "Visão estética e comercial do mercado fonográfico",
            "Comunicação para dirigir cantores e instrumentistas"
        ]
    },
    {
        title: "Compositor(a) & Trilha Sonora",
        tag: "Cinema, Games & TV",
        short: "Criação de músicas originais, jingles publicitários e trilhas adaptativas para filmes, séries e videogames.",
        fullDesc: "Especialistas em narrativa sonora criam atmosferas que intensificam histórias no audiovisual. No mercado de games, trabalham com áudio interativo que muda conforme as ações do jogador.",
        skills: [
            "Harmonia avançada, contraponto e orquestração virtual",
            "Sincronização de áudio com imagem (timecode)",
            "Conhecimento de engines de áudio para games (FMOD/Wwise)",
            "Gestão de prazos rigorosos e briefings criativos"
        ]
    },
    {
        title: "Educador(a) Musical",
        tag: "Ensino & Formação",
        short: "Ensino de instrumentos, canto e teoria em escolas de música, ensino básico, universidades ou aulas particulares.",
        fullDesc: "A educação musical desenvolve coordenação motora, cognição e sensibilidade artística. Professores atuam tanto na formação de novos profissionais quanto na musicalização infantil e projetos sociais.",
        skills: [
            "Didática e pedagogia musical adaptada a cada faixa etária",
            "Licenciatura em Música (para ensino regular)",
            "Paciência, empatia e planejamento de currículo",
            "Domínio de ferramentas digitais para aulas online"
        ]
    },
    {
        title: "Engenheiro(a) de Áudio & PA",
        tag: "Eventos & Acústica",
        short: "Operação de mesas de som em shows ao vivo, festivais, emissoras de TV e projetos acústicos.",
        fullDesc: "Responsável por garantir que o público e os músicos no palco ouçam tudo com clareza, equilíbrio e segurança sonora, operando sistemas complexos de sonorização e monitoramento.",
        skills: [
            "Física acústica, elétrica e processamento de sinais",
            "Operação de consoles digitais de áudio",
            "Rápida resolução de problemas técnicos ao vivo",
            "Treinamento auditivo apurado para equalização"
        ]
    },
    {
        title: "Musicoterapeuta",
        tag: "Saúde & Bem-Estar",
        short: "Uso clínico da música para reabilitação motora, cognitiva, emocional e social em hospitais e clínicas.",
        fullDesc: "Profissional com formação superior específica que utiliza elementos musicais (ritmo, melodia, harmonia) como ferramenta terapêutica no tratamento de autismo, reabilitação neurológica e saúde mental.",
        skills: [
            "Graduação ou pós-graduação em Musicoterapia",
            "Domínio funcional de violão, piano e percussão",
            "Conhecimentos em psicologia, neurociência e anatomia",
            "Escuta ativa e ética profissional na área da saúde"
        ]
    }
];

const careersGrid = document.getElementById('careersGrid');
const modal = document.getElementById('careerModal');

careersData.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.innerHTML = `
        <div>
            <div class="career-top">
                <span class="tag">${item.tag}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.short}</p>
        </div>
        <div class="career-footer">
            <span>Ver detalhes da carreira</span>
            <span>→</span>
        </div>
    `;
    card.addEventListener('click', () => openCareerModal(item));
    careersGrid.appendChild(card);
});

function openCareerModal(item) {
    document.getElementById('modalTag').textContent = item.tag;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDesc').textContent = item.fullDesc;
    const skillsList = document.getElementById('modalSkills');
    skillsList.innerHTML = item.skills.map(s => `<li>${s}</li>`).join('');
    modal.classList.add('open');
}

document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});

// 3. Estúdio Interativo (Web Audio API Synthesizer)
let audioCtx = null;

const notes = [
    { name: 'Dó (C4)', freq: 261.63, key: 'a' },
    { name: 'Ré (D4)', freq: 293.66, key: 's' },
    { name: 'Mi (E4)', freq: 329.63, key: 'd' },
    { name: 'Fá (F4)', freq: 349.23, key: 'f' },
    { name: 'Sol (G4)', freq: 392.00, key: 'g' },
    { name: 'Lá (A4)', freq: 440.00, key: 'h' },
    { name: 'Si (B4)', freq: 493.88, key: 'j' },
    { name: 'Dó (C5)', freq: 523.25, key: 'k' }
];

const pianoKeysContainer = document.getElementById('pianoKeys');
const noteDisplay = document.getElementById('noteDisplay');
const waveSelector = document.getElementById('waveSelector');

function playNote(noteObj, keyElement) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = waveSelector.value;
    osc.frequency.setValueAtTime(noteObj.freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.35, audioCtx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.95);

    noteDisplay.textContent = `Nota: ${noteObj.name} — ${noteObj.freq} Hz`;
    if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 180);
    }
}

notes.forEach(note => {
    const keyBtn = document.createElement('div');
    keyBtn.className = 'key';
    keyBtn.dataset.key = note.key;
    keyBtn.innerHTML = `<span>${note.name.split(' ')[0]}</span><small>[${note.key.toUpperCase()}]</small>`;
    keyBtn.addEventListener('mousedown', () => playNote(note, keyBtn));
    keyBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playNote(note, keyBtn);
    });
    pianoKeysContainer.appendChild(keyBtn);
});

window.addEventListener('keydown', (e) => {
    const found = notes.find(n => n.key === e.key.toLowerCase());
    if (found && !e.repeat) {
        const el = document.querySelector(`.key[data-key="${found.key}"]`);
        playNote(found, el);
    }
});

// 4. Quiz Vocacional Interativo
const quizQuestions = [
    {
        q: "1. Onde você se imagina mais realizado trabalhando com música?",
        options: [
            { text: "No palco, sentindo a energia do público ao vivo.", type: "palco" },
            { text: "No estúdio, criando timbres, beats e trilhas no computador.", type: "estudio" },
            { text: "Ensinando, orientando pessoas ou usando música para transformar vidas.", type: "educacao" }
        ]
    },
    {
        q: "2. Qual atividade mais chama sua atenção no dia a dia?",
        options: [
            { text: "Praticar um instrumento ou técnica vocal por horas até dominar.", type: "palco" },
            { text: "Experimentar softwares de áudio, gravação e composição.", type: "estudio" },
            { text: "Explicar conceitos musicais e ajudar outros a evoluírem.", type: "educacao" }
        ]
    },
    {
        q: "3. Como você prefere lidar com projetos criativos?",
        options: [
            { text: "Tocando em grupo, ensaiando e improvisando com outros músicos.", type: "palco" },
            { text: "Produzindo faixas completas com autonomia e precisão técnica.", type: "estudio" },
            { text: "Planejando atividades estruturadas e acompanhando resultados.", type: "educacao" }
        ]
    }
];

const quizResults = {
    palco: {
        title: "Perfil Performer: Instrumentista / Cantor(a)",
        desc: "Seu lugar é sob os holofotes! Você tem perfil voltado para performance ao vivo, turnês, orquestras, teatro musical e gravações como músico de sessão."
    },
    estudio: {
        title: "Perfil Criador: Produtor(a) Musical / Compositor(a)",
        desc: "Você combina criatividade com tecnologia! Suas maiores oportunidades estão na produção fonográfica, beatmaking, engenharia de áudio e trilhas para cinema e games."
    },
    educacao: {
        title: "Perfil Formador: Educador(a) Musical / Musicoterapeuta",
        desc: "Você tem vocação humana e pedagógica! Pode construir uma carreira sólida em escolas, conservatórios, universidades, projetos sociais ou na área clínica."
    }
};

let currentStep = 0;
let scores = { palco: 0, estudio: 0, educacao: 0 };
const quizContent = document.getElementById('quizContent');

function renderQuiz() {
    if (currentStep < quizQuestions.length) {
        const item = quizQuestions[currentStep];
        quizContent.innerHTML = `
            <span class="badge" style="margin-bottom: 0.75rem;">Pergunta ${currentStep + 1} de ${quizQuestions.length}</span>
            <div class="quiz-question">${item.q}</div>
            <div class="quiz-options">
                ${item.options.map(opt => `
                    <button class="quiz-option" onclick="answerQuiz('${opt.type}')">${opt.text}</button>
                `).join('')}
            </div>
        `;
    } else {
        const winner = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
        const res = quizResults[winner];
        quizContent.innerHTML = `
            <div class="quiz-result">
                <span class="tag">Resultado do Teste</span>
                <h3>${res.title}</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.75rem;">${res.desc}</p>
                <button class="btn btn-primary" onclick="resetQuiz()">Refazer Teste</button>
            </div>
        `;
    }
}

window.answerQuiz = function(type) {
    scores[type]++;
    currentStep++;
    renderQuiz();
};

window.resetQuiz = function() {
    currentStep = 0;
    scores = { palco: 0, estudio: 0, educacao: 0 };
    renderQuiz();
};

renderQuiz();
