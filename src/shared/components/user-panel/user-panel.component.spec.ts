import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPanelComponent } from './user-panel.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelComponent],
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
