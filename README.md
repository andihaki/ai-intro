# run it locally

- context window size. bigger means better results, but will slower.

# strategi buat bikin AI

1. kasih fakta di prompt; jadi ada context biar jawaban ga melenceng
2. kasih template buat kasih jawaban pas AI ga ngerti harus jawab apa
3. batasin scope. supaya AI ga bisa disuruh ngadi-ngadi
4. jangan percaya 100% ke model. perlu: sanitize n validasi inputan,

## HuggingFace

```bash
bun add @huggingface/interface
```

## coba bikin OnePiece agent

- bikin agent di https://console.mistral.ai/build/playground .
- instructions bisa custom sendiri, atau pake [OnePiece](./packages/api/prompts/chatbot.txt)
- paste agent id di .env MISTRAL_AGENT_ID

# bikin Ripiew Summarizer

## run mysql pake docker

## install api dependencies

```bash
bun add -d prisma@7.10.0
bun add @prisma/client
bunx prisma init
bunx prisma migrate dev
bunx prisma generate
bunx prisma db seed
```

## connect to db

di .env tambahin `DATABASE_URL= 'mysql://root:***@localhost:3306/review_summarizer'`

## migrasi db

```bash
bunx prisma migrate dev
```
