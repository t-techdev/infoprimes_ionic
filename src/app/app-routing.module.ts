import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'assets-edit', loadChildren: './pages/assets-edit/assets-edit.module#AssetsEditPageModule' },
  { path: 'broker', loadChildren: './pages/broker/broker.module#BrokerPageModule' },
  { path: 'confirmation', loadChildren: './pages/confirmation/confirmation.module#ConfirmationPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'household-profile', loadChildren: './pages/household-profile/household-profile.module#HouseholdProfilePageModule' },
  { path: 'household-profiles', loadChildren: './pages/household-profiles/household-profiles.module#HouseholdProfilesPageModule' },
  { path: 'insurance', loadChildren: './pages/insurance/insurance.module#InsurancePageModule' },
  { path: 'insurance-invest-edit', loadChildren: './pages/insurance-invest-edit/insurance-invest-edit.module#InsuranceInvestEditPageModule' },
  { path: 'liabilities-edit', loadChildren: './pages/liabilities-edit/liabilities-edit.module#LiabilitiesEditPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'mortgage-loan-edit', loadChildren: './pages/mortgage-loan-edit/mortgage-loan-edit.module#MortgageLoanEditPageModule' },
  { path: 'my-policies', loadChildren: './pages/my-policies/my-policies.module#MyPoliciesPageModule' },
  { path: 'my-profile', loadChildren: './pages/my-profile/my-profile.module#MyProfilePageModule' },
  { path: 'paperwork', loadChildren: './pages/paperwork/paperwork.module#PaperworkPageModule' },
  { path: 'passcode', loadChildren: './pages/passcode/passcode.module#PasscodePageModule' },
  { path: 'policy', loadChildren: './pages/policy/policy.module#PolicyPageModule' },
  { path: 'policy-status', loadChildren: './pages/policy-status/policy-status.module#PolicyStatusPageModule' },
  { path: 'profession-edit', loadChildren: './pages/profession-edit/profession-edit.module#ProfessionEditPageModule' },
  { path: 'profile-edit', loadChildren: './pages/profile-edit/profile-edit.module#ProfileEditPageModule' },
  { path: 'profile-review', loadChildren: './pages/profile-review/profile-review.module#ProfileReviewPageModule' },
  { path: 'reclamation', loadChildren: './pages/reclamation/reclamation.module#ReclamationPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:registered', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:registered/:fromAppStart', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:registered/:fromAppStart/:sentEmail', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'passwordreset', loadChildren: './pages/resetpassword-confirm/resetpassword-confirm.module#ResetpasswordConfirmPageModule' },
  { path: 'passwordreset/:email/:reset_token', loadChildren: './pages/resetpassword-confirm/resetpassword-confirm.module#ResetpasswordConfirmPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'touchid', loadChildren: './pages/touchid/touchid.module#TouchidPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'offline', loadChildren: './pages/offline/offline.module#OfflinePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
