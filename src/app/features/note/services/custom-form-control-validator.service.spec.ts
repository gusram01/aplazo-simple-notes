import { TestBed } from '@angular/core/testing';

import { CustomFormControlValidatorService } from './custom-form-control-validator.service';

describe('CustomFormControlValidatorService', () => {
  let service: CustomFormControlValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFormControlValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
