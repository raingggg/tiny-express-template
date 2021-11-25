$(document).ready(function () {
  $('#lang-picker li a').click(function () {
    const lang = $(this).data('lang');
    $.cookie('language', lang);
    window.location.reload();
  });
});