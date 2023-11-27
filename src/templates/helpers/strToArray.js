module.exports = function (value) {
    var arr = [];
    value.split('').forEach(function (element) {
        arr.push('<span class="letter">' + element + '</span>');
    });
    return arr.join('');
};
