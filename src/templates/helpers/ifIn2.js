module.exports = function (lvalue, rvalue1, rvalue2, options) {
    if (arguments.length < 4)
        throw new Error("Handlebars Helper equal needs 3 parameters");
    if (lvalue !== rvalue1 && lvalue !== rvalue2) {
        return options.inverse(this)
    } else {
        return options.fn(this)
    }
};
