console.log('test');
let expression = [
  [999, '', 999],
  [999, '', 999],
  [999, '', 999],
  [999, '', 999],
  [999, '', 999],
];
let expressionString = '';
let expressionStringCOMP = '';
let answer = 0;
let constant = 999;
let coefWithX = 999;

let coefWithPOW2 = 999;
let coefWithPOW3 = 999;


let answerString = '';

function reset() {
  console.log('reset');

  expressionString = "";
  expressionStringCOMP = '';
  answerString = '';
  answer = 0;
  expression = [
    [999, '', 999],
    [999, '', 999],
    [999, '', 999],
    [999, '', 999],
    [999, '', 999],
  ];

  answer = 0;
  constant = 999;
  coefWithX = 999;

  coefWithPOW2 = 999;
  coefWithPOW3 = 999;
  //var resetExp = document.getElementById('expressionStr');

//  $('#expressionStr').text('$${}$$');

var math = MathJax.Hub.getAllJax('expressionStr')[0];
MathJax.Hub.Queue(["Text",math,'']);

//var resetExp = document.getElementById('expressionStr')[0];
//MathJax.Hub.Remove([resetExp,[]]);


  var ansExp = document.getElementById('answerStrCheck');
  ansExp.innerHTML = "";

  var math = MathJax.Hub.getAllJax('answerStr')[0];
  MathJax.Hub.Queue(["Text",math,'']);


//reset answer box

  document.getElementById('ans').value="";
}

function inputTerms() {
  if(expressionString!='')
    reset();

  console.log("inputing terms");
  answer = document.getElementById('numb').value;
  console.log('answer: ',answer);



let coef = 0;
  for (let i = 0; i < answer; i++) {
    coef = Math.floor(Math.random() * 31) - 15;
let checkDouble = true;

    while (checkDouble) {
    //  checkDouble=false;
      coef = Math.floor(Math.random() * 31) - 15;
      for (let j = 0; j < answer; j++) {
        if (coef == expression[j][0]) {// if expression const is the same as old ones
          checkDouble = true;
          break;}
          else checkDouble = false;
        }
      }

    var exp = Math.floor(Math.random() * 4);
    console.log('EXP == ', exp);

    if (exp != 0) {
      if (exp == 1) {
        console.log('BEFORE CHANGE: ', expression[i][0], expression[i][1],expression[i][2]);
        expression[i][0] = coef;
        expression[i][1] = 'x';
        console.log('IF EXP IS 1', expression[i][0], expression[i][1],expression[i][2]);
      }
      else if(exp == 2 || exp == 3) {
        expression[i][0] = coef;
        expression[i][1] = 'x^';
        expression[i][2] = exp;
        console.log('IF EXP IS 2 OR 3', expression[i][0], expression[i][1],expression[i][2]);
      }
    }
    else {

      expression[i][0] = coef;
      console.log('IF CONSTANT', expression[i][0], expression[i][1],expression[i][2]);
    }
  }

  for(let i=0;i<5;i++)
  {
    for(let j=0;j<3;j++)
    {
      console.log('EXPRESSION [',i,']','[',j,'] ',expression[i][j]);
    }
  }




  for (let i = 0; i < answer; i++) {
    // console.log(expression[i][0],expression[i][1],expression[i][2],' ');
/*
    var randInt = Math.floor(Math.random() * 2);
    if (randInt == 0) expressionString += '+';
    else if (randInt == 1) {
      expressionString += '-';
      if(i!=0)
      expression[i][0] *= -1;
      //if(expression[i][0]<0)
    //  expression[i+1][0]*=-1;
  }

*/
expressionString += '+';

    if (expression[i][1] == '' && expression[i][2] == 999)
      expressionString += expression[i][0];
    else if (expression[i][1] != '' && expression[i][2] == 999) { // if no exponent
      expressionString += expression[i][0];
      expressionString += expression[i][1];
    } else {
      expressionString += expression[i][0];
      expressionString += expression[i][1];
      expressionString += expression[i][2];
    }



}

  for(let i=0;i<answer;i++)
  {
    for(let j=0;j<answer;j++){
    console.log('CHECKING',expression[i][j]);}
  }


  expressionString = expressionString.slice(1);
  console.log(typeof expressionString);


  expressionStringCOMP = expressionString;
  console.log('expressionStringCOMP: ', expressionStringCOMP);





  while (expressionString.search("[+][-]") != -1) {

    expressionString = expressionString.replace("+-", "-");
  }
  while (expressionString.search("[-][-]") != -1) {
    expressionString = expressionString.replace("--", "+");
  }






  console.log(expressionString);





//  var test = document.getElementById('expressionStr');
//  test.innerHTML = expressionString;
//  MathJax.Hub.Queue(["Typeset",MathJax.Hub,test]);

var math = MathJax.Hub.getAllJax('expressionStr')[0];
MathJax.Hub.Queue(["Text",math,expressionString]);


}

