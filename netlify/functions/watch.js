const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

exports.handler = async function(event, context) {
    const url = event.queryStringParameters.url;
    
    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                error: "No URL provided"
            })
        };
    }

    try {
        const { stdout } = await execPromise(`yt-dlp "${url}" --dump-json`);
        const info = JSON.parse(stdout);
        
        if (!info || !info.url) {
            throw new Error("No video information found");
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                url: info.url
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