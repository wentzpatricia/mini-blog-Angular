import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should navigate to New Post', () => {
    let href = fixture.debugElement
      .query(By.css('.new-post'))
      .nativeElement.getAttribute('href');
    expect(href).toEqual('/posts/new');
  });

  it('(U) should navigate to All Post', () => {
    let href = fixture.debugElement
      .query(By.css('.all-post'))
      .nativeElement.getAttribute('href');
    expect(href).toEqual('/posts');
  });

  it('(U) #openMenu() should toggle #iconMenuResponsive', () => {
    const comp = new HeaderComponent();

    expect(comp.iconMenuResponsive).withContext('close at first').toBe(false);

    comp.openMenu();
    expect(comp.iconMenuResponsive).withContext('open after click').toBe(true);

    comp.openMenu();
    expect(comp.iconMenuResponsive)
      .withContext('close after second click')
      .toBe(false);
  });

  it('(U) #openMenu() should toggle #animationItensMenuResponsive', () => {
    const comp = new HeaderComponent();

    expect(comp.animationItensMenuResponsive)
      .withContext('close at first')
      .toBe(false);

    comp.openMenu();
    expect(comp.animationItensMenuResponsive)
      .withContext('open after click')
      .toBe(true);

    comp.openMenu();
    expect(comp.animationItensMenuResponsive)
      .withContext('close after second click')
      .toBe(false);
  });
});
