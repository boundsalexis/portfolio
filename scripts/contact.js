let contactDroppable = null;

contact.onmousedown = function (event) {

  let shiftX = event.clientX - contact.getBoundingClientRect().left;
  let shiftY = event.clientY - contact.getBoundingClientRect().top;

  contact.style.position = 'absolute';
  contact.style.zIndex = 1000;
  document.body.append(contact);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    contact.style.left = pageX - shiftX + 'px';
    contact.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    contact.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    contact.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');
    if (contactDroppable != droppableBelow) {
      if (contactDroppable) { // null when we were not over a droppable before this event
        window.location.href = './index.html';
      }
      contactDroppable = droppableBelow;
      if (contactDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        window.location.href = './contact.html';

      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  contact.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    contact.onmouseup = null;
  };

};



contact.ondragstart = function () {
  return false;
};