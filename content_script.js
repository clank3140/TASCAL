$(function () {
    setTimeout(function () {
        console.log('start');
        // 自要素の前に追加
        $("h1").after("<button>これはボタンです。</button>");
        console.log('end');
    }, 1000);
});
