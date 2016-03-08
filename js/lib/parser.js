'use strict';

var parser = function parser() {

    var _whitelist = ['a', 'b', 'blockquote', 'code', 'del', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'i', 'img', 'li', 'oi', 'p', 'pre', 's', 'span', 'sup', 'sub', 'strong', 'ul', 'br', 'hr'];

    return {

        /**
         * parses supplied text only allowing a whitelist of html tags through
         *
         * @method parse
         * @param   {String} content [the string to parse]
         * @returns {String}         [mutated string with html tags within]
         */
        parse: function parse(content) {

            var regExp = new RegExp(/\[(.*?)\](.*?)\[\/(.*?)\]/g),
                match = undefined,
                parsed = undefined;

            while ((match = regExp.exec(content)) !== null) {

                parsed = match[0];

                if (_whitelist.indexOf(match[3]) >= 0) {

                    parsed = parsed.replace(/\[/g, '<');
                    parsed = parsed.replace(/\]/g, '>');

                    content = content.replace(match[0], parsed);
                }
            }

            return content;
        }
    };
};

module.exports = parser();