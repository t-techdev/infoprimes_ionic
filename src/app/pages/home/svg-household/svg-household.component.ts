import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

import { AppGlobals } from '../../../shared/app.globals';

@Component({
  selector: 'svg-household',
  templateUrl: './svg-household.component.html',
  styleUrls: ['./svg-household.component.scss']
})
export class SvgHouseholdComponent implements OnInit, OnChanges {

  @Input() type: string;
  @Input() graphicData: any;

  public percentCoordinates = {
    "0x" : 138.16,
    "0y" : 132.26,
    "5x" : 136.86,
    "5y" : 129.29,
    "10x" : 136.19,
    "10y" : 126.06,
    "15x" : 136.22,
    "15y" : 122.74,
    "20x" : 136.96,
    "20y" : 119.49,
    "25x" : 138.33,
    "25y" : 116.47,
    "30x" : 140.29,
    "30y" : 113.8,
    "35x" : 142.75,
    "35y" : 111.59,
    "40x" : 145.59,
    "40y" : 109.94,
    "45x" : 148.72,
    "45y" : 108.91,
    "50x" : 151.98,
    "50y" : 108.57,
    "55x" : 155.27,
    "55y" : 108.91,
    "60x" : 158.37,
    "60y" : 109.94,
    "65x" : 161.22,
    "65y" : 111.59,
    "70x" : 163.69,
    "70y" : 113.8,
    "75x" : 165.65,
    "75y" : 116.47,
    "80x" : 167.04,
    "80y" : 119.49,
    "85x" : 167.79,
    "85y" : 122.74,
    "90x" : 167.87,
    "90y" : 126.06,
    "95x" : 167.17,
    "95y" : 129.29,
    "100x" : 165.87,
    "100y" : 132.26
  };
  public labelCoordinatesPrecise = {
    "0x" : 136.44,
    "0y" : 133.32,
    "2.5x" : 135.6376,
    "2.5y" : 131.7204,
    "5x" : 134.97,
    "5y" : 129.93,
    "7.5x" : 134.5149,
    "7.5y" : 128.2048,
    "10x" : 134.22,
    "10y" : 126.27,
    "12.5x" : 134.1165,
    "12.5y" : 124.5791,
    "15x" : 134.27,
    "15y" : 122.52,
    "17.5x" : 134.5364,
    "17.5y" : 120.7539,
    "20x" : 135.10,
    "20y" : 118.89,
    "22.5x" : 135.7284,
    "22.5y" : 117.206,
    "25x" : 136.64,
    "25y" : 115.49,
    "27.5x" : 137.6284,
    "27.5y" : 114,
    "30x" : 138.86,
    "30y" : 112.51,
    "32.5x" : 140.1424,
    "32.5y" : 111.2553,
    "35x" : 141.64,
    "35y" : 110.06,
    "37.5x" : 143.1532,
    "37.5y" : 109.1046,
    "40x" : 144.80,
    "40y" : 108.26,
    "42.5x" : 146.5149,
    "42.5y" : 107.6324,
    "45x" : 148.34,
    "45y" : 107.15,
    "47.5x" : 150.1089,
    "47.5y" : 106.881,
    "50x" : 151.93,
    "50y" : 106.79,
    "52.5x" : 153.7064,
    "52.5y" : 106.881,
    "55x" : 155.59,
    "55y" : 107.16,
    "57.5x" : 157.299,
    "57.5y" : 107.6324,
    "60x" : 159.07,
    "60y" : 108.27,
    "62.5x" : 160.6675,
    "62.5y" : 109.1046,
    "65x" : 162.25,
    "65y" : 110.08,
    "67.5x" : 163.6541,
    "67.5y" : 111.2553,
    "70x" : 165.01,
    "70y" : 112.52,
    "72.5x" : 166.1578,
    "72.5y" : 114,
    "75x" : 167.22,
    "75y" : 115.48,
    "77.5x" : 168.0567,
    "77.5y" : 117.206,
    "80x" : 168.77,
    "80y" : 118.82,
    "82.5x" : 169.2613,
    "82.5y" : 120.7539,
    "85x" : 169.57,
    "85y" : 122.44,
    "87.5x" : 169.7253,
    "87.5y" : 124.2272,
    "90x" : 169.64,
    "90y" : 126.16,
    "92.5x" : 169.4093,
    "92.5y" : 128,
    "95x" : 168.93,
    "95y" : 129.83,
    "97.5x" : 168.3,
    "97.5y" : 131.5,
    "100x" : 167.53,
    "100y" : 133.14
  };
  public insuranceType : string;
  public pageType : string;
  public totalHouseholdNeeds : number;
  public totalHouseholdCoverage : number;
  public totalHouseholdPercentCoverage : number;
  public userMainCoverage : number;
  public userMainPercentCoverage : number;
  public userCoapplicantCoverage : number;
  public userCoapplicantPercentCoverage : number;
  public userOtherCoverage_one : number;
  public userOtherPercentCoverage_one : number;
  public userOtherCoverage_two : number;
  public userOtherPercentCoverage_two : number;
  public userOtherCoverage_three : number;
  public userOtherPercentCoverage_three : number;
  public userOtherCoverage_four : number;
  public userOtherPercentCoverage_four : number;
  public animation_timing : number;
  public time : number;
  public interval : number;
  public currentNeeds : number;
  public currentCoverage : number;
  public needsTotal : number;
  public coverageTotal : number;
  public coverageExists: any;

