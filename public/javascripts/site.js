$(document).ready(function () {
  function detectLanguage() {
    if (!$.cookie('language')) {
      let userLang = navigator.language || navigator.userLanguage;
      const codes = $('#lang-picker a').map(function () { return $(this).data('lang'); }).toArray();
      console.log('codes', codes);

      let finalLang = ''
      if (codes.includes(userLang)) {
        finalLang = userLang;
      } else {
        userLang = userLang.replace(/-\w*/, '');
        if (codes.includes(userLang)) {
          finalLang = userLang;
        }
      }

      if (finalLang && finalLang !== 'en') {
        $.cookie('language', finalLang, { expires: 30 });
        window.location.reload();
      }
    }
  }
  detectLanguage();

  $('#lang-picker li a').click(function () {
    const lang = $(this).data('lang');
    $.cookie('language', lang, { expires: 30 });
    window.location.reload();
  });
});