import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirComponent } from './transferir.component';

describe('TransferirComponent', () => {
  let component: TransferirComponent;
  let fixture: ComponentFixture<TransferirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
