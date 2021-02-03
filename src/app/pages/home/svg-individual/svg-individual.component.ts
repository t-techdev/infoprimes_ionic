import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

import { AppGlobals } from '../../../shared/app.globals';

@Component({
  selector: 'svg-individual',
  templateUrl: './svg-individual.component.html',
  styleUrls: ['./svg-individual.component.scss']
})
export class SvgIndividualComponent implements OnInit, OnChanges {

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
  public labelCoordinates = {
    "0x" : 136.44,
    "0y" : 133.32,
    "5x" : 134.97,
    "5y" : 129.93,
    "10x" : 134.22,
    "10y" : 126.27,
    "15x" : 134.27,
    "15y" : 122.52,
    "20x" : 135.10,
    "20y" : 118.89,
    "25x" : 136.64,
    "25y" : 115.49,
    "30x" : 138.86,
    "30y" : 112.51,
    "35x" : 141.64,
    "35y" : 110.06,
    "40x" : 144.80,
    "40y" : 108.26,
    "45x" : 148.34,
    "45y" : 107.15,
    "50x" : 151.93,
    "50y" : 106.79,
    "55x" : 155.59,
    "55y" : 107.16,
    "60x" : 159.07,
    "60y" : 108.27,
    "65x" : 162.25,
    "65y" : 110.08,
    "70x" : 165.01,
    "70y" : 112.52,
    "75x" : 167.22,
    "75y" : 115.48,
    "80x" : 168.77,
    "80y" : 118.82,
    "85x" : 169.57,
    "85y" : 122.44,
    "90x" : 169.64,
    "90y" : 126.16,
    "95x" : 168.93,
    "95y" : 129.83,
    "100x" : 167.53,
    "100y" : 133.14
  };
  public mockData: any;
  public pageEle: string;

  public needs : number;
  public insuranceType : string;
  public pageType : string;
  public totalCoverage : number;
  public totalPercentCoverage : number;
  public permanentCoverage : number;
  public permanentPercentCoverage : number;
  public temporaryCoverage : number;
  public temporaryPercentCoverage : number;
  public universalCoverage : number;
  public universalPercentCoverage : number;
  public animation_timing : number;
  public uniqueID: string;

  public time : number;
  public interval : number;
  public currentNeeds : number;
  public currentCoverage : number;
  public needsTotal : number;
  public coverageTotal : number;
  public coverageExists: number;
  public clipPathId: string;
  public clipPathIdCircle: string;

  private _viewInited: boolean;

  constructor(public appGlobal: AppGlobals) { }

  ngOnInit() {
    try {
      this.init();
      this._viewInited = true;
    } catch (error) {
      console.log(error); 
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this._viewInited)
      return;
    if(changes['graphicData'].currentValue && !changes['graphicData'].previousValue)
      this.init();
  }

  init() {
    if(this.graphicData) {
      this.mockData = this.graphicData;
    }

    if (this.mockData.insuranceType != "life") {
      this.mockData.totalCoverage = (this.mockData.coverage);
    } else {
      this.mockData.totalCoverage = (this.mockData.permanentCoverage + this.mockData.temporaryCoverage + this.mockData.universalCoverage);
    };

    this.totalCoverage = this.mockData.totalCoverage;
    this.needs = this.mockData.needs;
    this.coverageExists = this.totalCoverage;
    this.totalPercentCoverage = ((this.totalCoverage / this.needs))*100;
    this.permanentCoverage = this.mockData.permanentCoverage;
    this.temporaryCoverage = this.mockData.temporaryCoverage;
    this.universalCoverage = this.mockData.universalCoverage;

    if (this.needs == 0 && this.coverageExists) {
      this.totalPercentCoverage = 100;
      this.needs = this.totalCoverage;
    } else if (this.needs == 0 && !this.coverageExists) {
      this.totalPercentCoverage = 0;
    }


    this.insuranceType = this.mockData.insuranceType;
    this.pageType = this.mockData.pageType.toLowerCase();
    if(this.pageType == 'home') {
      this.pageEle = 'page-home';
    } else {
      this.pageEle = 'page-insurance';
    }


    this.permanentPercentCoverage = ((this.permanentCoverage / this.needs) *100);
    this.temporaryPercentCoverage = ((this.temporaryCoverage / this.needs)*100) ;
    this.universalPercentCoverage = ((this.universalCoverage / this.needs)*100);
    this.animation_timing = 0;

    if (this.totalPercentCoverage == 0) {
      this.animation_timing = 0;
    } else if (this.totalPercentCoverage > 0 && this.totalPercentCoverage < 26) {
      this.animation_timing = 600;
    } else if (this.totalPercentCoverage > 25 && this.totalPercentCoverage < 51) {
      this.animation_timing = 700;
    } else if (this.totalPercentCoverage > 50 && this.totalPercentCoverage < 76) {
      this.animation_timing = 900;
    } else {
      this.animation_timing = 1350;
    }

    this.time = this.animation_timing; //milliseconds
    this.interval = 55; //milliseconds
    this.currentNeeds = 0;
    this.currentCoverage = 0;
    this.needsTotal = this.mockData.needs;
    this.coverageTotal = this.mockData.totalCoverage;

    this.clipPathId = this.pageType + '-rect-clip-bottom';
    this.clipPathIdCircle = 'url(#' + this.clipPathId + ')';

    const that = this;
    setTimeout(() => {
      that.startAnimation();
    }, 200);
  }

