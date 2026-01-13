const Fastify = require('fastify');
const dotenv = require('dotenv');

dotenv.config();

const app = Fastify({ logger: true });
const port = Number(process.env.PORT || 4000);

app.get('/api/v1/health', async () => ({ status: 'ok' }));

app.post('/api/v1/assistant', async (request, reply) => {
  const { type, content } = request.body || {};
  // Placeholder implementation: echo back a simple suggestion object.
  return {
    type: type || 'generic',
    suggestion: `Placeholder suggestion — content length ${String((content||'').length)}`,
  };
});

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
