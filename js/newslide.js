let $buttons = $('#buttons>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({ transform: 'translateX(-600px)' })
bindEvents()
$(next).on('click', function () {
  goToSlide(current + 1)
})
$(previous).on('click', function () {
  goToSlide(current - 1)
})

let timer = setInterval(function () {
  goToSlide(current + 1)
}, 2000)
$('.container').on('mouseenter', function () {
  window.clearInterval(timer)
}).on('mouseleave', function () {
  timer = setInterval(function () {
    goToSlide(current + 1)
  }, 2000)
})

function bindEvents() {
  $('#buttons').on('click', 'button', function (e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })
}

//
function goToSlide(index) {
  if (index > $buttons.length - 1) {
    index = 0
  } else if (index < 0) {
    index = $buttons.length - 1
  }
  if (current === $buttons.length - 1 && index === 0) {
     // 最后一张到第一张
    $slides.css({ transform: `translateX(${-($buttons.length + 1) * 600}px)` })
      .one('transitionend', function () {
        $slides.hide()
        $slides.offset() // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上这一行。
        $slides.css({ transform: `translateX(${-(index + 1) * 600}px)` }).show()
      })

  } else if (current === 0 && index === $buttons.length - 1) {
    // 第一张到最后一张
    $slides.css({ transform: `translateX(0px)` })
      .one('transitionend', function () {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(${-(index + 1) * 600}px)` }).show()
      })

  } else {
    $slides.css({ transform: `translateX(${- (index + 1) * 600}px)` })
  }
  current = index
}

function makeFakeSlides() {
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length - 1).clone(true)

  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}