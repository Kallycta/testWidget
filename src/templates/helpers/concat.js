module.exports = function () {
    // noinspection ES6ConvertVarToLetConst
    var outStr = '';
    // noinspection ES6ConvertVarToLetConst
    for (var arg in arguments) {
        // noinspection JSUnfilteredForInLoop
        if (typeof arguments[arg] != 'object') {
            // noinspection JSUnfilteredForInLoop
            outStr += arguments[arg];
        }
    }
    return outStr;
};