  startAnimation() {
    this.uniqueID = this.pageEle + " #svg-" + this.insuranceType + ' #chart-' + this.type;
    if(this.mockData.role == 'other') {
      $(this.uniqueID + " #needs-amount-" + this.type + ", " + this.uniqueID + " .graphic-titles.needs-text, " + this.uniqueID + " .graphic-line").css({"display":"none"});
      $( this.uniqueID + " .graphic-titles.coverage-text" ).attr( "y", "120.42" );
      $( this.uniqueID + " #coverage-amount-" + this.type ).attr( "y", "123.54" );
    }
    if (this.needsTotal > 0 && this.coverageTotal == 0) {
      $(this.uniqueID + " #coverage-amount-" + this.type).html(this.appGlobal.priceFormatRound(0));
      $(this.uniqueID + " #needs-amount-" + this.type).html(this.appGlobal.priceFormatRound(this.needsTotal));
    } else if (this.needsTotal == 0) {
      $(this.uniqueID + " #needs-amount-" + this.type + ", " + this.uniqueID + " .graphic-titles.needs-text, " + this.uniqueID + " .graphic-line").css({"display":"none"});
      $( this.uniqueID + " .graphic-titles.coverage-text" ).attr( "y", "120.42" );
      $( this.uniqueID + " #coverage-amount-" + this.type ).attr( "y", "123.54" );
      this.countup(this.uniqueID + ' #coverage-amount-' + this.type, 0, this.coverageTotal, this.currentCoverage);
    } else {
      this.countup(this.uniqueID + ' #needs-amount-' + this.type, 0, this.needsTotal, this.currentNeeds);
      this.countup(this.uniqueID + ' #coverage-amount-' + this.type, 0, this.coverageTotal, this.currentCoverage);
    }

    $(this.uniqueID).removeClass('animated');
    $(this.uniqueID).addClass('animated');

    $(this.uniqueID + " #chart[class$='-graphic']").removeClass();
    $(this.uniqueID + " #chart[class^='graphic-']").removeClass();
    $(this.uniqueID).addClass(this.pageType + "-graphic");
    $(this.uniqueID).addClass("graphic-" + this.type);

    //life or other
    if (this.insuranceType == "life") {

      this.mockData.totalPercentCoverage = (this.mockData.totalCoverage / this.mockData.needs)*100;

      //hides labels for life insurance with 0 coverage.
      if (!(this.permanentPercentCoverage > 0)){
        $(this.uniqueID + " .graphic-label-permanent").css({"animation":"none"});
      };
      if (!(this.temporaryPercentCoverage > 0)){
        $(this.uniqueID + " .graphic-label-temporary").css({"animation":"none"});
      };
      if (!(this.universalPercentCoverage > 0)){
        $(this.uniqueID + " .graphic-label-universal").css({"animation":"none"});
      };

      //sets animation timing for labels
      $(this.uniqueID + " .animated [class^='graphic-label-']").css({"animation-delay":((this.animation_timing / 1000) + .45) + "s"});

      //gets the approximate coordinate for approximate midpoint of associated segment
      var xPermanentLabel = this.labelGetCoordinate("x", 1);
      var yPermanentLabel = this.labelGetCoordinate("y", 1);

      //PERMANENT LABEL
      //  determines and sets text-anchor based on x-value
      if (xPermanentLabel > 152) {
        $(this.uniqueID + " .graphic-label-permanent").attr("text-anchor", "start");
      } else if (xPermanentLabel < 150) {
        $(this.uniqueID + " .graphic-label-permanent").attr("text-anchor", "end");
      } else {
        $(this.uniqueID + " .graphic-label-permanent").attr("text-anchor", "center");
      }

      //sets xy for the permanent label
      $(this.uniqueID + " .graphic-label-permanent").attr("x", xPermanentLabel);
      $(this.uniqueID + " .graphic-label-permanent").attr("y", yPermanentLabel);

      //gets the approximate coordinate for approximate midpoint of associated segment
      var xTemporaryLabel = this.labelGetCoordinate("x", 2);
      var yTemporaryLabel = this.labelGetCoordinate("y", 2);

      //TEMPORARY LABEL
      //determines and sets text-anchor based on x-value
      if (xTemporaryLabel > 152) {
        $(this.uniqueID+ " .graphic-label-temporary").attr("text-anchor", "start");
      } else if (xTemporaryLabel < 150) {
        $(this.uniqueID + " .graphic-label-temporary").attr("text-anchor", "end");
      } else {
        $(this.uniqueID + " .graphic-label-temporary").attr("text-anchor", "center");
      }

      //sets xy for the temporary label
      $(this.uniqueID + " .graphic-label-temporary").attr("x", xTemporaryLabel);
      $(this.uniqueID + " .graphic-label-temporary").attr("y", yTemporaryLabel);

      //gets the approximate coordinate for approximate midpoint of associated segment
      var xUniversalLabel = this.labelGetCoordinate("x", 3);
      var yUniversalLabel = this.labelGetCoordinate("y", 3);

      //UNIVERSAL LABEL
      //  determines and sets text-anchor based on x-value
      if (xUniversalLabel > 152) {
        $(this.uniqueID + " .graphic-label-universal").attr("text-anchor", "start");
      } else if (xUniversalLabel < 150) {
        $(this.uniqueID + " .graphic-label-universal").attr("text-anchor", "end");
      } else {
        $(this.uniqueID + " .graphic-label-universal").attr("text-anchor", "center");
      }

      //sets xy for the universal label
      $(this.uniqueID + " .graphic-label-universal").attr("x", xUniversalLabel);
      $(this.uniqueID + " .graphic-label-universal").attr("y", yUniversalLabel);


      //SEGMENTS
      //calculates dash array settings for segments
      var dashArrayPermanent = (this.permanentPercentCoverage * .66) + ", " + (100 - (this.permanentPercentCoverage * .66));
      var dashArrayTemporary = ((this.permanentPercentCoverage + this.temporaryPercentCoverage) * .66) + ", " + (100 - (this.permanentPercentCoverage + this.temporaryPercentCoverage) * .66);
      var dashArrayUniversal = ((this.totalPercentCoverage) * .66) + ", " + (100 - (this.totalPercentCoverage * .66));


      //Applies dash array settings to .coverage-segment(s)
      //permanent segment
      $(this.uniqueID + " .coverage-segment-1").css({"stroke-dasharray": dashArrayPermanent});
      //temporary segment
      $(this.uniqueID + " .coverage-segment-2").css({"stroke-dasharray": dashArrayTemporary});
      //universal segment
      $(this.uniqueID + " .coverage-segment-3").css({"stroke-dasharray": dashArrayUniversal});


      //PERCENTAGE CIRCLE

      //provides cx cy for percentage circle
      var cxPercentCircle = this.roundNearestFive(this.totalPercentCoverage) + "x";
      var cyPercentCircle = this.roundNearestFive(this.totalPercentCoverage) + "y";

        //modifies percentage circle animation timing based on segment animations
      $(this.uniqueID + ".animated #percentage-circle-" + this.type).css({"animation-delay":(this.animation_timing / 1000) + "s"});
      $(this.uniqueID + ".animated #percent-circle-text-" + this.type).css({"animation-delay":(this.animation_timing / 1000) + "s"});

      //this positions the percentage circle prior to animation.
      $(this.uniqueID + " #percentage-circle-" + this.type).css({"cx": this.percentCoordinates[cxPercentCircle], "cy": this.percentCoordinates[cyPercentCircle]});
      //this positions the percentage circle text prior to animation. the "+ 0.4" is an adjustment to vertically center the text in the circle
      $(this.uniqueID + " #percent-circle-text-" + this.type).attr("x", this.percentCoordinates[cxPercentCircle]).attr("y", this.percentCoordinates[cyPercentCircle]+ .4).html(Math.round(this.totalPercentCoverage) + "%");

    } else {
      //hides all labels, life segments
      $(this.uniqueID + " [class^=graphic-label-]").css({"animation":"none"});
      $(this.uniqueID + " .coverage-segment-1, " + this.uniqueID + " .coverage-segment-2, " + this.uniqueID + " .coverage-segment-3").css({"display":"none"});

      //SEGMENTS
      //calculates dash array settings for segments
      var dashArrayCoverage = (this.totalPercentCoverage * .66) + ", " + (100 - (this.totalPercentCoverage * .66));

      //applies dash array settings to .coverage-segment(s)
      //non-life coverage segment
      $(this.uniqueID + " .coverage-segment-0").css({"stroke-dasharray": dashArrayCoverage});
      //PERCENTAGE CIRCLE

      //provides cx cy for percentage circle
      cxPercentCircle = this.roundNearestFive(this.totalPercentCoverage) + "x";
      cyPercentCircle = this.roundNearestFive(this.totalPercentCoverage) + "y";

      //modifies percentage circle animation timing based on segment animations
      $(this.uniqueID + ".animated #percentage-circle-" + this.type).css({"animation-delay":(this.animation_timing / 1000) + "s"});
      $(this.uniqueID + ".animated #percent-circle-text-" + this.type).css({"animation-delay":(this.animation_timing / 1000) + "s"});

      //this positions the percentage circle prior to animation.
      $(this.uniqueID + " #percentage-circle-" + this.type).css({"cx": this.percentCoordinates[cxPercentCircle], "cy": this.percentCoordinates[cyPercentCircle]});
      //this positions the percentage circle text prior to animation. the "+ 0.4" is an adjustment to vertically center the text in the circle
      $(this.uniqueID + " #percent-circle-text-" + this.type).attr("x", this.percentCoordinates[cxPercentCircle]).attr("y", this.percentCoordinates[cyPercentCircle]+ .4).html(Math.round(this.totalPercentCoverage) + "%");
    }
  }

