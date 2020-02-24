chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.includes('youtube')) {
            $.get('/key', function (token) {
                var api = 'https://www.googleapis.com/youtube/v3';
                var videoId;
                if (request.includes('/watch')) {
                    api += '/videos';
                    videoId = request.replace('https://www.youtube.com/watch?v=', '');
                } else if (request.includes('/channel')) {
                    api += '/channels';
                    videoId = request.replace('https://www.youtube.com/channel/', '');
                } else if (request.includes('/playlist')) {
                    api += '/playlists';
                    videoId = request.replace('https://www.youtube.com/playlist?list=', '');
                };
                api += '?part=snippet&key=' + token + '&id=' + videoId + '&fields=items(snippet(title))';
                var title = new XMLHttpRequest();
                title.open('GET', api);
                title.responseType = 'json';
                title.send();
                title.onload = function () {
                    console.log('API : ' + api);
                    console.log(title.response);
                    var videoTitle = title.response.items[0].snippet.title;
                    console.log('send : ' + videoTitle);
                    sendResponse(videoTitle);
                };
            });
            return true;
        } else if (request.includes('nicovideo')) {
            var api;
            var videoId;
            var tag;
            if (request.includes('user')) {
                api = 'http://seiga.nicovideo.jp/api/user/info?id=';
                videoId = request.replace('http://www.nicovideo.jp/user/', '');
                tag = 'nickname';
            } else {
                api = 'http://ext.nicovideo.jp/api/getthumbinfo/';
                videoId = request.replace('http://www.nicovideo.jp/watch/', '');
                tag = 'title';
            }
            api += videoId;
            var title = new XMLHttpRequest();
            title.open('GET', api);
            title.send();
            title.onload = function () {
                console.log('API : ' + api);
                var xml = $.parseXML(title.response);
                console.log(title.response);
                var videoTitle = xml.getElementsByTagName(tag)[0].textContent;
                console.log('send : ' + videoTitle);
                sendResponse(videoTitle);
            };
            return true;
        } else if (request.includes('twitter')) {
            var api = "https://api.twitter.com/1.1/users/show.json?scree_name=";
            var screenName;
            if (request.includes('http://twitter.com')) {
                request = request.replace('http', 'https');
            };
            request = request.replace('https://twitter.com/', '');
            screenName = request.replace('/', '');
            api += screenName;
            defer.resolve([URL, id]);
        }
    });


// Twitter API