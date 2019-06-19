exports.setTimeoutAsync =  function setTimeoutAsync(timeout=0) {
        return new Promise(function (resolve) {
            setTimeout( function() {
                resolve();
                }, timeout);
        });
};

exports.idFromMention = function idFromMention(mention) {
    return mention.includes("!") ? mention.slice(3,-1) : mention.slice(2, -1);
};