function eval() {

  if(answerString!='')
  return;

/*
  for (let i = 0; i < answer; i++) {


    let neg = expressionStringCOMP.search(expression[i][0]);
    //console.log('neg ',neg);
    if (expressionStringCOMP[neg - 1] == '-' ) {
      console.log('changes');
      expression[i][0] *= -1;
      console.log('number changed', expression[i][0]);
    } else if (expressionStringCOMP[neg - 1] == '+' && expressionStringCOMP[neg] == '-' && expression[i][0] < 0) {
      console.log('changes');
    //  expression[i][0] *= -1;
      console.log('number changed', expression[i][0]);

    }


    console.log('EXPRESSION[i][0], ', expression[i][0]);


  }
*/





  //let test  = math.eval(expressionString);
  //let test = math.eval(expressionString);

  //console.log(test);




  for (let i = 0; i < answer; i++) {
    if (
      expression[i][1] == '' &&
      expression[i][2] == 999 // if const
    ) {
      if (constant == 999) constant = 0;
      constant += expression[i][0];
    } else {
      if (
        expression[i][1] == 'x' &&
        expression[i][2] == 999 // if no power
      ) {
        if (coefWithX == 999) coefWithX = 0;
        coefWithX += expression[i][0];
      } else {
        //if power
        if (expression[i][2] == 2) {
          // if exponent is a 2
          if (coefWithPOW2 == 999) coefWithPOW2 = 0;
          coefWithPOW2 += expression[i][0];
          // exponent2 += expression[i][2];
        } else if (expression[i][2] == 3) {
          // if exponent is a 3
          if (coefWithPOW3 == 999) coefWithPOW3 = 0;
          coefWithPOW3 += expression[i][0];
          //exponent3 += expression[i][2];
        }
      }
    }
  }
  /*  if(constant!=999)
    console.log('CONSTANT:', constant);
    if(coefWithX !=999)
    console.log('NO POWER VAR', coefWithX, 'X');
    if(coefWithPOW2!=999)
    console.log('POWER VAR 2', coefWithPOW2, 'x^2');
    if(coefWithPOW3 !=999)
    console.log('POWER VAR 3', coefWithPOW3, 'x^3');*/
  let check = false;


  if (coefWithPOW3 != 999 && coefWithPOW3 != 0)
    answerString = answerString + coefWithPOW3.toString() + 'x^3';


  if (coefWithPOW2 > 0 && answerString[answerString.length] != '+' && answerString != '' && coefWithPOW2 != 999 && coefWithPOW2 != 0) answerString += '+';
  if (coefWithPOW2 != 999 && coefWithPOW2 != 0)
    answerString = answerString + coefWithPOW2.toString() + 'x^2';


  if (coefWithX > 0 && answerString[answerString.length] != '+' && answerString != '' && coefWithX != 999 && coefWithX != 0)
    answerString += '+';
  if (coefWithX != 999 && coefWithX != 0)
    answerString = answerString + coefWithX.toString() + 'x';


  if (constant > 0 && answerString[answerString.length] != '+' && answerString != '' && constant != 999 && constant != 0)
    answerString += '+';
  if (constant != 999 && constant != 0)
    answerString += constant.toString();



  let userAnswer = document.getElementById('ans').value;

  console.log(answerString);



  while(userAnswer.search(" ") != -1)
    userAnswer = userAnswer.replace(" ","");

  var a = document.getElementById('answerStrCheck');
  if (userAnswer == answerString)
    a.innerHTML = 'CORRECT';
  else a.innerHTML = 'INCORRECT'; //+ '\n' + 'userAnswer: ' + userAnswer + 'compAnswer: ' + answerStr;
  //  var test = document.getElementById('expressionStr');
  //  test.innerHTML = expressionString;

  var answerCHECK = MathJax.Hub.getAllJax('answerStr')[0];
  MathJax.Hub.Queue(["Text",answerCHECK,answerString]);


  console.log('CONSTANT:', constant);

  console.log('NO POWER VAR', coefWithX, 'X');

  console.log('POWER VAR 2', coefWithPOW2, 'x^2');

  console.log('POWER VAR 3', coefWithPOW3, 'x^3');



  for(let i=0;i<5;i++)
  {
    for(let j=0;j<3;j++)
    {
      console.log('EXPRESSION [',i,']','[',j,'] ',expression[i][j]);
    }
  }

}





//let test  = math.eval(expressionString);
//let test = math.eval(expressionString);

//console.log(test);
