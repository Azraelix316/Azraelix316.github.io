document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const parentDiv = clickedElement.closest('div');
    const nameOfClass = parentDiv.classList[0];
    document.getElementsByClassName(nameOfClass)[1].classList.toggle("focus");
  });
