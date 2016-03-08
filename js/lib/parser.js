'use strict';

var parser = function parser() {

    var _allowedTags = ['a', 'b', 'blockquote', 'code', 'del', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'i', 'img', 'li', 'oi', 'p', 'pre', 's', 'span', 'sup', 'sub', 'strong', 'ul', 'br', 'hr'];

    return {

        parse: function parse(content) {

            var regExp = new RegExp(/\[(.*?)\](.*?)\[\/(.*?)\]/g),
                match = undefined,
                parsed = undefined;

            while ((match = regExp.exec(content)) !== null) {

                parsed = match[0];
                // match[0] string to replace

                if (_allowedTags.indexOf(match[3]) >= 0) {

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