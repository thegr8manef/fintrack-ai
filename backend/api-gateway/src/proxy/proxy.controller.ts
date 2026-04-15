import { Controller, All, Req, Res, HttpStatus } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import { ProxyService } from "./proxy.service";

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All("*")
  async proxy(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const url = (req as any).url as string;
    const serviceUrl = this.proxyService.getServiceUrl(url);

    if (!serviceUrl) {
      return reply.status(HttpStatus.NOT_FOUND).send({
        statusCode: 404,
        message: `No service route found for ${url}`,
      });
    }

    // In production, forward the request to the downstream service.
    // For now, return a stub response.
    return reply.status(HttpStatus.OK).send({
      message: `Would proxy to ${serviceUrl}${url}`,
      method: req.method,
    });
  }
}
