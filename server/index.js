const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pug = require('pug');
const Ajv = require('ajv');
const ajv = new Ajv();
const oauth = require('oauth');
const fs = require('fs');
const session = require('express-session');
const https = require('https');
const rp = require('request-promise');
const JSSoup = require('jssoup').default;
const iconv = require('iconv');
const wd = require("word-definition");

app.use(express.static('assets'));
app.use('/third_party', express.static('third_party'));
app.set('views', path.resolve('./views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1); // trust first proxy

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 8080;

app.get('/', async(req, res) => {
    const path = 'https://' + req.get('host');
    res.render('site', {
        title: `French Learning`,
        url: `${path}`,
        description: 'French Learning on Passive Display',
        image: `${path}/images/share.jpg`
    });
});

app.get('/getText', async(req, res) => {
    let text = await getText('http://www.gutenberg.org/files/6099/6099-h/6099-h.htm', 'iso-8859-1');

    const soup = new JSSoup(text);

    let selected = parseTextGutenberg(soup);

    res.send({ status: 'ok', 'data': selected });
});


async function getText(url, charset) {
    let text = '';

    await rp(url, { encoding: 'binary' }, function(error, resp, body) {
        if (error) {
            console.log(url + " : " + error);
        } else {
            var buffer = convertEncodingToUTF8(charset, body);

            console.log(resp.statusCode);
            // console.log(buffer);

            text = buffer;
        }
    });

    console.log(" Text is: done");
    return text;
}

function convertEncodingToUTF8(charset, content) {
    if (charset === 'utf8' || charset === 'utf-8') {
        return content;
    } else {
        var ic = new iconv.Iconv(charset, 'UTF-8');
        var buf = ic.convert(new Buffer(content, 'binary'));

        return buf.toString('utf-8');
    }
}

function parseTextGutenberg(soup) {
    // console.log(soup);

    let pTags = soup.findAll('p');
    let newPTags = []

    for (let p of pTags) {

        // first check next tag has nothing
        if (p.nextElement.name === undefined) {

            // check its not a space
            if (p.text !== '&nbsp;') {

                // keep text to a suitable length
                if (30 < p.text.length && p.text.length < 385) {
                    newPTags.push(p);
                }
            }
        }
    }

    let random = getRandomInt(newPTags.length);
    let selected = newPTags[random].text;
    selected = selected.replace(/(?:\r\n|\r|\n)/g, ' ');

    return selected;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.post('/definition', async(req, res) => {
    let word = req.body.word;

    wd.getDef(word, "fr", null, function(definition) {
        res.send({ status: 'ok', 'data': definition });
    });
})
// https.createServer(options, app).listen(PORT, '0.0.0.0');

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});