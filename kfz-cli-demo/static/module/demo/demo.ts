///<<reference path="@types/jquery"/>

import './css/demo.css';
import '../../common/font/iconfont.css';


const demoTpl = require('./dot/demo.dot');
$('body').append(demoTpl({data: 'text'}));


const hello: string = 'hello world';
console.log(hello);

class Site {
    name(): void{
        console.log('demo');
    }
}

const obj = new Site();
obj.name()

const name:string = 'ad';
console.log(name);

let arr: string[] = ['a', 'b'];
console.log(arr);

let arrAny: Array<any> = [1,2,4,'234'];
console.log(arrAny);

let x:[string, number];
x = ['ar',213];

function demo(): void {
    console.log(123);
}
demo();

function demo1(): string{
    return 'abc';
}

console.log(demo1());

interface Person {
    name: string,
    say: () => string;
}
const customer:Person = {
    name: 'lcl',
    say: ()=> {return 'hello'}
};

console.log(customer.name);
console.log(customer.say());

