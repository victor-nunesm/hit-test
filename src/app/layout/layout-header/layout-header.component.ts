import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from '@core/models'
import { AuthService, LocalStorageService } from '@core/services'
import {
  NbDialogRef,
  NbDialogService,
  NbMenuItem,
  NbMenuService,
  NbSidebarState,
  NbToastrService,
} from '@nebular/theme'
import { mustMatch } from '@shared/helpers'
import { CoreStateService } from '@store/core'
import { combineLatest, filter, map, Observable, startWith, Subject, take, takeUntil } from 'rxjs'

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('profileModal') profileModal: TemplateRef<any>
  @ViewChild('companyModal') companyModal: TemplateRef<any>
  private unsubscribe$ = new Subject()
  @Input() state: NbSidebarState
  @Output() toggleCompactMenu = new EventEmitter()
  disabled = false
  loading = false
  selectLabelParam = 'name'
  profileModalRef: NbDialogRef<TemplateRef<any>>
  selectValueParam
  user$: Observable<User>
  userMenuTag = 'header-user-menu'
  menuItems: NbMenuItem[] = [{ title: 'Perfil' }]
  profileForm: FormGroup
  passwordForm: FormGroup
  coreLoading$: Observable<boolean>
  hasValidForm$: Observable<boolean>

  constructor(
    private localStorage: LocalStorageService,
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private coreState: CoreStateService,
    private toastr: NbToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.authenticatedUser as Observable<User>
    this.coreLoading$ = this.coreState.getLoading()
    this.userMenuEvents()
    this.createUserProfileForm()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  submitProfileForm() {
    this.hasValidForm$.pipe(take(1)).subscribe((hasValidForm) => {
      if (hasValidForm) {
        const password = this.passwordForm.getRawValue()
        const manager = { ...this.profileForm.getRawValue(), ...password }
        manager.bornDate = new Date(manager.bornDate).toISOString()

        if (!this.profileForm.pristine && this.profileForm.valid) {
          // requests.push(this.customerService.updateManager(manager))
        }
        if (!this.passwordForm.pristine && this.passwordForm.valid) {
          // requests.push(this.customerService.updateManagerPassword(manager))
        }

        this.coreState.setLoading(true)

        setTimeout(() => {
          this.coreState.setLoading(false)
          this.toastr.success('', 'Dados atualizados com sucesso')
          this.profileModalRef.close()
        }, 1000)
      }
    })
  }

  private userMenuEvents() {
    this.nbMenuService
      .onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event) => event.tag === this.userMenuTag)
      )
      .subscribe(({ item, tag }) => {
        const menu = this.menuItems.find((v) => v.title === item.title)

        switch (menu?.title) {
          case 'Perfil':
            this.profileModalRef = this.dialogService.open(this.profileModal)
            break

          case 'Sair':
            this.authService.logout()
            break

          default:
            break
        }
      })
  }

  private reloadSameUrl() {
    const currUri = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigateByUrl(currUri))
  }

  private createUserProfileForm() {
    this.user$
      .pipe(take(1))
      .subscribe((user) => {
        this.profileForm = this.fb.group({
          id: user.id,
          name: [user.name, [Validators.required]],
          email: [{ value: user.email, disabled: true }],
          bornDate: [user.bornDate, Validators.required],
          phoneNumber: [user.phoneNumber, [Validators.required]],
        })
        this.passwordForm = this.fb.group(
          {
            password: [''],
            passwordConfirm: [''],
          },
          { validators: mustMatch('password', 'passwordConfirm') }
        )
        this.hasValidForm$ = this.hasValidForm()
      })
      .unsubscribe()
  }

  private hasValidForm() {
    return combineLatest([
      this.profileForm.valueChanges.pipe(
        startWith(this.profileForm.value),
        map((v) => this.profileForm.valid && !this.profileForm.pristine)
      ),
      this.passwordForm.valueChanges.pipe(
        startWith(this.passwordForm.value),
        map((v) => this.passwordForm.valid && !this.passwordForm.pristine)
      ),
    ]).pipe(map((_) => _.some((v) => v === true)))
  }
}
