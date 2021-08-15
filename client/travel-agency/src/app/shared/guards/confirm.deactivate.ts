import { CanDeactivate } from '@angular/router';
import { RegisterComponent } from '../../user/register/register.component';

export class ConfirmDeactivateGuard implements CanDeactivate<RegisterComponent> {

  canDeactivate(target: RegisterComponent) {
    if(target.hasChanges()){
        return window.confirm('Do you really want to cancel?');
    }
    return true;
  }
}