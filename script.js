class Text{
    constructor(obj){
        this.text     = document.querySelector(obj.title);
        this.fullText = this.text.innerHTML
        this.text.innerHTML = ''
        this.str()
        this.width = window.getComputedStyle(this.text).width
        this.widthNum = parseInt(this.width)
    }
    stringWidth(x){
        if(this.text.getAttribute('data') == 'h1' && x >= 23){
            this.text.style.width = `${this.widthNum + 90}px`
        }else{
            this.text.style.width = this.width
        }
    }
    str(x = 0){
        this.text.innerHTML += this.fullText[x]
        x++
        this.stringWidth(x)
        if(x < this.fullText.length){
            setTimeout(() => {
                this.str(x)
            },100)
        }else if(x == this.fullText.length){
            setTimeout(() => {
                this.strNone()
            },3000)
        }
    }
    strNone(x = this.fullText.length - 1){
        this.text.innerHTML = this.fullText.slice(0, x)
        x--
        this.stringWidth(x)
        if(x >= 0){
            setTimeout(() => {
                this.strNone(x)
            },50)
        }else{
            setTimeout(() => {
                this.str()
            },200)
        }
    }
}
const text = new Text({
    title: 'h1'
})

const cursors = document.querySelectorAll(".cursor");
cursors.forEach(cursor => {
    document.body.addEventListener("mousemove", ({ clientX, clientY }) => {
      cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });
})


class Scroll{
    constructor(obj){
        this.section = document.querySelector(obj.section);

            window.addEventListener('scroll', () => {
                this.fadeAnim(this.section, 2)
            })
    }
    fadeAnim(section, coordinate){
        const fadeRight = this.section.querySelectorAll('.fade-right');
        const fadeLeft = this.section.querySelectorAll('.fade-left');
        fadeRight.forEach(el => {
            el.style.transition = 1000 + 'ms'
            if(window.scrollY >= (section.offsetTop - section.offsetHeight * coordinate)){
                el.classList.add('active')
            }else{
                el.classList.remove('active')
            }
        })
        fadeLeft.forEach(el => {
            el.style.transition = 1000 + 'ms'
            if(window.scrollY >= (section.offsetTop - section.offsetHeight * coordinate)){
                el.classList.add('active')
            }else{
                el.classList.remove('active')
            }
        })
    }
}
const scroll = new Scroll({
    section: '.complete-right'
})
const scroll1 = new Scroll({
    section: '.complete-left'
})

const dot = document.querySelector('.dot');
const blur = document.querySelector('.blur');

window.addEventListener('mousemove', e => dotMove(e))

function dotMove(e){
    const tag = e.target
    if(tag.tagName === 'A' || tag.tagName === 'BUTTON' || tag.tagName === 'INPUT'){    
        dot.classList.add('active')
        blur.classList.add('active')
    }else if(tag.tagName === 'IMG' && (tag.parentNode.tagName === 'A' || tag.parentNode.tagName === 'BUTTON')){
        dot.classList.add('active')
        blur.classList.add('active')
    }else{
        dot.classList.remove('active')
        blur.classList.remove('active')
    }
}

let mode = true

const detect = new MobileDetect(window.navigator.userAgent)
if(detect.mobile() != null) {
    dot.style = blur.style = 'display: none'
    mode = false
} else {
    dot.style = blur.style = 'display: block' 
    mode = true 
}

class Rotate3D{
    constructor(obj){
        this.cards = document.querySelectorAll(obj.cards);
        this.cards.forEach(card => {
            if (mode == true) {
                card.addEventListener('mousemove', (e) => {this.rotate(e, card)})
                card.addEventListener('mouseout', () => {this.rotateNone(card)})
            }
        })
    }
    rotate(e, item){
        const cardItem = item.querySelector('.card')
        const halfHeight = cardItem.offsetHeight / 2
        cardItem.style.transform = `rotateX(${(halfHeight - e.offsetY) / 10}deg) rotateY(${-(halfHeight - e.offsetX) / 10}deg)`;
    }
    rotateNone(item){
        const cardItem = item.querySelector('.card')
        cardItem.style.transform = 'rotate(0)'
    }
}
const rotate3d = new Rotate3D({
    cards: '.card-outer'
})




const burger = document.querySelector('.burger');
const burgerList = document.querySelector('.burger-list');
burger.addEventListener('click', function () {
    burger.classList.toggle('active')
    burgerList.classList.toggle('active')
})