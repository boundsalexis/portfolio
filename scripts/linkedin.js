let linkedinDroppable = null;

linkedin.onmousedown = function (event) {

  let shiftX = event.clientX - linkedin.getBoundingClientRect().left;
  let shiftY = event.clientY - linkedin.getBoundingClientRect().top;

  linkedin.style.position = 'absolute';
  linkedin.style.zIndex = 1000;
  document.body.append(linkedin);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    linkedin.style.left = pageX - shiftX + 'px';
    linkedin.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    linkedin.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    linkedin.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');
    if (linkedinDroppable != droppableBelow) {
      if (linkedinDroppable) { // null when we were not over a droppable before this event
        window.location.href = './index.html';
      }
      linkedinDroppable = droppableBelow;
      if (linkedinDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        window.location.href = 'https://www.linkedin.com/in/alexis-bounds-9b7711169/';
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  linkedin.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    linkedin.onmouseup = null;
  };

};


linkedin.ondragstart = function () {
  return false;
};