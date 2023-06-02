function RegisterGeodeError(e) {
  let notificationContainer = document.querySelector('.notifications');

  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.classList = 'notifications';
    document.body.appendChild(notificationContainer);
  }

  const error = document.createElement('div');
  error.classList = 'notification error';
  if (e.message) {
    error.innerHTML = `<span>${e.message.toString()}</span>`;
  } else {
    error.innerHTML = `<span>${e}</span>`;
  }
  notificationContainer.appendChild(error);

  setTimeout(() => {
    error.style.height = '0px';
    error.style.opacity = 0;
    error.style.padding = '0px';
    error.firstElementChild.style.fontSize = '0px';

    setTimeout(() => {
      error.remove();
    }, 500);
  }, 2000);

  throw new Error(e);
}

window.onerror = (e) => {
  throw new RegisterGeodeError(e);
}

window.console.error = (e) => {
  throw new RegisterGeodeError(e);
}

window.onmessageerror = (e) => {
  throw new RegisterGeodeError(e);
}