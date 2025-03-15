const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

exports.handler = async function(event, context) {
    const query = event.queryStringParameters.query;
    
    if (!query) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                error: "No query provided"
            })
        };
    }

    try {
        const { stdout } = await execPromise(`yt-dlp "ytsearch100:${query}" --dump-json`);
        const result = JSON.parse(stdout);

        const videos = result.entries
            .filter(entry => entry._type === 'video' || entry.url.startsWith('https://www.youtube.com/watch?v='))
            .slice(0, 500)
            .map(entry => ({
                url: entry.url,
                title: entry.title || 'No Title',
                thumbnail: entry.thumbnails[entry.thumbnails.length - 1].url,
                channel: entry.channel || ''
            }));

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                videos: videos
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
}; 