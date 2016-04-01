'use strict';

var parser = function parser() {

    var _whitelist = ['a', 'b', 'blockquote', 'code', 'del', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'i', 'img', 'li', 'oi', 'p', 'pre', 's', 'span', 'sup', 'sub', 'strong', 'ul'],
        _regExp = new RegExp(/\[(.*?)\](.*?)\[\/(.*?)\]/g),
        _tagExp = new RegExp(/(<([^>]+)>(.*?)<\/([^>]+)>)/g),
        _jsExp = new RegExp(/javascript:/g),
        _asciiExp = new RegExp(/%(.*?)\ /g),
        _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],


    /**
     * adds the ordinal to the supplied number
     *
     * @method
     * @param   {Number} day [the day of the month to evaluate]
     * @returns {String}     [the day of the month and ordinal]
     */
    _addOrdinal = function _addOrdinal(day) {

        var ordinal = void 0;

        switch (day) {
            case 1:
            case 21:
            case 31:
                ordinal = 'st';
                break;
            case 2:
            case 22:
                ordinal = 'nd';
                break;
            default:
                ordinal = 'th';
        }

        return day + ordinal;
    };

    return {

        /**
         * parses supplied text only allowing a whitelist of html tags through
         * the format is to removed any injected html tags, any required tag is
         * set up in the [ ] format and only a whitelist is alllowed through
         *
         * @method parse
         * @param   {String} content [the string to parse]
         * @returns {String}         [mutated string with html tags within]
         */

        parse: function parse(content) {

            var match = void 0,
                parsed = void 0;

            // blanket refuse and injected <HTMLtags>
            while ((match = _tagExp.exec(content)) !== null) {
                content = content.replace(match[0], ' ');
            }

            // convert the [ ] format tags to true HTML (if in whitelist)
            while ((match = _regExp.exec(content)) !== null) {

                parsed = match[0];

                if (_whitelist.indexOf(match[3]) >= 0) {

                    parsed = parsed.replace(/\[/g, '<');
                    parsed = parsed.replace(/\]/g, '>');

                    content = content.replace(match[0], parsed);
                } else {
                    // if outside of whitelist remove [] tags and just display
                    // the content
                    content = content.replace(match[0], match[2]);
                }
            }

            // convert faked self closing chars
            while ((match = _asciiExp.exec(content)) !== null) {
                content = content.replace(match[0], '<' + match[1] + '/>');
            }

            return content;
        },


        /**
         * parse the date time string into a nice format
         *
         * @method  date
         * @param   {String} dateTime [date time string]
         * @returns {String}          [formatted date string]
         */
        date: function date(dateTime) {

            // 1st Apr 2016
            var date = new Date(dateTime);

            return [_addOrdinal(date.getDate()), _months[date.getMonth()], date.getFullYear()].join(' ');
        }
    };
};

module.exports = parser();