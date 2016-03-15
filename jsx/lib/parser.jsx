

const parser = function () {

    const
        _whitelist = ['a', 'b', 'blockquote', 'code', 'del', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'i', 'img', 'li', 'oi', 'p', 'pre', 's', 'span', 'sup', 'sub', 'strong', 'ul', 'br', 'hr'],
        _regExp = new RegExp(/\[(.*?)\](.*?)\[\/(.*?)\]/g),
        _tagExp = new RegExp(/(<([^>]+)>(.*?)<\/([^>]+)>)/);

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
        parse (content) {

            let match,
                parsed;

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

            return content;
        }
    };
};


module.exports = parser();