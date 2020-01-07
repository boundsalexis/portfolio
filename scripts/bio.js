let bioDroppable = null;

bio.onmousedown = function (event) {

  let shiftX = event.clientX - bio.getBoundingClientRect().left;
  let shiftY = event.clientY - bio.getBoundingClientRect().top;

  bio.style.position = 'absolute';
  bio.style.zIndex = 1000;
  document.body.append(bio);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    bio.style.left = pageX - shiftX + 'px';
    bio.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    bio.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    bio.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');
    if (bioDroppable != droppableBelow) {
      if (bioDroppable) { // null when we were not over a droppable before this event
        window.location.href = './index.html';
    }
      bioDroppable = droppableBelow;
      if (bioDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        window.location.href = './bio.html';
    }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  bio.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    bio.onmouseup = null;
  };

};


bio.ondragstart = function () {
  return false;
};
