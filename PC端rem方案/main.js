function debounce(fn, delay) {
  var timer = null
  return function() {
    var args = arguments
    var context = this
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}

function setAdaptive() {
  var baseFontSize = 20
  // 页面的最小宽度
  var pageMinWidth = 1300
  // 和width有关
  var winWidth = 0
  var winHeight = 0
  if (window.innerWidth) {
    winWidth = window.innerWidth
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth
  }
  if (window.innerHeight) {
    winHeight = window.innerHeight
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
  }
  // 通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winWidth = document.documentElement.clientWidth
    winHeight = document.documentElement.clientHeight
  }
  if (winWidth <= pageMinWidth) {
    winWidth = pageMinWidth
  }
  var fontScale = winWidth / 1920
  var fontSize = baseFontSize * fontScale
  var metaEl = document.documentElement
  metaEl.style.fontSize = fontSize + 'px'
  window.adaptive = {
    winHeight: winHeight,
    winWidth: winWidth,
    fontSize: fontSize,
    baseFontSize: baseFontSize,
    zoom: fontSize / baseFontSize
  }
}

setAdaptive()

function reloadPage() {
  setAdaptive()
}
window.onresize = debounce(reloadPage, 250)
