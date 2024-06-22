// async function openArticle(url) {
//     try {
//         const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ url })
//         });
//         const data = await response.json();
//         console.log('data',data)
//     } catch (error) {
//         console.error("Failed to fetch article content", error);
//     }
// }