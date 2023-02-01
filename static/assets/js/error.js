function RegisterGeodeError(e) {
  let notificationContainer = document.querySelector('.notifications');

  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.classList = 'notifications';
    document.body.appendChild(notificationContainer);
  }

  const error = document.createElement('div');
  error.classList = 'notification error';
  error.innerHTML = `<span>${e.toString()}</span>`;


  throw new Error(e);
}

window.onerror = (e) => {
  throw new RegisterGeodeError(e);
}