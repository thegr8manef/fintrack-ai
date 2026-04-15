/**
 * API Gateway — Proxy Controller
 *
 * Catches ALL incoming requests via the @All("*") wildcard route and
 * forwards them to the appropriate backend microservice using fetch().
 *
 * Flow:
 * 1. Strips the global /api/v1 prefix from the URL
 * 2. Looks up the target service via ProxyService.getServiceUrl()
 * 3. Forwards the request (method, headers, body) to the target
 * 4. Returns the service response back to the client
 *
 * Error handling: Returns 404 for unmatched routes, 502 for unavailable services.
 */
import { Controller, All, Req, Res, HttpStatus } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { ProxyService } from "./proxy.service";

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All("*")
  async proxy(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const rawUrl = (req as any).url as string;
    // Strip global prefix /api/v1 to get the service path
    const url = rawUrl.replace(/^\/api\/v1/, "") || "/";
    const serviceUrl = this.proxyService.getServiceUrl(url);

    if (!serviceUrl) {
      return reply.status(HttpStatus.NOT_FOUND).send({
        statusCode: 404,
        message: `No service route found for ${url}`,
      });
    }

    const targetUrl = `${serviceUrl}${url}`;

    try {
      const headers: Record<string, string> = {};
      for (const [key, value] of Object.entries(req.headers)) {
        if (value && !["host", "connection"].includes(key.toLowerCase())) {
          headers[key] = Array.isArray(value) ? value.join(", ") : value;
        }
      }

      const isBodyMethod = !["GET", "HEAD"].includes(req.method);
      const response = await fetch(targetUrl, {
        method: req.method,
        headers,
        body: isBodyMethod && req.body ? JSON.stringify(req.body) : undefined,
      });

      const responseBody = await response.text();
      reply.status(response.status);
      response.headers.forEach((value, key) => {
        if (!["transfer-encoding", "connection"].includes(key.toLowerCase())) {
          reply.header(key, value);
        }
      });
      return reply.send(responseBody);
    } catch {
      return reply.status(HttpStatus.BAD_GATEWAY).send({
        statusCode: 502,
        message: `Service unavailable`,
      });
    }
  }
}
