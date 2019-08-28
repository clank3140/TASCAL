$(function () {
    setTimeout(function () {
        $('span:contains("いいね")').parent().parent().parent().addClass('toRight');
        $('div:contains("すべて見る")').parent().addClass('subete');
        $('aside > section > h2').after($('.toRight'));
    }, 2000);
});
