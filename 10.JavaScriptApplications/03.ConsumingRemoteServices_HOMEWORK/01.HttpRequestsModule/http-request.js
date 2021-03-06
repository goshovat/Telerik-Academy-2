var httpRequest = (function () {
    var getHttpRequest, makeRequest, getJson, postJson;
    getHttpRequest = (function () {
        var xmlHttpFactories;
        xmlHttpFactories = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];
        return function () {
            var xmlFactory, _i, _len;
            for (_i = 0, _len = xmlHttpFactories.length; _i < _len; _i++) {
                xmlFactory = xmlHttpFactories[_i];
                try {
                    return xmlFactory();
                } catch (_error) {

                }
            }
            return null;
        };
    })();

    makeRequest = function (options) {
        var httpRequest, requestUrl, type, success, error, contentType, accept, data;
        httpRequest = getHttpRequest();
        options = options || {};
        //extract the values from the options and provide default values for the missing arguments
        requestUrl = options.url;
        type = options.type || 'GET';
        success = options.success || function () {
        };
        error = options.error || function () {
        };
        contentType = options.contentType || '';
        accept = options.accept || '';
        data = options.data || null;

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                switch (Math.floor(httpRequest.status / 100)) {
                    case 2:
                        success(httpRequest.responseText);
                        break;
                    default:
                        error(httpRequest.responseText);
                        break;
                }
            }
        };
        httpRequest.open(type, requestUrl, true);
        httpRequest.setRequestHeader('Content-Type', contentType);
        httpRequest.setRequestHeader('Accept', accept);
        return httpRequest.send(data);
    };

    getJson = function (url) {
        var deferred = Q.defer();
        makeRequest({
            url: url,
            contentType: 'application/json',
            success: function (string) {
                var json = JSON.parse(string);
                deferred.resolve(json);
            },
            error: function (data) {
                deferred.reject(data);
            }
        });


        return deferred.promise;
    };

    postJson = function (url, json) {
        var deferred = Q.defer();
        makeRequest({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(json),
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (data) {
                deferred.reject(data);
            }
        });
        return deferred.promise;
    };

    return {
        getJson: getJson,
        postJson: postJson
    }
})();