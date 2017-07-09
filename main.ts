import { readFile, writeFile } from "fs";
import { Parser } from "stemcstudio-markdown";
import { HtmlRenderer } from "stemcstudio-markdown";
import { TexRenderer } from "stemcstudio-markdown";
import { XmlRenderer } from "stemcstudio-markdown";
import { exec } from "child_process";

const BOOK = "book";
const HTML = `${BOOK}.html`;
const LATEX = `${BOOK}.tex`;
const PDF = `${BOOK}.pdf`;
const XML = `${BOOK}.xml`;

readFile(`${BOOK}.md`, function (err, data) {
    const reader = new Parser();
    const htmlWriter = new HtmlRenderer();
    const texWriter = new TexRenderer();
    const xmlWriter = new XmlRenderer();
    const tree = reader.parse(data.toString());
    writeFile(HTML, htmlWriter.render(tree), function (err) {
        console.log(`${HTML} done!`);
    });
    writeFile(LATEX, texWriter.render(tree), function (err) {
        console.log(`${LATEX} done!`);
        exec(`xelatex ${LATEX}`, function (error, stdout, stderr) {
            console.log(`${PDF} done!`);
        });
    });
    writeFile(XML, xmlWriter.render(tree), function (err) {
        console.log(`${XML} done!`);
    });
});