// console.log( $('li') )
// console.log( $('[class|=col]') )
// console.log( $('.list-group > .list-group-item') )
// console.log( $('.list-group').children('.list-group-item') )
// console.log( $('.list-group > .list-group-item:nth-child(1)') )
// console.log( $('[id]') )

// const $li = $('.list-group-item').eq(2)
// // const $heading = $li.parent().prev()
// const $heading = $li.closest('.panel').find('.panel-heading')
// const text = $heading.contents().filter(function() {
//   return this.nodeType === Node.TEXT_NODE;
// }).text().trim()
 console.log( "sun" )
var count = 1;
const $panels = $('.panel').find('h2').next('div')
$panels.each(function () {
  $(this).text("("+count+")");
  count++; 
})

$headings = $('.panel-heading')
// $headings.next().hide()
$headings.on('click', function (e) {
  // console.log(this)
  const $ul = $(this).next()
  $ul.slideToggle()
})