import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputAltaComponent } from './output-alta.component';

describe('OutputAltaComponent', () => {
  let component: OutputAltaComponent;
  let fixture: ComponentFixture<OutputAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
