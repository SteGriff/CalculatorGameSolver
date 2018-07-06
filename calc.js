//==== Set these values ====

var start = 0;
var target = 136;
var moves = 5;
var ops = [
	o('.',1),
	o('+', 2),
	o('*', 3),
	o('r',0)
];

//==== Program ====

var steps = [];

function o(op, val)
{
    return {'op':op,'val':val};
}

function e(className)
{
    return document.getElementsByClassName(className)[0];
}
function a(className)
{
    return document.getElementsByClassName(className);
}

function GetRandom(max)
{
    return Math.round(Math.random() * (max - 1));
}

function Solve(st, tg, mv, ops, ans)
{
    if (mv <= 0)
    {
        return false;
    }

    for(var op of ops)
    {
        if (Apply(st, op) === tg)
        {
            var desc = "Move " + (moves - mv + 1) + ": " + op.op + op.val + '=' + tg;
            console.log(desc);
            steps.push(desc);
            return true;
        }
    }

    for(var op of ops)
    {
        var newSt = Apply(st, op);
        var works = Solve(newSt, tg, mv-1, ops, ans);
        if (works)
        {
            var id = (moves - mv + 1);
            var desc = "Move " + id + ": " + op.op + op.val + '=' + newSt;
            console.log(desc);
            steps.push(desc);
            return true;
        }
    }
}

function Apply(st, op)
{
    switch (op.op)
    {
        case '+': return st + op.val;
        case '-': return st - op.val;  
        case '*': return st * op.val;  
        case '/': return st / op.val;
        case 'r': return Reverse(st);
        case '.': return 1 * (st.toString() + op.val.toString()); //Concatenate
		default : return Replace(st, op.op, op.val);
    }
    console.log("NOT IMPLEMENTED", op);
}

function Go()
{
    var title = "Steps to get from " + start + " to " + target;
    Solve(start, target, moves, ops, '');
    var answerBox = e('answer');
    console.log(answerBox);
    answerBox.innerHTML = "<h2>" + title + "</h2>";
    while(steps.length > 0)
    {
        var s = steps.pop();
        answerBox.innerHTML += "<p>" + s  + "</p>";
    }
}

function Reverse(aString)
{
    return 1 * aString.toString().split("").reverse().join("");
}

function Replace(st, find, replaceWith)
{
	return 1 * st.toString().replace(find, replaceWith);
}