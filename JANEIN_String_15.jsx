#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

b.textFont("YaNo","Regular");
b.units(b.MM);//change the ruler to centimeters Pixels, etc
var layerJa = b.layer("ja");
var layerText = b.layer("text");
b.clear(layerJa);
b.clear(layerText);
var counter = 0;
var divider = 50000000;
var pageOffset;
var prozentNein;
var result = [];
var textBox=55;
var index;
var roundFactor = 1000000;
var max = 5313287;
var min = 647071;
var data = b.CSV.decode(b.loadString("dataTest3.csv"));// reading the data. Data can be found at: https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html
for (var i = 0; i <100; i++) { //Since indesign can't handle so much data it is better to divide the rendering in chuncks.
data[i].JA = parseInt(data[i].JA);
data[i].ProzentBet = parseFloat(data[i].ProzentBet);
b.layer(layerJa);
 var loop = b.map( data[i].Stimmberechtige, min, max, 60, 600);
 var fontSize =b.floor( b.map( loop, 60, 600, 50, 16));
 var offset = b.map( loop, 60, 600, 7, 2.5);
 var strike = b.map( loop, 60, 600, 15, 4);
 var hOffset = b.map( loop, 60, 600, 8, 2.5);
                result.length = 0;
                var resultText;
                            for( var j=0;j<loop;j+=1){
                                result.push("ja nein");
                                resultText = b.join(result," ")
                                }
                                        b.textAlign(Justification.FULLY_JUSTIFIED,VerticalJustification.JUSTIFY_ALIGN);
                                        b.textSize(5);
                                        b.textLeading(5);
                                        var resultTextFrame = b.text(resultText,0,-hOffset,b.width,b.height+hOffset);
                                        var wordsCount = b.words(resultTextFrame).length;
                                        b.println(wordsCount)                                                
                                                prozentNein = 100-data[i].JAProzent;
                                                var prozWords = b.floor((wordsCount/100)*data[i].ProzentBet);
                                                var prozJa = b.floor((prozWords/100)*data[i].JAProzent);
                                                var prozNein = b.floor((prozWords/100)*prozentNein);
                                                b.println(data[i].ProzentBet+"   %words "+prozWords+" %JA: "+prozJa+" %nein: "+prozNein); 
                                                b.typo(resultTextFrame, "hyphenation", false);                                                         
                                                         b.words( resultTextFrame, function (obj,c){
                                                                c++;
                                                                if(data[i].JAProzent>50 && c<=prozJa) {
                                                                        b.typo(obj,"contents","ja");
                                                                        b.typo(obj,"baselineShift",b.random(-offset,offset));
                                                                        b.typo(obj,"strikeThru",false);
                                                                        } else if(data[i].JAProzent>50 && c>prozJa && c<prozWords){
                                                                             b.typo(obj,"contents","nein");
                                                                             b.typo(obj,"baselineShift",b.random(-offset,offset));
                                                                             b.typo(obj,"strikeThru",false);
                                                                            }
                                                                if(data[i].JAProzent<50 && c<=prozNein) { // when no won change the yes in no
                                                                        b.typo(obj,"baselineShift",b.random(-offset,offset)); 
                                                                        b.typo(obj,"contents","nein");
                                                                        b.typo(obj,"strikeThru",false);
                                                                             } else if(data[i].JAProzent<50 && c>prozNein && c<prozWords){
                                                                             b.typo(obj,"strikeThru",false);
                                                                             b.typo(obj,"contents","ja");
                                                                             b.typo(obj,"baselineShift",b.random(-offset,offset));
                                                                             }
                                                                if (c>=prozWords){
                                                                    b.typo(obj,"strikeThru",true);
                                                                    b.typo(obj,"strikeThroughWeight",strike);
                                                                    b.typo(obj,"strikeThroughColor",b.color(255));
                                                                    }
                                                                }
                                                                );
                                    b.typo(resultTextFrame, "pointSize",fontSize);
                                    b.typo(resultTextFrame,"minimumWordSpacing",0);
                                    b.typo(resultTextFrame,"maximumWordSpacing",100);
                                    b.typo(resultTextFrame,"desiredWordSpacing",25);
                                    b.layer(layerText);
                                    b.textLeading(26.4);
                                    b.textAlign(Justification.LEFT_ALIGN,VerticalJustification.TOP_ALIGN);
                                    var law = b.text(i+1+". "+data[i].Datum+"\n"+data[i].Gegenstand,0,b.height-textBox,b.width,textBox);
                                    b.typo(law, "pointSize", 15);
                                    b.typo(law, "strokeColor", b.color(255));
                                    b.typo(law,"leftIndent",4);
                                    b.typo(law,"rightIndent",4);
                                    b.typo(law,"leading",20);
                                    b.typo(law,"appliedFont","Helvetica Neue\tCondensed Black");
                                    b.typo(law, "hyphenation", false);
                                    b.addPage();
                }
}
b.go();
