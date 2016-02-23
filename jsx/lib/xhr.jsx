

var fetch = function (url, options) {

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function () {
            resolve(JSON.parse(xhr.response));
        };

        xhr.onerror = function () {
            reject(JSON.parse(xhr.response));
        };

        xhr.send();
        
    });
};