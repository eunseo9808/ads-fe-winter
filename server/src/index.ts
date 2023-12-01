import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

const server: FastifyInstance = Fastify({})


const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          targetCount: {
            type: 'number'
          }
        }
      },
      400: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          },
          suggestion: {
            type: 'string'
          }
        }
      },
      500: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          }
        }
      }
    }
  }
}

type Gender = 'all' | 'male' | 'female';
type Age = '15-19' | '20-24' | '25-29' | '30-34' | '35-39' | '40-49' | '50';

interface IQuerystring {
  ages: string,
  gender: Gender,
}

const ageMap: Record<Age, number> = {
  '15-19': 10,
  '20-24': 15,
  '25-29': 20,
  '30-34': 25,
  '35-39': 30,
  '40-49': 40,
  '50': 50,
}
const genderMap: Record<Gender,number> = {
  all: 60,
  male: 30,
  female: 30,
};

server.get<{
  Querystring: IQuerystring
}>('/target-count', opts, async (request, reply) => {

  if(request.query.ages === undefined && request.query.gender === undefined) {
    return reply.code(400).send({error: 'age and gender is required'})
  }

  if(request.query.ages === undefined) {
    return reply.code(400).send({ error: 'ages is required', suggestion: '15-19,20-24,25-29,30-34,35-39,40-49,50' })
  }

  if(request.query.gender === undefined) {
    return reply.code(400).send({ error: 'gender is required', suggestion: 'all or male or female'})
  }

  if(request.query.ages.split(',').some((age) => !(age in ageMap))) {
    return reply.code(400).send({ error: 'invalid age', suggestion: '15-19,20-24,25-29,30-34,35-39,40-49,50' })
  }

  if(genderMap[request.query.gender] === undefined) {
    return reply.code(400).send({error: 'invalid gender', suggestion: 'all or male or female'})
  }


  const sumOfAgeValue = (request.query.ages ?? []).split(',').map<number>((age) => ageMap[age as Age]).reduce((a, b) => a + b, 0) ?? 0;
  const genderValue = genderMap[request.query.gender] ?? 0;
  const targetCount = sumOfAgeValue * genderValue;

  return { targetCount }
})

const start = async () => {
  try {
    await server.listen({ port: 4989 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log(`Server is listening on port ${port}`)

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()