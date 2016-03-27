               
var ACmodel = "Cessna 182T";
var Nnumber = "N816CP";
var oilqtmax = "8";
var fuel1galmax = "87";
var bagg1max = "120";
var bagg2max = "80";
var bagg3max = "80";
// values for AC max gross weight and maneuvering speed at max gross
maxwt = 3100;
Vam = 110;
	
function initWB() {  //This function - December 2003 - Robert A. Booty-->
 
var df = document.forms[0];
df.ew.value = 1924.6; 
df.ewarm.value = 37.1;
//df.oilqt.value = 8;
//df.oilarm.value = -14.0;
df.f1w.value = 200; 
df.f2w.value = 200;
df.f1arm.value = 37.0;
df.fuel1gal.value = 64; 
df.fuel1arm.value = 46.5;
df.r1w.value = 180;
df.r2w.value = 0;
df.r1arm.value = 74.0;
df.bag1w.value = 50;
df.bag1arm.value = 97.0;
df.bag2w.value = 0;
df.bag2arm.value = 116.0;
df.bag3w.value = 0;
df.bag3arm.value = 129.0;
df.stto1w.value = -10;
df.stto1arm.value = 46.5;

// run the calculations...-->
doCalc();                                
    
} //end of function initWB() 

function WB_Plot(weight, arm) {
// This the original function credit David Williams page:
// http://www.dmjwilliams.co.uk/gbsep_weight_balance.htm
// Left axis 34 in. margin on the wb172N.gif is 50 pixels.
// 48 in. on the wb172N.gif graph is 453 pixels. // 48-34=14 in., 453-50=403 px., 403/14=28.79 px/inx cal. factor...
// var x = Math.round(50 + (arm - 34) * 28.79) - 16; //16 is 1/2 bug dia.
// Bottom axis 1400 lb. on the wb172N.gif is 232 pixels.
// 2400 lb. on the wb172N.gif graph is 1 pixel.
// 2400-1400=1000 lb., 232-1=231 px. ...
// var y = 232 - Math.round(((weight - 1400) / 1000) * 231) - 16;


// This is specific to our graph: wbcpf937.gif pixels:
// Left axis 32 in. margin on the graph is 63 pixels.
// Right axis 47 in. on the graph is 433 pixels.  
// 47-32 = 15 in., 433-63 = 370 px., 370/15 = 24.67 px/in. cal. factor...
//Bug diameter is 32; 16 is 1/2 bug diameter
      	
var x = Math.round(63 + (arm - 32) * 24.67) - 16;
  
// Bottom axis 1800 lb. on the graph.gif is 289 pixels.
// Top axis 3200 lb. on the graph is 12 pixel.
// 3200-1800=1400 lb., 289-12=277 px. ...


//	var y = 289 - Math.round(((weight - 1800) / 1400) * 288) - 16;
//  used 1460 inlieu of 1400 to correct for display errors. 

var y = 289 - Math.round(((weight - 1800) / 1400) * 277) - 16;
                     
with (document.images.bugImage.style) {
left = x + 'px';
top  = y + 'px';
visibility = "visible";
}

  
} //end of function WB_Plot(weight, arm)

function doCalc() {
// This function - March, 2001 - Robert A. Booty
// last revised December 10, 2003 - R.A.B.
// http://home.new.rr.com/trumpetb/alph/

var df = document.forms[0];
var ew = df.ew.value;
var ewarm = df.ewarm.value;
var ewmom = ew * ewarm;
df.ewmom.value = Math.round(ewmom);
//var oilqt = df.oilqt.value;
//var oilw = oilqt / 4 * 7.5;
//df.oilw.value = Math.round(oilw * 10.0) / 10.0;
//var oilarm = df.oilarm.value;
//var oilmom = oilw * oilarm;
//df.oilmom.value = Math.round(oilmom);-->
var f1w = df.f1w.value;
var f2w = df.f2w.value;
var f1arm = df.f1arm.value;
var f1mom = -1 * (-f1w - f2w) * f1arm;
df.f1mom.value = Math.round(f1mom);
var fuel1gal = df.fuel1gal.value;
var fuel1w = fuel1gal * 6;
df.fuel1w.value = Math.round(fuel1w);
var fuel1arm = df.fuel1arm.value;
var fuel1mom = fuel1w * fuel1arm;
df.fuel1mom.value = Math.round(fuel1mom);
var r1w = df.r1w.value;
var r2w = df.r2w.value;
var r1arm = df.r1arm.value;
var r1mom = -1 * (-r1w - r2w) * r1arm;
df.r1mom.value = Math.round(r1mom);
var bag1w = df.bag1w.value;
var bag1arm = df.bag1arm.value;
var bag1mom = bag1w * bag1arm;
df.bag1mom.value = Math.round(bag1mom);
var bag2w = df.bag2w.value;
var bag2arm = df.bag2arm.value;
var bag2mom = bag2w * bag2arm;
df.bag2mom.value = Math.round(bag2mom);
var bag3w = df.bag3w.value;
var bag3arm = df.bag3arm.value;
var bag3mom = bag3w * bag3arm;
df.bag3mom.value = Math.round(bag3mom);
var stto1w = df.stto1w.value;
if (stto1w > 0){ 
stto1w = (-1 * stto1w) ;
}
var stto1arm = df.stto1arm.value;
var stto1mom = stto1w * stto1arm;
df.stto1mom.value = Math.round(stto1mom);
var totmom = -1 * (-ewmom -f1mom -fuel1mom -r1mom -bag1mom -bag2mom -bag3mom -stto1mom);
df.totmom.value = Math.round(totmom);
var totwt = -1 * (-ew -f1w -f2w -fuel1w -r1w -r2w -bag1w -bag2w -bag3w -stto1w);
df.totwt.value = Math.round(totwt);
var totarm = totmom / totwt;
df.totarm.value = Math.round(totarm*100)/100;
// Decrease in Va with decrease in weight based on approximation of:
// decrease Va by half the percentage that the total weight is below maximum.-->
var Vva = Vam - ((((maxwt - totwt) / maxwt) / 2) * Vam);
df.Vva.value = Math.round(Vva);
// Show the bug on the graph...-->
WB_Plot(df.totwt.value, df.totarm.value);

} //end of function doCalc()-->

function popwindow(theURL,winName,features) {
window.open(theURL,winName,features);

}