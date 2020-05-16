/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-sequences */
/* eslint-disable import/prefer-default-export */
import {RUS,RUS_CAPS,EN,EN_CAPS,CODE} from './assets/data'


let isCAPS = true;
export function creatDom(){
const wrapper = document.createElement('div');
wrapper.id = 'wrapper-keyboard';
wrapper.classList = 'block'
document.querySelector('.search').append(wrapper);
const keyboards = document.createElement('div');
keyboards.className = 'keyboard';
keyboards.id = 'keyboard';
wrapper.append(keyboards);

for (let i = 0;i <= 63;i += 1) {
  const keys = document.createElement('div');
  keys.classList.add('key');
  keys.id = 'key';
  keys.setAttribute('data-code', CODE[i]);
  keys.innerHTML = `<span class="print en lang-rus block" > ${RUS[i]} </span><span class="enCap hidden print lang-rus block">${RUS_CAPS[i]}</span><span class="print en lang-eng" > ${EN[i]} </span><span class="enCap hidden print lang-eng ">${EN_CAPS[i]}</span>`;
  keyboards.append(keys);
}

keyboards.children[13].classList.add('backspace');
keyboards.children[14].classList.add('tab');
keyboards.children[28].classList.add('del');
keyboards.children[29].classList.add('CapsLock');
keyboards.children[29].id='CapsLock';
keyboards.children[41].classList.add('Enter');
keyboards.children[42].classList.add('ShiftLeft');
keyboards.children[53].classList.add('ArrowUp');
keyboards.children[54].classList.add('ShiftRight');
keyboards.children[55].classList.add('ControlLeft');
keyboards.children[56].classList.add('Meta');
keyboards.children[57].classList.add('AltLeft');
keyboards.children[58].classList.add('Space');
keyboards.children[59].classList.add('AltRight');
keyboards.children[63].classList.add('ControlRight');
keyboards.children[60].classList.add('ArrowLeft');
keyboards.children[61].classList.add('ArrowDown');
keyboards.children[62].classList.add('ArrowRight');
}
creatDom()

const INPUT = document.getElementById('search');
function changeLang(){
  const langRus = document.querySelectorAll('.lang-rus');
  const langEn = document.querySelectorAll('.lang-eng');
  for(let i =0,j=0;i<langRus.length,j<langEn.length;i +=1,j +=1){
    langEn[j].classList.toggle('block')
    langRus[i].classList.toggle('block')
}
}
function caps() {
  const en = document.querySelectorAll('.en');
  for (let i = 0; i < en.length; i += 1) {
    if (en[i].innerText !== 'Tab'&& 
      en[i].innerText !== 'Alt'&&
      en[i].innerText !== 'Ctrl'&&
      en[i].innerText !== 'Space'&&
      en[i].innerText !== 'Enter'&&
      en[i].innerText !== 'CapsLock'&&
      en[i].innerText !== 'Backspace'&&
      en[i].innerText !== 'Del'&&
      en[i].innerText !== 'Shift'&&
      en[i].innerText !== 'Rus/En') {
      en[i].classList.toggle('key-style-upper');
      if(isCAPS === true){
        isCAPS = false;
      }else{
        isCAPS = true;
      }
    }
    
  }
}
function shift() {
  const en = document.querySelectorAll('.en');
  const enCap = document.querySelectorAll('.enCap');
  for (let i = 0, j = 0; i < en.length, j < enCap.length; i += 1, j += 1) {
    en[i].classList.toggle('hidden');
    enCap[i].classList.toggle('hidden');
  }
}

document.addEventListener('keydown', () => {
  INPUT.focus()
});


document.querySelectorAll(' .key ').forEach((element) => {
  element.onmousedown = function (event) {
    event.preventDefault();
    this.classList.toggle('press');
    const code = this.innerText;
    if (code === 'Shift') {
      shift();

    }

  };
});
document.querySelectorAll('.key ').forEach((element) => {
  element.onmouseup = function (event) {
    event.preventDefault();
    this.classList.toggle('press');
    const code = this.innerText;
    if (code === 'Shift') {
      shift();
    }
  };
});
document.querySelectorAll('.key ').forEach((element) => {
  element.onmouseout = function (event) {
    const code = this.innerText;
    if (!(code === 'CapsLock')) {
      event.target.classList.remove('press');
    }
  };
});

function moveLeftCaret() {
  INPUT.selectionEnd -= 1;
 INPUT.focus();
}

function moveRightCaret() {
  INPUT.selectionStart += 1;
  INPUT.focus();
}

document.querySelectorAll('.key ').forEach((element) => {
  element.onclick = function(event) {
    const code = this.innerText;
    if (code === 'CapsLock') {
      if (event.repeat) return;
      caps();
      this.classList.toggle('press');
    } else if (code === 'Backspace') {
      if(!(INPUT.selectionStart <= 0))
      INPUT.setRangeText('', INPUT.selectionStart - 1,INPUT.selectionStart, 'select');
    } else if (code === 'CapsLock' || code === 'Shift' || code === 'Alt' || code === 'Ctrl'|| code === '↓'|| code === '↑' ) {
      return false;
    } else if (code === 'Space') {
      INPUT.setRangeText(' ', INPUT.selectionStart, INPUT.selectionEnd, 'end');
    } else if (code === 'Enter') {
      event.target.classList.remove('press');
      document.getElementById('wrapper-keyboard').classList.add('block')
    } else if (code === 'Del') {
      INPUT.setRangeText('', INPUT.selectionStart,INPUT.selectionStart + 1, 'select');
    } else if (code === 'Tab') {
      event.preventDefault();
      INPUT.setRangeText('\t', INPUT.selectionStart, INPUT.selectionEnd, 'end');
    }
    else if (code === 'Rus/En') {
      if(isCAPS === false){
        caps()
        changeLang()
        document.getElementById('CapsLock').classList.remove('press')
        isCAPS = true
      }else{
        changeLang()
        isCAPS = true
      }
    } else if (code === '→') {
      moveRightCaret() 
    }else if (code === '←') {
      moveLeftCaret() 
    } else {
      INPUT.setRangeText(code, INPUT.selectionStart, INPUT.selectionEnd, 'end');
    }
  };
});






