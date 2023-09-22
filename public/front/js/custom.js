

/*wow animation*/
$(document).ready(function () {
    new WOW().init();
});
/*wow animation end*/

/*navbar active*/
$(".main-nav ul li a").click(function () {
    $(".main-nav ul li a").removeClass("active");
    $(this).addClass("active");
});
/*navbar end*/


/* headar start -----------------------------------------
---------------------------------------------------------*/
$(function () {
    var header = $(".navbarscroll");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 30) {
            header.removeClass('scrollHeader').addClass("fixedHeader");
        } else {
            header.removeClass("fixedHeader").addClass('scrollHeader');
        }
    });
});
/* header scroll end -----------------------------------
--------------------------------------------------------*/

/*------------------------------------------------------
overlay hide navbar menu start ------------------------*/
function SideMenuClose() {
    $('body').hasClass('mobile-nav-active');
    $('body').removeClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
    $('.mobile-nav-overly').hide();
}
/* overlay hide navbar menu end -----------------------------------
--------------------------------------------------------*/

/*--------------------------------------------------------
tab speed start------------------------------------------------*/
$(document).ready(function () {
    $("a.scrollLink").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 50 }, 500);
    });
});



var swiper = new Swiper(".userAreSlider", {
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
      },
  });


  var swiper = new Swiper(".businesscardsslider", {
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
      },
  });


var swiper = new Swiper(".whyRich_KardSlider", {
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
      },
  });


  var swiper = new Swiper(".BenefitsSlider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3
    },

  });


   var swiper = new Swiper(".productSlider", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".productSliderTwo", {
      loop: true,
      spaceBetween: 10,
     
      thumbs: {
        swiper: swiper,
      },
    });




var swiper = new Swiper(".latestBlogs", {
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3
  },
  breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 25,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1200: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
    },
});


 //test for getting url value from attr
      // var img1 = $('.test').attr("data-thumbnail");
      // console.log(img1);

      //test for iterating over child elements
      var langArray = [];
      $('.vodiaMobilepicker option').each(function () {
         var img = $(this).attr("data-thumbnail");
         var text = this.innerText;
         var value = $(this).val();
         var item = '<li><span>' + text + '</span><img src="' + img + '" alt="" value="' + value + '"/></li>';
         langArray.push(item);
      })

      $('#countryMobileSelectList').html(langArray);

      //Set the button value to the first el of the array
      $('.countryMobileSelect').html(langArray[0]);
      $('.countryMobileSelect').attr('value', 'en');

      //change button stuff on click
      $('#countryMobileSelectList li').click(function () {
         var img = $(this).find('img').attr("src");
         var value = $(this).find('img').attr('value');
         var text = this.innerText;
         var item = '<li><span>' + text + '</span><img src="' + img + '" alt="" /></li>';
         $('.countryMobileSelect').html(item);
         $('.countryMobileSelect').attr('value', value);
         $(".countryMobileMainSelect").toggle();
         //console.log(value);
      });

      $(".countryMobileSelect").click(function () {
         $(".countryMobileMainSelect").toggle();
      });

      //check local storage for the lang
      var sessionLang = localStorage.getItem('lang');
      if (sessionLang) {
         //find an item with value of sessionLang
         var langIndex = langArray.indexOf(sessionLang);
         $('.countryMobileSelect').html(langArray[langIndex]);
         $('.countryMobileSelect').attr('value', sessionLang);
      } else {
         var langIndex = langArray.indexOf('ch');
         console.log(langIndex);
         $('.countryMobileSelect').html(langArray[langIndex]);
         //$('.countryMobileSelect').attr('value', 'en');
      }


      //test for getting url value from attr
      // var img1 = $('.test').attr("data-thumbnail");
      // console.log(img1);

      //test for iterating over child elements
      var langArray = [];
      $('.vodiapicker option').each(function () {
         var img = $(this).attr("data-thumbnail");
         var text = this.innerText;
         var value = $(this).val();
         var item = '<li><span>' + text + '</span><img src="' + img + '" alt="" value="' + value + '"/></li>';
         langArray.push(item);
      })

      $('#countrySelectList').html(langArray);

      //Set the button value to the first el of the array
      $('.countrySelect').html(langArray[0]);
      $('.countrySelect').attr('value', 'en');

      //change button stuff on click
      $('#countrySelectList li').click(function () {
         var img = $(this).find('img').attr("src");
         var value = $(this).find('img').attr('value');
         var text = this.innerText;
         var item = '<li><span>' + text + '</span><img src="' + img + '" alt="" /></li>';
         $('.countrySelect').html(item);
         $('.countrySelect').attr('value', value);
         $(".countryMainSelect").toggle();
         //console.log(value);
      });

      $(".countrySelect").click(function () {
         $(".countryMainSelect").toggle();
      });

      //check local storage for the lang
      var sessionLang = localStorage.getItem('lang');
      if (sessionLang) {
         //find an item with value of sessionLang
         var langIndex = langArray.indexOf(sessionLang);
         $('.countrySelect').html(langArray[langIndex]);
         $('.countrySelect').attr('value', sessionLang);
      } else {
         var langIndex = langArray.indexOf('ch');
         console.log(langIndex);
         $('.countrySelect').html(langArray[langIndex]);
         //$('.countrySelect').attr('value', 'en');
      }

