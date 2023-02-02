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
    //error.innerHTML = `<span>${e}</span>`;
  }
  notificationContainer.appendChild(error);

  setTimeout(() => {
    error.style.opacity = 0;
  }, 2000);

  throw new Error(e);
}

window.onerror = (e) => {
  throw new RegisterGeodeError(e);
}