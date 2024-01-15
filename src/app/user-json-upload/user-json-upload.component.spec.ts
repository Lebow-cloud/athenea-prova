import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJsonUploadComponent } from './user-json-upload.component';

describe('UserJsonUploadComponent', () => {
  let component: UserJsonUploadComponent;
  let fixture: ComponentFixture<UserJsonUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserJsonUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserJsonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
