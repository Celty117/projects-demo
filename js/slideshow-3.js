$('.images > img:nth-child(1)').addClass('current')
$('.images > img:nth-child(2)').addClass('enter')
$('.images > img:nth-child(3)').addClass('enter')
$('.images > img:nth-child(4)').addClass('enter')
$('.images > img:nth-child(5)').addClass('enter')

let n = 1
setInterval(() => {
  $(`.images>img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
  $(`.images>img:nth-child(${x(n + 1)})`).removeClass('enter').addClass('current')
  $(`.images>img:nth-child(${x(n + 2)})`).removeClass('leave').addClass('enter')
  n += 1
}, 2000)

function x(n) {
  if (n > 5) {
    n = n % 5
    if (n === 0) {
      n = 5
    }
  }
  return n
}