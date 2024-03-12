import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const now = Date.now();

        const request = context.switchToHttp().getRequest()
        const apiName = request.route.path; // Assuming you're interested in the route path

        return next.handle().pipe(
            tap(() => console.log(`API: ${apiName} - Execution time: ${Date.now() - now}ms`)),
        );
    }
}