  roundNearestFive(x) {
    //if client is more than 100% covered, limit the cercle position to 100 %
    if (x > 100) return 100;
    return Math.round(x/5)*5;
  }

  //this function accepts 'axis' ('x' or 'y') and segment number (1, 2, or 3) and returns the coordinate x or y value for a given segment's label.
  labelGetCoordinate(axis, segment) {
    if (segment === 1) {
      return this.labelCoordinates[this.roundNearestFive(this.permanentPercentCoverage / 2) + axis];
    } else if (segment === 2) {
      return this.labelCoordinates[this.roundNearestFive(this.permanentPercentCoverage + this.temporaryPercentCoverage / 2) + axis];
    }
    return this.labelCoordinates[this.roundNearestFive(this.permanentPercentCoverage + this.temporaryPercentCoverage + this.universalPercentCoverage / 2) + axis];
  }

  countup(el, value, max, iterator) {
    const that = this
    iterator += this.interval;
    //Updates the value on the screen
    this.displayUpdatedNumber(el, value, max);

    if(max == 0 && value == 0) {}
    else {
      if( max >= value ) {
        //Calculates the new value for the next iteration
        value += (max - value ) / (this.time-iterator + 1) * this.interval;
        //Trigers the new iteration with the updated values
        setTimeout(() => {
          that.countup(el, value, max, iterator)
        }, this.interval)
      }
    }
  }

  displayUpdatedNumber(el, value, max) {
    if( value < max ) $(el).html(this.appGlobal.priceFormatRound(value));
    else $(el).html(this.appGlobal.priceFormatRound(max));
  }

}