  public mockData: any;
  public pageEle: string;

  public clipPathId: string;
  public clipPathIdCircle: string;

  private _viewInited: boolean;

  constructor(public appGlobal: AppGlobals) {

  }

  ngOnInit() {
    this.init();
    this._viewInited = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this._viewInited)
      return;
    if(changes['graphicData'].currentValue && !changes['graphicData'].previousValue)
      this.init();
  }

  init() {
    try {
      if(this.graphicData) {
        this.mockData = this.graphicData;
      }

      /*
      this.mockData.totalHouseholdCoverage = (
        this.mockData.userMainCoverage +
        this.mockData.userCoapplicantCoverage +
        this.mockData.userOtherCoverage_one +
        this.mockData.userOtherCoverage_two +
        this.mockData.userOtherCoverage_three +
        this.mockData.userOtherCoverage_four
      );
      */

      this.mockData.totalHouseholdCoverage = (
        this.mockData.userMainCoverage +
        this.mockData.userCoapplicantCoverage
      );

      this.insuranceType = this.type;
      this.pageType = this.mockData.pageType.toLowerCase();
      if(this.pageType == 'home') {
        this.pageEle = '#page-home';
      } else {
        this.pageEle = '#page-insurance';
      }

      this.totalHouseholdNeeds = this.mockData.totalHouseholdNeeds;
      this.totalHouseholdCoverage = this.mockData.totalHouseholdCoverage;
      this.userMainCoverage = this.mockData.userMainCoverage;
      this.userCoapplicantCoverage = this.mockData.userCoapplicantCoverage;
      this.userOtherCoverage_one = this.mockData.userOtherCoverage_one;
      this.userOtherCoverage_two = this.mockData.userOtherCoverage_two;
      this.userOtherCoverage_three = this.mockData.userOtherCoverage_three;
      this.userOtherCoverage_four = this.mockData.userOtherCoverage_four;
      this.coverageExists = this.userMainCoverage + this.userCoapplicantCoverage + this.userOtherCoverage_one + this.userOtherCoverage_two + this.userOtherCoverage_three + this.userOtherCoverage_four;
      this.totalHouseholdPercentCoverage = ((this.totalHouseholdCoverage / this.totalHouseholdNeeds) * 100);

      //sets variables for case where household needs == 0 but there is coverage (kids, extra coverage, etc.)
      if (this.totalHouseholdNeeds == 0 && this.coverageExists) {
        this.totalHouseholdPercentCoverage = 100;
        this.totalHouseholdNeeds = this.totalHouseholdCoverage;
      } else if (this.totalHouseholdNeeds == 0 && !this.coverageExists) {
        this.totalHouseholdPercentCoverage = 0;
      }



      this.userMainPercentCoverage = ((this.userMainCoverage / this.totalHouseholdNeeds) *100);
      this.userCoapplicantPercentCoverage = ((this.userCoapplicantCoverage / this.totalHouseholdNeeds) *100);
      this.userOtherPercentCoverage_one = ((this.userOtherCoverage_one / this.totalHouseholdNeeds) *100);
      this.userOtherPercentCoverage_two = ((this.userOtherCoverage_two / this.totalHouseholdNeeds) *100);
      this.userOtherPercentCoverage_three = ((this.userOtherCoverage_three / this.totalHouseholdNeeds) *100);
      this.userOtherPercentCoverage_four = ((this.userOtherCoverage_four / this.totalHouseholdNeeds) *100);
      this.animation_timing = 0;

      if (this.totalHouseholdCoverage == 0) {
        this.animation_timing = 0;
      } else if (this.totalHouseholdPercentCoverage > 0 && this.totalHouseholdPercentCoverage < 26) {
        this.animation_timing = 600;
      } else if (this.totalHouseholdPercentCoverage > 25 && this.totalHouseholdPercentCoverage < 51) {
        this.animation_timing = 700;
      } else if (this.totalHouseholdPercentCoverage > 50 && this.totalHouseholdPercentCoverage < 76) {
        this.animation_timing = 900;
      } else {
        this.animation_timing = 1350;
      }

      this.time = this.animation_timing; //milliseconds
      this.interval = 55; //milliseconds
      this.currentNeeds = 0;
      this.currentCoverage = 0;
      this.needsTotal = this.mockData.totalHouseholdNeeds;
      this.coverageTotal = this.mockData.totalHouseholdCoverage;

      this.clipPathId = this.pageType + '-rect-clip-bottom';
      this.clipPathIdCircle = 'url(#' + this.clipPathId + ')';

      const that = this;
      setTimeout(() => {
        that.startAnimation();
      }, 200);
    } catch(e) {

    }
  }

  startAnimation() {
    var that = this;
    //case of no coverage w/needs; case of coverage w/0 needs; case of coverage and needs.
    if (this.needsTotal > 0 && this.coverageTotal == 0) {
      $(that.pageEle + " #svg-" + this.insuranceType + " #coverage-amount").html(this.appGlobal.priceFormatRound(0));
      $(that.pageEle + " #svg-" + this.insuranceType + " #needs-amount").html(this.appGlobal.priceFormatRound(this.needsTotal));
    } else if (this.needsTotal == 0) {
      $(that.pageEle + " #svg-" + this.insuranceType + " #needs-amount, " + that.pageEle + " #svg-" + this.insuranceType + " .graphic-titles.needs-text, " + that.pageEle + " #svg-" + this.insuranceType + ".graphic-line").css({"display":"none"});
      $( that.pageEle + " #svg-" + this.insuranceType + " .graphic-titles.coverage-text" ).attr( "y", "120.42" );
      $( that.pageEle + " #svg-" + this.insuranceType + " #coverage-amount" ).attr( "y", "123.54" );
      this.countup(that.pageEle + " #svg-" + this.insuranceType + ' #coverage-amount', 0, this.coverageTotal, this.currentCoverage);
    } else {
      this.countup(that.pageEle + " #svg-" + this.insuranceType + ' #needs-amount', 0, this.needsTotal, this.currentNeeds);
      this.countup(that.pageEle + " #svg-" + this.insuranceType + ' #coverage-amount', 0, this.coverageTotal, this.currentCoverage);
    }

    $(that.pageEle + " #svg-" + this.insuranceType + ' #chart').removeClass('animated');
    $(that.pageEle + " #svg-" + this.insuranceType + ' #chart').addClass('animated');

    $(that.pageEle + " #svg-" + this.insuranceType + " #chart[class$='-graphic']").removeClass();
    $(that.pageEle + " #svg-" + this.insuranceType + " #chart[class^='graphic-']").removeClass();
    $(that.pageEle + " #svg-" + this.insuranceType + " #chart").addClass(this.pageType + "-graphic");
    $(that.pageEle + " #svg-" + this.insuranceType + " #chart").addClass("graphic-" + this.insuranceType);

    //  //remove this later, the background needs to be transparent.
    //    if($("#chart").hasClass('home-graphic')) {
    //      $('body').css({"background":"rgb(240, 247, 252)"});
    //    } else {
    //      $('body').css({"background":"linear-gradient(to bottom, #333 0%,#999 100%)"});
    //    };

    //assigns names to labels :
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").html(this.mockData.userMain);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").html(this.mockData.userCoapplicant);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").html(this.mockData.userOther_one);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").html(this.mockData.userOther_two);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").html(this.mockData.userOther_three);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").html(this.mockData.userOther_four);

    //hides labels for segments w/0% coverage
    if (!(this.userMainPercentCoverage > 0)){
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").css({"animation":"none"});
    };
    if (!(this.userCoapplicantPercentCoverage > 0)){
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").css({"animation":"none"});
    };
    if (!(this.userOtherPercentCoverage_one > 0)){
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").css({"animation":"none"});
    };
    if (!(this.userOtherPercentCoverage_two > 0)){
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").css({"animation":"none"});
    };
    if (!(this.userOtherPercentCoverage_three > 0)){
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").css({"animation":"none"});
    };
    if (!(this.userOtherPercentCoverage_four > 0)){
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").css({"animation":"none"});
    };

    //sets animation timing for labels
    $(that.pageEle + " #svg-" + this.insuranceType + " .animated [class^='graphic-label-user-']").css({"animation-delay":((this.animation_timing / 1000) + .45) + "s"});

    //USER MAIN LABEL
    //gets the approximate coordinate for approximate midpoint of associated segment
    var xUserMainLabel = this.labelGetCoordinate("x", 1);
    var yUserMainLabel = this.labelGetCoordinate("y", 1);

    //  determines and sets text-anchor based on x-value
    if (xUserMainLabel > 152) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").attr("text-anchor", "start");
    } else if (xUserMainLabel < 150) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").attr("text-anchor", "end");
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").attr("text-anchor", "center");
    }

    //sets xy for the user-main label
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").attr("x", xUserMainLabel);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-main").attr("y", yUserMainLabel);

    //USER COAPPLICANT LABEL
    //gets the approximate coordinate for approximate midpoint of associated segment
    var xUserCoapplicantLabel = this.labelGetCoordinate("x", 2);
    var yUserCoapplicantLabel = this.labelGetCoordinate("y", 2);

    //  determines and sets text-anchor based on x-value
    if (xUserCoapplicantLabel > 152) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").attr("text-anchor", "start");
    } else if (xUserCoapplicantLabel < 150) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").attr("text-anchor", "end");
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").attr("text-anchor", "center");
    }

    //sets xy for the user-coapplicant label
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").attr("x", xUserCoapplicantLabel);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-coapplicant").attr("y", yUserCoapplicantLabel);

    //USER OTHER 1 LABEL
    //gets the approximate coordinate for approximate midpoint of associated segment
    var xUserOtherOneLabel = this.labelGetCoordinate("x", 3);
    var yUserOtherOneLabel = this.labelGetCoordinate("y", 3);

    //  determines and sets text-anchor based on x-value
    if (xUserOtherOneLabel > 152) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").attr("text-anchor", "start");
    } else if (xUserOtherOneLabel < 150) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").attr("text-anchor", "end");
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").attr("text-anchor", "center");
    }

    //sets xy for the user-other-1 label
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").attr("x", xUserOtherOneLabel);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-1").attr("y", yUserOtherOneLabel);

    //USER OTHER 2 LABEL
    //gets the approximate coordinate for approximate midpoint of associated segment
    var xUserOtherTwoLabel = this.labelGetCoordinate("x", 4);
    var yUserOtherTwoLabel = this.labelGetCoordinate("y", 4);

    //  determines and sets text-anchor based on x-value
    if (xUserOtherTwoLabel > 152) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").attr("text-anchor", "start");
    } else if (xUserOtherTwoLabel < 150) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").attr("text-anchor", "end");
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").attr("text-anchor", "center");
    }

    //sets xy for the user-other-2 label
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").attr("x", xUserOtherTwoLabel);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-2").attr("y", yUserOtherTwoLabel);

    //USER OTHER 3 LABEL
    //gets the approximate coordinate for approximate midpoint of associated segment
    var xUserOtherThreeLabel = this.labelGetCoordinate("x", 5);
    var yUserOtherThreeLabel = this.labelGetCoordinate("y", 5);

    //  determines and sets text-anchor based on x-value
    if (xUserOtherThreeLabel > 152) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").attr("text-anchor", "start");
    } else if (xUserOtherThreeLabel < 150) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").attr("text-anchor", "end");
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").attr("text-anchor", "center");
    }

    //sets xy for the user-other-3 label
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").attr("x", xUserOtherThreeLabel);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-3").attr("y", yUserOtherThreeLabel);

    //USER OTHER 4 LABEL
    //gets the approximate coordinate for approximate midpoint of associated segment
    var xUserOtherFourLabel = this.labelGetCoordinate("x", 6);
    var yUserOtherFourLabel = this.labelGetCoordinate("y", 6);

    //  determines and sets text-anchor based on x-value
    if (xUserOtherFourLabel > 152) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").attr("text-anchor", "start");
    } else if (xUserOtherFourLabel < 150) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").attr("text-anchor", "end");
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").attr("text-anchor", "center");
    }

    //sets xy for the user-other-4 label
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").attr("x", xUserOtherFourLabel);
    $(that.pageEle + " #svg-" + this.insuranceType + " .graphic-label-user-other-4").attr("y", yUserOtherFourLabel);


    //SEGMENTS
    //calculates dash array settings for segments
    var dashArrayUserMain = (this.userMainPercentCoverage * .66) + ", " + (100 - (this.userMainPercentCoverage * .66));
    var dashArrayUserCoapplicant = ((this.userMainPercentCoverage + this.userCoapplicantPercentCoverage) * .66) + ", " + (100 - (this.userMainPercentCoverage + this.userCoapplicantPercentCoverage) * .66);
    var dashArrayUserOtherOne = ((this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one) * .66) + ", " + (100 - (this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one) * .66);
    var dashArrayUserOtherTwo = ((this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two) * .66) + ", " + (100 - (this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two) * .66);
    var dashArrayUserOtherThree = ((this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two + this.userOtherPercentCoverage_three) * .66) + ", " + (100 - (this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two + this.userOtherPercentCoverage_three) * .66);
    var dashArrayUserOtherFour = ((this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two + this.userOtherPercentCoverage_three + this.userOtherPercentCoverage_four) * .66) + ", " + (100 - (this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two + this.userOtherPercentCoverage_three + this.userOtherPercentCoverage_four) * .66);

    //adjusts animation length based on length of total coverage {
    if (this.totalHouseholdPercentCoverage > 0 && this.totalHouseholdPercentCoverage < 26) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .animated [class^='household-segment-']").addClass('twenty-five-coverage');
    } else if (this.totalHouseholdPercentCoverage > 25 && this.totalHouseholdPercentCoverage < 51) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .animated [class^='household-segment-']").addClass('fifty-coverage');
    } else if (this.totalHouseholdPercentCoverage > 50 && this.totalHouseholdPercentCoverage < 76) {
      $(that.pageEle + " #svg-" + this.insuranceType + " .animated [class^='household-segment-']").addClass('seventy-five-coverage');
    } else {
      $(that.pageEle + " #svg-" + this.insuranceType + " .animated [class^='household-segment-']").addClass('one-hundred-coverage');
    }

    //Applies dash array settings to #coverage-segment(s)
    $(that.pageEle + " #svg-" + this.insuranceType + " .household-segment-main").css({"stroke-dasharray": dashArrayUserMain});
    $(that.pageEle + " #svg-" + this.insuranceType + " .household-segment-coapplicant").css({"stroke-dasharray": dashArrayUserCoapplicant});
    $(that.pageEle + " #svg-" + this.insuranceType + " .household-segment-other-1").css({"stroke-dasharray": dashArrayUserOtherOne});
    $(that.pageEle + " #svg-" + this.insuranceType + " .household-segment-other-2").css({"stroke-dasharray": dashArrayUserOtherTwo});
    $(that.pageEle + " #svg-" + this.insuranceType + " .household-segment-other-3").css({"stroke-dasharray": dashArrayUserOtherThree});
    $(that.pageEle + " #svg-" + this.insuranceType + " .household-segment-other-4").css({"stroke-dasharray": dashArrayUserOtherFour});


    //PERCENTAGE CIRCLE

    //provides cx cy for percentage circle
    var cxPercentCircle = this.roundNearestFive(this.totalHouseholdPercentCoverage) + "x";
    var cyPercentCircle = this.roundNearestFive(this.totalHouseholdPercentCoverage) + "y";

    //modifies percentage circle animation timing based on segment animations
    $(that.pageEle + " #svg-" + this.insuranceType + " .animated #percentage-circle-" + this.insuranceType).css({"animation-delay":(this.animation_timing / 1000) + "s"});
    $(that.pageEle + " #svg-" + this.insuranceType + " .animated #percent-circle-text-" + this.insuranceType).css({"animation-delay":(this.animation_timing / 1000) + "s"});

    //this positions the percentage circle prior to animation.
    $(that.pageEle + " #svg-" + this.insuranceType + " #percentage-circle-" + this.insuranceType).css({"cx": this.percentCoordinates[cxPercentCircle], "cy": this.percentCoordinates[cyPercentCircle]});
    //this positions the percentage circle text prior to animation. the "+ 0.4" is an adjustment to vertically center the text in the circle
    $(that.pageEle + " #svg-" + this.insuranceType + " #percent-circle-text-" + this.insuranceType).attr("x", this.percentCoordinates[cxPercentCircle]).attr("y", this.percentCoordinates[cyPercentCircle] + .4).html(Math.round(this.totalHouseholdPercentCoverage) + "%");

  }

  roundNearestTwoPointFive(x)
  {
    //if client is more than 100% covered, limit the cercle position to 100 %
    if (x > 100) return 100;
    return Math.round(x/2.5)*2.5;
  }

  roundNearestFive(x)
  {
    //if client is more than 100% covered, limit the cercle position to 100 %
    if (x > 100) return 100;
    return Math.round(x/5)*5;
  }

  //this function accepts 'axis' ('x' or 'y') and segment number (1, 2, or 3) and returns the coordinate x or y value for a given segment's label.
  labelGetCoordinate(axis, segment) {
    if (segment === 1) {
      return this.labelCoordinatesPrecise[this.roundNearestTwoPointFive(this.userMainPercentCoverage / 2) + axis];
    } else if (segment === 2) {
      return this.labelCoordinatesPrecise[this.roundNearestTwoPointFive(this.userMainPercentCoverage + this.userCoapplicantPercentCoverage / 2) + axis];
    } else if (segment === 3) {
      return this.labelCoordinatesPrecise[this.roundNearestTwoPointFive(this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one / 2) + axis];
    } else if (segment === 4) {
      return this.labelCoordinatesPrecise[this.roundNearestTwoPointFive(this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two / 2) + axis];
    } else if (segment === 5) {
      return this.labelCoordinatesPrecise[this.roundNearestTwoPointFive(this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two + this.userOtherPercentCoverage_three / 2) + axis];
    } else {
      return this.labelCoordinatesPrecise[this.roundNearestTwoPointFive(this.userMainPercentCoverage + this.userCoapplicantPercentCoverage + this.userOtherPercentCoverage_one + this.userOtherPercentCoverage_two + this.userOtherPercentCoverage_three + this.userOtherPercentCoverage_four / 2) + axis];
    }
  }

  countup(el, value, max, iterator){
    const that = this

      iterator += this.interval;
      //Updates the value on the screen
      this.displayUpdatedNumber(el, value, max);

      if( max >= value ) {
        //Calculates the new value for the next iteration
        value += (max - value ) / (this.time-iterator + 1) * this.interval;
        //Trigers the new iteration with the updated values
        // $("#needs-amount").html('30000');
        setTimeout(() => {
          that.countup(el, value, max, iterator)
        }, this.interval)
      } else {
        this.displayUpdatedNumber(el, max, max);
      }

  }

  displayUpdatedNumber(el, value, max) {
    if( value < max ) $(el).html(this.appGlobal.priceFormatRound(value));
    else $(el).html(this.appGlobal.priceFormatRound(max));
  }

}
