import { inject, StateKey } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const lsService = inject(LocalStorageService);
  const user: User | null = lsService.getItem('user');

  if (user && user.token) {
    return true;
  } else {
    return false;
  }
};
