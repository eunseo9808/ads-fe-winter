# Getting Started

```bash
# Client
cd client && npm i && npm run dev
# Server
cd server && npm i && npm run dev
```


# Tech

## Client
- React
- Typescript
- Vite
  
## Server
- Nodejs
- Typescript
- Fastify


# Server API
- GET http://localhost:4989/target-count
  - request
    - query-string
      - ages: '15-19' | '20-24' | '25-29' | '30-34' | '35-39' | '40-49' | '50'
      - gender: 'all' | 'male' | 'female'
  - response
    - 200
      - targetCount: number
    - 400
      - error: string
      - suggestion: string
    - 500
      - error: string
