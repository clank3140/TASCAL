chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var title;
        $(function () {
            console.log('ajax');
            $.ajax({
                type: 'GET',
                url: request,
                success: function (data) {
                    title = data.match(/<title>(.*)<\/title>/);
                }
            })
            console.log('request : ' + request);
            console.log(title);
        });
        sendResponse(title);
    });
