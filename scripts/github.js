let githubDroppable = null;

github.onmousedown = function (event) {

  let shiftX = event.clientX - github.getBoundingClientRect().left;
  let shiftY = event.clientY - github.getBoundingClientRect().top;

  github.style.position = 'absolute';
  github.style.zIndex = 1000;
  document.body.append(github);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    github.style.left = pageX - shiftX + 'px';
    github.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    github.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    github.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');
    if (githubDroppable != droppableBelow) {
      if (githubDroppable) { // null when we were not over a droppable before this event
        window.location.href = './index.html';
    }
      githubDroppable = droppableBelow;
      if (githubDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        window.location.href = 'https://github.com/boundsalexis';
    }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  github.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    github.onmouseup = null;
  };

};



github.ondragstart = function () {
  return false;
};