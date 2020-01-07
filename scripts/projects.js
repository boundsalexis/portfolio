let projectDroppable = null;

projects.onmousedown = function (event) {

  let shiftX = event.clientX - projects.getBoundingClientRect().left;
  let shiftY = event.clientY - projects.getBoundingClientRect().top;

  projects.style.position = 'absolute';
  projects.style.zIndex = 1000;
  document.body.append(projects);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    projects.style.left = pageX - shiftX + 'px';
    projects.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    projects.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    projects.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');
    if (projectDroppable != droppableBelow) {
      if (projectDroppable) { // null when we were not over a droppable before this event
        window.location.href = './index.html';
      }
      projectDroppable = droppableBelow;
      if (projectDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        window.location.href = './projects.html';
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  projects.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    projects.onmouseup = null;
  };

};



projects.ondragstart = function () {
  return false;
};

home.addEventListener("click", function(){
  window.location.href = './index.html';

})

function mediaQuery(viewport) {
  if (viewport.matches) { // If media query matches
    projects.classList.remove("fa-2x");
    contact.classList.remove("fa-2x");
    github.classList.remove("fa-2x");
    linkedin.classList.remove("fa-2x");
    bio.classList.remove("fa-2x");
  } else {
    projects.classList.add("fa-2x");
    contact.classList.add("fa-2x");
    github.classList.add("fa-2x");
    linkedin.classList.add("fa-2x");
    bio.classList.add("fa-2x");
  }
}

var viewport = window.matchMedia("(max-width: 600px)");
mediaQuery(viewport); // Call listener function at run time
viewport.addListener(mediaQuery);