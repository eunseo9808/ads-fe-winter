"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)({});
const opts = {
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
};
const ageMap = {
    '15-19': 10,
    '20-24': 15,
    '25-29': 20,
    '30-34': 25,
    '35-39': 30,
    '40-49': 40,
    '50': 50,
};
const genderMap = {
    all: 60,
    male: 30,
    female: 30,
};
server.get('/target-count', opts, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (request.query.ages === undefined && request.query.gender === undefined) {
        return reply.code(400).send({ error: 'age and gender is required' });
    }
    if (request.query.ages === undefined) {
        return reply.code(400).send({ error: 'ages is required', suggestion: '15-19,20-24,25-29,30-34,35-39,40-49,50' });
    }
    if (request.query.gender === undefined) {
        return reply.code(400).send({ error: 'gender is required', suggestion: 'all or male or female' });
    }
    if (request.query.ages.split(',').some((age) => !(age in ageMap))) {
        return reply.code(400).send({ error: 'invalid age', suggestion: '15-19,20-24,25-29,30-34,35-39,40-49,50' });
    }
    if (genderMap[request.query.gender] === undefined) {
        return reply.code(400).send({ error: 'invalid gender', suggestion: 'all or male or female' });
    }
    const sumOfAgeValue = (_b = ((_a = request.query.ages) !== null && _a !== void 0 ? _a : []).split(',').map((age) => ageMap[age]).reduce((a, b) => a + b, 0)) !== null && _b !== void 0 ? _b : 0;
    const genderValue = (_c = genderMap[request.query.gender]) !== null && _c !== void 0 ? _c : 0;
    const targetCount = sumOfAgeValue * genderValue;
    return { targetCount };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 4989 });
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
        console.log(`Server is listening on port ${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
