import axios from "../configs/youtube";

export async function getSubscribtions(token, logout, maxResults = 30) {
    try {
        // каналы пользователя - id`s
        const channels = await axios.get('/subscriptions', {
                params: {
                    part: "snippet",
                    mine: true,
                    maxResults: maxResults
                },
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            })
        ;

        // if (channels) {
        //     setSubscribtions(channels.data.items);
        // }
    } catch (e) {
        // 1 часовой OAuth token from firebase handler error
        const storageName = 'userData';
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data) {
            logout();
        }
    }
}