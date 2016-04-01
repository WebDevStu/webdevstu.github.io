

const parser = function () {

    const
        _whitelist  = ['a', 'b', 'blockquote', 'code', 'del', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'i', 'img', 'li', 'oi', 'p', 'pre', 's', 'span', 'sup', 'sub', 'strong', 'ul'],

        _regExp     = new RegExp(/\[(.*?)\](.*?)\[\/(.*?)\]/g),
        _tagExp     = new RegExp(/(<([^>]+)>(.*?)<\/([^>]+)>)/g),
        _asciiExp   = new RegExp(/%(.*?)\ /g),

        _months     = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

        /**
         * adds the ordinal to the supplied number
         *
         * @method
         * @param   {Number} day [the day of the month to evaluate]
         * @returns {String}     [the day of the month and ordinal]
         */
        _addOrdinal = (day) => {

            let ordinal;

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

                    // take care of the square braces
                    parsed = parsed.replace(/\[/g, '<');
                    parsed = parsed.replace(/\]/g, '>');

                    // remove any onclick injected into the tag
                    parsed = parsed.replace(/onclick/gi, 'data-null');

                    // update the content
                    content = content.replace(match[0], parsed);
                } else {
                    // if outside of whitelist remove [] tags and just display
                    // the content
                    content = content.replace(match[0], match[2]);
                }
            }

            // convert self closing chars
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
        date (dateTime) {

            // 1st Apr 2016
            let date = new Date(dateTime);

            return [
                _addOrdinal(date.getDate()),
                _months[date.getMonth()],
                date.getFullYear()
            ].join(' ');
        }
    };
};


module.exports = parser();