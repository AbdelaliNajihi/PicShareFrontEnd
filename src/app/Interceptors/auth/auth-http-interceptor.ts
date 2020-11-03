import { AuthService } from './../../Services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token !== null && token !== '') {
            req = req.clone({
                url: req.url,
                setHeaders: {
                    
                    'Authorization': localStorage.getItem('token'),
                }
            });
        }
        return next.handle(req);
    }
}
