const dotenv = require('dotenv').config();

const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getData() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST'
    };

    const { results } = await notion.request(payload);

    const items = results.map(page => {

        const data = {
            id: page.id,
            title: page.properties.Name.title[0].plain_text,
            date: page.properties.Date.date.start,
            description: page.properties.Description.rich_text[0].text.content,
            tags: page.properties.Tags.rich_text[0].text.content
        }
        return data;
    });
    return items;
}
