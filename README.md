# run it locally

- context window size. bigger means better results, but will slower.

# strategi buat bikin AI

1. kasih fakta di prompt; jadi ada context biar jawaban ga melenceng
2. kasih template buat kasih jawaban pas AI ga ngerti harus jawab apa
3. batasin scope. supaya AI ga bisa disuruh ngadi-ngadi
4. jangan percaya 100% ke model. perlu: sanitize n validasi inputan,

## coba bikin OnePiece agent

- bikin agent di https://console.mistral.ai/build/playground .
- instructions bisa custom sendiri, atau pake [OnePiece](./packages/api/promtps/chatbot.txt)
- paste agent id di .env MISTRAL_AGENT_ID
