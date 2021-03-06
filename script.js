(function($) {
  var friendId = getUrlParameter('f');
  var FRIENDS = [
    {
      name: "GĐ A.Minh",
      id: "KKO18SHD"
    },
    {
      name: "Gia Đình A.Tân",
      id: "KKOH8SHD"
    },
    {
      name: "Giao",
      id: "KKOH8S88"
    },
    {
      name: "Gia Đình A.Tiến",
      id: "XN9GWGWJ"
    },
    {
      name: "Anh Đức (VietIS)",
      id: "N3W3ABFP"
    },
    {
      name: "Hậu (VietIS)",
      id: "ASJDODDI"
    },
    {
      name: "Bách (VietIS)",
      id: "FIASLDDG"
    },
    {
      name: "Huy (VietIS)",
      id: "UENSLFS"
    },
    {
      name: "Mai (VietIS)",
      id: "UDI9LSN"
    },
    {
      name: "A.Tân (VietIS)",
      id: "UDIOOJ"
    },
    {
      name: "Loanさん",
      id: "OO7HDJK"
    },
  ]

  var mFriend = FRIENDS.find(x => x.id === friendId);
  if (!mFriend) {
    return;
  } else {
    $("#friend-display-name").text(mFriend.name);
    $(".main").fadeIn(1000);
  }

  var MODE = {
    BIATHU: "BIATHU",
    SUBBIATHU: "SUBBIATHU",
    DETAIL: "DETAIL",
    GALLERY: "GALLERY",
  }

  var viewBiaThu = $("#view-bia-thu");
  var viewSubBiaThu = $("#view-sub-bia-thu");
  var viewDetail = $("#view-detail");
  var viewDonate = $("#view-donate");

  var bodyHeight = $("body").height();

  if (bodyHeight <= 710 && bodyHeight > 675) {
    viewDetail.find('.detail-body').css("font-size", "9,5px");
  } else if (bodyHeight <= 675 && bodyHeight > 640) {
    viewDetail.find('.detail-body').css("font-size", "9px");
  } else if (bodyHeight <= 640 && bodyHeight > 620) {
    viewDetail.find('.detail-body').css("font-size", "9,5px");
  } else if (bodyHeight <= 620) {
    viewDetail.find('.detail-body').css("font-size", "8px");
  }

  var currentMode = MODE.BIATHU;
  var preMode = false;
  var biathuContent = $("#bia-thu-content");
  var biathuBtn = $("#bia-thu-btn");
  var detailBtn = $("#detail-btn");
  var topBtn = $("#top-btn");

  let currentDate = new Date()
  let startDate = new Date("2022-05-01T11:00:00+07:00");
  let seconds = Math.round((startDate.getTime() - currentDate.getTime()) / 1000);

  var detailTimeDay = $("#detail-time-d");
  var detailTimeHour = $("#detail-time-h");
  var detailTimeMinute = $("#detail-time-m");
  var detailTimeSecond = $("#detail-time-s");

  biathuContent.height(viewBiaThu.height());
  biathuContent.width(viewBiaThu.width()-45);

  biathuBtn.click(function() {
    changeMode(MODE.SUBBIATHU);
  });

  detailBtn.click(function(){
    if (currentMode === MODE.DETAIL) {
      changeMode(MODE.GALLERY);
    } else {
      changeMode(MODE.DETAIL);
    }
  })

  topBtn.click(function() {
    changeMode(MODE.DETAIL);
  })

  function changeMode (mode) {
    if (mode === currentMode) {
      return;
    }

    preMode = currentMode;
    currentMode = mode;
    update ();
  }

  function update () {
    if (currentMode === MODE.SUBBIATHU) {
      viewSubBiaThu.css("background", "#fff7f2");
      if (preMode === MODE.BIATHU) {
        hideView(viewBiaThu);
      }
    }

    if (currentMode === MODE.DETAIL) {
      if (preMode === MODE.SUBBIATHU) {
        viewDetail.css("transform", "translateX(-180%) rotate(-15deg)");
        setTimeout(function() {
          viewDetail.css("left", "0");
          viewDetail.css("top", "0");
          viewDetail.css("bottom", "0");
          viewDetail.css("height", "100%");
          viewDetail.css("transform", "translateX(0) rotate(0)");
          viewDetail.css("z-index", "4");
          viewDetail.css("border-radius", "0");
          viewDonate.css("z-index", "3");
          setTimeout(function() {
            viewDonate.show();
          }, 1000)
        }, 1000);
      }
      else {
        viewDetail.css("transform", "translateY(0)");
      }
    }

    if (currentMode === MODE.GALLERY) {
      if (preMode === MODE.DETAIL) {
        viewDetail.css("transform", "translateY(100%)");
      }
    }
  }

  function hideView(view) {
    view.css('transform', 'rotateY(90deg)');
  }

  function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
      return false;
  }

  function updateViewDetailTime () {
    var mSeconds = seconds;
    var days = Math.floor(mSeconds / (3600*24));
    mSeconds  -= days*3600*24;
    var hrs   = Math.floor(mSeconds / 3600);
    mSeconds  -= hrs*3600;
    var minutes = Math.floor(mSeconds / 60);
    mSeconds  -= minutes*60;
  
    detailTimeDay.text(days);
    detailTimeHour.text(hrs);
    detailTimeMinute.text(minutes);
    detailTimeSecond.text(mSeconds);
  }

  setInterval(function(){
    seconds--;
    updateViewDetailTime();
  }, 1000)
})(jQuery)
