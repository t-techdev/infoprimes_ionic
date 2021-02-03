import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, IonSelect } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { UserService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';

@Component({
  selector: 'page-profession-edit',
  templateUrl: './profession-edit.page.html',
  styleUrls: ['./profession-edit.page.scss'],
})
export class ProfessionEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('employmentSelect') employmentSelect: IonSelect;
  public data: any;
  public detailData: any = {};
  public company: string;
  public jobTitle: string;
  public salary: string;
  public income: string;
  public actionBtnAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public uiUtility: UiUtilsService,
    public userService: UserService,
    public apiService: ApiService,
    private appGlobal: AppGlobals
  ) {
    
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      company: new FormControl('', Validators.compose([

      ])),
      jobTitle: new FormControl('', Validators.compose([

      ])),
      salary: new FormControl('', Validators.compose([
        Validators.required
      ])),
      income: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.data = this.navParams.get('data');
    if(this.data.details) {
      this.detailData = this.data.details.data;
    } else {
      this.detailData = {};
      this.detailData['employer'] = '';
      this.detailData['profession'] = '';
      this.detailData['salary'] = '';
      this.detailData['other_gross_income'] = '';
    }
    this.init();
  }

  init() {
    this.company = this.detailData.employer;
    this.jobTitle = this.detailData.profession;
    this.salary = this.detailData.salary;
    this.income = this.detailData.other_gross_income;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  saveClick() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('salary').hasError('required') && !this.formGroup.get('income').hasError('required')) {
      this.save();
    }
  }

  save() {
    if(this.data.hasOwnProperty('details')) {
      this.data.details.data.employer = this.company;
      this.data.details.data.profession = this.jobTitle;
      this.data.details.data.salary = this.salary;
      this.data.details.data.other_gross_income = this.income;
      this.data.details.data.contact_id = this.data.id;
    } else {
      this.data.details = {};
      this.data.details['data'] = {};
      this.data.details.data['employer'] = this.company;
      this.data.details.data['profession'] = this.jobTitle;
      this.data.details.data['salary'] = this.salary;
      this.data.details.data['other_gross_income'] = this.income;
      this.data.details.data['contact_id'] = this.data.id;
    }

    this.uiUtility.showLoader();
    this.apiService.patch('/client/fna/' + this.userService.fnaId +'/contact/' + this.data.id, this.data)
      .subscribe((res) => {
        this.userService.setAccessToken(res);
        this.uiUtility.hideLoader();
        this.close();
      },
      (e) => {
        this.close();
      });  
  }

  openEmployeeSelect() {
    this.employmentSelect.open();
  }

}
