document.querySelectorAll('link[rel="stylesheet"]').forEach(element => {
    if (element.href.substring(0, 2) === './') {
        element.href = element.href.replace('./', 'https://');
    }
})
document.querySelectorAll('script').forEach(element => element.remove())
document.querySelectorAll('a').forEach(element => element.remove())
document.querySelectorAll('img').forEach(element => {
    if (element.src.substring(0, 2) === './') {
        element.src = element.src.replace('./', 'https://');
    }
})