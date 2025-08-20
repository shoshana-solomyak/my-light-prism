import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

import { maskFields } from "../common/functions/mask-fields.function";

const HTTP = "HTTP";
const reqChalk = chalk.bgYellow(chalk.black(">> Req (in)"));
const resChalk = chalk.bgYellow(chalk.black("<< Res (out)"));

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(HTTP);

    use(request: Request, response: Response, next: NextFunction) {
        if (request.originalUrl === "/api/health") {
            next();
            return;
        }

        if (!request.baseUrl.match(/(api)/)) {
            next();
            return;
        }

        const startTime = Date.now();
        this.logRequest(request);
        this.logRequestBody(request);
        response.on("finish", () => {
            this.logResponse(response, startTime);
        });

        next();
        return;
    }

    private logRequest(request: Request) {
        const { method, originalUrl } = request;
        const methodAndUrl = chalk.green(`${method} {${originalUrl}}`);

        this.logger.log(`${reqChalk} ${methodAndUrl}`);
    }

    private logRequestBody(request: Request) {
        const { body } = request;
        const bodyToLog = this.generateBodyToLog(body);
        if (typeof bodyToLog !== "object") {
            return;
        }
        const bodyToLogStr = JSON.stringify(bodyToLog);
        if (!bodyToLogStr.length || bodyToLogStr === "{}") {
            return;
        }

        this.logger.verbose(`> Body: ${bodyToLogStr}`);
    }

    private logResponse(response: Response, startTime: number) {
        const endTime = Date.now();
        const timeElapsed = endTime - startTime;
        const time = chalk.yellow(`+${timeElapsed}ms`);

        const { statusCode } = response;
        const isError = statusCode >= 400 && statusCode < 600;
        const statusChalk = chalk[isError ? "bgRedBright" : "bgGreenBright"](
            chalk.black(statusCode),
        );

        this.logger.log(`${resChalk} ${statusChalk} ${time}`);
    }

    /**
     * TODO: When production is stable, consider removing logging.
     */
    private generateBodyToLog(body: unknown): unknown {
        /** Copy of `body` for potential manipulation. */
        try {
            const bodyToLog = JSON.parse(JSON.stringify(body)) as unknown;
            if (process.env.NODE_ENV === "production") {
                maskFields(bodyToLog);
            }
            return bodyToLog;
        } catch (e) {
            this.logger.error("Error parsing body to log");
            this.logger.verbose(e);
            return;
        }
    }
}
