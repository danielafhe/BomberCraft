document.querySelector('#infoButton').addEventListener('click', function (event) {
    var element = document.querySelector('#infoPopup');
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
});