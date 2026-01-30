function masukWebsite() {
    const namaUser = document.getElementById("input-nama-user").value;
    const errorMsg = document.getElementById("error-message");
    const welcomeOverlay = document.getElementById("welcome-overlay");
    
    if (namaUser === "") {
        errorMsg.classList.remove("error-hidden");
        errorMsg.classList.add("error-message");
        document.getElementById("input-nama-user").style.borderColor = "red";
    } else {
        document.getElementById("user-name-span").innerText = namaUser;
        welcomeOverlay.classList.add("slide-up");
        errorMsg.classList.add("error-hidden");
        startMusic();
    }
}

function startMusic() {
    const music = document.getElementById("backsound");
    const btnMusic = document.getElementById("music-control");
    btnMusic.style.display = "flex"; 
    music.play().then(() => {
        btnMusic.classList.add("music-playing");
    }).catch(error => {
        console.log("Autoplay dicegah browser, user harus klik manual.");
    });
}

function toggleMusic() {
    const music = document.getElementById("backsound");
    const btnMusic = document.getElementById("music-control");
    if (music.paused) {
        music.play();
        btnMusic.classList.add("music-playing");
        btnMusic.innerHTML = "🎵"; 
    } else {
        music.pause();
        btnMusic.classList.remove("music-playing");
        btnMusic.innerHTML = "🔇"; 
    }
}
window.addEventListener("scroll", function() {
    handleNavbarScroll();
    handleRevealAnimation();
});
function handleNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

function handleRevealAnimation() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active'); 
        }
    }
}
handleRevealAnimation();

function handleFormSubmit(event) {
    event.preventDefault(); 
    const nama = document.getElementById("nama").value;
    const tglLahir = document.getElementById("tgl-lahir").value;
    const gender = document.getElementById("gender-select").value;
    const pesan = document.getElementById("pesan").value;

    if (nama === "" || tglLahir === "" || gender === "" || pesan === "") {
        alert("Mohon lengkapi semua data form!");
        return;
    }

    const messageList = document.getElementById("message-list");
    const emptyState = document.querySelector(".empty-state");
    if (emptyState) emptyState.remove();
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newCard = document.createElement("div");
    newCard.classList.add("msg-card");

    newCard.innerHTML = `
        <div class="msg-header" onclick="toggleMessage(this)">
            <span class="msg-name">${nama}</span>
            <span class="msg-time">${timeString}</span>
        </div>
        <div class="msg-body">
            <p><span class="msg-label">Tanggal Lahir:</span> ${tglLahir}</p>
            <p><span class="msg-label">Jenis Kelamin:</span> ${gender}</p>
            <p><span class="msg-label">Pesan:</span><br> "${pesan}"</p>
            <button class="btn-delete" onclick="deleteMessage(this)">Hapus Pesan</button>
            <div style="clear:both;"></div>
        </div>
    `;

    messageList.prepend(newCard); 
    document.getElementById("contactForm").reset(); 
}

function toggleMessage(headerElement) {
    const card = headerElement.parentElement;
    card.classList.toggle("active");
}

function deleteMessage(btnElement) {
    if (confirm("Yakin ingin menghapus pesan ini?")) {
        const card = btnElement.parentElement.parentElement;
        card.remove();
        const messageList = document.getElementById("message-list");
        if (messageList.children.length === 0) {
            messageList.innerHTML = '<div class="empty-state">Belum ada pesan masuk.</div>';
        }
    }
}