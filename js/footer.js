fetch("../HTML_Pages/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// esto es para que todas las paginas tengan el mismo footer
