import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage);

  return from(storage.get('access')).pipe(
    switchMap((token) => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

      return next(authReq);
    })
  );
};
