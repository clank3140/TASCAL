$(function () {
    setTimeout(function () {
        $('span:contains("いいね")').parent().parent().parent().addClass('toRight');
        $('aside > section > h2').after($('.toRight'));
    }, 2000);
});
