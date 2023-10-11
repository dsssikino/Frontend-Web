var slideIndex = 0;
showSlides();

function seitenwechsel(){
    window.location.href = "apiTest.html";
}

function showSlides() {
    var slides = document.getElementsByClassName("slider")[0].getElementsByTagName("img");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Ändere die Zeit hier, um die Dauer zwischen den Bildern anzupassen
}

document.getElementById("prevBtn").addEventListener("click", function() {
    slideIndex--;
    showSlides();
});

document.getElementById("nextBtn").addEventListener("click", function() {
    slideIndex++;
    showSlides();
});
