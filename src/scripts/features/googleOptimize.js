// <!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-69559557-1"></script>
// <script>
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());

// gtag('config', 'UA-69559557-1', { 'optimize_id': 'GTM-KVPL2QS'});
// </script>


(function gwm_app() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {dataLayer.push(arguments)};
  
  gtag('event', 'optimize.callback', {
    callback: (value, name) => {
      if (name == 'PicHr1-tSNiYqaiUsVvCNw' && value == 1) {
        setupMinicartABTest();
        setupLessLifestyleImagery();
        setupOnelineGiftNote();
      }
    }
  });

  function setupMinicartABTest() {
    const $minicartDropdown = $('.MiniCart__dropdown');
    $minicartDropdown.css({
        position: 'fixed',
        top: '0',
        paddingTop: $("#fsb_bar").outerHeight() + 'px',
        height: '100vh',
        border: 'none',
        display: 'none',
        gridTemplateRows: 'min-content auto min-content'
    })

    $(".MiniCart__header").css({
      display: 'flex'
    });

    $(".MiniCart__footer").css({
      borderTop: '2px solid #e0e0e0'
    })

    if ($(window).width() < 768) {
      $minicartDropdown.css({
        left: '0',
        width: "100vw"
      })
    } else {
      $minicartDropdown.css({
        left: 'auto',
        width: "auto"
      })
    }
  }

  function setupLessLifestyleImagery() {
    console.log('AB Test - Homepage less lifestyle imagery is started.');
    $('body').addClass('ABTest--LessLifestyleImagery');
  }

  function setupFlashCartABTest() {
    $('body').addClass('ABTest--FlashCart');
    $('html,body').animate({ scrollTop: 0 }, 500);
    $('.MiniCart__toggle .icon').css({ 'animationIterationCount': 'infinite' });
    $('.MiniCart__toggle .icon').addClass('bounce animated');
  }
  
  function setupOnelineGiftNote() {
    $('body').addClass('ABTest--OnelineGiftNote');
  }
})();